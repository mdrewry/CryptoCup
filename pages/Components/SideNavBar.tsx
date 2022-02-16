import React, { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import Drawer from "@mui/material/Drawer";

type SideNavBarProps = {};

const drawer = () => {
  return (
    <div>
      <h1>Nav</h1>
      <button>connect to wallet</button>
    </div>
  );
};

const SideNavBar = ({}: SideNavBarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useRouter();
  const displaySidebar = !["", "login"].some(
    (route) => route === pathname.substring(1).split("/")[0]
  );
  console.log(pathname);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  return (
    <>
      {displaySidebar && (
        <>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 270 },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 270 },
            }}
            open
          >
            {drawer}
          </Drawer>
        </>
      )}
    </>
  );
};
export default SideNavBar;
