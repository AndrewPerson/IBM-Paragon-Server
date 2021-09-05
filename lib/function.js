export function createFunction(funcVerbDict) {
    global.main = async function(payload) {
        if (!(payload.__ow_method in funcVerbDict)) {
            return {
                status: 405,
                body: "Unsupported HTTP method"
            };
        }

        var result = await funcVerbDict[payload.__ow_method](payload);

        return {
            status: result.status,
            headers: result.headers,
            body: result.body
        };
    };
}