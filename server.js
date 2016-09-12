'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const config = require('./lib/config');
const logger = require('./lib/logger');
const server = new Hapi.Server();

const database = require('./db/database.js');
const proteus = require('proteusjs');

const Wreck = require('wreck');

server.connection({
  host: config('SERVER_HOST'),
  port: config('SERVER_PORT')
});

const options = {
  info: {
    'title': 'ERP Service',
    'version': Pack.version,
  }
};

server.register([
  Inert,
  Vision,
  {
    'register': HapiSwagger,
    'options': options
  },
  /*{
    'register': require('meanlog-hapi')
  },*/
  {
    'register': proteus,
    'options' : {
      mongodb: {
        url: 'mongodb://localhost:27017/meanlog'
      },
      'knex' : database,
      'wreck' : Wreck
    },
  }], (err) => {
    server.route({
      method: 'GET',
      path: '/test',
      handler: function (request, reply) {

        //request.log();
        return database.select()
        .table('log')
        //.where('AwsInstanceNo', instanceNo)
        .then(function(rows){
          console.log(rows);
          //Object.freeze(settings.source);
          reply('test passed');
        }).catch((err) => {
          reply('Knex Error');
        });
      }
    });

    server.route({
      method: 'GET',
      path: '/wrecktest',
      handler: function (request, reply) {
        const wrecktest = require('./handlers/wrecktest');
        return wrecktest.flightSearch(Wreck, request)
        .then(function(response){
          reply('wreck test passed');
        }).catch((err) => {
          reply('wreck Error');
        });
      }
    });

    server.start( (err) => {
      if (err) {
        logger.error('Server running at:', server.info.uri);
      } else {
        server.log();
        logger.info('Server running at:', server.info.uri);
        console.log('Server running at:', server.info.uri);
      }
    });
  }
);
//server.route(require('./routes.js'));
