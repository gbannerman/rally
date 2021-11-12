<script lang="ts">
  export let pointDifference: number[];
</script>

<div class="PointDifferenceIndicator">
  {#if pointDifference[0] > 0}
    <span class="player1" aria-label="Player 1 Point Difference"
      >+{pointDifference[0]}</span
    >
  {/if}
  {#if pointDifference[1] > 0}
    <span class="player2" aria-label="Player 2 Point Difference"
      >+{pointDifference[1]}</span
    >
  {/if}
</div>

<style>
  .PointDifferenceIndicator {
    position: absolute;
    bottom: calc(35%);
    left: calc(50% - 50px);
    width: 100px;
    display: grid;
  }

  span {
    font-size: x-large;
  }

  .player1 {
    color: #5b0b05;
    justify-self: left;
  }

  .player2 {
    color: #112f70;
    justify-self: right;
  }
</style>
