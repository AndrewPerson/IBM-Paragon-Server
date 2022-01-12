const process = require("process");

const LOGVERSION = "LOGVERSION 3";

export function create(func) {
    global.main = async (payload) => {
        try {
            var result = await func(payload);
        }
        catch (e) {
            console.log(e);
            
            console.log(`SUCCEEDED false`);
            console.log(`MEMORY ${process.memoryUsage().rss}`);

            return {
                statusCode: 500,
                body: "Internal Server Error"
            };
        }

        var statusCode = result.statusCode || 200;

        var response = {
            statusCode: statusCode,
            headers: result.headers,
            body: result.body
        };

        console.log(LOGVERSION);
        console.log(`SUCCEEDED ${statusCode >= 200 && statusCode < 300}`);
        console.log(`MEMORY ${process.memoryUsage().rss}`);
        
        return response;
    }
}