import { BaseEntity, ObjectType, Repository } from 'typeorm';

export interface EntityClass {
    new(): BaseEntity;

    getRepository<T extends BaseEntity>(this: ObjectType<T>): Repository<T>;
}
