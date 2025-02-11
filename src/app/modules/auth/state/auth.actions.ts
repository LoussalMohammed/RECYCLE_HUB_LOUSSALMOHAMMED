import { createAction, props } from "@ngrx/store";
import { RegistrationData } from "../models/auth.models";
import { User } from "../../../shared/models";

export const validForm = createAction(
    "[Auth Popup] valid registration form",
    props<RegistrationData>()
);

export const clearAuthFormErrors = createAction("[Auth Popup] clear auth form errors ");

export const registrationSuccess = createAction(
    "[Auth Popup] registration successfully",
    props<RegistrationData>()
)

export const registrationFailure = createAction(
    "[Auth Popup] Failure In registration",
    props<{error : string}>()
)

export const validLoginForm = createAction(
    "[Auth Popup] valid login form",
    props<{email : string , password : string}>()
)

export const loginSuccess = createAction(
    "[Auth Popup] login successfully",
    props<{ user: User }>()   
)

export const loginFailure = createAction(
    "[Auth Popup] login In Failure",
    props<{error : string}>()
)

export const profileUpdated = createAction(
    "[User Profile] Profile updated",
    props<{ user: User }>() 
)

export const logout = createAction(
    "[Auth] logout"
)