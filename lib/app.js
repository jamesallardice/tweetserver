module.exports = function (config) {

    "use strict";

    var BASE_URL = "https://api.twitter.com/1.1",
        express = require("express"),
        OAuth = require("oauth").OAuth,
        http = require("http"),
        path = require("path"),
        qs = require("querystring"),
        app = express(),
        oauth;

    app.configure(function() {
        app.set("port", process.env.PORT || 3000);
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
    });

    oauth = new OAuth(
        "https://api.twitter.com/oauth/request_token",
        "https://api.twitter.com/oauth/access_token",
        config.auth["consumer-key"],
        config.auth["consumer-secret"],
        "1.0A",
        null,
        "HMAC-SHA1",
        null,
        {
            Accept: "*/*",
            Connection: "close",
            "User-Agent": "node-tweetserver"
        }
    );

    app.get("/:family/:method", function (req, res) {
        var query = qs.stringify(req.query).replace(/(^|&)callback=[^&]+/, ""),
            params = req.params,
            url = BASE_URL + "/" + params.family + "/" + params.method + ".json?" + query;
        oauth.get(url, config.auth["access-token"], config.auth["access-secret"], function (err, data, response) {
            res.jsonp(JSON.parse(data));
        });
    });

    http.createServer(app).listen(app.get("port"), function() {
        console.log("Express server listening on port " + app.get("port"));
    });

};