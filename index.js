'use strict';

const colorDict = {
    2: "Beige",
    4: "Bisque",
    8: "LightSalmon",
    16: "DarkSalmon",
    32: "Coral",
    64: "OrangeRed",
    128: "Gold",
    256: "Orange",
    512: "OrangeRed",
    1024: "Turquoise",
    2048: "Teal",
    4096: "Silver",
    8192: "Olive",
    16384: "Azure",
};

var reached1024 = false;
var bestScore = 0;
var score = 0;
var moves = 0;

var upButton = document.getElementById("up-button");
var leftButton = document.getElementById("left-button");
var rightButton = document.getElementById("right-button");
var downButton = document.getElementById("down-button");

upButton.addEventListener("click", handleUpButton);
leftButton.addEventListener("click", handleLeftButton);
rightButton.addEventListener("click", handleRightButton);
downButton.addEventListener("click", handleDownButton);

if (localStorage.bestScore) {
    bestScore = localStorage.bestScore;
    document.getElementById("best-score-value").innerHTML = bestScore;
} else {
    localStorage.bestScore = 0;
}
localStorage.setItem("score", 0);
localStorage.setItem("moves", 0);

generateTile();

function handleUpButton(e) {
    incrementMoves();
    for (let col = 0; col < 4; col++) {
        let destRow = 0;
        for (let row = 0; row < 4; row++) {
            if (destRow === row) {
                continue;
            }
            if (!isTileEmpty(row, col)) {
                let tileVal = getTileValue(row, col);
                if (isTileEmpty(destRow, col)) {
                    //console.log("move " + row + "-" + col + " to " + destRow + "-" + col);
                    assignTile(destRow, col, tileVal);
                    emptyTile(row, col);
                } else {
                    let destVal = getTileValue(destRow, col);
                    if (destVal === tileVal) {
                        //console.log("combine " + row + "-" + col + " with " + destRow + "-" + col);
                        addScore(tileVal);
                        assignTile(destRow, col, tileVal*2);
                        reached1024 = tileVal === 512;
                        emptyTile(row, col);
                    } else {
                        let newDest = destRow+1;
                        //console.log("move " + row + "-" + col + " to " + newDest + "-" + col);
                        emptyTile(row, col);
                        assignTile(destRow+1, col, tileVal);
                    }
                    destRow++;
                }
            }
        }
    }
    generateTile();
    if (isGameOver()) {
        handleGameOver();
    }
}

function handleLeftButton(e) {
    incrementMoves();
    for (let row = 0; row < 4; row++) {
        let destCol = 0;
        for (let col = 0; col < 4; col++) {
            if (destCol === col) {
                continue;
            }
            if (!isTileEmpty(row, col)) {
                let tileVal = getTileValue(row, col);
                if (isTileEmpty(row, destCol)) {
                    //console.log("move " + row + "-" + col + " to " + destCol + "-" + col);
                    assignTile(row, destCol, tileVal);
                    emptyTile(row, col);
                } else {
                    let destVal = getTileValue(row, destCol);
                    if (destVal === tileVal) {
                        //console.log("combine " + row + "-" + col + " with " + destCol + "-" + col);
                        addScore(tileVal);
                        assignTile(row, destCol, tileVal*2);
                        reached1024 = tileVal === 512;
                        emptyTile(row, col);
                    } else {
                        //let newDest = destCol+1;
                        //console.log("move " + row + "-" + col + " to " + newDest + "-" + col);
                        emptyTile(row, col);
                        assignTile(row, destCol+1, tileVal);
                    }
                    destCol++;
                }
            }
        }
    }
    generateTile();
    if (isGameOver()) {
        handleGameOver();
    }
}

function handleRightButton(e) {
    incrementMoves();
    for (let row = 0; row < 4; row++) {
        let destCol = 3;
        for (let col = 3; col >= 0; col--) {
            if (destCol === col) {
                continue;
            }
            if (!isTileEmpty(row, col)) {
                let tileVal = getTileValue(row, col);
                if (isTileEmpty(row, destCol)) {
                    //console.log("move " + row + "-" + col + " to " + destCol + "-" + col);
                    assignTile(row, destCol, tileVal);
                    emptyTile(row, col);
                } else {
                    let destVal = getTileValue(row, destCol);
                    if (destVal === tileVal) {
                        //console.log("combine " + row + "-" + col + " with " + destCol + "-" + col);
                        addScore(tileVal);
                        assignTile(row, destCol, tileVal*2);
                        reached1024 = tileVal === 512;
                        emptyTile(row, col);
                    } else {
                        //let newDest = destCol+1;
                        //console.log("move " + row + "-" + col + " to " + newDest + "-" + col);
                        emptyTile(row, col);
                        assignTile(row, destCol-1, tileVal);
                    }
                    destCol--;
                }
            }
        }
    }
    generateTile();
    if (isGameOver()) {
        handleGameOver();
    }
}

