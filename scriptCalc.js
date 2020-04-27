//update progress, input 1, operator & input 2 done
//update untuk handling titik / decimal , masih ada bug bila key titik '.' diinput lebih dari satu kali, seharusnya hanya bisa diinput sekali per input number
//on progress perhitungan matematika

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
let testVar = '';
let testVar2 = '';
keyCalc.addEventListener('click', function (e) {
    
    testVar = parseFloat('..23');
    testVar2 = parseFloat('.23..34');
    console.log(testVar);
    console.log(testVar2);
    

    const keyContent = e.target.textContent;
    
        if(!opLoaded && !input2loaded){

            if( keyContent == '0'||keyContent=='1'||keyContent=='2'||keyContent=='3'||keyContent=='4'
            ||keyContent=='5'||keyContent=='6'||keyContent=='7'||keyContent=='8'||keyContent=='9'||keyContent =='.'){     //cek input apakah number, tambah input '.'
                
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
        ||keyContent=='5'||keyContent=='6'||keyContent=='7'||keyContent=='8'||keyContent=='9'||keyContent=='.'){
            input2loaded = true;
            updateDisplay(e, input2loaded);
            // loadInput2();
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

     } else if(opClickCounter >= 2){        

        if(input2loaded){           //block ini menangkap variabel key, kemuadian di konversi ke integer, kemudian memisahkan karakter numerik untuk input1, karakter non numerik, kemudian karakter numerik untuk input2 
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
                
                if(char=='.' && !nanChecker){  //cek jika key adalah '.' di input1
                    inputOne += char;
                    input1Length++;
                }else if(char=='.' && nanChecker){  //cek jika key adalah '.' di input2
                    inputTwo +=char;
                    input2Length++;
                }else {

                    bufferKey = parseInt(char);
                    if(isNaN(bufferKey)){       //cek jika key adalah operator / NaN
                        nanLength++;
                        // keyArr.shift()
                        nanChecker = true;    
                    }else if(!nanChecker){      //cek jika bukan NaN dan jika input1
                        // inputOne += bufferKey;
                        inputOne += char;
                        input1Length++;
                    }else {                     //cek jika bukan NaN dan jika input2
                        // inputTwo +=bufferKey;
                        inputTwo +=char;
                        input2Length++;
                    }
                }

                
            })
            console.log('input1length:',input1Length);
            console.log('nanlength:', nanLength);
            console.log('input2length:', input2Length);
            console.log('inputOne: ', inputOne);    
            console.log('inputTwo: ', inputTwo);

            loadInput2(inputTwo);
            displayCalc.innerHTML = inputOne + operator + inputTwo;


        }else if(!input2loaded){    //bila operator diklik lebih dari sekali, maka blok ini dijalankan, berfungsi hanya menampilkan satu operator yg dipilih
            
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
