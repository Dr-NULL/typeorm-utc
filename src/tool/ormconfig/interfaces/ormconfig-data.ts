import { Cli } from './cli';
import { Options } from './options';

export interface OrmconfigData {
    name?:      string;
    type:       'mssql';
    host:       string;
    port:       number;
    username:   string;
    password:   string;
    database:   string;
    syncronize: boolean;
    logging:    boolean;
    timezone?:  string;
    entities:   string[];
    migrations: string[];
    cli:        Cli;
    options:    Options;
}