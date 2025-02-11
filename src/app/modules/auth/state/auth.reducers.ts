import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import * as authActions from "./auth.actions"
import { state } from "@angular/animations";

export const authReducer = createReducer(
    initialAuthState,
    on(authActions.registrationSuccess , (state , action) => ({
        ...state ,
    })),
    on(authActions.registrationFailure , (state) => ({
        ...state
    })),
    on(authActions.loginSuccess, (state, { user }) => ({
        ...state,
        shownLoginFailureMsg: false,
        signedInUser: user 
    })),
    on(authActions.loginFailure , (state ) => ({
        ...state,
        shownLoginFailureMsg : true,
    })),
    on(authActions.profileUpdated , (state , {user}) => ({
        ...state,
        signedInUser : user
    })),
    on(authActions.logout , (state) => ({
        ...state,
        signedInUser : null
    })),
)   