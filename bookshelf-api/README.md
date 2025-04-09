# 📚 Bookshelf API - Dicoding Submission

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

Bookshelf API adalah proyek backend sederhana menggunakan Node.js dan JavaScript untuk memenuhi submission kelas **Belajar Membuat Aplikasi Back-End untuk Pemula** dari Dicoding.

---

## 🚀 Fitur Utama

- Tambah, lihat, ubah, dan hapus data buku
- Validasi data saat input/update
- Menyimpan data buku secara in-memory (belum menggunakan database)
- Menggunakan struktur modular untuk handler dan routing
- Fully RESTful API dengan status code dan response body sesuai standar

---

## 🧑‍💻 Teknologi yang Digunakan

- [Node.js](https://nodejs.org/)
- [NanoID](https://github.com/ai/nanoid) - untuk generate ID unik
- [Hapi](https://hapi.dev/) - framework HTTP server

---

## ⚙️ Instalasi & Menjalankan Proyek

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/nrrdwan/bookshelf-api.git
   cd bookshelf-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan server:**
   ```bash
   npm run start
   ```
   Server akan berjalan di `http://localhost:9000`.

4. **(Opsional) Jalankan server mode development dengan nodemon:**
   ```bash
   npm run start-dev
   ```

---

## 📫 API Endpoint

| Method | Endpoint           | Deskripsi                       |
|--------|--------------------|---------------------------------|
| POST   | `/books`           | Menambah buku baru              |
| GET    | `/books`           | Menampilkan semua buku          |
| GET    | `/books/{id}`      | Menampilkan detail buku         |
| PUT    | `/books/{id}`      | Mengubah data buku              |
| DELETE | `/books/{id}`      | Menghapus buku berdasarkan id   |

---

## 📬 Contoh Request Body

```json
{
  "name": "Buku API",
  "year": 2024,
  "author": "John Doe",
  "summary": "Belajar backend dengan Node.js",
  "publisher": "Dicoding Indonesia",
  "pageCount": 200,
  "readPage": 100,
  "reading": true
}
```

---

## 📮 Format Respons

### ✅ Sukses Tambah Buku (201)
```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "bookId": "abc123"
  }
}
```

### ❌ Gagal Validasi (400)
```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

---

## 🧪 Testing API dengan Postman

1. Buka Postman.
2. Pilih metode (GET, POST, PUT, DELETE).
3. Gunakan endpoint `http://localhost:9000/books`.
4. Gunakan **Body → raw → JSON** untuk request POST/PUT.
5. Cek respons dan pastikan sesuai.

📥 Kamu juga bisa import [Postman Collection](https://www.postman.com/) (file `.json`) untuk langsung tes semua endpoint.

---

## 📁 Struktur Proyek

```
src/
├── server.js
├── routes.js
├── handler.js
├── books.js
package.json
```

---

## 📄 Lisensi

Proyek ini dilisensikan dengan [MIT License](LICENSE).

---

## 🙌 Kontribusi

Feel free to fork, pull request, atau kasih bintang ⭐️ kalau proyek ini membantu kamu.

---

## ✍️ Author

Made with ❤️ by **Nur Ridwan** – Dicoding Student