'use strict'

//const Wreck = require('wreck');
const Q = require('q');

const logger = require('../lib/logger');
const config = require('../lib/config');

var wreckClient = {};

/***
Inject below 5 fields:
  source: 'CCU',
  destination: 'DEL',
  dateofdeparture: '20160626',
  dateofarrival: '20160627',
  seatingclass: 'E',
**/

wreckClient.flightSearch = function(Wreck, request){
  return Q.Promise(function(resolve, reject){
    let options = {
      app_id: request.appid,
      app_key: request.apikey,
      format: 'json',
      source: request.source,
      destination: request.destination,
      dateofdeparture: request.dateofdeparture,
      dateofarrival: request.dateofarrival,
      seatingclass: request.seatingclass,
      adults: 1,
      children: 0,
      infants: 0
    }

    var wreckOptions = {
      timeout:   30000,    // 1 second, default: unlimited
    };

    let url = config('GOIBIBO_API_URL') + `/api/search/?app_id=123`+
              `&app_key=123`+
              `&format=json`+
              `&source=DEL`+
              `&destination=CCU`+
              `&dateofdeparture=01122016`+
              `&dateofarrival=01122016`+
              `&seatingclass=E`+
              `&adults=1`+
              `&children=0`+
              `&infants=0`;

    Wreck.get(url, wreckOptions, function (err, res, payload) {
      if(err){
        return reject(err);
      }
      if(res.statusCode !== 200){
        return reject(new Error('Ibibo Service Call Failed'));
      }
      try{
        payload = JSON.parse(payload.toString());
      }catch(err){
        return reject(new Error('Ibibo Data Parse Error'));
      }
      resolve(data);
    });
  });
}

module.exports = wreckClient;
