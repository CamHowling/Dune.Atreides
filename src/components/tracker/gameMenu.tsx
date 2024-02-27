import React  from 'react';

import { majorHeading, mainBackground } from "@/settings/colours";
import { Box, Tab, Tabs } from "@mui/material";

const boxStyle = {
    display: 'flex',
    backgroundColor: majorHeading,
    width: '100%',
    minHeight: '10vh', 
    alignItems: 'center',
    justifyContent: 'center',
}

type gameMenuProps = {
    onChange: (value: number) => void,
}

function tabProps(index: number) {
    return {
        id: `menu-${index}`,
        sx: {
            fontSize: 32,
            color: mainBackground,
            mr: 2,
            ml: 2,
        }
    };
}

export function GameMenu({onChange}: gameMenuProps) {
    const [value, setValue] = React.useState(1);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        onChange(newValue);
    };

    const imageSize = '60px';

    return (
        <Box sx={{ ...boxStyle }}>
            <Tabs 
            value={value} 
            onChange={handleChange} 
            TabIndicatorProps={{
                sx: {
                  background: mainBackground,
                  borderBottom: 1, 
                  borderColor: majorHeading, 
                  height: 4,
                }
              }}
            sx={{
                ".Mui-selected": {
                    color: mainBackground.toString()+"!important",
                    },
            }}
            >
                <Tab icon={
                    <img src={ `/assets/menu/options.png` } height={imageSize} width={imageSize}/>
                    } 
                    iconPosition="start" 
                    label="Options" 
                    {...tabProps(0)}
                    disableRipple  
                />
                <Tab icon={
                    <img src={ `/assets/menu/deck.png` } height={imageSize} width={imageSize}/>
                    } 
                    iconPosition="start" 
                    label="Deck" 
                    {...tabProps(1)} 
                    disableRipple 
                />
                
                <Tab icon={
                    <img src={ `/assets/menu/players.png` } height={imageSize} width={imageSize}/>
                    } 
                    iconPosition="start" 
                    label="Players" 
                    {...tabProps(2)} 
                    disableRipple 
                />
                
                <Tab icon={
                    <img src={ `/assets/menu/discard.png` } height={imageSize} width={imageSize}/>
                    } 
                    iconPosition="start" 
                    label="Discard" 
                    {...tabProps(3)} 
                    disableRipple 
                />
                
                <Tab icon={
                    <img src={ `/assets/menu/notes.png` } height={imageSize} width={imageSize}/>
                    } 
                    iconPosition="start" 
                    label="Notes" 
                    {...tabProps(4)} 
                    disableRipple 
                />
            </Tabs>
        </Box>
    )
}
