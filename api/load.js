//Use require to import the method
const fs = require("fs/promises");

//Module export to export using require
module.exports = async function load(path) {
    try {
        //read from file and parse it to json before returning object
        let data = await fs.readFile(path);
        return JSON.parse(data);
    } catch (err) {
        //Display the error message then throw error again to test
        console.error(err.message);
        throw err;
    }
}