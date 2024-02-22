import { CardGroup } from "@/classes/cardGroup";
import { mainBackground } from "@/settings/colours";
import { Box, Typography } from "@mui/material";
import * as React from "react";
import { CardInfo } from "./CardInfo";
import { Treachery } from "@/classes/treachery";
import { House } from "@/classes/house";
import { UnknownTreachery } from "@/classes/unknownTreachery";

const sectionTitleStyle = {
    minWidth: '40vw',
    mt: 1,
    mb: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
}

type sectionProps = {
    group: CardGroup;
    renderHouse: boolean;
    renderDiscard: boolean;
    onUpdate?: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
    players: House[];
}

export function CardSection ({group, renderHouse, renderDiscard, onUpdate, players}: sectionProps) {
    return (
        <Box>
            <Box sx={{ backgroundColor: group.colour, ...sectionTitleStyle }}>
                <Typography variant="h3" sx={{ p: 1, color: mainBackground }}>{group.name}</Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
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
            </Box>
        </Box>
    )
}