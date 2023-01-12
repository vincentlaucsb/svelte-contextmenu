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
  import { createEventDispatcher } from 'svelte';
  import { writable } from "svelte/store";

  import type { ContextMenuMouseEvent } from "./ContextMenuMouseEvent";

  import type Settings from "./Settings";
  import { createStyleString, findParentWithScroll } from "./utilities";
  import { currentMenu, defaultSettings } from "./stores";
  import { computeMenuStyle, getMenuClass } from "./menuUtilities";

  /** Menu Settings */
  export let settings: Settings = null;
  const finalSettings = writable(settings || $defaultSettings);
  const dispatch = createEventDispatcher();

  $: {
    // Update settings on change
    $finalSettings = settings || $defaultSettings;
    setContext("settings", finalSettings);
  }

  /** Menu State */
  let menuPosition: MenuPosition = null;
  $: menuClass = getMenuClass(menuPosition, $finalSettings);
  $: menuStyle = computeMenuStyle(menuPosition);

  let currentParentContainer : HTMLElement | null = null;
  let ref : any;

  const currentMenuUnsub = currentMenu.subscribe(value => {
    // If the menu is currently active, but another menu has popped up
    // then close this menu
    if ((menuPosition) && (value !== ref)) {
      close();
    }
  });

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

    // Automatically close context menu if any child is clicked EXCEPT
    // items with the "autoclose" attribute set to false
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

    dispatch('close', e);
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
    currentMenuUnsub();
  });
</script>

<ul class={menuClass} style={menuStyle} bind:this={ref}>
  <slot></slot>
</ul>

<style>
  .context-menu.context-menu-default {
    background-color: var(--ctx-menu-background, #eeeeee);
    border: var(--ctx-menu-border, 1px solid #aaaaaa);
    border-radius: var(--ctx-menu-border-radius, 0.25rem);
    font-size: var(--ctx-menu-font-size, inherit);
    margin: 0;
    padding: var(--ctx-menu-padding, 0.25rem 0);
    display: none;
    list-style-type: none;
    white-space: nowrap;
  }
  
  .context-menu.context-menu-default.show {
    display: initial;
  }
</style>