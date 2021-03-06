import { IUser } from '../models/user.models';

export const USERS: IUser[] = [
    {
        id: 1,
        firstName: 'admin',
        lastName: 'admin',
        login: 'admin@epam.com',
        password: '123',
        token: 'some token from server',
    },
    {
        id: 2,
        firstName: 'Evgenii',
        lastName: 'Graf',
        login: 'Evgenii_Graf@epam.com',
        password: '123',
        token: 'some token from server',
    },
    {
        id: 3,
        firstName: 'Anatolii',
        lastName: 'Zhuk',
        login: 'Anatolii_Zhuk@epam.com',
        password: '123',
        token: 'some token from server',
    },
    {
        id: 4,
        firstName: 'Evgenii',
        lastName: 'Priv',
        login: 'Evgenii_Priv@epam.com',
        password: '123',
        token: 'some token from server',
    },
];
