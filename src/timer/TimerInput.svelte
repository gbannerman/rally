<script lang="ts">
  import { insertSeperator, removeSeperator } from "./timerService";

  export let value = "";

  let timerInput: HTMLInputElement = null;

  const widthMap: { [key: number]: string } = {
    0: "width: 10px; margin-right: 2px; padding-left: 0px; right: 0px;",
    1: "width: 20px; margin-left: 21px;",
    2: "width: 37px; margin-left: 5px;",
    4: "width: 62px; margin-left: -22px;",
    5: "width: 79px; margin-left: -40px;",
  };

  $: inputWidth = widthMap[value.length];

  const handleInput = (event: Event) => {
    const newValue = (event.target as HTMLInputElement).value;
    const withoutSeperator = removeSeperator(newValue);
    value = insertSeperator(withoutSeperator);
  };

  const onSubmit = (event: Event) => {
    event.preventDefault();
    (document.activeElement as HTMLInputElement).blur();
  };

  const focusInput = () => {
    if (!timerInput) return;

    timerInput.focus();
    const endOfInput = value.length;
    timerInput.setSelectionRange(endOfInput, endOfInput);
  };
</script>

<div aria-label="Timer" class="TimerInput" on:click={focusInput}>
  <div class="timer placeholder">00:00</div>
  <form on:submit={onSubmit}>
    <input
      bind:this={timerInput}
      class="timer input"
      type="text"
      inputmode="numeric"
      maxlength="5"
      style={inputWidth}
      {value}
      on:input={handleInput}
      on:click={focusInput}
    />
  </form>
</div>

<style>
  .TimerInput {
    width: 100px;
    height: 40px;
    text-align: center;
  }

  input.timer {
    width: 42px;
    padding: 2px;
    margin: 5px;
    height: 30px;
    margin-left: 50px;
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
