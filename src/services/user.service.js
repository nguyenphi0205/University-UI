import { authHeader } from 'utils/auth-header';
import { handleResponse } from 'utils/HandleRespone';
export const userService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}