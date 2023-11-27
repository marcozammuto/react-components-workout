import { useState } from "react";
import "./keyboard.css";

const Keyboard = () => {
  const [power, setPower] = useState(false);
  const soundLibrary = [
    {
      inst: "Heater 1",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      inst: "Heater 2",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      inst: "Heater 3",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      inst: "Heater 4",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      inst: "Clap",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      inst: "Open HH",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      inst: "Kick n' Hat",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      inst: "Kick",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      inst: "Closed HH",
      link: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
  ];
  const [message, setMessage] = useState("Turn me ON!");
  const [volume, setVolume] = useState(0);

  const playSound = (index) => {
    const audio = new Audio(soundLibrary[index].link);
    audio.play();
    setMessage(soundLibrary[index].inst);
  };

  const handleKeyPress = (event) => {
    const keyPressed = event.key.toUpperCase();
    switch (keyPressed) {
      case "Q": {
        playSound(0);
        const qButton = document.getElementById("q-button");
        if (qButton) {
          qButton.click();
        }
        break;
      }
      case "W": {
        playSound(1);
        const wButton = document.getElementById("w-button");
        if (wButton) {
          wButton.click();
        }
        break;
      }
      case "E": {
        playSound(2);
        const eButton = document.getElementById("e-button");
        if (eButton) {
          eButton.click();
        }
        break;
      }
      case "A": {
        playSound(3);
        const aButton = document.getElementById("a-button");
        if (aButton) {
          aButton.click();
        }
        break;
      }
      case "S": {
        playSound(4);
        const sButton = document.getElementById("s-button");
        if (sButton) {
          sButton.click();
        }
        break;
      }
      case "D": {
        playSound(5);
        const dButton = document.getElementById("d-button");
        if (dButton) {
          dButton.click();
          console.log("D");
        }
        break;
      }
      case "Z": {
        playSound(6);
        const zButton = document.getElementById("z-button");
        if (zButton) {
          zButton.click();
          console.log("Z");
        }
        break;
      }
      case "X": {
        playSound(7);
        const xButton = document.getElementById("x-button");
        if (xButton) {
          xButton.click();
          console.log("X");
        }
        break;
      }
      case "C": {
        playSound(8);
        const cButton = document.getElementById("c-button");
        if (cButton) {
          cButton.click();
          console.log("C");
        }
        break;
      }
    }
  };

  return (
    <>
      <div id="wrap">
        <h2 className="text-center mb-4">
          React prog #5: Keyboard + Drum Machine
        </h2>

        <div id="command-wrap">
          <div id="first-command-column-wrap">
            {/*power button*/}
            <button
              id="power-switch"
              style={{ color: power ? "red" : "white" }}
              onClick={() => {
                setPower(!power);
                power ? setMessage("OFF") : setMessage("ON");
              }}
            >
              <i class="fa-solid fa-power-off"></i>
            </button>
            {/*volume wrap*/}
            <div id="volume-wrap">
              <p>Volume</p>
              <input
                type="range"
                min="0"
                max="1"
                value="0.5"
                step="any"
              ></input>
            </div>
          </div>

          {/*pad bank wrap*/}
          <div id="second-command-column-wrap">
            <button
              disabled={!power}
              className="drum-pad"
              id="q-button"
              onClick={() => {
                document.getElementById("Q").play();
                playSound(0);
                setMessage(buttonName[0]);
              }}
            >
              1
              <audio
                src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
                className="clip"
                id="Q"
              ></audio>
            </button>

            <button
              disabled={!power}
              className="drum-pad"
              id="w-button"
              onClick={() => {
                document.getElementById("W").play();
                playSound(1);
              }}
            >
              2
              <audio
                src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
                className="clip"
                id="W"
              ></audio>
            </button>

            <button
              disabled={!power}
              className="drum-pad"
              id="e-button"
              onClick={() => {
                document.getElementById("E").play();
                playSound(2);
              }}
            >
              3
              <audio
                src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
                className="clip"
                id="E"
              ></audio>
            </button>

            <button
              disabled={!power}
              className="drum-pad"
              id="a-button"
              onClick={() => {
                document.getElementById("A").play();
                playSound(3);
              }}
            >
              4
              <audio
                src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
                className="clip"
                id="A"
              ></audio>
            </button>

            <button
              disabled={!power}
              className="drum-pad"
              id="s-button"
              onClick={() => {
                document.getElementById("S").play();
                playSound(4);
              }}
            >
              5
              <audio
                src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
                className="clip"
                id="S"
              ></audio>
            </button>

            <button
              disabled={!power}
              className="drum-pad"
              id="d-button"
              onClick={() => {
                document.getElementById("D").play();
                playSound(5);
              }}
            >
              6
              <audio
                src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
                className="clip"
                id="D"
              ></audio>
            </button>

            <button
              disabled={!power}
              className="drum-pad"
              id="z-button"
              onClick={() => {
                document.getElementById("Z").play();
                playSound(6);
              }}
            >
              7
              <audio
                src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
                className="clip"
                id="Z"
              ></audio>
            </button>

            <button
              disabled={!power}
              className="drum-pad"
              id="x-button"
              onClick={() => {
                document.getElementById("X").play();
                playSound(7);
              }}
            >
              8
              <audio
                src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
                className="clip"
                id="X"
              ></audio>
            </button>
          </div>

          {/*piano library wrap*/}

          <div id="third-command-column-wrap">
            <div id="message-wrap">
              <p>{message}</p>
              <div></div>
            </div>
            <div id="sound-library-wrap">
              <input
                className="drum-pad btn btn-secondary"
                name="sound-library"
                type="button"
                value="Piano"
              />
              <input
                className="drum-pad btn btn-secondary"
                name="sound-library"
                type="button"
                value="El.Piano"
              />
              <input
                className="drum-pad btn btn-secondary"
                name="sound-library"
                type="button"
                value="Vibe"
              />
              <input
                className="drum-pad btn btn-secondary"
                name="sound-library"
                type="button"
                value="Organ"
              />
              <input
                className="drum-pad btn btn-secondary"
                name="sound-library"
                type="button"
                value="Harpsichord"
              />
            </div>
          </div>
          {/*end of the first line*/}
        </div>
        {/*piano keys*/}
        <div id="piano-wrap">
          <ul className="piano-keys">
            <li className="key white" data-key="a"></li>
            <li className="key black" data-key="w"></li>
            <li className="key white" data-key="s"></li>
            <li className="key black" data-key="e"></li>
            <li className="key white" data-key="d"></li>
            <li className="key white" data-key="f"></li>
            <li className="key black" data-key="t"></li>
            <li className="key white" data-key="g"></li>
            <li className="key black" data-key="y"></li>
            <li className="key white" data-key="h"></li>
            <li className="key black" data-key="u"></li>
            <li className="key white" data-key="j"></li>
            <li className="key white" data-key="A"></li>
            <li className="key black" data-key="W"></li>
            <li className="key white" data-key="S"></li>
            <li className="key black" data-key="E"></li>
            <li className="key white" data-key="D"></li>
            <li className="key white" data-key="F"></li>
            <li className="key black" data-key="T"></li>
            <li className="key white" data-key="G"></li>
            <li className="key black" data-key="Y"></li>
            <li className="key white" data-key="H"></li>
            <li className="key black" data-key="U"></li>
            <li className="key white" data-key="J"></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Keyboard;
