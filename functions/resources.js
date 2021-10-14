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

    var promises = [];

    var nextDailyTimetablePromise;

    Object.keys(RESOURCES).forEach(resource => {
        promises.push(getResource(resource, token).then(resourceResponse => {
            result.result[RESOURCES[resource]] = resourceResponse;
            
            if (resource == "timetable/daytimetable.json") {
                var dateString = resourceResponse.date;

                var [year, month, day] = dateString.split("-");

                year = parseInt(year);
                //Month is 0-indexed for date object
                month = parseInt(month) - 1;
                day = parseInt(day);

                var date = new Date(year, month, day);

                date.setDate(date.getDate() + 1);

                year = date.getFullYear();
                //Month is 0-indexed for date object
                month = date.getMonth() + 1;
                day = date.getDate();

                if (month < 10) month = `0${month}`;
                if (day < 10) day = `0${day}`;

                dateString = `${year}-${month}-${day}`;

                nextDailyTimetablePromise = getResource(`timetable/daytimetable.json?date=${dateString}`, token).then(nextDailyTimetable => {
                    result.result["next-dailytimetable"] = nextDailyTimetable;
                });
            }
        }));
    });

    await Promise.all(promises);
    await nextDailyTimetablePromise;

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