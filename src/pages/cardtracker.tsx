import * as React from "react";

import './../app/globals.css';
import { useRouter } from 'next/router'
import { House } from "@/classes/house";
import { Expansion } from "@/classes/expansion";
import { redirect } from "next/navigation";
import { GameMenu } from "@/components/tracker/gameMenu";
import { TabWrapper } from "@/components/tracker/TabWrapper";
import { OptionsMenu } from "@/components/tracker/options";
import { Footer } from "@/components/footer";
import { mainBackground } from "@/settings/colours";
import { Box } from "@mui/material";

//can potentially simplify
const tabStyles = {
    backgroundColor: mainBackground,
    minHeight: '80vh',
}

export default function Tracker () {
  const router = useRouter();
  const houses = (router.query.houses ? JSON.parse( router.query.houses.toString()) : []) as House[];
  if (houses.length == 0) {
    redirect('/');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const expansions = (router.query.expansions? JSON.parse( router.query.expansions.toString()) : []) as Expansion[];

  const [currentTab, setCurrentTab] = React.useState(0);
  const handleChange = (newValue: number) => {
      setCurrentTab(newValue);
  };

  return (
    <>
      <GameMenu onChange={(value) => handleChange(value)}></GameMenu>
      <Box sx={{...tabStyles}}>
        <TabWrapper value={currentTab} index={0}>
          <OptionsMenu></OptionsMenu>
        </TabWrapper>
        <TabWrapper value={currentTab} index={1}>
          Item Two
        </TabWrapper>
        <TabWrapper value={currentTab} index={2}>
          Item Three
        </TabWrapper>
      </Box>
      <Footer></Footer>
    </>
  );
}

