let firstValue;
let isOperatorSelected;
let secondValue;
let currentOperator;

if (isOperatorSelected === undefined)
{
    isOperatorSelected = false;
}

//Get html elements
const textField = document.querySelector('p');

//Calc functions
function setCurrentValue(x) {
    if (firstValue === undefined && !isOperatorSelected && secondValue === undefined) {
        firstValue = x;
        textField.textContent = `${firstValue}`;
    } else if (firstValue != undefined && !isOperatorSelected && secondValue === undefined) {
        firstValue = firstValue + "" + x;
        textField.textContent = `${firstValue}`;
    } else if (firstValue != undefined && isOperatorSelected && secondValue === undefined) {
        secondValue = x;
        textField.textContent = `${firstValue} ${currentOperator} ${secondValue}`;
    } else if (firstValue != undefined && isOperatorSelected && secondValue != undefined) {
        secondValue = secondValue + "" + x;
        textField.textContent = `${firstValue} ${currentOperator} ${secondValue}`;
    }
}

function getOperator(x) {
    if (firstValue != undefined && !isOperatorSelected){
        isOperatorSelected = true;
        currentOperator = x;
        textField.textContent = `${firstValue}` + `${currentOperator}`;
    }
}

function negPos() {
    if (firstValue != undefined && !isOperatorSelected){
        if (firstValue >= 1)          {firstValue = firstValue * -1}
        else if (firstValue <= -1)    {firstValue = Math.abs(firstValue)}
        else                          {firstValue = firstValue}
        textField.textContent = `${firstValue}`;
    } else if (firstValue != undefined && isOperatorSelected && secondValue != undefined){
        if (secondValue >= 1)          {secondValue = secondValue * -1}
        else if (secondValue <= -1)    {secondValue = Math.abs(secondValue)}
        else                          {secondValue = secondValue}
        textField.textContent = `${firstValue} ${currentOperator} ${secondValue}`;
    } else {
        return;
    }
}

function clearAll() {
    firstValue = undefined;
    secondValue = undefined;
    isOperatorSelected = false;
    currentOperator = "";
    textField.textContent = "0";
}

function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function divide(x, y){
    return x / y;
}

function multiply(x, y){
    return x * y;
}

//Perform calculation based off selected values and operator
function operate(x, y){
    let first = x;
    let second = y;
    if (currentOperator === "x") {
        return multiply(first, second);
    } else if (currentOperator === "+") {
        return add(first, second);
    } else if (currentOperator === "-") {
        return subtract(first, second);
    } else if (currentOperator === "/") {
        return divide(first, second);
    }
}

function equals() {
    if(firstValue != undefined && isOperatorSelected && secondValue != undefined)
    {
        firstValue = operate (parseInt(firstValue), parseInt(secondValue));

        secondValue = undefined;
        currentOperator = "";
        isOperatorSelected = false;

        textField.textContent = `${firstValue}`;
    } else { return; }
}

