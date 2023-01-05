<script type="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type Settings from "./Settings";

  export let autoclose = true;
  export let href : string = "";

  $: autocloseAttribute = autoclose === false ? "false" : null;
  
  const settings : Writable<Settings> = getContext("settings");

  $: contentClass = [$$restProps.class, ...$settings.Item.Class].filter(_ => _).join(' ');
</script>

<li data-autoclose={autocloseAttribute}>
  {#if href}
    <a href={href} {...$$restProps} class={contentClass} >
      <slot></slot>
    </a>
  {:else}
    <button {...$$restProps} class={contentClass} on:click>
      <slot></slot>
    </button>
  {/if}
</li>

<style>
  .context-menu-item.context-menu-default:hover {
    background: var(--ctx-menu-hover-bg, #dddddd);
  }

  .context-menu-item.context-menu-default {
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    padding: var(--ctx-menu-item-padding, 0.375rem 0.5rem);
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