//Nael Louis, 1934115
/**
 * Function to create server and return all definition of the word the user entered from the json 
 * @param {*} json data.json received from load function
 */
function startServer(json) {
    //import `http` module with CJS
    const http = require("http");
    //import `load` function with CJS
    const load = require("../api/load.js");
    //create a server
    let server = http.createServer();
    //attach event listener for request event
    //req encapsulates the HTTP incoming message, res is the HTTP response
    server.on("request", async function (req, res) {
        //the second parameter indicates the base URL
        //required if we don't know if the url is relative
        const url = new URL(req.url, `http://${req.headers.host}`);
        //get word from the url 
        let word = url.searchParams.get('word');
        //if it returns a null value set header to 404
        if (word !== null) {
            //check if the value the user entered exist in json
            if (!json.hasOwnProperty(word)) {
                //if not try the lowerCase equivalent
                word = url.searchParams.get('word').toLowerCase();
            }
            //if the value exist in json
            if (json.hasOwnProperty(word)) {
                //set header to avoid Cross-Origin-Resource-Sharing errors 
                res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
                //http header with status code and other name:value pairs
                res.writeHead(200, { "Content-Type": "text/plain" });
                //write the definition at 0
                res.write(JSON.stringify(json[word]));
            } else {
                //set header to avoid Cross-Origin-Resource-Sharing errors 
                res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
                //write 404 for the header
                res.writeHead(404, { 'Error': 'No such word in dictionary.' });
            }
        } else {
            res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
            res.writeHead(404, { 'Error': 'Network connection error.' });
        }
        // End the response
        res.end();
    });
    //start listening with the server on port 3000
    server.listen(3000);
}

/**
 * IIFE to get the json before creating the server and listening to the port
 */
(async () => {
    //import `load` function with CJS
    const load = require("../api/load.js");
    try {
        let json = await load('./api/data.json');
        if (json !== null && json !== undefined) {
            startServer(json);
        }
        else {
            throw new Error("Couldn't load the server");
        }
    } catch (err) {
        console.error(err.message);
    }
})();