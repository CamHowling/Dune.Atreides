import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { mainBackground } from '@/settings/colours';
import { House } from '@/classes/house';
import { UnknownTreachery } from '@/classes/unknownTreachery';
import { Treachery } from '@/classes/treachery';

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

interface UnknownCardMenuProps {
    children?: React.ReactNode;
    unknownCard: UnknownTreachery;
    onUpdate?: (card?: Treachery, unknownCard?: UnknownTreachery) => void;
    players: House[];
}

export default function UnknownCardMenu({children, unknownCard, onUpdate, players}: UnknownCardMenuProps) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [clientX, setClientX] = useState<number>(0);
  const [clientY, setClientY] = useState<number>(0);
  const open = Boolean(menuAnchor);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
    setClientX(event.clientX);
    setClientY(event.clientY);
  };

  const [nextCard, setNextCard] = useState<UnknownTreachery>(unknownCard);

  const handleUpdatePlayer = (house: House) => {
    nextCard.player = house;
    setNextCard(nextCard);
    handleClose();
  };

  const handleDiscard = () => {
    nextCard.isDiscarded = true;
    setNextCard(nextCard);
    handleClose();
  };

  const handleReturnToHand = () => {
    nextCard.isDiscarded = false;
    setNextCard(nextCard);
    handleClose();
  };

  const handleReturnToDeck = () => {
    // nextCard.player = undefined;
    nextCard.isDiscarded = false;
    setNextCard(nextCard);
    handleClose();
  };

  const handleClose = () => {
    setMenuAnchor(null);
    if (onUpdate != undefined) {
        onUpdate(undefined, nextCard);
    }
  };

  const menuPlayers = players.filter((house) => {
    return house != unknownCard.player;
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
                    <MenuItem key={key} onClick={() => handleUpdatePlayer(house)}>
                        <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                            <img src={ `/assets/houses/${house.icon}` } height={iconSize} width={iconSize}/>
                        </Box>
                        <Typography sx={{ ml: 1 }} fontSize={fontSize}>{house.name}</Typography>
                    </MenuItem>
                );
            })  
        }
        {!unknownCard.isDiscarded && unknownCard.player ? 
           (
            <MenuItem onClick={handleDiscard}>
                <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                    <img src={ `/assets/cards/discard overlay.png` } height={40} width={40}/>
                </Box>
                <Typography sx={{ ml: 1 }} fontSize={fontSize}>Discard</Typography>
            </MenuItem>
           ) : <Box></Box>
        }
        {unknownCard.isDiscarded && unknownCard.player ? 
           (
            <MenuItem onClick={handleReturnToHand}>
                <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                    <img src={ `/assets/houses/${unknownCard.player.icon}` } height={iconSize} width={iconSize}/>
                </Box>
                <Typography sx={{ ml: 1 }} fontSize={fontSize}>Return to Hand</Typography>
            </MenuItem>
           ) : <Box></Box>
        }    
        {unknownCard.player ? 
           (
            <MenuItem onClick={handleReturnToDeck}>
                <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                    <img src={ `/assets/cards/draw overlay.png` } height={48} width={48}/>
                </Box>
                <Typography sx={{ ml: 1 }} fontSize={fontSize}>Return to Deck</Typography>
            </MenuItem>
           ) : <Box></Box>
        }        
      </Menu>
    </Box>
  );
}