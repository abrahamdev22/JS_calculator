//update progress, input 1, operator & input 2 sudah dapat
//outstanding untuk handling titik / decimal

keyCalc = document.querySelector('.calculator__keys');
let input1 ='';
let input2 ='';
let operator='';
let opLoaded=false;
let input1loaded=false;
let input2loaded=false;
let result='';
let allInput =false;
// let numState2 =false;

let key='';
let opClickCounter=0;
keyCalc.addEventListener('click', function (e) {
    
    const keyContent = e.target.textContent;
    
        if(!opLoaded && !input2loaded){

            if( keyContent == '0'||keyContent=='1'||keyContent=='2'||keyContent=='3'||keyContent=='4'
            ||keyContent=='5'||keyContent=='6'||keyContent=='7'||keyContent=='8'||keyContent=='9'){     //cek input apakah number
                
            input1loaded = true;
            updateDisplay(e, input1loaded);
            loadInput1();
        }
        

    } if(e.target.classList=='key--operator' && input1loaded){ //cek input apakah operator, setelah input number masuk
        opLoaded = true;
        opClickCounter ++;
        loadOperator(e);
        updateDisplay(e, opLoaded);
        // numState2 = true;
        console.log('op: ', operator);

    } else if(opLoaded && input1loaded){       //kondisi untuk mendetektsi number 2
        if( keyContent == '0'||keyContent=='1'||keyContent=='2'||keyContent=='3'||keyContent=='4'
        ||keyContent=='5'||keyContent=='6'||keyContent=='7'||keyContent=='8'||keyContent=='9'){
            input2loaded = true;
            updateDisplay(e, input2loaded);
            loadInput2();
        } 
    }
    
    
    
    console.log('input1: ',input1);
});

function updateDisplay(e, state) {
    key = key + (e.target.innerHTML);
    console.log('key :',key);
    let displayCalc = document.querySelector('.calculator__display');
    // console.log('opClickCounter: ', opClickCounter);

     if(state && opClickCounter < 2){         //cek apakah tombol operator diklik lebih dari sekali 
        displayCalc.innerHTML = key;

     } else if(opClickCounter >= 2){        //bila operator diklik lebih dari sekali, maka blok ini dijalankan, berfungsi hanya menampilkan satu operator yg dipilih

        if(input2loaded){           //on progress tampilkan input 2 
            // console.log('key for input2: ',key);       
            let keyArr = Array.from(key);
            let keyValid ='';
            let bufferKey ='';
            let bufferKeyValid ='';
            console.log('keyArrBefore: ',keyArr);
            let input1Length = 0;
            let nanLength = 0;
            let nanChecker = false;
            let input2Length =0;
            let inputOne ='';
            let inputTwo ='';

            keyArr.forEach(char => {
                bufferKey = parseInt(char);
                if(isNaN(bufferKey)){
                    nanLength++;
                    // keyArr.shift()
                    nanChecker = true;    
                }else if(!nanChecker){
                    inputOne += bufferKey;
                    input1Length++;
                }else {
                    inputTwo +=bufferKey;
                    input2Length++;
                }
                // console.log('keyarrAfter: ',keyArr);
                 
                // bufferKeyValid += bufferKey;
                // console.log('bufferkeyValid: ',bufferKeyValid);
                // keyValid = bufferKeyValid;

                
            })
            console.log('input1length:',input1Length);
            console.log('nanlength:', nanLength);
            console.log('input2length:', input2Length);
            console.log('inputOne: ', inputOne);    
            console.log('inputTwo: ', inputTwo);

            loadInput2(inputTwo);
            displayCalc.innerHTML = inputOne + operator + inputTwo;


        }else if(!input2loaded){
            
            const operator1 = loadOperator(e);
            console.log('operator1: ',operator1)
            let keyValid='';
            let keyArr = Array.from(key);
            // console.log('keyArr: ',keyArr);
            keyArr.forEach(char => {
                if(char!=='+' && char!=='-' && char!=='\xD7' && char!=='÷' ){
                    keyValid = keyValid + char
                }
            })
            displayCalc.innerHTML = keyValid+operator1;
            console.log('keyvalid: ',keyValid);
        };
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

function loadInput2(input){
    input2 = input;
}

function calculate() {
    
}
