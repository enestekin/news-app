import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Container } from "react-bootstrap";
import styles from "@/styles/App.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={styles.pageContainer}>
      <Component {...pageProps} />
    </Container>
  );
}
