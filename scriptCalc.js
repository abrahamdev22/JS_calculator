//update progress, input 1, operator & input 2 done
//update untuk handling titik / decimal , masih ada bug bila key titik '.' diinput lebih dari satu kali, seharusnya hanya bisa diinput sekali per input number -solved
//on proress solving bug decimal klik lebih dari 1 x, sedang coba tambahkan if cond saat menangkap input 1 --solved
//decimal bug, hint : coba pecah cond ||keyContent =='.', bikin if cond sendiri --done
//on progress del button untuk remove karakter --done sampai dengan input1 & operator
//del button hanya available dan dicek disetiap input number(1&2) , available saat remove input1, tidak aktif saat operator dipilih, on progress saat remove input2
//button AC merubah tampilan menjadi 0, mereset semua variabel
//button C sudah berhasil menghapus input number 2

//list bug:
//pada input1 bila button decimal diklik, kemudian number diinput setelahnya, lalu dihapus, dan selanjutnya diinput decimal hasilnya tampil(seharusnya tidak) -done
//pada input2 bila button decimal dihapus, maka bila diklik decimal lagi,tidak bisa tampil ke display (seharusnya bisa) karena counterklik decimal saat ini hanya bisa input decimal 1 x -done
//cek decButtonCounter -done
//ppada input 2, bila tombol operator diklik lebih dari 2 x, maka tombol decimal tidak akan bisa diklik lagi jika sudah dihapus
//Update Bug, Bug di input 2, tidak bisa tampilkan karakter decimal kembali setelah dihapus, bug terjadi ketika di input 2 sudha pernah diklik input decimal


//next, operasi matematika, memproses semua variabel input2 input2 dan operator


keyCalc = document.querySelector('.calculator__keys');
let input1 ='';     //menampung value input number 1 dari user
let input2 ='';     //menampung value input number 2 dari user
let operator='';    //menampung value operator matematika
let opLoaded=false;     //penanda status operator sudah pernah di klik, sehingga input number 2 bisa ditangkap 
let input1loaded=false; //penanda input1 sudah diinput
let input2loaded=false; //penanda input2 sudah diinput
let result='';  
let allInput =false;
let key='';     //menangkap semua key yang di klik user
let opClickCounter=0; //penghitung jumlah klik dari button operator
let decButtonCounter = 0;   //penghitung jumlah klik decimal button
let firstClick = false;
let delButtonPressed =false;
let delButtonPressed2 =false;
let decInputOne = false; //penanda bahwa button decimal pernah di klik di input 1

keyCalc.addEventListener('click', function (e) {
    
    const keyContent = e.target.textContent;

    if(!opLoaded && input1loaded && keyContent === 'C'){     //cek jika button C diklik, bila diklik sebelum input1 masuk, maka button tidak berfungsi
        delButtonPressed = true;            //penanda bahwa button C sudah di klik
        updateDisplay(e, input1loaded, delButtonPressed);
        loadInput1();
        // decButtonCounter=0;

    }else if(opLoaded && input1loaded &&input2loaded && keyContent === 'C'){ //cek button C dklik saat input2 masuk
        delButtonPressed2 = true ;
        console.log('delbuttonpressed: ',delButtonPressed)
        updateDisplay(e,input2loaded,delButtonPressed, delButtonPressed2)
    }else

    if(keyContent ==='AC'){     //cek jika button AC di klik
        const display = document.querySelector('.calculator__display');
        clearDisplay(display);
        clearVariables();
    }else
    
    if(!opLoaded && !input2loaded){ //tangkap input number1, dan cek bahwa operator & input2 belum diinput
        
        
        if(keyContent === '.' && decButtonCounter <1){    //cek input decimal &counter bahwa button decimal sudah pernah di klik    
            decButtonCounter++;
            input1loaded = true;
            updateDisplay(e, input1loaded);
            loadInput1();
            decInputOne = true;
            
        }else

        if( keyContent === '0'||keyContent==='1'||keyContent==='2'||keyContent==='3'||keyContent==='4'
        ||keyContent==='5'||keyContent==='6'||keyContent==='7'||keyContent==='8'||keyContent==='9'){     //cek input apakah input number1
            input1loaded = true;
            updateDisplay(e, input1loaded);
            loadInput1();
            firstClick = true;
            
        } console.log('decButtonCounter: ',decButtonCounter);
        
    } if(e.target.classList =='key--operator' && input1loaded){ //tangkap input operator, setelah input number1 masuk
        opLoaded = true;
        opClickCounter ++; 
        loadOperator(e);
        updateDisplay(e, opLoaded);
        // numState2 = true;
        decButtonCounter = 0;   //counter button decimal di reset, supaya input number2 bisa terima button decimal lagi
        console.log('op: ', operator);
        
    } else if(opLoaded && input1loaded){       //tangkap input number2

        if(keyContent === '.'&& decButtonCounter <1){    //tangkap input decimal dan penanda bahwa button decimal sudah pernah di klik    
            decButtonCounter++;
            input2loaded = true;
            updateDisplay(e, input2loaded);
            
        }else

        if( keyContent === '0'||keyContent ==='1'||keyContent ==='2'||keyContent ==='3'||keyContent ==='4'
        ||keyContent ==='5'||keyContent ==='6'||keyContent ==='7'||keyContent ==='8'||keyContent ==='9'){         //tangkap input number2
            input2loaded = true;
            updateDisplay(e, input2loaded);
            // loadInput2();
        } 
        // opLoaded = false;
    }
    
    console.log('input1: ',input1);
    console.log('input2: ',input2);

});

