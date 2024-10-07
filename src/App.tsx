import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import AppContext from './AppContext';
import LmApi from './api/LmApi';

export default function App() {

    const [loading, setLoading] = React.useState(false);
    const [agreeTerms, setAgreeTerms] = React.useState(false);
    const [agreePrivacy, setAgreePrivacy] = React.useState(false);
    const [community, setCommunity] = React.useState(null);
    const [name, setName] = React.useState('');

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
        <AppContext.Provider value={
            {
                api: new LmApi(),
                loading, setLoading,
                agreeTerms, setAgreeTerms,
                agreePrivacy, setAgreePrivacy,
                community, setCommunity,
                name, setName
            }}>

            <ThemeProvider theme={theme}>
                
                <TopBar/>

                <div className='flex flex-col gap-4 mx-4 my-4 lg:mx-16 lg:my-8'>

                    <Outlet/>

                    <Footer/>

                </div>
            </ThemeProvider>

        </AppContext.Provider>
    );
}