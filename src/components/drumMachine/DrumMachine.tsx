import { useState } from "react";
import "./drumMachine.css";

const DrumMachine = () => {
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
      <h2 className="text-center mb-4">React prog #4: Drum Machine</h2>
      <div className="container mt-4">
        <div id="drum-machine">
          <div id="pad-bank" className="col-md-8">
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
              Q
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
              W
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
              E
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
              A
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
              S
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
              D
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
              Z
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
              X
              <audio
                src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
                className="clip"
                id="X"
              ></audio>
            </button>

            <button
              disabled={!power}
              className="drum-pad"
              id="c-button"
              onClick={() => {
                document.getElementById("C").play();
                playSound(8);
              }}
            >
              C
              <audio
                src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
                className="clip"
                id="C"
              ></audio>
            </button>
          </div>
          <div id="switch-wrap">
            <button
              id="power-switch"
              onClick={() => {
                setPower(!power);
                power ? setMessage("OFF") : setMessage("ON");
              }}
            >
              Power
            </button>
            <button id="bank-switch" onClick={() => console.log("Cicciu Manson")}>
              Bank
            </button>
            <input value={volume} id="volume" type="range" min="0" max="100" />
            <p id="display">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrumMachine;
