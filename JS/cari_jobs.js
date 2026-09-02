

const urlLokal = 'https://hombing-api.vercel.app/api/loker-lokal';
const urlGlobal = 'https://hombing-api.vercel.app/api/loker-global';

// Variabel untuk Paginasi Halaman nanti
let dataLokerTersaring = [];
let halamanSaatIni = 1;
const itemPerHalaman = 6;

// Menangkap Elemen HTML 
const wadahLoker = document.getElementById('wadah-loker');
const btnSebelumnya = document.getElementById('btn-sebelumnya');
const btnSelanjutnya = document.getElementById('btn-selanjutnya');
const infoHalaman = document.getElementById('btn-halaman');
const btnLokal = document.getElementById("loker-lokal");
const btnGlobal = document.getElementById("loker-global");
const inputPosisi = document.getElementById("input-posisi");
const inputLokasi = document.getElementById("input-lokasi");
const btnCari = document.getElementById("btn-cari");
const btnReset = document.getElementById('btn-reset');


// untuk membuat elemen baru

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



function tampilkanSkeleton() {
    wadahLoker.textContent = ''; 
    for (let i = 0; i < 6; i++) {
        let kartuSkeleton = buatElemen('div', 'card-skeleton', '');
        let skelLogo = buatElemen('div', 'skeleton skel-logo', '');
        let skelJudul = buatElemen('div', 'skeleton skel-judul', '');
        let skelLabel = buatElemen('div', 'skeleton skel-label', '');
        let skelSkill = buatElemen('div', 'skeleton skel-skill', '');
        let skelTombol = buatElemen('div', 'skeleton skel-tombol', '');

        kartuSkeleton.appendChild(skelLogo);
        kartuSkeleton.appendChild(skelJudul);
        kartuSkeleton.appendChild(skelLabel);
        kartuSkeleton.appendChild(skelSkill);
        kartuSkeleton.appendChild(skelTombol);
        wadahLoker.appendChild(kartuSkeleton);
    }
}


// ambil data dari API

function ambilDataLoker(url, kataPosisi = '', kataLokasi = '') {
    tampilkanSkeleton(); 

    fetch(url)
        .then((Response) => Response.json())
        .then((res) => {
            dataLokerTersaring = res.lowongan.filter(function (loker) {
                let teksPosisiAPI = (loker.posisi || "").toLowerCase();
                let teksLokasiAPI = (loker.lokasi || "").toLowerCase();
                
              
                let kunciPosisi = (kataPosisi || "").toLowerCase();
                let kunciLokasi = (kataLokasi || "").toLowerCase();

                let cocokTeks = teksPosisiAPI.includes(kunciPosisi) && teksLokasiAPI.includes(kunciLokasi);
                let kotakTencentang = document.querySelectorAll('.cb-skill:checked');
                let cocokSkill = false;

                if (kotakTencentang.length === 0) {
                    cocokSkill = true;
                } else {
                    let skillDariAPI = loker.skill_it || [];
                    kotakTencentang.forEach(function (kotak) {
                        if (skillDariAPI.includes(kotak.value)) {
                            cocokSkill = true;
                        }
                    });
                }
                return cocokTeks && cocokSkill;
            });

            halamanSaatIni = 1;
            tampilkanLokerPerHalaman(); 
        })
        .catch((error) => {
            console.log('Data Error', error);
        });
}

