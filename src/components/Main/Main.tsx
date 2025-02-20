import React from 'react';
import {Weather} from "../Weather/Weather";
import styled from "styled-components";
import {theme} from "../../styles/theme";
import {Text1} from "../../styles/components";


const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${theme.colors.background};
  padding: 20px;
  overflow: hidden;
`

export const apiKey = process.env.REACT_APP_API_KEY

function Main() {

    if (!apiKey) return <MainWrapper><Text1>Provide access token!</Text1></MainWrapper>

    return (
        <MainWrapper>
            <Weather/>
        </MainWrapper>
    );
}

export default Main;
