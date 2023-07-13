import reactLogo from "./assets/react.svg";
import GPTLogo from "./assets/GPTLogo.svg";
import TypeScriptLogo from "./assets/TypeScriptLogo.svg";
import React, { useState } from "react";
import "./App.css";
import InitButton from "./initButton";
var promtBoxClicked = false;
function App() {
  const [isFadedOut, setIsFadedOut] = useState(false);
  const [isFadedIn, setIsFadedIn] = useState(false);
  const [source, setSource] = useState("");
  const [inputValue, setInputValue] = useState("Type a Prompt.");
  const [response, setResponse] = useState("Initializing...");
  const handleFadeINOUT = () => {
    setIsFadedOut(true);
    setIsFadedIn(true);
  };
  const handleGPTResponse = (data: string, source: string) => {
    setResponse(data);
    if (source != undefined) {
      setSource(source);
    } else {
      setSource("");
    }
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleClearInput = () => {
    console.log(promtBoxClicked);
    if (promtBoxClicked == false) {
      promtBoxClicked = true;
      setInputValue("");
    }
  };
  const calculateResponseAreaHeight = () => {
    const lineHeight = 20; // Adjust this value based on your font and styling
    const minHeight = 0; // Minimum height of the textarea
    const maxHeight = 275; // Maximum height of the textarea

    // Calculate the number of lines based on the text length
    const numberOfLines = Math.ceil(response.length / 40); // Adjust the line length based on your content width

    // Calculate the height based on the number of lines
    const calculatedHeight = lineHeight * numberOfLines;

    // Restrict the height within the minimum and maximum values
    return Math.min(Math.max(calculatedHeight, minHeight), maxHeight);
  };
  const calculateSourceAreaHeight = () => {
    const lineHeight = 20; // Adjust this value based on your font and styling
    const minHeight = 0; // Minimum height of the textarea
    const maxHeight = 275; // Maximum height of the textarea

    // Calculate the number of lines based on the text length
    const numberOfLines = Math.ceil(source.length / 40); // Adjust the line length based on your content width

    // Calculate the height based on the number of lines
    const calculatedHeight = lineHeight * numberOfLines;

    // Restrict the height within the minimum and maximum values
    return Math.min(Math.max(calculatedHeight, minHeight), maxHeight);
  };
  return (
    <>
      <div className={`fade-out-wrapper ${isFadedOut ? "fade-out" : ""}`}>
        <a href="https://github.com/imartinez/privateGPT" target="_blank">
          <img src={GPTLogo} className="logo GPT" alt="GPT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src={TypeScriptLogo} className="logo TS" alt="React logo" />
        </a>
      </div>
      <h2 className={`Response-Title ${isFadedOut ? "fade-in" : "fade-out"}`}>
        <p className="ResponseTitle">Response</p>
      </h2>
      <h1 className={`Title-Text ${isFadedOut ? "fade-out" : ""}`}>
        PrivateGPT Web-Interface v1.0
      </h1>
      <h2 className={`Source-Title ${isFadedOut ? "fade-in" : "fade-out"}`}>
        Source
      </h2>
      <div className={`source ${isFadedIn ? "fade-in" : "fade-out"}`}>
        <textarea
          className="sourceBox"
          id="source"
          readOnly
          value={source}
          onChange={handleInputChange}
          style={{ height: calculateSourceAreaHeight() }}
        />
      </div>
      <InitButton
        onFadeINOUT={handleFadeINOUT}
        onAPIResponse={handleGPTResponse}
        text={inputValue}
      />
      <div className={`input ${isFadedIn ? "fade-in" : "fade-out"}`}>
        <input
          className="inputBox"
          id="inputBox"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleClearInput}
        />
      </div>
      <div className={`response ${isFadedIn ? "fade-in" : "fade-out"}`}>
        <textarea
          className="response"
          id="response"
          readOnly
          value={response}
          style={{ height: calculateResponseAreaHeight() }}
        />
      </div>
      <p className={`read-the-docs ${isFadedOut ? "fade-out" : ""}`}>
        Click on the GPT, React, or TypeScript logos to learn more
      </p>
    </>
  );
}

export default App;
