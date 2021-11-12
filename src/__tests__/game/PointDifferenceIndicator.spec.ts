import { render, fireEvent } from "@testing-library/svelte";

import PointDifferenceIndicator from "../../game/PointDifferenceIndicator.svelte";

describe("PointDifferenceIndicator component", () => {
  it("renders correctly", () => {
    const { container } = render(PointDifferenceIndicator, {
      pointDifference: [7, -7],
    });

    expect(container).toMatchSnapshot();
  });

  it("does not display point difference when even score", async () => {
    const { queryByLabelText } = render(PointDifferenceIndicator, {
      pointDifference: [0, 0],
    });

    const player1PointDifference = queryByLabelText(
      "Player 1 Point Difference"
    );
    const player2PointDifference = queryByLabelText(
      "Player 2 Point Difference"
    );

    expect(player1PointDifference).not.toBeInTheDocument;
    expect(player2PointDifference).not.toBeInTheDocument;
  });

  it("shows player 1 score when leading", async () => {
    const { getByLabelText, queryByLabelText } = render(
      PointDifferenceIndicator,
      {
        pointDifference: [2, -2],
      }
    );

    const player1PointDifference = getByLabelText("Player 1 Point Difference");
    const player2PointDifference = queryByLabelText(
      "Player 2 Point Difference"
    );

    expect(player1PointDifference).toHaveTextContent("+2");
    expect(player2PointDifference).not.toBeInTheDocument;
  });

  it("shows player 2 score when leading", async () => {
    const { getByLabelText, queryByLabelText } = render(
      PointDifferenceIndicator,
      {
        pointDifference: [-12, 12],
      }
    );

    const player1PointDifference = queryByLabelText(
      "Player 1 Point Difference"
    );
    const player2PointDifference = getByLabelText("Player 2 Point Difference");

    expect(player1PointDifference).not.toBeInTheDocument;
    expect(player2PointDifference).toHaveTextContent("+12");
  });
});
