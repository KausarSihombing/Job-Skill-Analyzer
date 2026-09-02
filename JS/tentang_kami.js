// untuk profil nanti nya
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

// untuk logout
let btnLogoutHeader = document.getElementById('tombol-logout-header');
if (btnLogoutHeader) {
    btnLogoutHeader.addEventListener('click', function() {
        localStorage.removeItem('statusLogin');
        localStorage.removeItem('namaUserAktif');
        alert('Anda telah berhasil keluar!');
        window.location.reload(); 
    });
}

// Jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    cekStatusUser();
});


// untuk menu-kebawah
let tombolMenu = document.getElementById('tombol-menu');
let menuNav = document.getElementById('menu-navigasi');
tombolMenu.addEventListener('click', function () {
    menuNav.classList.toggle('tampil-aktif');

});



document.getElementById('login').addEventListener('click',function()
{
    window.location.href='../HTML/login.html';

});
document.getElementById('register').addEventListener('click',function()
{
    window.location.href='../HTML/daftar.html';

});