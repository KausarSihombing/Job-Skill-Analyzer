// fungsi buat elemen

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

// ==========================================
// mengambil API

function ambilDataLoker() {
    fetch('https://hombing-api.vercel.app/api/loker-lokal')
        .then((Response) => Response.json())
        .then((res) => {
            console.log('Data dari Api:', res);

            // Tangkap wadah utama dari HTML
            const wadahLoker = document.getElementById('wadah-loker');

            // kita ambil 3 data 
            res.lowongan.slice(0, 3).forEach((loker) => {

                // box utama kita
                let kartu = buatElemen('div', 'card-promosi', '');

                // ==========================================
                // Logo, Perusahaan, Rating, & Hati

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
                 
                // untuk menyimpan favorit kita nanti
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

                spanRating.prepend(ikonBintang);
                infoPerusahaan.appendChild(ikonPT);
                infoPerusahaan.appendChild(namaPT);
                infoPerusahaan.appendChild(spanRating);
                cardLogo.appendChild(infoPerusahaan);
                cardLogo.appendChild(ikonHati);

                kartu.appendChild(cardLogo);


                // ==========================================
                // Judul Pekerjaan

                let judul = buatElemen('h3', '', loker.posisi);
                kartu.appendChild(judul);


                //  Kapsul (Full-Time, Jakarta, S1)

                let cardLabel = buatElemen('div', 'card-label', '');

         
                let badgeTipe = buatElemen('span', 'badge badge-tipe', ' ' + (loker.jenis_pekerjaan || 'Full-Time'));
            
                let ikonTipe = buatElemen('span', 'material-icons', 'work');
                badgeTipe.prepend(ikonTipe);

                // Kapsul Lokasi
                let badgeLokasi = buatElemen('span', 'badge badge-lokasi', ' ' + (loker.lokasi || 'Jakarta'));
               
                let ikonLokasi = buatElemen('span', 'material-icons', 'location_on');
                badgeLokasi.prepend(ikonLokasi);

                // Kapsul Pendidikan
                let badgePendidikan = buatElemen('span', 'badge badge-pendidikan', ' ' + (loker.pendidikan || 'Minimal S1'));
                
                let ikonPendidikan = buatElemen('span', 'material-icons', 'school');
                badgePendidikan.prepend(ikonPendidikan);

                // merakit kapsulnya 
                cardLabel.appendChild(badgeTipe);
                cardLabel.appendChild(badgeLokasi);
                cardLabel.appendChild(badgePendidikan);

                kartu.appendChild(cardLabel);


                // ini bagian syarat keahlian nya
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


                // ini untuk bagian dedline
                let cardDeadline = buatElemen('div', 'card-deadline', '');

                let tglLoker = buatElemen('p', 'tgl-loker', ' ' + (loker.deadline || '30 Agustus 2026'));
                // let ikonKalender = buatElemen('i', 'fa-regular fa-calendar', '');
                let ikonKalender = buatElemen('span', 'material-icons', 'calendar_today');

                let btnLamar = buatElemen('button', '', 'Lamar Sekarang');
                btnLamar.type = 'button';

                // untuk fungsi lamar kerja

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




                btnLamar.addEventListener('click', function () {
                    let status = localStorage.getItem('statusLogin');
                    console.log(status);

                    if (status === 'aktif') {
                        // berhasil login
                        munculkanPesan(`✅ Lamaran posisi ${loker.posisi} berhasil dikirim!`, 'sukses');
                     
                    //    kita kasih delaynya
                        setTimeout(function () {
                            window.location.href = `/HTML/lamar.html?posisi=${loker.posisi}&pt=${loker.nama_perusahaan}`;
                        }, 1000);

                    } else {
                    //  kalau seandainya gagal login
                        munculkanPesan(`⚠️ Anda harus login terlebih dahulu!`, 'error');
                        
                    }
                });

                tglLoker.prepend(ikonKalender);
                cardDeadline.appendChild(tglLoker);
                cardDeadline.appendChild(btnLamar);

                kartu.appendChild(cardDeadline);



                wadahLoker.appendChild(kartu);
            });
        })
        .catch((error) => {
            console.log('Data Error:', error);
        });
}

