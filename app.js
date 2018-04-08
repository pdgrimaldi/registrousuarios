const express = require('express');
const http = require('http');
const path = require('path');


const app = express();

app.use(express.static(__dirname + '/dist'));

// PathLocationStrategy
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/dist/index.html'));

})

const port = process.env.PORT || '3001';

app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running'));
