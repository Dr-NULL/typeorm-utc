import { ObjectLiteral, FindConditions } from 'typeorm';

export type Where<T> = FindConditions<T>[] | FindConditions<T> | ObjectLiteral | string;