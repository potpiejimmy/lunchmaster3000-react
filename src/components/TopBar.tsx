import './TopBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { AppContext } from '../AppContext';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import { TypeWriter } from '../util/TypeWriter';

import dish1 from '../assets/dishes/dish1.jpg';
import dish2 from '../assets/dishes/dish2.jpg';
import dish3 from '../assets/dishes/dish3.jpg';
import dish4 from '../assets/dishes/dish4.jpg';
import dish5 from '../assets/dishes/dish5.jpg';
import dish6 from '../assets/dishes/dish6.jpg';
import dish7 from '../assets/dishes/dish7.jpg';
import dish8 from '../assets/dishes/dish8.jpg';
import dish9 from '../assets/dishes/dish9.jpg';
import dish10 from '../assets/dishes/dish10.jpg';
import dish11 from '../assets/dishes/dish11.jpg';
import dish12 from '../assets/dishes/dish12.jpg';
import dish13 from '../assets/dishes/dish13.jpg';
import dish14 from '../assets/dishes/dish14.jpg';
import dish15 from '../assets/dishes/dish15.jpg';
import { Donate } from './Donate';
import { Link } from 'react-router-dom';

interface TopBarState {
    title: string
}

export default class TopBar extends React.Component<any, TopBarState> {

    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    tw: TypeWriter | undefined;

    static readonly CAROUSEL_RENDER_SIZE = 45; // number of pictures to render in carousel - should be large enough for largest screens
    static readonly CAROUSEL_NUM_PICTURES = 15; // number of distinct carousel pictures in assets/dishes/dishX.jpg

    dishes = Array.from(Array(TopBar.CAROUSEL_RENDER_SIZE).keys()).map(i=>i%TopBar.CAROUSEL_NUM_PICTURES);
    dishPics = [dish1,dish2,dish3,dish4,dish5,dish6,dish7,dish8,dish9,dish10,dish11,dish12,dish13,dish14,dish15];
    animationState = 'idle';

    carouselTimeout: NodeJS.Timeout | undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            title: 'lunch.community'
        };
    }

    componentDidMount() {
        let slogan = "“What are we having for lunch today?”";//await this.translate.get("components.topbar.slogan").toPromise();
        this.tw = new TypeWriter([slogan,"lunch.community"], (t:string) => {
            this.setState({...this.state, title: t});
        })
        this.tw.start();
        this.carouselTimeout = setTimeout(() => { this.shiftCarousel(); setInterval(()=>this.shiftCarousel(), 10000) }, 2000);
    }

    componentWillUnmount(): void {
        this.tw?.stop();
        if (this.carouselTimeout) clearTimeout(this.carouselTimeout);
    }

    shiftCarousel() {
        this.animationState='shiftedLeft';
    }

    shiftAnimationDone(event: any) {
        if (event.toState === 'shiftedLeft') {
            this.animationState = 'idle';
            let i = this.dishes.shift();
            this.dishes.push(i!);
        }
    }

    render() {
        return (
            <Box>
                <AppBar position="static">
                    <Toolbar className="space-x-5">
                        <Link to="/"><Box className="topbar-logo"/></Link>
                        <Box className="font-semibold text-xl">
                            {this.state.title}
                        </Box>
                        <Box className="grow"/>
                        <SettingsIcon></SettingsIcon>
                    </Toolbar>
                    <Box className="topbar-subbar flex flex-row gap-5 items-center px-4">
                        <Box className="grow text-center">{this.context?.state.title} <ShareIcon className='scale-75'/></Box>
                        <Box className="max-sm:hidden"><Donate/></Box>
                    </Box>
                    {/* image carousel start */}
                    <Box className="max-sm:hidden overflow-hidden bg-white">
                        <Box className="flex flex-row gap-0.5 p-0.5">
                            {this.dishes.map((i) => <img src={this.dishPics[i]} width="120px" key={i}/>)}
                        </Box>
                    </Box>
                    {/* image carousel end */}
                </AppBar>
                <Box className="sm:hidden flex flex-row justify-end px-5"><Donate/></Box>
            </Box>
        );
    }
}