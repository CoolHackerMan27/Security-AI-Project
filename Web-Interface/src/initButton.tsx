import React, { useEffect, useState } from "react";
import axios from "axios";
var apiInitialized = false;
interface ButtonProps {
  onFadeINOUT: () => void;
  onAPIResponse: (data: string, source: string) => void;
  text: string;
}

const initButton: React.FC<ButtonProps> = ({
  onFadeINOUT,
  onAPIResponse,
  text,
}) => {
  const [buttonLabel, setButtonLabel] = useState("Initialize privateGPT");
  const [isClicked, setIsClicked] = useState(false);
  // setButtonLabel(label);
  const handleButtonClick = () => {
    onFadeINOUT();
    setIsClicked(true);
    // Make the API request
    if (apiInitialized == false) {
      setButtonLabel("Initializing privateGPT");
      fetch("http://127.0.0.1:5005/api/start", { method: "POST" })
        .then((response) => response.json())
        .then((response) => {
          onAPIResponse(response.data, response.docs);
          // Update the button data
          setButtonLabel("Send Query");
          apiInitialized = true;
        })
        .catch((error) => {
          // Handle any errors
          setButtonLabel("Error initializing privateGPT" + error);
          console.error(error);
        });
    } else if (apiInitialized == true) {
      var query = text;
      onAPIResponse(" ", " ");
      setButtonLabel("Waiting for response... This may take a while.");
      fetch("http://127.0.0.1:5005/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })
        .then((response) => response.json())
        .then((response) => {
          // console.log(response.docs);
          onAPIResponse(response.data, response.docs);
          // Update the button data
          setButtonLabel("Response Received");
          console.log(apiInitialized);
        })
        .catch((error) => {
          // Handle any errors
          setButtonLabel("" + error);
          console.error(error);
        });
    }
  };

  useEffect(() => {}, []);

  return (
    <div className={`button ${isClicked ? "clicked" : ""}`}>
      <button id="init-button" onClick={handleButtonClick}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default initButton;
