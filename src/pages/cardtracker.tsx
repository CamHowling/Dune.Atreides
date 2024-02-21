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
import { useEffect } from "react";
import { Deck } from "@/components/tracker/deck";

//can potentially simplify
const tabStyles = {
    backgroundColor: mainBackground,
    minHeight: '80vh',
}

export default function Tracker () {
  const router = useRouter();
  const selectedHouseNames = (router.query.houses ? JSON.parse( router.query.houses.toString()) : []) as string[];
  if (selectedHouseNames.length == 0) {
    redirect('/');
  }

  const players = House.Houses.filter((house) => {
    return selectedHouseNames.includes(house.name);
  })
  
  const selectedExpansionIds = (router.query.expansions? JSON.parse( router.query.expansions.toString()) : []) as number[];

  const [treacheryCards, setTreacheryCards] = React.useState<Treachery[]>([]);
  const initialTreacheryCards = Treachery.TreacheryCards.filter((card) => {
    const expansionIncluded = card.expansionIds.some((id) => selectedExpansionIds.includes(id));
    const isRichese = TreacheryCategory.RicheseCategories.includes(card.category);
    const includeIfRichese = isRichese && selectedHouseNames.includes(House.Richese.name);
    return (expansionIncluded && !isRichese) || includeIfRichese;
  });

  useEffect(() => {
    setTreacheryCards(initialTreacheryCards);
  },[])
  
  const [currentTab, setCurrentTab] = React.useState(0);
  const handleChange = (newValue: number) => {
      setCurrentTab(newValue);
  };

  return (
    <>
      <GameMenu onChange={(value) => handleChange(value)}></GameMenu>
      <Box sx={{...tabStyles}}>
        <TabWrapper value={currentTab} index={0}>
          <OptionsMenu></OptionsMenu>
        </TabWrapper>
        <TabWrapper value={currentTab} index={1}>
          <Deck treacheryCards={treacheryCards} players={players} onUpdate={() => {}}></Deck>
        </TabWrapper>
        <TabWrapper value={currentTab} index={2}>
          Item Three
        </TabWrapper>
        <TabWrapper value={currentTab} index={3}>
          Item Three
        </TabWrapper>
        <TabWrapper value={currentTab} index={4}>
          Item Three
        </TabWrapper>
      </Box>
      <Footer></Footer>
    </>
  );
}

