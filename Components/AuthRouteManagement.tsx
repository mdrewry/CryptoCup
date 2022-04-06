import React, { useEffect, useContext } from "react";
import Router from "next/router";
import { UserContext } from "../context/UserProvider";

type AuthRouteManagementProps = {
  pathname: string;
  setPath: (value: string) => void;
};

const AuthRouteManagement = ({
  pathname,
  setPath,
}: AuthRouteManagementProps) => {
  const user = useContext(UserContext);

  //routes user based on auth change to either dashboard or landing
  useEffect(() => {
    const parsedPath = pathname.substring(1).split("/")[0];
    if (user.uid === "") {
      if (!["", "login", "signup"].some((r) => r === parsedPath))
        Router.push("/");
    } else Router.push("/dashboard");
  }, [user.uid]);

  //prevents user from accessing routes via url that are restricted
  useEffect(() => {
    const parsedPath = pathname.substring(1).split("/")[0];
    if (
      user.uid === "" &&
      [
        "dashboard",
        "mycups",
        "leaderboard",
        "cryptoinfo",
        "news",
        "createcup",
        "joincup",
        "profile",
      ].some((r) => r === parsedPath)
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

  return <></>;
};
export default AuthRouteManagement;
