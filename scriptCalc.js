//update progress, input 1, operator & input 2 done
//update untuk handling titik / decimal , masih ada bug bila key titik '.' diinput lebih dari satu kali, seharusnya hanya bisa diinput sekali per input number -solved
//on proress solving bug decimal klik lebih dari 1 x, sedang coba tambahkan if cond saat menangkap input 1 --solved
//decimal bug, hint : coba pecah cond ||keyContent =='.', bikin if cond sendiri --done
//on progress del button untuk remove karakter
//on progress, operasi matematika, memproses semua variabel input2 input2 dan operator

keyCalc = document.querySelector('.calculator__keys');
let input1 ='';     //menampung value input number 1 dari user
let input2 ='';     //menampung value input number 2 dari user
let operator='';    //menampung value operator matematika
let opLoaded=false;     //penanda status operator sudah pernah di klik, sehingga input number 2 bisa ditangkap 
let input1loaded=false; //penanda input1 sudah diinput
let input2loaded=false; //penanda input2 sudah diinput
let result='';  
let allInput =false;
// let numState2 =false;

let key='';     //menangkap semua key yang di klik user
let opClickCounter=0; //penghitung jumlah klik dari button operator
let decButtonCounter = 0;   //penghitung jumlah klik decimal button
let firstClick = false;

keyCalc.addEventListener('click', function (e) {
    
    // if(firstClick){
    //     const display = document.querySelector('.clear');
    //     display.innerHTML = 'del';
    // }
    
    const keyContent = e.target.textContent;

    if(keyContent ==='AC'){     //cek jika button AC di klik
        const display = document.querySelector('.calculator__display');
        clearDisplay(display);
        clearVars();
    }else
    
    if(!opLoaded && !input2loaded){
        
        if(keyContent === '.'&& decButtonCounter <1){    //penanda bahwa button decimal sudah pernah di klik    
            decButtonCounter++;
            input1loaded = true;
            updateDisplay(e, input1loaded);
            loadInput1();
            
        }else

        if( keyContent === '0'||keyContent==='1'||keyContent==='2'||keyContent==='3'||keyContent==='4'
        ||keyContent==='5'||keyContent==='6'||keyContent==='7'||keyContent==='8'||keyContent==='9'){     //cek input apakah number, tambah input '.'
        
            // console.log('second decimal pressed');
            input1loaded = true;
            updateDisplay(e, input1loaded);
            loadInput1();
            firstClick = true;
            
    } console.log('decButtonCounter: ',decButtonCounter);
        
    } if(e.target.classList=='key--operator' && input1loaded){ //cek input apakah operator, setelah input number masuk
        opLoaded = true;
        opClickCounter ++; 
        loadOperator(e);
        updateDisplay(e, opLoaded);
        // numState2 = true;
        decButtonCounter = 0;   //counter button decimal di reset, supaya input 2 bisa terima button decimal lagi
        console.log('op: ', operator);

    } else if(opLoaded && input1loaded){       //kondisi untuk mendetektsi number 2

        if(keyContent == '.'&& decButtonCounter <1){    //penanda bahwa button decimal sudah pernah di klik    
            decButtonCounter++;
            input2loaded = true;
            updateDisplay(e, input2loaded);
            
        }else

        if( keyContent == '0'||keyContent=='1'||keyContent=='2'||keyContent=='3'||keyContent=='4'
        ||keyContent=='5'||keyContent=='6'||keyContent=='7'||keyContent=='8'||keyContent=='9'){
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
                
                if(char=='.' && !nanChecker){  //cek jika key adalah '.' di input1  , //blok ini supaya karakter decimal tidak masuk ke proses parseInt
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
            // console.log('operator1: ',operator1)
            let keyValid='';
            let keyArr = Array.from(key);
            // console.log('keyArr: ',keyArr);
            keyArr.forEach(char => {
                if(char!=='+' && char!=='-' && char!=='\xD7' && char!=='÷' ){
                    keyValid = keyValid + char
                }
            })
            displayCalc.innerHTML = keyValid+operator1;
            // console.log('keyvalid: ',keyValid);
        };
     }
        
};

function loadInput1() {
    input1 = key;
};

function loadOperator(e) {
    const opKey = e.target;
    if(opKey.classList =='key--operator'){
        return operator = opKey.textContent;
        // console.log('op: ',operator);
    } else 
    return;
};

function loadInput2(input){
    input2 = input;
};

function calculate() {
    
};

function clearDisplay(display) { 
    display.innerHTML = '0';
};

function clearVars(){
    input1 ='';     //menampung value input number 1 dari user
    input2 ='';     //menampung value input number 2 dari user
    operator='';    //menampung value operator matematika
    opLoaded=false;     //penanda status operator sudah pernah di klik, sehingga input number 2 bisa ditangkap 
    input1loaded=false; //penanda input1 sudah diinput
    input2loaded=false; //penanda input2 sudah diinput
    result='';  
    allInput =false;
    key='';     //menangkap semua key yang di klik user
    opClickCounter=0; //penghitung jumlah klik dari button operator
    decButtonCounter = 0;   //penghitung jumlah klik decimal button

};

function removeChar(){

};