<script lang="ts">
  import { PlayIcon, PauseIcon } from "svelte-feather-icons";

  export let running: boolean;
  export let onToggle: () => void;
</script>

<div class="StartStopButton">
  <button class={running ? "icon stop" : "icon start"} on:click={onToggle}>
    {#if running}
      <PauseIcon />
    {:else}
      <PlayIcon />
    {/if}
  </button>
</div>

<style>
  .icon {
    padding: 5px;
    margin: 10px;
    height: 40px;
    width: 40px;
    border: 1px transparent solid;
    border-radius: 5px;
    color: #374550;
  }

  .icon.start {
    background-color: #6ac46a;
  }

  .icon.stop {
    background-color: #e5b66c;
  }
</style>
