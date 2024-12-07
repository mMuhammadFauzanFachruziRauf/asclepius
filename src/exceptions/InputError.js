class InputError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InputError';
        this.statusCode = 400; 
    }

    toResponse() {
        return {
            status: 'fail',
            message: this.message || 'Kesalahan input'
        };
    }
}

module.exports = InputError;
