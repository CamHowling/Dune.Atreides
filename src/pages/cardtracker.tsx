import * as React from "react";

import './../app/globals.css';
import { useRouter } from 'next/router'
import { House } from "@/classes/house";
import { Expansion } from "@/classes/expansion";
import { redirect } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { GameMenu } from "@/components/gameMenu";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



export default function Tracker () {
  const router = useRouter();
  const houses = (router.query.houses ? JSON.parse( router.query.houses.toString()) : []) as House[];
  if (houses.length == 0) {
    redirect('/');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const expansions = (router.query.expansions? JSON.parse( router.query.expansions.toString()) : []) as Expansion[];

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
  };

  return (
    <>
      <GameMenu onChange={() => handleChange}></GameMenu>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </>
  );
}