// run fungsi kita
ambilDataLoker();


// untuk 
let tombolMenu = document.getElementById('tombol-menu');
let menuNav = document.getElementById('menu-navigasi');
tombolMenu.addEventListener('click', function () {
    menuNav.classList.toggle('tampil-aktif');

});




// // login user
// function cekStatusUser() {
//     let areaBelumLogin = document.getElementById('area-belum-login');
//     let areaSudahLogin = document.getElementById('area-sudah-login');

//     // Kita baca 'ingatan' browser dengan nama kunci 'statusLogin'
//     let status = localStorage.getItem('statusLogin');
//     let namaLengkap = localStorage.getItem('namaUserAktif');

//     if (status === 'aktif') {
        
//         areaBelumLogin.classList.add('sembunyi'); // Sembunyikan tombol login
//         areaSudahLogin.classList.remove('sembunyi'); // Munculkan foto profil
//     //    kita ambil kata depan nya
//         let namaPanggilan = namaLengkap.split(' ')[0];

        
//         document.getElementById('nama-profil').textContent = namaPanggilan;

    
//         let linkAvatar = `https://ui-avatars.com/api/?name=${namaLengkap}&background=189D82&color=fff`;
//         document.getElementById('foto-profil').src = linkAvatar;

//     } else {
//         // Jika belum login
//         areaBelumLogin.classList.remove('sembunyi');
//         areaSudahLogin.classList.add('sembunyi');
//     }
// }

// Jalankan fungsi saat web pertama kali dibuka
// cekStatusUser();

// Fungsi untuk tombol Logout
let tombolLogout = document.getElementById('tombol-logout');
if (tombolLogout) {
    tombolLogout.addEventListener('click', function () {
        // Hapus ingatan login dari browser
        localStorage.removeItem('statusLogin');
        alert('Anda telah berhasil keluar!');
        // Refresh halaman otomatis
        window.location.reload();
    });
}

document.getElementById('login').addEventListener('click', function () {
    window.location.href = '../HTML/login.html';
});
document.getElementById('reg').addEventListener('click', function () {
    window.location.href = '../HTML/daftar.html';
});



let btnCariBeranda = document.getElementById('btn-cari');
let inputPosisiBeranda = document.getElementById('input-posisi');
let inputLokasiBeranda = document.getElementById('input-lokasi');

btnCariBeranda.addEventListener('click', function () {
    // Gunakan .trim() untuk menghilangkan spasi kosong di awal atau akhir
    let posisi = inputPosisiBeranda.value.trim();
    let lokasi = inputLokasiBeranda.value.trim();

    // Cek apakah posisi or lokasi tidak kosong
    if (posisi !== '' || lokasi !== '') {
        console.log("Posisi:", posisi);
        console.log("Lokasi:", lokasi);

        // kita gunakan encodeURIComponent agar spasi dan simbol aman di URL
        let urlPosisi = encodeURIComponent(posisi);
        let urlLokasi = encodeURIComponent(lokasi);

        window.location.href = `/HTML/cari_jobs.html?posisi=${urlPosisi}&lokasi=${urlLokasi}`;
    } else {
        let pesan = 'Silahkan Isi Skill/Posisi atau Lokasi';
        const wadahToast = document.getElementById('wadah-toast');
        let kotakToast = buatElemen('div', 'toast', pesan);

        // tambahkan class errror
        kotakToast.classList.add('toast-error');

        wadahToast.appendChild(kotakToast);
        // delay lagi guys
        setTimeout(function () {
            kotakToast.remove();
        }, 3000);
    }
});



// login profil user
function cekStatusUserBeranda() {
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
cekStatusUserBeranda();





