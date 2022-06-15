//import `load` function with CJS
const load = require('../api/load.js');

//Test a small json file 
test('file found and parsed sucessfully', async () => {
    //get the json object from the load function
    let data = await load('./__tests__/testfile.json');
    //This is the string we expect from the json
    let expected = "A rechargeable device for storing electrical energy in the form of chemical energy, consisting of one or more separate secondary cells.\\n(Source: CED)";
    //test that the string is the same from the query
    expect(data.accumulator[0]).toMatch(expected);
})

//test the load function with a non json file 
test('file that is not in json format ', async () => {
    expect.assertions(1);
    try {
        //try to get the oject, this will throw an error
        await load('./__tests__/test.txt');
    } catch (e) {
        //verify we get the error expected
        expect(e.message).toMatch('Unexpected');
    }
})

//test the load function with a file that does not exist
test('file that is not in json format ', async () => {
    expect.assertions(1);
    try {
        //try to get the oject, this will throw an error
        await load('./__tests__/newtest.txt');
    } catch (e) {
        //verify we get the error expected
        expect(e.message).toMatch('no such');
    }
})
