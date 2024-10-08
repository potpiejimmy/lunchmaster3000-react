import React from "react";
import { useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useSearchParams } from "react-router-dom";
import AppContext from "../AppContext";

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
        console.log("Got ID: " + id);
    
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