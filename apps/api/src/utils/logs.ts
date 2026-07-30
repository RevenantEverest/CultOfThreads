import chalk, { ChalkInstance } from 'chalk';
import dayjs from 'dayjs';

import * as colors from './colors';

type LogLevel = "SUCCESS" | "WARNING" | "ERROR";

interface LogOptions {
    color?: number,
    type?: "HTTP" | "DB",
    level?: LogLevel,
    message?: string
};

interface ErrorLogOptions extends LogOptions {
    err: Error
};

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

export function getBaseLogOptions({ color, level="SUCCESS" }: LogOptions): { logColor: ChalkInstance, timestamp: string } {
    const logColor = chalk.hex(color ? color.toString(16) : getLogLevelColor(level));

    const now = dayjs();
    const timestamp = chalk.hex(`#8c8c8c`)(`[${now.format("H:MM:ss A")}]`);

    return {
        logColor, timestamp
    };
};

export async function log({ color, level="SUCCESS", type, message="" }: LogOptions) {
    const { logColor, timestamp } = getBaseLogOptions({ color, level });
    return console.log(timestamp + logColor(`[LOG]${type ? ` [${type}]` : ""}`) + " " + message);
};

export async function error({ color, level="ERROR", type, message="", err }: ErrorLogOptions) {
    const { logColor, timestamp } = getBaseLogOptions({ color, level });
    return console.error(timestamp + logColor(`[ERROR]${type ? ` [${type}]` : ""}`) + " " + message, err);
};