export interface LoggerInterface{
    error(error:Error):void;
    info(message:string):void;
    warning(error:Error):void;
    debug(message:string):void;
}