const fs = require("fs");
const process = require("child_process");
const path = require("path");

fs.rm(path.resolve(__dirname, "dist",), {recursive: true, force: true}, () => {
    process.exec("npx rollup -c", async () => {
        var files = await new Promise(resolve => {
            fs.readdir(path.resolve(__dirname, "functions"), (err, files) => {
                resolve(files);
            });
        });

        files.forEach(async file => {
            await new Promise(resolve => {
                if (file == "auth.js") {
                    console.log(`> ibmcloud fn action update ${file.split(".")[0]} dist/${file} --web raw -a web-custom-options false`);
                    process.exec(`ibmcloud fn action update ${file.split(".")[0]} dist/${file} --web raw -a web-custom-options false`, (err, stdout) => {
                        console.log(stdout);
                        resolve();
                    });
                }
                else {
                    console.log(`> ibmcloud fn action update ${file.split(".")[0]} dist/${file} --web true -a web-custom-options false`);
                    process.exec(`ibmcloud fn action update ${file.split(".")[0]} dist/${file} --web true -a web-custom-options false`, (err, stdout) => {
                        console.log(stdout);
                        resolve();
                    });
                }
            });
        });
    });
});