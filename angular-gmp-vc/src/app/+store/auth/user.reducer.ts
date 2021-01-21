import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './user.actions';

export const userReduser = createReducer({},
    on(loginSuccess, (state, action) => {
        return {
            user: {
                ...state,
                ...action.user,
            }
        };
    }),
    on(logout, () => {
        return {};
    }),
);