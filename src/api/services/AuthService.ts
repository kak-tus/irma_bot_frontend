/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TokenData } from '../models/TokenData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Get token data
     * @returns TokenData GetTokenResponse
     * @throws ApiError
     */
    public static getTokenData({
        token,
    }: {
        token: string,
    }): CancelablePromise<TokenData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/token',
            query: {
                'token': token,
            },
            errors: {
                404: `NotFoundErrorResponse`,
                500: `InternalErrorResponse`,
            },
        });
    }
}
