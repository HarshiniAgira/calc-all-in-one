// document.addEventListener('DOMContentLoaded', function () {
//     const inputBox = document.getElementById('inputBox');
//     const buttons = document.querySelectorAll('.controls button');

//     buttons.forEach(button => {
//         button.addEventListener('click', function () {
//             buttonHandleClick(button.innerText);
            
//         });
//     });

//     // Function for buttons

//     // This is for ('=','AC','DEL')

//     function buttonHandleClick(value) {
//         switch (value) {
//             case '=':
//                 result();
//                 break;
//             case 'AC':
//                 clearButton();
//                 break;
//             case 'DEL':
//                 deleteButton();
//                 break;
//             case '.':
//                 handleDotOperator();
//                 break;
//             default:
//                 update(value);
//                 break;
//         }
//     }

//     function result() {
//         try {
//             const result = evaluateExpression(inputBox.value);
//             inputBox.value = result;
//             localStorage.setItem('result',result);

//         } catch (error) {
//             inputBox.value = 'Error';
//         }
//     }

//     function clearButton() {
//         inputBox.value = '';
//     }

//     function deleteButton() {
//         inputBox.value = inputBox.value.slice(0, -1);
//     }

//     function update(value) {
//         inputBox.value += value;
//     }

//     function handleDotOperator() {
//         if (!inputBox.value.includes('.')) {
//             inputBox.value += '.';
//         }
//     }

//     function evaluateExpression(expression) {
//         const sysb = expression.match(/(\d+(\.\d+)?)|([+\-*/%])/g);//regular expression
        

//         if (!sysb) {
//             throw new Error('Invalid expression');
//         }

//         // Perform multiplication and division 
//         for (let i = 0; i < sysb.length; i++) {   
//             //The firset index should be operator  (eg:2*3+4)
//             if (sysb[i] === '*' || sysb[i] === '/' || sysb[i] === '%' || sysb[i] === '+' || sysb[i] === '-') {
//                 const num1 = parseFloat(sysb[i - 1]); //(1-1)=0 =>2
//                 const num2 = parseFloat(sysb[i + 1]); //(1+1)=2 =>3

//                 switch (sysb[i]) {
//                     case '*':
//                         //splice(index,deletecount,items..)
//                         //(1-1,3,(num1*num2).toString()) => (0,3,(2*3).toString()) => 6+4
//                         sysb.splice(i - 1, 3, (num1 * num2).toString());
//                         i--;  //1--=>(0)
//                         break;
//                     case '/':
//                         if (num2 !== 0) {
//                             sysb.splice(i - 1, 3, (num1 / num2).toString());
//                             i--;
//                         } else {
//                             throw new Error('Division by zero');
//                         }
//                         break;
//                     case '%':
//                         sysb.splice(i - 1, 3, (num1 % num2).toString());
//                         i--;
//                         break;

                        
//                     case '+':
//                         sysb.splice(i - 1, 3, (num1 + num2).toString());
//                         i--;
//                         break;
//                     case '-':
//                         sysb.splice(i - 1, 3, (num1 - num2).toString());
//                         i--;
//                         break;
//                 }
//             }
//         }


//         return sysb[0];
//     }
// });




