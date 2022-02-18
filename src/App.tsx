import { useState } from "react";
import Header from "./Header/Header";
import ChooseLocation, { Territory } from "./ChooseLocation/ChooseLocation";
import Fees from "./Fees/Fees";
import PriceInput from "./PriceInput/PriceInput";

const decideCurrency = (t: Territory) => {
  if (t === Territory.EU) {
    return "€";
  } else if (t === Territory.US) {
    return "$";
  }
  return "£";
};

function App() {
  const [sellerTerritory, setSellerTerritory] = useState<Territory>();
  const [buyerTerritory, setBuyerTerritory] = useState<Territory>();
  const [currency, setCurrency] = useState<"£" | "$" | "€">("£");
  const [buyerCurrency, setBuyerCurrency] = useState<"£" | "$" | "€">("£");
  const [price, setPrice] = useState<number>();

  return (
    <div>
      <Header />

      <ChooseLocation
        question="Where are you selling from?"
        onSelect={(t) => {
          setCurrency(decideCurrency(t));
          setSellerTerritory(t);
        }}
        selected={sellerTerritory}
      />

      <PriceInput
        currency={currency}
        disabled={!sellerTerritory}
        onChange={setPrice}
      />

      <ChooseLocation
        question="Where are you selling to?"
        onSelect={(t) => {
          setBuyerCurrency(decideCurrency(t));
          setBuyerTerritory(t);
        }}
        selected={buyerTerritory}
      />

      <Fees
        price={price}
        sellerTerritory={sellerTerritory}
        buyerTerritory={buyerTerritory}
        currency={currency}
        buyerCurrency={buyerCurrency}
      />
    </div>
  );
}

export default App;
