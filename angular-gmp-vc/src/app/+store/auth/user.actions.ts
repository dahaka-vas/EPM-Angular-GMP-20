import { createAction, props } from '@ngrx/store';
import { ICurrentUser } from 'src/app/models/user.models';

export const login = createAction(
    '[User] Login',
    props<{ username: string; password: string }>()
)

export const loginSuccess = createAction(
    '[User] Login Success',
    props<{ user: ICurrentUser }>()
)

export const logout = createAction(
    '[User] Logout'
)