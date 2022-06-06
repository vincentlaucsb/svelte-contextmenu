<script>
  import { getContext } from "svelte";
  const settings = getContext("settings");
  const dividerClass = settings.Divider.Class.join(" ");
</script>

<hr class={dividerClass} />