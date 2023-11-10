/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Healthcheck } from '../models/Healthcheck';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InfoService {

    /**
     * Healthcheck
     * @returns Healthcheck HealthcheckResponse
     * @throws ApiError
     */
    public static healthcheck(): CancelablePromise<Healthcheck> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/healthcheck',
        });
    }

}
