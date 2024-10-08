import HttpBase from "./HttpBase";

export default class LmApi extends HttpBase {

    async createCommunity(community: any): Promise<any> {
        return this.post("/communities", community);
    }

    getCommunity(id: string): Promise<any> {
        return this.get("/communities/"+id);
    }

    getData(): Promise<any> {
        return this.get("/data?id="+localStorage.getItem("id"));
    }
}
