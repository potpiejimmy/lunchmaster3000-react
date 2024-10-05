import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import StarIcon from '@mui/icons-material/Star';
import { useSearchParams } from "react-router-dom";

function Main() {

    const { t } = useTranslation();
    const [ searchParams ] = useSearchParams();
    const id = searchParams.get('id');
    console.log("Got ID: " + id);

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5">
                    <Box className="flex flex-row items-center gap-1"><StarIcon/> {t('routes.main.favorite_list')}</Box>
                </Typography>
                <Box>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Hello world!
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Main;