import winston, { createLogger, format, transports } from "winston";
const { combine, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const logger = createLogger({
  level: "info",
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: "logs/log.log" })],
  format: combine(format.colorize(), format.timestamp({ format: "DD/MM/YYYY HH:mm:ss" }), myFormat),
  exceptionHandlers: [new transports.File({ filename: "logs/log-exceptions.log" })],
  rejectionHandlers: [new transports.File({ filename: "logs/log-exceptions.log" })],
});
