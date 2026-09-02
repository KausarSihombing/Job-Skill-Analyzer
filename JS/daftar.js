
// untuk pendaftaran
let form = document.getElementById('form-daftar');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let nama = document.getElementById('nama').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('pw').value;
        let konfirm = document.getElementById('pw-konfirm').value;

        if (password !== konfirm) {
            alert('Password tidak sesuai');
            return;
        } else {
            let dataPengguna = {
                namaLengkap: nama,
                emailPengguna: email,
                passwordPengguna: password
            };

            // 1. Ambil data array lama dari memori jika tidak ada buat array kosong []
            let daftarAkun = JSON.parse(localStorage.getItem('kumpulanAkun')) || [];

        
            let cekEmail = daftarAkun.find(user => user.emailPengguna === email);
            if (cekEmail) {
                alert('Email ini sudah terdaftar! Silakan gunakan email lain.');
                return; //stop pendaftarannya
            }

            // masukkan data user ke array
            daftarAkun.push(dataPengguna);

            //  Simpan kembali array yang sudah ditambahkan ke dalam localStorage
            localStorage.setItem('kumpulanAkun', JSON.stringify(daftarAkun));
            
            alert('Pendaftaran berhasil!');
            window.location.href = 'login.html';
        }
    });
}

// untuk login
let formLogin = document.getElementById('form-login');
if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let emailUser = document.getElementById('email').value;
        let passwordUser = document.getElementById('pw').value;

        // 1. Ambil data array dari memori
        let daftarAkun = JSON.parse(localStorage.getItem('kumpulanAkun')) || [];
        
        //  Cari satu user di dalam array yang email dan passwordnya cocok
        
        let userCocok = daftarAkun.find(user => user.emailPengguna === emailUser && user.passwordPengguna === passwordUser);
        
        if (userCocok) {
            alert('Selamat datang, ' + userCocok.namaLengkap + '!'); 
            
            
            localStorage.setItem('statusLogin', 'aktif');
            localStorage.setItem('namaUserAktif', userCocok.namaLengkap); //simpan siapa yang
            
            window.location.href = '../index.html';
        } else {
            alert('Email atau Password salah, atau Anda belum mendaftar!');
        }
    });
}