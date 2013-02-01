module.exports = function (config) {

    "use strict";

    var BASE_URL = "https://api.twitter.com/1.1",
        express = require("express"),
        allowed = require("./api"),
        OAuth = require("oauth").OAuth,
        http = require("http"),
        qs = require("querystring"),
        rCallbackParam = /(^|&)callback=[^&]+/,
        app = express(),
        cache = {},
        oauth;

    function request(req, res, url) {
        var query = qs.stringify(req.query).replace(rCallbackParam, ""),
            cached;
        url = BASE_URL + "/" + url + "?" + query;
        cached = cache[url];
        if (cached && +new Date() < cached.next) {
            res.jsonp(JSON.parse(cached.data));
        } else {
            oauth.get(url, config.auth["access-token"], config.auth["access-secret"], function (err, data, response) {
                var now = new Date(),
                    remainingWindow = (response.headers["x-rate-limit-reset"] * 1000) - (+new Date()),
                    remainingLimit = response.headers["x-rate-limit-remaining"];
                cache[url] = {
                    data: data,
                    now: +now,
                    next: +now.setSeconds(now.getSeconds() + (Math.ceil(remainingWindow / remainingLimit / 1000)))
                };
                res.jsonp(JSON.parse(data));
            });
        }
    }

    app.configure(function() {
        app.set("port", config.port || 3456);
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

    app.get("/:family/:method?", function (req, res) {
        var params = req.params;
        if (params.method) {
            request(req, res, params.family + "/" + params.method + ".json");
        } else if (allowed.families.indexOf(params.family) > -1) {
            request(req, res, params.family + ".json");
        } else {
            res.send(404);
        }
    });

    http.createServer(app).listen(app.get("port"), function() {
        console.log("tweetserver is now listening on port " + app.get("port"));
    });

};