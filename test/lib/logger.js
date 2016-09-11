'use strict';

const Lab =  require('lab');
//const Code = require('code');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const before = lab.before;

describe('Lib::Logger',() => {
  let logger;
  before((done) => {
    logger = require('../../lib/logger');
    done();
  });
  it('Check logger method',(done) => {
    logger.info('here');
    done();
  });
});
