import styled from "styled-components";
import {theme} from "../../styles/theme";
import {ArrowIcon} from "./assets/ArrowIcon";

export interface IconProps {
    size: number
}

export interface IconSvgProps {
    color?: string
}

export const Svg = styled.svg<IconSvgProps>`
    color: ${({ color = theme.colors.text }) => color};
`