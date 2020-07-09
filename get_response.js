const emojis = require("./data/emojis.json");

const tfidf = require("./tfidf");

const emoji_set = Object.keys(emojis);

const tone_score = new Set();

const check_score = (set) => {
  if (set.size === 2) {
    return { res: "confused" };
  } else if (set.has("positive")) {
    return { res: "positive" };
  } else if (set.has("negative")) {
    return { res: "negative" };
  } else {
    return { res: "neutral" };
  }
};

const get_response = (msg) => {
  msg.split("").forEach((char) => {
    if (emoji_set.join("").includes(char)) {
      if (emoji_set[0].includes(char)) {
        tone_score.add("positive");
      } else if (emoji_set[1].includes(char)) {
        tone_score.add("negative");
      }
    }
  });

  if (tone_score.size !== 0) {
    return check_score(tone_score);
  }

  return check_score(new Set().add(tfidf(msg)));
};

module.exports = get_response;
