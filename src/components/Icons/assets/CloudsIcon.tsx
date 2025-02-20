import {IconProps, Svg} from "../icon";
import {useEffect, useRef} from "react";


interface CloudsIconProps extends IconProps {
    fillPercentage?: number;
}

export const CloudsIcon = ({size = 100, fillPercentage = 0}: CloudsIconProps) => {

    const fillRectRef = useRef<SVGRectElement>(null);

    useEffect(() => {
        if (fillRectRef.current && fillPercentage) {
            const newY = 100 - fillPercentage; // Invert the percentage for SVG coordinates
            fillRectRef.current.setAttribute('y', newY.toString());
        }
    }, [fillPercentage]);

    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512">
            <defs>
                <linearGradient  id="cloud-gradient" x1="1" y1="0" x2="0" y2="0">
                    <stop offset={`${100 - fillPercentage}%`} stopColor="currentColor"/>
                    <stop offset={`${100 - fillPercentage}%`} stopColor="grey"/>
                </linearGradient>
            </defs>
            <path fill="url(#cloud-gradient)"
                  d="M470.7 306.2c3-11.2 4.7-22.9 4.7-35c0-75.8-61.4-137.1-137.1-137.1c-19.5 0-38 4.1-54.7 11.4c-16.8-39-55.6-66.3-100.7-66.3c-60.6 0-109.7 49.1-109.7 109.7c0 4.1.8 7.9 1.2 11.9C30.5 221.1 0 265.3 0 316.9c0 70.7 57.3 128 128 128h310.9c40.4 0 73.1-32.7 73.1-73.1c0-29-16.9-53.7-41.3-65.6z"/>
        </Svg>
    );};