export function parseJsonValue(value: unknown) {
    if(typeof value === "string") {
        try {
            return JSON.parse(value);   
        }
        catch(e) {
            return value;
        }
    }
    return value;
};