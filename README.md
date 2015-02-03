[![build status](https://secure.travis-ci.org/revington/catch-all.png)](http://travis-ci.org/revington/catch-all)
catch-all
=========

A simple smtp-catch-all for your tests (node.js).  

## install

    $ npm install catch-all

## Usage

Simple usage:

    var smtpCatchAll = require('catch-all');
    var server = smtpCatchAll.createServer();
    server.on('newEmail', function (email) {
        console.log(email);
    });
    server.listen(4040);

Accessing the envelope:

    var smtpCatchAll = require('catch-all');
    var server = smtpCatchAll.createServer();
    server.on('newEmail', function (email, envelope) {
        console.log(envelope);
    });
    server.listen(4040);

catch-all is based on [simplesmtp](https://github.com/andris9/simplesmtp). You can pass same [options](https://github.com/andris9/simplesmtp#advanced-smtp-server) to createServer  

The returned `server` is also an instance of simplesmtp. You can listen to the same events  
In the same way.
## Email format

Email is just a simple json email like:

    { text: 'cuentame lo k ase',
    headers: 
     [ { name: 'x-mailer',
         value: 'Nodemailer (0.5.3; +http://www.nodemailer.com/)' },
       { name: 'date', value: 'Tue, 12 Nov 2013 19:48:53 GMT' },
       { name: 'message-id',
         value: '<1384285733880.5b4d56c9@Nodemailer>' },
       { name: 'from', value: 'me@gmail.com' },
       { name: 'to', value: 'you@gmail.com' },
       { name: 'subject', value: 'ola k ase' },
       { name: 'content-type', value: 'text/plain; charset=utf-8' },
       { name: 'content-transfer-encoding', value: 'quoted-printable' },
       { name: 'mime-version', value: '1.0' } ],
    subject: 'ola k ase',
    messageId: '1384285733880.5b4d56c9@Nodemailer',
    priority: 'normal',
    from: [ { address: 'me@gmail.com', name: '' } ],
    to: [ { address: 'you@gmail.com', name: '' } ],
    date: Tue Nov 12 2013 20:48:53 GMT+0100 (CET) }

