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
function equals() {
    equation = equation
        .replaceAll('×', '*')
        .replaceAll('–', '-')
        .replaceAll('÷', '/');
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
    for (let i in equation.split("")) {
        if (i == ".") {
            length += 0.5;
        } else {
            length++;
        }
    }
}