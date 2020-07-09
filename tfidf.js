const data = require("./data/phrases.json");

score = {};

keys = Object.keys(data);

const puncs = "!#$%&'()*+, -./:;<=>?@[]^_`{|}~";

const text_process = (text) => {
  no_punc = [];
  for (var i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      no_punc.push(" ");
    } else if (!puncs.includes(text[i])) {
      no_punc.push(text[i]);
    }
  }
  return no_punc.join("");
};

const tf = (term, doc) => {
  count = 0;
  doc_arr = doc.split(" ");
  for (var i = 0; i < doc_arr.length; i++) {
    if (doc_arr[i] === term) {
      count++;
    }
  }
  return count / doc_arr.length;
};

const idf = (term, docs) => {
  doc_count = 0;
  for (var i = 0; i < docs.length; i++) {
    doc_array = docs[i].split(" ");
    if (doc_array.includes(term)) {
      doc_count++;
    }
  }
  return 1 + Math.log(docs.length / doc_count);
};

const get_response = (raw_text) => {
  let text = text_process(raw_text).toLowerCase().split(" ");
  max_key = "";
  max_score = 0;
  keys.forEach((key) => {
    key_score = 0;
    text.forEach((word) => {
      tf_sc = tf(word, key);
      idf_sc = idf(word, keys);
      if (!isNaN(tf_sc * idf_sc)) {
        key_score += tf_sc * idf_sc;
      }
    });
    score[key] = key_score;
    if (key_score > max_score) {
      max_score = key_score;
      max_key = key;
    }
  });
  return data[max_key];
  //return score;
};

module.exports = get_response;
