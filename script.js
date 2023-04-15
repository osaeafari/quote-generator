const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show Loading Spinner
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading Spinner when fetch is complete
function complete(){
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote
function newQuote(){
  loading();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // to check if the author field is blank and replace it with 'unknown'
  if(!quote.author){
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // check the quote length to deteremine styling
  if(quote.text.length > 150){
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  //Set Quote and Hide loader 
  quoteText.textContent = quote.text;
  complete();
}

// Get quotes from API
async function getQuotes(){
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch(error) {
    // Catch error Here
  }
}

// Tweet Quote 
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();