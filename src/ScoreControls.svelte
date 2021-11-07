<script lang="ts">
  export let onResetClick: () => void;
</script>

<div class="ScoreControls">
  <button on:click={onResetClick}>Reset score</button>
</div>

<style>
  .ScoreControls {
    position: absolute;
    bottom: 20px;
    left: calc(50% - 65px);
    width: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  button {
    margin: 5px;
    padding: 8px;
    border-radius: 5px;
    background-color: #8493a9;
    font-size: 1.1rem;
    color: #fafaff;
  }
</style>
