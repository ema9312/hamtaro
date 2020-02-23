export interface User {
    id?: number;
    username: string;
    password: string;
    name?: string;
    lastname?: string;
    email?: string;
    role?:number;
    institution?: number;
}