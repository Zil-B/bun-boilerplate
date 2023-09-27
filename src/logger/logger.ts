import winston, { createLogger, format, transports } from "winston";
const { combine, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const logger = createLogger({
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error", "warn"],
      level: "info",
    }),
    new winston.transports.File({ filename: "logs/log.log", level: "info" }),
    new winston.transports.File({ filename: "logs/errors.log", level: "error" }),
  ],

  format: combine(format.colorize(), format.timestamp({ format: "DD/MM/YYYY HH:mm:ss" }), myFormat),
  exceptionHandlers: [new transports.File({ filename: "logs/log-exceptions.log" })],
  rejectionHandlers: [new transports.File({ filename: "logs/log-exceptions.log" })],
  exitOnError: false,
});
