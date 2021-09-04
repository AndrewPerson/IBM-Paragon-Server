const fs = require("fs");
const process = require("child_process");
const path = require("path");

fs.rm(path.resolve(__dirname, "dist",), {recursive: true, force: true}, () => {
    process.exec("webpack", async () => {
        var files = await new Promise(resolve => {
            fs.readdir(path.resolve(__dirname, "functions"), (err, files) => {
                resolve(files);
            });
        });

        files.forEach(async file => {
            await new Promise(resolve => {
                console.log(`> ibmcloud fn action update ${file.split(".")[0]} dist/${file} --web true`);
                process.exec(`ibmcloud fn action update ${file.split(".")[0]} dist/${file} --web true`, (err, stdout) => {
                    console.log(stdout);
                    resolve();
                });
            });
        });
    });
});