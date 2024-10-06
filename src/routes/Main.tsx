import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function Main() {

    const { t } = useTranslation();
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();

    // initialize name from local storage
    //let name = localStorage.getItem('name');

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
            // load community
            // this.app.loading = true;
            // this.api.getCommunity(id).then(async c => {
            //     if (!c) {
            //         this.snackBar.open(await this.translate.get("routes.main.community_id_does_not_exist").toPromise(), null, {duration: 5000});
            //         this.router.navigate(['/create'], { replaceUrl: true });
            //     } else {
            //         this.app.community = c;
            //         if (!this.name) {
            //             // name not set?
            //             this.router.navigate(['/welcome'], { replaceUrl: true });
            //         } else {
            //             this.app.name = this.name;
            //             await this.startup();
            //         }
            //     }
            // }).finally(() => {
            //     this.app.loading = false;
            // });
        }
    }, [searchParams, navigate]);

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