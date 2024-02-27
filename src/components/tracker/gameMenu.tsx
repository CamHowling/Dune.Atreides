import React  from 'react';

import { majorHeading, mainBackground } from "@/settings/colours";
import { Box, Tab, Tabs, useMediaQuery } from "@mui/material";

const boxStyle = {
    display: 'flex',
    backgroundColor: majorHeading,
    width: '100vw',
    minHeight: '10vh', 
    alignItems: 'center',
    justifyContent: 'center',
}

type gameMenuProps = {
    onChange: (value: number) => void,
}

function tabProps(index: number) {
    const largest = useMediaQuery('(min-width:1024px)');
    const medium = useMediaQuery('(min-width:700px)');
    const margin = largest ? 2 : medium ?  1 : 0;

    return {
        id: `menu-${index}`,
        sx: {
            fontSize: 32,
            color: mainBackground,
            mr: margin,
            ml: margin,
            minWidth: 40,
        }
    };
}

export function GameMenu({onChange}: gameMenuProps) {
    const [value, setValue] = React.useState(1);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        onChange(newValue);
    };

    const renderTitles = useMediaQuery('(min-width:1400px)');
    const medium = useMediaQuery('(min-width:700px)');
    const imageSize = medium?  '64px' : '40px';
    
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
                '.MuiTabs-indicator': {
                    transform: 'scaleX(60%) translateX(0%)',
                    },
            
            }}
            >
                <Tab icon={
                    <img src={ `/assets/menu/options.png` } height={imageSize} width={imageSize}/>
                    } 
                    iconPosition="start" 
                    label= {renderTitles ? 'Options' : ''}
                    {...tabProps(0)}
                    disableRipple  
                />
                <Tab icon={
                    <img src={ `/assets/menu/deck.png` } height={imageSize} width={imageSize}/>
                    } 
                    iconPosition="start" 
                    label= {renderTitles ? 'Deck' : ''}
                    {...tabProps(1)}
                    disableRipple 
                />
                
                <Tab icon={
                    <img src={ `/assets/menu/players.png` } height={imageSize} width={imageSize}/>
                    } 
                    iconPosition="start" 
                    label= {renderTitles ? 'Players' : ''}
                    {...tabProps(2)} 
                    disableRipple 
                />
                
                <Tab icon={
                    <img src={ `/assets/menu/discard.png` } height={imageSize} width={imageSize}/>
                    } 
                    iconPosition="start" 
                    label= {renderTitles ? 'Discard' : ''}
                    {...tabProps(3)} 
                    disableRipple 
                />
                
                <Tab icon={
                    <img src={ `/assets/menu/notes.png` } height={imageSize} width={imageSize}/>
                    } 
                    iconPosition="start" 
                    label= {renderTitles ? 'Notes' : ''}
                    {...tabProps(4)} 
                    disableRipple 
                />
            </Tabs>
        </Box>
    )
}
