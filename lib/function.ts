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
            return {
                error: {
                    statusCode: 500
                }
            }
        }

        return {
            statusCode: result.statusCode || 200,
            body: result.body
        }
    }
}