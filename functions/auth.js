const { createFunction } = require("../function");

createFunction({
    post: auth
});

async function auth(payload) {
    return {
        status: 200,
        body: "You're okay."
    };
}