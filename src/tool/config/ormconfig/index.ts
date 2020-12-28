import { Config } from '../config';
import { Struct } from './struct';
import { init } from './init';

export class OrmConfig extends Config<Struct[]> {
  public constructor(path?: string) {
    super(init, path ?? './ormconfig.json')
  }
}