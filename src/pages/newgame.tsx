/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";

import './../app/globals.css';
import { useRouter } from 'next/router'
import { redirect } from "next/navigation";
import { GameMenu } from "@/components/tracker/gameMenu";
import { TabWrapper } from "@/components/tracker/TabWrapper";
import { OptionsMenu } from "@/components/tracker/optionsMenu";
import { Footer } from "@/components/footer";
import { mainBackground } from "@/settings/colours";
import { Box } from "@mui/material";
import { Treachery } from "@/classes/treachery";
import { House } from "@/classes/house";
import { TreacheryCategory } from "@/classes/treacheryCategory";
import { useEffect, useState } from "react";
import { Deck } from "@/components/tracker/deck";
import { Players } from "@/components/tracker/players";
import { Discard } from "@/components/tracker/discard";
import { UnknownTreachery } from "@/classes/unknownTreachery";

const tabStyles = {
    backgroundColor: mainBackground,
    minHeight: '80vh',
}

export default function NewGame () {
  const router = useRouter();
  const selectedHouseNames = (router.query.houses ? JSON.parse( router.query.houses.toString()) : []) as string[];
  if (selectedHouseNames.length == 0) {
    redirect('/');
  }

  const players = House.Houses.filter((house) => {
    return selectedHouseNames.includes(house.name);
  })
  
  const selectedExpansionIds = (router.query.expansions? JSON.parse( router.query.expansions.toString()) : []) as number[];

  const [treacheryCards, setTreacheryCards] = useState<Treachery[]>([]);
  const initialTreacheryCards = Treachery.TreacheryCards.filter((card) => {
    const expansionIncluded = card.expansionIds.some((id) => selectedExpansionIds.includes(id));
    const isRichese = TreacheryCategory.RicheseCategories.includes(card.category);
    const includeIfRichese = isRichese && selectedHouseNames.includes(House.Richese.name);
    return (expansionIncluded && !isRichese) || includeIfRichese;
  });

  useEffect(() => {
    setTreacheryCards(initialTreacheryCards);
  },[])

  const [unknownTreacheryCards, setUnknownTreacheryCards] = useState<UnknownTreachery[]>([]);
  const [harkonenTreacheryCount, setHarkonenTreacheryCount] = useState<number>(0);
  const UnknownCardTitle = '????????';
  const initialUnknownTreacheryCards: UnknownTreachery[] = [];
  players.forEach((house, key) => {
    if(house != House.Richese && house != House.Harkonen) {
      initialUnknownTreacheryCards.push(new UnknownTreachery(key.toString(), UnknownCardTitle, house, 'yellow large.png', false, undefined));
    }

    if (house == House.Harkonen) {
      initialUnknownTreacheryCards.push(new UnknownTreachery(house.name + ' ' + 1, UnknownCardTitle, house, 'black large.png', false, House.Harkonen));
      initialUnknownTreacheryCards.push(new UnknownTreachery(house.name + ' ' + 2, UnknownCardTitle, house, 'black large.png', false, House.Harkonen));
    }

    if (house == House.Richese) {
      initialUnknownTreacheryCards.push(new UnknownTreachery(house.name + ' ' + 1, UnknownCardTitle, house, 'silver large.png', false, House.Richese));
    }
  })

  useEffect(() => {
    setUnknownTreacheryCards(initialUnknownTreacheryCards);
    console.log(initialUnknownTreacheryCards)
  },[])
  
  const [currentTab, setCurrentTab] = useState(1);
  const handleChange = (newValue: number) => {
      setCurrentTab(newValue);
  };

  const updateCards = (updatedCard?: Treachery, updatedUnknownCard?: UnknownTreachery) => {
    if (updatedCard) {
      updateTreachery(updatedCard);
    }

    if (updatedUnknownCard) {
      updateUnknownTreachery(updatedUnknownCard);
    }
  }

  const updateTreachery = (updatedCard: Treachery) => {
    const nextTreacheryCards = treacheryCards.map((card) => {
      if (card.id != updatedCard.id) {
        return card;
      }

      return updatedCard;
    })

    setTreacheryCards(nextTreacheryCards);
  }

  const updateUnknownTreachery = (updatedCard: UnknownTreachery) => {
    // const nextTreacheryCards = treacheryCards.map((card) => {
    //   if (card.id != updatedCard.id) {
    //     return card;
    //   }

    //   return updatedCard;
    // })

    // setTreacheryCards(nextTreacheryCards);
  }

  return (
    <>
      <GameMenu onChange={(value) => handleChange(value)}></GameMenu>
      <Box sx={{...tabStyles}}>
        <TabWrapper value={currentTab} index={0}>
          <OptionsMenu></OptionsMenu>
        </TabWrapper>
        <TabWrapper value={currentTab} index={1}>
          <Deck 
            treacheryCards={treacheryCards}
            unknownTreacheryCards={unknownTreacheryCards}
            players={players} 
            onUpdate={(card?: Treachery, unknownCard?: UnknownTreachery) => {updateCards(card, unknownCard)}}
          ></Deck>
        </TabWrapper>
        <TabWrapper value={currentTab} index={2}>
          <Players 
            treacheryCards={treacheryCards}
            unknownTreacheryCards={unknownTreacheryCards}
            players={players} 
            onUpdate={(card?: Treachery, unknownCard?: UnknownTreachery) => {updateCards(card, unknownCard)}}
          ></Players>
        </TabWrapper>
        <TabWrapper value={currentTab} index={3}>
          <Discard 
            treacheryCards={treacheryCards}
            unknownTreacheryCards={unknownTreacheryCards}
            players={players} 
            onUpdate={(card?: Treachery, unknownCard?: UnknownTreachery) => {updateCards(card, unknownCard)}}
          ></Discard>
        </TabWrapper>
        <TabWrapper value={currentTab} index={4}>
          Item Three
        </TabWrapper>
      </Box>
      <Footer></Footer>
    </>
  );
}

