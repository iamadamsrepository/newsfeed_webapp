import "./App.css";

import { Analytics } from "@vercel/analytics/react"
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";

import StoriesList from "./StoriesList"
import StoryPage from "./StoryPage"
import { apiHost, colors } from "./config";

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (stories.length === 0) {
        console.log("fetching data");
        const url = apiHost + "/stories";
        let response = await fetch(url);
        let stories = await response.json();
        stories.forEach((story) => {
          story.n_articles = story.articles.length;
        });
        setStories(stories);
        console.log(stories);
      }
    };
    getData();
  }, [stories]);

  const about = (
    <div style={{ margin: "10px", padding: "10px", lineHeight: "1.6", backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
      <h1>About Digesticle</h1>
      <p>
        At Digesticle, we believe staying informed should be simple, clear, and balanced. We're building the world’s first true news digestion engine — designed to help you quickly understand what’s happening in the world without the overwhelm.
      </p>
      <p>
        Each day, countless stories unfold across trusted English-language news sources. Digesticle brings these stories together, distilling the core facts into concise, unbiased summaries that are easy to read and easy to trust.
      </p>
      <p>
        But we don’t stop at summaries. For every story, we highlight how it’s being covered from different angles, giving you a clear sense of consensus, contrast, and nuance. And if you want to dive deeper, you’ll find a curated set of links to explore full articles from respected publications.
      </p>
      <p>
        We’re in our early days — but our mission is clear: to help you cut through the noise, see the big picture, and stay informed with confidence.
      </p>
      <p>
        Dedicated to my sweet and lovely Sharon ❤️
      </p>
    </div>
  );

  return (
    <Router>
      <div
        className="font-body text-mydarkRed bg-white min-h-screen"
      >
        <Helmet>
          <title>Digesticle</title>
        </Helmet>
        <header
          className="border-b-2"
          style={{
            // backgroundColor: colors.grayRed,
            display: "flex",
            alignItems: "center",
            padding: "10px",
            // fontFamily: "Verdana",
          }}
        >
          <Link to="/">
            <img src="name_logo.png" alt="Logo" style={{ height: "50px", marginRight: "30px" }} />
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: colors.black,
              marginRight: "30px",
            }}
            className="text-[20px]"
            to="/"
          >
            <div>Stories</div>
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: colors.black,
              marginRight: "30px",
            }}
            className="text-[20px]"
            to="/about"
          >
            <div>About</div>
          </Link>
        </header>
        <Routes>
          <Route exact path="/" element={<StoriesList stories={stories}/>} />
          <Route path="/about" element={about} />
          <Route path="/story/:id" element={<StoryPage />}></Route>
        </Routes>
        <footer>
          <p>&copy; 2025 Digesticle</p>
        </footer>
      </div>
      <Analytics/>
    </Router>
  );
}

export default App;
