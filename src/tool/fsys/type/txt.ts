import { AsyncFs, File, Interface } from '../core';
import { appendFile } from 'fs';

export class Txt extends File implements Interface.Readable<string>, Interface.Writable<string> {
    public async read() {
        const byte = await AsyncFs.read(this._path);
        const text = byte.toString('utf-8');
        return text;
    }

    public write(data: string) {
        const byte = Buffer.from(data, 'utf-8');
        return AsyncFs.write(this._path, byte, { encoding: 'utf-8' });
    }

    public append(data: string) {
        return new Promise<void>((resolve, reject) => {
            const byte = Buffer.from(data, 'utf-8');
            appendFile(this._path, byte, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
