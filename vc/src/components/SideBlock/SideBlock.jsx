import React from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const SideBlock = ({ title, children }) => {
  return (
    <Paper className={styles.root}>
      <Typography className={styles.title} variant="h5" >
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
