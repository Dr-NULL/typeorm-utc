export interface OrmConfig {
    type?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    syncronize?: boolean;
    logging?: boolean;
    timezone?: string;
    entities?: string[],
    migrations?: string[],
    cli?: {
        [key: string]: any;

        entitiesDir?: string;
        migrationsDir?: string;
    },
    options?: {
        [key: string]: any;

        useUTC?: boolean;
        enableArithAbort?: boolean;
        encrypt?: boolean;
        trustServerCertificate?: boolean;
    }
}
