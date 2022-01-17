import { create } from "../lib/function";

import { createConnection } from "promise-mysql";

create(async (payload: any) => {
    let connection = await createConnection({
        host: payload.SQL_HOST,
        user: payload.SQL_USER,
        password: payload.SQL_PASSWORD
    });

    await connection.query("INSERT INTO incidents (error_name, stack_trace, version) VALUES (?, ?, ?)", [payload.error_name, payload.stack_trace, payload.version]);

    return {
        body: "Success"
    };
});