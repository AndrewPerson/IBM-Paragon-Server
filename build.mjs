import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("./config.json");

import { build } from "esbuild";
import clear from "esbuild-plugin-clear";
import glob from "glob";

import axios from "axios";
import { URLSearchParams } from "url";

import openwhisk from "openwhisk";

import { readFile } from "fs/promises";

Main();
async function Main() {
    let files = await new Promise((resolve, reject) => {
        glob.glob("functions/*.ts", (err, files) => {
            if (err)
                reject(err);
            else
                resolve(files);
        });
    });

    await build({
        entryPoints: files,
        outdir: "dist",
        bundle: true,
        minify: true,
        treeShaking: true,
        target: "es2017",
        platform: "node",
        plugins: [
            clear("./dist"),
            {
                name: "plugin-excluder",
                setup(build) {
                    build.onResolve({ filter: /(axios)|(promise-mysql)/ }, args => {
                        return {
                            external: true
                        }
                    });
                }
            }
        ]
    });

    var response = await axios.post("https://iam.cloud.ibm.com/identity/token",
        new URLSearchParams({
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
            "apikey": config.IBM_API_KEY
        }).toString()
    );
    
    let client = openwhisk({
        apihost: "au-syd.functions.cloud.ibm.com",
        auth_handler: {
            async getAuthHeader() {
                return `Bearer ${response.data.access_token}`;
            }
        }
    });

    let builtFiles = await new Promise((resolve, reject) => {
        glob.glob("dist/*.js", (err, files) => {
            if (err)
                reject(err);
            else
                resolve(files);
        });
    });

    await Promise.all(builtFiles.map(async file => {
        let pathSegments = file.split("/");
        let name = pathSegments[pathSegments.length - 1].split(".")[0];

        await client.actions.create({
            name: name,
            namespace: config.IBM_FUNCTIONS_NAMESPACE,
            action: await readFile(file, "utf8"),
            overwrite: true,
            limits: {
                memory: config[name]?.memory ?? 128,
                timeout: config[name]?.timeout ?? 1000
            },
            annotations: {
                "web-export": true,
                "final": true,
                "raw-http": false,
                "require-whisk-auth": false
            }
        }).then(() => {
            console.log(`Created ${name}`);
        }).catch(err => {
            console.error(`Failed to create ${name}: ${err}`);
        });
    }));
}
