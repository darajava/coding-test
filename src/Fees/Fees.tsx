import React, { useEffect, useState } from "react";
import { Territory } from "../ChooseLocation/ChooseLocation";
import styles from "./styles.module.css";

type Props = {
  price?: number;
  sellerTerritory?: Territory;
  buyerTerritory?: Territory;
  currency: string;
  buyerCurrency: string;
};

const processingFeeMap = {
  [Territory.EU]: 3,
  [Territory.UK]: 2,
  [Territory.US]: 4,
};

const exchangeRates = {
  [Territory.EU]: {
    [Territory.UK]: 0.83,
    [Territory.US]: 1.13,
    [Territory.EU]: 1,
  },
  [Territory.UK]: {
    [Territory.EU]: 1.2,
    [Territory.US]: 1.36,
    [Territory.UK]: 1,
  },
  [Territory.US]: {
    [Territory.EU]: 0.74,
    [Territory.UK]: 0.88,
    [Territory.US]: 1,
  },
};

function Fees(props: Props) {
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [processingFee, setProcessingFee] = useState<number>(0);

  useEffect(() => {
    if (props.sellerTerritory !== props.buyerTerritory) {
      // It will always be 5, could abstract into a map like above, or retrieve from server
      setDeliveryFee(5);
    } else {
      setDeliveryFee(0);
    }

    if (props.price && props.sellerTerritory) {
      setProcessingFee(
        props.price * (processingFeeMap[props.sellerTerritory] / 100)
      );
    } else {
      setProcessingFee(0);
    }
  }, [props.price, props.sellerTerritory, props.buyerTerritory]);

  if (!props.sellerTerritory || !props.buyerTerritory || !props.price) {
    return null;
  }

  const total = props.price + processingFee + deliveryFee;
  const totalExchange =
    total * exchangeRates[props.sellerTerritory][props.buyerTerritory];

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        Price: {props.currency}
        {props.price}
      </div>
      <div className={styles.row}>
        Delivery: {deliveryFee ? `${props.currency}${deliveryFee}` : "FREE!"}
      </div>
      <div className={styles.row}>
        Processing fee ({processingFeeMap[props.sellerTerritory]}%):{" "}
        {props.currency}
        {processingFee.toFixed(2)}
      </div>
      <div className={`${styles.row} ${styles.total}`}>
        Total: {props.currency}
        {total.toFixed(2)}{" "}
        {props.currency !== props.buyerCurrency &&
          `(${props.buyerCurrency}${totalExchange.toFixed(2)})`}
      </div>
    </div>
  );
}

export default Fees;
