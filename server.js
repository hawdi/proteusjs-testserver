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
const proteusjs = require('./proteusjs.config.js');

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
  proteusjs
  ], (err) => {

    server.route(require('./routes'));

    server.start( (err) => {
      if (err) {
        logger.error('Server error');
        console.log(err);
      } else {
        server.log();
        logger.info('Server running at:', server.info.uri);
      }
    });
  }
);
//server.route(require('./routes.js'));
