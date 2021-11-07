<script lang="ts">
  import { convertMillisecondsToTimerValue } from "./timer";

  export let remainingMilliseconds;
</script>

<div class="TimerDisplay">
  <div class="timer">
    {convertMillisecondsToTimerValue(remainingMilliseconds)}
  </div>
</div>

<style>
  .TimerDisplay {
    width: 100px;
    height: 40px;
    text-align: center;
  }

  .timer {
    position: absolute;
    width: 100%;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color: #e9e9e9;
    height: 40px;
    line-height: 20px;
    padding: 10px 10px;
    color: #606c6e;
    font-size: 30px;
    outline: 0 solid transparent;
    border: 0 solid transparent;
    border-radius: 4px;
    box-sizing: border-box;
  }
</style>
