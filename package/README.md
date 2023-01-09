# Vince's Svelte Context Menu

A simple, no-frills context menu that works out of the box with Bootstrap but allows total customization. This context menu can be set up to work with `on:click` and `on:contextmenu`.

By default, the context menu will appear to the bottom and right of where a click occurred. However, it automatically repositions itself if it overflows.

[**Live Demo**](https://vincentlaucsb.github.io/context-menu/public/)

### Install
https://www.npmjs.com/package/svelte-contextmenu

`npm install --save-dev svelte-contextmenu`

## Basic Usage
```svelte
<script>
  import ContextMenu, { Item, Divider, Settings } from "svelte-contextmenu";
  let myMenu;
</script>

<button class="btn btn-primary" on:click={myMenu.createHandler()}>
  Left Click Trigger
</button>
<button class="btn btn-primary" on:contextmenu={(e) => {
    console.log("Activating context menu");
    myMenu.show(e);
  }}>
  Right click Trigger
</button>

<ContextMenu bind:this={myMenu}>
  <Item href="https://" target={linkTarget}>This will be rendered with an anchor tag</Item>
  <Item>This will be rendered as a button</Item>
  <Divider />
  <Item>
</ContextMenu>
```

## Using Custom Dropdown Items and Disabling Auto-Close Behavior
While `svelte-context-menu` provides `Item` and `Divider` components which should satisfy most use-cases, you are not limited to those.
For example, you can add forms and checkboxes to dropdown menus.

Furthermore, while clicking on the menu will automatically close it, this behavior can be disabled for indivdual items. The `Item` component has an `autoclose` prop which may be set to `false`, while custom children may assign the `data-autoclose` attribute.

```svelte
<script lang="ts">
  import ContextMenu, { Item, Divider, Settings } from "svelte-context-menu";

  let openInNewTab = false;
  let fireMenu : ContextMenu;
  
  $: linkTarget = openInNewTab ? "blank" : "";
</script>

<ContextMenu bind:this={fireMenu}>
  <Item href="https://youtu.be/PvF9PAxe5Ng?t=7" target={linkTarget}>⛽ Give me fuel</Item>
  <Item href="https://youtu.be/PvF9PAxe5Ng?t=8" target={linkTarget}>🔥 Give me fire</Item>
  <Item href="https://youtu.be/PvF9PAxe5Ng?t=9" target={linkTarget}>🧞‍♀️ Give me that which I desire</Item>
  <Divider />
  <form class="px-3 py-1" data-autoclose="false">
    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="dropdownCheck" bind:checked={openInNewTab}>
      <label class="form-check-label" for="dropdownCheck">
        Open links in a new tab
      </label>
    </div>
  </form>
</ContextMenu>
```
## Styling
For convenience, the context menus come with styling. However, you may override the default styling on a global 
or an individual basis.

### CSS Variables
In most cases, the default styling can be changed to meet one's needs by defining 
CSS variables.

```css
:root {
  --ctx-menu-background: #eeeeee;
  --ctx-menu-border: 1px solid #aaaaaa;
  --ctx-menu-border-radius: 0.5rem;
  --ctx-menu-hover-bg: #bbbbbb;
  --ctx-menu-font-size: 0.9rem;
  --ctx-menu-padding: 0.375rem 0.5rem;
}
```

More variables can be found by inspecting the rendered context menu.

### Individual Styling
`svelte-contextmenu` comes with default CSS classes, and they may be appended to or replaced entirely via the `Settings` class.

```svelte
<script>
  import ContextMenu, { Item, Divider, Settings } from "svelte-contextmenu";

  // Use default CSS class names *without* styling
  const boldSettings = new Settings();

  /* Alternative 1: Build off of default styling 
   * const boldSettings = Settings.DefaultCSS();
   */

  /* Alternative 2: Build off of Bootstrap styling 
   * const boldSettings = Settings.BootstrapCss();
   */

  boldSettings.Item.Class.push("fw-bold");
</script>

<ContextMenu bind:this={boldMenu} settings={boldSettings}>
```

### Global Styling
In the above example, settings were created and applied to a single instance. However,
settings can also be set globally using the `defaultSettings` store.

```svelte
<script>
  import ContextMenu, { defaultSettings, Settings } from "svelte-contextmenu";

  const boldSettings = new Settings();
  boldSettings.ItemContent.Class.push("fw-bold");

  // Set global styles to `boldSettings`
  defaultSettings.set(boldSettings);
</script>
```

#### Bootstrap Styling: A shorthand
`svelte-contextmenu` contains a simple `useBootstrap()` function that may be called at
the top of your app to make the menu use Bootstrap 5 classes everywhere.

```svelte
<script>
  import ContextMenu, { useBootstrap } from "svelte-contextmenu";

  // Use Bootstrap 5 classes globally
  useBootstrap();
</script>
```