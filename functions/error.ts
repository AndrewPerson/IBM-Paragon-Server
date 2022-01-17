import { create } from "../lib/function";

import { createConnection } from "mysql";

create(async (payload: any) => {
    let connection = createConnection({
        host: payload.SQL_HOST,
        port: 3306,
        user: payload.SQL_USER,
        password: payload.SQL_PASSWORD,
        database: "paragon",
        ssl: { rejectUnauthorized: true }
    });

    await new Promise<void>((resolve, reject) => {
        connection.connect(err => {
            if (err) reject(err);
            else resolve();
        })
    });

    await new Promise<void>((resolve, reject) => {
        connection.query("INSERT INTO incidents (error_message, stack_trace, version) VALUES (?, ?, ?)",
                         [payload.error_message, payload.stack_trace, payload.version],
                         err => {
                             if (err) reject(err);
                             else resolve();
                         });
    });

    return {
        body: "Success"
    };
});