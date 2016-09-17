'use strict';

const proteus = require('proteusjs');
const database = require('./db/database.js');

module.exports = {
  'register': proteus,
  'options' : {
    'reporter' : {
      mongodb: {
        module : require('mongodb'),
        url: 'mongodb://localhost:27017/meanlog'
      },
      'console' : {
        server : {
          request : true
        },
        wreck : {
          response : false
        },
        knex : {
          query : true,
          error : true
        }
      }
    },
    'knex' : database,
    'wreck' : require('wreck')
  }
}
