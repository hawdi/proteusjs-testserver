'use strict';

const Proteus = require('proteusjs');
const proteusConsole = require('proteusjs-console');
const database = require('./db/database.js');

const Console = new proteusConsole();

module.exports = {
  register: Proteus,
  options: {
    reporters : {
      console : Console
    },

    //hapi setup

    hapi: {
      log: {
        log: true,
        request: true,
        response: true,
        ops: true,
        error:true
      }
    },

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
        response : true
      }
    }
  }
}
