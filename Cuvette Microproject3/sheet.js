const keypads=document.querySelectorAll(".keypad"),
input = document.querySelector(".result-box"),
equalTo = document.querySelector(".equal-to"),
reset = document.querySelector(".reset"),
del = document.querySelector(".del");

let value="";
let operators = ["+","-","x","/"];

keypads.forEach((keypad)=>{
    keypad.addEventListener("click",()=>handleKeypadClick(keypad));
});

function handleKeypadClick(keypad){
    value = value.concat(keypad.textContent);
    input.value = value;
}
del.addEventListener("click",()=>{
    value=input.value.slice(0,-1);
    input.value=value;

});
equalTo.addEventListener("click",handleEqualTo);

function handleEqualTo(){
    let temporary_operators=[];
    let temporary_variables=[];
    let variable_holder ="";

    for(let i=0; i<input.value.lenght;i++){
        if(operators.includes(value[i]))  {
            temporary_variables.push(variable_holder);
            temporary_operators.push(value[i]);
            variable_holder="";
        }else{
            variable_holder=variable_holder.concat(value[i]);
        }
    }
    temporary_variables.push(variable_holder);
    value = Modifier(temporary_operators,temporary_variables);
    input.value=value;
}
function Modifier(temporary_operators, temporary_variables) {
    while(temporary_operators.includes("x")||temporary_operators.includes('/')) {
     temporary_operators.includes("x")?index=temporary_operators.indexOf("x"):index=temporary_operators.indexOf("/");
     solution = calculate(
       temporary_variables[index],
       temporary_operators[index],
       temporary_variables[index + 1]
     );
     temporary_operators.splice(index, 1);
     temporary_variables.splice(index, 2);
     temporary_variables=[...temporary_variables.slice(0, index), solution, ...temporary_variables.slice(index)]
     console.log(
      `operators are ${temporary_operators},and the variables are ${temporary_variables}, and the length of the temporary_variables is ${temporary_variables.length}. inside the modifier`
     );
 
     console.log(`the solution is ${solution}`)
     
   } 
   
     for (let i = 0; i < temporary_operators.length; i++) {
       console.log(`i am inside the for loop`)
       solution = calculate(
         temporary_variables[0],
         temporary_operators[i],
         temporary_variables[1]
       );
       temporary_variables.splice(0, 2);
       temporary_variables.unshift(solution);
 
     }
     console.log(
       `operators are ${temporary_operators}, and the variables are ${temporary_variables}, and the length of the temporary_variables is ${temporary_variables.length}. inside the for loop`
     );
 
     return temporary_variables[0];
   }
   function calculate(operand1, operator, operand2) {
    operand1 = Number(operand1);
    operand2 = Number(operand2);
    switch (operator) {
      case operators[0]:
        return String(operand1 + operand2);
      // input.value = value;
      // break;
      case operators[1]:
        return String(operand1 - operand2);
      // input.value = value;
      // break;
      case operators[2]:
        return String(operand1 * operand2);
      // input.value = value;
      // break;
      case operators[3]:
        return String(operand1 / operand2);
      // input.value = value;
      // break;
      default:
        return null;
    }
  }
  
  reset.addEventListener("click", () => {
    input.value = 0;
    value = 0;
 
  });