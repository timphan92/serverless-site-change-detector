const axios = require("axios");
const cheerio = require("cheerio");
const sgMail = require("@sendgrid/mail");

const _SITEURL_ = "yoursiteurl";

module.exports = async function(context, myTimer) {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("JavaScript is running late!");
  }
  const target = await targetDocument();
  if (target.availableApartments > 0) {
    context.log("Trigger function found available apartments!", timeStamp);
    sendMail(target);
  }
};

// example for sending mail with sendgrid
function sendMail(target) {
  sgMail.setApiKey(
    "" // Use your API-key here or store it in .env
  );
  const msg = {
    to: "yourmail",
    from: "frommail",
    subject: "subject",
    text: `Available apartments: ${target.availableApartments}`,
    html: `<div><h3>Available apartments: ${target.availableApartments}</h3><p>Link: https://alinkhere.se</p></div>`
  };
  sgMail.send(msg);
}

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

// Fetch site and load with cheerio
const fetchData = async () => {
  const result = await axios.get(_SITEURL_);
  return cheerio.load(result.data);
};

//
