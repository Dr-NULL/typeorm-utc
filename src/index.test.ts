import { Connector } from './tool/typeorm';
import { assert } from 'chai';
import { DateTest } from './models/date-test.entity';

describe.only('Testing UTC date insertion issues:', () => {
    before(async function() {
        this.timeout(10000);
        await Connector.connect();
    });
    
    after(async function() {
        this.timeout(5000);
        await Connector.disconnect();
    });

    it('Clear "DateTest" table', async function() {
        this.timeout(90000);
        await DateTest.clear();

        const count = await DateTest.count();
        assert.strictEqual(count, 0);
    });

    it('Create entries', async function() {
        this.timeout(90000);
        let date = new Date(
            2020, 11, 1,   // Date
            0, 0, 0        // Time
        );

        for (let dd = 0; dd < 2; dd++) {
            for (let hh = 0; hh < 24; hh++) {
                for (let mm = 0; mm < 60; mm++) {
                    const ms = date.getTime() + (1000 * 60);
                    date = new Date(ms);
                    console.log(`Pushing "${date.toJSON()}"...`);

                    const item = new DateTest();
                    item.date = date;
                    await item.save();
                }
            }
        }
    });

    it('Check all dates', async function() {
        this.timeout(60000);
        const data = await DateTest.find();
        let date = new Date(
            2020, 11, 1,   // Date
            0, 0, 0        // Time
        );

        for (let dd = 0; dd < 2; dd++) {
            for (let hh = 0; hh < 24; hh++) {
                for (let mm = 0; mm < 60; mm++) {
                    const ms = date.getTime() + (1000 * 60);
                    date = new Date(ms);

                    const item = data.shift();
                    assert.strictEqual(
                        item.date.toJSON(),
                        date.toJSON()
                    );
                }
            }
        }
    });
});
