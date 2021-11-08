import { render, fireEvent } from "@testing-library/svelte";

import Game from "../../game/Game.svelte";

describe("Game component", () => {
  it("renders correctly", () => {
    const { container } = render(Game);

    expect(container).toMatchSnapshot();
  });

  it("starts scores at zero", () => {
    const { getAllByRole } = render(Game);

    const buttons = getAllByRole("button", { name: "0" });

    expect(buttons).toHaveLength(2);
  });

  it("clicking on player 1 increases score by point", async () => {
    const { getAllByRole } = render(Game);

    const [player1Button, player2Button] = getAllByRole("button", {
      name: "0",
    });

    await fireEvent.click(player1Button);

    expect(player1Button).toHaveTextContent("1");
    expect(player2Button).toHaveTextContent("0");
  });

  it("clicking on player 2 increases score by point", async () => {
    const { getAllByRole } = render(Game);

    const [player1Button, player2Button] = getAllByRole("button", {
      name: "0",
    });

    await fireEvent.click(player2Button);

    expect(player1Button).toHaveTextContent("0");
    expect(player2Button).toHaveTextContent("1");
  });

  it("clicking reset score button resets both scores to zero", async () => {
    const { getAllByRole, getByRole } = render(Game);

    const [player1Button, player2Button] = getAllByRole("button", {
      name: "0",
    });
    const resetScoresButton = getByRole("button", { name: "Reset score" });

    await fireEvent.click(player1Button);

    await fireEvent.click(player2Button);
    await fireEvent.click(player2Button);

    await fireEvent.click(resetScoresButton);

    expect(player1Button).toHaveTextContent("0");
    expect(player2Button).toHaveTextContent("0");
  });
});
