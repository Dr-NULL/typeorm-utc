import { OrmconfigData } from './interfaces';
import { Json } from './json';

export class Ormconfig extends Json<OrmconfigData> {
    constructor() {
        super('./ormconfig.json');
    }

    generate(): Promise<void> {
        return this.save({
            type: 'mssql',
            host: '-- HOST --',
            port: 1433,
            username: '-- USERNAME --',
            password: '-- PASSWORD --',
            database: '-- DB NAME --',
            syncronize: false,
            logging: false,
            timezone: 'Z',
            entities: [
                'src/entities/**/*.entity.ts'
            ],
            migrations: [
                'src/migrations/**/*.ts'
            ],
            cli: {
                entitiesDir: 'src/entities',
                migrationsDir: 'src/migration'
            },
            options: {
                encrypt: false
            }
        });
    }
}