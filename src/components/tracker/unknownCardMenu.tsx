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
import { LocationType } from '@/classes/locationType';

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
    nextCard.locationType = LocationType.PlayerUnknown;
    setNextCard(nextCard);
    handleClose();
  };

  const handleChoam = () => {
    nextCard.hasChoamMarker = !nextCard.hasChoamMarker;
    setNextCard(nextCard);
    handleClose();
  };

  const handleDiscard = () => {
    nextCard.locationType = LocationType.DiscardUnknown;
    nextCard.hasChoamMarker = false;
    setNextCard(nextCard);
    handleClose();
  };

  const handleReturnToHand = () => {
    nextCard.locationType = LocationType.PlayerUnknown;
    nextCard.hasChoamMarker = false;
    setNextCard(nextCard);
    handleClose();
  };

  const handleReveal = () => {
    nextCard.locationType = LocationType.Revealed;
    setNextCard(nextCard);
    handleClose();
  };

  const handleRemove = () => {
    nextCard.locationType = LocationType.Removed;
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
    return house.id != unknownCard.player?.id;
  })

  const currentPlayer = players.find((house) => house.id == unknownCard.player?.id);
  const isHandFull = currentPlayer ? currentPlayer.isHandFull() : false;

  const isChoamPlaying = players.some((player) => {
    return player.id == House.Choam.id;
  });

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
        {
        unknownCard.locationType.id == LocationType.PlayerUnknown.id ?
          (
            menuPlayers.map((house, key) => {
                if (unknownCard.originHouse == House.Richese && house == House.Richese && unknownCard.player == House.Richese) {
                  return;
                }

                return (
                  <MenuItem key={key} onClick={() => handleUpdatePlayer(house)} disabled={house.isHandFull()}>
                      <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                          <img src={ `/assets/houses/${house.icon}` } height={iconSize} width={iconSize}/>
                      </Box>
                      <Typography sx={{ ml: 1 }} fontSize={fontSize}>{house.name}</Typography>
                  </MenuItem>
                );
              })  
          ) : <Box></Box>
        }
        {
        isChoamPlaying && unknownCard.locationType.id == LocationType.PlayerUnknown.id ? 
           (
            <MenuItem onClick={handleChoam}>
                <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                    <img src={ `/assets/menu/choam small.png` } height={32} width={32}/>
                </Box>
                <Typography sx={{ ml: 1 }} fontSize={fontSize}>
                  {unknownCard.hasChoamMarker ? 'Cancel Choam Alliance' : 'Use Choam Alliance'}
                </Typography>
            </MenuItem>
           ) : <Box></Box>
        }
        {
        unknownCard.player && unknownCard.locationType.id == LocationType.PlayerUnknown.id ?
           (
            <MenuItem onClick={handleDiscard}>
                <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                    <img src={ `/assets/cards/discard overlay.png` } height={40} width={40}/>
                </Box>
                <Typography sx={{ ml: 1 }} fontSize={fontSize}>Discard</Typography>
            </MenuItem>
           ) : <Box></Box>
        }
        {
        unknownCard.player && 
        (unknownCard.locationType.id == LocationType.Revealed.id || unknownCard.locationType.id == LocationType.DiscardUnknown.id) ?
           (
            <MenuItem onClick={handleReturnToHand} disabled={isHandFull}>
                <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                    <img src={ `/assets/houses/${unknownCard.player.icon}` } height={iconSize} width={iconSize}/>
                </Box>
                <Typography sx={{ ml: 1 }} fontSize={fontSize}>{!(unknownCard.player.id == House.Richese.id) ? 'Return to Hand' : 'Karama OR Return to Hand'}</Typography>
            </MenuItem>
           ) : <Box></Box>
        }    
        {
        unknownCard.player && unknownCard.locationType.id == LocationType.PlayerUnknown.id ?
           (
            <MenuItem onClick={handleReveal}>
                <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                    <img src={ `/assets/cards/draw overlay.png` } height={48} width={48}/>
                </Box>
                <Typography sx={{ ml: 1 }} fontSize={fontSize}>Reveal</Typography>
            </MenuItem>
           ) : <Box></Box>
        }     
        {
        unknownCard.player && unknownCard.locationType.id == LocationType.Revealed.id ?
           (
            <MenuItem onClick={handleRemove}>
                <Box sx={{ height: iconSize, width: iconSize, ...iconStyle }}>
                    <img src={ `/assets/cards/draw overlay.png` } height={48} width={48}/>
                </Box>
                <Typography sx={{ ml: 1 }} fontSize={fontSize}>Remove</Typography>
            </MenuItem>
           ) : <Box></Box>
        }        
      </Menu>
    </Box>
  );
}