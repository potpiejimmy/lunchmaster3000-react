import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { largerInputSx } from "../util/Utils";
import AppContext from "../AppContext";
import AgreeChecks from "../components/AgreeChecks";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';

export default function Welcome() {

    const context = React.useContext(AppContext);
    const navigate = useNavigate();

    const { t } = useTranslation();

    const [nameInput, setNameInput] = React.useState('');
    const [processing, setProcessing] = React.useState(false);

    async function submit() {
        setProcessing(true);
        localStorage.setItem("name", nameInput.trim());
        navigate('/');
    }

    return (
        <Box className="flex flex-col gap-4">
            <Card>
                <CardContent className="highlightedCard">
                    <Typography gutterBottom variant="h5">
                        {t('routes.welcome.welcome_message')}<br/>
                        {'Meine Community'}
                    </Typography>
                    <Box className="flex flex-col gap-5" >
                        <Box>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {t('routes.welcome.welcome_new_user')}
                            </Typography>
                            </Box>
                        <TextField autoFocus
                                    label={t('routes.welcome.ask_for_name')}
                                    sx={largerInputSx}
                                    value={nameInput}
                                    onChange={e=>setNameInput(e.target.value)}
                                    variant="standard"/>
                        <Accordion sx={{bgcolor: 'primary.light'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                >
                                <InfoIcon/>&nbsp;{t('routes.welcome.hint_title')}
                            </AccordionSummary>
                            <AccordionDetails>
                                {t('routes.welcome.hint_1')}
                                {t('routes.welcome.hint_2')}
                                {t('routes.welcome.hint_3')}
                            </AccordionDetails>
                        </Accordion>
                        <AgreeChecks/>
                        <Box className="flex flex-row">
                            <Button variant="contained"
                                    disabled={nameInput.trim().length===0 || !context?.agreeTerms || !context?.agreePrivacy || processing}
                                    onClick={submit}>
                                {t('routes.welcome.hungry')}
                            </Button>
                        </Box>
                    </Box>
                 </CardContent>
            </Card>
        </Box>
    )
}