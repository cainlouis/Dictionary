//import `http` module with CJS
const http = require("http");
//import `load` function with CJS
const load = require("../api/load.js");
//get the json
let json = await load('../api/data.json');
//create a server
let server = http.createServer();
//attach event listener for request event
//req encapsulates the HTTP incoming message, res is the HTTP response
server.on("request", async function (req, res) {
    //set header to avoid Cross-Origin-Resource-Sharing errors 
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
    //http header with status code and other name:value pairs
    res.writeHead(200, { "Content-Type": "text/plain" });
    //the second parameter indicates the base URL
    //required if we don't know if the url is relative
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.searchParams.has('word')) {
        //get word
        let word = url.searchParams.get('word');
        //write the definition at 0
        res.write(json[word][0]);
    } else {
        res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
        res.writeHead(404);
    }
    // End the response
    res.end();
});
//start listening with the server on port 3000
server.listen(3000);

