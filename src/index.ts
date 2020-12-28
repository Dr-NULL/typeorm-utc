import { OrmConfig } from './tool/config';

// Check ormconfig.json existence
async function main() {
    const conf = new OrmConfig();
    if (await conf.exists) {
        console.log('The file it\'s already created. Execute "npm test" for initialize the mocha tests.');
    } else {
        console.log('Creating the "ormconfig.json" file. Please wait...');
        await conf.new();
        console.log('File created, now check the file configuration, and later, execute "npm test" for initialize the mocha tests.');
    }

    process.exit();
}

// Initialize
main();
