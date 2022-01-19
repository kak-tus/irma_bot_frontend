/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Group } from '../models/Group';
import type { Healthcheck } from '../models/Healthcheck';
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
        id,
    }: {
        id: number,
    }): CancelablePromise<Group> {
        return __request({
            method: 'GET',
            path: `/group/${id}`,
        });
    }

}