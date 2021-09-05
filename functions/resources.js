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
            status: 400,
            body: "You must provide a token"
        }
    }

    var token;
    try {
        token = new Token(JSON.parse(payload.token));
    }
    catch (e) {
        return {
            status: 500,
            body: e.message
        };
    }

    if (new Date() > token.termination)
        return {
            status: 422,
            body: "Token is terminated"
        };

    if (new Date() > token.expiry) {
        try {
            await token.refresh(payload.client_id, payload.client_secret);
        }
        catch (e) {
            return {
                status: 500,
                body: e.message
            };
        }
    }
    
    var result = {
        result: {},
        token: token
    };

    for (var resource in RESOURCES)
        result.result[RESOURCES[resource]] = await getResource(resource, token);

    return {
        status: 200,
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