let data = {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "0": 0,
    "А": 1,
    "Б": 2,
    "В": 3,
    "Г": 4,
    "Д": 5,
    "Е": 6,
    "Ё": 7,
    "Ж": 8,
    "З": 9,
    "И": 1,
    "Й": 2,
    "К": 3,
    "Л": 4,
    "М": 5,
    "Н": 6,
    "О": 7,
    "П": 8,
    "Р": 9,
    "С": 1,
    "Т": 2,
    "У": 3,
    "Ф": 4,
    "Х": 5,
    "Ц": 6,
    "Ч": 7,
    "Ш": 8,
    "Щ": 8,
    "Ъ": 1,
    "Ы": 2,
    "Ь": 3,
    "Э": 4,
    "Ю": 5,
    "Я": 6,
    "а": 1,
    "б": 2,
    "в": 3,
    "г": 4,
    "д": 5,
    "е": 6,
    "ё": 7,
    "ж": 8,
    "з": 9,
    "и": 1,
    "й": 2,
    "к": 3,
    "л": 4,
    "м": 5,
    "н": 6,
    "о": 7,
    "п": 8,
    "р": 9,
    "с": 1,
    "т": 2,
    "у": 3,
    "ф": 4,
    "х": 5,
    "ц": 6,
    "ч": 7,
    "ш": 8,
    "щ": 8,
    "ъ": 1,
    "ы": 2,
    "ь": 3,
    "э": 4,
    "ю": 5,
    "я": 6
};

let COLORS = {
    0: "rgb(255,255,255)",
    1: "rgb(250,4,4)",
    2: "rgb(43,59,206)",
    3: "rgb(0,200,20)",
    4: "rgb(242,248,50)",
    5: "rgb(148,190,250)",
    6: "rgb(123,250,239)",
    7: "rgb(255,119,206)",
    8: "rgb(252,125,37)",
    9: "rgb(143,84,210)",
    BLACK: "rgb(0,0,0)"
}

let CELL_SIZE = 20;

let REACT_SIDES = {
    "SHORT": CELL_SIZE / 2,
    "MIDDLE": CELL_SIZE * Math.sqrt(3) /2,
    "LONG": CELL_SIZE
}

let CENTER = {
    x: 350,
    y: 350
}

let SWITCH = {
    SHOW: 1,
    HIDE: 2
}


// let input = {
//     text: "БАРДУКАРТЁМMИХАЙЛОВИЧ",
//     method: 1
// };

let input = {
    text: "28911986",
    method: 2
};

function getArray() {
    let arr = [];
    let mirror = [];
    for (let num of input.text) {
        arr.push(data[`${num}`]);
        mirror.unshift(data[`${num}`]);
    }
    return [...arr, ...mirror];
}

function calculateDigits(digitalMandala) {
    let lastLine = digitalMandala[digitalMandala.length - 1];
    console.log(lastLine.join(" "));
    if (lastLine.length < 2) return digitalMandala;
    let newLine = [];
    for (let i = 1; i < lastLine.length; i++) {
        newLine.push(calculatDigit(lastLine[i - 1], lastLine[i]));
    }
    digitalMandala.push(newLine);
    return calculateDigits(digitalMandala);
}

function calculatDigit(a, b) {
    let digit = a + b;
    switch (input.method) {
        case 1:
            digit = digit % 10;
            break;
        case 2:
            digit = digit < 10 ? digit : 1 + digit % 10;
            break;
    }
    return digit;
}

function draw() {
    if (document.querySelector('#clr').checked) clearCanvas();
    input.text = document.getElementById("subject").value.split(" ").join("");
    let digitalMandala = calculateDigits([getArray()]).reverse();
    let canvas = document.getElementById("canvas");
    let isBordered = document.querySelector('#border').checked;
    let size = Number.parseInt(document.getElementById("size").value);
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        let startRects = [[[CENTER], [CENTER], [CENTER], [CENTER], [CENTER], [CENTER]]];

        for (let row = 0; row < (digitalMandala.length < size ? digitalMandala.length : size); row++) {
            startRects.push([[], [], [], [], [], []]);
            for (let cell = 0; cell < digitalMandala[row].length; cell++) {
                for (let d = 0; d < 6; d++) {
                    let rects = drawCell(ctx, startRects[row][d][cell], COLORS[digitalMandala[row][cell]], d + 1, isBordered);
                    if (startRects[row + 1][d].length === 0) startRects[row + 1][d].push(rects[0]);
                    startRects[row + 1][d].push(rects[1]);
                }
            }
        }
    }
    addDigitModel(digitalMandala);
}

