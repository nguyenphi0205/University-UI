import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'components/Login/Login.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from 'utils/authentication.service'
class LoginTab extends Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <Grid container spacing={24}>
                                <Grid item xs={5}>
                                    <Field name="username" type="text" placeholder="username" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                </Grid>
                                <Grid item xs={5}>
                                    <Field name="password" type="password" placeholder="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </Grid>
                                <Grid item xs={2}>
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                                    {isSubmitting &&
                                        <img alt="login" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </Grid>
                                {status &&
                                    <div className={'alert alert-danger'}>{status}</div>
                                }   
                            </Grid>
                        </Form>
                    )}
                />
            </div>
        )
    }
}

export default LoginTab;
