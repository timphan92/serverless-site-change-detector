const axios = require("axios");
const cheerio = require("cheerio");

const _SITEURL_ = "https://wahlinfastigheter.se/lediga-objekt/lagenheter/";

module.exports = async function(context, myTimer) {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("JavaScript is running late!");
  }
  const target = await targetDocument();
  // const scan = scanDocument();
  context.log("JavaScript timer trigger function ran successfully!", timeStamp);
};

// Scan document with cheerio
async function targetDocument() {
  const $ = await fetchData();
  let availableApartments = 0;
  $(".ojects-term-list li a").map((i, el) => {
    if (i === 1) {
      const text = $(el)
        .text()
        .trim();
      const num = text.charAt(0);
      if (isNaN(num)) {
        console.log(`Text is not a number: ${num}`);
        return;
      }
      availableApartments = num;
    }
  });
  if (Number(availableApartments) > 0) {
    return Promise.resolve({
      availableApartments: Number(availableApartments)
    });
  }
  return Promise.resolve({
    availableApartments: 0
  });
}

// Scan the document body using for example regEx
async function scanDocument() {
  const $ = await fetchData();
  const htmlDocument = $.html();
  return "";
}

// Fetch site and load with cheerio
const fetchData = async () => {
  const result = await axios.get(_SITEURL_);
  return cheerio.load(result.data);
};

// "0 35 13 * * 1-5"
