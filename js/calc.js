inputKey = document.querySelector('.calculator_keys'); //tombol kalkulator
displayTop = document.querySelector('.input-display'); //display input bagian atas
displayBottom = document.querySelector('.calculator_display'); //display hasil perhitungan


// Deklarasi variable
// =============================================================================================================

let inputField = '';
let inputSatu =''; //variable untuk menampung input numerik dan decimal dari user
let operator = ''; //variable untuk menampung input operator dari user
let inputDua = ''; //variable untuk menampung input numerik dan decimal dari user
let decimalFlag = false; //penanda input decimal sudah diklik
let inputSatuFlag = false; //penanda variable input satu sudah diload, bila true maka input operator aktif, atau user bisa menginput key opertator
let operatorFlag = false; //penanda variable operator sudah diload dan inputDua sudah bisa diload, yaitu dengan syarat inputSatu dan operator sudah terpenuhi/terisi
let operatorDisplay = ''; //variable untuk menampung simbol operator
let inputDuaFlag = false; //penanda variable inputDua sudah diload
let equalSign = '';
let equalSignFlag = false;

// Baca semua input dari user
inputKey.addEventListener('click', (e)=> {
    const key = e.target;
    const keyContent = e.target.textContent;
    const keyDataSet = key.dataset.action;
    // console.log(keyDataSet);

    // Cek apakah tombol C diklik, bila ya, maka karakter terakhir yang diinputakan dihapus 
    // =============================================================================================================
    if(keyDataSet==='delete' && !operatorFlag && !inputDuaFlag){
        inputSatu = inputSatu.substring(0, inputSatu.length-1);
        if(inputSatu.length < 1) {
            inputSatuFlag = false;
            tampilDisplayResult('0');
        }   
    } else if (keyDataSet==='delete' && operatorFlag && !inputDuaFlag) { //cek jika tombol C diklik saat opeartor sudah diklik
        operator = '';
        operatorDisplay = '';
        operatorFlag = false;
    } else if ( keyDataSet==='delete' && inputDuaFlag && !equalSignFlag) {    //cek jika tombol C diklik setelah input 2 diterima
        inputDua = inputDua.substring(0, inputDua.length-1);
        if(inputDua.length < 1) {
            inputDuaFlag = false;
        }
    } else if (keyDataSet==='delete' && operatorFlag && inputDuaFlag && inputSatuFlag && equalSignFlag){
        equalSign ='';
        equalSignFlag = false;
    }


    // Cek apakah tombol AC di klik, bila ya maka isi semua variable akan di clear, display di clear
    // =============================================================================================================
    if(keyDataSet==='clear'){
        inputSatu = '';
        operator = '';
        inputDua = '';
        decimalFlag = false;
        inputSatuFlag = false;
        inputDuaFlag = false;
        operatorFlag = false;
        operatorDisplay = '';
        equalSign = '';
        tampilDisplayResult('0');
        equalSignFlag = false;    
    }

    // Cek apakah tombol equal diklik 
    // =============================================================================================================

    // cara1:
    // document.querySelector('.key-equal').addEventListener('click', (ev)=> {
    //     if (inputSatuFlag && operatorFlag && inputDuaFlag && !equalSignFlag) {
    //         console.log('proses perhitungan');
    //         let hasil = operasiMatematika(inputSatu, inputDua, operator, '.calculator-display');
    //         console.log("hasil:", hasil );
    //         // inputDuaFlag = true;
    //         // equalSign = '=';
    //         equalSignFlag = true;
    //         equalSign = ev.target.textContent;
    //         // console.log('e.target:', e.target.textContent);
    //         tampilDisplayResult(hasil);
    //     }else {
    //         ev.stopPropagation();
    //     } 
    // });

    // cara2:
    if (keyDataSet==='calculate' && inputSatuFlag && operatorFlag && inputDuaFlag && !equalSignFlag) {
        let hasil = operasiMatematika(inputSatu, inputDua, operator, '.calculator-display');
        equalSignFlag = true;
        equalSign = e.target.textContent;
        // console.log('e.target:', e.target.textContent);
        tampilDisplayResult(hasil);
    }
        
    



    // Phase 1, Filter input , apakah numerik dan decimal
    // =============================================================================================================
    if (keyDataSet==='decimal' && !decimalFlag) {
        inputSatu = inputSatu + loadVariable(keyContent);
        decimalFlag = true;
        // tampilDisplayInput(inputSatu, '.input-display');
        // console.log('inputSatu:', inputSatu);
    } 

    while (!keyDataSet && !operatorFlag && !inputDuaFlag){
        // console.log('numerik',key.textContent);
        inputSatu = inputSatu + loadVariable(keyContent);
        inputSatuFlag = true;
        // tampilDisplayInput(inputSatu, '.input-display');
        // console.log('inputSatu:',inputSatu);
        break;
    }

    // console.log('inputSatu:',inputSatu);
    // console.log('operator:', operator);


    // Phase 2, filter input, apakah tombol operator diklik
    // =============================================================================================================

    // Cek apakah tombol operator di klik
    if (keyDataSet!=='delete' && keyDataSet!=='clear' && keyDataSet !=='decimal' && keyDataSet && inputSatuFlag &&!inputDuaFlag){
        // console.log('keyDataSet:', keyDataSet);
        // console.log('tombol operator!');
        operator = loadVariable(keyDataSet);
        // console.log('operator:', operator);
        // console.log('operator display: ',key.textContent);
        operatorDisplay = key.textContent;
        operatorFlag = true;
        // displayTop.innerHTML = displayTop.innerHTML + tampilDisplayInput(operatorDisplay, '.input-display');
    }    

    // Phase 3, filter input, baca input 2 dari user (numerik)
    if (inputSatuFlag && operatorFlag && !keyDataSet) {
        inputDua = inputDua + loadVariable(keyContent);
        inputDuaFlag = true;
        // console.log('keydataset', keyDataSet);
        // console.log ('inputDua:', inputDua);
        // console.log('displayTop:', displayTop.innerHTML);
        
        // displayTop.innerHTML = displayTop.innerHTML + tampilDisplayInput(inputDua, '.input-display');
        
    }

    if (keyDataSet==='decimal' && inputSatuFlag && operatorFlag){
        inputDua = inputDua + loadVariable(keyContent);
        inputDuaFlag = true;
    }


    // Tampilkan ke display input
    // tampilDisplayInput(inputSatu, '.input-display');
    tampilDisplayInput(inputSatu, operatorDisplay, inputDua, equalSign);

    console.log('inputSatu:', inputSatu);
    console.log('operator:', operator);
    console.log ('inputDua:', inputDua);

});


