import { CardGroup } from "@/classes/cardGroup";
import { House } from "@/classes/house";
import { Treachery } from "@/classes/treachery";
import { TreacheryCategory } from "@/classes/treacheryCategory";
import { footerTransitionMiddle, richeseGrey, treacheryBlue, treacheryGreen, treacheryRed, treacheryTan } from "@/settings/colours";
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

interface DeckProps {
    treacheryCards: Treachery[],
    unknownTreacheryCards: UnknownTreachery[],
    players: House[],
    onUpdate: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
}

export function Discard ({treacheryCards, unknownTreacheryCards, players, onUpdate}: DeckProps) {
    const groupData: ({name: string, colour: string, categories: TreacheryCategory[]})[] = [
        ({name: "Weapon", colour: treacheryRed, categories: TreacheryCategory.WeaponCategories}),
        ({name: "Defense", colour: treacheryBlue, categories: TreacheryCategory.DefenseCategories}),
        ({name: "Special", colour: treacheryGreen, categories: TreacheryCategory.SpecialCategories}),
        ({name: "Worthless", colour: treacheryTan, categories: TreacheryCategory.WorthlessCategories}),
    ];

    const playerNames = players.flatMap((player) => {
        return player.name;
      });

    if (playerNames.includes(House.Richese.name)) {
        groupData.push(({name: "Richese", colour: richeseGrey, categories: TreacheryCategory.RicheseCategories}));
    }

    const cardGroups = groupData.map((group, key) => {
        const groupCategoryIds = group.categories.flatMap((category) => {
            return category.id;
        });

        const cards = treacheryCards.filter((card) => {
            const isInCategory = groupCategoryIds.includes(card.category.id);
            const isDiscarded = card.locationType.id == LocationType.Discard.id || card.locationType.id == LocationType.DiscardUnknown.id;
            return isInCategory && isDiscarded;
        })
        
        const cardGroup = new CardGroup(group.name, group.colour, cards);
        return { key: key, value: cardGroup };
    })

    const unknownCards = unknownTreacheryCards.filter((card) => {
        const isDiscarded = card.locationType.id == LocationType.Discard.id || card.locationType.id == LocationType.DiscardUnknown.id;
        return isDiscarded;
    });

    const unknownGroup = { key: 'unknown', value: new CardGroup('Unknown', footerTransitionMiddle, undefined, unknownCards)};

    return (
        <Box sx={{...bodyStyle}}>
            {cardGroups.map((group) => {
                return (
                group.value.cards != undefined && group.value.cards.length > 0 ? 
                    <CardSection  
                        key={group.key}
                        group={group.value}
                        renderHouse={true}
                        renderDiscard={false}
                        onUpdate={onUpdate}
                        players={players}>
                    </CardSection>
                : <Box key={group.key}></Box> )
            }
        )}
        {
        unknownCards.length != undefined && unknownCards.length > 0 ?
        <CardSection  
            key={unknownGroup.key}
            group={unknownGroup.value}
            renderHouse={true}
            renderDiscard={false}
            onUpdate={onUpdate} 
            players={players}>
        </CardSection> : <></> }
        </Box>
    )
}