import axios from "axios";
import { create, Response } from "../lib/function";
import { Token } from "../lib/token";

const RESOURCES: Map<string, string> = new Map([
    ["dailynews/list.json", "announcements"],
    ["timetable/daytimetable.json", "dailytimetable"],
    ["timetable/timetable.json", "timetable"],
    ["details/userinfo.json", "userinfo"]
]);

async function getResource(resource: string, token: Token) {
    var response = await axios.get(`https://student.sbhs.net.au/api/${resource}`, {
        headers: {
            "Authorization": `Bearer ${token.access_token}`
        }
    });

    return response.data;
}

create(async (payload: any): Promise<Response> => {
    if (!payload.token)
        return {
            statusCode: 400,
            body: "You must provide a token"
        };

    var token = new Token(JSON.parse(payload.token));

    if (new Date() > token.termination)
        return {
            statusCode: 422,
            body: "Token is terminated"
        };

    if (new Date() > token.expiry) 
        await token.refresh(payload.client_id, payload.client_secret);
    
    var result: {
        result: {[index: string]: any},
        token: Token
    } = {
        result: {},
        token: token
    };

    var promises = [];

    for (let [url, name] of RESOURCES) {
        promises.push(getResource(url, token).then(resourceResponse => {
            result.result[name] = resourceResponse;
        }));
    }

    var now = new Date();

    var year = (now.getFullYear()).toString();

    if (now.getMonth() + 1 < 10) var month = `0${now.getMonth() + 1}`;
    else var month = (now.getMonth() + 1).toString();

    if (now.getDate() + 1 < 10) var day = `0${now.getDate() + 1}`;
    else var day = (now.getDate() + 1).toString();

    promises.push(getResource(`timetable/daytimetable.json?date=${year}-${month}-${day}`, token).then(resourceResponse => {
        result.result["next-dailytimetable"] = resourceResponse;
    }));

    await Promise.all(promises);

    return {
        body: result
    };
});