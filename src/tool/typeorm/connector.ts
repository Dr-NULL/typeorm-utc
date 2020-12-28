import { Connection, createConnections } from 'typeorm';
import { HasActiveConn } from './error/has-active-conn';
import { NonActiveConn } from './error/non-active-conn';

/**
 * Manages multiple connections for BaseOrm. For execute all connections:
 * ```ts
 * // Connect to all databases declared in "ormconfig.json"
 * const conn = await Connector.connect();
 * ```
 *
 * ```ts
 * // Disconnect from all databases declared in "ormconfig.json"
 * await Connector.disconnect();
 * ```
 */
export abstract class Connector {
    private static _conns: Connection[];
    public static get connections(): Connection[] {
        return this._conns;
    }

    public static async connect() {
        if (this._conns) {
            throw new HasActiveConn();
        }

        this._conns = await createConnections();
    }

    public static async disconnect() {
        if (!this._conns) {
            throw new NonActiveConn();
        }

        for (const conn of this._conns) {
            await conn.close();
        }

        this._conns = undefined;
    }

    public static find(name: string) {
        return this._conns.find(x => x.name === name);
    }
}