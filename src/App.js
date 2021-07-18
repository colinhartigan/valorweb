import React from 'react';

//utilities
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Switch, Route, HashRouter, Redirect } from "react-router-dom";

//fonts
import DINNextLTProRegular from './fonts/DINNextLTPro-Regular.woff2';

//pages
import Auth from './pages/Auth'

const dinnregular = {
    fontFamily: 'DIN Next',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 300,
    src: `
      local('DINNext'),
      local('DINNext-Regular'),
      url(${DINNextLTProRegular}) format('woff2')
    `,
};


const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#fa4454',
        },
        secondary: {
            main: '#ffffff',
        },
    },
    typography: {
        fontFamily: [
            'DIN Next LT Pro Regular',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [dinnregular],
            },
        },
    },
})


function App() {
    
    return (
        <React.Fragment>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <HashRouter>
                    <Routes />
                </HashRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

function Routes() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    console.log(params.get("redir"))
    
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/valorweb" />
            </Route>
            <Route exact path="/valorweb">
                <Auth redir={params.get("redir")} region={params.get("region")} playername={params.get("playername")} playertag={params.get("playertag")} type={params.get("type")}/>
            </Route>
        </Switch>
    )
}

export default App;