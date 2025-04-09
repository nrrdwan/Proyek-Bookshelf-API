const {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
  } = require('./handler');
  
  module.exports = [
    {
      method: 'POST',
      path: '/books',
      handler: addBookHandler,
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAllBooksHandler,
    },
    {
      method: 'GET',
      path: /^\/books\/[\w-]+$/,
      handler: getBookByIdHandler,
    },
    {
      method: 'PUT',
      path: /^\/books\/[\w-]+$/,
      handler: editBookByIdHandler,
    },
    {
      method: 'DELETE',
      path: /^\/books\/[\w-]+$/,
      handler: deleteBookByIdHandler,
    },
  ];
  