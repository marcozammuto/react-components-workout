import { useEffect, useState } from "react";
import "./randomQuoteGenerator.css";

const RandomQuoteGenerator = () => {
  const [data, setData] = useState([]);
  const [currentQuote, setCurrentQuote] = useState({
    text: "The beautiful thing about learning is that nobody can take it away from you",
    author: "BB King",
  });
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState([]);

  useEffect(() => {
    const url = "https://type.fit/api/quotes";
    const fetchQuotes = async () => {
      try {
        let resp = await fetch(url);
        let jsonResp = await resp.json();
        console.log("Sentences fetched correctly");
        setData(jsonResp);
      } catch (error) {
        console.error("Error during fetching sentences", error);
        throw error;
      }
    };

    const fetchColors = async () => {
      try {
        const response = await fetch(
          "https://random-flat-colors.vercel.app/api/random?count=49"
        );
        const jsonResponse = await response.json();
        console.log("Colors fetched correctly");
        setColor(jsonResponse.colors);
        console.log(jsonResponse.colors);

        return jsonResponse;
      } catch (error) {
        console.error("Error during fetching colors", error);
        throw error;
      }
    };

    fetchColors();
    fetchQuotes();
  }, []);

  const quoteSwitcher = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setIndex(randomIndex);
    setCurrentQuote(data[randomIndex]);
  };

  document.body.style.backgroundColor = color[index];

  return (
    <div id="root">
      <h3 style={{ fontSize: "20px", textAlign: "left" }}>
        React prog #3: Random Quote Generator
      </h3>
      <div id="text-box">
        <blockquote className="blockquote" id="blockquote-id">
          <p
            className="mb-0"
            style={{
              color: `${color[index]}`,
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            {currentQuote.text}
          </p>
          <footer
            className="blockquote-footer"
            style={{
              color: `${color[index]}`,
              textAlign: "right",
              fontWeight: "350",
            }}
          >
            {currentQuote.author}
          </footer>
        </blockquote>
        <hr style={{ color: `${color[index]}` }}></hr>

        <div id="buttons">
          <a
            className="button-link"
            style={{ color: `${color[index]}` }}
            href="https://twitter.com/intent/tweet"
          >
            <i className="fa-brands fas fa-bell fa-2x fa-square-twitter"></i>
          </a>
          <button
            className="custom-button"
            style={{
              backgroundColor: `${color[index]}`,
            }}
            onClick={() => quoteSwitcher()}
          >
            <i className="fa-regular fa-comment"></i>
          </button>
          <a
            className="button-link"
            style={{ color: `${color[index]}` }}
            href="https://www.tumblr.com/"
          >
            <i className="fa-brands fas fa-bell fa-2x fa-square-tumblr"></i>
          </a>

          
        </div>
      </div>
    </div>
  );
};

export default RandomQuoteGenerator;
