//1. tangkap semua elemen tombol yang di klik
//2. pisahkan , antara elemen tombol operator (+,-,x,/) , eksekusi(=, AC), dan angka(0-9)
//3. looping apakah ada angka atau eksekusi yang di klik, simpan ke memori dalam bentuk array
//4. looping, operator apa yang di klik, simpan ke memori
//5. panggil fungsi jumlah, kali,bagi,kurang


//6. handle input lebih dari 1 digit,
//6.1 


const keyCalc = document.querySelector('.calculator__keys');
// console.log(keyCalc);
let operator = '';
let angkaPertama = null;
let angkaKedua = 0;
let eksekutor = '';
// let hasil;
let hasil=null;
let varFull=false; //adalah variabel untuk cek kondisi semua variabel op,angkaP,angkaK, sudah terisi
keyCalc.addEventListener('click', function (e) {
            
        cekTombolPertamaKali(); //cek tombol apakah sudah pernah di cek

        if(operator==eksekutor){
            operator=eksekutor;
        };

        cekInputUser(e); 
        //Cek Input------------------------------------------------------------//        
        //disini sebelumnya block cekinputuser, sebelum dijadikan function
        //----------------------------------------------------------------------//
        
        if (!varFull) { //cek apakah variabel ini belum terisi semua, bila varFull masih false, maka tampilkan ke display dari function ini
            displayCalc(e.target.textContent);
    
        };

        if(e.target.dataset.action=='clear'){  //condition apabila tombol AC di klik
            document.querySelector('.calculator__display').innerHTML='0';
            hasil= null;
            varFull = false;
            angkaPertama =null;
            document.querySelector('.calculator__display').classList.remove('clicked')
        };
        // console.log(e.target);
            // console.log('-----------------');
            // console.log('dataset.action= ' + e.target.dataset.action);
            //  console.log('varFull= '+ varFull);
        // displayMath(e.target.textContent);
    }

);

function hitung(operator, angkaPertama, angkaKedua) {
    
    if(operator == 'add'){
        return parseInt(angkaPertama) + parseInt(angkaKedua);
    } else if(operator =='subtract'){
        return parseInt(angkaPertama) - parseInt(angkaKedua);
    } else if(operator == 'multiply'){
        return parseInt(angkaPertama) * parseInt(angkaKedua);    
    } else {
        return parseInt(angkaPertama) / parseInt(angkaKedua);
    }
}

function displayCalc(input) {  //function untuk menampilkan ke display calculator
    return document.querySelector('.calculator__display').textContent += input;
};

function cekTombolPertamaKali() { //cek pertama kali apakah tombol button calculator apakah pernah di klik
    if(!document.querySelector('.calculator__display').classList.contains('clicked')){  //block ini digunakan untuk memeriksa apakah tombol sudah pernah di klik , caranya dengan menambahkan class clicked 
        document.querySelector('.calculator__display').textContent= null ;              //bila belum pernah di klik, maka class tambahan akan diberikan, lalu display dikosongkan
        document.querySelector('.calculator__display').classList.add('clicked');
    };
};

function cekInputUser(e) {
    if(e.target.className=='key--operator'){ //cek operator apa yang diklik, 
        operator = e.target.dataset.action;
        // console.log(operator);
    }else 
    // if(e.target.className=='key--equal'){ //cek eksekutor yang di klik
        // eksekutor = e.target.textContent;
        if(e.target.className =='key--equal' && operator && angkaPertama && angkaKedua !== null){
            varFull = true;  //varFull di set true, supaya function displaynya dipanggil dari blok ini, dan tidak terpanggil 2 x
            hasil = hitung(operator,angkaPertama,angkaKedua);
            let hasilDisplay = displayCalc(e.target.textContent);           
            document.querySelector('.calculator__display').innerHTML = hasilDisplay + hasil ;
        // };
    }else if(angkaPertama == null) {  //cek angka pertama yg di klik
        angkaPertama = e.target.textContent;
    }else {
        angkaKedua = e.target.textContent;  //cek angka kedua yang dicek
    };
};