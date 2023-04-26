var equation = "0";
var length = 1;
var answer = "";
const button = document.getElementById("myButton");
const input = document.getElementsByTagName("input");
const paragraph = document.getElementById("myParagraph");

button.addEventListener("mousedown", () => {
  input.value = "Button clicked!";
});

button.addEventListener("mouseup", () => {
  input.value = "";
});

button.addEventListener("mouseleave", () => {
  paragraph.textContent = "Button not clicked!";
});

button.addEventListener("mouseenter", () => {
  paragraph.textContent = "";
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
    document.getElementById("equation").innerHTML += `<sup><input onkeyup="update('pow')" class="pow" type="text"></sup>`;
    equation += "^(";
}
function frac() {
    if (equation != "0") {
        document.getElementById("equation").innerHTML += `<sup><input onkeyup="update('numer')" class="numer" type="text"></sup>&frasl;<sub><input onkeyup="update('denom')" class="denom" type="text"></sub></frac>`;
        equation += "(";
    } else {
        document.getElementById("equation").innerHTML = `<sup><input onkeyup="update('numer')" class="numer" type="text"></sup>&frasl;<sub><input onkeyup="update('denom')" class="denom" type="text"></sub></frac>`;
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
    if (length < 25) {
        if (equation != "0" || digit == "." || digit == "!" || digit == "%" || digit == "+" || digit == "–" || digit == "×" || digit == "÷") {
            equation += digit;
        } else {
            equation = digit;
           }
        document.getElementById("equation").innerHTML = equation;
        if (equation.includes("^")) {
            let indices = document.getElementById("equation").innerHTML.match(/\^\((-+|)(\d+|\d+.\d+)\)/g);
            for (let i=0; i<indices.length; i++) {
                document.getElementById("equation").innerHTML = document.getElementById("equation").innerHTML.replaceAll(indices[i], `<sup>${indices[i].slice(2, -1)}</sup>`);
            }
        }
        if (equation.includes("[")) {
            document.getElementById("equation").innerHTML = document.getElementById("equation").innerHTML.replaceAll(/\(\[(\d+.\d+|\d+)\]\/\[(\d+.\d+|\d+)\]\)/g, `<sup>$1</sup>&frasl;<sub>$2</sub>`);
        }
    } else {
        window.alert("Sorry! Not enough space!");
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
        .replaceAll('--', "+")
        .replaceAll('︱', 'Math.abs(')
        .replaceAll('│', ')')
        .replaceAll(/\√(\-?\d+|\d+.\d+)/g, "Math.sqrt($1)")
        .replaceAll('--', "+")
        .replaceAll('[', '(')
        .replaceAll(']', ')')
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
    equation = equation.replaceAll(/\√(\d+.\d+|\d+|e|π)/g, "Math.sqrt($1)");
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
        const factor = equation.match(/([0-9]+)!/gi);
        for (let i = 0; i < factor.length; i++) {
            equation = equation.replaceAll(factor[i], factorial(Number(factor[i].slice(0, -1))));
        }
    }
    if (equation.includes("%")) {
        const percent = equation.match(/([0-9]+|\d+\.\d+)(\*?)%/g);
        for (let i = 0; i < percent.length; i++) {
            equation = equation.replaceAll(percent[i], Number(percent[i].slice(0, -1)) / 100);
        }
    }
    if ((equation.includes("*") && !equation.includes("**")) && !equation.includes("Math.PI") && !equation.includes("Math.E")) {
        var numbers = equation.split("*");
        var round = 0;
    }
    var round = 0;
    if (equation.includes("^")) {
        console.log(equation);
        var numbers = equation.match(/\^\((\d+.\d+|\d+)\)/g);
        console.log(numbers);
        for (let i=0; i<numbers.length; i++) {
            if (!numbers[i].includes(".")) {
                round += numbers[i].slice(2, numbers[i].length).length;
            }
        }
    }
    equation = equation.replaceAll("^", "**");
    if (round == 0) {
        equation = eval(equation);
    } else {
        equation = Number(eval(equation).toFixed(round));
    }
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
        let divs = equation.match(/\(\[(\d+.\d+|\d+|)\]\/\[(\d+.\d+|\d+|)\]\)/g);
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