import { Treachery } from "@/classes/treachery";
import { mainBackground } from "@/settings/colours";
import { Box, Paper, Typography } from "@mui/material";
import * as React from "react";

type cardProps = {
    card: Treachery;
    renderHouse: boolean;
    renderDiscard: boolean;
}

const cardStyle = {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    mb: .5,
    p: 2,
}

export function CardBanner ({card, renderHouse, renderDiscard}: cardProps) {
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
                        ...cardStyle
                    }}
                    >
                        <Typography sx={{ color: mainBackground }} variant="h4">{card.name}</Typography>
                        <img src={ `/assets/cards/icons/${card.category.icon}` } height={imageSize} width={imageSize}/>
                </Paper>
                <Box sx={{ ml: 2}}>
                    {renderHouse ? 
                        (
                            card.player != undefined ?
                            <img src={ `/assets/houses/${card.player.icon}` } height={imageSize} width={imageSize}/>
                            : <Box height={imageSize} width={imageSize}/>
                        ) : <></>
                    }
                </Box>
                <Box sx={{ ml: 2}}>
                    {renderDiscard ? 
                        ( 
                            card.isDiscarded ?
                            <img src={ `/assets/cards/discard overlay.png` } height={53} width={43}/>
                            : <Box height={53} width={43}/>
                        ) : <></>
                    }
                </Box>
            </Box>
        </>
    )
}