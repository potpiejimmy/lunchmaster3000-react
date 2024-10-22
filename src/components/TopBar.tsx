import './TopBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/SettingsApplications';
import { TypeWriter } from '../util/TypeWriter';
import Donate from './Donate';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppContext from '../AppContext';
import { IconButton } from '@mui/material';

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

export default function TopBar() {

    const context = React.useContext(AppContext);

    const { t } = useTranslation();

    const CAROUSEL_RENDER_SIZE = 45; // number of pictures to render in carousel - should be large enough for largest screens
    const CAROUSEL_NUM_PICTURES = 15; // number of distinct carousel pictures in assets/dishes/dishX.jpg

    const [title, setTitle] = React.useState('lunch.community');
    const [animationState, setAnimationState] = React.useState('idle');
    const [dishes, setDishes] = React.useState(Array.from(Array(CAROUSEL_RENDER_SIZE).keys()).map(i=>i%CAROUSEL_NUM_PICTURES));

    const dishPics = [dish1,dish2,dish3,dish4,dish5,dish6,dish7,dish8,dish9,dish10,dish11,dish12,dish13,dish14,dish15];

    function shiftCarousel() {
        setAnimationState('shifted');
    }

    function shiftAnimationDone() {
        if (animationState === 'shifted') {
            let i = dishes.shift();
            dishes.push(i!);
            setAnimationState('idle');
            setDishes(dishes);
        }
    }

    function communityLink(): string {
        return process.env.REACT_APP_SHARE_URL+'?id='+context?.community.webid;
    }

    function linkCopied() {
        navigator.clipboard.writeText(communityLink());
        context?.setSnackText(t('components.topbar.link_copied'));
    }

    useEffect(() => {
        // mount:
        let slogan = t("components.topbar.slogan");
        const tw = new TypeWriter([slogan,"lunch.community"], setTitle)
        tw.start();
        let carouselTimeout: NodeJS.Timeout | undefined;
        let carouselInterval: NodeJS.Timeout | undefined;
    
        carouselTimeout = setTimeout(() => {
            shiftCarousel();
            carouselInterval = setInterval(()=>shiftCarousel(), 10_000)
        }, 2_000);

        return () => {
            // unmount:
            tw?.stop();
            if (carouselTimeout) clearTimeout(carouselTimeout);
            if (carouselInterval) clearInterval(carouselInterval);
        }    
    }, [t]);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar className="space-x-5">
                    <Link to="/"><Box className="topbar-logo"/></Link>
                    <Box className="font-semibold text-xl">
                        {title}
                    </Box>
                    <Box className="grow"/>
                    <Box className="flex flex-row">
                        <IconButton sx={{color: 'primary.light'}} title={t('general.settings')}>
                            <SettingsIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
                <Box className="topbar-subbar flex flex-row gap-5 items-center px-4">
                    <Box className="grow text-center">
                        {context?.name ? context?.name + " @ " : ""}
                        {context?.community?.name}
                        {context?.community &&
                            <IconButton size='small'
                                        sx={{color: 'primary.light'}}
                                        title={t('components.topbar.copy_link', {communityLink: communityLink()})}
                                        onClick={linkCopied}>
                                <ShareIcon fontSize='small'></ShareIcon>
                            </IconButton>
                        }
                    </Box>
                    <Box className="max-sm:hidden"><Donate/></Box>
                </Box>
                {/* image carousel start */}
                <Box className="max-sm:hidden overflow-hidden bg-white">

                    <Box className={`dish-carousel-anim-${animationState}`}
                            onTransitionEnd={()=>shiftAnimationDone()}>

                        <Box className="flex flex-row gap-0.5 p-0.5">
                            {dishes.map((i,ix) => <img src={dishPics[i]} width="120px" key={ix} alt={'dish'+ix}/>)}
                        </Box>
                    </Box>

                </Box>
                {/* image carousel end */}
            </AppBar>
            <Box className="sm:hidden flex flex-row justify-end px-5"><Donate/></Box>
        </Box>
    );
}
