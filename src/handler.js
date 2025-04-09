const { nanoid } = require('nanoid');
const books = require('./books');

// Helper untuk parsing body dari request
const getRequestBody = async (req) => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(JSON.parse(body)));
  });
};

// 1. Menambahkan buku
const addBookHandler = async (req, res) => {
  const body = await getRequestBody(req);
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = body;

  if (!name) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }));
    return;
  }

  if (readPage > pageCount) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }));
    return;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };

  books.push(newBook);

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  }));
};

// 2. Menampilkan semua buku (id, name, publisher)
const getAllBooksHandler = (req, res) => {
  const bookList = books.map(({ id, name, publisher }) => ({ id, name, publisher }));

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'success',
    data: {
      books: bookList,
    },
  }));
};

// 3. Menampilkan detail buku
const getBookByIdHandler = (req, res) => {
  const id = req.url.split('/')[2];
  const book = books.find(b => b.id === id);

  if (!book) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'success',
    data: {
      book,
    },
  }));
};

// 4. Mengubah data buku
const editBookByIdHandler = async (req, res) => {
  const id = req.url.split('/')[2];
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }));
    return;
  }

  const body = await getRequestBody(req);
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = body;

  if (!name) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }));
    return;
  }

  if (readPage > pageCount) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }));
    return;
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  books[bookIndex] = {
    ...books[bookIndex],
    name, year, author, summary, publisher, pageCount, readPage, reading,
    finished,
    updatedAt,
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }));
};

// 5. Menghapus buku
const deleteBookByIdHandler = (req, res) => {
  const id = req.url.split('/')[2];
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }));
    return;
  }

  books.splice(bookIndex, 1);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }));
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
