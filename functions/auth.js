import axios from "axios";
import { create } from "../lib/function";
import { Token } from "../lib/token";

create(async (payload) => {
    if (!payload.__ow_body)
        return {
            statusCode: 400,
            body: "You must provide a code"
        };

    if (payload.__ow_body.length == 0)
        return {
            statusCode: 400,
            body: "You must provide a code"
        };

    var response = await axios.post("https://student.sbhs.net.au/api/token", new URLSearchParams({
        code: payload.__ow_body,
        grant_type: "authorization_code",
        client_id: payload.client_id,
        client_secret: payload.client_secret,
        //TODO Change this to paragon.au if I get that domain
        //TODO Change this to paragon.pages.dev when releasing
        redirect_uri: "https://beta-paragon.web.app/callback"
    }),
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        } 
    });

    var token = new Token(response.data);

    return {
        body: token
    };
});