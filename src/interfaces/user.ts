export interface User {
    // name: string,
    email: string, 
    fullName: string,
    isActive: boolean,
    roles: string[]
}

export type AuthStatus = "Authorized" | "UnAuthorized" | "pending"