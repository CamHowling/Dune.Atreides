import { Treachery } from "@/classes/treachery";
import { mainBackground } from "@/settings/colours";
import { Box, Paper, Typography } from "@mui/material";
import * as React from "react";
import CardMenu from "./cardMenu";
import { House } from "@/classes/house";

type cardProps = {
    card: Treachery;
    renderHouse: boolean;
    renderDiscard: boolean;
    onUpdate?: (card: Treachery) => void;
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

export function CardInfo ({card, renderHouse, renderDiscard, onUpdate, players}: cardProps) {
    const imageFilePath = `/assets/cards/banners/${card.category.banner}`;
    const imageSize = 48;
    const cardHeight = 80;
    const cardWidth = 70;

    return (
        <>
            <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <Paper
                    sx={{
                        backgroundImage: `url('${imageFilePath}')`,
                        height: cardHeight+"px",
                        width: cardWidth+"%",
                        mb: .5,
                    }}
                    >
                    <CardMenu card={card} onUpdate={onUpdate} renderDiscard={renderDiscard} players={players} renderHouse={renderHouse}>
                        <Box sx={{...cardStyle}}>
                            <Typography sx={{ color: mainBackground }} variant="h4">{card.name}</Typography>
                            <img src={ `/assets/cards/icons/${card.category.icon}` } height={imageSize} width={imageSize}/>
                        </Box>
                    </CardMenu>
                </Paper>
                {renderHouse ? 
                (
                    <Box sx={{ ml: 2}}>
                        {
                            card.player != undefined ?
                            <img src={ `/assets/houses/${card.player.icon}` } height={imageSize} width={imageSize}/>
                            : <Box height={imageSize} width={imageSize}/>
                        }
                    </Box>
                ) : <></>
                }
                {renderDiscard ? 
                (
                    <Box sx={{ ml: 2}}>
                        {
                            card.isDiscarded ?
                            <img src={ `/assets/cards/discard overlay.png` } height={53} width={43}/>
                            : <Box height={53} width={43}/>
                        }
                    </Box>
                ) : <></>
                }
            </Box>
        </>
    )
}