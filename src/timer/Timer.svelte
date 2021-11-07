<script lang="ts">
  import {
    convertMillisecondsToTimerValue,
    convertTimerValueToMilliseconds,
    CountdownTimer,
  } from "./timer";
  import StartStopButton from "./StartStopButton.svelte";
  import TimerDisplay from "./TimerDisplay.svelte";
  import TimerInput from "./TimerInput.svelte";

  let timerValue = "";
  let remainingMilliseconds = 0;
  let running = false;

  const timer = new CountdownTimer(
    50,
    () => {
      running = false;
      console.log("finished");
    },
    () => {
      remainingMilliseconds = timer.timeRemaining;
    },
    () => console.error("errorrrr")
  );

  const toggle = async () => {
    if (running) {
      timer.stop();
      timerValue = convertMillisecondsToTimerValue(remainingMilliseconds);
    } else {
      const duration = convertTimerValueToMilliseconds(timerValue);
      remainingMilliseconds = duration;
      timer.start(duration);
    }
    running = !running;
  };
</script>

<div class="Timer">
  {#if running}
    <TimerDisplay {remainingMilliseconds} />
  {:else}
    <TimerInput bind:value={timerValue} />
  {/if}
  <StartStopButton {running} onToggle={toggle} />
</div>

<style>
  .Timer {
    position: absolute;
    top: 20px;
    left: calc(50% - 50px);
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
