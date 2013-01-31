module.exports = function () {

    "use strict";

    var program = require("commander");

    program
        .version("0.0.1")
        .option("-k, --key <key>", "your Twitter API access token")
        .option("-p, --private <secret>", "your Twitter API access token secret")
        .option("-c, --consumer <key>", "your Twitter application consumer token")
        .option("-s, --secret <secret>", "your Twitter application consumer secret");

    program.parse(process.argv);

    // HARDCODED FOR TESTING... REMOVE THIS
    program.key = "612821980-5naVcPdyotJrt2CXCXsdGYNqmif01Hhi2jMbbWfg";
    program.private = "7jgv06BDVKsmw3XzSDjElyuCwb1MIvZt9ohdIxBMd8";
    program.consumer = "RSzAIXxILP68dNnhfU8oew";
    program.secret = "ThpXvVktEvdMS9zyxpBD7DIrthDAztRfBuIFI9dlk";
    // END REMOVE

    if (!program.key || !program.private || !program.consumer || !program.secret) {
        program.help();
    }

    require("./app")({
        accessToken: program.key,
        accessSecret: program.private,
        consumerKey: program.consumer,
        consumerSecret: program.secret
    });

};