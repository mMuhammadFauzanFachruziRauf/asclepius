class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ClientError';
    }

    toResponse() {
        return {
            status: 'fail',
            message: this.message || 'Terjadi kesalahan'
        };
    }
}

module.exports = ClientError;
