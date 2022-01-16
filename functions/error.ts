import { create } from "../lib/function";

import { createConnection } from "promise-mysql";

create(async (payload: any) => {
    let connection = await createConnection({
        host: payload.sql_host,
        user: payload.sql_user,
        password: payload.sql_password
    });

    await connection.query("INSERT INTO incidents (error_name, stack_trace, version) VALUES (?, ?, ?)", [payload.error_name, payload.stack_trace, payload.version]);

    return {
        body: "Success"
    };
});