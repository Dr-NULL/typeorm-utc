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
    function mutator(input: Date, after?: boolean): Date {
        // Convert date
        const hh = input.getHours();
        const mm = input.getMinutes();
        const ss = input.getSeconds();
        const ms = input.getMilliseconds();
    
        if (!hh && !mm && !ss && !ms) {
            const add = 60000 * 60 * 24;
            const rev = !after ? 1 : -1;
            return new Date(input.getTime() + (add * rev));
        } else {
            return input;
        }
    }

    if (!(date instanceof Date)) {
        // Return the decorator
        return (target: any, propertyKey: string | symbol) => {
            const methodBefore = `${propertyKey.toString()}BeforeDML`;
            const methodAfter = `${propertyKey.toString()}AfterDML`;

            // Execute before DML
            target[methodBefore] = function() {
                if (this[propertyKey] instanceof Date) {
                    this[propertyKey] = mutator(this[propertyKey], false);
                }
            }

            // Execute after DML 
            target[methodAfter] = function() {
                if (this[propertyKey] instanceof Date) {
                    this[propertyKey] = mutator(this[propertyKey], true);
                }
            }

            // Execute decorators
            BeforeInsert()(target, methodBefore);
            BeforeUpdate()(target, methodBefore);
            AfterInsert()(target, methodAfter);
            AfterUpdate()(target, methodAfter);
        };
    } else {
        // Converts inmediatly the date
        return mutator(date);
    }
};
