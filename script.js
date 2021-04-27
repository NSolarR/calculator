let firstValue;
let isOperatorSelected;
let secondValue;
let currentOperator;
let secondOperator;
let operatorBeforeEquals;

if (operatorBeforeEquals === undefined)
{
    operatorBeforeEquals = 0;
}
if (isOperatorSelected === undefined)
{
    isOperatorSelected = false;
}

//Get html elements
const textField = document.querySelector('p');

//Flow: firstValue -> currentOperator -> secondValue -> equals()

//Sets value of currently selected number to whatever button input you press
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
    //First check if all variables are used, if so run operate()
    if (firstValue != undefined && isOperatorSelected && secondValue != undefined) {
        operatorBeforeEquals++;
        secondOperator = `${x}`;
        equals();
    }
    //Otherwise if only firstValue is used set the selectedOperator
    else if (firstValue != undefined && !isOperatorSelected){
        isOperatorSelected = true;
        currentOperator = x;
        textField.textContent = `${firstValue}` + `${currentOperator}`;
    }
}

//Convert currently selected number to negative or positive
function negPos() {
    if (firstValue != undefined && !isOperatorSelected){
        if (firstValue >= 1)          {firstValue = firstValue * -1}
        else if (firstValue <= -1)    {firstValue = Math.abs(firstValue)}
        else                          {firstValue = firstValue}
        
        textField.textContent = `${firstValue}`;
    } else if (firstValue != undefined && isOperatorSelected && secondValue != undefined){
        if (secondValue >= 1)         {secondValue = secondValue * -1}
        else if (secondValue <= -1)   {secondValue = Math.abs(secondValue)}
        else                          {secondValue = secondValue}

        textField.textContent = `${firstValue} ${currentOperator} ${secondValue}`;
    } else {
        return;
    }
}

//Clears all values and resets
function clearAll() {
    firstValue = undefined;
    secondValue = undefined;
    isOperatorSelected = false;
    currentOperator = "";
    textField.textContent = "0";
}

//Operator functions
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

//Run when = buttons is hit
function equals() {
    //Check if attempting to divide by 0
    if (secondValue === 0 && currentOperator === "/") {
        firstValue = undefined;
        currentOperator = "";
        isOperatorSelected = false;
        secondValue = undefined;

        textField.textContent = `You can't divide by 0`;
        return;
    }
    //Check if selecting another operator BEFORE hitting the = button
    else if (operatorBeforeEquals >= 1)
    {
        firstValue = operate (parseInt(firstValue), parseInt(secondValue));

        secondValue = undefined;
        currentOperator = `${secondOperator}`;
        secondOperator = ``;
        isOperatorSelected = true;
        operatorBeforeEquals = 0;

        textField.textContent = `${firstValue}` + `${currentOperator}`;
    }
    //Otherwise run calculation normally
    else if(firstValue != undefined && isOperatorSelected && secondValue != undefined)
    {
        firstValue = operate (parseInt(firstValue), parseInt(secondValue));

        secondValue = undefined;
        currentOperator = "";
        isOperatorSelected = false;

        textField.textContent = `${firstValue}`;
    } 
    else{
        return; 
    }
}

