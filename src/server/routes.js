const postPredictHandler = require('../server/handler');
 
const routes = [
    {
      path: '/predict',
      method: 'POST',
      handler: postPredictHandler,
      options: {
        payload: {
          allow: 'multipart/form-data',
          multipart: true,
          maxBytes: 1000000, 
          parse: true, 
          output: 'stream', 
          failAction: (request, h, error) => {
            if (error.output.statusCode === 413) {
              return h.response({
                status: 'fail',
                message: `Payload content length greater than maximum allowed: 1000000`
              }).code(413).takeover();
            }
            throw error;
          }
        }
      }
    }
];

module.exports = routes;