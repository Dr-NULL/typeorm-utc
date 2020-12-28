export class HasActiveConn extends Error {
    public constructor() {
        super();
        this.message = 'The application has already active connections, so you can\'t reopen the same connections.';
    }
}
