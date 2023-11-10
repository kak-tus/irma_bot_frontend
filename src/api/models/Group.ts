/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Domains } from './Domains';
import type { Questions } from './Questions';

export type Group = {
    id: number;
    greeting: string;
    ban_question: boolean;
    ban_url: boolean;
    ban_timeout: number;
    questions: Questions;
    ignore_domains?: Domains;
};

