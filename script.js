var equation = "0";
var length = 1;
var answer = "";
function redo() {
    length = 1;
    equation = "0";
    document.getElementById("equation").innerHTML = "0";
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
            if (digit == ".") {
                length += 0.5;
            } else if (digit == "÷" || digit == "%" || digit == "×" || digit == "÷") {
                length += 1.25;
            } else {
                length++;
            }
        } else {
            equation = digit;
        }
        document.getElementById("equation").innerHTML = equation;
    } else {
        window.alert("Sorry! Not enough space!");
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
        .replaceAll('Ans', answer);
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
    if (equation.includes("*") && !equation.includes("Math.PI") && !equation.includes("Math.E")) {
        var numbers = equation.split("*");
        var round = 0;
        for (let i=0; i<numbers.length; i++) {
            if (numbers[i].includes(".")) {
                round += numbers[i].split(".")[1].length;
            }
        }
        equation = Number(eval(equation).toFixed(round));
    } else {
        equation = eval(equation);
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