function drawCell(ctx, startRect, color, direction, isBordered) {
    let firstRect = {};
    let middleRect = {};
    let secondRect = {};
    switch (direction) {
        case 1:
            firstRect.x = startRect.x - REACT_SIDES.SHORT;
            firstRect.y = startRect.y - REACT_SIDES.MIDDLE;
            middleRect.x = startRect.x;
            middleRect.y = firstRect.y - REACT_SIDES.MIDDLE;
            secondRect.x = startRect.x + REACT_SIDES.SHORT;
            secondRect.y = startRect.y - REACT_SIDES.MIDDLE;
            break;
        case 2:
            firstRect.x = startRect.x + REACT_SIDES.SHORT;
            firstRect.y = startRect.y - REACT_SIDES.MIDDLE;
            middleRect.x = firstRect.x + REACT_SIDES.LONG;
            middleRect.y = firstRect.y;
            secondRect.x = startRect.x + REACT_SIDES.LONG;
            secondRect.y = startRect.y;
            break;
        case 3:
            firstRect.x = startRect.x + REACT_SIDES.LONG;
            firstRect.y = startRect.y;
            secondRect.x = startRect.x + REACT_SIDES.SHORT;
            secondRect.y = startRect.y + REACT_SIDES.MIDDLE;
            middleRect.x = secondRect.x + REACT_SIDES.LONG;
            middleRect.y = secondRect.y;
            break;
        case 4:
            firstRect.x = startRect.x + REACT_SIDES.SHORT;
            firstRect.y = startRect.y + REACT_SIDES.MIDDLE;
            middleRect.x = startRect.x;
            middleRect.y = firstRect.y + REACT_SIDES.MIDDLE;
            secondRect.x = startRect.x - REACT_SIDES.SHORT;
            secondRect.y = startRect.y + REACT_SIDES.MIDDLE;
            break;
        case 5:
            firstRect.x = startRect.x - REACT_SIDES.SHORT;
            firstRect.y = startRect.y + REACT_SIDES.MIDDLE;
            middleRect.x = firstRect.x - REACT_SIDES.LONG;
            middleRect.y = firstRect.y;
            secondRect.x = startRect.x - REACT_SIDES.LONG;
            secondRect.y = startRect.y;
            break;
        case 6:
            firstRect.x = startRect.x - REACT_SIDES.LONG;
            firstRect.y = startRect.y;
            secondRect.x = startRect.x - REACT_SIDES.SHORT;
            secondRect.y = startRect.y - REACT_SIDES.MIDDLE;
            middleRect.x = secondRect.x - REACT_SIDES.LONG;
            middleRect.y = secondRect.y;
            break;
    }

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(startRect.x, startRect.y);
    ctx.lineTo(firstRect.x, firstRect.y);
    ctx.lineTo(middleRect.x, middleRect.y);
    ctx.lineTo(secondRect.x, secondRect.y);
    ctx.fill();

    if (isBordered) {
        ctx.fillStyle = COLORS.BLACK;
        ctx.beginPath();
        ctx.moveTo(startRect.x, startRect.y);
        ctx.lineTo(firstRect.x, firstRect.y);
        ctx.lineTo(middleRect.x, middleRect.y);
        ctx.lineTo(secondRect.x, secondRect.y);
        ctx.closePath();
        ctx.stroke();
    }
    return [firstRect, secondRect];
}

function clearCanvas() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addDigitModel(digitalMandala) {
    let divDM = document.getElementById("digitModel");
    let html = `<div id="closedDigitModel"><a href="#" onClick="switchDigitModel(SWITCH.SHOW);">Show digit model</a></div>` +
               `<div id="openedDigitModel" style="display: none;"><a href="#" onClick="switchDigitModel(SWITCH.HIDE);">Hide digit model</a><br/>`;
    digitalMandala.reverse();
    for (let line of digitalMandala) html += (line.join(" ") + `<br/>`);
    html += `</div`;
    divDM.innerHTML = html;
}

function switchDigitModel(type) {
    if (type === SWITCH.SHOW) {
        document.all.closedDigitModel.style = "display: none";
        document.all.openedDigitModel.style = "";
    } else {
        document.all.closedDigitModel.style = "";
        document.all.openedDigitModel.style = "display: none";
    }
}

function main() {
    input.text = input.text.toUpperCase();
    calculateDigits([getArray()]);
}

// main();
