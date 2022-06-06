<script lang="ts">
  import ContextMenu, { Item, Divider, Settings } from "../lib";

  let openInNewTab : boolean;
  let fireMenu : ContextMenu;
  let boldMenu : ContextMenu;

  const boldSettings = new Settings();
  boldSettings.ItemContent.Class.push("fw-bold");

  $: linkTarget = openInNewTab ? "blank" : "";
</script>

<main>
  <header>
    <h1>Vince's Context Menu Demo</h1>
  </header>
  <div id="top">
    <div id="box-1">
      <button class="btn btn-primary" on:click={fireMenu.createHandler()}>
        Left Click on Me
      </button>
    </div>
    <div id="box-2">
      <button class="btn btn-primary fw-bold"
        on:click={boldMenu.createHandler()}
        on:contextmenu={boldMenu.createHandler()}
      >
        Fortune favors the bold
      </button>
    </div>
    <div id="box-3">
      <button class="btn btn-primary" on:contextmenu={fireMenu.createHandler()}>
        Right Click on Me
      </button>
    </div>
  </div>
  <div id="bottom">
    <button class="btn btn-primary"
      on:click={fireMenu.createHandler()}
      on:contextmenu={fireMenu.createHandler()}>
      Left or Right Click on Me
    </button>
  </div>
</main>

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

<ContextMenu bind:this={boldMenu} settings={boldSettings}>
  <Item href="https://youtu.be/PvF9PAxe5Ng?t=7" target={linkTarget}>⛽ Give me fuel</Item>
  <Item href="https://youtu.be/PvF9PAxe5Ng?t=8" target={linkTarget}>🔥 Give me fire</Item>
  <Item href="https://youtu.be/PvF9PAxe5Ng?t=9" target={linkTarget}>🧞‍♀️ Give me that which I desire</Item>
</ContextMenu>

<style>
  :global(body) {
    margin: 0;
  }

  main {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  header {
    text-align: center;
  }

  #top {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    flex-grow: 2;
  }

  #bottom {
    display: flex;
    justify-content: center;
  }

  #box-2 {
    margin-left: auto;
    margin-right: auto;
  }

  #box-3 {
    margin-left: auto;
  }
</style>