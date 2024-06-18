import { CardGroup } from "@/classes/cardGroup";
import { House } from "@/classes/house";
import { Treachery } from "@/classes/treachery";
import { TreacheryCategory } from "@/classes/treacheryCategory";
import { atreides, footerTransitionMiddle, Harkonnen, ixian, mainBackground, richeseGrey, treacheryBlue, treacheryGreen, treacheryRed, treacheryTan } from "@/settings/colours";
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
    addHarkonnenTreachery: (player: House) => void;
    addIxianTreachery: () => void;
    addUnknownTreachery: () => void;
}

export function Deck ({treacheryCards, unknownTreacheryCards, players, onUpdate, addHarkonnenTreachery, addIxianTreachery, addUnknownTreachery}: DeckProps) {
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
        return card?.originHouse?.id != House.Harkonnen.id && card?.originHouse?.id != House.Ixian.id;
    });

    const HarkonnenUnknownCards = unknownTreacheryCards.filter((card) => {
        return card?.originHouse?.id == House.Harkonnen.id;
    })

    const ixianUnknownCards = unknownTreacheryCards.filter((card) => {
        return card?.originHouse?.id == House.Ixian.id;
    })

    const unknownGroup = { key: 'unknown', value: new CardGroup('Unknown', footerTransitionMiddle, undefined, unknownCards)};
    const HarkonnenGroup = { key: 'Harkonnen', value: new CardGroup('Harkonnen', Harkonnen, undefined, HarkonnenUnknownCards)};
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
            players={players}
            addUnknownTreachery={() => addUnknownTreachery()}
            >
        </CardSection> : <></> }
        {playerNames.includes(House.Harkonnen.name) ? 
        <CardSection  
            key={HarkonnenGroup.key}
            group={HarkonnenGroup.value}
            renderHouse={true}
            renderDiscard={true}
            onUpdate={onUpdate} 
            players={players}
            addHarkonnenTreachery={(player: House) => {addHarkonnenTreachery(player)}}>
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