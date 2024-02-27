import { Box } from "@mui/material";
import router from "next/router";
import * as React from "react";
import { GameMenuButton } from "../gameMenuButton";

const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    minHeight: '80vh',
  }

const NewGame = () => {
    localStorage.removeItem('players');
    localStorage.removeItem('cards');
    localStorage.removeItem('unknownCards');
    router.push('/setup');
};

export function OptionsMenu () {
    return (
        <>
            <Box sx={{...bodyStyle}}>
                <GameMenuButton text="Main Menu" onClick={() => router.push('/')}></GameMenuButton>
                <GameMenuButton text="New Game" onClick={() => NewGame()}></GameMenuButton>
                <GameMenuButton text="Help" onClick={() => {}}></GameMenuButton>
                {/* <GameMenuButton text="Save" onClick={() => {}}></GameMenuButton>
                <GameMenuButton text="Load" onClick={() => {}}></GameMenuButton> */}
            </Box>
        </>
    )
}