let firstValue;
let secondValue;

let isOperatorSelected;
let currentOperator;
let secondOperator;
let operatorBeforeEquals;

const dot = ".";

if (operatorBeforeEquals === undefined)
{
    operatorBeforeEquals = 0;
}
if (isOperatorSelected === undefined)
{
    isOperatorSelected = false;
}
if (currentOperator === undefined){
    currentOperator = "";
}
if (secondOperator === undefined){
    secondOperator = "";
}

//Get html elements
const textField = document.querySelector('p');

//Flow: firstValue -> currentOperator -> secondValue -> equals()

//Sets value of currently selected number to whatever button input you press
function setCurrentValue(x) {
    if (String(firstValue).includes(dot) && !isOperatorSelected && secondValue === undefined && x === dot){
        return;
    } else if (firstValue != undefined && isOperatorSelected && String(secondValue).includes(dot) && x === dot) {
        return;
    } else if (firstValue === undefined && !isOperatorSelected && secondValue === undefined) {
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
    //First check if all variables are used, if so run equals()
    if (firstValue != undefined && firstValue != "" && isOperatorSelected && secondValue != undefined && secondValue != "" && 
    secondOperator === '' && operatorBeforeEquals === 0) {

        operatorBeforeEquals++;
        secondOperator = `${x}`;
        equals();
    } else if (firstValue != undefined && isOperatorSelected && (secondValue === undefined || '')) {
        return;
    } else if (firstValue != undefined && !isOperatorSelected){
        isOperatorSelected = true;
        currentOperator = `${x}`;
        textField.textContent = `${firstValue} ${currentOperator}`;
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
    currentOperator = '';
    secondOperator = '';
    operatorBeforeEquals = 0;
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

function backspace(){
    if(firstValue != undefined && !isOperatorSelected && secondValue === undefined) {
        firstValue = String(firstValue).slice(0, -1);
        textField.textContent = `${firstValue}`;
        if(firstValue === ''){
            textField.textContent = `0`;
        }
    } else if (firstValue != undefined && isOperatorSelected && (secondValue === undefined || secondValue === '')) {
        currentOperator = '';
        secondValue = undefined;
        isOperatorSelected = false;
        operatorBeforeEquals = 0;
        secondOperator = '';

        textField.textContent = `${firstValue}`;
    } else if (firstValue != undefined && isOperatorSelected && secondValue != undefined) {
        secondValue = String(secondValue).slice(0, -1);
        textField.textContent = `${firstValue} ${currentOperator} ${secondValue}`;
        if(secondValue === '') {
            operatorBeforeEquals = 0;
        }
    }
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
        //First run operation, then round decimals
        //After, convert to float to remove unnecesary trailing 0s
        //Then convert back to string so we can concatenate in the calculator
        firstValue = operate (parseFloat(firstValue), parseFloat(secondValue));
        firstValue = firstValue.toFixed(2);
        firstValue = parseFloat(firstValue);
        firstValue = firstValue.toString();

        secondValue = undefined;
        currentOperator = `${secondOperator}`;
        secondOperator = ``;
        isOperatorSelected = true;
        operatorBeforeEquals = 0;

        textField.textContent = `${firstValue} ${currentOperator}`;
    }
    //Otherwise run calculation normally
    else if(firstValue != undefined && firstValue != '' && isOperatorSelected && secondValue != undefined && secondValue != '')
    {
        //First run operation, then round decimals
        //After, convert to float to remove unnecesary trailing 0s
        //Then convert back to string so we can concatenate in the calculator
        firstValue = operate (parseFloat(firstValue), parseFloat(secondValue));
        firstValue = firstValue.toFixed(2);
        firstValue = parseFloat(firstValue);
        firstValue = firstValue.toString();

        secondValue = undefined;
        currentOperator = "";
        isOperatorSelected = false;

        textField.textContent = `${firstValue}`;
    } 
    else{
        return; 
    }

}

