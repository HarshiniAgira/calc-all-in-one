
document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.getElementById('inputBox');
    const buttons = document.querySelectorAll('.controls button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttonClick(button.innerText);
        });
    });

document.addEventListener('keydown', function (event) {
        handleKeyPress(event.key);
    });
    

    function handleKeyPress(key) {
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', '.', 'Enter', 'Backspace','Delete'];

        if (allowedKeys.includes(key)) {
            if (key === 'Enter') {
                key = '=';
            } else if (key === 'Backspace') {
                key = 'DEL';
            }
            else if (key === 'Delete') {
                key = 'AC';
            }

            buttonClick(key);
        }
    }

    function buttonClick(value) {
        switch (value) {
            case '=':
                result();
                break;
            case 'AC':
                clearButton();
                break;
            case 'DEL':
                deleteButton();
                break;
            case '.':
                dotOperator();
                break;
            default:
                update(value);
                break;
        }
    }

    function result() {
         try {
            const result = evaluateExpression(inputBox.value);
            localStorage.setItem(inputBox.value,result);
            inputBox.value = result;
         } catch (error) {
             inputBox.value = 'Error';
         }
    }

    function clearButton() {
        inputBox.value = '';
    }

    function deleteButton() {
        inputBox.value = inputBox.value.slice(0, -1);
    }

    function update(value) {
        inputBox.value += value;
    }

    function dotOperator() {
        if (!inputBox.value.includes('.')) {
            inputBox.value += '.';
        }
    }

    function evaluateExpression(expression) {
        const exp = userExpression(expression);
        const result = calculate(exp);
        return result;
    }

    //takes mathematical exp as input & uses regex to tokenize it into array of oper & num (returns an array of matched num&opr or empty array return)

    function userExpression(expression) {
        return expression.match(/(\d+(\.\d+)?)|([+\-*/%])/g) || [];
    }

    function calculate(exp) {
        //perform cal based on order of presedance of opr (returns the final res of cal,frst ele of modified array)
        const operators = ['*', '/', '%', '+', '-'];
        //processes until there is only one element left in the 'exp' array
        while (exp.length > 1) {
            let found = false;//to check if opr found
    
            //used nested for loop (outer loop =>to iterate through the operator and inner loop is to iterate through the ele in the exp(index start in odd index))
            for (const operator of operators) {
                for (let i = 1; i < exp.length; i += 2) {
                    if (exp[i] === operator) {
                        const num1 = parseFloat(exp[i - 1]);
                        const num2 = parseFloat(exp[i + 1]);
    
                        switch (operator) {
                            case '*':
                                exp.splice(i - 1, 3, (num1 * num2).toString());
                                found = true; // true if it opr found ans successfully processed
                                break;
                            case '/':
                                if (num2 !== 0) {
                                    exp.splice(i - 1, 3, (num1 / num2).toString());
                                    found = true;
                                } else {
                                    throw new Error('Division by zero');
                                }
                                break;
                            case '%':
                                exp.splice(i - 1, 3, (num1 % num2).toString());
                                found = true;
                                break;
                            case '+':
                                exp.splice(i - 1, 3, (num1 + num2).toString());
                                found = true;
                                break;
                            case '-':
                                exp.splice(i - 1, 3, (num1 - num2).toString());
                                found = true;
                                break;
                        }
    
                        break; // Exit the inner loop once an operator is found and processed
                    }
                }
    
                if (found) {
                    break; // Exit the outer loop if an operator is found and processed
                }
            }
    
            if (!found) {
                throw new Error('Invalid expression');
            }
        }
    
        return exp[0];
    }
    
});



