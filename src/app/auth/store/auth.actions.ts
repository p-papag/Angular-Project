import { Action } from '@ngrx/store';

export const DO_SIGNUP = 'DO_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const DO_SIGNIN = 'DO_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class DoSignup implements Action {
    readonly type = DO_SIGNUP;

    constructor(public payload: {username: string, password: string}) {}
}

export class DoSignin implements Action {
    readonly type = DO_SIGNIN;
    constructor(public payload: {username: string, password: string}) {}

}

export class Signup implements Action {
    readonly type = SIGNUP;
}

export class Signin implements Action {
    readonly type = SIGNIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string) {}
}



export type AuthActions =
Signup
|Signin
|Logout
|SetToken
|DoSignup
|DoSignin;