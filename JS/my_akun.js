

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

function munculkanPesan(pesan) {
    const wadahToast = document.getElementById('wadah-toast');
    if(!wadahToast) return; 

    let kotakToast = buatElemen('div', 'toast', pesan);
    wadahToast.appendChild(kotakToast);
    
    setTimeout(function() {
        kotakToast.remove();
    }, 3000); 
}

function tampilkanFavorit() {
    const wadahFavorit = document.getElementById('wadah-loker-favorit');
    if (!wadahFavorit) return;

    wadahFavorit.textContent = ''; 

    let daftarFavorit = JSON.parse(localStorage.getItem('dataFavoritKita')) || [];

    
    if (daftarFavorit.length === 0) {
        let wadahKosong = buatElemen('div', 'wadah-kosong', '');
       
        let ikonKosong = buatElemen('span', 'material-icons ikon-kosong', 'heart_broken');
        let judulKosong = buatElemen('h3', 'judul-kosong', 'Belum Ada Pekerjaan Tersimpan');
        let deskripsiKosong = buatElemen('p', 'deskripsi-kosong', 'Jelajahi halaman Cari Jobs dan klik ikon hati untuk menyimpannya di sini.');

        wadahKosong.appendChild(ikonKosong);
        wadahKosong.appendChild(judulKosong);
        wadahKosong.appendChild(deskripsiKosong);
        wadahFavorit.appendChild(wadahKosong);
        return;
    }

    
    daftarFavorit.forEach((loker) => {
        //kita rakit kartu nya disini
        let kartu = buatElemen('div', 'card-promosi', '');
        
        let cardLogo = buatElemen('div', 'card-logo', '');
        let infoPerusahaan = buatElemen('div', 'info-perusahaan', '');
        let ikonPT = buatElemen('span', 'material-icons ikon-pt', 'business');
        let namaPT = buatElemen('span', '', loker.perusahaan || 'PT Nusantara');
        let spanRating = buatElemen('span', '', '4.8');
        let ikonBintang = buatElemen('span', 'material-icons ikon-bintang', 'star');
        
        let ikonHati = buatElemen('span', 'material-icons btn-hati tersimpan', 'favorite');

        ikonHati.addEventListener('click', function() {
            let sisaFavorit = daftarFavorit.filter(item => item.idUnik !== loker.idUnik);
            localStorage.setItem('dataFavoritKita', JSON.stringify(sisaFavorit));
            
            munculkanPesan('Pekerjaan berhasil dihapus dari favorit.');
            tampilkanFavorit(); 
        });

        spanRating.prepend(ikonBintang);
        infoPerusahaan.appendChild(ikonPT);
        infoPerusahaan.appendChild(namaPT);
        infoPerusahaan.appendChild(spanRating);
        cardLogo.appendChild(infoPerusahaan);
        cardLogo.appendChild(ikonHati);
        kartu.appendChild(cardLogo);

        let judul = buatElemen('h3', '', loker.posisi);
        kartu.appendChild(judul);

        let cardLabel = buatElemen('div', 'card-label', '');
        let badgeTipe = buatElemen('span', 'badge badge-tipe', ' ' + (loker.jenis_pekerjaan || 'Full-Time'));
        badgeTipe.prepend(buatElemen('span', 'material-icons', 'work'));

        let badgeLokasi = buatElemen('span', 'badge badge-lokasi', ' ' + (loker.lokasi || 'Jakarta'));
        badgeLokasi.prepend(buatElemen('span', 'material-icons', 'location_on'));

        let badgePendidikan = buatElemen('span', 'badge badge-pendidikan', ' ' + (loker.pendidikan || 'Minimal S1'));
        badgePendidikan.prepend(buatElemen('span', 'material-icons', 'school'));

        cardLabel.appendChild(badgeTipe);
        cardLabel.appendChild(badgeLokasi);
        cardLabel.appendChild(badgePendidikan);
        kartu.appendChild(cardLabel);

        let divSkill = buatElemen('div', 'card-skill', '');
        let pJudul = buatElemen('p', 'judul-skill', 'SYARAT KEAHLIAN:');
        let divKumpulan = buatElemen('div', 'kumpulan-skill', '');
        
        if (loker.skill_it) {
            loker.skill_it.forEach((skill) => {
                let kapsulSkill = buatElemen('span', 'skill-badge', skill);
                divKumpulan.appendChild(kapsulSkill);
            });
        }

        divSkill.appendChild(pJudul);
        divSkill.appendChild(divKumpulan);
        kartu.appendChild(divSkill);

        let cardDeadline = buatElemen('div', 'card-deadline', '');
        let tglLoker = buatElemen('p', 'tgl-loker', ' ' + (loker.deadline || '30 Agustus 2026'));
        tglLoker.prepend(buatElemen('span', 'material-icons', 'calendar_today'));
        
        let btnLamar = buatElemen('button', '', 'Lamar Sekarang');
        btnLamar.type = 'button';
// untuk nontifikasi
function munculkanPesan(pesan, tipe) {
    const wadahToast = document.getElementById('wadah-toast');
    
    // memastikan wadah nya ada di html
    if (!wadahToast) {
        console.error("Wadah toast tidak ditemukan di HTML! Pastikan ada <div id='wadah-toast'></div>");
        return; 
    }

    // Membuat elemen div untuk kotak pesan (otomatis mendapat class 'toast')
    let kotakToast = buatElemen('div', 'toast', pesan);
    
   

    
    wadahToast.appendChild(kotakToast);

    // Hapus otomatis dari layar setelah 3 detik
    setTimeout(function () {
        kotakToast.remove();
    }, 3000);
}


// untuk tombol lamar kerja

btnLamar.addEventListener('click', function () {
    // 1. Ambil data status login 
    let status = localStorage.getItem('statusLogin');

    // cek user login atau tidak
    if (status === 'aktif') {
        
     
        munculkanPesan(`✅ Lamaran posisi ${loker.posisi} berhasil diproses!`, 'sukses');
        
       
        setTimeout(function () {
            window.location.href = `/HTML/lamar.html?posisi=${loker.posisi}&pt=${loker.nama_perusahaan}`;
        }, 3000);

    } else {
        
       
        munculkanPesan(`⚠️ Anda harus login terlebih dahulu!`, 'error');

    }
});

       

        cardDeadline.appendChild(tglLoker);
        cardDeadline.appendChild(btnLamar);
        kartu.appendChild(cardDeadline);

        wadahFavorit.appendChild(kartu);
    });
}

