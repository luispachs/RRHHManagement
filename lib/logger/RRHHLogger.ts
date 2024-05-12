import { LoggerInterface } from "./LoggerInterface";
import winston from "winston";
class RRHHLogger implements LoggerInterface{
    #logger:any;
    constructor(){
        const loggerLabel:string = process.env.LOGGER_LABEL as string ?? "logger";
        this.#logger = winston.createLogger(
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
                    ),
                    new winston.transports.File(
                        {
                            level:'info',
                            filename:'storage/log/info.log'
                        }
                    ),
                    new winston.transports.File(
                        {
                            level:'warning',
                            filename:'storage/log/warning.log'
                        }
                    ),
                    new winston.transports.File(
                        {
                            level:'debug',
                            filename:'storage/log/debug.log'
                        }
                    ),
                ]
            }
        );
    }

    error(error: Error): void {
        this.#logger.error(error);
    }
    info(message:string): void {
        this.#logger.info(message);
    }
    warning(error: Error): void {
        this.#logger.warm(error)
    }
    debug(message: string): void {
        this.#logger.debug(message)
    }

}


const rrhhLoger = new RRHHLogger();

Object.freeze(rrhhLoger);

export default rrhhLoger;