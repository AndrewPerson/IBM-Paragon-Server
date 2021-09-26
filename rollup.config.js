const fs = require("fs");
const path = require("path");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");

function getExports() {
    var files = fs.readdirSync(path.resolve(__dirname, "functions"));

    return files.map(file => {
        return {
            input: `functions/${file}`,
            output: {dir: "dist"},
            plugins: [
                nodeResolve(),
                terser({
                    ecma: 2020,
                    module: true,
                    warnings: true
                })
            ]
        };
    });
}

module.exports = getExports();