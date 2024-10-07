import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Join() {

    const { t } = useTranslation();

    return (
        <Box className="flex flex-col gap-4">
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {t('routes.join.title')}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {t('routes.join.subtitle')}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}