// untuk profil nya
function cekStatusUser() {
    let status = localStorage.getItem('statusLogin');
    let namaLengkap = localStorage.getItem('namaUserAktif');

    let areaBelumLogin = document.getElementById('area-belum-login');
    let areaSudahLogin = document.getElementById('area-sudah-login');

    if (status === 'aktif' && namaLengkap) {
        // 1. Atur Header Atas
        if (areaBelumLogin && areaSudahLogin) {
            areaBelumLogin.classList.add('sembunyi'); 
            areaSudahLogin.classList.remove('sembunyi'); 
        }

        let namaPanggilan = namaLengkap.split(' ')[0];
        let linkAvatar = `https://ui-avatars.com/api/?name=${namaLengkap}&background=189D82&color=fff`;
        
        // Update Nama & Foto di Header
        let namaHeader = document.getElementById('nama-profil-header');
        let fotoHeader = document.getElementById('foto-profil-header');
        if (namaHeader) namaHeader.textContent = namaPanggilan;
        if (fotoHeader) fotoHeader.src = linkAvatar;

        //  Atur Sidebar Kiri
        let namaSidebar = document.getElementById('nama-profil-sidebar');
        let fotoSidebar = document.getElementById('foto-profil-sidebar');
        if (namaSidebar) namaSidebar.textContent = namaLengkap; 
        if (fotoSidebar) fotoSidebar.src = linkAvatar + '&size=128';

        // cari email dari kumulan akun
        let daftarAkun = JSON.parse(localStorage.getItem('kumpulanAkun')) || [];
        let emailUser = 'Belum diatur';
        daftarAkun.forEach(a => {
            if(a.namaLengkap === namaLengkap) {
                emailUser = a.emailPengguna;
            }
        });
        
        let teksEmail = document.getElementById('email-akun');
        if(teksEmail) teksEmail.textContent = emailUser;   
    } else {
        
        window.location.href = '/HTML/login.html';
    }
}

// untuk  log out
function prosesLogout() {
    localStorage.removeItem('statusLogin');
    localStorage.removeItem('namaUserAktif');
    alert('Anda telah berhasil keluar!');
    window.location.href = '../index.html'; 
}

// Pasang event ke tombol Logout
let btnLogoutHeader = document.getElementById('tombol-logout-header');
if (btnLogoutHeader) {
    btnLogoutHeader.addEventListener('click', prosesLogout);
}

// Pasang event ke tombol Logout di Sidebar
let btnLogoutSidebar = document.getElementById('btn-logout-sidebar');
if (btnLogoutSidebar) {
    btnLogoutSidebar.addEventListener('click', prosesLogout);
}

// jalankan fungsi pas halaman saat di muat
document.addEventListener('DOMContentLoaded', function() {
    cekStatusUser();
    tampilkanFavorit();
});



