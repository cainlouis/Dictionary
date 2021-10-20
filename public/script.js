'use strict';

document.addEventListener('DOMContentLoaded', setup);

let global = [];

function setup() {
    let form = document.querySelector('form');
    form.addEventListener('submit', getDefinition);
    global.def = document.querySelector('.definition');
    global.errPara = document.querySelector('.error');
}

/**
 * 
 * @param {*} e 
 */
async function getDefinition(e) {
    e.preventDefault();

    global.word = e.target.elements['word'].value.toLowerCase();

    let params = { word: global.word };
    let searchParams = new URLSearchParams(params);
    let url = "http://localhost:3000?" + searchParams.toString();
    try {
        let response = await fetch(url);
        if (response.ok) {
            global.definition = await response.text();
        }
        else {
            throw new Error(response.status + ": " + response.statusText);
        }
        displayDef();
    }
    catch (err) {
        displayErr(err);
    }
}

function displayErr(err) {
    console.error(err.message);
    global.errPara.innerHTML = err.message;
    global.def.innerHTML = "";
}

function displayDef() {
    global.errPara.innerHTML = "";
    global.def.innerHTML = global.definition;
}