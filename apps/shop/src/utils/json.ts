interface SlateTextNode {
    text: string,
    [key: string]: unknown
};

interface SlateElement {
    type: string,
    children: SlateTextNode[],
    [key: string]: unknown
};

export function richTextToString(slateJson?: string) {
    if(!slateJson || slateJson.length === 0) {
        return "";
    }

    const jsonStr: SlateElement[] = JSON.parse(slateJson);
    const textArr = jsonStr.flatMap(node => (
        node.children.map(child => child.text)
    ));

    return textArr.join("");
};