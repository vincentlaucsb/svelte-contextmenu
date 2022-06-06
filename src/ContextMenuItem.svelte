<script>
  import { getContext } from "svelte";
  export let href;
  
  const settings = getContext("settings");
  let contentClass = settings.ItemContent.Class.join(' ');
</script>

<li class="context-menu-item">
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