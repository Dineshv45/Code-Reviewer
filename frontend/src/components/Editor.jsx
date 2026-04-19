import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

function Editor({ value, onChange, language }) {
  
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
    <div className="h-full w-full overflow-hidden rounded-xl border border-white/5 shadow-2xl">
      <CodeMirror
        value={value}
        height="100%"
        theme={oneDark}
        extensions={getLanguageExtension(language)}
        onChange={(val) => onChange(val)}
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
  );
}

export default Editor;
