import "../styles/globals.css";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SideNavBar from "../Components/SideNavBar";
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
  const { pathname } = useRouter();
  const [path, setPath] = useState(pathname.substring(1).split("/")[0]);
  const displaySidebar = ["", "login"].some((route) => route === path);
  const sideBarWidth = 270;
  useEffect(() => {
    setPath(pathname.substring(1).split("/")[0]);
  }, [pathname]);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: '100vh' }}>
        {displaySidebar && (
          <Box
            component="nav"
            sx={{ width: { sm: `${sideBarWidth}px` }, flexShrink: { sm: 0 } }}
            aria-label="folders"
          >
            <SideNavBar sideBarWidth={sideBarWidth} path={path} />
          </Box>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            width: {
              sm: displaySidebar ? `calc(100% - ${sideBarWidth}px)` : "100%",
            },
          }}
        >
          <Component {...pageProps} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
