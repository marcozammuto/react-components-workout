import React, { useState } from "react";
import "./randomQuoteGenerator.css";

const RandomQuoteGenerator = () => {
  const [color, setColor] = useState([
    "#4682B4",
    "#32CD32",
    "#FF6347",
    "#9370DB",
    "#FF4500",
    "#00CED1",
    "#8A2BE2",
    "#FFA07A",
    "#FF8C00",
  ]);
  const quotes = [
    {
      quote:
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
    },
    {
      quote: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    },
    {
      quote:
        "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
      author: "Steve Jobs",
    },
    {
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      quote:
        "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
      author: "Oprah Winfrey",
    },
    {
      quote:
        "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
      author: "James Cameron",
    },
    {
      quote:
        "You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.",
      author: "John Lennon",
    },
    {
      quote: "You must be the change you wish to see in the world.",
      author: "Mahatma Gandhi",
    },
    {
      quote:
        "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
      author: "Mother Teresa",
    },
    {
      quote: "The only thing we have to fear is fear itself.",
      author: "Franklin D. Roosevelt",
    },
  ];

  const [quoteColor, setQuoteColor] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(
    "Everybody should learn to program a computer, because it teaches you how to think."
  );
  const [currentAuthtor, setCurrentAuthor] = useState("Elon Musk");
  const [showContent, setShowContent] = useState(false);

  const quoteSwitcher = () => {
    const randomIndex = Math.floor(Math.random() * this.state.quotes.length);
    const randomQuote = quotes[randomIndex];
    const randomColor = color[randomIndex];
    document.body.style.backgroundColor = randomColor;
    setCurrentIndex(randomIndex);
    setCurrentQuote(randomQuote.quote);
    setCurrentAuthor(randomQuote.author);
    setColor(randomColor);
  };

  return (
    <div id="root">
      <div id="quote-box" className={showContent ? "show" : ""}>
        <div id="text-box">
          <h1 style={{ color: "currentColor" }} id="text">
            " {currentQuote}
          </h1>
          <h2 style={{ color: "currentColor" }} id="author">
            - {currentAuthtor}
          </h2>
          <div id="buttons">
            <div id="tweet-quotes">
              <a
                style={{ color: "currentColor" }}
                id="tweet-quote"
                href="https://twitter.com/intent/tweet"
              >
                <i className="fa-brands fas fa-bell fa-2x fa-square-twitter"></i>
              </a>
              <a
                style={{ color: "currentColor" }}
                id="tumblr-quote"
                href="https://www.tumblr.com/"
              >
                <i className="fa-brands fas fa-bell fa-2x fa-square-tumblr"></i>
              </a>
            </div>
            <button
              style={{
                color: "black",
                backgroundColor: "currentColor",
              }}
              id="new-quote",
              onClick={
                quoteSwitcher()
              }
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuoteGenerator;
