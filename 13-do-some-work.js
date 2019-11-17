const qioHttp = require('q-io/http');

const sessionCache = 'http://localhost:7000';
const database = 'http://localhost:7001';

qioHttp
  .read(sessionCache)
  .then(id => qioHttp.read(`${database}/${id}`).then(user => console.log(JSON.parse(user))))
  .catch(({ message }) => console.log(message));
