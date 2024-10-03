import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';

function Footer() {

    return (
        <Card>
            <CardContent>
                <Box className="flex flex-col sm:flex-row gap-4 items-start">
                    <Link to="/about">About</Link>
                    <Link to="/terms">Terms & Conditions</Link>
                    <Link to="/privacy">Privacy & Cookies</Link>
                    <Box className="grow"/>
                    https://lunch.community
                </Box>
            </CardContent>
        </Card>
    );
}

export default Footer;