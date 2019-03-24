import { httpPostReqLogIn } from '../../apiCalls';
import * as types from './types';

export function logIn(name, password) {
    return dispatch => {
        dispatch(logInPending());
        return httpPostReqLogIn(name, password)
            .then(token => dispatch(logInSuccess(name, token)))
            .catch((e) => dispatch(logInFailure(e)));
    };
}

export const logInPending = () => ({
    type: types.LOG_IN_PENDING,
});

export const logInSuccess = (name, token) => {
    localStorage.setItem('@WTCD/authToken', token);
    localStorage.setItem('@WTCD/name', name);
    return {
        type: types.LOG_IN_SUCCESS,
        name,
        token,
    };
};

export const logInFailure = (error) => ({
    type: types.LOG_IN_FAILURE,
    error,
});

export const logOff = () => {
    localStorage.removeItem('@WTCD/authToken');
    localStorage.removeItem('@WTCD/name');
    return {
        type: types.LOG_OFF,
    };
};

