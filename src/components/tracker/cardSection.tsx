import { CardGroup } from "@/classes/cardGroup";
import { mainBackground } from "@/settings/colours";
import { Box, Typography } from "@mui/material";
import * as React from "react";
import { CardBanner } from "./cardbanner";

const sectionTitleStyle = {
    minWidth: '40vw',
    mt: 1,
    mb: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
}

type sectionProps = {
    group: CardGroup,
    renderHouse: boolean,
    renderDiscard: boolean,
    onUpdate?: () => void,
}

export function CardSection ({group, renderHouse, renderDiscard}: sectionProps) {
    return (
        <Box>
            <Box sx={{ backgroundColor: group.colour, ...sectionTitleStyle }}>
                <Typography variant="h3" sx={{ p: 1, color: mainBackground }}>{group.name}</Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
                {group.cards.map((card) => {
                    // eslint-disable-next-line react/jsx-key
                    return <CardBanner card={card} renderHouse={renderHouse} renderDiscard={renderDiscard}></CardBanner>
                })}
            </Box>
        </Box>
    )
}