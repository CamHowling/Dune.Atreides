import { CardGroup } from "@/classes/cardGroup";
import { House } from "@/classes/house";
import { Treachery } from "@/classes/treachery";
import { Box } from "@mui/material";
import * as React from "react";
import { CardSection } from "./cardSection";
import { UnknownTreachery } from "@/classes/unknownTreachery";
import { LocationType } from "@/classes/locationType";

const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    minHeight: '80vh',
}

interface PlayerProps {
    treacheryCards: Treachery[],
    unknownTreacheryCards: UnknownTreachery[],
    players: House[],
    onUpdate: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
    addHarkonenTreachery: (player: House) => void;
}

export function Players ({treacheryCards, unknownTreacheryCards, players, onUpdate, addHarkonenTreachery}: PlayerProps) {
    const cardGroups = players.map((player, key) => {
        const unknownCards = unknownTreacheryCards.filter((unknownCard) => {
            return unknownCard?.player?.id == player.id && unknownCard.locationType.id != LocationType.Revealed.id;
        })

        const cards = treacheryCards.filter((card) => {
            return card?.player?.id == player?.id;
        })

        const cardGroup = new CardGroup(player.name, player.colour, cards, unknownCards);
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
                        players={players} 
                        addHarkonenTreachery={(player: House) => {addHarkonenTreachery(player)}}>
                    </CardSection>
                );
            }
        )}
        </Box>
    )
}