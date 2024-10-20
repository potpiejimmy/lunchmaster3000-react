import React from "react";
import { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useSearchParams } from "react-router-dom";
import AppContext from "../AppContext";
import InfoIcon from '@mui/icons-material/Info';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Main() {

    const context = React.useContext(AppContext);
    const { t } = useTranslation();
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();

    const [data, setData] = React.useState<any>(null);

    // initialize name from local storage
    let name = localStorage.getItem('name');

    useEffect(() => {
        let id = searchParams.get('id');
        console.log("Initializing Main route, id param " + id);
    
        if (id) {
            localStorage.setItem("id", id);
        } else {
            id = localStorage.getItem("id");
        }
        if (!id) {
            // no community selected
            navigate('/create', { replace: true });
        } else {
            //load community
            context?.setLoading(true);
            context?.api.getCommunity(id).then(async c => {
                if (!c) {
                    //this.snackBar.open(await this.translate.get("routes.main.community_id_does_not_exist").toPromise(), null, {duration: 5000});
                    navigate('/create', { replace: true });
                } else {
                    context?.setCommunity(c);
                    if (!name) {
                        // name not set?
                        navigate('/welcome', { replace: true });
                    } else {
                        context?.setName(name);
                        await startup();
                    }
                }
            }).finally(() => {
                context?.setLoading(false);
            });
        }
    }, [searchParams, navigate]);

    async function startup(): Promise<void> {
        initSocket();
        await load();
        try {
            Notification.requestPermission(); // request notification permission
        } catch (err) {}
    }

    function initSocket() {
        // register socket for receiving data:
        // this.socket = io(environment.socketIoUrl+this.app.community.webid, { path: environment.socketIoPath });
        // this.socket.on('reconnect', async () => {
        //     //reload data from server on connect to fix iOS problem with PWA
        //     this.adaptDataFromServer(await this.api.getData());
        // });
        // this.socket.on('data', data => {
        //     if (!this.isTyping) this.adaptDataFromServer(data);
        // });
        // this.socket.on('push', async msg => {
        //     if (msg.name != this.name) {
        //         new Notification(msg.title, {
        //             body: msg.type != 'chat' ? await this.translate.get("push."+msg.body, msg.params).toPromise() : msg.body,
        //             requireInteraction: msg.type != 'chat'
        //         });
        //     }
        // });
        // this.socket.on("connect_error", (err) => {
        //     console.log(`socket.io connect error due to ${err.message}`);
        // });
    }

    async function load(): Promise<void> {
        setData(await context?.api.getData());
    }

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5">
                    <Box className="flex flex-row items-center gap-1"><StarIcon/>{t('routes.main.favorite_list')}</Box>
                </Typography>

                <Box className="flex flex-col gap-4">

                    {data && data.locations.length > 0 &&
                        <Box>
                            <Typography sx={{ color: 'text.secondary' }} gutterBottom>
                                {t('routes.main.hello', {name: context?.name})}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {t('routes.main.welcome_text_1')}
                                <br/>
                                {t('routes.main.welcome_text_2')} <i>{t('routes.main.welcome_text_3')}</i>
                                . {t('routes.main.welcome_text_4')}
                            </Typography>
                        </Box>
                    }

                    {(!data || !data.locations.length) && !context?.loading &&
                        <Card>
                            <CardContent className="highlightedCard">
                                <Typography sx={{ color: 'text.secondary' }} gutterBottom>
                                    <InfoIcon/>&nbsp;{t('routes.main.community_new')}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }} gutterBottom>
                                    {t('routes.main.invite_colleagues_1')}
                                    &nbsp;<ShareIcon fontSize="small"/>&nbsp;
                                    {t('routes.main.invite_colleagues_2')} {t('routes.main.invite_colleagues_3')} {t('routes.main.invite_colleagues_4')}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    {t('routes.main.invite_colleagues_5')}
                                </Typography>
                            </CardContent>
                        </Card>
                    }

                    <Box className="flex flex-col gap-4 items-start">
                        <Button variant="contained"
                                title={t('routes.main.add_new_location')}
                                >
                                
                            <AddIcon/>{(!data || data.locations.length === 0) && 
                                <span>&nbsp;{t('components.location_edit.new_location')}</span>
                            }
                        </Button>
                    </Box>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            >
                            <Typography sx={{ color: 'text.secondary' }}>
                                <InfoIcon/>&nbsp;{t('routes.main.hint_title')}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {t('routes.main.hint_1')}
                                {t('routes.main.hint_2')}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                </Box>

            </CardContent>
        </Card>
    )
}

export default Main;