import { Struct } from './struct';

export const init: Struct[] = [
  {
    type: "mssql",
    host: "--HOST--",
    port: 1433,
    username: "--USER--",
    password: "--PASS--",
    database: "--DATABASE NAME--",
    encrypt: false,
    syncronize: false,
    logging: false,
    entities: [
      "dist/models/**/*.entity.js"
    ],
    migrations: [
      "dist/migrations/**/*.js"
    ],
    cli: {
      entitiesDir: "src/models",
      migrationsDir: "src/migrations"
    },
    options: {
      enableArithAbort: true
    }
  }
]