function updateDisplay(e, state, delButton1,delButton2) {
    key = key + (e.target.innerHTML);
    console.log('key :',key);
    let displayCalc = document.querySelector('.calculator__display');


     if(state && opClickCounter < 2){         //proses input 1 dan/atau input2 & kondisi tombol operator diklik hanya sekali 
        let deletedAll = false;
        let bufferKey ='';
        let input1Length = 0;
        let nanLength = 0;
        let nanChecker = false;
        let input2Length =0;
        let inputOne ='';
        let inputTwo ='';
        let keyArr =[];

        
        //--------------------------------------------------------------------------------------------------------------------------------------------------------//
      

        if(delButton1){                      //cek bila button C diklik
            let keyArr1 = Array.from(key)    //metode yg digunakan adalah, menangkap key, mengubah jadi array lalu diremove element terakhir+elemen C(karena text content dari button C valuenya adalah C)
            console.log('keyArrDelButton1:',keyArr);      //maka arraynya di pop 2x
 
            keyArr1.pop();
            keyArr1.pop();

            const findDecChar = keyArr1.lastIndexOf('.');    //metode ini memeriksa adakah karakter decimal di dalam array, 
            if(findDecChar < 0){                            //bila sudah tidak ada, maka decClickCounter di reset supaya bisa diinput kembali setelah dihapus
                decButtonCounter = 0;
            }     

            key = keyArr1.join('');
            console.log('keyfromkeyArr:',key);
            delButton1=false;

            // opClickCounter = 0;
            if(key==''){                //cek bila tombol C diklik sampai input di display kosong
                clearVariables();        
                key = '0';              //variable key diisi dengan 0 supaya yg tampil bukan display kosong tapi angka 0 pada display
                deletedAll = true;      //penanda di set true bahwa button C diklik sampai display kosong
                
            }
        }else if(delButton2){
            let keyArr2 = Array.from(key);

            // console.log('findDecChar: ',findDecChar);
            
            keyArr2.pop();
            keyArr2.pop();
            const findDecChar = keyArr2.lastIndexOf('.');
            if(findDecChar < 0){
                decButtonCounter = 0;
            }     
            key = keyArr2.join('');
            delButton2 = false;
            if(key==''){                //cek bila tombol C diklik sampai input di display kosong
                clearVariables();        
                key = '0';              //variable key diisi dengan 0 supaya yg tampil bukan display kosong tapi angka 0 pada display
                deletedAll = true;      //penanda di set true bahwa button C diklik sampai display kosong
                
            }
        }   
                                             //blok ini adlah proses parsing input, menjadi input 1, input 2 dan operator   
        keyArr = Array.from(key);
        console.log('keyArr: ', keyArr);

        keyArr.forEach(char => { 
                
            if(char==='.' && !nanChecker){  //cek jika key adalah '.' di input1  , //blok ini supaya karakter decimal tidak masuk ke proses parseInt
                inputOne += char;
                input1Length++;
            }else if(char==='.' && nanChecker){  //cek jika key adalah '.' di input2
                inputTwo +=char;
                input2Length++;

            }else    
            {
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
            if(key==''){                //cek bila tombol C diklik sampai input di display kosong
                clearVariables();        
                key = '0';              //variable key diisi dengan 0 supaya yg tampil bukan display kosong tapi angka 0 pada display
                deletedAll = true;      //penanda di set true bahwa button C diklik sampai display kosong
                
            }
        });

        loadInput2(inputTwo);       
        displayCalc.innerHTML = inputOne + operator + inputTwo;  //tampilkan semua input dan operator setelah input2 didapat
        
        console.log('input1length:',input1Length);
        console.log('nanlength:', nanLength);
        console.log('input2length:', input2Length);
        console.log('inputOne: ', inputOne);    
        console.log('inputTwo: ', inputTwo);

        //--------------------------------------------------------------------------------------------------------------------------------------------------------//
        
        //--------------------------------------------------------------------------------------------------------------------------------------------------------//
        // if(delButton1){                      //cek bila button C diklik
        //     let keyArr = Array.from(key)    //metode yg digunakan adalah, menangkap key, mengubah jadi array lalu diremove element terakhir+elemen C(karena text content dari button C valuenya adalah C)
        //     console.log('keyArrDelButton1:',keyArr);      //maka arraynya di pop 2x
 
        //     keyArr.pop();
        //     keyArr.pop();

        //     const findDecChar = keyArr.lastIndexOf('.');    //method ini memeriksa adakah karekter decimal di dalam array, 
        //     if(findDecChar < 0){                            //bila sudah tidak ada, maka decClickCounter di reset supaya bisa diinput kembali setelah dihapus
        //         decButtonCounter = 0;
        //     }     

        //     key = keyArr.join('');
        //     console.log('keyfromkeyArr:',key);
        //     delButton1=false;

        //     // opClickCounter = 0;
        //     if(key==''){                //cek bila tombol C diklik sampai input di display kosong
        //         clearVariables();        
        //         key = '0';              //variable key diisi dengan 0 supaya yg tampil bukan display kosong tapi angka 0 pada display
        //         deletedAll = true;      //penanda di set true bahwa button C diklik sampai display kosong
                
        //     }
        // }else if(delButton2){
        //     let keyArr = Array.from(key);

        //     // console.log('findDecChar: ',findDecChar);
            
        //     keyArr.pop();
        //     keyArr.pop();
        //     const findDecChar = keyArr.lastIndexOf('.');
        //     if(findDecChar < 0){
        //         decButtonCounter = 0;
        //     }     
        //     key = keyArr.join('');
        //     delButton2 = false;
        //     if(key==''){                //cek bila tombol C diklik sampai input di display kosong
        //         clearVariables();        
        //         key = '0';              //variable key diisi dengan 0 supaya yg tampil bukan display kosong tapi angka 0 pada display
        //         deletedAll = true;      //penanda di set true bahwa button C diklik sampai display kosong
                
        //     }
        // }   

        //--------------------------------------------------------------------------------------------------------------------------------------------------------//

        // displayCalc.innerHTML = key; //tampilkan ke display    

        if(deletedAll){     //kondisi bila display dihapus sd kosong
            key = '';       //key dikembalikan ke nilai '',
            // reloadACbutton();   //tombol delete kembali berubah menjadi AC 
            deletedAll = false; 
        }

     } else if(opClickCounter >= 2){        //proses input 1 dan/atau input2 & kondisi tombol operator diklik lebih dari sekali
        let deletedAll = false;
        if(input2loaded){           //block ini menangkap variabel key, kemudian di konversi ke integer, kemudian memisahkan karakter numerik untuk input1, karakter non numerik, kemudian karakter numerik untuk input2 
            // console.log('key for input2: ',key);       
            let bufferKey ='';
            let input1Length = 0;
            let nanLength = 0;
            let nanChecker = false;
            let input2Length =0;
            let inputOne ='';
            let inputTwo ='';
            let keyArr =[];
            let keyArrDel =[];

            
            if(delButton2){         //kondisi jika button C diklik saat di input2
            keyArr = Array.from(key);   //BUG : di array ini, decimal yg di input 1 , masih kedetek saat di lastIndexOf -- fixed
                keyArr.pop();
                keyArr.pop();
                
                const findDecChar = keyArr.lastIndexOf('.'); //Testing tambah blok ini, untuk mengatasi tombol decimal hanya bisa diklik di input2, cek adakah karakter decimal  
                if (!decInputOne) {    
                    if(findDecChar < 0){
                        decButtonCounter = 0;
                    }
                }else {                                         
                   const indexDecInputOne = keyArr.findIndex(m => m === '.');
                   const indexOf = keyArr.indexOf('.', indexDecInputOne + 1);
                   if(indexOf < 0){
                       decButtonCounter = 0;
                   }
                }
                
                console.log('finddecchar: ', findDecChar);

                key = keyArr.join('');
                delButton2 = false;  //TESTING
                console.log('keyDelButton2:', keyArr);

                if(key==''){                //cek bila tombol C diklik sampai input di display kosong
                    clearVariables();        
                    key = '0';              //variable key diisi dengan 0 supaya yg tampil bukan display kosong tapi angka 0 pada display
                    deletedAll = true;      //penanda di set true bahwa button C diklik sampai display kosong
                    
                }
                
            }
            // else 

                
                keyArr = Array.from(key);
                
                console.log('keyArrOri: ',keyArr);
                
                keyArr.forEach(char => { 
                    
                if(char==='.' && !nanChecker){  //cek jika key adalah '.' di input1  , //blok ini supaya karakter decimal tidak masuk ke proses parseInt
                inputOne += char;
                input1Length++;
                }
                else if(char==='.' && nanChecker){  //cek jika key adalah '.' di input2
                inputTwo +=char;
                input2Length++;
                
                }else    
                {
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
                    
                });
            
            loadInput2(inputTwo);       //tampilkan semua input dan operator setelah input2 didapat
            displayCalc.innerHTML = inputOne + operator + inputTwo;
            
            console.log('input1length:',input1Length);
            console.log('nanlength:', nanLength);
            console.log('input2length:', input2Length);
            console.log('inputOne: ', inputOne);    
            console.log('inputTwo: ', inputTwo);
            
            if(deletedAll){     //kondisi bila display dihapus sd kosong
                key = '';       //key dikembalikan ke nilai '',
                // reloadACbutton();   //tombol delete kembali berubah menjadi AC 
                deletedAll = false;
                displayCalc.innerHTML = '0';
            }
        
            
        }else if(!input2loaded){    //bila operator diklik lebih dari sekali, maka blok ini dijalankan, berfungsi hanya menampilkan satu operator yg dipilih
            //kondisi ini adalah operator dikli lebih dari sekali, dan input2 belum dimasukkan
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

function clearVariables(){
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
    delButtonPressed = false;
    delButtonPressed2 = false;
    decInputOne = false;

};

function removeChar(){

};

function changeACbutton() {     //function untuk rubah button AC menjadi del ketika input pertama kali di klik
    // delButtonPressed = true;              
    const display = document.querySelector('.clear');
    display.innerHTML = 'C' ;
    
};

function reloadACbutton() {
    const display = document.querySelector('.clear');
    display.innerHTML = 'AC' ;
}

function parseInput(input) {

    let bufferKey ='';
    let input1Length = 0;
    let nanLength = 0;
    let nanChecker = false;
    let input2Length =0;
    let inputOne ='';
    let inputTwo ='';
    let keyArr =[];

    input.forEach(char => { 
                
        if(char==='.' && !nanChecker){  //cek jika key adalah '.' di input1  , //blok ini supaya karakter decimal tidak masuk ke proses parseInt
            inputOne += char;
            input1Length++;
        }else if(char==='.' && nanChecker){  //cek jika key adalah '.' di input2
            inputTwo +=char;
            input2Length++;

        }else    
        {
            bufferKey = parseInt(char);
            if(isNaN(bufferKey)){       //cek jika key adalah operator / NaN
                nanLength++;
                // input.shift()
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
        
    });
};