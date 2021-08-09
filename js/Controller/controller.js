class Controller{
    constructor(){

        //Buttons
        this.numberButtons = document.querySelectorAll('[data-number]');
        this.operatorButtons = document.querySelectorAll('[data-operation]');

        //another buttons
        this.equalButton = document.querySelector('[data-equal]');
        this.ACButton = document.querySelector('[data-AC]');
        this.CeButton = document.querySelector('[data-number]');

        //Logs
        this.logScreenTextElement = document.querySelector(['[data-log]']);
        this.currentLogTextElement = document.querySelector(['[data-currentLog]']);
        this.initButtonEvents();

        // operation

        this.operation = [];
        this.newOperation = [];
        this.lastNumber = '';
        this.lastOperator = '';
    }
    //baseFunctions->

    initButtonEvents(){
        this.numberButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.execute(btn.innerText);
            })
        })
        this.operatorButtons.forEach(operator => {
            operator.addEventListener('click', () => {
                this.execute(operator.innerText);
            })
        })

        this.ACButton.addEventListener('click', () => {
            this.execute(this.ACButton.innerText);
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

    //Methods->
        //screen

        clearScreen(){
            this.currentLog = '';
            this.operation = [];
            this.logScreen = '0';
            this.updateDisplay();
        }
        updateDisplay(){
            if(this.operation == 0){
                this.logScreenTextElement.innerText = '0';
            }else{
                this.logScreen = this.operation.toString();
                this.logScreenTextElement.innerText = this.logScreen;
            }
        }
        updateCurrentLog(){
            this.currentLog = this.newOperation.toString();
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
                this.newOperation = this.operation.toString() + value.toString();
                this.updateCurrentLog();
                this.operation = [];
                this.logScreenTextElement.innerText = '0';
                this.updateDisplay;

            }else{
                // onde o número normal entra
                console.log(value);
                this.operation.push(value);
                this.updateDisplay();
            }
            if(this.operation){
                this.calculate();
            }
        }

        //gets

        getLastItem(){
            return this.operation[this.operation.length -1];
        }
        getLastOperation(){
            return this.operation[this.operation.length -1];
        }

        //sets

        setLastOperation(value){
            this.operation[this.operation.length -1] = value;
        }
        setLastOperatorOperation(value){
            this.newOperation = this.newOperation.substring(0,this.newOperation.length-1) + value;
        }

    //Operations->

    addOperation(value){

        if(isNaN(this.getLastOperation())){
           if(this.isOperator(value)){
                console.log(value);
                this.setLastOperatorOperation(value);
                this.updateCurrentLog();
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
            case '=':
                this.calculate();
            default:
                this.setAnError();
                break;
            
        }
    }
}