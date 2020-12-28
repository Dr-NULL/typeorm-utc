# TypeORM UTC Date insertion issues

This is an example project to demostrate an issue with the date writing in typeorm. In this readme you will get information about of this problem, hoy to deploy the project, and finally, how to execute the test:

## Environment:
- The client is ejecuted in a windows 10  machine.
- The database is stored in a Windows Server 2019 Standard.
- The Database is a SQLExpress 2017.
- Node v14.15.3
- UTC -3

## The Problem:
- When you stores some dates with time `"00:00:00"`, TypeORM inserts that date with a incorrect day. For example, this date `"2020-12-02T03:00:00.000Z"` appears in the database as `"2020-12-01T03:00:00.000Z"`.

## Deploy:
- Execute these commands in your terminal:
```bash
npm i           # Install all dependencies
npx tsc         # Transpile the code to JS
node ./dist/    # Generate a generic ormconfig.json
```

- Configure your ormconfig with your connection.
- Create the test DB.
- Execute the test:
```bash
npm test
```