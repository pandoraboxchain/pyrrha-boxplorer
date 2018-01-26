const connect = require('connect');
const serveStatic = require('serve-static');
const config = require('../config/development');

connect().use(serveStatic(__dirname + '/../docroot')).listen(config.port, function(){
    console.log(`Server running on ${config.port}...`);
});
