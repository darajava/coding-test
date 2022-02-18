import React from "react";
import { render, screen } from "@testing-library/react";
import Fees from "./Fees";
import { Territory } from "../ChooseLocation/ChooseLocation";

// price?: number;
// sellerTerritory?: Territory;
// buyerTerritory?: Territory;
// currency: string;
// buyerCurrency: string;

test("renders Fees element", () => {
  render(
    <Fees
      price={100}
      sellerTerritory={Territory.UK}
      buyerTerritory={Territory.US}
      currency="£"
      buyerCurrency="$"
    />
  );
});

test("calculates base price correctly", () => {
  render(
    <Fees
      price={100}
      sellerTerritory={Territory.UK}
      buyerTerritory={Territory.US}
      currency="£"
      buyerCurrency="$"
    />
  );

  const priceElement = screen.getByText(/Price/);

  expect(priceElement).toHaveTextContent("£100");
});

test("calculates delivery correctly", () => {
  render(
    <Fees
      price={100}
      sellerTerritory={Territory.UK}
      buyerTerritory={Territory.US}
      currency="£"
      buyerCurrency="$"
    />
  );

  const priceElement = screen.getByText(/Delivery: /);
  expect(priceElement).toHaveTextContent("£5");
});

test("calculates delivery correctly when in the same territory", () => {
  render(
    <Fees
      price={100}
      sellerTerritory={Territory.EU}
      buyerTerritory={Territory.EU}
      currency="€"
      buyerCurrency="€"
    />
  );

  const deliveryElement = screen.getByText(/Delivery: /);
  expect(deliveryElement).toHaveTextContent("FREE!");
});

test("calculates processing fee correctly", () => {
  render(
    <Fees
      price={100}
      sellerTerritory={Territory.EU}
      buyerTerritory={Territory.EU}
      currency="€"
      buyerCurrency="€"
    />
  );

  const processingFeeElement = screen.getByText(/Processing fee /);
  expect(processingFeeElement).toHaveTextContent("€3");
});

test("calculates total correctly", () => {
  render(
    <Fees
      price={100}
      sellerTerritory={Territory.UK}
      buyerTerritory={Territory.US}
      currency="£"
      buyerCurrency="$"
    />
  );

  const totalElement = screen.getByText(/Total: /);
  expect(totalElement).toHaveTextContent("£107.00");
});

test("calculates total correctly with exchange", () => {
  render(
    <Fees
      price={100}
      sellerTerritory={Territory.UK}
      buyerTerritory={Territory.US}
      currency="£"
      buyerCurrency="$"
    />
  );

  const totalElement = screen.getByText(/Total: /);
  expect(totalElement).toHaveTextContent("$145.52");
});
