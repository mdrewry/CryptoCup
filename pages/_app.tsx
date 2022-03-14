import "../styles/globals.css";
import { useState, useEffect, useContext } from "react";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SideNavBar from "../Components/SideNavBar";
import Footer from "../Components/Footer";
import UserProvider, { UserContext } from "../context/UserProvider";
import WalletProvider from "../context/WalletProvider";
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  const user = useContext(UserContext);
  const { pathname } = useRouter();
  const [path, setPath] = useState(pathname.substring(1).split("/")[0]);
  const displaySidebar = !["", "login", "signup"].some(
    (route) => route === path
  );
  const sideBarWidth = 270;

  useEffect(() => {
    const parsedPath = pathname.substring(1).split("/")[0];
    if (user.uid === "") {
      if (!["", "login", "signup"].some((r) => r === parsedPath))
        Router.push("/");
    } else Router.push("/dashboard");
  }, [user]);

  useEffect(() => {
    const parsedPath = pathname.substring(1).split("/")[0];
    if (
      user.uid === "" &&
      ["dashboard", "mycups", "leaderboard", "cryptoinfo", "news"].some(
        (r) => r === parsedPath
      )
    ) {
      Router.push("/");
    } else if (
      user.uid !== "" &&
      ["", "login", "signup"].some((r) => r === parsedPath)
    ) {
      Router.push("/dashboard");
      setPath(parsedPath);
    } else {
      setPath(parsedPath);
    }
  }, [pathname]);

  return (
    <UserProvider>
      <WalletProvider>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex", height: "100vh" }}>
            {displaySidebar && (
              <Box
                component="nav"
                sx={{
                  width: { sm: `${sideBarWidth}px` },
                  flexShrink: { sm: 0 },
                }}
                aria-label="folders"
              >
                <SideNavBar sideBarWidth={sideBarWidth} path={path} />
              </Box>
            )}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                overflow: "auto",
                width: {
                  sm: displaySidebar
                    ? `calc(100% - ${sideBarWidth}px)`
                    : "100%",
                },
              }}
            >
              <Component {...pageProps} />
              <Footer />
            </Box>
          </Box>
        </ThemeProvider>
      </WalletProvider>
    </UserProvider>
  );
}

export default MyApp;
