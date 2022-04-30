export default class Controller{

    constructor(){
        //Buttons
        this.numberButtons = document.querySelectorAll('[data-number]');
        this.operatorButtons = document.querySelectorAll('[data-operation]');

        //another buttons
        this.equalButton = document.querySelector('[data-equal]');
        this.ACButton = document.querySelector('[data-AC]');
        this.CeButton = document.querySelector('[data-CE]');

        //Logs
        this.logScreenTextElement = document.querySelector(['[data-log]']);
        this.currentLogTextElement = document.querySelector(['[data-currentLog]']);
        this.initButtonEvents();

        // operation
        this._operation = [];
        this._newOperation = [];
        this.lastNumber = '';
        this.lastOperator = '';
    }

    //baseFunctions->

        initButtonEvents(){
            this.numberButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.execute(btn.innerText);
                })
            });
            this.operatorButtons.forEach(operator => {
                operator.addEventListener('click', () => {
                    this.execute(operator.innerText);
                })
            });

            this.ACButton.addEventListener('click', () => {
                this.execute(this.ACButton.innerText);
            });
            this.equalButton.addEventListener('click', () => {
                this.execute(this.equalButton.innerText);
            });
            this.CeButton.addEventListener('click', () => {
                this.execute(this.CeButton.innerText);
            })

            document.addEventListener('keyup', e =>{

                switch(e.key){

                    case 'Escape':
                        this.execute('AC');
                        break;
                    case 'Backspace':
                        console.log(e.key);
                        break;
                    case '+':
                        this.addOperation('+');
                    case '-':
                        this.addOperation('-');
                    case '/':
                        this.addOperation('/');
                    case '*':
                        this.addOperation('*');
                    case 'Enter':
                    case '=':
                        console.log(e.key);
                        break;
                    case '.':
                    case ',':
                        console.log(e.key);
                        break;
                    case 'c':
                        console.log(e.key); 
                        break;
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        this.addOperation(parseInt(e.key));
                        break;
                }
            
            });
        }

    //Operations->

        addOperation(value){

            if(isNaN(this.getLastOperation())){
            if(this.isOperator(value)){
                    console.log(value);
                    if(this._newOperation.length == 0){
                        this.pushOperation(value);
                    }else{
                        this.setLastOperatorOperation(value);
                        this.updateCurrentLog();
                    }
            }else{
                    console.log(value);
                    this.pushOperation(value);
            }
            }else{
                if(this.isOperator(value)){
                    this.pushOperation(value);
                }else{
                    let newValue = this.getLastOperation().toString() + value.toString();
                    this.setLastOperation(newValue);
                    this.updateDisplay();
                }
            }
        }

        addDot(){
            let lastOperation = this.getLastOperation();

            if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

            if(this.isOperator(lastOperation) || !lastOperation){
                this.pushOperation('0.');
            }else{
                this.setLastOperation(lastOperation.toString() + '.');
            }
            this.updateDisplay();
        }

        calculate(){
            let lastDigit = this._newOperation.pop();

            let result = eval(this._newOperation.join(""));

            this._newOperation = [result,lastDigit];
            this.logScreenTextElement.innerText = result;
            this.updateCurrentLog();
            this.updateDisplay();
        }

        equal(){
            let calculate = this._newOperation.join("") + this._operation.join("");
            this._operation = [eval(calculate)];
            this._newOperation = [];
            this.updateCurrentLog();
            this.updateDisplay();
        }

        CE(){
            if(this._operation.length =! 0 && this._operation	== 0){
                this._newOperation.pop(this._newOperation.length-1);
                this.updateCurrentLog();
            }else{
                this._operation = [];
                this.updateDisplay();
            }
        }

        execute(value){
            switch(value){

                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':            
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(value));
                    break;
                    case '.':
                        this.addDot();
                        break;
                case '*':
                    console.log(value);
                    this.addOperation('*');
                    break;
                case '/':
                    console.log(value);
                    this.addOperation('/');
                    break;
                case '+':
                    console.log(value);
                    this.addOperation('+');
                    break;
                case '-':
                    console.log(value);
                    this.addOperation('-');
                    break;

                case 'AC':
                    this.clearScreen();
                    break;
                case 'CE':
                    this.CE();
                    break;
                case '=':
                    this.equal();
                default:
                    this.setAnError();
                    break;
                
            }
        }

    //Methods->

        //screen

            clearScreen(){
                this.currentLog = '';
                this._operation = [];
                this._newOperation = [];
                this.logScreen = '0';
                this.currentLog = '0';
                this.updateDisplay();
                this.updateCurrentLog();
            }
            updateDisplay(){
                if(this._operation == 0){
                    this.logScreenTextElement.innerText = '0';
                }else{
                    this.logScreen = this._operation.toString();
                    this.logScreenTextElement.innerText = this.logScreen;
                }
            }
            updateCurrentLog(){
            
                let operationToLog = this._newOperation.toString().replace(/,/g , " ");

                this.currentLog = operationToLog.toString();
                this.currentLogTextElement.innerText = this.currentLog;
            
            }
            setAnError(){
                this.logScreen = "ERROR";
            }

        //operations

            isOperator(value){
                return (['+' , '-', '*', '/'].indexOf(value) > -1)
            }
            pushOperation(value){
                console.log(value);
                if(this.isOperator(value)){
                    //quando é um operador
                    console.log(value);
                    this._newOperation.push(this._operation);
                    this._newOperation.push(value);
                    this.updateCurrentLog();
                    this._operation = [];
                    if(this._newOperation.length >= 3){
                        console.log(this._newOperation);
                        this.calculate();
                    }
                    this.updateDisplay();

                }else{
                    // onde o número normal entra
                    console.log(value);
                    this._operation.push(value);
                    this.updateDisplay();
                    this.updateCurrentLog();
                }
            }

        //gets

            getLastItem(){
                return this._operation[this._operation.length -1];
            }
            getLastOperation(){
                return this._operation[this._operation.length -1];
            }

        //sets

            setLastOperation(value){
                this._operation[this._operation.length -1] = value;
            }
            setLastOperatorOperation(value){
                this._newOperation[this._newOperation.length-1] = value;
            }

}