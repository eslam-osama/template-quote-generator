const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Loading Spinner

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// Get Quotes From API Global
async function getQuotes() {
  showLoadingSpinner();
  const prosxyurl = "https://cors-anywhere.herokuapp.com/";
  const apiurl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(prosxyurl + apiurl);
    const data = await response.json();
    // If author is blank, add 'Unknown'
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;

    removeLoadingSpinner();
  } catch (error) {
    getQuotes();
  }
}
//Show New Quote

function newQuote() {
  showLoadingSpinner();
  // get Quote From quotes.js local api
  //Pick a random quote from apiQuotes array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  //Check if Author: NULL
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  removeLoadingSpinner();
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const twitterUrl = `https://x.com/intent/post?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

newQuote();
// getQuotes();
