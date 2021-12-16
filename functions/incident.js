const axios = require("axios").default;
import { createFunction } from "../lib/function";
import { Token } from "../lib/token";

createFunction({
    post: incident
});

async function incident(payload) {
    return {
        statusCode: 200,
        body: "Incident Logged"
    };
}