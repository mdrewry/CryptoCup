import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import styles from "../styles/createcup.module.css";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import CircleIcon from "@mui/icons-material/Circle";
const CreateCup: NextPage = () => {
  const [page, setPage] = useState(0);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Create a Cup</h1>
        <h6>
          As the Cup Commissioner, only you can customize the cup and scoring
          settings.
        </h6>
      </div>
      <div className={styles.container}>
        <form>
          {page == 0 ? (
            <Grid>
              <Grid item xs={12}>
                <h4>1. Basic Information</h4>
              </Grid>
            </Grid>
          ) : (
            <Grid>
              <Grid item xs={12}>
                <h4>2. Cup Settings</h4>
              </Grid>
            </Grid>
          )}
        </form>
        <Stack direction="row">
          <IconButton onClick={(e) => handleChange(e, 0)}>
            <CircleIcon color={page == 1 ? "primary" : "secondary"} />
          </IconButton>
          <IconButton onClick={(e) => handleChange(e, 1)}>
            <CircleIcon color={page == 0 ? "primary" : "secondary"} />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};
export default CreateCup;
