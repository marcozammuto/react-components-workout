import { useEffect, useState } from "react";
import "./randomQuoteGenerator.css";

const RandomQuoteGenerator = () => {
  const [data, setData] = useState([]);
  const [currentQuote, setCurrentQuote] = useState({
    text: "The beautiful thing about learning is that nobody can take it away from you",
    author: "BB King",
  });
  const [index, setIndex] = useState(1);
  const color = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  useEffect(() => {
    const url = "https://type.fit/api/quotes";
    const fetchData = async () => {
      try {
        let resp = await fetch(url);
        let jsonResp = await resp.json();
        console.log("Data fetched correctly");
        setData(jsonResp);
      } catch (error) {
        console.error("Error during fetching", error);
      }
    };
    fetchData();
  }, []);

  const quoteSwitcher = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setIndex(randomIndex);
    setCurrentQuote(data[randomIndex]);
  };

  document.body.style.backgroundColor = color[index];

  return (
    <div id="root">
      <div id="text-box">
        <blockquote className="blockquote" id="blockquote">
          <p
            className="mb-0"
            style={{ color: `${color[index]}`, textAlign: "left" }}
          >
            {currentQuote.text}
          </p>
          <footer
            className="blockquote-footer"
            style={{ color: `${color[index]}`, textAlign: "right" }}
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
          <a
            className="button-link"
            style={{ color: `${color[index]}` }}
            href="https://www.tumblr.com/"
          >
            <i className="fa-brands fas fa-bell fa-2x fa-square-tumblr"></i>
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
        </div>
      </div>
    </div>
  );
};

export default RandomQuoteGenerator;
