import './TopBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { AppContext } from '../AppContext';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';

interface TopBarState {
    title: string
}

export default class TopBar extends React.Component<any, TopBarState> {

    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    constructor(props: any) {
        super(props);
        this.state = {
            title: 'lunch.community'
        };
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar className="space-x-5">
                    <Box className="topbar-logo"/>
                    <Box className="font-semibold text-xl">
                        {this.state.title}
                    </Box>
                    <Box className="grow"/>
                    <SettingsIcon></SettingsIcon>
                </Toolbar>
                <Box className="topbar-subbar flex flex-row gap-5 items-center px-4">
                    <Box className="grow text-center">{this.context?.state.title} <ShareIcon className='scale-75'/></Box>
                    <Box>Donate</Box>
                </Box>
            </AppBar>
        );
    }
}