export type {
    IUserRegisterDto,
    IUserLoginDto,
    IPlayerRegisterPartDto,
    AuthUserSchema,
    ILoginResponse,
    AccessTokenInfoResponse,
} from './types/authUser';

export {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    authEndpoints,
} from './model/authApi';

export {
    authUserReducer,
    selectIsSessionExpired,
    selectAccessTokenInfo,
    selectAuthUserState,
    authUserActions,
    selectIsAuthenticated,
} from './model/authUserSlice/authUserSlice';

export { useUserPermissions } from './model/~deprecated/useUserPermissions';
export { userPermissions } from './model/~deprecated/userPermissions';
export type { UserPermissions } from './model/~deprecated/userPermissions';

export {
    useUserPermissionsV2,
    PermissionError,
} from './model/useUserPermissionsV2/useUserPermissionsV2';
export type { UserPermissionsV2 } from './model/useUserPermissionsV2/useUserPermissionsV2';

export { authMiddleware } from './middlewares/authMiddleware';

export { default as BaseAuthForm } from './ui/BaseAuthForm/BaseAuthForm';
