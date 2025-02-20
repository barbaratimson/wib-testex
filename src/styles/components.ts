import styled from "styled-components";
import {theme} from "./theme";




export const Text1 = styled.h1`
    color: ${theme.colors.text};
    font-size: 24px;
    font-weight: 800;
    text-align: center;
`

export const Text2 = styled.h2`
    color: ${theme.colors.text};
    font-size: 18px;
    text-align: center;
`

export const Text3 = styled.h3`
    color: ${theme.colors.text};
    font-size: 16px;
    font-weight: 600;
    text-align: center;
`

export const TextValue = styled.span`
    color: ${theme.colors.textAccent};
    font-size: 16px;
    font-weight: 500;
`

interface FlexProps {
    direction?: 'row' | 'column';
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    gap?: number;
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

const FlexContainer = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  justify-content: ${({ justify = "flex-start" }) => justify};
  align-items: ${({ align = "stretch" }) => align};
  gap: ${({ gap= 0 }) => gap + "px"};
  flex-wrap: ${({ wrap = "nowrap" }) => wrap};
`;


export const Input = styled.input`
  border: 0;
  background: ${theme.colors.secondary};
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 20px;
  color: ${theme.colors.text};
  width: 100%;
  
  &::placeholder {
    color: ${theme.colors.textAccent};
  }
`

export const FlexRow = styled(FlexContainer)`
  flex-direction: row;
`


export const FlexColumn = styled(FlexContainer)`
  flex-direction: column;
`