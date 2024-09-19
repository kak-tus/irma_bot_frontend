/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Group } from '../models/Group';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GroupService {
    /**
     * Get group
     * @returns Group GetGroupResponse
     * @throws ApiError
     */
    public static getGroup({
        token,
    }: {
        token: string,
    }): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/group',
            query: {
                'token': token,
            },
            errors: {
                404: `NotFoundErrorResponse`,
                500: `InternalErrorResponse`,
            },
        });
    }
    /**
     * Save group
     * @returns any SaveGroupResponse
     * @throws ApiError
     */
    public static saveGroup({
        token,
        requestBody,
    }: {
        token: string,
        requestBody: Group,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/group',
            query: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `NotFoundErrorResponse`,
                500: `InternalErrorResponse`,
            },
        });
    }
}
