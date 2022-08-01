<script type="ts">
  type MenuPosition = [number, number] | null;

  /**
   * Once a menu has been made visible, these events will trigger
   * the close() function
   */
  const CLOSE_LISTENERS = {
      "click": document.body,
      "contextmenu": document.body,
      "scroll": document
  };

  import { onDestroy, onMount, setContext } from "svelte";

  import type { ContextMenuMouseEvent } from "./ContextMenuMouseEvent";
  import Settings from "./Settings";
  import { createStyleString, findParentWithScroll } from "./utilities";
  import { currentMenu } from "./stores";

  /** Settings for this menu */
  export let settings = new Settings();
  setContext("settings", settings);

  let menuPosition: MenuPosition = null;
  $: menuClass = menuPosition ? settings.Menu.Class.concat(settings.Menu.VisibleClass).join(' ') :
    settings.Menu.Class.join(' ');
  $: menuStyle = computeMenuStyle(menuPosition);

  let currentParentContainer : HTMLElement | null = null;
  let ref : any;

  const unsub = currentMenu.subscribe(value => {
    // If the menu is currently active, but another menu has popped up
    // then close this menu
    if ((menuPosition) && (value !== ref)) {
      close();
    }
  });

  function computeMenuStyle(position: MenuPosition) {
    if (!position) return "";

    const [posX, posY] = position;

    return createStyleString({
      "position": "absolute",
      "left": `${posX}px`,
      "top": `${posY}px`,
      "z-index": 9999
    });
  }

  /**
   * Given a click event path, get the immediate child of the ContextMenu
   * that was clicked
   * @param {EventTarget[]} path
   */
  function getImmediateChild(path?: EventTarget[]) {
    if (path === null || path === undefined) return null;

    const ctxMenuIdx = path.indexOf(ref);
    return path[ctxMenuIdx - 1] as HTMLElement;
  }

  function close(e?: ContextMenuMouseEvent) {
    if (e?.contextMenuHandled) return;

    const autoclose = getImmediateChild(e?.composedPath())?.dataset['autoclose'];
    if (autoclose === "false")
      return;

    menuPosition = null;

    Object.keys(CLOSE_LISTENERS).forEach((eventName) => {
      const target = CLOSE_LISTENERS[eventName];
      target.removeEventListener(eventName, close);
    });

    if (currentParentContainer !== null) {
      currentParentContainer.removeEventListener("scroll", close);
      currentParentContainer = null;
    }
  }

  /**
   * Create an event handler, for mouse events, that
   * activates the context menu
   */
  export function createHandler() {
    return (event: ContextMenuMouseEvent) => show(event);
  }

  export function show(clickEvent: ContextMenuMouseEvent) {
    const { pageX, pageY } = clickEvent;
    clickEvent.contextMenuHandled = true;

    menuPosition = [pageX, pageY];

    /*
     * This is a hack so we can get dimensions of the menu.
     * This will not cause the menu to render.
     * See: https://stackoverflow.com/questions/35519137/how-do-you-find-the-dimensions-of-a-display-none-element
     */
    ref.style = "display: block";

    let refDims = ref.getBoundingClientRect();
    if (pageX + refDims.width > window.innerWidth) {
      // Will overflow to the right
      menuPosition = [pageX - refDims.width, pageY];
    }
    else if (pageY + refDims.height > window.innerHeight) {
      menuPosition = [pageX, pageY - refDims.height]
    }

    clickEvent.preventDefault();
    currentMenu.set(ref);

    Object.keys(CLOSE_LISTENERS).forEach((eventName) => {
      const target = CLOSE_LISTENERS[eventName];
      target.addEventListener(eventName, close);
    });

    // If a parent container w/ custom scrolling exists, then 
    // we attach a scroll listener there as well
    currentParentContainer = findParentWithScroll(clickEvent);
    if (currentParentContainer !== null) {
      currentParentContainer.addEventListener("scroll", close);
    }
  }

  onMount(() => {
    let portal = document.getElementById("context-menu-portal");

    if (portal === null) {
      portal = document.createElement('div');
      portal.id = "context-menu-portal";
      portal.setAttribute("style", createStyleString({
        position: "absolute",
        top: 0,
        left: 0
      }));
      document.body.append(portal);
    }

    portal.appendChild(ref);
  });

  onDestroy(() => {
    unsub();
  });
</script>

<ul class={menuClass} style={menuStyle} bind:this={ref}>
  <slot></slot>
</ul>