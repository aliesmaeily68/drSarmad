import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { CartContextProvider } from "../contexts/Cart";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Component {...pageProps} />
    </CartContextProvider>
  );
}
