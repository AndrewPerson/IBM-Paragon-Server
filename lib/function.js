const process = require("process");

const LOGVERSION = "LOGVERSION 3";
export function createFunction(funcVerbDict) {
    global.main = async function(payload) {
        if (!(payload.__ow_method in funcVerbDict))
            return {
                statusCode: 405,
                body: "Unsupported HTTP method"
            };

        var result;
        try {
            result = await funcVerbDict[payload.__ow_method](payload);
        }
        catch(e) {
            console.log(LOGVERSION);
            console.log(`SUCCEEDED false`);
            console.log(`MEMORY ${process.memoryUsage().rss}`);

            return {
                statusCode: 500,
                body: `Error: ${e.message} Stack Trace: ${e.stack}`
            };
        }

        var response = {
            statusCode: result.statusCode,
            headers: result.headers,
            body: result.body
        };

        console.log(LOGVERSION);
        console.log(`SUCCEEDED ${result.statusCode >= 200 && result.statusCode < 300}`);
        console.log(`MEMORY ${process.memoryUsage().rss}`);
        
        return response;
    };
}