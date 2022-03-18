import { Movement } from '@entities/movement.entity';
import { Ormconfig } from '@tool/ormconfig';
import { DateFix7225 } from '@tool/typeorm';
import { assert } from 'chai';
import { DataSource } from 'typeorm';

async function loop(conn: DataSource, date: Date): Promise<void> {
    const moment = date.getTime();
    for (let i = 0; i <= 20; i++) {
        const date = new Date(moment + (i * 60000));            
        const item = new Movement();
        item.json = date.toJSON();
        item.date = date;
        item.dateDecoUTC = date;
        item.dateFuncUTC = DateFix7225(date);
        await conn.manager.save(item);
    }
}

describe('TypeORM UTC issue', () => {
    let conn: DataSource;
    before(async () => {
        const config = await new Ormconfig().load();
        conn = new DataSource(config);

        await conn.initialize();
        await conn.synchronize(true);
    });

    after(async () => {
        await conn.destroy();
    });

    it('Insert data', async () => {
        await loop(conn, new Date(2022, 11, 31, 20, 50));
        await loop(conn, new Date(2022, 11, 31, 23, 50));
    });

    it('Check data', async () => {
        const resp = await conn.manager.find(Movement, {
            where: [
                { id: 10 },
                { id: 11 },
                { id: 12 },
                { id: 31 },
                { id: 32 },
                { id: 33 },
            ]
        });

        function check(i: number, yy: number, mm: number, dd: number) {
            assert.strictEqual(resp[i].dateDecoUTC.getFullYear(), yy);
            assert.strictEqual(resp[i].dateDecoUTC.getFullYear(), yy);

            assert.strictEqual(resp[i].dateDecoUTC.getMonth(), mm);
            assert.strictEqual(resp[i].dateFuncUTC.getMonth(), mm);

            assert.strictEqual(resp[i].dateDecoUTC.getDate(), dd);
            assert.strictEqual(resp[i].dateFuncUTC.getDate(), dd);
        }

        assert.lengthOf(resp, 6);
        check(0, 2022, 11, 31);
        check(1, 2022, 11, 31);
        check(2, 2022, 11, 31);
        check(3, 2022, 11, 31);
        check(4, 2023,  0,  1);
        check(5, 2023,  0,  1);
    });
});