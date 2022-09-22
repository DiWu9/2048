'use strict';

function handleOnClick() {
    location.href = "index.html";
}

function loadScore() {
    if (localStorage.score) {
        document.getElementById("score-result").innerHTML = localStorage.score;
    }
    if (localStorage.moves) {
        document.getElementById("moves-result").innerHTML = localStorage.moves;
    }
}