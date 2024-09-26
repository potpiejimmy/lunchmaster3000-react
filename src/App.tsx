import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

function App() {

    const theme = createTheme({
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
        <ThemeProvider theme={theme}>
            <div className='flex flex-col gap-5 m-5'>
                <p className="text-2xl">
                    Today's favorites
                </p>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <Box className="flex flex-row gap-1 items-center">
                                <StarIcon/>
                                Today's favorites
                            </Box>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            <p>Hi Thorsten,</p>
                            please choose your favorite food places for today. You can select one or more places - anything you are in the mood for.
                            If you feel like ordering or picking up food for you and your co-workers from one of the places, please press Take orders. Otherwise, just wait until someone else presses the button and then you can join in.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </ThemeProvider>
    );
}

export default App;
