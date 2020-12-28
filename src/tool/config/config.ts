import { Type } from '../fsys';
import { read } from 'fs';

export abstract class Config<T> {
  private _init: T;
  private _json: Type.Json<T>

  /**
   * Get the name of the current configuration file.
   */
  public get name() {
    return this._json.name
  }
  
  /**
   * Get if the current configuration file exists.
   */
  public get exists() {
    return this._json.exists;
  }

  /**
   * Set a new config class, extend this class for make your custom config *.json file passing an interface as a type parameter.
   * @param init Default Values for the current Class.
   * @param path Path parts of the current file. Use `'./'` or `'../'` for relative paths.
   */
  constructor(init: T, path: string) {
    this._json = new Type.Json<T>(path)
    this._init = init
  }

  /**
   * Create a new JSON file with default values.
   */
  public new() {
    return this._json.write(this._init)
  }
  
  /**
   * Get the current data into the file config. If the file doesn't exist, a new copy will be created, and returns the default values.
   */
  public async get() {
    if (!await this._json.exists) {
      await this._json.write(this._init)
      throw new Error(`"${this._json.name}" not found. Creating a new copy with default values...`)
    } else {
      return this._json.read()
    }
  }

  /**
   * Set the data of this configuration file. If that file doesn't exists, a new file config will be created.
   * @param v Data to save into the current config file.
   */
  public set(v: T) {
    return this._json.write(v)
  }
}