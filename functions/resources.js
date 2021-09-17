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
    if (!payload.token) {
        return {
            statusCode: 400,
            body: "You must provide a token"
        }
    }

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

    var fetchPromises = [];
    for (var resource in RESOURCES) {
        fetchPromises.push(getResource(resource, token));
    }

    var resourceResults = await Promise.all(fetchPromises);

    var i = 0;
    for (var resource in RESOURCES) {
        result.result[RESOURCES[resource]] = resourceResults[i];
        i++;
    }

    return {
        statusCode: 200,
        body: result
    }
}

async function getResource(resource, token) {
    var response = await axios.get(`https://student.sbhs.net.au/api/${resource}`, {
        headers: {
            "Authorization": `Bearer ${token.access_token}`
        }
    });

    return response.data;
}