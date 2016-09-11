const winston = require('winston');
const config = require('./config');

winston.emitErrs = true;

const transports = [];

if(config('NODE_ENV') != 'test'){
  transports.push(new winston.transports.File({
    level: config('FILE_LOG_LEVEL'),
    filename: config('LOG_LOCATION'),
    handleExceptions: true,
    json: true,
    maxsize: config('FILE_LOG_MAXSIZE'),
    colorize: true
  }));

  transports.push(new winston.transports.Console({
    level: config('CONSOLE_LOG_LEVEL'),
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: function(){
      return new Date().toISOString();
    }
  }));
}

const logger = new winston.Logger({
  transports: transports,
  exitOnError: false
});

logger.stream = {
  write: function(message){
    logger.info(message);
  }
};

module.exports = logger;
