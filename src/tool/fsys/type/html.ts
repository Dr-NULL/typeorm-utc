import { File, AsyncFs } from '../core';
import { Readable, Writable } from '../core/interface';

interface Dict {
    [key: string]: any;
}

export class Html<T = any> extends File implements Readable<string> {
    public async read(data?: T & Dict) {
        // Read File
        const byte = await AsyncFs.read(this._path);
        let text = byte.toString('utf-8');
        if (!data) {
            return text;
        }

        // Search pattern
        const srch = text.match(/\{\{\s*(this\.)?[^\{\}\s\\\/]+\s*\}\}/gi);
        if (!srch) {
            return text;
        }

        // Build Pattern
        const patt = srch.map(x => {
            const patt = x
                .replace(/\{/gi, '\\{')
                .replace(/\}/gi, '\\}')
                .replace(/\s+/gi, '\\s*')
                .replace(/\./gi, '\\.');
                
            const reg = new RegExp(patt, 'gi');
            const key = x.replace(/(\{\{\s*(this\.)?|\s*\}\})/gi, '');

            return { key, reg };
        });
        
        // Replace
        for (const expr of patt) {
            text = text.replace(
                expr.reg,
                `${(data as any)[expr.key]}`
            );
        }
        
        return text;
    }

    public write(data: string) {
        const byte = Buffer.from(data, 'utf-8');
        return AsyncFs.write(this._path, byte);
    }
}
