import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Create() {

    const { t } = useTranslation();

    return (
        <Box className="flex flex-col gap-4">
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {t('routes.create.welcome_text')}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {t('routes.create.welcome_subtitle_1')}<br/>
                        {t('routes.create.welcome_subtitle_2')}
                    </Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="highlightedCard">
                    <Typography gutterBottom variant="h5">
                        {t('routes.create.create_community_text')}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {t('routes.create.create_community_subtitle')}<br/>
                        {t('routes.create.join_community')} <Link to="/join"><b>{t('routes.create.join_community_link')}</b></Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}