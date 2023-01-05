/** Create a style string from a mapping of keys to values */
export function createStyleString(style) {
    const ret = [];
    for (const key of Object.keys(style)) {
        ret.push(`${key}: ${style[key]};`);
    }
    return ret.join(' ');
}
/**
 * Given a click event on an element, find a parent element that has custom
 * overflow handling so we can attach a scroll listener to it
 *
 * @param clickEvent
 * @returns
 */
export function findParentWithScroll(clickEvent) {
    const target = clickEvent.target;
    let current = target.parentElement;
    while (current !== null && current !== document.body) {
        const computedStyle = window.getComputedStyle(current);
        const canScroll = computedStyle.overflowX === "scroll" || computedStyle.overflowY === "scroll";
        const isOverflown = (current.scrollHeight > current.offsetHeight) ||
            (current.scrollWidth > current.offsetWidth);
        if (canScroll || isOverflown) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}
