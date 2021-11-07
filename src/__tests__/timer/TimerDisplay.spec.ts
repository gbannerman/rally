import {render} from '@testing-library/svelte'

import TimerDisplay from '../../timer/TimerDisplay.svelte';

describe("TimerDisplay component", () => {
  it("renders correctly", () => {
    const { container } = render(TimerDisplay, {
      remainingMilliseconds: 9_000
    });
    
    expect(container).toMatchSnapshot();
  });
});
