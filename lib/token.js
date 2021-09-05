const axios = require("axios").default;

export class Token {
    constructor(unformatted) {
        if ("error" in unformatted)
            throw new Error(unformatted.error);

        if ("access_token" in unformatted)
            this.access_token = unformatted.access_token;
        else
            throw new Error("No access token present in token");

        if ("refresh_token" in unformatted)
            this.refresh_token = unformatted.refresh_token;
        else
            throw new Error("No refresh token present in token");

        if ("expiry" in unformatted)
            this.expiry = new Date(unformatted.expiry);
        else {
            var expiry = new Date();
            expiry.setHours(expiry.getHours() + 1);

            this.expiry = expiry;
        }

        if ("termination" in unformatted)
            this.termination = new Date(unformatted.termination);
        else {
            var termination = new Date();
            //Token lasts 90 days.
            termination.setHours(termination.getHours() + 90 * 24);

            this.termination = termination;
        }
    }

    async refresh(client_id, client_secret) {
        var response = await axios.post("https://student.sbhs.net.au/api/token", new URLSearchParams({
            refresh_token: this.refresh_token,
            grant_type: "refresh_token",
            client_id: client_id,
            client_secret: client_secret
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            } 
        });

        var unformatted = response.data;

        if ("error" in unformatted)
            throw new Error(unformatted.error);

        if ("access_token" in unformatted)
            this.access_token = unformatted.access_token;
        else
            throw new Error("No access token present in token");

        if ("expiry" in unformatted)
            this.expiry = new Date(unformatted.expiry);
        else {
            var expiry = new Date();
            expiry.setHours(expiry.getHours() + 1);

            this.expiry = expiry;
        }
    }
}