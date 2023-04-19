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
            let indices = document.getElementById("equation").innerHTML.match(/\^\((\d+|\d+.\d+)\)/g);
            for (let i=0; i<indices.length; i++) {
                document.getElementById("equation").innerHTML = document.getElementById("equation").innerHTML.replaceAll(indices[i], `<sup>${indices[i].slice(2, -1)}</sup>`);
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
        .replaceAll('÷', '/')
        .replaceAll('–', '-')
        .replaceAll('--', "+")
        .replaceAll('︱', 'Math.abs(')
        .replaceAll('│', ')')
        .replaceAll('Ans', answer);
    let minus = equation.match(/(\d+.\d+|\d+|e|π)?-(\d+.\d+|\d+|e|π)/g);
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
    equation = equation
        .replaceAll('^', '**')
        .replaceAll(/\√(\d+.\d+|\d+|e|π)/g, "Math.sqrt($1)");
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
    document.getElementsByClassName(type)[0].style.width = `${document.getElementsByClassName(type)[0].value.length * 2.5}%`;
    length += equation.length - equation.lastIndexOf("(");
    equation = equation.slice(0, equation.lastIndexOf("(")+1) + document.getElementsByClassName(type)[0].value + ")";
}