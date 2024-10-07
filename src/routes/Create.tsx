import React from "react";
import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import { largerInputSx } from "../util/Utils";

export default function Create() {

    const context = React.useContext(AppContext);
    const navigate = useNavigate();

    const { t } = useTranslation();

    const [nameInput, setNameInput] = React.useState('');
    const [processing, setProcessing] = React.useState(false);

    async function create() {
        setProcessing(true);
        let newCommunity:any = {
            name: nameInput.trim()
        };

        let c = await context?.api.createCommunity(newCommunity);
        navigate('/?id=' + c.webid);
    }

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
                    <Box className="flex flex-col gap-5" >
                        <Box>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {t('routes.create.create_community_subtitle')}<br/>
                                {t('routes.create.join_community')} <Link to="/join"><b>{t('routes.create.join_community_link')}</b></Link>
                            </Typography>
                        </Box>
                        <TextField autoFocus
                                    label={t('routes.create.community_name')}
                                    sx={largerInputSx}
                                    value={nameInput}
                                    onChange={e=>setNameInput(e.target.value)}
                                    variant="standard"/>
                        <Box className="flex flex-col">
                            <FormControlLabel control={
                                    <Checkbox
                                        checked={context?.agreeTerms}
                                        onChange={e=>context?.setAgreeTerms(e.target.checked)}
                                        />
                                }
                                label={
                                    <Box className="flex flew-row items-center gap-1">
                                        {t('general.terms_agree_1')}
                                        <Link to="/terms">{t('general.terms_agree_2')}</Link>
                                        {t('general.terms_agree_3')}
                                    </Box>
                                }/>
                            <FormControlLabel control={
                                    <Checkbox 
                                        checked={context?.agreePrivacy}
                                        onChange={e=>context?.setAgreePrivacy(e.target.checked)}
                                    />
                                }
                                label={
                                    <Box className="flex flew-row items-center gap-1">
                                        {t('general.privacy_read_1')}
                                        <Link to="/terms">{t('general.privacy_read_2')}</Link>
                                        {t('general.privacy_read_3')}
                                    </Box>
                                }/>
                        </Box>
                        <Box className="flex flex-row">
                            <Button variant="contained"
                                    disabled={nameInput.trim().length===0 || !context?.agreeTerms || !context?.agreePrivacy || processing}
                                    onClick={create}>
                                {t('routes.create.create_community_button')}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}