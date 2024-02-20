import { House } from "@/classes/house";
import { IconButton, useMediaQuery } from "@mui/material";
import * as React from "react";
import { useState } from "react";



type houseButtonProps = {
    house: House,
    onClick: () => void,
}

export default function HouseButton ({house, onClick}: houseButtonProps) {
    const largest = useMediaQuery('(min-width:1200px)');
    const medium = useMediaQuery('(min-width:700px)');
    const imageScale = largest ? 1 : medium ? 0.75 : 0.5; 
    const imageSize = (imageScale * 128) + 'px'; 

    const [isActive, setIsActive] = useState(house.alwaysActive);
    const handleClick = () => {
        onClick();
        if (!house.alwaysActive) {
            setIsActive(!isActive); 
        }
    }

    const iconStyles = {
        padding: 0.5 * imageScale,
        outline: isActive ? 6 * imageScale : 0, 
        margin: 1.2 * imageScale,
    }

    return (
        <IconButton sx={{  ...iconStyles, outlineColor: house.colour }}
            onClick={handleClick}
        >
            <img src={ `/assets/houses/${house.icon}` } height={imageSize} width={imageSize}/>
        </IconButton>
    );
}