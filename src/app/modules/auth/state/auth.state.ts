import { AuthStateInterface } from "../models/auth.models";


export const initialAuthState : AuthStateInterface = {
    shownAuthSuccessPopup : false ,
    shownLoginFailureMsg : false,
    signedInUser : null
}