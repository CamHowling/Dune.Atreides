import { CardGroup } from "@/classes/cardGroup";
import { House } from "@/classes/house";
import { Treachery } from "@/classes/treachery";
import { TreacheryCategory } from "@/classes/treacheryCategory";
import { footerTransitionMiddle, harkonen, richeseGrey, treacheryBlue, treacheryGreen, treacheryRed, treacheryTan } from "@/settings/colours";
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

type deckProps = {
    treacheryCards: Treachery[],
    unknownTreacheryCards: UnknownTreachery[],
    players: House[],
    onUpdate: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
    addHarkonenTreachery: (player: House) => void;
}

export function Deck ({treacheryCards, unknownTreacheryCards, players, onUpdate, addHarkonenTreachery}: deckProps) {
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
            return isInCategory;
        })

        const cardGroup = new CardGroup(group.name, group.colour, cards);
        return { key: key, value: cardGroup };
    })

    const nonHarkonenUnknownCards = unknownTreacheryCards.filter((card) => {
        return card?.originHouse?.name != House.Harkonen.name;
    });

    const harkonenUnknownCards = unknownTreacheryCards.filter((card) => {
        return card?.originHouse?.name == House.Harkonen.name;
    })

    const unknownGroup = { key: 'unknown', value: new CardGroup('Unknown', footerTransitionMiddle, undefined, nonHarkonenUnknownCards)};
    const harkonenGroup = { key: 'Harkonen', value: new CardGroup('Harkonen', harkonen, undefined, harkonenUnknownCards)};


    return (
        <Box sx={{...bodyStyle}}>
            {cardGroups.map((group) => {
                return (
                    <CardSection  
                        key={group.key}
                        group={group.value}
                        renderHouse={true}
                        renderDiscard={true}
                        onUpdate={onUpdate} 
                        players={players}
                        >
                    </CardSection>
                );
            }
        )}
        {
        nonHarkonenUnknownCards.length != undefined && nonHarkonenUnknownCards.length > 0 ?
        <CardSection  
            key={unknownGroup.key}
            group={unknownGroup.value}
            renderHouse={true}
            renderDiscard={true}
            onUpdate={onUpdate} 
            players={players}>
        </CardSection> : <></> }
        {playerNames.includes(House.Harkonen.name) ? 
        <CardSection  
            key={harkonenGroup.key}
            group={harkonenGroup.value}
            renderHouse={true}
            renderDiscard={true}
            onUpdate={onUpdate} 
            players={players}
            addHarkonenTreachery={(player: House) => {addHarkonenTreachery(player)}}>
        </CardSection> : <></>}
        </Box>
    )
}