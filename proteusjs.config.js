'use strict';

const proteus = require('proteusjs');
const database = require('./db/database.js');

module.exports = {
  register: proteus,
  options: {
    reporters : {},

    //knex config

    'knex': {
      lib: database,
      enable: true,
      log: {
        query: true,
        error: true,
        end: true,
        queryerror: true
      }
    },

    //wreck config

    'wreck': {
      lib: require('wreck'),
      enable: true,
      log: {
        request: true,
        response : false
      }
    }
  }
}
