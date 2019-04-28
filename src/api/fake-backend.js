import { Role } from 'api/role'
import axios from 'axios'
export function configureFakeBackend() {
    const url_test = 'https://stormy-thicket-83266.herokuapp.com/api/users';
    let users = []
    axios.get(url_test).then(res => {
        return users.push(res.data)
    })
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const authHeader = opts.headers['Authorization'];
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const userData = users.find(x => x.find(y => y.Email === params.username && y.Password === params.password));
                    
                    if (!userData) return error('Username or password is incorrect');

                    const user = userData.find(u => u.Email === params.username && u.Password === params.password)

                    if (!user) return error('Username or password is incorrect');

                    return ok({
                        id: user.User_ID,
                        username: user.Email,
                        firstName: user.First_Name,
                        lastName: user.Last_Name,
                        role: user.Role_Name,
                        token: `fake-jwt-token.${user.Role_Name}`
                    });
                }

                // get user by id - admin or user (user can only access their own record)
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();

                    // get id from request url
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    // only allow normal users access to their own record
                    const currentUserData = users.find(x => x.find(y => y.Role_Name === role));
                    const currentUser = currentUserData.find(x => x.Role_Name === role);
                    if (id !== currentUser.User_ID && role !== Role.Admin && role !== Role.Coordianator && role !== Role.User && role !== Role.Guess) return unauthorised();
                    let userData;
                    users.find(u => userData = u);
                    const user= userData.find(z => parseInt(z.User_ID)===id)
                    return ok(user);
                }

                // get all users - admin only
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (role !== Role.Admin && role !== Role.Coordianator && role !== Role.User && role !== Role.Guess) return unauthorised();
                    return ok(users);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
}