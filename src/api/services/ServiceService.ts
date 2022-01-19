/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Group } from '../models/Group';
import type { Healthcheck } from '../models/Healthcheck';
import type { TokenData } from '../models/TokenData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class ServiceService {

    /**
     * Healthcheck
     * @returns Healthcheck
     * @throws ApiError
     */
    public static healthcheck(): CancelablePromise<Healthcheck> {
        return __request({
            method: 'GET',
            path: `/healthcheck`,
        });
    }

    /**
     * Get group
     * @returns Group
     * @throws ApiError
     */
    public static getGroup({
        token,
    }: {
        token: string,
    }): CancelablePromise<Group> {
        return __request({
            method: 'GET',
            path: `/group`,
            query: {
                'token': token,
            },
        });
    }

    /**
     * Save group
     * @returns any
     * @throws ApiError
     */
    public static saveGroup({
        token,
        requestBody,
    }: {
        token: string,
        requestBody: Group,
    }): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/group`,
            query: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get token data
     * @returns TokenData
     * @throws ApiError
     */
    public static getTokenData({
        token,
    }: {
        token: string,
    }): CancelablePromise<TokenData> {
        return __request({
            method: 'GET',
            path: `/token`,
            query: {
                'token': token,
            },
        });
    }

}