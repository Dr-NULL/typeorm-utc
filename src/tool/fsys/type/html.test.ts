import { assert } from 'chai';
import { Html } from './html';

interface Data {
    title: string;
    name: string;
    value: number;
}

describe('Testing "./tool/fsys/type/html"', () => {
    it('Create a html file', async () => {
        const html = new Html<Data>('./test.html');
        await html.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta content="utf-8" />
                <meta name="viewport" content="width=viewport-width, initial-scale=1, shrink-to-fit=no" />
                <title>{{ this.title }}</title>
            </head>
            <body>
                <h2>Test:</h2>
                <p><strong>Name:</strong> {{ this.name }}</p>
                <p><strong>Value:</strong> {{ this.value }}</p>
            </body>
        </html>
        `);
    });

    it('Get parsed value', async () => {
        const html = new Html<Data>('./test.html');
        const text = await html.read({
            title: 'New Page',
            name: 'User Test',
            value: 951665216
        });

        assert.exists(text.match(/<title>new\spage<\/title>/gi));
        assert.exists(text.match(/<p><strong>Name:<\/strong>\suser\stest<\/p>/gi));
        assert.exists(text.match(/<p><strong>Value:<\/strong>\s951665216<\/p>/gi));
    });

    it('Delete the html File', async () => {
        const html = new Html<Data>('./test.html');
        await html.delete();
    });
});
