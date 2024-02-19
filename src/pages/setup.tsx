import { Footer } from "@/components/footer";
import { PageTitle } from "@/components/pageTitle";
import { mainBackground } from "@/settings/colours";
import { Box } from "@mui/material";
import * as React from "react";

import './../app/globals.css';

const bodyStyle = {
    display: 'flex',
    backgroundColor: mainBackground,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    minHeight: '80vh',
}

function Setup () {
  return (
    <Box sx={{ minHeight: '100vh', m: 0 }}>
        <PageTitle title="Set Up"></PageTitle>
        <Box sx={{...bodyStyle}}>
        </Box>
        <Footer></Footer>
    </Box>
  );
}

export default Setup;