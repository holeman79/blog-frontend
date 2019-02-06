import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';
import { ACCESS_TOKEN } from '../../constants';

import * as api from 'lib/api';

// action types
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const LOGIN = 'base/LOGIN';
const LOGOUT = 'base/LOGOUT';
const CHECK_LOGIN = 'base/CHECK_LOGIN';
const CHANGE_INPUT = 'base/CHANGE_INPUT';
const INITIALIZE_LOGIN_MODAL = 'base/INITIALIZE_LOGIN_MODAL';
const TEMP_LOGIN = 'base/TEMP_LOGIN';
const SIGNUP = 'base/SIGNUP';
const CHANGE_INPUT_SIGNUP = 'base/CHANGE_INPUT_SIGNUP';

// action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT, api.logout);
export const checkLogin = createAction(CHECK_LOGIN, api.checkLogin);
export const changeInput = createAction(CHANGE_INPUT);
export const initializeLoginModal = createAction(INITIALIZE_LOGIN_MODAL);
export const tempLogin = createAction(TEMP_LOGIN);
export const signUp = createAction(SIGNUP, api.signUp);
export const changeInputSignUp = createAction(CHANGE_INPUT_SIGNUP);

// initial state
const initialState = Map({
    modal: Map({
        remove: false,
        login: false
    }),
    loginModal: Map({
        usernameOrEmail: '',
        password: '',
        error: false
    }),
    signUp: Map({
        username: '',
        email: '',
        password: '',
    }),
    logged: false
});

// reducer
export default handleActions({
    [SHOW_MODAL]: (state, action) => {
        const { payload: modalName } = action;
        return state.setIn(['modal', modalName], true);
    },
    [HIDE_MODAL]: (state, action) => {
        const { payload: modalName } = action;
        return state.setIn(['modal', modalName], false);
    },
    ...pender({
        type: LOGIN,
        onSuccess: (state, action) => {
            const { accessToken } = action.payload.data;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            return state.set('logged', true);
        },
        onError: (state, action) => {
            return state.setIn(['loginModal', 'error'], true)
                .setIn(['loginModal', 'password'], '');
        }
    }),
    ...pender({
        type: CHECK_LOGIN,
        onSuccess: (state, action) => {
            const  logged = action.payload.data;
            //localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            return state.set('logged', logged);
        }
    }),
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['loginModal', name], value);
    },
    [INITIALIZE_LOGIN_MODAL]: (state, action) => {
        return state.set('loginModal', initialState.get('loginModal'));
    },
    [TEMP_LOGIN]: (state, action) => {
        return state.set('logged', true);
    },
    ...pender({
        type: SIGNUP,
        onSuccess: (state, action) =>{

        },
        onError: (state, action) => {
            return state.setIn(['signUp', 'username'], '')
                .setIn(['signUp', 'email'], '')
                .setIn(['signUp', 'password'], '');
        }
    }),
    [CHANGE_INPUT_SIGNUP]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['signUp', name], value);
    },
}, initialState)