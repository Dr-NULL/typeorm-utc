import { OrmConfig } from './orm-config';
import { File } from '../tool/fsys';

export class JsonFile extends File {
    async read(): Promise<OrmConfig> {
        const byte = await this.readRaw();
        const text = byte.toString('utf-8');
        const json = JSON.parse(text);

        return json as OrmConfig;
    }

    async write(obj: OrmConfig): Promise<void> {
        const text = JSON.stringify(obj, null, '    ');
        const byte = Buffer.from(text, 'utf-8');

        return this.writeRaw(byte);
    }

    async generate(): Promise<void> {
        const obj: OrmConfig = {
            type: 'mssql',
            host: '--INSERT INFO HERE--',
            port: 1433,
            username: "--INSERT INFO HERE--",
            password: "--INSERT INFO HERE--",
            database: "--INSERT INFO HERE--",
            syncronize: false,
            logging: false,
            timezone: "Z",
            entities: [
                "src/entities-app/**/*.entity.ts"
            ],
            migrations: [
                "src/migrations-app/**/*.ts"
            ],
            cli: {
                entitiesDir: "src/entities-app",
                migrationsDir: "src/migrations-app"
            },
            options: {
                useUTC: false,
                enableArithAbort: true,
                encrypt: true,
                trustServerCertificate: true
            }
        };

        return this.write(obj);
    }
}