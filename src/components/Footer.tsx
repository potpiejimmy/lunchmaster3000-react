import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {

    const { t } = useTranslation();

    return (
        <Card>
            <CardContent>
                <Box className="flex flex-col sm:flex-row gap-4 items-start">
                    <Link to="/about">{t('components.footer.impressum')}</Link>
                    <Link to="/terms">{t('components.footer.terms')}</Link>
                    <Link to="/privacy">{t('components.footer.cookies')}</Link>
                    <Box className="grow"/>
                    {t('components.footer.allrights')}
                </Box>
            </CardContent>
        </Card>
    );
}
