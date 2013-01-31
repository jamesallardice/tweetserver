module.exports = function (data) {

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
        data.consumerKey,
        data.consumerSecret,
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
        var query = qs.stringify(req.query),
            params = req.params;
        oauth.get(BASE_URL + "/" + params.family + "/" + params.method + ".json?" + query, data.accessToken, data.accessSecret, function (err, data, response) {
            res.send(JSON.parse(data)); // Parsing to an actual object forces application/json content type
        });
    });

    http.createServer(app).listen(app.get("port"), function() {
        console.log("Express server listening on port " + app.get("port"));
    });

};