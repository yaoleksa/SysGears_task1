const parse = require('http-body-json-parse');
const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 5000;


// Define measure
const rawData = fs.readFileSync('./measure.json');
const measure = JSON.parse(rawData);

// Define convert logic
const convert = (u, v, c) => {
    let res;
    if(measure[u] < measure[c]) {
        res = (parseFloat(v) * parseFloat(measure[u])) / parseFloat(measure[c]);
    } else {
        res = (parseFloat(measure[u]) / parseFloat(measure[c])) * parseFloat(v);
    }
    return {
        "unit": u,
        "value": res.toFixed(2)
    }
}

const server = http.createServer((req, res) => {
    if(req.method == 'POST') {
        parse(req, 500).then(data => {
            res.end(JSON.stringify(convert(data.distance.unit, data.distance.value, data.convertTo)));
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
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});