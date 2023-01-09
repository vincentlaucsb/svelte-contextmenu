<script>
  import { getContext } from "svelte";
  const settings = getContext("settings");

  $: dividerClass = $settings.Divider.Class.join(" ");
</script>

<hr class={dividerClass} />

<style>
  .context-menu-divider.context-menu-default {
    border: 0;
    background-color: var(--ctx-menu-divider-color, #aaaaaa);
    height: var(--ctx-menu-divider-size, 1px);
    margin: var(--ctx-menu-divider-margin, 0.5rem 0);
  }
</style>