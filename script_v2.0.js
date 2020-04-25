//input handling pake array
//input handling pake display
//pembatasnya adalah saat operator diklik

//Release Notes:
//fungsi tombol C dan AC sudah jalan, tinggal cari bug lain

const keyCalc = document.querySelector('.calculator__keys');

// let angkaPertama = 0;
// let angkaKedua = 0;
// let varFull = false;
let clickCounter = 0;
let inputKey ='';
let input1 = '';
let input2 = '';
let input1Length = 0;
let operator ='';
let cekTombolAC =false;
let displayCalc;
let displayC2='';
let displayC='';
let inputKeyBuffer='';
let preInput2='';

keyCalc.addEventListener('click', function (e) {
    // clickCounter ++;
    // console.log('cek awal: ',cekTombolAC);
    displayCalc = document.querySelector('.calculator__display').innerHTML;
    // console.log('displayCalc: ',displayCalc);

    cekTombolAC =false; 
    if(!cekTombolAC){
       cekTombolPertamaKali();
    };

    // if(displayC.length == 0){
    //     document.querySelector('.calculator__display').innerHTML = '0';
    // }



    // inputKey += e.target.textContent;  //semua value input disimpan ke variabel
    //inputKey = displayCalc;  //semua value input disimpan ke variabel
    // console.log('inputKey: ',inputKey);

    if(!document.querySelector('.clear').classList.contains('delete')){
        
        inputKey += e.target.textContent;
        // console.log('inputKey: ', inputKey); 
    } else {
        inputKey = displayC;
}
        


    if(e.target.tagName=='BUTTON'){     //cek apakah button pernah di klik
        // if(e.target.textContent !=='AC'){

            if(e.target.textContent !=='AC'){

                document.querySelector('.clear').innerHTML = 'C' ;
            }

            if(e.target.textContent == 'C'){   //cek apakah button C yang dklik
                displayC = document.querySelector('.calculator__display').textContent; 
                // console.log('displayC: ',displayC);
                for (let i = 0; i < displayC.length -1; i++) {
                    displayC2 += displayC[i];
                }
                console.log('displayC: ',displayC);
                displayC = displayC2;
                displayC2 = '';
                document.querySelector('.calculator__display').innerHTML = displayC;
                document.querySelector('.clear').classList.add('delete');

                if(displayC.length > 0){
                    clickCounter ++; 
                }

                // console.log('clickCounter: ',clickCounter);
                   

                if(displayC.length == 0){       //cek jika tombol C diklik dan karakter pada display sudah kosong, maka tampilkan angka 0
                    // document.querySelector('.calculator__display').classList.remove('clicked');
                    // cekTombolPertamaKali();        
                    document.querySelector('.calculator__display').innerHTML = '0';
                    inputKey ='';                       //kosongkan semua variabel  
                    input1 = '';
                    input2 = '';
                    input1Length = 0;
                    operator ='';
                    document.querySelector('.calculator__display').classList.remove('clicked');
                    // document.querySelector('.clear').innerHTML = 'AC';
                }
            // }
        } else
        // } 

        // console.log('inputKey: ',inputKey);
        if(e.target.className !== 'key--equal' && e.target.className !== 'clear'){  //menangkap semua input yang di klik kecuali button = dan AC dan tampilkan ke display calculator 
            document.querySelector('.calculator__display').innerHTML += e.target.textContent ; 
            displayCalc = document.querySelector('.calculator__display').innerHTML;
            // console.log('inputKey: ',inputKey);
        }else if(e.target.dataset.action == 'clear'){  //cek jika tombol AC di klik
            cekTombolAC = true;
            document.querySelector('.calculator__display').innerHTML = '0';     //set display jadi angka 0
            inputKey ='';                       //kosongkan semua variabel  
            input1 = '';
            input2 = '';
            input1Length = 0;
            operator ='';
            document.querySelector('.calculator__display').classList.remove('clicked'); //class clicked yg ditambahkan di hilangkan lagi
            
        }else if(e.target.className == 'key--equal'){     //cek jika tombol = diklik , isi variabel input2
            
            if(clickCounter > 0){
                console.log('displayCD: ',displayC);
                console.log('inputKeyD: ',inputKey);
                preInput2 = document.querySelector('.calculator__display').innerHTML;
                
                for (let i = input1.length+1; i < preInput2.length; i++) {
                    input2 += preInput2[i];
                    
                }
                
            }else
            
            for (let i = input1Length + 1; i < inputKey.length - 1; i++) { //inputKey.length dikurangi 1 supaya karakter terakhir yaitu operator tidak ikut masuk variabel input2
                input2 += inputKey[i];      //i mulai dari digit setelah posisi karakter operator
            }
            console.log('input2: ', input2);
            const hasil = hitungHasil(operator,input1, input2);
            document.querySelector('.calculator__display').innerHTML += e.target.textContent + hasil;  //tampilkan hasil operasi matematika ke display calculator
            document.querySelector('.clear').innerHTML = 'AC' ;
            document.querySelector('.clear').classList.remove('delete');
            
            console.log(input2);
            
        };
        if(e.target.className == 'key--operator'){  //jika tombol operator diklik, isi variabel input1
            operator = e.target.dataset.action;
            
            if(clickCounter > 0){
                input1 = '';
                console.log('displayC: ',displayC);
                inputKey = displayC ;
                // operator = e.target.dataset.action;
                for (let i = 0; i < inputKey.length; i++) {  //inputKey.length dikurangi 1 supaya karakter terakhir yaitu operator tidak ikut masuk variabel input1
                    // if(inputKey[i])
                    input1 += inputKey[i];          //menggunakan prinsip iterasi string yg sama dengan iterasi array
                    input1Length = input1.length;
                }
                
            }else

            // console.log('inputKey: ',inputKey)
            for (let i = 0; i < inputKey.length - 1; i++) {  //inputKey.length dikurangi 1 supaya karakter terakhir yaitu operator tidak ikut masuk variabel input1
                input1 += inputKey[i];          //menggunakan prinsip iterasi string yg sama dengan iterasi array
                input1Length = input1.length;
            }
            // console.log('input1: ',input1);
            // console.log('length ',input1Length);
        }console.log('input1: ',input1);
    }
});

let display = null;
function cekTombolPertamaKali() { //cek pertama kali apakah ada tombol button calculator apakah pernah di klik
    if(!document.querySelector('.calculator__display').classList.contains('clicked')){  //block ini digunakan untuk memeriksa apakah tombol sudah pernah di klik , caranya dengan menambahkan class clicked 
        document.querySelector('.calculator__display').textContent= null ;              //bila belum pernah di klik, maka class tambahan akan diberikan, lalu display dikosongkan
        inputKey = '';
        document.querySelector('.calculator__display').classList.add('clicked');
        display = 'display cleared';
    }else 
            display = 'already cleared';
};

function hitungHasil(op, in1, in2) {  //function hitung oeprasi matematika
    if(op == 'add'){
        return parseFloat(in1) + parseFloat(in2);
    } else if(op =='subtract'){
        return parseFloat(in1) - parseFloat(in2);
    } else if(op == 'multiply'){
        return parseFloat(in1) * parseFloat(in2);    
    } else {
        return parseFloat(in1) / parseFloat(in2);
    }   
};