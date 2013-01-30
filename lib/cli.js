module.exports = function () {

    "use strict";

    var program = require("commander");

    program
        .version("0.0.1")
        .option("-k, --key <key>", "your Twitter API access token")
        .option("-p, --private <secret>", "your Twitter API access token secret"),
        .option("-c, --consumer <key>", "your Twitter application consumer token"),
        .option("-s, --secret <secret>", "your Twitter application consumer secret");

    program.parse(process.argv);

    if (!program.key || !program.secret || !program.consumer || !program.private) {
    	program.help();
    }

    require("./app")(program.key, program.secret);

};