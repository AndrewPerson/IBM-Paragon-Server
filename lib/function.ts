export type Response = {
    statusCode?: number,
    body?: any,
    ok?: boolean
}

type APIResponse = {
    error?: Response
} & Response;

declare const global: typeof globalThis & {
    main: (payload: any) => Promise<APIResponse>
};

export function create(func: (payload: any) => Promise<Response>) {
    global.main = async (payload: any): Promise<APIResponse> => {
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