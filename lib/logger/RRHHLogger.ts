import { LoggerInterface } from "./LoggerInterface";
import winston from "winston";
class RRHHLogger implements LoggerInterface{
    
    error(error: Error): void {
        const loggerLabel:string = process.env.LOGGER_LABEL as string ?? "logger";
        const logger = winston.createLogger(
            {
                format:winston.format.combine(
                    winston.format.label({label:loggerLabel}),
                    winston.format.timestamp(),
                    winston.format.json()
                ),
                transports:[
                    new winston.transports.File(
                        {
                            level:'error',
                            filename: 'storage/log/error.log'
                        }
                    )
                ]
            }
        );
        logger.error(error)
    }
    info(message:string): void {
        const loggerLabel:string = process.env.LOGGER_LABEL as string ?? "logger";
        const logger = winston.createLogger(
            {
                format:winston.format.combine(
                    winston.format.label({label:loggerLabel}),
                    winston.format.timestamp(),
                    winston.format.json()
                ),
                transports:[
                    new winston.transports.File(
                        {
                            level:'info',
                            filename:'storage/log/info.log'
                        }
                    ),
                ]
            }
        );
        logger.info(message);
    }
    warning(error: Error): void {
        const loggerLabel:string = process.env.LOGGER_LABEL as string ?? "logger";
        const logger = winston.createLogger(
            {
                format:winston.format.combine(
                    winston.format.label({label:loggerLabel}),
                    winston.format.timestamp(),
                    winston.format.json()
                ),
                transports:[
                    new winston.transports.File(
                        {
                            level:'warning',
                            filename:'storage/log/warning.log'
                        }
                    ),
                ]
            }
        );
        logger.warn(error)
    }
    debug(message: string): void {
        const loggerLabel:string = process.env.LOGGER_LABEL as string ?? "logger";
        const logger = winston.createLogger(
            {
                format:winston.format.combine(
                    winston.format.label({label:loggerLabel}),
                    winston.format.timestamp(),
                    winston.format.json()
                ),
                transports:[
                    new winston.transports.File(
                        {
                            level:'debug',
                            filename:'storage/log/debug.log'
                        }
                    ),
                ]
            }
        );
        logger.debug(message)
    }

}


const rrhhLoger = new RRHHLogger();

Object.freeze(rrhhLoger);

export default rrhhLoger;