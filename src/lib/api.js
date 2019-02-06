import axios from 'axios';
import queryString from 'query-string';
import { ACCESS_TOKEN } from '../constants';

const headers = new Headers({
    'Content-Type': 'application/json',
})
if(localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
}

export const writePost = ({title, body, tags}) => axios.post('api/posts', {title, body, tags}, {headers});
export const editPost = ({id, title, body, tags}) => axios.patch(`api/posts/${id}`, {title, body, tags});
export const getPost = (id) => axios.get(`/api/posts/${id}`);
export const getPostList = ({tag, page}) => axios.get(`/api/posts/?${queryString.stringify({tag, page})}`);
export const removePost = (id) => axios.delete(`/api/posts/${id}`);

export const login = ({usernameOrEmail, password}) => axios.post('/api/auth/login', {usernameOrEmail, password});
export const checkLogin = () => axios.get('/api/user/checkLogin', {headers});
export const logout = () => axios.post('api/auth/logout');
export const signUp = ({username, email, password}) => axios.post('/api/auth/signup', {username, email, password}, {headers});