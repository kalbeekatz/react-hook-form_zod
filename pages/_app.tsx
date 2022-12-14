import type { AppProps } from "next/app";
import styles from "../styles/app.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.wrapper}>
      <Component {...pageProps} />
    </div>
  );
}
