const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading Spinner
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Show new  Quote
function getQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    try {
        // Check is author field is blank and replace it with unknown
        if (!quote.author) {
            authorText.textContent = 'Unknown';
        } else {
            authorText.textContent = quote.author;
        }
    
        //Check Quote length to determine styling
        if (quote.text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.textContent = quote.text;
        removeLoadingSpinner(); 
        throw new Error('oops Something is wrong');
    } catch (error) {
        console.log(error)
        getQuote();
    }   
}

// Get Quotes From API
async function getQuotesFromAPI() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response =  await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        throw new Error('oops Something is wrong');
    } catch (error) {
        console.log(error)
        getQuotesFromAPI();
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// ON Load
getQuotesFromAPI();
