<script>import { onDestroy, onMount, setContext } from "svelte";
import Settings from "./Settings";
import { createStyleString } from "./utilities";
import { currentMenu } from "./stores";
/** Settings for this menu */
export let settings = new Settings();
setContext("settings", settings);
let menuPosition = null;
$: menuClass = menuPosition ? settings.Menu.Class.concat(settings.Menu.VisibleClass).join(' ') :
    settings.Menu.Class.join(' ');
$: menuStyle = computeMenuStyle(menuPosition);
let portal;
let ref;
currentMenu.subscribe(value => {
    // If the menu is currently active, but another menu has popped up
    // then close this menu
    if ((menuPosition) && (value !== ref)) {
        close();
    }
});
function computeMenuStyle(position) {
    if (!position)
        return "";
    const [clientX, clientY] = position;
    return createStyleString({
        "position": "absolute",
        "left": `${clientX}px`,
        "top": `${clientY}px`,
        "z-index": 9999
    });
}
/**
 * Given a click event path, get the immediate child of the ContextMenu
 * that was clicked
 * @param {EventTarget[]} path
 */
function getImmediateChild(path) {
    if (path === null || path === undefined)
        return null;
    const ctxMenuIdx = path.indexOf(ref);
    return path[ctxMenuIdx - 1];
}
function close(e) {
    if (e?.contextMenuHandled)
        return;
    const autoclose = getImmediateChild(e?.composedPath())?.dataset['autoclose'];
    if (autoclose === "false")
        return;
    menuPosition = null;
    document.body.removeEventListener("click", close);
    document.body.removeEventListener("contextmenu", close);
}
/**
 * Create an event handler, for mouse events, that
 * activates the context menu
 */
export function createHandler() {
    return (event) => show(event);
}
export function show(clickEvent) {
    const { clientX, clientY } = clickEvent;
    clickEvent.contextMenuHandled = true;
    menuPosition = [clientX, clientY];
    /*
     * This is a hack so we can get dimensions of the menu.
     * This will not cause the menu to render.
     * See: https://stackoverflow.com/questions/35519137/how-do-you-find-the-dimensions-of-a-display-none-element
     */
    ref.style = "display: block";
    let refDims = ref.getBoundingClientRect();
    if (clientX + refDims.width > window.innerWidth) {
        // Will overflow to the right
        menuPosition = [clientX - refDims.width, clientY];
    }
    else if (clientY + refDims.height > window.innerHeight) {
        menuPosition = [clientX, clientY - refDims.height];
    }
    clickEvent.preventDefault();
    currentMenu.set(ref);
    document.body.addEventListener("click", close);
    document.body.addEventListener("contextmenu", close);
}
onMount(() => {
    portal = document.createElement('div');
    portal.className = "context-menu-portal";
    document.body.append(portal);
    console.log(document, portal);
    portal.appendChild(ref);
});
onDestroy(() => {
    if (ref !== null) {
        portal.removeChild(ref);
    }
});
</script>

<ul class={menuClass} style={menuStyle} bind:this={ref}>
  <slot></slot>
</ul>