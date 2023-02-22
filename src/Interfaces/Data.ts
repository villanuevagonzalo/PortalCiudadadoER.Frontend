import { GetLevel } from "./UserLevels";

/// RESPONSE

export interface IResponse{
    status: boolean;
    code: number | null;
    message: string;
    response: any | null;
}

export const DefaultResponse:IResponse = {
    status: true,
    code: null,
    message: '',
    response: null
}

/// TOKENS

export interface IToken{
    token: string;
    expiration: Date | null;
}

export const DefaultToken:IToken = {
    token: '',
    expiration: null
}

/// User Data

export interface IUserData{
    id: number;
    cuil: string;
    prs_id: string;
    email: string;
    name: string;
    last_name: string;
    created_at: Date | null;
    updated_at: Date | null;
    email_verified_at: Date | null;
    deleted_at: Date | null;
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

export const TestUserData:IUserData = {
    id: 12345,
    cuil: "20390317213",
    prs_id: "NOTFOUND",
    email: "gonzalo_villanueva@outlook.com",
    name: "Gonzalo",
    last_name: "Villanueva",
    created_at: null,
    updated_at: null,
    email_verified_at: null,
    deleted_at: null
}

/// User Contact

export interface IUserContact{
    ID: number;
    USER_ID: number;
    BIRTHDAY: Date | null;
    CELLPHONE_NUMBER: string;
    DEPARTMENT_ID: number;
    LOCALITY_ID: number;
    ADDRESS_STREET: string;
    ADDRESS_NUMBER: string;
    APARTMENT: string;
    CREATED_AT: Date | null;
    UPDATED_AT: Date | null;
    CELLPHONE_NUMBER_VERIFIED_AT: Date | null;
    DELETED_AT: Date | null;
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

/// User Roles

export interface IUserRol{
    type: string;
    level:number;
    message: string;
}

export const DefaultUserRol:IUserRol[] = GetLevel([""])

export const TestUserRol:IUserRol[] = GetLevel(["level_1"])



/// Locations

export interface ILocations{
    ID: number;
    NOMBRE: string;
    DEP_ID: number;
    DEPARTAMENTO: string;
    PRV_ID: number;
    PROVINCIA: string;
    PAI_ID: number;
    PAIS: string;
}