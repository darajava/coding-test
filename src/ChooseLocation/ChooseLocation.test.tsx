import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ChooseLocation, { Territory } from "./ChooseLocation";

test("renders question title", () => {
  render(
    <ChooseLocation question="I am a test question" onSelect={() => {}} />
  );
  const questionElement = screen.getByText("I am a test question");
  expect(questionElement).toBeInTheDocument();
});

test("selects territory correctly", () => {
  const onSelect = (territory: Territory) => {
    expect(territory).toBe(Territory.UK);
  };
  render(
    <ChooseLocation question="I am a test question" onSelect={onSelect} />
  );
  const ukElement = screen.getByTitle("UK");

  fireEvent.click(ukElement);
});

test("Sets selected correctly", () => {
  render(
    <ChooseLocation
      question="I am a test question"
      onSelect={() => {}}
      selected={Territory.UK}
    />
  );
  const ukElement = screen.getByTitle("UK");

  expect(ukElement).toHaveClass("selected");
});
