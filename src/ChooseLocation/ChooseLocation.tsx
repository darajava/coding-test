import styles from "./styles.module.css";

export enum Territory {
  UK = "UK",
  EU = "EU",
  US = "US",
}

type Props = {
  question: string;
  onSelect: (territory: Territory) => void;
  selected?: Territory;
};

function ChooseLocation(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.question}>{props.question}</div>
      <div className={styles.options}>
        <div
          className={`${styles.option} ${styles.first} ${
            props.selected === Territory.UK ? styles.selected : ""
          }`}
          title="UK"
          onClick={() => props.onSelect(Territory.UK)}
        >
          🇬🇧
        </div>
        <div
          className={`${styles.option}  ${
            props.selected === Territory.EU ? styles.selected : ""
          }`}
          title="EU"
          onClick={() => props.onSelect(Territory.EU)}
        >
          🇪🇺
        </div>
        <div
          className={`${styles.option} ${styles.last}  ${
            props.selected === Territory.US ? styles.selected : ""
          }`}
          title="US"
          onClick={() => props.onSelect(Territory.US)}
        >
          🇺🇸
        </div>
      </div>
    </div>
  );
}

export default ChooseLocation;
