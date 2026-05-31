import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

function Editor({ value, onChange, language, readOnly = false }) {

  const getLanguageExtension = (lang) => {
    switch (lang?.toLowerCase()) {
      case "javascript":
        return [javascript({ jsx: true })];
      case "python":
        return [python()];
      case "java":
        return [java()];
      case "c":
      case "cpp":
        return [cpp()];
      case "php":
        return [php()];
      case "html":
        return [html()];
      case "css":
        return [css()];
      default:
        return [javascript({ jsx: true })]; // Default to JS
    }
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-white/5 shadow-2xl relative">
      <div className={`h-full w-full transition-all duration-500 ${readOnly ? "opacity-70 pointer-events-none select-none" : ""}`}>
        <CodeMirror
          value={value}
          height="100%"
          theme={oneDark}
          extensions={getLanguageExtension(language)}
          onChange={(val) => !readOnly && onChange(val)}
          readOnly={readOnly}
          editable={!readOnly}
          className="text-sm h-full"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </div>

      {readOnly && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none select-none animate-fade-in">
          {/* Holographic background scanner tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-cyan-500/0 to-indigo-500/5 animate-hologram border border-indigo-500/20 rounded-xl"></div>

          {/* Sweeping vertical laser scanline */}
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee,0_0_5px_#22d3ee] animate-scan-line"></div>

          {/* Bottom subtle warning banner */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center px-4 py-2.5 bg-slate-950/70 border border-white/5 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span className="text-[10px] sm:text-[12px] text-slate-300 font-medium">
                Parsing source code syntax & Reviewing for optimizations...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editor;
