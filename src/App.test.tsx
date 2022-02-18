import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  render(<App />);
});

test("total hidden when not enough info", () => {
  render(<App />);

  const totalElement = screen.queryByText(/Total:/);

  // fireEvent.change(priceInputElement, {
  //   target: { value: "1234" },
  // });

  expect(totalElement).toBeNull();
});

test("total shown when not enough info", () => {
  render(<App />);

  const priceInputElement = screen.getByRole("textbox");

  fireEvent.change(priceInputElement, {
    target: { value: "1234" },
  });

  // Click on both UKs
  screen.getAllByTitle("UK").forEach((elem) => {
    fireEvent.click(elem);
  });

  const totalElement = screen.getByText(/Total:/);

  expect(totalElement).toBeInTheDocument();
});

test("price input disabled when seller territory unselected", () => {
  render(<App />);

  const priceInputElement = screen.getByRole("textbox");

  expect(priceInputElement).toBeDisabled();
});

test("price input not disabled when seller territory unselected", () => {
  render(<App />);

  const priceInputElement = screen.getByRole("textbox");

  // Click on first UK
  fireEvent.click(screen.getAllByTitle("UK")[0]);

  expect(priceInputElement).not.toBeDisabled();
});
