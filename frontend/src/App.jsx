import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighLight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Editor from "./components/Editor";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [code, setCode] = useState(`function sum(){
  return 1+1 
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("javascript");

  function getFirstMeaningfulLine(code) {
    const lines = code.split("\n");

    for (let line of lines) {
      const trimmed = line.trim();

      if (
        trimmed === "" ||                 // empty
        trimmed.startsWith("//") ||       // JS single-line comment
        trimmed.startsWith("/*") ||       // block comment start
        trimmed.startsWith("*") ||        // inside block comment
        trimmed.startsWith("#")           // Python, bash comments
      ) {
        continue;
      }

      return trimmed;
    }

    return "";
  }

  useEffect(() => {
    const firstLine = getFirstMeaningfulLine(code).toLowerCase();

    if (["function", "const", "let", "var", "import", "export"].some(key => firstLine.includes(key))) {
      setLanguage("javascript");
    } else if (firstLine.includes("def ")) {
      setLanguage("python");
    } else if (firstLine.includes("public class") || firstLine.includes("import java")) {
      setLanguage("java");
    } else if (firstLine.includes("#include <stdio.h>")) {
      setLanguage("c");
    } else if (firstLine.includes("#include <iostream>")) {
      setLanguage("cpp");
    } else if (firstLine.includes("<?php")) {
      setLanguage("php");
    } else if (firstLine.includes("<!doctype html>")) {
      setLanguage("html");
    } else {
      setLanguage("");
    }
  }, [code]);
  const reviewRef = useRef(null);

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
    <div className="h-screen w-screen flex flex-col bg-[#0f172a] overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Code Reviewer
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden relative">
        {/* Editor Panel - Left */}
        <section className="flex-1 flex flex-col glass-panel overflow-hidden">
          <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center text-xs font-medium text-slate-400 uppercase tracking-wider">
            <span>Source Code</span>
            <span className="text-indigo-400">{language.toUpperCase() || "Text"}</span>
          </div>
          <div className="flex-1 overflow-auto relative custom-scrollbar">
            <Editor
              value={code}
              onChange={(val) => setCode(val)}
              language={language}
            />
          </div>

          <button
            onClick={reviewCode}
            disabled={loading}
            className="
    btn-primary 
    fixed md:absolute 
    bottom-4 md:bottom-8 
    right-4 md:right-8 
    z-20 
    flex items-center gap-2 
    px-4 py-2 md:px-5 md:py-3 
    text-sm md:text-base 
    rounded-lg md:rounded-xl
    shadow-lg
  "
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <span className="hidden sm:inline">Analyzing...</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Review Code</span>
                <span className="sm:hidden">Review</span>
              </>
            )}
          </button>
        </section>

        {/* Review Panel - Right */}
        <section
          ref={reviewRef}
          className="flex-1 flex flex-col glass-panel overflow-y-auto custom-scrollbar bg-slate-900/40 relative"
        >
          <div className="sticky top-0 z-10 px-4 py-2 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 flex justify-between items-center text-xs font-medium text-slate-400 uppercase tracking-wider">
            <span>AI Feedback</span>
            {review && <span className="text-emerald-400">Generated</span>}
          </div>

          <div className="flex-1 p-6 text-slate-300 space-y-4
            [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mb-4
            [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-white [&>h2]:mb-3 [&>h2]:mt-6
            [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-white [&>h3]:mb-2 [&>h3]:mt-4
            [&>p]:leading-relaxed [&>p]:mb-4
            [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul]:space-y-2
            [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ol]:space-y-2
            [&>pre]:bg-slate-800/50 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:my-4 [&>pre]:border [&>pre]:border-slate-700/50 [&>pre]:overflow-x-auto
            [&>code]:bg-slate-800 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-indigo-300 [&>code]:text-sm
            [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-400
          ">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 py-12">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
                </div>
                <p className="text-slate-400 animate-pulse font-medium">Analyzing your code...</p>
              </div>
            ) : review ? (
              <Markdown rehypePlugins={[rehypeHighLight]}>
                {review}
              </Markdown>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3 opacity-60 py-12">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p>Click "Review Code" to get AI feedback</p>
              </div>
            )}
          </div>
        </section>

        {/* Floating Action Button */}

      </main>
    </div>
  );
}

export default App;
