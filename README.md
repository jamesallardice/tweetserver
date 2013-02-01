# TweetServer

TweetServer is a simple Node.js app for querying and caching responses from the Twitter REST API (version 1.1). It runs as a standalone server (built on Express) and effectively proxies any requests over to the API.

It handles rate limits for you, ensuring that the returned data is as up-to-date as possible without getting your application blacklisted for making too many requests.

## Setup

TweetServer is available as through npm. That's the recommended method of installation. Just install it as a global module:

    npm install -g tweetserver
    
### Configuration

TweetServer assumes you already have a Twitter application. If you don't, you can easily [create one](https://dev.twitter.com/apps).

You'll need various credentials from Twitter to setup your Tweet Server. They can be found on the details page for the Twitter application you want to use. Sign in at the URL linked to above and make a note of your consumer key, consumer secret, access token and access token secret.

TweetServer will look for a configuration file on startup. Create a file named `.tweetserverrc` in your home directory, or the directory to which TweetServer was installed (any of the parent directories, including the root directory, will work too).

The `.tweetserverrc` file contains simple JSON in the following format:

```javascript
{
    "port": 1234,
    "auth": {
        "access-token": "xxxxx",
        "access-secret": "xxxxx",
        "consumer-key": "xxxxx",
        "consumer-secret": "xxxxx"
    }
}
```

If you'd prefer not to store your API keys in a file, you can also specify them at startup with the following command line arguments:

| Short option  | Long option         | Value                                 |
| ------------- |---------------------| --------------------------------------|
| `-k`          | `--access-token`    | Your Twitter API access token         |
| `-a`          | `--access-secret`   | Your Twitter API access token secret  |
| `-c`          | `--consumer-key`    | Your Twitter API consumer key         |
| `-s`          | `--consumer-secret` | Your Twitter API consumer secret      |
| `-p`          | `--port`            | The port on which the server will run |

If you specify command line arguments and have a configuration file, the command line arguments will override the configuration file. You can run the server with any number of the arguments.

### Running the server

If you installed TweetServer via npm with the `-g` (global) option, you will have a `tweetserver` command available to you. Just run that from anywhere (optionally with any of the command line arguments detailed above) to start the server:

    tweetserver
    
You will see a message that tells you the server is now running. At this point you'll be able to open a browser and check that everything's working properly. Assuming your Tweet Server is running on `localhost` on port 3456 (which is the default), you can visit:

    http://localhost:3456/statuses/user_timeline?screen_name=james_allardice
    
If you've used the Twitter API much before, you may have noticed that everything after the port in that URL is simply the same as what you would usually use when calling the API directly. Currently, all [Twitter API v1.1 methods](https://dev.twitter.com/docs/api/1.1) that support HTTP GET requests are supported.

#### Keeping the server running

I highly recommend using the brilliant "[forever](https://github.com/nodejitsu/forever)" module to keep your server up and running all the time.
