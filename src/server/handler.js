const predictClassification = require('../services/inferenceService');
const InputError = require('../exceptions/InputError'); 
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
    try {
        const { image } = request.payload;
        const MAX_FILE_SIZE = 1000000; // 1 MB
        if (image._data.length > MAX_FILE_SIZE) {
            return h.response({
                status: 'fail',
                message: `Payload content length greater than maximum allowed: ${MAX_FILE_SIZE}`
            }).code(413);
        }
    
        
        const { model } = request.server.app;
        const { confidenceScore, label, suggestion } = await predictClassification(model, image._data);
        
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        
        const data = {
            id,
            result: label,
            suggestion,
            confidenceScore,
            createdAt
        };
        
        await storeData(id, data);
        
        return h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data
        }).code(201);
        
    } catch (error) {
        if (error instanceof InputError) {
            return h.response({
                status: 'fail',
                message: error.message
            }).code(400);
        }
        
        return h.response({
            status: 'error',
            message: error.message || 'Internal Server Error'
        }).code(500);
    }
}

module.exports = postPredictHandler;