function tampilkanLokerPerHalaman() {
    wadahLoker.textContent = ''; 

    if (dataLokerTersaring.length === 0) {
        const noResult = buatElemen('h3', 'no-result', 'Maaf Data Tidak Ditemukan');
        wadahLoker.appendChild(noResult);
        updateNavigasi(0);
        return;
    }

    let totalHalaman = Math.ceil(dataLokerTersaring.length / itemPerHalaman);
    let indeksAwal = (halamanSaatIni - 1) * itemPerHalaman;
    let indeksAkhir = indeksAwal + itemPerHalaman;
    let dataHalamanIni = dataLokerTersaring.slice(indeksAwal, indeksAkhir);

    dataHalamanIni.forEach((loker) => {
        let kartu = buatElemen('div', 'card-promosi', '');

        // logo  perusahaan  rating 
        let cardLogo = buatElemen('div', 'card-logo', '');
        let infoPerusahaan = buatElemen('div', 'info-perusahaan', '');
        let ikonPT = buatElemen('span', 'material-icons ikon-pt', 'business');
        let namaPT = buatElemen('span', '', loker.perusahaan || 'PT Nusantara');
        let spanRating = buatElemen('span', '', '4.8');
        let ikonBintang = buatElemen('span', 'material-icons ikon-bintang', 'star');

       
        let idUnik = loker.posisi + "-" + (loker.perusahaan || 'PT');
        let daftarFavorit = JSON.parse(localStorage.getItem('dataFavoritKita')) || [];
        let sudahDisimpan = daftarFavorit.some(item => item.idUnik === idUnik);

        let classHatiAwal = sudahDisimpan ? 'material-icons btn-hati tersimpan' : 'material-icons btn-hati';
        let teksHatiAwal = sudahDisimpan ? 'favorite' : 'favorite_border';
        let ikonHati = buatElemen('span', classHatiAwal, teksHatiAwal);

        ikonHati.addEventListener('click', function () {
             let status = localStorage.getItem('statusLogin');
             if(status==='aktif')
             {

             
            ikonHati.classList.toggle('tersimpan');
            let favoritSekarang = JSON.parse(localStorage.getItem('dataFavoritKita')) || [];

            if (ikonHati.classList.contains('tersimpan')) {
                ikonHati.textContent = 'favorite';
                let lokerDisimpan = {
                    idUnik: idUnik,
                    posisi: loker.posisi,
                    perusahaan: loker.perusahaan,
                    lokasi: loker.lokasi,
                    jenis_pekerjaan: loker.jenis_pekerjaan,
                    pendidikan: loker.pendidikan,
                    skill_it: loker.skill_it,
                    deadline: loker.deadline
                };
                favoritSekarang.push(lokerDisimpan);
                localStorage.setItem('dataFavoritKita', JSON.stringify(favoritSekarang));
                munculkanPesan(`Tersimpan: ${loker.posisi} di ${loker.perusahaan || 'PT Nusantara'}`);
            } else {
                ikonHati.textContent = 'favorite_border';
                favoritSekarang = favoritSekarang.filter(item => item.idUnik !== idUnik);
                localStorage.setItem('dataFavoritKita', JSON.stringify(favoritSekarang));
                munculkanPesan(`Dihapus dari favorit.`);
            }
        }
        else
        {
            munculkanPesan(`⚠️ Anda harus login terlebih dahulu!`, 'error');
        }
        });

        // merakit elemen atas
        spanRating.prepend(ikonBintang);
        infoPerusahaan.appendChild(ikonPT);
        infoPerusahaan.appendChild(namaPT);
        infoPerusahaan.appendChild(spanRating);
        cardLogo.appendChild(infoPerusahaan);
        cardLogo.appendChild(ikonHati);
        kartu.appendChild(cardLogo);

        // judul pekerjaan
        let judul = buatElemen('h3', '', loker.posisi);
        kartu.appendChild(judul);

        // Label tipe lokasi  pendidikan 
        let cardLabel = buatElemen('div', 'card-label', '');
        
        let badgeTipe = buatElemen('span', 'badge badge-tipe', ' ' + (loker.jenis_pekerjaan || 'Full-Time'));
        let ikonTipe = buatElemen('span', 'material-icons', 'work');
        badgeTipe.prepend(ikonTipe);

        let badgeLokasi = buatElemen('span', 'badge badge-lokasi', ' ' + (loker.lokasi || 'Jakarta'));
        let ikonLokasi = buatElemen('span', 'material-icons', 'location_on');
        badgeLokasi.prepend(ikonLokasi);

        let badgePendidikan = buatElemen('span', 'badge badge-pendidikan', ' ' + (loker.pendidikan || 'Minimal S1'));
        let ikonPendidikan = buatElemen('span', 'material-icons', 'school');
        badgePendidikan.prepend(ikonPendidikan);

        cardLabel.appendChild(badgeTipe);
        cardLabel.appendChild(badgeLokasi);
        cardLabel.appendChild(badgePendidikan);
        kartu.appendChild(cardLabel);

        //  syarat keahlian
        let divSkill = buatElemen('div', 'card-skill', '');
        let pJudul = buatElemen('p', 'judul-skill', 'SYARAT KEAHLIAN (IT SKILLS):');
        let divKumpulan = buatElemen('div', 'kumpulan-skill', '');
        let dataSkillDariApi = loker.skill_it;

        if (dataSkillDariApi) {
            dataSkillDariApi.forEach((skill) => {
                let kapsulSkill = buatElemen('span', 'skill-badge', skill);
                divKumpulan.appendChild(kapsulSkill);
            });
        }

        divSkill.appendChild(pJudul);
        divSkill.appendChild(divKumpulan);
        kartu.appendChild(divSkill);

        // deadline dan tombol lamar
        let cardDeadline = buatElemen('div', 'card-deadline', '');
        let tglLoker = buatElemen('p', 'tgl-loker', ' ' + (loker.deadline || '30 Agustus 2026'));
        let ikonKalender = buatElemen('span', 'material-icons', 'calendar_today');
        let btnLamar = buatElemen('button', '', 'Lamar Sekarang');
        btnLamar.type = 'button';

// nontifikasi
function munculkanPesan(pesan, tipe) {
    const wadahToast = document.getElementById('wadah-toast');
    
  
    if (!wadahToast) {
        console.error("Wadah toast tidak ditemukan di HTML! Pastikan ada <div id='wadah-toast'></div>");
        return; 
    }

    // buat elemen untuk pesan
    let kotakToast = buatElemen('div', 'toast', pesan);
    
    
    if (tipe === 'error') {
        kotakToast.classList.add('toast-error');
    }

 
    wadahToast.appendChild(kotakToast);

   
    setTimeout(function () {
        kotakToast.remove();
    }, 3000);
}


// tombol lamar kerja

btnLamar.addEventListener('click', function () {
    // ambil status login
    let status = localStorage.getItem('statusLogin');
    console.log("Status saat tombol diklik:", status); // Untuk pantauan di console

   
    if (status === 'aktif') {
        
     
        munculkanPesan(`✅ Lamaran posisi ${loker.posisi} berhasil diproses!`, 'sukses');
        
       
        setTimeout(function () {
            window.location.href = `/HTML/lamar.html?posisi=${loker.posisi}&pt=${loker.nama_perusahaan}`;
        }, 2000);

    } else {
        
        
        munculkanPesan(`⚠️ Anda harus login terlebih dahulu!`, 'error');

    }
});

        tglLoker.prepend(ikonKalender);
        cardDeadline.appendChild(tglLoker);
        cardDeadline.appendChild(btnLamar);
        kartu.appendChild(cardDeadline);

        wadahLoker.appendChild(kartu);
    });

    updateNavigasi(totalHalaman);
}