function handleDownButton(e) {
    incrementMoves();
    for (let col = 0; col < 4; col++) {
        let destRow = 3;
        for (let row = 3; row >= 0; row--) {
            if (destRow === row) {
                continue;
            }
            if (!isTileEmpty(row, col)) {
                let tileVal = getTileValue(row, col);
                if (isTileEmpty(destRow, col)) {
                    //console.log("move " + row + "-" + col + " to " + destRow + "-" + col);
                    assignTile(destRow, col, tileVal);
                    emptyTile(row, col);
                } else {
                    let destVal = getTileValue(destRow, col);
                    if (destVal === tileVal) {
                        //console.log("combine " + row + "-" + col + " with " + destRow + "-" + col);
                        addScore(tileVal);
                        assignTile(destRow, col, tileVal*2);
                        reached1024 = tileVal === 512;
                        emptyTile(row, col);
                    } else {
                        //let newDest = destRow+1;
                        //console.log("move " + row + "-" + col + " to " + newDest + "-" + col);
                        emptyTile(row, col);
                        assignTile(destRow-1, col, tileVal);
                    }
                    destRow--;
                }
            }
        }
    }
    generateTile();
    if (isGameOver()) {
        handleGameOver();
    }
}


// random integer between min and max (inclusive)
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addScore(toAdd) {
    score = score + toAdd;
    if (score > bestScore) {
        bestScore = score;
        document.getElementById("best-score-value").innerHTML = bestScore;
        localStorage.bestScore = bestScore;
    }
    localStorage.score = score;
    document.getElementById("score-value").innerHTML = score;
}

function incrementMoves() {
    moves++;
    localStorage.moves = moves;
    document.getElementById("move-value").innerHTML++;
}

function isTileEmpty(row, col) {
    let tileId = row + "-" + col;
    //console.log(tileId);
    let tile = document.getElementById(tileId);
    return tile.style.backgroundColor === "";
}

function getTileValue(row, col) {
    let tileId = row + "-" + col;
    let tile = document.getElementById(tileId);
    return tile === null ? null : parseInt(tile.innerHTML);
}

function assignTile(row, col, val) {
    let tileId = row + "-" + col;
    let tile = document.getElementById(tileId);
    tile.innerHTML = val;
    tile.style.backgroundColor = colorDict[val];
}

function emptyTile(row, col) {
    let tileId = row + "-" + col;
    let tile = document.getElementById(tileId);
    tile.innerHTML = "";
    tile.style.backgroundColor = "";
}

function generateTile() {
    if (isBoardFull()) return;
    let row;
    let col;
    let tileId;
    while (true) {
        row = randomInteger(0, 3);
        col = randomInteger(0, 3);
        if (isTileEmpty(row, col)) {
            if (reached1024) {
                let dice = Math.random();
                if (dice < 0.4) {
                    assignTile(row, col, 2);
                } else if (dice < 0.8) {
                    assignTile(row, col, 4);
                } else {
                    assignTile(row, col, 8);
                }
            } else {
                if (Math.random() < 0.5) {
                    assignTile(row, col, 2);
                } else {
                    assignTile(row, col, 4);
                }
            }
            return;
        }
    }
}

function hasSameNeighbor(row, col) {
    let nbr = [[row+1, col], [row-1, col], [row, col-1], [row, col+1]];
    let val = getTileValue(row, col);
    for (let i = 0; i < nbr.length; i++) {
        if (val === getTileValue(nbr[i][0], nbr[i][1])) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (isTileEmpty(row, col)) {
                return false;
            }
        }
    }
    return true;
}

function isGameOver() {
    if (isBoardFull()) {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (hasSameNeighbor(row, col)) {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
}

function handleGameOver() {
    location.href = "over.html";
}