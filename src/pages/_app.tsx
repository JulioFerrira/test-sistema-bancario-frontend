import type { AppProps } from "next/app";
import "rsuite/dist/rsuite.min.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
