export enum UserRole {
    GUEST = 1,
    USER = 2,
    ADMIN = 3,
}

export interface UserDetails {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    disabled: boolean;
    emailVerified: boolean;
}

export interface UserRegistration {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
