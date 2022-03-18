import { assert } from 'chai';
import { Json } from './json';

interface Fake {
    text: string;
    value: number;
}

describe('Testing "./tool/ormconfig/json"', () => {
    const json = new Json<Fake>('./test.json');

    it('Create new file', async () => {
        const exists = await json.exists();
        assert.isFalse(exists);

        await json.save({
            text: 'jajaja',
            value: 666
        });
    });

    it('Load the previous file created', async () => {
        const exists = await json.exists();
        assert.isTrue(exists);

        const data = await json.load();
        assert.deepEqual(data, {
            text: 'jajaja',
            value: 666
        });
    });

    it('Delete the file', async () => {
        await json.kill();

        const exists = await json.exists();
        assert.isFalse(exists);
    });
});
