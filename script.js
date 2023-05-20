var equation = "0";
var length = 1;
var answer = "";
var input_clicks = [];
window.addEventListener("keypress", (event)=>{
    let keyPressed = event.key;
    if (keyPressed == "*") {
        keyPressed = "×";
    } else if (keyPressed == "-") {
        keyPressed = "–";
    } else if (keyPressed == "/") {
        keyPressed = "÷";
    }
    let keyCodes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "–", "×", "÷", "%", ".", "!"];
    if (keyCodes.includes(keyPressed) && !input_clicks.includes(true)) {
        num(keyPressed);
    }
});
function swap() {
    if (equation[0] != "0" && equation[0] != "–") {
        equation = "–" + equation;
        length++;
    } else {
        equation = equation.slice(1, equation.length+1);
        length--;
    }
    document.getElementById("equation").innerHTML = equation;
}
function redo() {
    length = 1;
    equation = "0";
    document.getElementById("equation").innerHTML = "0";
}
function pow() {
    document.getElementById("equation").innerHTML = equation;
    if (equation.includes("[")) {
        document.getElementById("equation").innerHTML = document.getElementById("equation").innerHTML.replaceAll(/\(\[(\d+.\d+|\d+|e|π|)\]\/\[(\d+.\d+|\d+|e|π|)\]\)/g, `<sup>$1</sup>&frasl;<sub>$2</sub>`);
    }
    if (equation.includes("^")) {
        let indices = document.getElementById("equation").innerHTML.match(/\^\((-+|)(\d+|\d+.\d+|e|π)\)/g);
        for (let i=0; i<indices.length; i++) {
            document.getElementById("equation").innerHTML = document.getElementById("equation").innerHTML.replaceAll(indices[i], `<sup>${indices[i].slice(2, -1)}</sup>`);
        }
    }
    document.getElementById("equation").innerHTML += `<sup><input onclick="setInput(${input_clicks.length})" onkeyup="update('pow')" class="pow" type="text"></sup>`;
    equation += "^(";
}
function frac() {
    if (equation != "0") {
        document.getElementById("equation").innerHTML += `<sup><input onclick="setInput(${input_clicks.length})" onkeyup="update('numer')" class="numer" type="text"></sup>&frasl;<sub><input onclick="setInput(${input_clicks.length+1})" onkeyup="update('denom')" class="denom" type="text"></input></sub>`;
        equation += "(";
    } else {
        document.getElementById("equation").innerHTML = `<sup><input onclick="setInput(${input_clicks.length})" onkeyup="update('numer')" class="numer" type="text"></sup>&frasl;<sub><input onclick="setInput(${input_clicks.length+1})" onkeyup="update('denom')" class="denom" type="text"></input></sub>`;
        equation = "(";
    }
}
function sqrt() {
    if (equation != "0") {
        document.getElementById("equation").innerHTML += `√`;
        equation += "√";
    } else {
        document.getElementById("equation").innerHTML = `√`;
        equation = "√";
    }
}
function del() {
    length--;
    equation = String(equation).slice(0, -1);
    document.getElementById("equation").innerHTML = equation;
    if (length < 1 || equation == "-") {
        document.getElementById("equation").innerHTML = "0";
        equation = "0";
        length = 1;
    }
}
function num(digit) {
    length = 0;
    for (let i=0; i<equation.length; i++) {
        if (equation[i] === ".") {
            length += 0.5;
        } else if (equation[i] !== "^" && equation[i] !== "(" && equation[i] !== ")") {
            length++;
        }
    }
    if (equation != "0" || digit == "." || digit == "!" || digit == "%" || digit == "+" || digit == "–" || digit == "×" || digit == "÷") {
        equation += digit;
    } else {
        equation = digit;
    }
    if (!input_clicks.includes(true)) {
        document.getElementById("equation").innerHTML = equation;
        if (equation.includes("^")) {
            let indices = document.getElementById("equation").innerHTML.match(/\^\((-+|)((\d+|\d+.\d+|e|π)(\+|\-|))+\)/g);
            for (let i=0; i<indices.length; i++) {
                document.getElementById("equation").innerHTML = document.getElementById("equation").innerHTML.replaceAll(indices[i], `<sup>${indices[i].slice(2, -1)}</sup>`);
            }
        }
        if (equation.includes("[")) {
            document.getElementById("equation").innerHTML = document.getElementById("equation").innerHTML.replaceAll(/\(\[(\d+.\d+|\d+|e|π|)\]\/\[(\d+.\d+|\d+|e|π|)\]\)/g, `<sup>$1</sup>&frasl;<sub>$2</sub>`);
        }
    } else {
        document.getElementsByTagName("input")[input_clicks.indexOf(true)].value += digit;
        update(document.getElementsByTagName("input")[input_clicks.indexOf(true)].className);
    }
    length = 0;
    for (let i=0; i<equation.length; i++) {
        if (equation[i] === ".") {
            length += 0.5;
        } else if (equation[i] !== "^" && equation[i] !== "(" && equation[i] !== ")" && equation[i] !== "[" && equation[i] !== "]") {
            length++;
        }
    }
}
function factorial(x) {
    if (x == 1) {
        return 1;
    } else {
        return x * factorial(x - 1);
    }
}
function abs() {
    equation = `︱${equation}│`;
    length++;
    document.getElementById("equation").innerHTML = equation;
}
function equals() {
    equation = equation
        .replaceAll('×', '*')
        .replaceAll('÷', '/')
        .replaceAll('–', '-')
        .replaceAll('+-', "-")
        .replaceAll('++', "+")
        .replaceAll('--', "+")
        .replaceAll('+-', "-")
        .replaceAll('-+', "-")
        .replaceAll('︱', 'Math.abs(')
        .replaceAll('│', ')')
        .replaceAll('++', "+")
        .replaceAll('Ans', answer);
    equation = equation.replace(/(?<=^|[\+\-\**\*\/])-([0-9]+)/g, "($1)");
    equation = equation.replaceAll("^", "**");
    let minus = equation.match(/(\d+\)|\d+.\d+|\d+|e|π)?-(\d+\)|\d+.\d+|\d+|e|π)/g);
    console.log(minus);
    if (minus != null) {
        for (let i=0; i<minus.length; i++) {
            if (minus[i].startsWith('-')) {
                console.log("so true", minus[i]);
                equation = equation.replaceAll(minus[i], `(${minus[i]})`);
                console.log(equation);
            }
        }
    }
    equation = equation.replaceAll(/\√(\d+.\d+|\d+|e|π|\(\[(\d+.\d+|\d+)\]\/\[(\d+.\d+|\d+)\]\))/g, "Math.sqrt($1)");
    equation = equation.replaceAll(/(\d*|e)π/g, (match, p1) => {
        if (p1) {
            return `${p1} * Math.PI`;
        } else {
            return "Math.PI";
        }
    });
    equation = equation.replaceAll(/(\d*|Math.PI)e/g, (match, p1) => {
        if (p1) {
            return `${p1} * Math.E`;
        } else {
            return "Math.E";
        }
    });
    if (equation.includes("!")) {
        let factor = equation.match(/([0-9]+)!/gi);
        for (let i = 0; i < factor.length; i++) {
            equation = equation.replaceAll(factor[i], factorial(Number(factor[i].slice(0, -1))));
        }
    }
    if (equation.includes("%")) {
        let percent = equation.match(/([0-9]+|\d+\.\d+)(\*?)%/g);
        for (let i = 0; i < percent.length; i++) {
            equation = equation.replaceAll(percent[i], Number(percent[i].slice(0, -1)) / 100);
        }
    }
    equation = equation
        .replaceAll("[", "(")
        .replaceAll("]", ")")
        .replaceAll("^", "**");
    equation = eval(equation);
    document.getElementById("equation").innerHTML = equation;
    length = 0;
    for (let i in String(equation)) {
        if (i === ".") {
            length += 0.5;
        } else {
            length++;
        }
    }
    answer = equation;
}

