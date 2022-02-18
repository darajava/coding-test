import { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  disabled: boolean;
  currency: string;
  onChange: (n: number) => void;
};

function PriceInput(props: Props) {
  const [input, setInput] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.currency}>{props.currency}</div>
        <input
          disabled={props.disabled}
          className={styles.input}
          value={input}
          placeholder="Price..."
          onChange={(e) => {
            const val = e.currentTarget.value.replace(/\D/g, "");
            setInput(val || "");
            props.onChange(parseInt(val));
          }}
        />
      </div>
    </div>
  );
}

export default PriceInput;
