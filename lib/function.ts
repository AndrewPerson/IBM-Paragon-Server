export type Response = {
    statusCode?: number,
    body?: any,
    ok?: boolean
}

declare const global: {[index: string]: any};

export function create(func: (payload: any) => Promise<Response>) {
    global.main = async (payload: any) => {
        if (payload.__ow_body !== undefined && payload.__ow_body !== null)
            payload = Object.assign(JSON.parse(payload.__ow_body), payload);

        let result: Response;
        try {
            result = await func(payload);
        }
        catch (e) {
            console.log(e);

            return {
                error: {
                    statusCode: 500
                }
            }
        }

        if (result.ok ?? true)
            return {
                statusCode: result.statusCode || 200,
                body: result.body
            }
        else
            return {
                error: {
                    statusCode: result.statusCode || 200,
                    body: result.body
                }
            }
    }
}