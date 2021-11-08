import {render, fireEvent} from '@testing-library/svelte'

import ScoreControls from '../game/ScoreControls.svelte';

describe("ScoreControls component", () => {
  it("renders correctly", () => {
    const { container } = render(ScoreControls, {
      onResetClick: () => {}
    });
    
    expect(container).toMatchSnapshot();
  });

  it("calls onResetClick Reset score button clicked", async () => {
    const mockOnResetClick = jest.fn();

    const { getByRole } = render(ScoreControls, {
      onResetClick: mockOnResetClick
    });

    const resetScoreButton = getByRole("button");

    await fireEvent.click(resetScoreButton);
    expect(mockOnResetClick).toHaveBeenCalledTimes(1);
  });
});
