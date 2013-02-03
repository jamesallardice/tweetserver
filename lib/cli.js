module.exports = function () {

    "use strict";

    var fs = require("fs"),
        path = require("path"),
        program = require("commander"),
        configFile,
        config = {
            auth: {}
        },
        defaults = {
            auth: {
                accessToken: null,
                accessSecret: null,
                consumerKey: null,
                consumerSecret: null
            }
        },
        CONFIG_FILE_NAME = ".tweetserverrc";

    /*
     * Search for a file, starting in `dir` and continuing right up the root.
     *
     * Adapted from JSHint (https://github.com/jshint/jshint/blob/master/src/cli/cli.js)
     */
    function findFile(name, dir) {
        var directory = dir || process.cwd(),
            filename = path.normalize(path.join(dir, name)),
            parent = path.resolve(dir, "../../");
        if (fs.existsSync(filename)) {
            return filename;
        }
        if (dir === parent) {
            return null;
        }
        return findFile(name, parent);
    }

    program
        .version("0.0.1")
        .option("-k, --access-token <key>", "your Twitter API access token")
        .option("-a, --access-secret <secret>", "your Twitter API access token secret")
        .option("-c, --consumer-key <key>", "your Twitter application consumer key")
        .option("-s, --consumer-secret <secret>", "your Twitter application consumer secret")
        .option("-p, --port <port>", "the port on which the server will run");

    program.parse(process.argv);

    // Search for a config file in any ancestor directory and the home directory
    configFile = findFile(CONFIG_FILE_NAME);
    if (!configFile) {
        configFile = path.normalize(path.join(process.env.HOME, CONFIG_FILE_NAME));
        if (!fs.existsSync(configFile)) {
            configFile = null;
        }
    }
    
    if (configFile) {
        config = JSON.parse(fs.readFileSync(configFile, "utf8"));
    }

    // Command line args override config file
    Object.keys(defaults.auth).forEach(function (key) {
        if (program[key]) {
            config.auth[key] = program[key];
        }
    });
    if (program.port) {
        config.port = program.port;
    }

    console.log(config);

    if (!config.auth.accessToken || !config.auth.accessSecret || !config.auth.consumerKey || !config.auth.consumerSecret) {
        program.help();
    }

    require("./app")(config);

};