import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';
import { map, switchMap, tap, mergeMap} from 'rxjs/operators';



@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
    ofType(AuthActions.DO_SIGNUP),
    map((action: AuthActions.DoSignup) => {
        return action.payload;
    })
    ,switchMap((authData: {username: string, password: string}) => {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username,
            authData.password));
    })
    ,switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
    })
    ,mergeMap((token: string) => {
        return [
            {type: AuthActions.SIGNUP},
            {type: AuthActions.SET_TOKEN,
            payload: token}
        ]
    }));
    
    
    @Effect()
    authSignin = this.actions$.pipe(
      ofType(AuthActions.DO_SIGNIN),
      map((action: AuthActions.DoSignin) => {
        return action.payload;
    })
    ,switchMap((authData: {username: string, password: string}) => {
        return from(firebase.auth().signInWithEmailAndPassword(authData.username,
            authData.password));
    })
    ,switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
    })
    ,mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
            {type: AuthActions.SIGNIN},
            {type: AuthActions.SET_TOKEN,
            payload: token}
        ];
    })); 

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT)
        ,tap(() => {
            this.router.navigate(['/']);
        })
    );

    
    constructor(private actions$: Actions, private router: Router) {

    }
}