<script>import { getContext } from "svelte";
export let autoclose = true;
export let href = "";
$: autocloseAttribute = autoclose === false ? "false" : null;
const settings = getContext("settings");
let contentClass = settings.ItemContent.Class.join(' ');
</script>

<li class="context-menu-item" data-autoclose={autocloseAttribute}>
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