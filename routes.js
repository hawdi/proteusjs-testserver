'use strict';

const database = require('./db/database');
const Wreck = require('wreck');

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
        reply('Knex error!');
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
        reply('Knex error');
      });
    }
  },

  //wreck success

  {
    method: 'GET',
    path: '/wrecksuccess',
    handler: function (request, reply) {
      Wreck.get('http://json.org/example.html', { }, function (err, res, payload) {

        if(err) {

          return reply(err);
        }

        if(res.statusCode !== 200) {

          return reply('Response code is not 200!');
        }

        return reply('Getting response');
      });
    }
  },

  //wreck fail

  {
    method: 'GET',
    path: '/wreckfail',
    handler: function (request, reply) {

      let url = 'http://jsn.og/example.htm';

      Wreck.get(url, { }, function (err, res, payload) {

        if(err) {

          return reply(err);
        }

        if(res.statusCode !== 200) {

          return reply('Response code is not 200!');
        }

        return reply('Getting response');
      });
    }
  },

  //hapi test response

  {
    method: 'GET',
    path: '/hapiget',
    handler: function (request, reply) {

      reply('Response from hapi get');
    }
  },
  {
    method: 'POST',
    path: '/hapipost',
    handler: function (request, reply) {

      reply('Response from hapi post');
    }
  },
  {
    method: 'PUT',
    path: '/hapiput',
    handler: function (request, reply) {

      reply('Response from hapi put');
    }
  },
  {
    method: 'DELETE',
    path: '/hapidelete',
    handler: function (request, reply) {

      reply('Response from hapi delete');
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
