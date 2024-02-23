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
import { LocationType } from "@/classes/locationType";

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

  const [players, setPlayers] = useState<House[]>([]);
  
  useEffect(() => {
    const initialPlayers = cloneDeep(House.Houses).filter((house) => {
      return selectedHouseNames.includes(house.name);
    })

    setPlayers(initialPlayers);
    console.log('players set');
  },[]) 
  
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
  const UnknownCardTitle = '????????';

  useEffect(() => {
    const initialUnknownTreacheryCards: UnknownTreachery[] = [];
    players.forEach((house) => {
      if(house.name != House.Harkonen.name) {
        initialUnknownTreacheryCards.push(new UnknownTreachery('Test', '????????', 'yellow large.png', LocationType.PlayerUnknown, house, undefined));
        return;
      }

      initialUnknownTreacheryCards.push(new UnknownTreachery(House.Harkonen.name + ' ' + 1, UnknownCardTitle, 'black large.png', LocationType.PlayerUnknown, house, House.Harkonen));
      initialUnknownTreacheryCards.push(new UnknownTreachery(House.Harkonen.name + ' ' + 2, UnknownCardTitle, 'black large.png', LocationType.PlayerUnknown, house, House.Harkonen));
    });

    const playerNames = players.flatMap((player) => {
      return player.name;
    });

    const richesePlayer = players.find((house) => house.id == House.Richese.id);

    if (playerNames.includes(House.Richese.name)) {
      initialUnknownTreacheryCards.push(new UnknownTreachery(House.Richese.name + ' ' + 1, UnknownCardTitle, 'silver large.png', LocationType.Revealed, richesePlayer, House.Richese));
    }
  
    setUnknownTreacheryCards(initialUnknownTreacheryCards);
  }, [players]);
  
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

    updateCardCounts();
  }

  useEffect(() => {
    console.log('Player: ' + players && players[0] ? players[0].cardsInHand : ' ');
  }, [players])

  const updateCardCounts = () => {
    const nextPlayers = players.map((player) => {
      const treacheryCount = treacheryCards.filter((card) => 
        card?.player?.id == player.id && card.locationType.id == LocationType.Player.id).length;

      const unknownCount = unknownTreacheryCards.filter((card) => 
        card?.player?.id == player.id&& card.locationType.id == LocationType.PlayerUnknown.id).length;

      const nextPlayer = cloneDeep(player);
      nextPlayer.cardsInHand = treacheryCount + unknownCount;

      return nextPlayer;
    })

    setPlayers(nextPlayers);
  }

  const updateTreachery = (updatedCard: Treachery) => {
    const nextTreacheryCards = treacheryCards.reduce((result: Treachery[], card) => {
      if (card.id != updatedCard.id) {
        result.push(card);
        return result;
      }

      result.push(updatedCard);
      return result;
    }, []);

    setTreacheryCards(nextTreacheryCards);
  }

  const updateUnknownTreachery = (updatedCard: UnknownTreachery) => {
    const nextUnknownCards = unknownTreacheryCards.reduce((result: UnknownTreachery[], card) => {
      if (card.id != updatedCard.id) {
        result.push(card);
        return result;
      }

      if (updatedCard.locationType.id != LocationType.Removed.id) {
        result.push(updatedCard);
      }

      return result;
    }, []);

    setUnknownTreacheryCards(nextUnknownCards);
  }

  const [harkonenTreacheryCount, setHarkonenTreacheryCount] = useState<number>(2);
  
  const addHarkonenTreachery = (harkonenPlayer: House) => {
    const newTreachery = new UnknownTreachery(House.Harkonen.name + ' ' + harkonenTreacheryCount+1, UnknownCardTitle, 'black large.png', LocationType.PlayerUnknown, harkonenPlayer, House.Harkonen);
    const nextUnknownCards = unknownTreacheryCards.concat(newTreachery);
    setUnknownTreacheryCards(nextUnknownCards);
    setHarkonenTreacheryCount(harkonenTreacheryCount+1);
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
            players={players} 
            onUpdate={(card?: Treachery, unknownCard?: UnknownTreachery) => {updateCards(card, unknownCard)}}
            addHarkonenTreachery={(player: House) => {addHarkonenTreachery(player)}}
          ></Deck>
        </TabWrapper>
        <TabWrapper value={currentTab} index={2}>
          <Players 
            treacheryCards={treacheryCards}
            unknownTreacheryCards={unknownTreacheryCards}
            players={players} 
            onUpdate={(card?: Treachery, unknownCard?: UnknownTreachery) => {updateCards(card, unknownCard)}}
            addHarkonenTreachery={(player: House) => {addHarkonenTreachery(player)}}
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

