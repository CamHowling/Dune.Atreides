import React  from 'react';

import styles from "./page.module.css";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Typography>This is a simple demo text for MUI</Typography>    
      </div>
    </main>
  );
}
