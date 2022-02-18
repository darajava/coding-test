import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PriceInput from "./PriceInput";

test("renders PriceInput", () => {
  render(<PriceInput onChange={() => {}} currency="$" disabled={false} />);
  const PriceInputElement = screen.getByRole("textbox");
  expect(PriceInputElement).toBeInTheDocument();
});

test("renders currency", () => {
  render(<PriceInput onChange={() => {}} currency="$" disabled={false} />);
  const currency = screen.getByText("$");
  expect(currency).toBeInTheDocument();
});

test("renders enabled PriceInput", () => {
  render(<PriceInput onChange={() => {}} currency="$" disabled={false} />);
  const priceInputElement = screen.getByRole("textbox");

  expect(priceInputElement).not.toBeDisabled();
});

test("renders disabled PriceInput", () => {
  render(<PriceInput onChange={() => {}} currency="$" disabled={true} />);
  const priceInputElement = screen.getByRole("textbox");

  expect(priceInputElement).toBeDisabled();
});

test("calls function when changed", () => {
  const onChange = (x: number) => {
    expect(x).toBe(1234);
  };

  render(<PriceInput onChange={onChange} currency="$" disabled={true} />);
  const priceInputElement = screen.getByRole("textbox");

  fireEvent.change(priceInputElement, {
    target: { value: "1234" },
  });
});
