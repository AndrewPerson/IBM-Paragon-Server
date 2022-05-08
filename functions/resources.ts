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
    let response = await axios.get(`https://student.sbhs.net.au/api/${resource}`, {
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

    let token = TokenFactory.Create(JSON.parse(payload.token));

    console.log(`Token iteration: ${token.iteration}`);
    console.log(`Previous token: ${JSON.stringify(token.previousToken)}`);

    if (new Date() > token.termination)
        return {
            statusCode: 422,
            body: "Token is terminated"
        };

    if (new Date() > token.expiry) {
        token = await TokenFactory.Refresh(token, payload.CLIENT_ID, payload.CLIENT_SECRET);
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

    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = (now.getDate() + 1).toString().padStart(2, "0");

    promises.push(getResource(`timetable/daytimetable.json?date=${now.getFullYear()}-${month}-${day}`, token).then(resourceResponse => {
        result.result["next-dailytimetable"] = resourceResponse;
    }));

    await Promise.all(promises);

    return {
        body: result
    };
});