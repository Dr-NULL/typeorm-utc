import { Movement } from './entities/movement.entity';
import { Connection, createConnections } from 'typeorm';
import { assert } from 'chai';

describe('Testing issue #7225', () => {
    // Create all database schema
    let conns: Connection[];
    before(async function() {
        this.timeout(20000);
        conns = await createConnections();
        for (const conn of conns) {
            await conn.synchronize(true);
        }
    });
    
    // Destroy all database schema
    after(async function() {
        this.timeout(20000);
        for (const conn of conns) {
            // await conn.dropDatabase();
            await conn.close();
        }
    });

    it('Create data from 23:59 to 04:01', async function() {
        this.timeout(Number.MAX_SAFE_INTEGER);

        // Date on 1st January 2022, at 04:01:00.000
        const end = new Date(2022, 0, 1, 4, 1, 0, 0).getTime();
        // Date on 31th December 2021, at 23:59:00.000
        let now = new Date(2021, 11, 31, 23, 59, 0, 0).getTime();

        do {
            const obj = new Movement();
            now += 1000;

            obj.date = new Date(now);
            obj.json = obj.date.toJSON();

            await obj.save();
        } while (now < end);
    });

    it('Check all: this.date.toJSON() === this.json', async function() {
        this.timeout(Number.MAX_SAFE_INTEGER);
        const data = await Movement.find();

        for (const mov of data) {
            assert.strictEqual(mov.date.toJSON(), mov.json);
        }
    });
});