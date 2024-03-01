import { Treachery } from "@/classes/treachery";
import { mainBackground } from "@/settings/colours";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import * as React from "react";
import CardMenu from "./cardMenu";
import { House } from "@/classes/house";
import { UnknownTreachery } from "@/classes/unknownTreachery";
import UnknownCardMenu from "./unknownCardMenu";
import { LocationType } from "@/classes/locationType";

const cardStyle = {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    height: 'inherit', 
    width: 'inherit', 
}

const cardTextStyle = {
    color: mainBackground, 
    fontFamily: 'Copperplate',
    textAlign: 'left'
}

interface cardProps {
    card?: Treachery;
    unknownCard?: UnknownTreachery;
    renderHouse: boolean;
    renderDiscard: boolean;
    onUpdate?: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
    players: House[];
}

export function CardInfo ({card, unknownCard, renderHouse, renderDiscard, onUpdate, players}: cardProps) {
    const imageFilePath = 
        card ? `/assets/cards/banners/${card.category.banner}` : unknownCard ? `/assets/cards/banners/${unknownCard.banner}` : '';
    
    const largest = useMediaQuery('(min-width:1200px)');
    const medium = useMediaQuery('(min-width:700px)');
    const imageScale = largest ? 1 : medium ? 0.75 : 0.5; 

    const cardIconSize = 67 * imageScale;
    const discardIconSize = 64 * imageScale;
    const cardHeight = 90 * imageScale;
    const cardPadding = largest ? 1 : medium ? 0.5 : 0; 
    const iconMargins = largest ? 2 : medium ? 1.5 : 1; 
    const cardWidth = 70;

    const titleFontsize = (largest ? 30 : medium ? 22 : 16)+'px'; 
    const subTitleFontsize = (largest ? 12 : medium ? 10 : 8)+'px'; 

    const player = card ? card.player : unknownCard ? unknownCard.player : undefined;
    const isDiscarded = card?.locationType.id == LocationType.Discard.id || unknownCard?.locationType.id == LocationType.DiscardUnknown.id;
    const hideHouseIfUnknown = unknownCard ? unknownCard.locationType.id == LocationType.Revealed.id : false;

    return (
        <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <Paper
                sx={{
                    backgroundImage: `url('${imageFilePath}')`,
                    height: cardHeight+"px",
                    width: cardWidth+"%",
                    mb: largest ? .5 : medium ? 0.25 : 0.125,
                }}
                >
                {card ? 
                <CardMenu card={card} onUpdate={onUpdate} renderDiscard={renderDiscard} players={players} renderHouse={renderHouse}>
                    <Box sx={{...cardStyle, p: cardPadding}}>
                        <Box>
                            <Typography sx={{ ...cardTextStyle, fontSize: titleFontsize }} variant="h4">{card.name}</Typography>
                            <Typography sx={{ ...cardTextStyle, fontSize: subTitleFontsize, pl: 0.25 }} variant="h4">{card.category.name}</Typography>
                        </Box>
                        <img src={ `/assets/cards/icons/${card.category.icon}` } height={cardIconSize} width={cardIconSize}/>
                    </Box>
                </CardMenu> : <></>}
                {unknownCard ? 
                <UnknownCardMenu unknownCard={unknownCard} onUpdate={onUpdate} players={players}>
                    <Box sx={{...cardStyle, p: cardPadding}}>
                        <Typography sx={{ ...cardTextStyle }} variant="h4">{unknownCard.name}</Typography>
                    </Box>
                </UnknownCardMenu> : <></>}
            </Paper>
            {renderHouse ? 
            (
                <Box sx={{ml: iconMargins }}>
                    {
                    
                        card?.hasAuctionMarker ?
                        <img src={ `/assets/cards/auction.png` } height={cardIconSize} width={cardIconSize}/>
                        :
                            player != undefined && !hideHouseIfUnknown ?
                            <img src={ `/assets/houses/${player.icon}` } height={cardIconSize} width={cardIconSize}/>
                            : <Box height={cardIconSize} width={cardIconSize}/>
                    }
                </Box>
            ) : <></>
            }
            {renderDiscard ? 
            (
                <Box sx={{ml: iconMargins }}>
                    {
                        isDiscarded ?
                        <img src={ `/assets/cards/discard overlay.png` } height={discardIconSize} width={discardIconSize}/>
                        :
                            card?.hasChoamMarker || unknownCard?.hasChoamMarker ?
                            <img src={ `/assets/cards/choam.png` } height={discardIconSize} width={discardIconSize}/>
                        : <Box height={discardIconSize} width={discardIconSize}/>
                    }
                </Box>
            ) : <></>
            }
        </Box>
    )
}