var http = require('http');
var port = process.env.NODE_ENV || 3000;
http.createServer(function (req, res) {
	var response = {};

	response.ipaddress = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

	response.software = req.headers['user-agent'].match(/\((.+?)\)/)[1];
	response.language = req.headers['accept-language'].split(',')[0];
    res.writeHead(200, {'Content-Type': 'application/json'});
    return res.end(JSON.stringify(response));
}).listen(port, function(err) {
    if (err) {
        return console.log('Server crashed due to: ', err);
    }
    
    return console.log('Server up and listening at port: ' + port);
});