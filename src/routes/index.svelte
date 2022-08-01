<script lang="ts">
  import { onMount } from "svelte";

  import ContextMenu, { Item, Divider, Settings } from "../lib";

  let bootstrapEnabled = true;
  let openInNewTab : boolean;
  let fireMenu : ContextMenu;
  let boldMenu : ContextMenu;
  let menus = {};

  const boldSettings = new Settings();
  boldSettings.ItemContent.Class.push("fw-bold");

  $: linkTarget = openInNewTab ? "blank" : "";

  $: {
    if (bootstrapEnabled) {
      document.getElementById("bootstrap")?.setAttribute(
        "href",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
      );
    }
    else {
      document.getElementById("bootstrap")?.setAttribute("href", "");
    }
  }
</script>

<div id="side">
  <h2>Sidebar</h2>
  <button class="btn btn-primary" on:click={() => bootstrapEnabled = !bootstrapEnabled}>
    {#if bootstrapEnabled}
      Disable
    {:else}
      Enable
    {/if}
    Bootstrap
  </button>
  <ul>
    {#each [...Array(100).keys()] as menuItem}
      <ContextMenu bind:this={menus[menuItem]}>
        <Item>Item {menuItem}</Item>
      </ContextMenu>
      <li on:contextmenu={menus[menuItem].show}>Item {menuItem}</li>
    {/each}
  </ul>
</div>
<main>
  <div id="page-1">
    <header>
      <h1>Vince's Context Menu Demo</h1>
    </header>
    <div id="top">
      <div id="box-1">
        <button class="btn btn-primary" on:click={fireMenu.show}>
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
  </div>
  <div id="page-2">
    &#127928;
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
  <Item on:click={() => {
    alert("YEEEAAAAH!");
  }}>
    🤘 OOOH!
  </Item>
</ContextMenu>

<style>
  :global(body) {
    margin: 0;
    display: grid;
    grid-template-columns: 250px 1fr;
  }

  #page-1 {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 1rem;
  }

  #page-2 {
    display: flex;
    flex-direction: column;
    font-size: 5rem;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  #side {
    height: 100vh;
    overflow-y: scroll;

    position: sticky;
    top: 0;
    padding: 0.5rem;
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