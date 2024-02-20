import React  from 'react';

import { majorHeading, mainBackground, footerTransitionTop, footerTransitionBottom, choam, ecaz } from "@/settings/colours";
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
    onChange: () => void,
}

//review this
function a11yProps(index: number) {
    return {
        id: `menu-${index}`,
        sx: {
            fontSize: 32,
            color: mainBackground
        }
    };
  }

export function GameMenu({onChange}: gameMenuProps) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        onChange;
    };

    return (
        <Box sx={{ ...boxStyle }}>
            <Tabs 
            value={value} 
            onChange={handleChange} 
            TabIndicatorProps={{
                sx: {
                  background: mainBackground,    
                }
              }}
            sx={{
                ".Mui-selected": {
                    color: mainBackground.toString()+"!important",
                    },
            }}
            >
                <Tab label="Options" {...a11yProps(0)} />
                <Tab label="Deck" {...a11yProps(1)} />
                <Tab label="Players" {...a11yProps(2)} />
                <Tab label="Discard" {...a11yProps(2)} />
                <Tab label="Notes" {...a11yProps(2)} />
            </Tabs>
        </Box>
    )
}
