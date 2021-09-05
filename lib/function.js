export function createFunction(funcVerbDict) {
    global.main = async function(payload) {
        if (!(payload.__ow_method in funcVerbDict)) {
            return {
                statusCode: 405,
                body: "Unsupported HTTP method"
            };
        }

        var result;
        try {
            result = await funcVerbDict[payload.__ow_method](payload);
        }
        catch(e) {
            return {
                statusCode: 500,
                body: `Error: ${e.message} Stack Trace: ${e.stack}`
            }
        }

        return {
            statusCode: result.statusCode,
            headers: result.headers,
            body: result.body
        };
    };
}