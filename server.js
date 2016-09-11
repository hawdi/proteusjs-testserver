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
      'knex' : database
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
