import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { UserContext } from "../context/UserProvider";
import { WalletContext } from "../context/WalletProvider";
import styles from "../styles/SideNavBar.module.css";
import Web3 from "web3";
import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PaidIcon from "@mui/icons-material/Paid";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FadeButton from "./FadeButton";

type SideNavBarProps = { sideBarWidth: number; path: string };
type ContentProps = { path: string };
type routeType = { name: string; path: string };
const routes: routeType[] = [
  { name: "Dashboard", path: "dashboard" },
  { name: "My Cups", path: "mycups" },
  { name: "Leaderboards", path: "leaderboard" },
  { name: "News", path: "news" },
];
const Content = ({ path }: ContentProps) => {
  const user = useContext(UserContext);
  const wallet = useContext(WalletContext);
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
      }
    } catch (error) {
      alert("Error during signing. Please refresh and try again.");
    }
  }
  return (
    <>
      <div className={styles.headerSection}>
        <Avatar
          sx={{ width: 80, height: 80 }}
          alt={user.firstName}
          src={user.imageURL}
        />
        <div className={styles.header}>
          <h4 className={styles.title}>{user.firstName}</h4>
        </div>
      </div>
      <Stack className={styles.spacer} spacing={2}>
        {routes.map((route, id) => (
          <Link
            href={{
              pathname: `/${route.path}`,
            }}
            key={id}
          >
            <Button
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
          </Link>
        ))}
      </Stack>
      <Stack className={styles.spacer} spacing={2}>
        <Link
          href={{
            pathname: "/createcup",
          }}
        >
          <Button
            style={{
              background: "#2F386999",
              fontFamily: "Space Mono",
              fontSize: 20,
              borderRadius: 60,
              fontWeight: 700,
              height: 55,
              padding: 10,
              width: "100%",
              color: "white",
            }}
          >
            Create a Cup
          </Button>
        </Link>
        <Link
          href={{
            pathname: "/joincup",
          }}
        >
          <Button
            style={{
              background: "#2F386999",
              fontFamily: "Space Mono",
              fontSize: 20,
              borderRadius: 60,
              fontWeight: 700,
              height: 55,
              padding: 10,
              width: "100%",
              color: "white",
            }}
          >
            Join a Cup
          </Button>
        </Link>
      </Stack>
      <div className={styles.filler} />

      <h6>Wallet Status:</h6>
      <h6 className={styles.walletStatus}>
        {user.wallet ? "Connected" : "Disconnected"}
      </h6>
      <p className={styles.walletStatusSubheader}>
        You must be connected to join a cup.
      </p>
      {user.wallet ? (
        <FadeButton variant="contained">Connected</FadeButton>
      ) : (
        <>
          {wallet.address ? (
            <FadeButton variant="contained" onClick={linkWallet}>
              Link Wallet
            </FadeButton>
          ) : (
            <FadeButton variant="contained" onClick={wallet.connect}>
              Connect Wallet
            </FadeButton>
          )}
        </>
      )}
    </>
  );
};
const SideNavBar = ({ sideBarWidth, path }: SideNavBarProps) => {
  const [mobileOpen, setMobileOpen] = useState(true);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setMobileOpen(open);
    };
  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: `${sideBarWidth}px`,
            boxSizing: "border-box",
            overflowX: "hidden",
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
            position: "relative",
          },
        }}
      >
        <Content path={path} />
        <IconButton
          style={{
            position: "absolute",
            top: "50%",
            backgroundColor: "#2F3869",
            color: "white",
            borderRadius: "50%",
            right: -40,
            zIndex: 10,
            padding: 20,
          }}
        >
          <ArrowBackIosNewIcon
            style={{ fontSize: "50px", position: "relative", left: -15 }}
          />
        </IconButton>
      </SwipeableDrawer>
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
