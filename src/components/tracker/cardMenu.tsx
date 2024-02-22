/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, PopoverPosition, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { Treachery } from '@/classes/treachery';
import { footerTransitionBottom, mainBackground, majorHeading, minorHeading } from '@/settings/colours';
import { House } from '@/classes/house';

const boxStyle = {
    height: '100%', 
    width: '100%',
}

const buttonStyle = {
    height: '100%', 
    width: '100%',
}

const menuStyle = {
    "& .MuiList-root": {
        backgroundColor: mainBackground,
      }   
}

const iconStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
}

interface CardMenuProps {
    children?: React.ReactNode;
    card: Treachery;
    onUpdate?: (card: Treachery) => void;
    renderDiscard: boolean;
    renderHouse: boolean;
    players: House[];
}

export default function CardMenu({children, card, onUpdate, renderDiscard, renderHouse, players}: CardMenuProps) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [clientX, setClientX] = useState<number>(0);
  const [clientY, setClientY] = useState<number>(0);
  const open = Boolean(menuAnchor);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
    setClientX(event.clientX);
    setClientY(event.clientY);
  };

  const [nextCard, setNextCard] = useState<Treachery>(card);

  const handleClose = () => {
    setMenuAnchor(null);
    if (onUpdate != undefined) {
        onUpdate(nextCard);
    }
  };

  const menuPlayers = players.filter((house) => {
    return house != card.player;
  })

  const iconSize = '32px';
  const fontSize = '16pt';

  return (
    <Box sx={{ ...boxStyle }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ ...buttonStyle }}
      >
        {children}
      </Button>
      <Menu
        anchorEl={menuAnchor}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}

        anchorReference="anchorPosition"
        anchorPosition={{ top: clientY, left: clientX }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}

        sx={{ ...menuStyle }}
      >
        {menuPlayers.map((house, key) => {
                return (
                    <MenuItem key={key} onClick={handleClose}>
                        <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                            <img src={ `/assets/houses/${house.icon}` } height={iconSize} width={iconSize}/>
                        </Box>
                        <Typography sx={{ ml: 1 }} fontSize={fontSize}>{house.name}</Typography>
                    </MenuItem>
                );
            })  
        }
        {renderDiscard ? 
           (
            <MenuItem onClick={handleClose}>
                <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                    <img src={ `/assets/cards/discard overlay.png` } height={40} width={40}/>
                </Box>
                <Typography sx={{ ml: 1 }} fontSize={fontSize}>Discard</Typography>
            </MenuItem>
           ) : <></>
        }
        {!renderDiscard || !renderHouse ? 
           (
            <MenuItem onClick={handleClose}>
                <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                    <img src={ `/assets/cards/draw overlay.png` } height={48} width={48}/>
                </Box>
                <Typography sx={{ ml: 1 }} fontSize={fontSize}>Return to Deck</Typography>
            </MenuItem>
           ) : <></>
        }        
      </Menu>
    </Box>
  );
}