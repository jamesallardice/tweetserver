module.exports = (function () {

    "use strict";

    return {
        // A list of all allowed Twitter API resource families
        families: [
            "statuses",
            "search",
            "direct_messages",
            "friendships",
            "friends",
            "followers",
            "account",
            "blocks",
            "users",
            "favorites",
            "lists",
            "saved_searches",
            "geo",
            "trends",
            "oauth",
            "help",
            "application"
        ]
    };

}());