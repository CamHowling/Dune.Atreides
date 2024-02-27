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
import { GameMenuButton } from "@/components/gameMenuButton";
import { useRouter } from "next/router";

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

const menuButtonStyles = {
  display: 'flex',
  justifyContent:'space-evenly',
  alignItems: 'flex-end',
  mt: 2
}

const headingStyle = {
  color: minorHeading, 
  mt: 3,
  mb: 1, 
}

function Setup () {
  const [selectedHouses, setSelectedHouses] = useState<House[]>([House.Atreides]);
  const [selectedExpansions, setSelectedExpansions] = useState<Expansion[]>([Expansion.BaseGame]);

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

  const router = useRouter();

  const houseQuery = () => {
    const query = selectedHouses.map((house) => { return house.name})
    return query;
  }

  const expansionQuery = () => {
    const query = selectedExpansions.map((expansion) => { return expansion.id})
    return query;
  }

  return (
    <Box sx={{ minHeight: '100vh', m: 0 }}>
      <PageTitle title="Set Up"></PageTitle>
      <Box sx={{...bodyStyle}}>
        <Typography variant='h4' sx={{ ...headingStyle }}>Houses</Typography>
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
        <Typography variant='h4' sx={{ ...headingStyle }}>Treacheries</Typography>
        <Box sx={{...boxStyle}}>
            <ExpansionButton expansion={Expansion.TleilaxuAndIxian} onClick={() => {handleExpansionClick(Expansion.TleilaxuAndIxian)}}></ExpansionButton>
            <ExpansionButton expansion={Expansion.ChoamAndRichese} onClick={() => {handleExpansionClick(Expansion.ChoamAndRichese)}}></ExpansionButton>
            <ExpansionButton expansion={Expansion.EcazAndMoritani} onClick={() => {handleExpansionClick(Expansion.EcazAndMoritani)}}></ExpansionButton>
          </Box>
        <Box sx={{ ...menuButtonStyles }}>
          <GameMenuButton text="Back" width= "20vh" onClick={() => router.push('/')}></GameMenuButton>
          <GameMenuButton text="Start" width= "20vh" onClick={() => router.push(
            {
              pathname: '/newgame',
              query: { houses: JSON.stringify(houseQuery()), expansions: JSON.stringify(expansionQuery())}
            })}></GameMenuButton>
        </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
}

export default Setup;