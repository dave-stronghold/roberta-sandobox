import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Rive from "@rive-app/react-canvas";
import "../Styles/Container.css";
const winner = (a, b, c) => {
  let x = Math.max(a, b, c);
  if (x === a) {
    return [`${a} % NEGATIVE`, "Sad", "#ffa6b3"];
  }
  if (x === b) {
    return [`${b} % NEUTRAL`, "", "#fff0a6"];
  }
  if (x === c) {
    return [`${c} % POSITIVE`, "Timid", "#d1ffc9"];
  }
};
export default function Container() {
  const [t, setT] = useState(0);
  const [color, setColor] = useState("red");
  const [emoji, setEmoji] = useState("");
  const [game, setGame] = useState("SCORE VALUE");
  const handleText = (e) => {
    e.preventDefault();
    setText(e.target.value);
    setLength(e.target.value.length);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "/predict_sentiment",
      data: {
        text: text
      }
    })
      .then((response) => {
        const res = response.data;
        // console.log(res);
        setResult({
          roberta_neg: (res.negative_percentage / 100).toFixed(4),
          roberta_neu: (res.neutral_percentage / 100).toFixed(4),
          roberta_pos: (res.positive_percentage / 100).toFixed(4)
        });
        setT(res.positive_percentage * 4.89);
        let comment = winner(
          res.negative_percentage,
          res.neutral_percentage,
          res.positive_percentage,
          emoji
        );
        setEmoji(comment[1]);
        setGame(comment[0]);
        gamestyle.current.style.color = `${comment[2]}`;
        // console.log(comment[1])
        if (res.positive_percentage < 48.5) {
          setColor("red");
        } else if (res.positive_percentage > 51.5) {
          setColor("#03fc0b");
        } else {
          setColor("yellow");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  const bigText = useRef();
  const gamestyle = useRef();
  const [length, setLength] = useState(0);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  useEffect(() => {
    if (length >= 85) {
      bigText.current.style.fontSize = `32px`;
      bigText.current.style.lineHeight = `42px`;
      bigText.current.style.letterSpacing = `-0.6px`;

      // console.log(emoji)
      // console.log(bigText)
    } else if (length < 85) {
      bigText.current.style.fontSize = `40px`;
      bigText.current.style.lineHeight = `60px`;
      bigText.current.style.letterSpacing = `-0.05em;`;
      // console.log(bigText)
    }
    // console.log(color);
    // console.log(t)
  }, [length, emoji]);
  return (
    <div className="grandCon">
      <div className="questionCon">
        <div className="questionEl">
          <div className="header">sentimental analysis</div>
          <input
            type="text"
            className="input"
            placeholder="Type a sentence to analyze"
            onChange={handleText}
          />
          <button className="submit" onClick={handleSubmit}>
            ANALYZE
          </button>
          <div ref={bigText} className="bigText">
            {text}
          </div>
        </div>
      </div>
      <div className="resultCon">
        <div className="resultEl">
          <div className="header">SENTIMETER</div>
          <div className="scoresCon">
            <div className="sCon">
              <div className="scoreTitle">Negative Score</div>
              <div className="score">
                {result.roberta_neg ? result.roberta_neg : "-"}
              </div>
            </div>
            <div className="sCon">
              <div className="scoreTitle">Neutral Score</div>
              <div className="score">
                {result.roberta_neu ? result.roberta_neu : "-"}
              </div>
            </div>
            <div className="sCon">
              <div className="scoreTitle">Positive Score</div>
              <div className="score">
                {result.roberta_pos ? result.roberta_pos : "-"}
              </div>
            </div>
          </div>
          <div className="emoji">
            <div className="game" ref={gamestyle}>
              {game}
            </div>
            {emoji == "Sad" && (
              <Rive
                className="test"
                src="emoji2.riv"
                artboard={emoji}
                width={"114px"}
                height={"114px"}
              />
            )}
            {emoji == "" && (
              <Rive
                className="test"
                src="emoji2.riv"
                artboard={emoji}
                width={"114px"}
                height={"114px"}
              />
            )}
            {emoji == "Timid" && (
              <Rive
                className="test"
                src="emoji2.riv"
                artboard={emoji}
                width={"114px"}
                height={"114px"}
              />
            )}
          </div>
          <div className="meter">
            <svg
              width="517"
              height="88"
              viewBox="-10 0 527 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 67L2.87564 88L27.1244 88L15 67Z"
                id="marker"
                fill={color}
                style={{
                  fill: `${color}`,
                  transform: `translateX( ${t}px)`
                }}
              />
              <path d="M1 26.5L515.445 26.5" stroke="white" strokeWidth="2" />
              <path d="M258 27V51" stroke="white" strokeWidth="3" />
              <path d="M36 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M61 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M86 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M111 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M136 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M161 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M186 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M211 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M236 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M280 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M305 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M330 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M355 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M380 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M405 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M430 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M455 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M480 27V39" stroke="white" strokeWidth="1.5" />
              <path d="M508.5 48L514.995 27H502.005L508.5 48Z" fill="white" />
              <path d="M7.5 48L13.9952 27H1.00481L7.5 48Z" fill="white" />
              <path
                d="M493.72 2V0.335999H497.048V12H495.208V2H493.72ZM500.53 12.112C500.199 12.112 499.922 12 499.698 11.776C499.474 11.552 499.362 11.2747 499.362 10.944C499.362 10.6133 499.474 10.336 499.698 10.112C499.922 9.888 500.199 9.776 500.53 9.776C500.85 9.776 501.122 9.888 501.346 10.112C501.57 10.336 501.682 10.6133 501.682 10.944C501.682 11.2747 501.57 11.552 501.346 11.776C501.122 12 500.85 12.112 500.53 12.112ZM503.413 6.016C503.413 4.17067 503.722 2.73067 504.341 1.696C504.97 0.650666 506.048 0.127999 507.573 0.127999C509.098 0.127999 510.17 0.650666 510.789 1.696C511.418 2.73067 511.733 4.17067 511.733 6.016C511.733 7.88267 511.418 9.344 510.789 10.4C510.17 11.4453 509.098 11.968 507.573 11.968C506.048 11.968 504.97 11.4453 504.341 10.4C503.722 9.344 503.413 7.88267 503.413 6.016ZM509.941 6.016C509.941 5.152 509.882 4.42133 509.765 3.824C509.658 3.22667 509.434 2.74133 509.093 2.368C508.752 1.984 508.245 1.792 507.573 1.792C506.901 1.792 506.394 1.984 506.053 2.368C505.712 2.74133 505.482 3.22667 505.365 3.824C505.258 4.42133 505.205 5.152 505.205 6.016C505.205 6.912 505.258 7.664 505.365 8.272C505.472 8.88 505.696 9.37067 506.037 9.744C506.389 10.1173 506.901 10.304 507.573 10.304C508.245 10.304 508.752 10.1173 509.093 9.744C509.445 9.37067 509.674 8.88 509.781 8.272C509.888 7.664 509.941 6.912 509.941 6.016Z"
                fill="#8D8D8D"
              />
              <path
                d="M1.96 6.016C1.96 4.17067 2.26933 2.73067 2.888 1.696C3.51733 0.650666 4.59467 0.127999 6.12 0.127999C7.64533 0.127999 8.71733 0.650666 9.336 1.696C9.96533 2.73067 10.28 4.17067 10.28 6.016C10.28 7.88267 9.96533 9.344 9.336 10.4C8.71733 11.4453 7.64533 11.968 6.12 11.968C4.59467 11.968 3.51733 11.4453 2.888 10.4C2.26933 9.344 1.96 7.88267 1.96 6.016ZM8.488 6.016C8.488 5.152 8.42933 4.42133 8.312 3.824C8.20533 3.22667 7.98133 2.74133 7.64 2.368C7.29867 1.984 6.792 1.792 6.12 1.792C5.448 1.792 4.94133 1.984 4.6 2.368C4.25867 2.74133 4.02933 3.22667 3.912 3.824C3.80533 4.42133 3.752 5.152 3.752 6.016C3.752 6.912 3.80533 7.664 3.912 8.272C4.01867 8.88 4.24267 9.37067 4.584 9.744C4.936 10.1173 5.448 10.304 6.12 10.304C6.792 10.304 7.29867 10.1173 7.64 9.744C7.992 9.37067 8.22133 8.88 8.328 8.272C8.43467 7.664 8.488 6.912 8.488 6.016ZM13.186 12.112C12.8553 12.112 12.578 12 12.354 11.776C12.13 11.552 12.018 11.2747 12.018 10.944C12.018 10.6133 12.13 10.336 12.354 10.112C12.578 9.888 12.8553 9.776 13.186 9.776C13.506 9.776 13.778 9.888 14.002 10.112C14.226 10.336 14.338 10.6133 14.338 10.944C14.338 11.2747 14.226 11.552 14.002 11.776C13.778 12 13.506 12.112 13.186 12.112ZM16.0694 6.016C16.0694 4.17067 16.3787 2.73067 16.9974 1.696C17.6267 0.650666 18.704 0.127999 20.2294 0.127999C21.7547 0.127999 22.8267 0.650666 23.4454 1.696C24.0747 2.73067 24.3894 4.17067 24.3894 6.016C24.3894 7.88267 24.0747 9.344 23.4454 10.4C22.8267 11.4453 21.7547 11.968 20.2294 11.968C18.704 11.968 17.6267 11.4453 16.9974 10.4C16.3787 9.344 16.0694 7.88267 16.0694 6.016ZM22.5974 6.016C22.5974 5.152 22.5387 4.42133 22.4214 3.824C22.3147 3.22667 22.0907 2.74133 21.7494 2.368C21.408 1.984 20.9014 1.792 20.2294 1.792C19.5574 1.792 19.0507 1.984 18.7094 2.368C18.368 2.74133 18.1387 3.22667 18.0214 3.824C17.9147 4.42133 17.8614 5.152 17.8614 6.016C17.8614 6.912 17.9147 7.664 18.0214 8.272C18.128 8.88 18.352 9.37067 18.6934 9.744C19.0454 10.1173 19.5574 10.304 20.2294 10.304C20.9014 10.304 21.408 10.1173 21.7494 9.744C22.1014 9.37067 22.3307 8.88 22.4374 8.272C22.544 7.664 22.5974 6.912 22.5974 6.016Z"
                fill="#8D8D8D"
              />
              <path
                d="M246.96 6.016C246.96 4.17067 247.269 2.73067 247.888 1.696C248.517 0.650666 249.595 0.127999 251.12 0.127999C252.645 0.127999 253.717 0.650666 254.336 1.696C254.965 2.73067 255.28 4.17067 255.28 6.016C255.28 7.88267 254.965 9.344 254.336 10.4C253.717 11.4453 252.645 11.968 251.12 11.968C249.595 11.968 248.517 11.4453 247.888 10.4C247.269 9.344 246.96 7.88267 246.96 6.016ZM253.488 6.016C253.488 5.152 253.429 4.42133 253.312 3.824C253.205 3.22667 252.981 2.74133 252.64 2.368C252.299 1.984 251.792 1.792 251.12 1.792C250.448 1.792 249.941 1.984 249.6 2.368C249.259 2.74133 249.029 3.22667 248.912 3.824C248.805 4.42133 248.752 5.152 248.752 6.016C248.752 6.912 248.805 7.664 248.912 8.272C249.019 8.88 249.243 9.37067 249.584 9.744C249.936 10.1173 250.448 10.304 251.12 10.304C251.792 10.304 252.299 10.1173 252.64 9.744C252.992 9.37067 253.221 8.88 253.328 8.272C253.435 7.664 253.488 6.912 253.488 6.016ZM258.186 12.112C257.855 12.112 257.578 12 257.354 11.776C257.13 11.552 257.018 11.2747 257.018 10.944C257.018 10.6133 257.13 10.336 257.354 10.112C257.578 9.888 257.855 9.776 258.186 9.776C258.506 9.776 258.778 9.888 259.002 10.112C259.226 10.336 259.338 10.6133 259.338 10.944C259.338 11.2747 259.226 11.552 259.002 11.776C258.778 12 258.506 12.112 258.186 12.112ZM268.589 1.904H263.229V5.088C263.453 4.78933 263.784 4.53867 264.221 4.336C264.669 4.13333 265.144 4.032 265.645 4.032C266.541 4.032 267.267 4.224 267.821 4.608C268.387 4.992 268.787 5.47733 269.021 6.064C269.267 6.65067 269.389 7.26933 269.389 7.92C269.389 8.70933 269.235 9.41333 268.925 10.032C268.627 10.64 268.173 11.12 267.565 11.472C266.968 11.824 266.232 12 265.357 12C264.195 12 263.261 11.712 262.557 11.136C261.853 10.56 261.432 9.79733 261.293 8.848H263.069C263.187 9.34933 263.448 9.74933 263.853 10.048C264.259 10.336 264.765 10.48 265.373 10.48C266.131 10.48 266.696 10.2507 267.069 9.792C267.453 9.33333 267.645 8.72533 267.645 7.968C267.645 7.2 267.453 6.61333 267.069 6.208C266.685 5.792 266.12 5.584 265.373 5.584C264.851 5.584 264.408 5.71733 264.045 5.984C263.693 6.24 263.437 6.592 263.277 7.04H261.549V0.304H268.589V1.904Z"
                fill="#8D8D8D"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
