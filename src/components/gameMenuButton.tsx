import { House } from '@/classes/house';
import { footerTransitionMiddle, mainBackground, minorHeading } from '@/settings/colours';
import { Button, SxProps } from '@mui/material';
import React  from 'react';

const buttonStyle = {
    color: mainBackground,
    backgroundColor: minorHeading,
    '&:hover': {
        backgroundColor: footerTransitionMiddle,
    },
    minHeight: '6vh',
    fontSize: '24px',
    margin: 2,
}

type buttonProps = {
    text: string,
    onClick?: () => void,
    addHarkonenTreachery?: (player: House) => void;
    width?: string,
    sxOverride?: SxProps,
    disabled?: boolean,
}

export function GameMenuButton({text, onClick, width, sxOverride, disabled}: buttonProps) {
    const handleClick = () => {
        if (onClick != undefined) {
            onClick();
        }
    }

    const minWidth = width ? width : '50vh';

    return (
        <Button 
            variant="contained" 
            size="large" 
            sx={{...buttonStyle, minWidth: minWidth, ...sxOverride}} 
            onClick={() => handleClick()}
            disabled={disabled}>
            {text}
        </Button>
    );
}
