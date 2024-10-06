import HttpBase from "./HttpBase";

export default class LmApi extends HttpBase {

    async createCommunity(community: any): Promise<any> {
        return this.post("/communities", community);
    }

}
