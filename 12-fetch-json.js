const qioHttp = require('q-io/http');

qioHttp.read('http://localhost:1337')
  .then(value => console.log(JSON.parse(value)))
  .catch(({ message }) => console.log(message));
