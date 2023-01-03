<script type="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type Settings from "./Settings";

  export let autoclose = true;
  export let href : string = "";

  $: autocloseAttribute = autoclose === false ? "false" : null;
  
  const settings : Writable<Settings> = getContext("settings");
  $: contentClass = $settings.Item.Class.join(' ');
</script>

<li data-autoclose={autocloseAttribute}>
  {#if href}
    <a class={contentClass} href={href} {...$$restProps}>
      <slot></slot>
    </a>
  {:else}
    <button class={contentClass} {...$$restProps} on:click>
      <slot></slot>
    </button>
  {/if}
</li>

<style>
  .context-menu-default {
    --ctx-menu-hover-bg: #dddddd;
    --ctx-menu-item-padding: 0.375rem 0.5rem;
  }

  .context-menu-item.context-menu-default:hover {
    background: var(--ctx-menu-hover-bg);
  }

  .context-menu-item.context-menu-default {
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    padding: var(--ctx-menu-item-padding);
    width: 100%;
  }

  a.context-menu-item.context-menu-default {
    text-decoration: none;
  }

  button.context-menu-item.context-menu-default {
    border: none;
    background-color: inherit;
    font-size: inherit;
    text-align: inherit;
  }
</style>