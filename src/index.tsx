import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './components/Main/Main';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from 'styled-components';
import {theme} from "./styles/theme";
import GlobalStyles from './styles/global'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Main/>
            <GlobalStyles/>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
