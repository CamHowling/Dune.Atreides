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

const ClearData = () => {
    localStorage.removeItem('players');
    localStorage.removeItem('cards');
    localStorage.removeItem('unknownCards');
}

const MainMenu = () => {
    ClearData();
    router.push('/');
};

const NewGame = () => {
    ClearData();
    router.push('/setup');
};

export function OptionsMenu () {
    return (
        <>
            <Box sx={{...bodyStyle}}>
                <GameMenuButton text="Main Menu" onClick={() => MainMenu()}></GameMenuButton>
                <GameMenuButton text="New Game" onClick={() => NewGame()}></GameMenuButton>
            </Box>
        </>
    )
}