var simplesmtp = require('simplesmtp'),
    MailParser = require('mailparser').MailParser;

function processEmail(email) {
    email.headers = Object.keys(email.headers).map(function (header) {
        return {
            name: header,
            value: email.headers[header]
        };
    });
}

function createServer(options) {
    var smtp;
    smtp = simplesmtp.createServer(options);
    smtp.on('startData', function (envelope) {
        envelope.buffer = '';
        envelope.date = new Date();
    });
    smtp.on('data', function (envelope, chunk) {
        envelope.buffer += chunk;
    });
    smtp.on('dataReady', function (envelope, callback) {
        var mailParser = new MailParser();
        mailParser.on('end', function (email) {
            processEmail(email);
            email.date = envelope.date;
            smtp.emit('newEmail', email, envelope);
        });
        mailParser.write(envelope.buffer);
        mailParser.end();
        callback();
    });
    return smtp;
}
exports.createServer = createServer;
