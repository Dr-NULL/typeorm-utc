import { assert } from 'chai';
import { Txt } from './txt';

describe('Testing "./tool/fsys/type/txt"', () => {
    it('Create file', async function() {
        const file = new Txt('./test-stream.txt');
        await file.append('hola ');
        await file.append('mundo ');
        await file.append('123');

        const data = await file.read();
        assert.strictEqual(data, 'hola mundo 123');
        await file.delete();
    });
});
