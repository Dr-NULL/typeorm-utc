import { createConnection } from 'typeorm';
import { JsonFile } from './app/json-file';

(async () => {
    try {
        console.clear();
        const json = new JsonFile('./ormconfig.json');
        console.log('[ EV ] -> Searching "ormconfig.json"');
    
        if (await json.exists()) {
            // Connect to database and syncronize the model
            console.log('[ OK ] -> File found!\n');
            console.log('[ EV ] -> Synchronizing models...');
            const conn = await createConnection();
            await conn.synchronize(true);

            console.log('[ OK ] -> Synchronization complete!');
            console.log('          Now execute "npm run start" for initialize the issue testing.');
        } else {
            // Create a new file
            console.log('[FAIL] -> File not found!\n');
            console.log('[ EV ] -> Generating a new "ormconfig.json"...');
            await json.generate();
            console.log('[ OK ] -> File creation complete!');
            console.log('          Now config your "ormconfig.json and execute "npm run config" again.');
        }
    } catch (err) {
        console.log('[FAIL] -> ERROR DETECTED:');
        console.log('         ', err.message);
    }

    process.exit();
})();
