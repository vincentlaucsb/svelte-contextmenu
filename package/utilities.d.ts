import type { ContextMenuMouseEvent } from "./ContextMenuMouseEvent";
/** Create a style string from a mapping of keys to values */
export declare function createStyleString(style: {
    [key: string]: string | number;
}): string;
/**
 * Given a click event on an element, find a parent element that has custom
 * overflow handling so we can attach a scroll listener to it
 *
 * @param clickEvent
 * @returns
 */
export declare function findParentWithScroll(clickEvent: ContextMenuMouseEvent): HTMLElement | null;
