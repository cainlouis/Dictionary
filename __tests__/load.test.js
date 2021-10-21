const load = require('../api/load.js');

test('file found and parsed sucessfully', async () => {
    let data = await load('./__tests__/testfile.json');
    let expected = "A rechargeable device for storing electrical energy in the form of chemical energy, consisting of one or more separate secondary cells.\\n(Source: CED)";
    expect(data.accumulator[0]).toMatch(expected);
})

test('file that is not in json format ', async () => {
    expect.assertions(1);
    try {
        await load('./__tests__/test.txt');
    } catch (e) {
        expect(e.message).toMatch('Unexpected');
    }
})

test('file that is not in json format ', async () => {
    expect.assertions(1);
    try {
        await load('./__tests__/newtest.txt');
    } catch (e) {
        expect(e.message).toMatch('no such');
    }
})