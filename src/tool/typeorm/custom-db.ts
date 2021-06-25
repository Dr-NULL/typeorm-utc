import { Connection, getConnectionManager, ConnectionNotFoundError } from 'typeorm';
import { EntityDecoratorType } from './interfaces';

/**
 * Assigns to the current entity a connection specified when the `ormconfig.*` file
 * has an array of connections. To use this decorator do you need:
 * - An `ormconfig.*` file wichs has an array of connections inside.
 * - Every connection must have a key called `"name"` *(for the default connection this isn't necesary)*.
 * @param name The name of the connection specified in the ormconfig file.
 * @returns A class decorator that modify the entity.
 */
export function CustomDB(name: string): EntityDecoratorType {
    if (!name) {
        name = 'default';
    }

    return entity => {        
        // Replace the original function
        entity.getRepository = function() {
            // Search the connection
            let conn: Connection = (entity as any).usedConnection;
            if (!conn) {
                const list = getConnectionManager().connections;
                conn = list.find(x => x.name === name);
                if (!conn) {
                    throw new ConnectionNotFoundError(name);
                }

                // Validate the 
                (entity as any).usedConnection = conn;
            }

            // Return the repository
            return conn.getRepository(this);
        };
    };
}