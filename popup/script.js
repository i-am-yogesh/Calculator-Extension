//Evaluating a mathematical expression considering Operator Precedence in JavaScript
const findResult = (exp = '') => {
   const digits = '0123456789.';
   const operators = ['+', '-', '*', '/', 'negate'];
   const legend = {
      '+': { pred: 2, func: (a, b) => { return a + b; }, assoc: "left" },
      '-': { pred: 2, func: (a, b) => { return a - b; }, assoc: "left" },
      '*': { pred: 3, func: (a, b) => { return a * b; }, assoc: "left" },
      '/': { pred: 3, func: (a, b) => {
      if (b != 0) { return a / b; } else { return 0; }
   }
   }, assoc: "left",
   'negate': { pred: 4, func: (a) => { return -1 * a; }, assoc: "right" }
};
exp = exp.replace(/\s/g, '');
let operations = [];
let outputQueue = [];
let ind = 0;
let str = '';
while (ind < exp.length) {
   let ch = exp[ind];
   if (operators.includes(ch)) {
      if (str !== '') {
         outputQueue.push(new Number(str));
         str = '';
      }
      if (ch === '-') {
         if (ind == 0) {
            ch = 'negate';
         } else {
            let nextCh = exp[ind+1];
            let prevCh = exp[ind-1];
            if ((digits.includes(nextCh) || nextCh === '(' || nextCh === '-') &&
               (operators.includes(prevCh) || exp[ind-1] === '(')) {
                  ch = 'negate';
            }
         }
      }
      if (operations.length > 0) {
         let topOper = operations[operations.length - 1];
         while (operations.length > 0 && legend[topOper] &&
         ((legend[ch].assoc === 'left' && legend[ch].pred <= legend[topOper].pred) ||
         (legend[ch].assoc === 'right' && legend[ch].pred < legend[topOper].pred))) {
            outputQueue.push(operations.pop());
            topOper = operations[operations.length - 1];
         }
      }
      operations.push(ch);
   } else if (digits.includes(ch)) {
      str += ch
   } else if (ch === '(') {
      operations.push(ch);
   } else if (ch === ')') {
      if (str !== '') {
         outputQueue.push(new Number(str));
         str = '';
      }
      while (operations.length > 0 && operations[operations.length - 1] !== '(') {
         outputQueue.push(operations.pop());
      }
      if (operations.length > 0) { operations.pop(); }
   }
   ind++;
}
if (str !== '') { outputQueue.push(new Number(str)); }
   outputQueue = outputQueue.concat(operations.reverse())
   let res = [];
   while (outputQueue.length > 0) {
      let ch = outputQueue.shift();
      if (operators.includes(ch)) {
         let num1, num2, subResult;
         if (ch === 'negate') {
            res.push(legend[ch].func(res.pop()));
         } else {
            let [num2, num1] = [res.pop(), res.pop()];
            res.push(legend[ch].func(num1, num2));
         }
      } else {
         res.push(ch);
      }
   }
   return res.pop().valueOf();
};


//function and variables to call above function
let result = document.getElementById('result');
let buttons = Array.from(document.getElementsByClassName('buttons-sub'));

buttons.map( button => {
    button.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case 'C':
                result.innerText = '';
                break;
            case '=':
                    result.innerText = findResult(result.innerHTML);
                break;
            case '←':
                if (result.innerText){
                   result.innerText = result.innerText.slice(0, -1);
                }
                break;
            default:
                result.innerText += e.target.innerText;
        }
    });
});

document.addEventListener("keydown", e => {
    if(e.key == 1) result.innerHTML += e.key;
    if(e.key == 2) result.innerHTML += e.key;
    if(e.key == 3) result.innerHTML += e.key;
    if(e.key == 4) result.innerHTML += e.key;
    if(e.key == 5) result.innerHTML += e.key;
    if(e.key == 6) result.innerHTML += e.key;
    if(e.key == 7) result.innerHTML += e.key;
    if(e.key == 8) result.innerHTML += e.key;
    if(e.key == 9) result.innerHTML += e.key;
    if(e.key == 0) result.innerHTML += e.key;
    if(e.key == '.') result.innerHTML += e.key;
    if(e.key == '(') result.innerHTML += e.key;
    if(e.key == ')') result.innerHTML += e.key;
    if(e.key == '*') result.innerHTML += e.key;
    if(e.key == '/') result.innerHTML += e.key;
    if(e.key == '+') result.innerHTML += e.key;
    if(e.key == '-') result.innerHTML += e.key;
    if(e.key == '=') result.innerText = findResult(result.innerHTML);
    if(e.key == "Backspace") result.innerText = result.innerText.slice(0, -1); 
    if(e.key == 'c' || e.key == 'C') result.innerText = '';
    if(e.key == 'Enter') result.innerText = findResult(result.innerHTML);
})