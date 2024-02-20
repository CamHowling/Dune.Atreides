import * as React from "react";

import './../app/globals.css';
import { useRouter } from 'next/router'
import { House } from "@/classes/house";
import { Expansion } from "@/classes/expansion";
import { redirect } from "next/navigation";
import { GameMenu } from "@/components/tracker/gameMenu";
import { TabWrapper } from "@/components/tracker/TabWrapper";
import { OptionsMenu } from "@/components/tracker/optionsMenu";
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
  const selectedHouses = (router.query.houses ? JSON.parse( router.query.houses.toString()) : []) as House[];
  if (selectedHouses.length == 0) {
    redirect('/');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectedExpansions = (router.query.expansions? JSON.parse( router.query.expansions.toString()) : []) as Expansion[];

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
        <TabWrapper value={currentTab} index={3}>
          Item Three
        </TabWrapper>
        <TabWrapper value={currentTab} index={4}>
          Item Three
        </TabWrapper>
      </Box>
      <Footer></Footer>
    </>
  );
}

