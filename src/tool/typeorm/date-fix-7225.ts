import { AfterInsert, AfterUpdate, BeforeInsert, BeforeUpdate } from "typeorm";

/**
 * A decorator to be used with a Entity's __`"datetime"`__ type fields, for fix the issue 
 * {@link https://github.com/typeorm/typeorm/issues/7225 __#7225__}
 * with zero hour insertion Dates. When the date has the hour `00:00:00.000Z`, before the
 * DML, the date will be rewind 1 day backwards, after of DML operation, the date will be
 * moved 1 day forward. Also, you can use this decorator as a normal function, when you
 * need to use dates variable types inside of a QueryBuilder for example.
 */
export function DateFix7225(): PropertyDecorator
export function DateFix7225(date: Date): Date
export function DateFix7225(date?: Date): Date | PropertyDecorator {
    if (date) { 
        // Convert date
        const hh = date.getHours();
        const mm = date.getMinutes();
        const ss = date.getSeconds();
        const ms = date.getMilliseconds();
    
        if (!hh && !mm && !ss && !ms) {
            const add = 60000 * 60 * 24;
            return new Date(date.getTime() - add);
        } else {
            return date;
        }
    } else {
        // Return the decorator
        return (target: any, propertyKey: string | symbol) => {
            const methodBefore = `${propertyKey.toString()}BeforeDML`;
            const methodAfter = `${propertyKey.toString()}AfterDML`;

            // Execute before DML
            target[methodBefore] = function() {
                if (this[propertyKey] instanceof Date) {
                    const hh = this[propertyKey].getHours();
                    const mm = this[propertyKey].getMinutes();
                    const ss = this[propertyKey].getSeconds();
                    const ms = this[propertyKey].getMilliseconds();

                    if (!hh && !mm && !ss && !ms) {
                        const add = 60000 * 60 * 24;
                        this[propertyKey] = new Date(this[propertyKey].getTime() + add);
                    }
                }
            }

            // Execute after DML 
            target[methodAfter] = function() {
                if (this[propertyKey] instanceof Date) {
                    const hh = this[propertyKey].getHours();
                    const mm = this[propertyKey].getMinutes();
                    const ss = this[propertyKey].getSeconds();
                    const ms = this[propertyKey].getMilliseconds();

                    if (!hh && !mm && !ss && !ms) {
                        const add = 60000 * 60 * 24;
                        this[propertyKey] = new Date(this[propertyKey].getTime() - add);
                    }
                }
            }

            // Execute decorators
            BeforeInsert()(target, methodBefore);
            BeforeUpdate()(target, methodBefore);
            AfterInsert()(target, methodAfter);
            AfterUpdate()(target, methodAfter);
        };
    }
};
