import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';

function Footer() {

    return (
        <Card>
            <CardContent>
                <Box className="flex flex-row gap-4">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Footer;