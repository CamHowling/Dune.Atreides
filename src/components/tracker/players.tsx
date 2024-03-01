import { CardGroup } from "@/classes/cardGroup";
import { House } from "@/classes/house";
import { Treachery } from "@/classes/treachery";
import { Box, useMediaQuery } from "@mui/material";
import * as React from "react";
import { CardSection } from "./cardSection";
import { UnknownTreachery } from "@/classes/unknownTreachery";
import { LocationType } from "@/classes/locationType";
import { atreides, richeseGrey, mainBackground } from "@/settings/colours";
import { GameMenuButton } from "../gameMenuButton";
import { useState } from "react";

const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent:'center',
    alignItems: 'center',
    minHeight: '80vh',
}

const atreidesStyle = {
    backgroundColor: atreides,
    '&:hover': {
        backgroundColor: atreides,
    },
    '&:disabled': {
        backgroundColor: richeseGrey,
        color: mainBackground,
    },
    m: 0,
    mt: 1,
}

const centerStyle = {
    alignItems: 'center', 
    justifyContent: 'center',
    display: 'flex'
}

interface PlayerProps {
    treacheryCards: Treachery[],
    unknownTreacheryCards: UnknownTreachery[],
    players: House[],
    onUpdate: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
    addHarkonenTreachery: (player: House) => void;
    addIxianTreachery: () => void;
}

export function Players ({treacheryCards, unknownTreacheryCards, players, onUpdate, addHarkonenTreachery, addIxianTreachery}: PlayerProps) {
    const [showShared, setShowShared] = useState<boolean>(false);

    const handleShareClick = () => {
        setShowShared(!showShared);
    }
    
    const cardGroups = players.map((player, key) => {
        const unknownCards = unknownTreacheryCards.filter((unknownCard) => {
            const result = 
                unknownCard?.player?.id == player.id 
                && unknownCard.locationType.id != LocationType.Revealed.id
                && (showShared == false || unknownCard.isShared);

            return result;
        })

        const cards = treacheryCards.filter((card) => {
            const result =  
                card?.player?.id == player?.id
                && (showShared == false || card.isShared);
            
            return result;
        })

        const cardGroup = new CardGroup(player.name, player.colour, cards, unknownCards);
        return { key: key, value: cardGroup };
    })

    const largest = useMediaQuery('(min-width:1200px)');
    const medium = useMediaQuery('(min-width:700px)');
    const cardsWidth = (largest ? 60 : medium ? 80 : 90);

    return (
        <Box sx={{...bodyStyle}}>
                <Box sx={{ ...centerStyle, width: '100%'}}>
                    <GameMenuButton 
                        text={showShared ? "Show All Cards"  : "Show Shared Cards" }
                        sxOverride={{...atreidesStyle, width: (cardsWidth)+'vw'}} 
                        onClick={() => {handleShareClick()}}>                           
                    </GameMenuButton>
                </Box>
            {cardGroups.map((group) => {
                return (
                    !showShared ||
                    (group.value.cards!.length > 0 || group.value.unknownCards!.length > 0) ? 
                        <CardSection  
                            key={group.key}
                            group={group.value}
                            renderHouse={false}
                            renderDiscard={true}
                            onUpdate={onUpdate}
                            players={players} 
                            addHarkonenTreachery={(player: House) => {addHarkonenTreachery(player)}}
                            addIxianTreachery={() => {addIxianTreachery()}}>
                        </CardSection>
                    : <></>
                );
            }
        )}
        </Box>
    )
}