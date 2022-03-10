import axios from "axios";
import { create, Response } from "../lib/function";
import { Token, TokenFactory } from "../lib/token";

const RESOURCES: Map<string, string> = new Map([
    ["dailynews/list.json", "announcements"],
    ["timetable/daytimetable.json", "dailytimetable"],
    ["timetable/timetable.json", "timetable"],
    ["details/userinfo.json", "userinfo"]
]);

async function getResource(resource: string, token: Token) {
    console.log(`Fetching resource ${resource}`);
    let response = await axios.get(`https://student.sbhs.net.au/api/${resource}`, {
        headers: {
            "Authorization": `Bearer ${token.access_token}`
        }
    });
    console.log(`Fetched resource ${resource}`);

    return response.data;
}

create(async (payload: any): Promise<Response> => {
    if (!payload.token)
        return {
            statusCode: 400,
            body: "You must provide a token"
        };

    let token = TokenFactory.Create(JSON.parse(payload.token));

    if (new Date() > token.termination)
        return {
            statusCode: 422,
            body: "Token is terminated"
        };

    if (new Date() > token.expiry) {
        console.log("Refreshing token");
        token = await TokenFactory.Refresh(token, payload.CLIENT_ID, payload.CLIENT_SECRET);
        console.log("Refreshed token");
    }

    let result: {
        result: {[index: string]: any},
        token: Token
    } = {
        result: {},
        token: token
    };

    let promises = [];

    for (let [url, name] of RESOURCES) {
        promises.push(getResource(url, token).then(resourceResponse => {
            result.result[name] = resourceResponse;
        }));
    }

    let now = new Date();

    let year = (now.getFullYear()).toString();

    let month: string;
    if (now.getMonth() + 1 < 10) month = `0${now.getMonth() + 1}`;
    else month = (now.getMonth() + 1).toString();

    let day: string;
    if (now.getDate() + 1 < 10) day = `0${now.getDate() + 1}`;
    else day = (now.getDate() + 1).toString();

    promises.push(getResource(`timetable/daytimetable.json?date=${year}-${month}-${day}`, token).then(resourceResponse => {
        result.result["next-dailytimetable"] = resourceResponse;
    }));

    await Promise.all(promises);

    return {
        body: result
    };
});