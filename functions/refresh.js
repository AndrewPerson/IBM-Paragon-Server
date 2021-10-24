import { createFunction } from "../lib/function";
import { Token } from "../lib/token";

createFunction({
    post: auth
});

async function auth(payload) {
    if (!payload) {
        return {
            statusCode: 400,
            body: "You must provide a code"
        };
    }

    var token = new Token(payload);
    await token.refresh();

    return {
        statusCode: 200,
        body: token
    };
}