import { CardGroup } from "@/classes/cardGroup";
import { harkonen, mainBackground } from "@/settings/colours";
import { Box, Typography, useMediaQuery } from "@mui/material";
import * as React from "react";
import { CardInfo } from "./CardInfo";
import { Treachery } from "@/classes/treachery";
import { House } from "@/classes/house";
import { UnknownTreachery } from "@/classes/unknownTreachery";
import { GameMenuButton } from "../gameMenuButton";

const sectionBoxStyle = {
    minWidth: '40vw',
    mt: 1,
    mb: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
}

const sectionTitleStyle = {
    p: 1, 
    color: mainBackground, 
    fontFamily: 'Copperplate',
}

const harkonenStyle = {
    backgroundColor: harkonen,
    '&:hover': {
        backgroundColor: harkonen,
    },
    m: 1,
    mt: 0,
}

const centerStyle = {
    alignItems: 'center', 
    justifyContent: 'center',
    display: 'flex'
}

interface sectionProps {
    group: CardGroup;
    renderHouse: boolean;
    renderDiscard: boolean;
    onUpdate?: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
    players: House[];
    addHarkonenTreachery?: (player: House) => void;
}

export function CardSection ({group, renderHouse, renderDiscard, onUpdate, players, addHarkonenTreachery}: sectionProps) {
    const harkonen = players.find((player) => { return player.id == House.Harkonen.id});

    const handleHarkonenClick = () => {
        if (harkonen != undefined && addHarkonenTreachery != undefined) {
            addHarkonenTreachery(harkonen);
        }
    }

    const largest = useMediaQuery('(min-width:1200px)');
    const medium = useMediaQuery('(min-width:700px)');
    const cardsWidth = (largest ? 60 : medium ? 80 : 90);

    return (
        <Box sx={{     
            width: cardsWidth+'vw', 
        }}>
            <Box sx={{ backgroundColor: group.colour, ...sectionBoxStyle }}>
                <Typography variant="h3" sx={{ ...sectionTitleStyle }}>{group.name.toUpperCase()}</Typography>
            </Box>
            {   
                group.name == House.Harkonen.name && renderDiscard ? 
                <Box sx={{ ...centerStyle, width: '100%'}}>
                    <GameMenuButton 
                        text="Draw Treachery" 
                        sxOverride={{...harkonenStyle, width: (cardsWidth-2)+'vw'}} 
                        disabled={harkonen?.isHandFull()} 
                        onClick={() => {handleHarkonenClick()}}>
                    </GameMenuButton>
                </Box>
                : <></>
            }
            <Box sx={{ mb: 3 }}>            
                {group.cards ? group.cards.map((card) => {    
                    return (
                        <CardInfo 
                            key={card.id}
                            card={card}
                            renderHouse={renderHouse}
                            renderDiscard={renderDiscard}
                            onUpdate={onUpdate} 
                            players={players}>
                        </CardInfo>
                    );
                }) : <></> }
                {group.unknownCards ? group.unknownCards.map((unknownCard) => {    
                    return (
                        <CardInfo 
                            key={unknownCard.id}
                            unknownCard={unknownCard}
                            renderHouse={renderHouse}
                            renderDiscard={renderDiscard}
                            onUpdate={onUpdate} 
                            players={players}>
                        </CardInfo>
                    );
                }) : <></> }
  
            </Box>
        </Box>
    )
}