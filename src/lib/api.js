import axios from 'axios';
import queryString from 'query-string';
import { ACCESS_TOKEN } from '../constants';

const request = () => {
    var token = '';
    if(localStorage.getItem("accessToken")) {
        token = localStorage.getItem("accessToken");
    }
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }

    return headers;
};

export const writePost = ({title, body, tags}) => axios.post('api/posts', {title, body, tags}, request());

export const editPost = ({id, title, body, tags}) => axios.patch(`api/posts/${id}`, {title, body, tags}, request());
export const getPost = (id) => axios.get(`/api/posts/${id}`);
export const getPostList = ({tag, page}) => axios.get(`/api/posts/?${queryString.stringify({tag, page})}`);
export const removePost = (id) => axios.delete(`/api/posts/${id}`, request());

export const login = ({usernameOrEmail, password}) => axios.post('/api/auth/login', {usernameOrEmail, password});
export const checkLogin = () => axios.get('/api/auth/checkLogin', request());
export const signUp = ({username, email, password}) => axios.post('/api/auth/signup', {username, email, password});