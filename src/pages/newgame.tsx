import * as React from "react";
import cloneDeep from 'lodash/cloneDeep';
import './../app/globals.css';
import { useRouter as useNextRouter } from 'next/router';
import { useRouter as useNextNavigationRouter } from 'next/navigation';
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
import { DevEnvironmentConsoleLog } from "@/util/utility";

const tabStyles = {
    backgroundColor: mainBackground,
    minHeight: '80vh',
}

export default function NewGame () {
  const nextRouter = useNextRouter();
  const selectedHouseNames = (nextRouter.query.houses ? JSON.parse(nextRouter.query.houses.toString()) : []) as string[];

  const [hasLoadedFromLocal, setHasLoadedFromLocal] = useState<boolean>(false);

  const [previousPlayers, setPreviousPlayers] = useState<string | null>(null);
  const [previousCards, setPreviousCards] = useState<string | null>(null);
  const [previousUnknownCards, setPreviousUnknownCards] = useState<string | null>(null);
  const [previousNote, setPreviousNote] = useState<string | null>(null);

  const nextNavigation = useNextNavigationRouter();
  useEffect(() => {
    if (hasLoadedFromLocal) {
      return;
    }

    const hasHouseNames = selectedHouseNames.length > 0;

    const localPlayers = !hasHouseNames && localStorage.getItem('players') != null ? localStorage.getItem('players') : null;
    setPreviousPlayers(localPlayers);
    const localCards = !hasHouseNames&& localStorage.getItem('cards') != null ? localStorage.getItem('cards') : null;
    setPreviousCards(localCards);
    const localUnknownCards = !hasHouseNames && localStorage.getItem('unknownCards') != null ? localStorage.getItem('unknownCards') : null;
    setPreviousUnknownCards(localUnknownCards);

    const localNote = !hasHouseNames && localStorage.getItem('note') != null ? localStorage.getItem('note') : null;
    setPreviousNote(localNote);

    const canLoadOnRefresh = localPlayers != null && localCards != null && localUnknownCards != null;
    if (!hasHouseNames && !canLoadOnRefresh && typeof window !== 'undefined') {
      nextNavigation.push('/');
    }

    if (canLoadOnRefresh || hasHouseNames) {
      setHasLoadedFromLocal(true);
    }

    DevEnvironmentConsoleLog('load house names on refresh'); 
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

      setPlayers(initialPlayers);
      DevEnvironmentConsoleLog('set initial players from local')
      return;
    }

    const initialPlayers = cloneDeep(House.Houses).filter((house) => {
      return selectedHouseNames.includes(house.name);
    })

    setPlayers(initialPlayers);
    DevEnvironmentConsoleLog('set initial players manually')
  },[previousPlayers]) 

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
    DevEnvironmentConsoleLog('save players to local');
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

      setTreacheryCards(initialCards);
      DevEnvironmentConsoleLog('load treachery from local');
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
    DevEnvironmentConsoleLog('set treachery manually')
  },[previousCards])

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(treacheryCards));
    DevEnvironmentConsoleLog('save treachery to local');
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
  
        DevEnvironmentConsoleLog('load unknown treachery from local');
        setUnknownTreacheryCards(initialCards);
        setInitializedUnknownCards(true);
        return;
      }

      const initialUnknownTreacheryCards: UnknownTreachery[] = [];
      players.forEach((house, key) => {
        if(house.name != House.Harkonnen.name) {
          initialUnknownTreacheryCards.push(new UnknownTreachery(key.toString(), '????????', 'yellow large.png', LocationType.PlayerUnknown, house, undefined));
          return;
        }
      });

      
      const playerNames = players.flatMap((player) => {
        return player.name;
      });

      const richesePlayer = players.find((house) => house.id == House.Richese.id);
      if (playerNames.includes(House.Richese.name)) {
        initialUnknownTreacheryCards.push(new UnknownTreachery(House.Richese.name + ' ' + 1, UnknownCardTitle, 'silver large.png', LocationType.Revealed, richesePlayer, House.Richese));
      }

      const HarkonnenPlayer = players.find((house) => house.id == House.Harkonnen.id);
      if (playerNames.includes(House.Harkonnen.name)) {
        initialUnknownTreacheryCards.push(new UnknownTreachery(House.Harkonnen.name + ' ' + 1, UnknownCardTitle, 'black large.png', LocationType.PlayerUnknown, HarkonnenPlayer, House.Harkonnen));
        initialUnknownTreacheryCards.push(new UnknownTreachery(House.Harkonnen.name + ' ' + 2, UnknownCardTitle, 'black large.png', LocationType.PlayerUnknown, HarkonnenPlayer, House.Harkonnen));
      }

      setUnknownTreacheryCards(initialUnknownTreacheryCards);
      DevEnvironmentConsoleLog('set unknown treachery manually')
      setInitializedUnknownCards(true);
    }
  }, [players, previousUnknownCards]);

  useEffect(() => {
    localStorage.setItem('unknownCards', JSON.stringify(unknownTreacheryCards));
    DevEnvironmentConsoleLog('save unknown treachery to local');
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

  const [HarkonnenTreacheryCount, setHarkonnenTreacheryCount] = useState<number>(2);
  
  const addHarkonnenTreachery = (HarkonnenPlayer: House) => {
    const newTreachery = new UnknownTreachery(House.Harkonnen.name + ' ' + HarkonnenTreacheryCount+1, UnknownCardTitle, 'black large.png', LocationType.PlayerUnknown, HarkonnenPlayer, House.Harkonnen);
    const nextUnknownCards = [...cloneDeep(unknownTreacheryCards), newTreachery];
    setUnknownTreacheryCards(nextUnknownCards);
    setHarkonnenTreacheryCount(HarkonnenTreacheryCount + 1);
    addCardToPlayer(House.Harkonnen);
  }

  const addCardToPlayer = (house: House) => {
    const nextPlayers = cloneDeep(players).map((player) => {
      if (player.id == house.id) {
        player.cardsInHand = player.cardsInHand + 1;
      }

      return player;
    });

    setPlayers(nextPlayers);
  }

  const [ixianTreacheryCount, setIxianTreacheryCount] = useState<number>(0);
  
  const addIxianTreachery = () => {
    const newTreachery = new UnknownTreachery(House.Ixian.name + ' ' + ixianTreacheryCount+1, UnknownCardTitle, 'ixian large.png', LocationType.PlayerUnknown, undefined, House.Ixian);
    const nextUnknownCards = [...cloneDeep(unknownTreacheryCards), newTreachery];
    setUnknownTreacheryCards(nextUnknownCards);
    setIxianTreacheryCount(ixianTreacheryCount + 1);
  }

  const [unknownTreacheryCount, setUnknownTreacheryCount] = useState<number>(0);

  const addUnknownTreachery = () => {
    const newTreachery = new UnknownTreachery('Unknown ' + unknownTreacheryCount+1, UnknownCardTitle, 'yellow large.png', LocationType.PlayerUnknown, undefined, undefined);
    const nextUnknownCards = [...cloneDeep(unknownTreacheryCards), newTreachery];
    setUnknownTreacheryCards(nextUnknownCards);
    setUnknownTreacheryCount(unknownTreacheryCount + 1);
  }

  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (previousNote != null) {
      setNote(previousNote);
    }
    
  }, [previousNote])

  useEffect(() => {
    localStorage.setItem('note', note);
  }, [note])

  const updateNote = (note: string) => {
    setNote(note);
    localStorage.setItem('note', note);
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
            addHarkonnenTreachery={(player: House) => {addHarkonnenTreachery(player)}}
            addIxianTreachery={() => {addIxianTreachery()}}
            addUnknownTreachery={() => {addUnknownTreachery()}}
          ></Deck>
        </TabWrapper>
        <TabWrapper value={currentTab} index={2}>
          <Players 
            treacheryCards={treacheryCards}
            unknownTreacheryCards={unknownTreacheryCards}
            players={players} 
            onUpdate={(card?: Treachery, unknownCard?: UnknownTreachery) => {updateCards(card, unknownCard)}}
            addHarkonnenTreachery={(player: House) => {addHarkonnenTreachery(player)}}
            addIxianTreachery={() => {addIxianTreachery()}}
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