// Functions 
// =============================================================================================================

// function loadVariableInputSatu (inputUser){
//     let input = '';
//     input = inputUser;
//     return input;
// }

// function tampilDisplayInput(input, displayCalc) {
//     let display = document.querySelector(displayCalc);
//     display.innerHTML = input;
//     return display.innerHTML;
// }

function loadVariable(inputUser) {
    let input = '';
    input = inputUser;
    return input;
}

function tampilDisplayInput(inputSatu, operatorDisplay, inputDua, equalSign) {
    let display = inputSatu.concat(operatorDisplay,inputDua,equalSign);
    displayTop.innerHTML = display ;
}

function operasiMatematika(inputSatu, inputDua, operator, element) {
    // let result = 0;
    
    if (operator==='add') {
        let result = parseFloat(inputSatu) + parseFloat(inputDua);
        return result;
    }

    if (operator==='subtract'){
        let result = parseFloat(inputSatu) - parseFloat(inputDua);
        return result;
    }

    if (operator==='multiply'){
        let result = parseFloat(inputSatu) * parseFloat(inputDua);
        return result;
    }
    
    if (operator==='divide'){
        let result = parseFloat(inputSatu) / parseFloat(inputDua);
        return result;
    }
}

function tampilDisplayResult(results) {
    displayBottom.innerHTML = results;
}