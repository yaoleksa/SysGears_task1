const parse = require('http-body-json-parse');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.method == 'POST') {
        parse(req, 500).then(data => {
            const s = '' + data.num;
            res.end(JSON.stringify(s));
        });
    }
    fs.readFile('index.html', function(error, data){
        if(error){
            res.writeHead(404)
            res.write('Error: File not found')
        }else{
            res.write(data)
        }
        res.end()
    });
});
server.listen(3000, () => {
    console.log(`http://localhost:${3000}`);
});