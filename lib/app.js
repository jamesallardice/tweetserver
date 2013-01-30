module.exports = function (data) {

    "use strict";

    var express = require("express"),
        OAuth = require("oauth").OAuth,
        http = require("http"),
        path = require("path"),
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
        consumerKey,
        consumerSecret,
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

    app.get("/", function (req, res) {
        oauth.get()
    });

    http.createServer(app).listen(app.get("port"), function() {
        console.log("Express server listening on port " + app.get("port"));
    }); 

};