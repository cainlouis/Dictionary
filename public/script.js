'use strict';

document.addEventListener('DOMContentLoaded', setup);

let global = [];

function setup() {
    let form = document.querySelector('form');
    form.addEventListener('submit', getDefinition);
    console.log("setup")
}

async function getDefinition(e) {
    e.preventDefault();

    console.log("submit")

    global.word = e.target.elements['word'].value.toLowerCase();

    console.log(global.word);

    let params = { word: global.word };
    let searchParams = new URLSearchParams(params);
    let url = "http://localhost:3000?" + searchParams.toString();
    console.log(url)
    try {
        let response = await fetch(url);
        if (response.ok) {
            global.definition = await response.text();
        }
        else {
            throw new Error('Status code:' + response.status)
        }
        displayDef();
    }
    catch (err) {
        displayErr(err);
    }
}

function displayErr(err) {
    console.error(err.message);
    let errPara = document.querySelector('.error');
    errPara.innerHTML = err.message;
}

function displayDef() {
    let def = document.querySelector('.definition');
    def.innerHTML = global.definition;
}