let tangkapUrl = new URLSearchParams(window.location.search);

let posisiPekerjaan = tangkapUrl.get('posisi');
let namaPerusahaan = tangkapUrl.get('pt');


console.log("Posisi: " + posisiPekerjaan);

document.getElementById('judul-posisi').textContent=posisiPekerjaan;
document.getElementById('nama-pt').textContent=namaPerusahaan;

let namaAktif=localStorage.getItem('namaUserAktif');

let daftarAkun = JSON.parse(localStorage.getItem('kumpulanAkun'));
let dataUser=daftarAkun.find(user=>user.namaLengkap==namaAktif);
if(dataUser)
{
    document.getElementById('nama-pelamar').value = dataUser.namaLengkap;
    document.getElementById('email-pelamar').value = dataUser.emailPengguna;

}

document.getElementById('form-lamaran').addEventListener('submit', function (event) {
    event.preventDefault();
    
    let nama = document.getElementById('nama-pelamar').value;
    let posisi = posisiPekerjaan;
    let perusahaan = namaPerusahaan;
    
   
    let skills = document.getElementById('input-skill-lamaran').value;
    let arraySkills = skills.split(',').map(item => item.trim()).filter(item => item !== ""); 
    
   
    let statusAkhir = '';
    if (arraySkills.length >= 2) {
        statusAkhir = 'Diterima';
    } else {
        statusAkhir = 'Ditolak';
    }

    
    // pengumuman = waktu saat ini +20 detik(20 detik = 20.000 milidetik)
    let waktuPengumuman = new Date().getTime() + 20000; 

    //  Ambil data lamaran lama dari LocalStorage 
    let daftarLamaran = JSON.parse(localStorage.getItem('dataStatusLamaran')) || [];

    //  Tambahkan data baru ke dalam Array
    let lamaranBaru = {
        idLamaran: "LMR-" + new Date().getTime(), // ID unik
        namaPelamar: nama,
        posisiLamaran: posisi,
        perusahaanLamaran: perusahaan,
        statusTampil: 'Diproses', // Status awal yang akan di lihat user nanti nya
        statusHasil: statusAkhir, 
        waktuBuka: waktuPengumuman 
    };
    daftarLamaran.push(lamaranBaru);

    // Simpan kembali ke LocalStorage
    localStorage.setItem('dataStatusLamaran', JSON.stringify(daftarLamaran));

    alert('Selamat! Lamaran Anda untuk posisi ' + posisiPekerjaan + ' telah dikirim dan sedang diproses.');
    window.location.href = '/HTML/my_akun.html';
});