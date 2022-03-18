import { access, readFile, rm, writeFile } from 'fs/promises';
import { resolve } from 'path';

export class Json<T> {
    private _path: string;
    get path(): string {
        return this._path;
    }

    constructor(path: string) {
        this._path = resolve(path);
    }

    async exists(): Promise<boolean> {
        try {
            await access(this._path);
            return true;
        } catch {
            return false;
        }
    }

    kill(): Promise<void> {
        return rm(this._path);
    }

    async load(): Promise<T> {
        const text = await readFile(this._path, 'utf-8');
        return JSON.parse(text);
    }

    save(data: T): Promise<void> {
        const text = JSON.stringify(data, null, '    ');
        const byte = Buffer.from(text, 'utf-8');
        return writeFile(this._path, byte);
    }
}