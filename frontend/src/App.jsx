import { useState, useEffect, useRef } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighLight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [code, setCode] = useState(`function sum(){
  return 1+1 
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const reviewRef = useRef(null);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    setReview(""); // clear previous result
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/get-review`, { code }); 

      setReview(response.data);
    } catch (err) {
      setReview("Error fetching review. Please try again.");
    } finally {
      setLoading(false);
      if (reviewRef.current) {
        reviewRef.current.scrollTop = 0; // scroll to top
      }
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <button onClick={reviewCode} className="review-btn" disabled={loading}>
          {loading ? "Analyzing..." : "Review"}
        </button>
      </div>

      <div className="right" ref={reviewRef}>
        {loading ? (
          <div className="loader-container">
            <span className="letter">C</span>
            <span className="letter">O</span>
            <span className="letter">D</span>
            <span className="letter">E</span>
          </div>
        ) : (
          <Markdown rehypePlugins={[rehypeHighLight]}>{review}</Markdown>
        )}
      </div>
    </main>
  );
}

export default App;
