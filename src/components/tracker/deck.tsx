import { CardGroup } from "@/classes/cardGroup";
import { House } from "@/classes/house";
import { Treachery } from "@/classes/treachery";
import { TreacheryCategory } from "@/classes/treacheryCategory";
import { atreides, footerTransitionMiddle, harkonen, ixian, mainBackground, richeseGrey, treacheryBlue, treacheryGreen, treacheryRed, treacheryTan } from "@/settings/colours";
import { Box, useMediaQuery } from "@mui/material";
import * as React from "react";
import { CardSection } from "./cardSection";
import { UnknownTreachery } from "@/classes/unknownTreachery";
import { GameMenuButton } from "../gameMenuButton";
import { useState } from "react";

const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    minHeight: '80vh',
}

const atreidesStyle = {
    backgroundColor: atreides,
    '&:hover': {
        backgroundColor: atreides,
    },
    '&:disabled': {
        backgroundColor: richeseGrey,
        color: mainBackground,
    },
    m: 0,
    mt: 1,
}

const centerStyle = {
    alignItems: 'center', 
    justifyContent: 'center',
    display: 'flex'
}

interface DeckProps {
    treacheryCards: Treachery[],
    unknownTreacheryCards: UnknownTreachery[],
    players: House[],
    onUpdate: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
    addHarkonenTreachery: (player: House) => void;
    addIxianTreachery: () => void;
}

export function Deck ({treacheryCards, unknownTreacheryCards, players, onUpdate, addHarkonenTreachery, addIxianTreachery}: DeckProps) {
    const [hideDiscard, setHideDiscard] = useState<boolean>(false);
    const handleHideDiscardClick = () => {
        setHideDiscard(!hideDiscard);
    }

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

    const unknownCards = unknownTreacheryCards.filter((card) => {
        return card?.originHouse?.id != House.Harkonen.id && card?.originHouse?.id != House.Ixian.id;
    });

    const harkonenUnknownCards = unknownTreacheryCards.filter((card) => {
        return card?.originHouse?.id == House.Harkonen.id;
    })

    const ixianUnknownCards = unknownTreacheryCards.filter((card) => {
        return card?.originHouse?.id == House.Ixian.id;
    })

    const unknownGroup = { key: 'unknown', value: new CardGroup('Unknown', footerTransitionMiddle, undefined, unknownCards)};
    const harkonenGroup = { key: 'Harkonen', value: new CardGroup('Harkonen', harkonen, undefined, harkonenUnknownCards)};
    const ixianGroup = { key: 'Ixian', value: new CardGroup('Ixian', ixian, undefined, ixianUnknownCards)};

    const largest = useMediaQuery('(min-width:1200px)');
    const medium = useMediaQuery('(min-width:700px)');
    const cardsWidth = (largest ? 60 : medium ? 80 : 90);

    return (
        <Box sx={{...bodyStyle}}>
            <Box sx={{ ...centerStyle, width: '100%'}}>
                <GameMenuButton 
                    text={hideDiscard ? "Show Discarded Cards"  : "Hide Discarded Cards" }
                    sxOverride={{...atreidesStyle, width: (cardsWidth)+'vw'}} 
                    onClick={() => {handleHideDiscardClick()}}>                           
                </GameMenuButton>
            </Box>
            {cardGroups.map((group) => {
                return (
                    <CardSection  
                        key={group.key}
                        group={group.value}
                        renderHouse={true}
                        renderDiscard={true}
                        hideDiscarded={hideDiscard}
                        onUpdate={onUpdate} 
                        players={players}
                        >
                    </CardSection>
                );
            }
        )}
        {
        unknownCards.length != undefined && unknownCards.length > 0 ?
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
        {playerNames.includes(House.Ixian.name) ? 
        <CardSection  
            key={ixianGroup.key}
            group={ixianGroup.value}
            renderHouse={true}
            renderDiscard={true}
            onUpdate={onUpdate} 
            players={players}
            addIxianTreachery={() => {addIxianTreachery()}}>
        </CardSection> : <></>}
        </Box>
    )
}