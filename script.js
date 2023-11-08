

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAnime = document.getElementById('anime')
const quoteCharacter = document.getElementById('character')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');


let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show Quote
function newQuote() {
    showLoadingSpinner();
    // Picks quote from animechan api
    const quote = apiQuotes;

    // Check if anime field is blank and replace it with ''
    if (!quote.anime) {
        quoteAnime.textContent = 'Unknown';
    } else {
        quoteAnime.textContent = quote.anime;
    }

    if (quote.quote.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    quoteText.textContent = quote.quote;
    quoteCharacter.textContent = quote.character;
    removeLoadingSpinner();

}

// Get Quote from an API
async function getQuotes() {
    showLoadingSpinner();
    const apiURL = 'https://animechan.xyz/api/random';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch an Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAnime.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
