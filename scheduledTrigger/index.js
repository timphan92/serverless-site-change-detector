const axios = require("axios");
const cheerio = require("cheerio");

const _SITEURL_ = "SITE_URL"; // Page to scan here

module.exports = async function(context, myTimer) {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("JavaScript is running late!");
  }
  const target = await targetDocument(); // Scan document with Cheerio
  const scan = await scanDocument(); // Get HTML-Document and target elements yourself
  context.log("JavaScript timer trigger function ran successfully!", timeStamp);
};

// Scan document with cheerio. Check documentation at https://www.npmjs.com/package/cheerio
async function targetDocument() {
  const $ = await fetchData();
  const returnValue = $(".apple", "#fruits").text();
  return Promise.resolve({ returnValue });
}

// Scan the document body using for example regEx
async function scanDocument() {
  const $ = await fetchData();
  const htmlDocument = $.html();
  const returnValue = ""; // For example use htmlDocument and regExp to target element viewed in browser with inspect
  return Promise.resolve({});
}

// Fetch site and load with cheerio
const fetchData = async () => {
  const result = await axios.get(_SITEURL_);
  return cheerio.load(result.data);
};
