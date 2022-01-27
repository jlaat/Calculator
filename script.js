class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement =  previousOperandElement;
        this.currentOperandElement =  currentOperandElement;
        this.clear();
    }


    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        this.updateDisplay();
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')){
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === '') {
            return;
        }
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)){
            return;
        }
        if(this.operation === '+'){
            computation = prev + current;
        }
        if(this.operation === '-'){
            computation = prev - current;
        }
        if(this.operation === '/'){
            computation = prev / current;
        }
        if(this.operation === 'x'){
            computation = prev * current;
        }
        this.currentOperand =  computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    updateDisplay(){
        this.currentOperandElement.innerText =  this.currentOperand;
        this.previousOperandElement.innerText = this.previousOperand;
    }

}
const operatorButtons = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton =  document.querySelector('[data-clear]');
let previousOperandElement = document.querySelector('[data-previous-operand]');
let currentOperandElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandElement, currentOperandElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})
clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})








