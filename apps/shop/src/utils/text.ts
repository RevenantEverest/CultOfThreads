export function truncate(str: string, length=120): string {
    if(str.length <= length) {
        return str;
    }

    let truncatedText = "";

    for(let i = 0; i < length; i++) {
        truncatedText += str[i];
    };

    return truncatedText + "...";
};

export function capitalizeFirstLetter(str: string): string {

    const wordArr = str.split(" ");
    for(let i = 0; i < wordArr.length; i++) {
        const current = wordArr[i];
        
        if(!current) {
            continue;
        }

        wordArr[i] = current.charAt(0).toUpperCase() + current.substring(1);
    }

    return wordArr.join(" ").trim();
};