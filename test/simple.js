var assert = require('assert'),
    smtpCatchAll = require('..'),
    nodemailer = require('nodemailer');

function sendEmail() {
    var smtpTransport = nodemailer.createTransport('SMTP', {
        port: 4040,
        debug: false
    });
    smtpTransport.sendMail({
        from: 'me@gmail.com',
        to: 'you@gmail.com',
        subject: 'hey, ho',
        text: "let's go"
    }, function (err, responseStatus) {
        if (err) {
            console.error(err);
            console.trace(err.stack);
        }
    });
}
describe('Catch all smtp messages', function () {
    var email;
    before(function (done) {
        var server = smtpCatchAll.createServer();
        server.on('newEmail', function (msg) {
            email = msg;
            done();
        });
        server.listen(4040, function (err) {
            if (err) {
                console.error(err);
                console.trace(err.stack);
            }
            sendEmail();
        });
    });
    it('should catch all emails', function () {
        assert(email);
    });
});
