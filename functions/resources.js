const axios = require("axios").default;
import { createFunction } from "../lib/function";
import { Token } from "../lib/token";

createFunction({
    get: resources
});

const RESOURCES = {
    "dailynews/list.json": "announcements",
    "timetable/daytimetable.json": "dailytimetable",
    "timetable/timetable.json": "timetable",
    "details/userinfo.json": "userinfo"
}

async function resources(payload) {
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
    
    var result = {
        result: {},
        token: token
    };

    var promises = [];

    Object.keys(RESOURCES).forEach(resource => {
        promises.push(getResource(resource, token).then(resourceResponse => {
            result.result[RESOURCES[resource]] = resourceResponse;
        }));
    });

    var now = new Date();
    var year = (now.getFullYear()).toString();
    var month = (now.getMonth() + 1).toString();
    var day = (now.getDate() + 1).toString();

    if (month < 10)
        month = `0${month}`;

    if (day < 10)
        day = `0${day}`;

    promises.push(getResource(`timetable/daytimetable.json?date=${year}-${month}-${day}`, token).then(resourceResponse => {
        result.result["next-dailytimetable"] = resourceResponse;
    }));

    await Promise.all(promises);

    return {
        statusCode: 200,
        body: result
    };
}

async function getResource(resource, token) {
    var response = await axios.get(`https://student.sbhs.net.au/api/${resource}`, {
        headers: {
            "Authorization": `Bearer ${token.access_token}`
        }
    });

    return response.data;
}