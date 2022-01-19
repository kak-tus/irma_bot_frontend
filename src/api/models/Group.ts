/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Questions } from './Questions';

export type Group = {
    id: number;
    greeting: string;
    ban_question: boolean;
    ban_url: boolean;
    ban_timeout: number;
    questions: Questions;
}
