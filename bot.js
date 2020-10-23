const config = require("./config");
const twit = require("twit");
const T = new twit(config);

function retweet() {
     let params = {
          q: `#javascript`,
     };

     T.get("search/tweets", params, (err, data, res) => {
          let tweets = data.statuses;
          if (!err) {
               for (let dat of tweets) {
                    let retweetID = dat.id_str;
                    let tweet = dat.text
                    T.post(
                         "statuses/retweet/:id",
                         { id: retweetID },
                         (err, res) => {
                              if (res) {
                                   console.log("Retweeted!!" + retweetID);
                                   console.log(tweet);
                              }
                              if (err) {
                                   console.log(
                                        "something went wronge while aborting " +
                                             err
                                   );
                              }
                         }
                    );
               }
          }
     });
}

setInterval(retweet, 20000);
