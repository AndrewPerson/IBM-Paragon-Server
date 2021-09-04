const fs = require('fs');
var path = require('path');

function getExports() {
    var files = fs.readdirSync(path.resolve(__dirname, "functions"));

    return files.map(file => {
        return {
            entry: `./functions/${file}`,
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: file
            },
            target: 'node'
        };
    });
}

module.exports = getExports();