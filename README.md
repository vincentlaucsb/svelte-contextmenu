# Vince's Svelte Context Menu

A simple, no-frills context menu that works out of the box with Bootstrap but allows total customization. This context menu can be set up to work with `on:click` and `on:contextmenu`.

By default, the context menu will appear to the bottom and right of where a click occurred. However, it automatically repositions itself if it overflows.

```
<script>
  let myMenu;
</script>

<button class="btn btn-primary" on:click={myMenu.createHandler()}>
  Left Click Trigger
</button>
<button class="btn btn-primary" on:contextmenu={(e) => {
    console.log("Activating context menu);
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