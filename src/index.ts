import 'ts-path-mapping';
import { Ormconfig } from '@tool/ormconfig';

console.clear();
console.log('--##<< Test Typeorm UTC issue >>##--\n');

(async function() {
    const config = new Ormconfig();

    console.log('>> Checking "ormconfig.json"...');
    if (!await config.exists()) {
        console.log('>> Generating "ormconfig.json" file...');
        await config.generate();
        console.log('>> File generated successfully!');
    } else {
        console.log('>> File found, skip.');
    }
})();