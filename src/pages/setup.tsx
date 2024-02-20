/* eslint-disable @typescript-eslint/no-unused-vars */
import { Footer } from "@/components/footer";
import { PageTitle } from "@/components/pageTitle";
import { mainBackground, minorHeading } from "@/settings/colours";
import { Box, Typography } from "@mui/material";
import * as React from "react";

import './../app/globals.css';
import { useState } from "react";
import { House } from "@/classes/house";
import { Expansion } from "@/classes/expansion";
import HouseButton from "@/components/setUp/houseButton";
import ExpansionButton from "@/components/setUp/expansionButton";

const bodyStyle = {
    display: 'flex',
    backgroundColor: mainBackground,
    justifyContent:'flex-start',
    alignItems: 'center',
    minHeight: '80vh',
    flexDirection: 'column',
}

const boxStyle = {
  display: 'flex',
  justifyContent:'space-evenly',
  alignItems: 'center',
}

function Setup () {
  const [selectedHouses, setSelectedHouses] = useState<House[]>([House.Atreides]);
  const [selectedExpansions, setSelectedExpansions] = useState<Expansion[]>([]);

  const handleHouseClick = (house: House) => {
    if (selectedHouses.includes(house)) {
      const houses = selectedHouses.filter((h) => {
        return h != house;
      });

      setSelectedHouses(houses)
      return;
    }

    const houses = selectedHouses.concat(house);
    setSelectedHouses(houses);
  }

  const handleExpansionClick = (expansion: Expansion) => {
    if (selectedExpansions.includes(expansion)) {
      const expansions = selectedHouses.filter((h) => {
        return h != expansion;
      });

      setSelectedExpansions(expansions)
      return;
    }

    const expansions = selectedExpansions.concat(expansion);
    setSelectedExpansions(expansions);
  }

  return (
    <Box sx={{ minHeight: '100vh', m: 0 }}>
      <PageTitle title="Set Up"></PageTitle>
      <Box sx={{...bodyStyle}}>
        <Typography variant='h3' sx={{ color: minorHeading, mt: 3, mb: 2 }}>Houses</Typography>
        <Box sx={{...boxStyle}}>
          <HouseButton house={House.Atreides} onClick={() => {}}></HouseButton>
          <HouseButton house={House.Fremen} onClick={() => {handleHouseClick(House.Fremen)}}></HouseButton>
          <HouseButton house={House.SpacingGuild} onClick={() => {handleHouseClick(House.SpacingGuild)}}></HouseButton>
          <HouseButton house={House.Ixian} onClick={() => {handleHouseClick(House.Ixian)}}></HouseButton>
          <HouseButton house={House.Choam} onClick={() => {handleHouseClick(House.Choam)}}></HouseButton>
          <HouseButton house={House.Ecaz} onClick={() => {handleHouseClick(House.Ecaz)}}></HouseButton>
        </Box>
        <Box sx={{...boxStyle}}>
          <HouseButton house={House.Harkonen} onClick={() => {handleHouseClick(House.Harkonen)}}></HouseButton>
          <HouseButton house={House.BeneGesserit} onClick={() => {handleHouseClick(House.BeneGesserit)}}></HouseButton>
          <HouseButton house={House.Emperor} onClick={() => {handleHouseClick(House.Emperor)}}>
          </HouseButton><HouseButton house={House.Tleilaxu} onClick={() => {handleHouseClick(House.Tleilaxu)}}></HouseButton>
          <HouseButton house={House.Richese} onClick={() => {handleHouseClick(House.Richese)}}></HouseButton>
          <HouseButton house={House.Moritani} onClick={() => {handleHouseClick(House.Moritani)}}></HouseButton>
        </Box>
        <Typography variant='h3' sx={{ color: minorHeading, mt: 3, mb: 2 }}>Treacheries</Typography>
        <Box sx={{...boxStyle}}>
          <ExpansionButton expansion={Expansion.TleilaxuAndIxian} onClick={() => {handleExpansionClick(Expansion.TleilaxuAndIxian)}}></ExpansionButton>
          <ExpansionButton expansion={Expansion.ChoamAndRichese} onClick={() => {handleExpansionClick(Expansion.ChoamAndRichese)}}></ExpansionButton>
          <ExpansionButton expansion={Expansion.EcazAndMoritani} onClick={() => {handleExpansionClick(Expansion.EcazAndMoritani)}}></ExpansionButton>
      </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
}

export default Setup;