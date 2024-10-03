import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import { AppContext } from './AppContext';

interface AppState {
    title: string
}

export default class App extends React.Component<any, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            title: 'Thorsten @ Pizza Party Community'
        };
    }

    render() {

        const theme = createTheme({
            palette: {
                primary: {
                    light: 'rgb(200, 228, 201)',
                    main: '#4CAF50',
                    dark: '#2E7D32',
                    contrastText: '#fff',
                },
                secondary: {
                    light: '#ff7961',
                    main: '#f44336',
                    dark: '#ba000d',
                    contrastText: '#000',
                },
            },
            typography: {
                fontFamily: [
                    'PT Sans',
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
        });

        return (
            <AppContext.Provider value={this}>

                <ThemeProvider theme={theme}>
                    
                    <TopBar/>

                    <div className='flex flex-col gap-4 m-4'>

                        <Outlet/> {/* This is where the child routes will be rendered */}

                        <Footer/>

                    </div>
                </ThemeProvider>

            </AppContext.Provider>
        );
    }
}