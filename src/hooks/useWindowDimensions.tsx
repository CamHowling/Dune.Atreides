import { useEffect, useState } from "react";

interface WindowDimensions {
    windowWidth: number;
    windowHeight: number;
}

export function useWindowDimensions(): WindowDimensions {
    const [dimensions, setDimensions] = useState<WindowDimensions>({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
    });
   
    useEffect(() => {
       function handleResize() {
         setDimensions({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
         });
       }

       window.addEventListener('resize', handleResize);
       handleResize();
       return () => window.removeEventListener('resize', handleResize);
    }, []);
   
    return dimensions;
   }