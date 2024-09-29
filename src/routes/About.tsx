import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/MailOutline';

function About() {

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    lunch.community
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    <Box>
                        My EV Ride GbR - Thorsten Liese und Daniel Siedentopf<br/>
                        Bindingstr. 16, 60598 Frankfurt am Main<br/>
                        Germany
                    </Box>
                    <Box className="my-3">
                        <MailIcon/><br/>
                        Contact: info [at] lunch.community
                    </Box>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default About;
