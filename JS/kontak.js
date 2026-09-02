function buatElemen(tag, namaClass, isi) {
    let elemenBaru = document.createElement(tag);
    if (namaClass) {
        let classBaru = namaClass.split(" ");
        classBaru.forEach(a => elemenBaru.classList.add(a));
    }
    if (isi) {
        elemenBaru.textContent = isi;
    }
    return elemenBaru;
}

function munculkanPesan(pesan, tipe) {
    const wadahToast = document.getElementById('wadah-toast');
    let kotakToast = buatElemen('div', 'toast', pesan);

    if (tipe === 'error') {
        kotakToast.classList.add('toast-error');
    }

    wadahToast.appendChild(kotakToast);

    setTimeout(function () {
        kotakToast.remove();
    }, 3000);
}


// login profil
function cekStatusUser() {
    let status = localStorage.getItem('statusLogin');
    let namaLengkap = localStorage.getItem('namaUserAktif');

    let areaBelumLogin = document.getElementById('area-belum-login');
    let areaSudahLogin = document.getElementById('area-sudah-login');

    if (!areaBelumLogin || !areaSudahLogin) return;

    if (status === 'aktif' && namaLengkap) {
        areaBelumLogin.classList.add('sembunyi');
        areaSudahLogin.classList.remove('sembunyi');

        let namaPanggilan = namaLengkap.split(' ')[0];
        let linkAvatar = `https://ui-avatars.com/api/?name=${namaLengkap}&background=189D82&color=fff`;

        let namaHeader = document.getElementById('nama-profil-header');
        let fotoHeader = document.getElementById('foto-profil-header');

        if (namaHeader) namaHeader.textContent = namaPanggilan;
        if (fotoHeader) fotoHeader.src = linkAvatar;
    } else {
        areaBelumLogin.classList.remove('sembunyi');
        areaSudahLogin.classList.add('sembunyi');
    }
}

// logout
let btnLogoutHeader = document.getElementById('tombol-logout-header');
if (btnLogoutHeader) {
    btnLogoutHeader.addEventListener('click', function () {
        localStorage.removeItem('statusLogin');
        localStorage.removeItem('namaUserAktif');
        alert('Anda telah berhasil keluar!');
        window.location.reload();
    });
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    cekStatusUser();
});

// untuk menu-kebawah
let tombolMenu = document.getElementById('tombol-menu');
let menuNav = document.getElementById('menu-navigasi');
tombolMenu.addEventListener('click', function () {
    menuNav.classList.toggle('tampil-aktif');

});


document.getElementById('login').addEventListener('click', function () {
    window.location.href = '../HTML/login.html';

});
document.getElementById('register').addEventListener('click', function () {
    window.location.href = '../HTML/daftar.html';

});




let namaAktif = localStorage.getItem('namaUserAktif');
// [] menvegah jika kumpulan akun kosong
let daftarAkun = JSON.parse(localStorage.getItem('kumpulanAkun')) || [];
let dataUser = daftarAkun.find(user => user.namaLengkap == namaAktif);


if (dataUser) {
    document.getElementById('nama').value = dataUser.namaLengkap;
    document.getElementById('email').value = dataUser.emailPengguna;
}

const form = document.getElementById('form-pesan');

form.addEventListener('submit', function (event) {



    event.preventDefault();

    let status = localStorage.getItem('statusLogin');


    if (status === 'aktif') {
        const emailTujuan = 'kautsarsihombing@gmail.com';
        const emailPengirim = dataUser.emailPengguna;
        const pesan = document.getElementById('pesan').value;

        // kita buat variabel Subject Email
        const subjekEmail = 'Pesan Baru dari ' + dataUser.namaLengkap;


        const surat = `Nama: ${dataUser.namaLengkap}\nEmail: ${emailPengirim}\n\nPesan:\n${pesan}`;


        const mailto = `mailto:${emailTujuan}?subject=${encodeURIComponent(subjekEmail)}&body=${encodeURIComponent(surat)}`;
        munculkanPesan(`✅ Terimah Kasih atas feedback dari anda`, 'sukses');

        window.location.href = mailto;

        // alert('Aplikasi email akan terbuka, silakan tekan kirim pada aplikasi tersebut!');
        pesan = ' ';
    } else {
        // alert('Harap Login terlebih dahulu');

        munculkanPesan('⚠️ Harap Login terlebih dahulu', 'error');
    }


});