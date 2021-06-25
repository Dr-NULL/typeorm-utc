import { Connection, createConnection } from "typeorm";
import { History } from '../entities/history.entity';
import { assert } from "chai";

describe('Test Issue #7225', () => {
    let conn: Connection;
    before(async function() {
        this.timeout(10000);
        conn = await createConnection();
        await conn.synchronize(true);
    });

    after(async function() {
        this.timeout(10000);
        await conn.dropDatabase();
        await conn.close();
    });

    it('Inserting Dates', async function() {
        this.timeout(Number.MAX_SAFE_INTEGER);
        const start = new Date(2020, 10, 30, 23, 50, 0).getTime();

        for (let i = 0; i < 20; i++) {
            const time = start + (i * 60000);
            const item = new History();
            
            item.dateRaw = new Date(time);
            item.dateFix = new Date(time);
            await item.save();
        }
    });

    it('Compare Dates', async function() {
        const data = await History.find();
        for (const item of data) {
            if (item.id === 11) {
                // In this part is where appears the error
                assert.notStrictEqual(item.dateRaw.getTime(), item.dateFix.getTime());
            } else {
                // Normal behaviors
                assert.strictEqual(item.dateRaw.getTime(), item.dateFix.getTime());
            }
        }
    });
});