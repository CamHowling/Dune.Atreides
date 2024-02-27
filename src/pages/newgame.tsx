/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import cloneDeep from 'lodash/cloneDeep';
import './../app/globals.css';
import { useRouter as useNextRouter } from 'next/router';
import { redirect, useRouter as useNextNavigationRouter } from 'next/navigation';
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
  const nextRouter = useNextRouter();
  const [selectedHouseNames, setSelectedHouseNames] = useState<string[]>(
    (nextRouter.query.houses ? JSON.parse(nextRouter.query.houses.toString()) : []) as string[]
  );

  const [previousPlayers, setPreviousPlayers] = useState<string | null>(null);
  const [previousCards, setPreviousCards] = useState<string | null>(null);
  const [previousUnknownCards, setPreviousUnknownCards] = useState<string | null>(null);

  const nextNavigation = useNextNavigationRouter();
  useEffect(() => {
    const localPlayers = selectedHouseNames.length == 0 && localStorage.getItem('players') != null ? localStorage.getItem('players') : null;
    setPreviousPlayers(localPlayers);
    const localCards = selectedHouseNames.length == 0 && localStorage.getItem('cards') != null ? localStorage.getItem('cards') : null;
    setPreviousCards(localCards);
    const localUnknownCards =selectedHouseNames.length == 0 && localStorage.getItem('unknownCards') != null ? localStorage.getItem('unknownCards') : null;
    setPreviousUnknownCards(localUnknownCards);

    const canLoadOnRefresh = localPlayers && localCards && localUnknownCards;
    if (selectedHouseNames.length == 0 && !canLoadOnRefresh && typeof window !== 'undefined') {
      nextNavigation.push('/');
    }
  }, [selectedHouseNames]);

  const [players, setPlayers] = useState<House[]>([]);

  useEffect(() => {
    if (previousPlayers != null && previousPlayers.length > 0) {
      const parsedPlayers = JSON.parse(previousPlayers) as House[];
      const initialPlayers = parsedPlayers.map((player) => {
        const parsedPlayer = new House(
          player.id, 
          player.name, 
          player.colour, 
          player.icon, 
          player.expansionId, 
          player.alwaysActive, 
          player.maximumHandSize, 
          player.cardsInHand);

        return parsedPlayer;
      })

      console.log('players loaded from local');
      setPlayers(initialPlayers);
      return;
    }

    const initialPlayers = cloneDeep(House.Houses).filter((house) => {
      return selectedHouseNames.includes(house.name);
    })

    setPlayers(initialPlayers);
    localStorage.setItem('players', JSON.stringify(initialPlayers));
  },[previousPlayers]) 

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);
  
  const [treacheryCards, setTreacheryCards] = useState<Treachery[]>([]);

  useEffect(() => {
    if (previousCards != null && previousCards.length > 0) {
      const parsedCards = JSON.parse(previousCards) as Treachery[];
      const initialCards = parsedCards.map((card) => {
        const parsedCard = new Treachery(
          card.id, 
          card.name, 
          card.category, 
          card.expansionIds, 
          card.locationType, 
          card.player, 
          );

        return parsedCard;
      })

      console.log('treacheries loaded from local');
      setTreacheryCards(initialCards);
      return;
    }

    const selectedExpansionIds = (nextRouter.query.expansions? JSON.parse(nextRouter.query.expansions.toString()) : []) as number[];
   
    const TreacheriesCopy: Treachery[] = cloneDeep(Treachery.TreacheryCards); 
    const initialTreacheryCards = TreacheriesCopy.filter((card) => {
      const expansionIncluded = card.expansionIds.some((id) => selectedExpansionIds.includes(id));
      const richeseCategories =  TreacheryCategory.RicheseCategories.flatMap((category) => {
        return category.id;
    });
      const isRichese = richeseCategories.includes(card.category.id);
      const includeIfRichese = isRichese && selectedHouseNames.includes(House.Richese.name);
      return (expansionIncluded && !isRichese) || includeIfRichese;
    })

    setTreacheryCards(initialTreacheryCards);
    localStorage.setItem('cards', JSON.stringify(initialTreacheryCards));
  },[previousCards])

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(treacheryCards));
  }, [treacheryCards]);

  const [unknownTreacheryCards, setUnknownTreacheryCards] = useState<UnknownTreachery[]>([]);
  const [initializedUnknownCards, setInitializedUnknownCards] = useState<boolean>(false);
  const UnknownCardTitle = '????????';

  useEffect(() => {
    if (!initializedUnknownCards && players.length > 0) {
      const loadPlayersFromLocal = previousUnknownCards != null && previousUnknownCards.length > 0;
      if (loadPlayersFromLocal) {
        const parsedCards = JSON.parse(previousUnknownCards) as UnknownTreachery[];
        const initialCards = parsedCards.map((card) => {
          const parsedPlayer = new UnknownTreachery(
            card.id, 
            card.name, 
            card.banner, 
            card.locationType , 
            card.player, 
            card.originHouse, 
            );
  
          return parsedPlayer;
        })
  
        console.log('unknown loaded from local');
        setUnknownTreacheryCards(initialCards);
        setInitializedUnknownCards(true);
        return;
      }

      const initialUnknownTreacheryCards: UnknownTreachery[] = [];
      players.forEach((house, key) => {
        if(house.name != House.Harkonen.name) {
          initialUnknownTreacheryCards.push(new UnknownTreachery(key.toString(), '????????', 'yellow large.png', LocationType.PlayerUnknown, house, undefined));
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
      localStorage.setItem('unknownCards', JSON.stringify(unknownTreacheryCards));
      setInitializedUnknownCards(true);
    }
  }, [players, previousUnknownCards]);

  useEffect(() => {
    localStorage.setItem('unknownCards', JSON.stringify(unknownTreacheryCards));
  }, [unknownTreacheryCards]);
  
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
    const nextUnknownCards = [...cloneDeep(unknownTreacheryCards), newTreachery];
    setUnknownTreacheryCards(nextUnknownCards);
    setHarkonenTreacheryCount(harkonenTreacheryCount + 1);
    addCardToHarkonen();
  }

  const addCardToHarkonen = () => {
    const nextPlayers = cloneDeep(players).map((player) => {
      if (player.id == House.Harkonen.id) {
        player.cardsInHand = player.cardsInHand + 1;
      }

      return player;
    });

    setPlayers(nextPlayers);
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

