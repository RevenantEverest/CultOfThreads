import chalk, { ChalkInstance } from 'chalk';
import dayjs from 'dayjs';
import fs from 'fs/promises';
import { join } from 'path';

import * as colors from './colors';

type LogLevel = "SUCCESS" | "WARNING" | "ERROR";
type LogType = "HTTP" | "DB" | "Utility";

interface LogOptions {
    color?: number,
    type?: LogType,
    level?: LogLevel,
    message?: string,
    toFile?: boolean
};

interface ErrorLogOptions extends LogOptions {
    err: Error
};

const LOG_FILE_PATH = join(__dirname, "../../", "logs.txt");

function getLogLevelColor(logLevel: LogLevel): string {
    switch(logLevel) {
        case "SUCCESS":
            return `#${colors.success.toString(16)}`;
        case "WARNING":
            return `#${colors.warning.toString(16)}`;
        case "ERROR":
            return `#${colors.error.toString(16)}`;
    };
};

async function writeLogToFile(message: string) {
    try {
        await fs.appendFile(LOG_FILE_PATH, message, { encoding: "utf-8" });
    }
    catch(err) {
        error({ 
            err: err as Error, 
            type: "Utility", 
            message: `Failed to write to log file with message: ${message}`
        });
    }
};

export function getBaseLogOptions({ color, level="SUCCESS" }: LogOptions): { logColor: ChalkInstance, timestamp: string } {
    const logColor = chalk.hex(color ? color.toString(16) : getLogLevelColor(level));

    const now = dayjs();
    const timestamp = chalk.hex(`#8c8c8c`)(`[${now.format("H:MM:ss A")}]`);

    return {
        logColor, timestamp
    };
};

export async function log({ color, level="SUCCESS", type, message="", toFile }: LogOptions) {
    const { logColor, timestamp } = getBaseLogOptions({ color, level });
    const logType = `[LOG]${type ? ` [${type}]` : ""}`;
    
    if(toFile) {
        writeLogToFile(timestamp + logType + " " + message);
    }

    return console.log(timestamp + logColor(logType) + " " + message);
};

export async function error({ color, level="ERROR", type, message="", err }: ErrorLogOptions) {
    const { logColor, timestamp } = getBaseLogOptions({ color, level });
    return console.error(timestamp + logColor(`[ERROR]${type ? ` [${type}]` : ""}`) + " " + message, err);
};