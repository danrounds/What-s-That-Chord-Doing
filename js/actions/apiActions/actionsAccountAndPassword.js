import { httpPostReqAccount, httpPutReqAccountPassword, httpDeleteReqAccount } from '../../apiCalls';
import * as types from './types';

export function makeUserAccount(name, password) {
    return dispatch => {
        dispatch(makeUserAccountPending());
        return httpPostReqAccount(name, password)
            .then(token => dispatch(makeUserAccountSuccess(name, token)))
            .catch((e) => dispatch(makeUserAccountFailure(e)));
    };
}

export const makeUserAccountPending = () => ({
    type: types.MAKE_USER_ACCOUNT_PENDING,
});

export const makeUserAccountSuccess = (name, token) => {
    localStorage.setItem('@WTCD/authToken', token);
    localStorage.setItem('@WTCD/name', name);
    return {
        type: types.MAKE_USER_ACCOUNT_SUCCESS,
        name,
        token,
    };
};

export const makeUserAccountFailure = (error) => ({
    type: types.MAKE_USER_ACCOUNT_FAILURE,
    error,
});

////////////////////
// This hasn't actually been incorporated into the client \/
export function changeUserPassword(name, password) {
    return dispatch => httpPutReqAccountPassword(name, password)
        .then(() => dispatch(changeUserPasswordSuccess()))
        .catch((e) => dispatch(changeUserPasswordFailure()));
}

export const changeUserPasswordSuccess = () => ({
    type: types.CHANGE_USER_PASSWORD_SUCCESS,
});

export const changeUserPasswordFailure = (error) => ({
    type: types.CHANGE_USER_PASSWORD_FAILURE,
    error,
});
