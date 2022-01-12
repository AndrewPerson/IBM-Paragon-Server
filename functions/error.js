import axios from "axios";
import { create } from "../lib/function";
import { Token } from "../lib/token";

create(async (payload) => {
    console.log(payload);

    return {
        body: "Error Logged"
    };
});