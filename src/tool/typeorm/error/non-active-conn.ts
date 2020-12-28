export class NonActiveConn extends Error {
    public constructor() {
        super();
        this.message = 'The application doesn\'t has active connections to close.';
    }
}