import winston, { Logform } from 'winston';

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf(
    ({ timestamp, level, message }: Logform.TransformableInfo) =>
      `${timestamp}: ${level} ${message}`
  )
);

const consoleTransport = new winston.transports.Console({
  format: format
});

export default consoleTransport;
