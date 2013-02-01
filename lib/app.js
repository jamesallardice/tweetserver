module.exports = function (config) {

    "use strict";

    var BASE_URL = "https://api.twitter.com/1.1",
        express = require("express"),
        OAuth = require("oauth").OAuth,
        http = require("http"),
        qs = require("querystring"),
        app = express(),
        oauth;

    function request(req, res, url) {
        var query = qs.stringify(req.query).replace(/(^|&)callback=[^&]+/, ""),
            params = req.params;
        url = BASE_URL + "/" + url + "?" + query;
        oauth.get(url, config.auth["access-token"], config.auth["access-secret"], function (err, data, response) {
            res.jsonp(JSON.parse(data));
        });
    }

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

    app.get("/:family/:method?", function (req, res, next) {
        var params = req.params;
        if (params.method) {
            request(req, res, params.family + "/" + params.method + ".json");
        } else {
            request(req, res, params.family + ".json");
        }
    });

    http.createServer(app).listen(app.get("port"), function() {
        console.log("tweetserver is now listening on port " + app.get("port"));
    });

};