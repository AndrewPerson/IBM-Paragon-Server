const process = require("process");

const LOGVERSION = "LOGVERSION 3";

export type Response = {
    statusCode?: number,
    body?: any
}

declare const global: {[index: string]: any};

export function create(func: (payload: any) => Promise<Response>) {
    global.main = async (payload: any) => {
        if (payload.__ow_body !== undefined && payload.__ow_body !== null)
            payload = Object.assign(JSON.parse(payload.__ow_body), payload);

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
            body: result.body
        };

        console.log(LOGVERSION);
        console.log(`SUCCEEDED ${statusCode >= 200 && statusCode < 300}`);
        console.log(`MEMORY ${process.memoryUsage().rss}`);
        
        return response;
    }
}