// untuk paginasi

function updateNavigasi(totalHalaman) {
    if (totalHalaman === 0) {
        infoHalaman.textContent = `Halaman 0 dari 0`;
        btnSebelumnya.disabled = true;
        btnSelanjutnya.disabled = true;
        return;
    }
    infoHalaman.textContent = `Halaman ${halamanSaatIni} dari ${totalHalaman}`;
    btnSebelumnya.disabled = (halamanSaatIni === 1);
    btnSelanjutnya.disabled = (halamanSaatIni === totalHalaman);
}

btnSebelumnya.addEventListener('click', function () {
    if (halamanSaatIni > 1) {
        halamanSaatIni--;
        tampilkanLokerPerHalaman();
    }
});

btnSelanjutnya.addEventListener('click', function () {
    let totalHalaman = Math.ceil(dataLokerTersaring.length / itemPerHalaman);
    if (halamanSaatIni < totalHalaman) {
        halamanSaatIni++;
        tampilkanLokerPerHalaman();
    }
});


// untuk pencarian

//tombol cari
btnCari.addEventListener('click', function () {
    let kataKunciPosisi = inputPosisi.value;
    let kataKunciLokasi = inputLokasi.value;
    let targetUrl = btnLokal.classList.contains('aktif') ? urlLokal : urlGlobal;
    ambilDataLoker(targetUrl, kataKunciPosisi, kataKunciLokasi);
});

