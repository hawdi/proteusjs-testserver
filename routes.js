'use strict';

const database = require('./db/database.js');

module.exports =  [

  // knex success

  {
    method: 'GET',
    path: '/knexsuccess',
    handler: function (request, reply) {
      return database.select()
      .table('log')
      .then(function(rows) {
        reply('Knex test passed');
      }).catch((err) => {
        reply('Knex Error');
      });
    }
  },

  //knex error

  {
    method: 'GET',
    path: '/knexfail',
    handler: function (request, reply) {
      return database.select()
      .table('logg')
      .then(function(rows) {
        reply('Knex test passed');
      }).catch((err) => {
        reply('Knex Error');
      });
    }
  },
  {
    method: 'GET',
    path: '/wrecktest',
    handler: function (request, reply) {
      const wrecktest = require('./handlers/wrecktest');
      return wrecktest.flightSearch(request)
      .then(function(response){
        reply('wreck test passed');
      }).catch((err) => {
        reply('wreck Error');
      });
    }
  },
  {
    method: 'GET',
    path: '/wrecksuccess',
    handler: function (request, reply) {
      const wrecktest = require('./handlers/wrecktest');
      return wrecktest.testSuccess(request)
      .then(function(response){
        reply('wreck test passed');
      }).catch((err) => {
        reply(err.message);
      });
    }
  },
  //db test
  {
    method: 'GET',
    path: '/test',
    handler: function (request, reply) {
      request.log();
      return database.select()
      .table('logg')
      .then(function(rows){
        //console.log(rows);
        reply('test passed');
      }).catch((err) => {
        //console.log(err);
        reply('Knex Error');
      });
    }
  }
];
