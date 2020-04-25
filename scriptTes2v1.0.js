//input handling pake array
//input handling pake display
//pembatasnya adalah saat operator diklik

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

keyCalc.addEventListener('click', function (e) {
    // clickCounter ++;
    console.log('cek awal: ',cekTombolAC);
    displayCalc = document.querySelector('.calculator__display').innerHTML;

    cekTombolAC =false; 
    if(!cekTombolAC){
       cekTombolPertamaKali();
   }

    inputKey += e.target.textContent;  //semua value input disimpan ke variabel
    
    if(e.target.className !== 'key--equal' && e.target.className !== 'clear'){  //menangkap semua input yang di klik bila
        console.log('inputKey= ',inputKey);
        document.querySelector('.calculator__display').innerHTML += e.target.textContent ;
        displayCalc = document.querySelector('.calculator__display').innerHTML;
        
    }else if(e.target.dataset.action == 'clear'){
        cekTombolAC = true;
        console.log('AC button clicked', cekTombolAC);
        document.querySelector('.calculator__display').innerHTML = '0';
        inputKey ='';
        input1 = '';
        input2 = '';
        input1Length = 0;
        operator ='';
        document.querySelector('.calculator__display').classList.remove('clicked');
        
    }else if(e.target.className == 'key--equal'){     //cek jika tombol = diklik
        for (let i = input1Length + 1; i < inputKey.length - 1; i++) {
            input2 += inputKey[i];
        }
        const hasil = hitungHasil(operator,input1, input2);
        document.querySelector('.calculator__display').innerHTML += e.target.textContent + hasil;
    }
    
    if(e.target.className == 'key--operator'){  //jika tombol operator diklik
        // clickCounter = clickCounter - 1 ;
        operator = e.target.dataset.action;
        for (let i = 0; i < inputKey.length - 1; i++) {
            // inputKeyAfter.push(inputKey[i]) ;
            input1 += inputKey[i];
            input1Length = input1.length;
        }
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

function hitungHasil(op, in1, in2) {  //function hitung 
    if(op == 'add'){
        return parseFloat(in1) + parseFloat(in2);
    } else if(op =='subtract'){
        return parseFloat(in1) - parseFloat(in2);
    } else if(op == 'multiply'){
        return parseFloat(in1) * parseFloat(in2);    
    } else {
        return parseFloat(in1) / parseFloat(in2);
    }   
}