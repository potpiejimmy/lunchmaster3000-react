import './TopBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { AppContext } from '../AppContext';

export default class TopBar extends React.Component {

    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    render() {
        return (
            <AppBar position="static">
                <Toolbar className="space-x-5">
                    <Box className="topbar-logo"/>
                    <Box className="flex-grow">{this.context?.state.title}</Box>
                </Toolbar>
            </AppBar>
        );
    }
}