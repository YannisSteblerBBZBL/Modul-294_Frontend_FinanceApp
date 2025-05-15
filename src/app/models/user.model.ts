export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    keycloakID: string;
    email: string;
    active: boolean;
}