var winston = require('winston');
require('winston-daily-rotate-file');

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

var transport = new (winston.transports.DailyRotateFile)({
  level:'info',
  filename: './src/logs/graphqlQL%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  frequency: '24h'
});

var logger = winston.createLogger({
  transports: transport,
  format: logFormat
});


module.exports = logger