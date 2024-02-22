import { CardGroup } from "@/classes/cardGroup";
import { House } from "@/classes/house";
import { Treachery } from "@/classes/treachery";
import { Box } from "@mui/material";
import * as React from "react";
import { CardSection } from "./cardSection";
import { UnknownTreachery } from "@/classes/unknownTreachery";

const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    minHeight: '80vh',
}

type playerProps = {
    treacheryCards: Treachery[],
    unknownTreacheryCards: UnknownTreachery[],
    players: House[],
    onUpdate: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Players ({treacheryCards, unknownTreacheryCards, players, onUpdate}: playerProps) {
    const cardGroups = players.map((player, key) => {
        const cards = treacheryCards.filter((card) => {
            return card.player == player;
        })

        const cardGroup = new CardGroup(player.name, player.colour, cards);
        return { key: key, value: cardGroup };
    })

    return (
        <Box sx={{...bodyStyle}}>
            {cardGroups.map((group) => {
                return (
                    <CardSection  
                        key={group.key} 
                        group={group.value} 
                        renderHouse={false} 
                        renderDiscard={true}
                        onUpdate={onUpdate}
                        players={players}>
                    </CardSection>
                );
            }
        )}
        </Box>
    )
}