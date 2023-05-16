import React, { useState, useEffect } from 'react';
import './index.css'

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data.content);
        setAuthor(data.author);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${quote} - ${author}`
    )}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div class="container">
    <div class="quote-box" id="quote-box">
      <h1 class="quote-text" id="text">{quote}</h1>
      <p class="quote-author" id="author">- {author}</p>
      <div class="button-group">
        <button class="new-quote-button" id="new-quote" onClick={fetchQuote}>
          New Quote
        </button>
        <a
          class="tweet-quote-link"
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote} - ${author}`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet Quote
        </a>
      </div>
    </div>
  </div>
  
  );
}

export default App;
