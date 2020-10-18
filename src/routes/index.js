const apiRoute = require('./apis');

const init = (server) => {
    server.get('*', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });
    server.post('*', function (req, res, next) {
        console.log('Post Request was made to: ' + req.originalUrl);
        console.log(req.body);
        return next();
    });
    
    server.use('/api', apiRoute);
}
module.exports = {
    init: init
};