const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-allclear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


class Calculator {
    //constructor
    constructor(previousOperandTextElement, currentOperandTextElement)
    {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() //limpa todos os numeros do display
    {
        this.currentOperand = "";
        this.previousOperand ="";
        this.operation = undefined;
    }

    delete() //delete um numero no display
    {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) //função que coloca os numeros no display quando um botão é apertado
    {
        if(number === "." && this.currentOperand.includes(".")) return; //evitar que seja possivel adicionar mais de um . (, em pt-br);
        
        this.currentOperand = this.currentOperand.toString() + number.toString(); //convertendo pra string pq javascript é uma bosta;
    }

    chooseOperation(operation) //qual operação matematica será feita
    {
        if(this.currentOperand === "") return;
        if(this.previousOperand !== "") //se no lugar de = for escolhido alguma operação, ele vai fazer a primeira operação e setar a segunda;
        {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() //faz as contas
    {   
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)) return;

        switch(this.operation)
        {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:    
                return;
                break;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number)
    {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if(isNaN(integerDigits))
        {
            integerDisplay = '';
        } else 
        {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0});
        }

        if(decimalDigits != null)
        {
            return `${integerDisplay}.${decimalDigits}`;
        }else 
        {
            return integerDisplay;
        }
    }

    updateDisplay() //coloca os numeros no display
    {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null)
        {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else{
            this.previousOperandTextElement.innerText = '';
        }

    }
}




const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})


equalsButton.addEventListener('click', button => 
{
    calculator.compute();
    calculator.updateDisplay();
})


allClearButton.addEventListener('click', button => 
{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => 
{
    calculator.delete();
    calculator.updateDisplay();
})