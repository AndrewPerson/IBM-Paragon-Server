import axios from "axios";
import { create } from "../lib/function";
import { TokenFactory } from "../lib/token";

create(async (payload: any) => {
    if (!payload.code)
        return {
            statusCode: 400,
            body: "You must provide a code"
        };

    let response = await axios.post("https://student.sbhs.net.au/api/token", new URLSearchParams({
        code: payload.code,
        grant_type: "authorization_code",
        client_id: payload.CLIENT_ID,
        client_secret: payload.CLIENT_SECRET,
        //TODO Change this to paragon.au if I get that domain
        redirect_uri: "https://paragon.pages.dev/callback"
    }),
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        } 
    });

    let token = TokenFactory.Create(response.data);

    return {
        body: token
    };
});