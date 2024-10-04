import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import StarIcon from '@mui/icons-material/Star';

function Main() {

    const { t } = useTranslation();

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <Box className="flex flex-row items-center gap-1"><StarIcon/> {t('routes.main.favorite_list')}</Box>
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    <Box>
                        Hello world!
                    </Box>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Main;