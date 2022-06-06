<script type="ts">
  import { getContext } from "svelte";
  import type Settings from "./Settings";

  export let autoclose = true;
  export let href : string;

  $: autocloseAttribute = autoclose === false ? "false" : null;
  
  const settings : Settings = getContext("settings");
  let contentClass = settings.ItemContent.Class.join(' ');
</script>

<li class="context-menu-item" data-autoclose={autocloseAttribute}>
  {#if href}
    <a class={contentClass} href={href} {...$$restProps}>
      <slot></slot>
    </a>
  {:else}
    <button class={contentClass} {...$$restProps}>
      <slot></slot>
    </button>
  {/if}
</li>