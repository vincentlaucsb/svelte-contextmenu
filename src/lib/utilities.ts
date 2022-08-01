import type { ContextMenuMouseEvent } from "./ContextMenuMouseEvent";

/** Create a style string from a mapping of keys to values */
export function createStyleString(style: {[key: string]: string | number}) {
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
export function findParentWithScroll(clickEvent: ContextMenuMouseEvent) {
  const target = clickEvent.target as HTMLElement;
  let current = target.parentElement;
  while (current !== null && current !== document.body) {
    const computedStyle = window.getComputedStyle(current);
    if (computedStyle.overflowX === "scroll" || computedStyle.overflowY === "scroll") {
      return current;
    }

    current = current.parentElement;
  }

  return null;
}