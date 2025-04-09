const http = require('http');
const routes = require('./routes');

const server = http.createServer((req, res) => {
  const { url, method } = req;

  for (const route of routes) {
    const match = route.path instanceof RegExp ? route.path.test(url) : route.path === url;

    if (route.method === method && match) {
      return route.handler(req, res);
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'fail', message: 'Halaman tidak ditemukan' }));
});

server.listen(9000, () => {
  console.log('Server berjalan pada port 9000');
});