// untuk menu-kebawah
let tombolMenu = document.getElementById('tombol-menu');
let menuNav = document.getElementById('menu-navigasi');
tombolMenu.addEventListener('click', function () {
    menuNav.classList.toggle('tampil-aktif');

});

const menuFavorit = document.getElementById('btn-tab-favorit');
const menuStatus = document.getElementById('btn-tab-status');
const areaFavorit = document.getElementById('area-favorit');
const areaStatus = document.getElementById('area-status');

// klik menu favorit
menuFavorit.addEventListener('click', function() {
    menuFavorit.classList.add('aktif');
    menuStatus.classList.remove('aktif');

    areaFavorit.classList.remove('sembunyi'); //Favorit Muncul
    areaStatus.classList.add('sembunyi');     // Status Sembunyi
});

// klik menu status lamaran
menuStatus.addEventListener('click', function() {
    menuFavorit.classList.remove('aktif');
    menuStatus.classList.add('aktif');

    areaFavorit.classList.add('sembunyi');    //  Favorit Sembunyi
    areaStatus.classList.remove('sembunyi');  //  Status Muncul
    statusLamaran();
    
});


function statusLamaran() {
    
    let wadahStatus = document.getElementById('wadah-status-lamaran');
    wadahStatus.textContent = ''; 
    
    let data = JSON.parse(localStorage.getItem('dataStatusLamaran')) || [];
    
    
    let user = localStorage.getItem('namaUserAktif');

    let lamaranKu = data.filter(a => a.namaPelamar === user);

    console.log("1. Total Semua Data:", data);
    console.log("2. Nama User Aktif:", user);
    console.log("3. Hasil LamaranKu:", lamaranKu);
    
    if (lamaranKu.length == 0) {
        if (lamaranKu.length == 0) {
       
        let wadahKosong = buatElemen('div', 'wadah-kosong-status', '');
        let ikonKosong = buatElemen('span', 'material-icons ikon-status-kosong', 'work_history'); 
        let judulKosong = buatElemen('h3', 'judul-status-kosong', 'Belum Ada Lamaran');
        let deskripsiKosong = buatElemen('p', 'teks-status-kosong', 'Anda belum mengirimkan lamaran apapun. Yuk mulai eksplorasi karirmu!');

        wadahKosong.appendChild(ikonKosong);
        wadahKosong.appendChild(judulKosong);
        wadahKosong.appendChild(deskripsiKosong);
        
        wadahStatus.appendChild(wadahKosong);
        return; 
    }
        
        
        return; 
    }

    let waktuSekarang = new Date().getTime();
    let adaPerubahaan = false;

  
    lamaranKu.forEach(loker => {
        // untuk waktu
        if (loker.statusTampil === 'Diproses' && waktuSekarang >= loker.waktuBuka) {
            loker.statusTampil = loker.statusHasil;
            adaPerubahaan = true;
        }

    //   buat bungkus kartu
        let kartu = buatElemen('div', 'card-status', '');

     
        let headerKartu = buatElemen('div', 'header-status', '');
        let teksPerusahaan = buatElemen('p', 'nama-pt-status', loker.perusahaanLamaran || 'Perusahaan');
        
        let btnHapus = buatElemen('span', 'material-icons btn-hapus', 'delete');
        btnHapus.title = "Hapus Riwayat Lamaran";
        
        // hapus data
        btnHapus.addEventListener('click', function() {
            let yakin = confirm('Yakin ingin menghapus riwayat lamaran ini?');
            if (yakin) {
            
                let sisaData = data.filter(item => item.waktuBuka !== loker.waktuBuka);
                localStorage.setItem('dataStatusLamaran', JSON.stringify(sisaData));
                statusLamaran(); // Refresh layar supaya kartu hilang
            }
        });

        headerKartu.appendChild(teksPerusahaan);
        headerKartu.appendChild(btnHapus);

        //  Judul Posisi 
        let teksPosisi = buatElemen('h3', 'posisi-status', loker.posisiLamaran);

        // label status
        let badgeStatus = buatElemen('span', 'badge-status-label', loker.statusTampil);
        
      
        
     
        if (loker.statusTampil === 'Diproses') {
            badgeStatus.classList.add('badge-diproses');
        } else if (loker.statusTampil === 'Diterima') {
            badgeStatus.classList.add('badge-diterima');
        } else {
            badgeStatus.classList.add('badge-ditolak');
        }

   
        kartu.appendChild(headerKartu);
        kartu.appendChild(teksPosisi);
        kartu.appendChild(badgeStatus);

        //masukkan kartu ke wadah utama
        let wadahStatus = document.getElementById('wadah-status-lamaran');
        wadahStatus.appendChild(kartu);
    });   

    
    if (adaPerubahaan == true) {
      
        localStorage.setItem('dataStatusLamaran', JSON.stringify(data));
    }   
}



