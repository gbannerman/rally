<script lang="ts">
  import PointDifferenceIndicator from "./PointDifferenceIndicator.svelte";

  export let scores: number[];
  export let onScoreClick: (index: number) => void;

  $: pointDifference = [scores[0] - scores[1], scores[1] - scores[0]];
</script>

<div class="Scores">
  <button class="score player1" on:click={() => onScoreClick(0)}>
    <div>{scores[0]}</div>
  </button>
  <button class="score player2" on:click={() => onScoreClick(1)}>
    <div>{scores[1]}</div>
  </button>
</div>
<PointDifferenceIndicator {pointDifference} />

<style>
  .Scores {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .score {
    flex: 1 1 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fafaff;
  }

  .player1 {
    background-color: #c14f4a;
    color: #5b0b05;
  }

  .player2 {
    background-color: #4674bc;
    color: #112f70;
  }

  .score > div {
    font-size: 3rem;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
