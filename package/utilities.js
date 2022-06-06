/** Create a style string from a mapping of keys to values */
export function createStyleString(style) {
    const ret = [];
    for (const key of Object.keys(style)) {
        ret.push(`${key}: ${style[key]};`);
    }
    return ret.join(' ');
}
