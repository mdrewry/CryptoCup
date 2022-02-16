import "../styles/globals.css";
import type { AppProps } from "next/app";
import SideNavBar from "./Components/SideNavBar";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SideNavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
