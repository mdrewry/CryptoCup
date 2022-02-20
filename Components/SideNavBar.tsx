import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { WalletContext } from "../context/WalletProvider";
import styles from "../styles/SideNavBar.module.css";
import Web3 from "web3";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PaidIcon from "@mui/icons-material/Paid";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import FadeButton from "./FadeButton";

type SideNavBarProps = { sideBarWidth: number; path: string };
type ContentProps = { path: string };
type routeType = { name: string; path: string };
const routes: routeType[] = [
  { name: "Dashboard", path: "dashboard" },
  { name: "My Cups", path: "mycups" },
  { name: "Leaderboards", path: "leaderboard" },
  { name: "Crypto Info", path: "cryptoinfo" },
  { name: "News", path: "news" },
];
const Content = ({ path }: ContentProps) => {
  const user = useContext(UserContext);
  const wallet = useContext(WalletContext);
  const [walletConnected, setWalletConnected] = useState(user.wallet !== "");

  useEffect(() => {
    setWalletConnected(user.wallet !== "");
  }, [user.wallet]);

  async function linkWallet() {
    let web3 = new Web3(Web3.givenProvider);
    let acc = wallet.address;

    const message =
      "Sign this message to complete linking your wallet to your account. You will only have to do this once and it will cost you no eth.";

    if (acc) {
      web3.eth.personal.sign(message, acc, "", function (err, signature) {
        if (err) {
          alert("Error during signing. Please refresh and try again.");
        } else {
          sendLinkRequest(signature);
        }
      });
    }
  }
  async function sendLinkRequest(signature: string) {
    try {
      const response = await fetch("/api/link", {
        method: "POST",
        body: JSON.stringify({
          uid: user.uid,
          address: wallet.address,
          signature,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert("it worked");
      }
    } catch (error) {
      console.log(error);
      alert("Error during signing. Please refresh and try again.");
    }
  }

  return (
    <>
      <div className={styles.headerSection}>
        <Avatar
          sx={{ width: 80, height: 80 }}
          alt={user.firstName}
          src={user.img}
        />
        <div className={styles.header}>
          <h4 className={styles.title}>{user.firstName} User</h4>
          <h5 className={styles.subtitle}>{user.uid}123213</h5>
        </div>
      </div>
      <Stack className={styles.spacer} spacing={2}>
        {routes.map((route, id) => (
          <Button
            key={id}
            startIcon={
              <>
                {route.path == "dashboard" && <DashboardIcon />}
                {route.path == "mycups" && <EmojiEventsIcon />}
                {route.path == "leaderboard" && <LeaderboardIcon />}
                {route.path == "cryptoinfo" && <PaidIcon />}
                {route.path == "news" && <NewspaperIcon />}
              </>
            }
            style={{
              background: `${route.path === path ? "#DA93D3" : "#13172C"}`,
              fontFamily: "Space Mono",
              fontSize: 20,
              borderRadius: 60,
              fontWeight: 700,
              height: 55,
              padding: 10,
              width: "100%",
              color: "white",
              justifyContent: "flex-start",
            }}
          >
            {route.name}
          </Button>
        ))}
      </Stack>
      <FadeButton
        disabled={walletConnected}
        variant="contained"
        onClick={linkWallet}
      >
        {walletConnected ? "Connected" : "Connect Now"}
      </FadeButton>
    </>
  );
};
const SideNavBar = ({ sideBarWidth, path }: SideNavBarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: `${sideBarWidth}px`,
            boxSizing: "border-box",
            backgroundColor: "#13172C",
            border: "solid",
            borderColor: "white",
            borderLeft: 3,
            borderTop: 0,
            borderBottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            paddingTop: "23px",
            paddingBottom: "39px",
            paddingLeft: "17px",
            paddingRight: "17px",
          },
        }}
      >
        <Content path={path} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            backgroundColor: "#13172C",
            width: `${sideBarWidth}px`,
            border: "solid",
            borderColor: "white",
            borderLeft: 3,
            borderTop: 0,
            borderBottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            paddingTop: "23px",
            paddingBottom: "39px",
            paddingLeft: "17px",
            paddingRight: "17px",
          },
        }}
        open
      >
        <Content path={path} />
      </Drawer>
    </>
  );
};
export default SideNavBar;
