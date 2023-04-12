var equation = "0";
var length = 1;
var answer = "";
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
function sqrt() {
    if (equation != "0") {
        document.getElementById("equation").innerHTML += `√<input onkeyup="update('sqrt')" class="sqrt" type="text">`;
        equation += "√(";
    } else {
        document.getElementById("equation").innerHTML = `√<input onkeyup="update('sqrt')" class="sqrt" type="text">`;
        equation = "√(";
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
        if (equation.includes("√")) {
            let sqrts = document.getElementById("equation").innerHTML.match(/√\((-+|)(\d+|\d+.\d+)\)/g);
            for (let i=0; i<sqrts.length; i++) {
                document.getElementById("equation").innerHTML = document.getElementById("equation").innerHTML.replaceAll(sqrts[i], sqrts[i].slice(3, -1));
            }
        }
    } else {
        window.alert("Sorry! Not enough space!");
    }
    length = 0;
    for (let i=0; i<equation.length; i++) {
        if (equation[i] === ".") {
            length += 0.5;
        } else if (equation[i] !== "^" && equation[i] !== "(" && equation[i] !== ")") {
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
        .replaceAll('–', '-')
        .replaceAll('÷', '/')
        .replaceAll('︱', 'Math.abs(')
        .replaceAll('│', ')')
        .replaceAll('Ans', answer)
        .replaceAll('√', 'Math.sqrt')
        .replaceAll('--', "+");
    equation = equation.replace(/(?<=^|[\+\-\**\*\/\^])-([0-9]+)/g, "($1)");
    equation = equation.replaceAll("^", "**");
    equation = equation.replaceAll(/(\d*)π/g, (match, p1) => {
        if (p1) {
            return `${p1} * Math.PI`;
        } else {
            return "Math.PI";
        }
    });
    equation = equation.replaceAll(/(\d*)e/g, (match, p1) => {
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
    length += equation.length - equation.lastIndexOf("(");
    equation = equation.slice(0, equation.lastIndexOf("(")+1) + document.getElementsByClassName(type)[0].value + ")";
}