const config = require('../lib/config.js');

const knex = require('knex')({
  client: config('DB_DILECT'),
  connection: {
    host     : config('DB_HOST'),
    user     : config('DB_USER'),
    password : config('DB_PASSWORD'),
    database : config('DB_DATABASE')
  },
  pool: {
    min: 0,
    max: 7
  },
  debug: false
});

module.exports = knex;
