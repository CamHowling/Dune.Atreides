import { Expansion } from "@/classes/expansion";
import { minorHeading } from "@/settings/colours";
import { IconButton, useMediaQuery } from "@mui/material";
import * as React from "react";
import { useState } from "react";

interface expansionButtonProps {
    expansion: Expansion;
    onClick: () => void;
}

export default function ExpansionButton ({expansion, onClick}: expansionButtonProps) {
    const largest = useMediaQuery('(min-width:1200px)');
    const medium = useMediaQuery('(min-width:700px)');
    const imageScale = largest ? 1 : medium ? 0.75 : 0.5; 
    const imageSize = (imageScale * 128) + 'px'; 

    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        onClick();
        setIsActive(!isActive); 
    }

    const iconStyles = {
        padding: 0.5 * imageScale,
        outline: isActive ? 6 * imageScale : 0, 
        margin: 1.2 * imageScale,
    }

    return (
        <IconButton sx={{ ...iconStyles, outlineColor: minorHeading }}
            onClick={handleClick}
            
        >
            <img src={ `/assets/expansions/${expansion.icon}` } height={imageSize} width={imageSize}/>
        </IconButton>
    );
}