import { nanoid } from 'nanoid';
import books from './books';

const addBookHandler = (request, h) => {
  const {
    name, author, summary, publisher,
  } = request.payload;

  let {
    year, pageCount, readPage, reading,
  } = request.payload;

  year = Number(year);
  pageCount = Number(pageCount);
  readPage = Number(readPage);
  reading = Boolean(reading);

  const id = nanoid(15);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (name === null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt,
  };
  books.push(newBook);

  const isSuccess = books.filter((note) => note.id === id).length > 0;

  if (!isSuccess) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

export { addBookHandler };
