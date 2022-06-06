<script>import { getContext } from "svelte";
export let autoclose;
export let href;
$: autocloseAttribute = autoclose === false ? "false" : null;
const settings = getContext("settings");
let contentClass = settings.ItemContent.Class.join(' ');
</script>

<li class="context-menu-item">
  {#if href}
    <a class={contentClass} href={href} {...$$restProps} data-autoclose={autocloseAttribute}>
      <slot></slot>
    </a>
  {:else}
    <button class={contentClass} {...$$restProps} data-autoclose={autocloseAttribute}>
      <slot></slot>
    </button>
  {/if}
</li>