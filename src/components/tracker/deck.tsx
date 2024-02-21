import { CardGroup } from "@/classes/cardGroup";
import { House } from "@/classes/house";
import { Treachery } from "@/classes/treachery";
import { TreacheryCategory } from "@/classes/treacheryCategory";
import { mainBackground, richeseGrey, treacheryBlue, treacheryGreen, treacheryRed, treacheryTan } from "@/settings/colours";
import { Box, Typography } from "@mui/material";
import * as React from "react";
import { CardBanner } from "./cardbanner";

const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    minHeight: '80vh',
}

const sectionTitleStyle = {
    minWidth: '40vw',
    mt: 1,
    mb: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
}



type deckProps = {
    treacheryCards: Treachery[],
    players: House[],
    onUpdate: () => void,
}

function deckSection (group: CardGroup) {
    return (
        <Box>
            <Box sx={{ backgroundColor: group.colour, ...sectionTitleStyle }}>
                <Typography variant="h3" sx={{ p: 1, color: mainBackground }}>{group.name}</Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
                {group.cards.map((card) => {
                    // eslint-disable-next-line react/jsx-key
                    return <CardBanner card={card}></CardBanner>
                })}
            </Box>
        </Box>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Deck ({treacheryCards, players, onUpdate}: deckProps) {
    const groupData: ({name: string, colour: string, categories: TreacheryCategory[]})[] = [
        ({name: "Weapon", colour: treacheryRed, categories: TreacheryCategory.WeaponCategories}),
        ({name: "Defense", colour: treacheryBlue, categories: TreacheryCategory.DefenseCategories}),
        ({name: "Special", colour: treacheryGreen, categories: TreacheryCategory.SpecialCategories}),
        ({name: "Worthless", colour: treacheryTan, categories: TreacheryCategory.WorthlessCategories}),
    ];

    if (players.includes(House.Richese)) {
        groupData.push(({name: "Richese", colour: richeseGrey, categories: TreacheryCategory.RicheseCategories}));
    }

    const cardGroups = groupData.map((group, key) => {
        const cards = treacheryCards.filter((card) => {
            const isInCategory = group.categories.includes(card.category);
            return isInCategory;
        })

        console.log('Cards for group', group.name, ':', cards);
        const cardGroup = new CardGroup(group.name, group.colour, cards);
        return { key: key, value: cardGroup };
    })

    console.log(cardGroups);

    return (
        <>
            <Box sx={{...bodyStyle}}>
                {cardGroups.map((group) => deckSection(group.value))}
            </Box>
        </>
    )
}