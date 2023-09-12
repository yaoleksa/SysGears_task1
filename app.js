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
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    });
    if(req.method == 'POST') {
        parse(req, 500).then(data => {
            res.write(JSON.stringify(convert(data.distance.unit, data.distance.value, data.convertTo)), 
            (err) => {
                res.end();
            });
        });
    }
    res.write(JSON.stringify(measure), (err) => {
        res.end();
    });
});
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});