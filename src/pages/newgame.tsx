/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import cloneDeep from 'lodash/cloneDeep';
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
import { Notes } from "@/components/tracker/notes";

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

  const [players, setPlayers] = useState<House[]>(
    cloneDeep(House.Houses).filter((house) => {
      return selectedHouseNames.includes(house.name);
    })
  )
  
  const selectedExpansionIds = (router.query.expansions? JSON.parse( router.query.expansions.toString()) : []) as number[];

  //TODO need to apply this to other data structures taken from classes
  const TreacheriesCopy: Treachery[] = cloneDeep(Treachery.TreacheryCards);
  const [treacheryCards, setTreacheryCards] = useState<Treachery[]>([]);

  const initialTreacheryCards = TreacheriesCopy.filter((card) => {
    const expansionIncluded = card.expansionIds.some((id) => selectedExpansionIds.includes(id));
    const richeseCategories =  TreacheryCategory.RicheseCategories.flatMap((category) => {
      return category.id;
  });
    const isRichese = richeseCategories.includes(card.category.id);
    const includeIfRichese = isRichese && selectedHouseNames.includes(House.Richese.name);
    return (expansionIncluded && !isRichese) || includeIfRichese;
  })

  useEffect(() => {
    setTreacheryCards(initialTreacheryCards);
  },[])

  const [unknownTreacheryCards, setUnknownTreacheryCards] = useState<UnknownTreachery[]>([]);
  const [harkonenTreacheryCount, setHarkonenTreacheryCount] = useState<number>(0);
  const UnknownCardTitle = '????????';
  const initialUnknownTreacheryCards: UnknownTreachery[] = [];


  players.forEach((house, key) => {
    if(house.name != House.Harkonen.name) {
      initialUnknownTreacheryCards.push(new UnknownTreachery(key.toString(), UnknownCardTitle, 'yellow large.png', false, house, undefined));
      return;
    }

    initialUnknownTreacheryCards.push(new UnknownTreachery(House.Harkonen.name + ' ' + 1, UnknownCardTitle, 'black large.png', false, house, House.Harkonen));
    initialUnknownTreacheryCards.push(new UnknownTreachery(House.Harkonen.name + ' ' + 2, UnknownCardTitle, 'black large.png', false, house, House.Harkonen));
  })

  const playerNames = players.flatMap((player) => {
    return player.name;
  });

  const richesePlayer = players.find((house) => house.id == House.Richese.id);
  if (playerNames.includes(House.Richese.name)) {
    initialUnknownTreacheryCards.push(new UnknownTreachery(House.Richese.name + ' ' + 1, UnknownCardTitle, 'silver large.png', true, richesePlayer, House.Richese));
  }

  useEffect(() => {
    setUnknownTreacheryCards(initialUnknownTreacheryCards);
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

  const updateCardCounts = (previousHouse: House, nextHouse: House) => {
    const nextPlayers = players.map((player) => {
      if (player.id >= previousHouse.id) {
        player.cardsInHand--;
      }

      if (player.id == nextHouse.id) {
        player.cardsInHand++;
      }

      return player;
    })

    setPlayers(nextPlayers);
  }

  const updateTreachery = (updatedCard: Treachery) => {
    if (updatedCard.player?.cardsInHand == updatedCard.player?.maximumHandSize) {
      return; //toast error
    }

    const nextTreacheryCards = treacheryCards.map((card) => {
      if (card.id != updatedCard.id) {
        return card;
      }

      if (card.player != undefined && updatedCard.player != undefined) {
        updateCardCounts(card.player, updatedCard.player);
      }
      
      return updatedCard;
    })

    setTreacheryCards(nextTreacheryCards);
  }

  const updateUnknownTreachery = (updatedCard: UnknownTreachery) => {
    if (updatedCard.player?.cardsInHand == updatedCard.player?.maximumHandSize) {
      return; //toast error
    }

    const nextUnknownCards = unknownTreacheryCards.map((card) => {
      if (card.id != updatedCard.id) {
        return card;
      }

      if (card.player != undefined && updatedCard.player != undefined) {
        updateCardCounts(card.player, updatedCard.player);
      }
      
      return updatedCard;
    })

    setUnknownTreacheryCards(nextUnknownCards);
  }

  const [note, setNote] = useState<string>('');
  const updateNote = (note: string) => {
    setNote(note);
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
            // harkonenTreacheryCards={harkonenUnknownTreacheryCards}
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
          <Notes note={note} onUpdateNote={(note: string) => updateNote(note)}></Notes>
        </TabWrapper>
      </Box>
      <Footer></Footer>
    </>
  );
}

