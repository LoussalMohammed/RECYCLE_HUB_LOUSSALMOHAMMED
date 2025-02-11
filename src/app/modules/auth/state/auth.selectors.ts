import { createSelector } from "@ngrx/store";
import { selectHomeState } from "../../home/state/home.selectors";
import { AppState } from "../../../core/store/app.state";
import { state } from "@angular/animations";

export const selectAuthState = (state : AppState) => state.auth;

export const selectAuthErrors = createSelector(
    selectHomeState,
    (state) => state.authErrors
)

export const selectLoginErrorMsg = createSelector(
    selectAuthState ,
    (state) => state.shownLoginFailureMsg
)

export const selectSignedInUser = createSelector(
    selectAuthState , 
    (state) => state.signedInUser
)