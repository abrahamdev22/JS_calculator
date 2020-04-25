
keyCalc = document.querySelector('.calculator__keys');
let input1 ='';
let input2 ='';
let operator='';
let opState=false;
let numState=false;
let result='';
let allInput =false;

let key='';
let opClickCounter=0;
keyCalc.addEventListener('click', function (e) {

    const keyContent = e.target.textContent;
    if( keyContent == '0'||keyContent=='1'||keyContent=='2'||keyContent=='3'||keyContent=='4'
        ||keyContent=='5'||keyContent=='6'||keyContent=='7'||keyContent=='8'||keyContent=='9'){     //cek input apakah number
        numState = true;
        updateDisplay(e, numState);
        loadInput1();
    }else if(e.target.classList=='key--operator' && numState){ //cek input apakah operator, setelah input number masuk
        opState = true;
        opClickCounter ++;
        loadOperator(e);
        updateDisplay(e, opState);
        console.log('op: ', operator);

    }
    if(opState && numState){
        if(keyContent == '0'||keyContent=='1'||keyContent=='2'||keyContent=='3'||keyContent=='4'
        ||keyContent=='5'||keyContent=='6'||keyContent=='7'||keyContent=='8'||keyContent=='9'){
            updateDisplay(e,numState);
            loadInput2();
        }
    }
    console.log('input1: ',input1);


});

function updateDisplay(e, state) {
    key = key + (e.target.innerHTML);
    console.log('key :',key);
    let displayCalc = document.querySelector('.calculator__display');
    console.log('opClickCounter: ', opClickCounter);

     if(state && opClickCounter < 2){         
        displayCalc.innerHTML = key;
     } else if(opClickCounter >= 2){
        const operator1 = loadOperator(e);
        console.log('operator1: ',operator1)
        let keyValid='';
        let keyArr = Array.from(key);
        console.log('keyArr: ',keyArr);
        keyArr.forEach(char => {
            if(char!=='+' && char!=='-' && char!=='\xD7' && char!=='÷' ){
                keyValid = keyValid + char
            }
            displayCalc.innerHTML = keyValid+operator1;
        });
        console.log('keyvalid: ',keyValid);
        
     }
        
}

function loadInput1() {
    input1 = key;
}

function loadOperator(e) {
    const opKey = e.target;
    if(opKey.classList =='key--operator'){
        return operator = opKey.textContent;
        // console.log('op: ',operator);
    } else 
    return;
}

function loadInput2(){
    input2 = key;
}

