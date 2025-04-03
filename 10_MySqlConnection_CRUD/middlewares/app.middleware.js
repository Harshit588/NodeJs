const fs = require('fs');

function logReqRes(fileName) {
    return function (req, res, next) {
        const log = `Request: ${req.method} ${req.url}  Response: ${res.statusCode} Time: ${new Date().toLocaleString()}\n`;
        fs.appendFile(fileName, log, (err) => {
            if (err) throw err;
        });
        next();
    };
}

module.exports = logReqRes;