// tombol reset
btnReset.addEventListener('click', function () {
    inputPosisi.value = '';
    inputLokasi.value = '';

    const wadahKapsul = document.getElementById("wadah-kapsul");
    wadahKapsul.textContent = '';
    let kotakTencentang = document.querySelectorAll('.cb-skill:checked');
    kotakTencentang.forEach(kotak => kotak.checked = false);

    let targetUrl = btnLokal.classList.contains('aktif') ? urlLokal : urlGlobal;
    ambilDataLoker(targetUrl);
});

// tombol loka dan global
btnLokal.addEventListener('click', function () {
    btnLokal.classList.add('aktif');
    btnGlobal.classList.remove('aktif');
    btnCari.click();
});

btnGlobal.addEventListener('click', function () {
    btnLokal.classList.remove('aktif');
    btnGlobal.classList.add('aktif');
    btnCari.click();
});


// pop-up modal dan filter
const popUpModal = document.getElementById("modal-filter");
const btnTambahFilter = document.getElementById("btn-tambah-filter");
const btnTutupModal = document.getElementById("btn-tutup-modal");
const wadahKapsul = document.getElementById("wadah-kapsul");

btnTambahFilter.addEventListener('click', function () {
    popUpModal.style.display = 'flex';
});

btnTutupModal.addEventListener('click', function () {
    wadahKapsul.textContent = '';
    let kotakTencentang = document.querySelectorAll('.cb-skill:checked');

    kotakTencentang.forEach(function (kotak) {
        let kapsul = buatElemen('span', 'badge-filter', kotak.value + ' ');
        let ikonSilang = buatElemen('span', 'material-icons', 'close'); // Menggunakan Material Icon
        ikonSilang.style.fontSize = '14px';
        kapsul.appendChild(ikonSilang);

        kapsul.addEventListener('click', function () {
            kapsul.remove();
            kotak.checked = false;
            btnCari.click();
        });

        wadahKapsul.appendChild(kapsul);
    });

    popUpModal.style.display = 'none';
    btnCari.click();
});

// menangkap url dari beranda


let tangkapUrlCari = new URLSearchParams(window.location.search);
let queryPosisi = tangkapUrlCari.get('posisi') || ''; 
let queryLokasi = tangkapUrlCari.get('lokasi') || ''; 

inputPosisi.value = queryPosisi;
inputLokasi.value = queryLokasi;

// panggil API pertama kali sesuai dengan url
ambilDataLoker(urlLokal, queryPosisi, queryLokasi);

function cekStatusUser() {
    let areaBelumLogin = document.getElementById('area-belum-login');
    let areaSudahLogin = document.getElementById('area-sudah-login');
    
    let status = localStorage.getItem('statusLogin');
    let namaLengkap = localStorage.getItem('namaUserAktif');

    if (!areaBelumLogin || !areaSudahLogin) return; 

    if (status === 'aktif' && namaLengkap) {
        areaBelumLogin.classList.add('sembunyi'); 
        areaSudahLogin.classList.remove('sembunyi'); 

        let namaPanggilan = namaLengkap.split(' ')[0];
        document.getElementById('nama-profil').textContent = namaPanggilan;
        document.getElementById('foto-profil').src = `https://ui-avatars.com/api/?name=${namaLengkap}&background=189D82&color=fff`;
    } else {
        areaBelumLogin.classList.remove('sembunyi');
        areaSudahLogin.classList.add('sembunyi');
    }
}
cekStatusUser();
// untuk menu-kebawah
let tombolMenu = document.getElementById('tombol-menu');
let menuNav = document.getElementById('menu-navigasi');
tombolMenu.addEventListener('click', function () {
    menuNav.classList.toggle('tampil-aktif');

});

// logout
let tombolLogout = document.getElementById('tombol-logout');
if (tombolLogout) {
    tombolLogout.addEventListener('click', function() {
        localStorage.removeItem('statusLogin');
        localStorage.removeItem('namaUserAktif');
        alert('Anda telah berhasil keluar!');
        window.location.reload();
    });
}

document.getElementById('login').addEventListener('click',function()
{
    window.location.href='../HTML/login.html';

});
document.getElementById('register').addEventListener('click',function()
{
    window.location.href='../HTML/daftar.html';

});