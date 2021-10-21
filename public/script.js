//Nael Louis, 1934115
'use strict';

document.addEventListener('DOMContentLoaded', setup);

let global = [];

/**
 * called on DOMContentLoaded, add the event listener to the form and initialize certain variable.
 */
function setup() {
    let form = document.querySelector('form');
    form.addEventListener('submit', getDefinition);
    global.defContainer = document.querySelector('section');
    global.errPara = document.querySelector('.error');
}

/**
 * On submit this function fetch the definition of the word inserted in the from from
 * the backend. 
 * @param {*} e event submit from the form
 */
async function getDefinition(e) {
    e.preventDefault();
    //get the user input
    global.word = e.target.elements['word'].value;

    //make the word as url parameter and add it to the url
    let params = { word: global.word };
    let searchParams = new URLSearchParams(params);
    let url = "http://localhost:3000?" + searchParams.toString();
    //request the definition from the server side and store the result in a global variable
    try {
        let response = await fetch(url);
        if (response.ok) {
            global.definition = await response.text();
        }
        //throw an error if the response is not ok
        else {
            throw new Error(response.status + ": " + response.statusText);
        }
        //display definition if response ok
        displayDef();
    }
    catch (err) {
        //display the error if response not ok
        displayErr(err);
    }
}

/**
 * Get the error thrown by the fetch and insert the err message in the error paragraph in html
 * @param {*} err 
 */
function displayErr(err) {
    //Remove any previous text 
    clearAllParagraph();
    //insert error into error paragraph
    global.errPara.innerHTML = err.message;
}

/**
 * displayDef parse the string received from the backend and parse it
 * then goes through the json to create a p element and insert the text in the paragraph created.
 */
function displayDef() {
    //Remove any previous text
    clearAllParagraph();
    //parse the string received 
    let arr = JSON.parse(global.definition);
    //then for every definitions given create a paragraph
    for (let i = 0; i < arr.length; i++) {
        let p = document.createElement('p');
        //inser the text from the json
        p.innerHTML = (i+1) + " - " + arr[i];
        //add class for the css and add paragraph to section
        p.classList.add("definition");
        global.defContainer.appendChild(p);
    }
}

/**
 * this function clear the text in the error paragraph and the p element in section.
 */
function clearAllParagraph() {
    global.errPara.innerHTML = "";
    //Remove previous paragraph that have the class definition
    let allDef = document.querySelectorAll(".definition");
    allDef.forEach(node => node.remove());
}
