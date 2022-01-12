import axios from "axios";
import { create } from "../lib/function";
import { Token } from "../lib/token";

create(async (payload: any) => {
    console.log(payload);

    return {
        body: payload
    };
});