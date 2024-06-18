import { CardGroup } from "@/classes/cardGroup";
import { footerTransitionMiddle, Harkonnen, ixian, mainBackground, richeseGrey } from "@/settings/colours";
import { Box, Typography, useMediaQuery } from "@mui/material";
import * as React from "react";
import { CardInfo } from "./CardInfo";
import { Treachery } from "@/classes/treachery";
import { House } from "@/classes/house";
import { UnknownTreachery } from "@/classes/unknownTreachery";
import { GameMenuButton } from "../gameMenuButton";
import { LocationType } from "@/classes/locationType";

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

const HarkonnenStyle = {
    backgroundColor: Harkonnen,
    '&:hover': {
        backgroundColor: Harkonnen,
    },
    '&:disabled': {
        backgroundColor: richeseGrey,
        color: mainBackground,
    },
    m: 1,
    mt: 0,
}

const unknownStyle = {
    backgroundColor: footerTransitionMiddle,
    '&:hover': {
        backgroundColor: footerTransitionMiddle,
    },
    '&:disabled': {
        backgroundColor: richeseGrey,
        color: mainBackground,
    },
    m: 1,
    mt: 0,
}

const ixianStyle = {
    backgroundColor: ixian,
    '&:hover': {
        backgroundColor: ixian,
    },
    '&:disabled': {
        backgroundColor: richeseGrey,
        color: mainBackground,
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
    hideDiscarded?: boolean;
    onUpdate?: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
    players: House[];
    addHarkonnenTreachery?: (player: House) => void;
    addIxianTreachery?: () => void;
    addUnknownTreachery?: () => void;
}

export function CardSection ({group, renderHouse, renderDiscard, hideDiscarded, onUpdate, players, addHarkonnenTreachery, addIxianTreachery, addUnknownTreachery}: sectionProps) {
    const Harkonnen = players.find((player) => { return player.id == House.Harkonnen.id});
    const ixian = players.find((player) => { return player.id == House.Ixian.id});

    const handleHarkonnenClick = () => {
        if (Harkonnen != undefined && addHarkonnenTreachery != undefined) {
            addHarkonnenTreachery(Harkonnen);
        }
    }

    const handleIxianClick = () => {
        if (ixian != undefined && addIxianTreachery != undefined) {
            addIxianTreachery();
        }
    }
    const handleUnknownClick = () => {
        if (addUnknownTreachery != undefined) {
            addUnknownTreachery();
        }
    }

    //review deck view behavior
    const sortTreacheries = (cards: Treachery[]) => {
        if (!renderDiscard || cards.length == 0) return cards; 

        let sortedCards = cards.filter((card) => card.locationType.id != LocationType.Discard.id);
        if (hideDiscarded) return sortedCards; 

        sortedCards = sortedCards.concat(cards.filter(card => card.locationType.id == LocationType.Discard.id))
        return sortedCards;
    }

    const filterUnknownTreacheries =(unknownCards: UnknownTreachery[]) => {     
        if (!hideDiscarded || unknownCards.length == 0) return unknownCards; 

        const filteredCards = unknownCards.filter(card => card.locationType != LocationType.DiscardUnknown)
        return filteredCards;
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
                group.name == House.Harkonnen.name && renderDiscard ? 
                <Box sx={{ ...centerStyle, width: '100%'}}>
                    <GameMenuButton 
                        text="Draw Treachery" 
                        sxOverride={{...HarkonnenStyle, width: (cardsWidth-2)+'vw'}} 
                        disabled={Harkonnen?.isHandFull()} 
                        onClick={() => {handleHarkonnenClick()}}>
                    </GameMenuButton>
                </Box>
                :
                group.name == House.Ixian.name && renderDiscard ? 
                <Box sx={{ ...centerStyle, width: '100%'}}>
                    <GameMenuButton 
                        text="Draw Treachery" 
                        sxOverride={{...ixianStyle, width: (cardsWidth-2)+'vw'}} 
                        disabled={ixian?.isHandFull()} 
                        onClick={() => {handleIxianClick()}}>
                    </GameMenuButton>
                </Box>
                :
                group.unknownCards && renderDiscard && renderHouse ? 
                <Box sx={{ ...centerStyle, width: '100%'}}>
                    <GameMenuButton 
                        text="Draw Unknown" 
                        sxOverride={{...unknownStyle, width: (cardsWidth-2)+'vw'}} 
                        onClick={() => {handleUnknownClick()}}>
                    </GameMenuButton>
                </Box>
                : <></>
            }
            <Box sx={{ mb: 3 }}>            
                {group.cards ? sortTreacheries(group.cards)
                    .map((card) => {    
                    return (
                        //The key must be randomized to prevent react from scrolling on re-render when the discard event fires
                        <CardInfo 
                            key={(Math.random() * 1000).toString() + card.id.toString()}
                            card={card}
                            renderHouse={renderHouse}
                            renderDiscard={renderDiscard}
                            onUpdate={onUpdate} 
                            players={players}>
                        </CardInfo>
                    );
                }) : <></> }
                {group.unknownCards ? filterUnknownTreacheries(group.unknownCards)
                    .map((unknownCard) => {    
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