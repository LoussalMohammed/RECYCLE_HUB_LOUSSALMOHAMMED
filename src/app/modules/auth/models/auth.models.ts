import { User } from "../../../shared/models"


export interface AuthErrors {
    fullName : string | null ,
    email : string | null,
    password : string | null ,
    address : string | null
}


export interface RegistrationData {
    id ?: string,
    fullName : string ,
    email : string ,
    password : string ,
    address : string ,
    role : 'user'
}


export interface LoginData {
    email : string ,
    password : string 
}


export interface AuthStateInterface{
    shownAuthSuccessPopup : boolean,
    shownLoginFailureMsg : boolean,
    signedInUser : User | null
}   