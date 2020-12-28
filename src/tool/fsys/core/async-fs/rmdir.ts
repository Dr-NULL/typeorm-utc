import * as fs from 'fs';

export function rmdir(path: string, options?: fs.RmDirOptions) {
    return new Promise<void>((resolve, reject) => {
        if (!options) {
            options = { recursive: true };
        }

        fs.rmdir(path, options, fail => {
            if (fail) {
                reject(fail);
            } else {
                resolve();
            }
        });
    });
}
