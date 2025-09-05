export function truncate(str: string, length=120) {
    if(str.length <= length) {
        return str;
    }

    let truncatedText = "";

    for(let i = 0; i < length; i++) {
        truncatedText += str[i];
    };

    return truncatedText + "...";
};