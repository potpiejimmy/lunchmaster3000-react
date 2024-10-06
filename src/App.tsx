import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import AppContext from './AppContext';
import LmApi from './api/LmApi';

export default function App() {

    const [title, setTitle] = React.useState('Thorsten @ Pizza Party Community');
    const [loading, setLoading] = React.useState(false);
    const [agreeTerms, setAgreeTerms] = React.useState(false);
    const [agreePrivacy, setAgreePrivacy] = React.useState(false);

    const largerInputSx = {'.MuiInputBase-input': { fontSize: '1.5rem' }, '.MuiInputLabel-root': { fontSize: '1.5rem' }};

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
                title, setTitle,
                loading, setLoading,
                agreeTerms, setAgreeTerms,
                agreePrivacy, setAgreePrivacy
            }}>

            <ThemeProvider theme={theme}>
                
                <TopBar/>

                <div className='flex flex-col gap-4 m-4'>

                    <Outlet/>

                    <Footer/>

                </div>
            </ThemeProvider>

        </AppContext.Provider>
    );
}