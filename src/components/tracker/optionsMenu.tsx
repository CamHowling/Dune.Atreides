import { Box } from "@mui/material";
import router from "next/router";
import * as React from "react";
import { GameMenuButton } from "../gameMenuButton";
import { LoadGameButton } from "./loadGame";

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
    localStorage.removeItem('note');
}

const SaveData = () => {
    const players = localStorage.getItem('players');
    const cards = localStorage.getItem('cards');
    const unknownCards = localStorage.getItem('unknownCards');
    const note = localStorage.getItem('note');

    const items = {
        players,
        cards,
        unknownCards,
        note
    }

    const fileName = `Atreides ${new Date().toLocaleString()}`;
    const data = JSON.stringify(items);
    const blob = new Blob([data], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const MainMenu = () => {
    ClearData();
    router.push('/');
};

const NewGame = () => {
    ClearData();
    router.push('/setup');
};

const RouterFunction = () => {
    router.reload();
};

export function OptionsMenu () {
    return (
        <>
            <Box sx={{...bodyStyle}}>
                <GameMenuButton text="Main Menu" onClick={() => MainMenu()}></GameMenuButton>
                <GameMenuButton text="New Game" onClick={() => NewGame()}></GameMenuButton>
                <GameMenuButton text="Save Game" onClick={() => SaveData()}></GameMenuButton>
                <LoadGameButton RouterFunction={RouterFunction}></LoadGameButton>
            </Box>

        </>
    )
}