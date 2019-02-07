import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';
import { ACCESS_TOKEN } from '../../constants';

import * as api from 'lib/api';

// action types
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const LOGIN = 'base/LOGIN';
const CHECK_LOGIN = 'base/CHECK_LOGIN';
const CHANGE_INPUT = 'base/CHANGE_INPUT';
const INITIALIZE_LOGIN = 'base/INITIALIZE_LOGIN';
const TEMP_LOGIN = 'base/TEMP_LOGIN';
const SIGNUP = 'base/SIGNUP';
const CHANGE_INPUT_SIGNUP = 'base/CHANGE_INPUT_SIGNUP';

// action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const login = createAction(LOGIN, api.login);
export const checkLogin = createAction(CHECK_LOGIN, api.checkLogin);
export const changeInput = createAction(CHANGE_INPUT);
export const initializeLogin = createAction(INITIALIZE_LOGIN);
export const tempLogin = createAction(TEMP_LOGIN);
export const signUp = createAction(SIGNUP, api.signUp);
export const changeInputSignUp = createAction(CHANGE_INPUT_SIGNUP);

// initial state
const initialState = Map({
    modal: Map({
        remove: false,
        login: false
    }),
    login: Map({
        usernameOrEmail: '',
        password: '',
        error: false
    }),
    signUp: Map({
        username: '',
        email: '',
        password: '',
    }),
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
            localStorage.setItem("accessToken", accessToken);
            localStorage.logged=true;
            return state.set('login', initialState.get('login'));
        },
        onError: (state, action) => {
            return state.setIn(['login', 'error'], true)
                .setIn(['login', 'password'], '');
        }
    }),
    ...pender({
        type: CHECK_LOGIN,
        onSuccess: (state, action) => {
            //localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            localStorage.logged=true;
        },
        onError: (state, action) => {
            localStorage.removeItem("accessToken");
            localStorage.logged='';
        }
    }),
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['login', name], value);
    },
    [INITIALIZE_LOGIN]: (state, action) => {
        return state.set('login', initialState.get('login'));
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