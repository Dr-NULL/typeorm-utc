import { Connection, ConnectionOptionsReader, createConnection, AlreadyHasActiveConnectionError } from 'typeorm';
import { Log } from '../log';

export module ConnectionQueue {
    const _conns: Connection[] = [];
    export function connections(): Connection[] {
        return _conns;
    }

    export async function connect(): Promise<void> {
        const read = new ConnectionOptionsReader({ root: process.cwd() });
        const json = await read.all();
        Log.ok('"ormconfig.json" sucessfully readed...\n');

        for (const opts of json) {
            // Verificar conexiones activas
            const found = _conns.some(x => x.name === opts.name);
            if (found) {
                throw new AlreadyHasActiveConnectionError(opts.name);
            }

            // Intentar conectar
            let loop = true;
            do {
                try {
                    // Abriendo conexión
                    Log.ev('Opening connections...');
                    const connMain = await createConnection(opts);
                    _conns.push(connMain);

                    // Marcar conexión como establecida
                    Log.ok(`Connection "${opts.name ?? 'default'}" successful!`);
                    loop = false;
                } catch (err: any) {
                    // Mostrar error
                    Log.er(
                        `The connection "${opts.name ?? 'default'}" has failed:`,
                        err?.message,
                        'Reload in 5 sec...\n'
                    );

                    // Esperar 5 segs
                    await new Promise(done => setTimeout(done, 5000));
                }
            } while (loop);
        }
    }

    export async function disconnect() {
        for (const conn of _conns) {
            await conn.close();
        }
    }
}
