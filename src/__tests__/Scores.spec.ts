import {render, fireEvent} from '@testing-library/svelte'

import Scores from '../Scores.svelte';

describe("Scores component", () => {
  it("renders correctly", () => {
    const { container } = render(Scores, {
      scores: [0, 0],
      onScoreClick: () => {}
    });

    expect(container).toMatchSnapshot();
  });

  it("displays scores of each player", () => {
    const { getAllByRole } = render(Scores, {
      scores: [5, 9], 
      onScoreClick: () => {}
    });

    const [player1Button, player2Button] = getAllByRole("button");
    expect(player1Button).toHaveTextContent("5");
    expect(player2Button).toHaveTextContent("9");
  });

  it("calls onScoreClick with correct index when score button clicked", async () => {
    const mockOnScoreClick = jest.fn();

    const { getAllByRole } = render(Scores, {
      scores: [5, 9], 
      onScoreClick: mockOnScoreClick
    });

    const [player1Button, player2Button] = getAllByRole("button");

    await fireEvent.click(player2Button);
    expect(mockOnScoreClick).toHaveBeenCalledTimes(1);
    expect(mockOnScoreClick).toHaveBeenCalledWith(1);

    mockOnScoreClick.mockClear();

    await fireEvent.click(player1Button);
    expect(mockOnScoreClick).toHaveBeenCalledTimes(1);
    expect(mockOnScoreClick).toHaveBeenCalledWith(0);
  });
});