document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.getElementById('inputBox');
    const buttons = document.querySelectorAll('.controls button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttonClick(button.innerText);
        });
    });

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

    function userExpression(expression) {
        return expression.match(/(\d+(\.\d+)?)|([+\-*/%])/g) || [];
    }

    function calculate(exp) {
        const operators = ['/','%','*', '+', '-',];

        // Perform multiplication and division
        for (const operator of operators) {
            for (let i = 0; i < exp.length; i++) {
                //The firset index should be operator  (eg:2*3+4)
                if (exp[i] === operator) {
                    const num1 = parseFloat(exp[i - 1]); //(1-1)=0 =>2
                    const num2 = parseFloat(exp[i + 1]); //(1+1)=2 =>3

                    switch (operator) {
                        case '*':
                            //splice(index,deletecount,items..)
                         //(1-1,3,(num1*num2).toString()) => (0,3,(2*3).toString()) => 6+4
                            exp.splice(i - 1, 3, (num1 * num2).toString());
                            i--; //1--=>(0)
                            break;
                        case '/':
                            if (num2 !== 0) {
                                exp.splice(i - 1, 3, (num1 / num2).toString());
                                i--;
                            } else {
                                throw new Error('Division by zero');
                            }
                            break;
                        case '%':
                            exp.splice(i - 1, 3, (num1 % num2).toString());
                            i--;
                            break;
                        case '+':
                            exp.splice(i - 1, 3, (num1 + num2).toString());
                            i--;
                            break;
                        case '-':
                            exp.splice(i - 1, 3, (num1 - num2).toString());
                            i--;
                            break;
                    }
                }
            }
        }

        return exp[0];
        
    }
});




// document.addEventListener('DOMContentLoaded', function () {
//     const inputBox = document.getElementById('inputBox');
//     const buttons = document.querySelectorAll('.controls button');

//     buttons.forEach(button => {
//         button.addEventListener('click', function () {
//             buttonHandleClick(button.innerText);
//         });
//     });

//     function buttonHandleClick(value) {
//         switch (value) {
//             case '=':
//                 result();
//                 break;
//             case 'AC':
//                 clearButton();
//                 break;
//             case 'DEL':
//                 deleteButton();
//                 break;
//             case '.':
//                 handleDotOperator();
//                 break;
//             default:
//                 update(value);
//                 break;
//         }
//     }

//     function result() {
//         try {
//             const result = evaluateExpression(inputBox.value);
//             localStorage.setItem(inputBox.value, result);
//             inputBox.value = result;
//         } catch (error) {
//             inputBox.value = 'Error';
//         }
//     }

//     function clearButton() {
//         inputBox.value = '';
//     }

//     function deleteButton() {
//         inputBox.value = inputBox.value.slice(0, -1);
//     }

//     function update(value) {
//         inputBox.value += value;
//     }

//     function handleDotOperator() {
//         if (!inputBox.value.includes('.')) {
//             inputBox.value += '.';
//         }
//     }

//     function evaluateExpression(expression) {
//         const sysb = userExpression(expression);
//         const result = calculate(sysb);
//         return result;
//     }

//     function userExpression(expression) {
//         return expression.match(/(\d+(\.\d+)?)|([+\-*/%])/g) || [];
//     }

//     function calculate(sysb) {
//         // Define the order of operations
//         const orderOfOperations = [
//             ['*', '/'],
//             ['%', '+', '-']
//         ];

//         // Perform calculations according to the order of operations
//         for (const operations of orderOfOperations) {
//             for (const operator of operations) {
//                 for (let i = 0; i < sysb.length; i++) {
//                     if (sysb[i] === operator) {
//                         const num1 = parseFloat(sysb[i - 1]);
//                         const num2 = parseFloat(sysb[i + 1]);

//                         switch (operator) {
//                             case '*':
//                                 sysb.splice(i - 1, 3, (num1 * num2).toString());
//                                 i--;
//                                 break;
//                             case '/':
//                                 if (num2 !== 0) {
//                                     sysb.splice(i - 1, 3, (num1 / num2).toString());
//                                     i--;
//                                 } else {
//                                     throw new Error('Division by zero');
//                                 }
//                                 break;
//                             case '%':
//                                 sysb.splice(i - 1, 3, (num1 % num2).toString());
//                                 i--;
//                                 break;
//                             case '+':
//                                 sysb.splice(i - 1, 3, (num1 + num2).toString());
//                                 i--;
//                                 break;
//                             case '-':
//                                 sysb.splice(i - 1, 3, (num1 - num2).toString());
//                                 i--;
//                                 break;
//                         }
//                     }
//                 }
//             }
//         }

//         return sysb[0];
//     }
// });
