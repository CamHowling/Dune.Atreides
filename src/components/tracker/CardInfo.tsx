import { Treachery } from "@/classes/treachery";
import { mainBackground } from "@/settings/colours";
import { Box, Paper, Typography } from "@mui/material";
import * as React from "react";
import CardMenu from "./cardMenu";
import { House } from "@/classes/house";
import { UnknownTreachery } from "@/classes/unknownTreachery";
import UnknownCardMenu from "./unknownCardMenu";

type cardProps = {
    card?: Treachery;
    unknownCard?: UnknownTreachery;
    renderHouse: boolean;
    renderDiscard: boolean;
    onUpdate?: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
    players: House[];
}

const cardStyle = {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    p: 2,
    height: 'inherit', 
    width: 'inherit', 
}

export function CardInfo ({card, unknownCard, renderHouse, renderDiscard, onUpdate, players}: cardProps) {
    const imageFilePath = 
        card ? `/assets/cards/banners/${card.category.banner}` : unknownCard ? `/assets/cards/banners/${unknownCard.banner}` : '';
    
    const imageSize = 48;
    const cardHeight = 80;
    const cardWidth = 70;

    const player = card ? card.player : unknownCard ? unknownCard.player : undefined;
    const isDiscarded = card ? card.isDiscarded : unknownCard ? unknownCard.isDiscarded : undefined;
    const hideHouseIfUnknown = unknownCard ? unknownCard.isRevealed : false;

    return (
        <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <Paper
                sx={{
                    backgroundImage: `url('${imageFilePath}')`,
                    height: cardHeight+"px",
                    width: cardWidth+"%",
                    mb: .5,
                }}
                >
                {card ? 
                <CardMenu card={card} onUpdate={onUpdate} renderDiscard={renderDiscard} players={players} renderHouse={renderHouse}>
                    <Box sx={{...cardStyle}}>
                        <Typography sx={{ color: mainBackground }} variant="h4">{card.name}</Typography>
                        <img src={ `/assets/cards/icons/${card.category.icon}` } height={imageSize} width={imageSize}/>
                    </Box>
                </CardMenu> : <></>}
                {unknownCard ? 
                <UnknownCardMenu unknownCard={unknownCard} onUpdate={onUpdate} players={players}>
                    <Box sx={{...cardStyle}}>
                        <Typography sx={{ color: mainBackground }} variant="h4">{unknownCard.name}</Typography>
                    </Box>
                </UnknownCardMenu> : <></>}
            </Paper>
            {renderHouse ? 
            (
                <Box sx={{ ml: 2}}>
                    {
                    
                        player != undefined && !hideHouseIfUnknown ?
                        <img src={ `/assets/houses/${player.icon}` } height={imageSize} width={imageSize}/>
                        : <Box height={imageSize} width={imageSize}/>
                    }
                </Box>
            ) : <></>
            }
            {renderDiscard ? 
            (
                <Box sx={{ ml: 2}}>
                    {
                        isDiscarded ?
                        <img src={ `/assets/cards/discard overlay.png` } height={53} width={43}/>
                        : <Box height={53} width={43}/>
                    }
                </Box>
            ) : <></>
            }
        </Box>
    )
}