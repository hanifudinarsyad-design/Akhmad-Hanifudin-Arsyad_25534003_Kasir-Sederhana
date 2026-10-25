const form = document.getElementById("formBelanja");
const daftar = document.getElementById("daftarBelanja");

const totalJenis = document.getElementById("totalJenis");
const totalJumlah = document.getElementById("totalJumlah");
const totalBiaya = document.getElementById("totalBiaya");

let barangBelanja = [];

function rupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// Menambahkan barang setiap kali formulir dikirim
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("namaBarang").value.trim();
    const jumlah = Number(document.getElementById("jumlah").value);
    const harga = Number(document.getElementById("harga").value);

    if (
        nama === "" ||
        !Number.isSafeInteger(jumlah) ||
        jumlah < 1 ||
        !Number.isSafeInteger(harga) ||
        harga < 0 ||
        !Number.isSafeInteger(jumlah * harga)
    ) {
        alert("Masukkan data barang dengan benar!");
        return;
    }

    // Barang baru ditambahkan tanpa menghapus barang sebelumnya
    barangBelanja.push({
        nama: nama,
        jumlah: jumlah,
        harga: harga
    });

    tampilkanBelanja();

    // Mengosongkan formulir agar bisa input barang berikutnya
    form.reset();
    document.getElementById("namaBarang").focus();
});

// Menampilkan semua barang dan menghitung total
function tampilkanBelanja() {
    daftar.innerHTML = "";

    let jumlahSemua = 0;
    let biayaSemua = 0;

    if (barangBelanja.length === 0) {
        const pesan = document.createElement("p");
        pesan.className = "kosong";
        pesan.textContent = "Belum ada barang yang ditambahkan.";
        daftar.appendChild(pesan);
    }

    barangBelanja.forEach(function(barang, index) {
        const item = document.createElement("div");
        const info = document.createElement("div");
        const nama = document.createElement("strong");
        const detail = document.createElement("p");
        const subtotal = document.createElement("p");
        const tombol = document.createElement("button");

        const biaya = barang.jumlah * barang.harga;

        nama.textContent = barang.nama;
        detail.textContent =
            barang.jumlah + " x " + rupiah(barang.harga);
        subtotal.textContent = "Subtotal: " + rupiah(biaya);

        tombol.textContent = "Hapus";
        tombol.type = "button";
        tombol.className = "btn-hapus";

        tombol.addEventListener("click", function() {
            barangBelanja.splice(index, 1);
            tampilkanBelanja();
        });

        item.className = "item";
        info.className = "item-info";

        info.append(nama, detail, subtotal);
        item.append(info, tombol);
        daftar.appendChild(item);

        jumlahSemua += barang.jumlah;
        biayaSemua += biaya;
    });

    totalJenis.textContent = barangBelanja.length;
    totalJumlah.textContent = jumlahSemua;
    totalBiaya.textContent = rupiah(biayaSemua);
}

// Menghapus semua barang jika dikonfirmasi
document.getElementById("hapusSemua").addEventListener("click", function() {
    if (barangBelanja.length === 0) {
        alert("Daftar belanja masih kosong.");
        return;
    }

    if (confirm("Yakin ingin menghapus semua barang?")) {
        barangBelanja = [];
        tampilkanBelanja();
    }
});

tampilkanBelanja();