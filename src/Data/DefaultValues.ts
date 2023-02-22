import { IResponse, IToken, IUserContact, IUserData, IUserRol } from "../Interfaces/Data";
import { GetLevels } from "../Interfaces/UserLevels";

export const DefaultResponse:IResponse = {
    status: true,
    code: null,
    message: '',
    response: null
}

export const DefaultToken:IToken = {
    token: '',
    expiration: null
}

export const DefaultUserData:IUserData = {
    id: 0,
    cuil: "",
    prs_id: "NOTFOUND",
    email: "",
    name: "",
    last_name: "",
    created_at: null,
    updated_at: null,
    email_verified_at: null,
    deleted_at: null
}

export const DefaultUserContact:IUserContact = {
    ID: 0,
    USER_ID: 0,
    BIRTHDAY: null,
    CELLPHONE_NUMBER: "",
    DEPARTMENT_ID: 0,
    LOCALITY_ID: 0,
    ADDRESS_STREET: "",
    ADDRESS_NUMBER: "",
    APARTMENT: "",
    CREATED_AT: null,
    UPDATED_AT: null,
    CELLPHONE_NUMBER_VERIFIED_AT: null,
    DELETED_AT: null
}

export const DefaultUserRol:IUserRol[] = GetLevels([""])