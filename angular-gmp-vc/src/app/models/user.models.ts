export interface IUser {
    id: number;
    token: string;
    name: {
        firstName: string;
        lastName: string;
    };
    login: string;
    password: string;
}

export interface ICurrentUser {
    login: string;
    token: string;
}
