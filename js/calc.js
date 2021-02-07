inputKey = document.querySelector('.calculator_keys');

let inputField = '';
let inputSatu =''; //variable untuk menampung input numerik dan decimal dari user
let operator = ''; //variable untuk menampung input operator dari user
let inputDua = ''; //variable untuk menampung input numerik dan decimal dari user
let decimalFlag = false; //penanda input decimal sudah diklik
let inputSatuFlag = false; //penanda variable input satu sudah diload, bila true maka input operator aktif, atau user bisa menginput key opertator


// Baca semua input dari user
inputKey.addEventListener('click', (e)=> {
    const key = e.target;
    const keyContent = e.target.textContent;
    const keyDataSet = key.dataset.action;
    // console.log(keyDataSet);


// Step 1, Filter input , apakah numerik dan decimal
// =============================================================================================================
if (keyDataSet==='decimal' && !decimalFlag) {
    inputSatu = inputSatu + loadVariableInputSatu(keyContent);
    decimalFlag = true;
} 

while(!keyDataSet){
    console.log('numerik',key.textContent);
    inputSatu = inputSatu + loadVariableInputSatu(keyContent);
    inputSatuFlag = true;
    break;
}

console.log('inputSatu:',inputSatu);


// Step 2, filter input, apakah tombol operator diklik
// =============================================================================================================



});


// Functions 
// =============================================================================================================

function loadVariableInputSatu (inputUser){
    let input = '';
    input = inputUser;
    return input;
}