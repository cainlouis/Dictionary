//import `http` module with CJS
const http = require("http");
//import `load` function with CJS
const load = require("./load.js");
//
let json = await load('./data.json');
//create a server
let server = http.createServer();
//attach event listener for request event
//req encapsulates the HTTP incoming message, res is the HTTP response
server.on("request", async function (req, res) {
    //the second parameter indicates the base URL
    //required if we don't know if the url is relative
    const url = new URL(req.url, `http://${req.headers.host}`);
    //set header to avoid these issues
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    //http header with status code and other name:value pairs
    res.writeHead(200, { "Content-Type": "text/plain" });
    if (url.searchParams.has('word')) {
        //get word
        let word = url.searchParams.get('word');
        //get the json 
        json = await load('./data.json');
        //write the definition at 0
        res.write(json.word[0]);
    } else {
        res.writeHead(404);
    }
    // End the response
    res.end();
});
//start listening with the server on port 3000
server.listen(3000);

