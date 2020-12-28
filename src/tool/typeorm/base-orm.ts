import { BaseEntity } from 'typeorm';
import { Connector } from './connector';

/**
 * Wrapper of BaseEntity of TypeORM. Can manage multiple connections and search by itself the corresponding
 * connection for each Entity if the name is specified.
 * 
 * Usage: When you have a sigle connection, the implementation it's the same as the BaseEntity TypeORM's class.
 * But in case do you has a multiple connections, for example:
 * ```json
 * [
 *   {
 *     "name": "default",
 *     "type": "mssql",
 *     // Another Data
 *   },
 *   {
 *     "name": "AnotherDB",
 *     "type": "mssql",
 *     // Another Data
 *   }
 * ]
 * ```
 * 
 * You can use this abstract class in your entities for make a simple way to use entities of differents connections
 * without setting in each query wath connection do you want to use. Using the above example, we are going to create
 * one entity for each connection:
 * 
 * ```ts
 * // file: "./src/models-db1/client"
 * import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
 * import { BaseOrm } from "../tool/typeorm";
 * 
 * @Entity()
 * export class Client {
 *   @PrimaryGeneratedColumn({ type: 'int' })
 *   id: number;
 * 
 *   @Column({ type: 'varchar', length: 50 })
 *   name: string;
 * }
 * ```
 * 
 * ```ts
 * // file: "./src/models-db2/employee"
 * import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
 * import { BaseOrm } from "../tool/typeorm";
 * 
 * @Entity()
 * export class Employee {
 *   // The name of the non default db conection
 *   public static connectionName = 'AnotherDB';
 * 
 *   @PrimaryGeneratedColumn({ type: 'int' })
 *   id: number;
 * 
 *   @Column({ type: 'varchar', length: 50 })
 *   name: string;
 * }
 * ```
 */
export abstract class BaseOrm extends BaseEntity {    
    /**
     * Set an specific connection name in case the project has multiple named connections.
     */
    public static connectionName?: string;

    /**
     * Get the current Entity's repository.
     */
    static getRepository<T extends BaseEntity>() {
        if (this.connectionName) {
            const conn = Connector.find(this.connectionName);
            super.useConnection(conn);
        }
        
        return super.getRepository<T>();
    }
}