function update(type) {
    document.getElementsByClassName(type)[0].style.width = `${document.getElementsByClassName(type)[0].value.length * 2.5}%`;
    length += equation.length - equation.lastIndexOf("(");
    if (equation.includes("[")) {
        let divs = equation.match(/\(\[(\d+.\d+|\d+|e|π|)\]\/\[(\d+.\d+|\d+|e|π|)\]\)/g);
        if (divs != null) {
            length -= divs.length * 5;
        }
    }
    if (type=="pow") {
        equation = equation.slice(0, equation.lastIndexOf("(")+1) + document.getElementsByClassName(type)[0].value + ")";
    } else {
        equation = `${equation.slice(0, equation.lastIndexOf("(")+1)}[${document.getElementsByClassName('numer')[0].value}]/[${document.getElementsByClassName('denom')[0].value}])`;
    }
}
function setInput(number) {
    input_clicks = [];
    for (let i=0; i<document.getElementsByTagName("input").length; i++) {
        input_clicks.push(false);
    }
    input_clicks[number] = true;
    console.log(number, input_clicks);
}
window.addEventListener('click', (event) => {
    console.log(String(event.target));
    if ((!String(event.target).includes("Input"))) {
        input_clicks = [];
        for (let i=0; i<document.getElementsByTagName("input").length; i++) {
            input_clicks.push(false);
        }
    }   
    console.log(input_clicks);
});