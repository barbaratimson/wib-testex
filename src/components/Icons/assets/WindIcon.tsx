import React from "react";
import {IconProps, Svg} from "../icon";

export const WindIcon = ({size}:IconProps) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 4a3 3 0 1 1 3 4H2m3 12a3 3 0 1 0 3-4H2m15 0a3 3 0 1 0 3-4H2"/>
        </Svg>
    );
};