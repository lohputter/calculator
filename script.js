var equation = "0";
var length = 1;
function redo() {
    length = 1;
    equation = "0";
    document.getElementById("equation").innerHTML = "0";
}
function num(digit) {
    if (length < 25) {
        if (equation != "0" || digit == "." || digit == "!" || digit == "%" || digit == "+" || digit == "–" || digit == "×" || digit == "÷") {
            equation += digit;
            if (digit == ".") {
                length += 0.5;
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
function equals() {
    equation = equation
        .replaceAll('×', '*')
        .replaceAll('–', '-')
        .replaceAll('÷', '/');
    if (equation.includes("!")) {
        const factor = equation.match(/([0-9]+)!/gi);
        for (let i = 0; i < factor.length; i++) {
            equation = equation.replaceAll(factor[i], factorial(Number(factor[i].slice(0, -1))));
        }
    }
    if (equation.includes("%")) {
        const percent = equation.match(/([0-9]+(|.[0-9]+))%/gi);
        for (let i = 0; i < percent.length; i++) {
            equation = equation.replaceAll(percent[i], Number(percent[i].slice(0, -1))/100)
        }
    }   
    if (equation.includes("*")) {
        var numbers = equation.split("*");
        var round = 0;
        for (let i=0; i<numbers.length; i++) {
            round += (numbers[i].split(".").length != 1) ? numbers[i].split(".")[1].length: 0;
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
}