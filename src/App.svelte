<script lang="ts">
  import ScoreControls from "./ScoreControls.svelte";
  import Scores from "./Scores.svelte";
  import Timer from "./timer/Timer.svelte";

  let scores = [0, 0];

  const resetScores = () => {
    scores = [0, 0];
  };

  const addPoint = (index: number) => {
    scores[index] = scores[index] + 1;
  };
</script>

<main>
  <Timer />
  <Scores {scores} onScoreClick={addPoint} />
  <ScoreControls onResetClick={resetScores} />
</main>

<style>
  main {
    height: 100%;
    width: 100%;
  }
</style>
