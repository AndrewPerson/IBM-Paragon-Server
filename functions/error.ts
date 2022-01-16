import { create } from "../lib/function";

import { createConnection } from "mysql";

create(async (payload: any) => {
    let connection = createConnection({
        host: payload.sql_host,
        user: payload.sql_user,
        password: payload.sql_password
    });

    await new Promise<void>((resolve, reject) => {
        connection.connect(err => {
            if (err) reject(err);
            else resolve();
        });
    });

    await new Promise<void>((resolve, reject) => {
        connection.query("INSERT INTO incidents (error_name, stack_trace, version) VALUES (?, ?, ?)", [], err => {
            if (err) reject(err);
            else resolve();
        });
    });

    return {
        body: "Success"
    };
});