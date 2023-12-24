import React, { useEffect, useState } from "react";
import "./pomodoroTimer.css";

const PomodoroTimer = () => {
  const [timingType, setTimingType] = useState("session");
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [minutes, setMinutes] = useState(sessionLength);
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [pauseClicked, setPauseClicked] = useState(false);
  const [timerHasStarted, setTimerHasStarted] = useState(false);

  const audio = new Audio(
    "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
  );

useEffect(() => {
  let intervalId;

  if (isRunning && !pauseClicked) {
    if (!timerHasStarted) {
      setTimeLeft(
        timingType === "session" ? sessionLength * 60 : breakLength * 60
      );
      setTimerHasStarted(true);
    }

    intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          const updatedTimeLeft = prevTimeLeft - 1;
          setMinutes(Math.floor(updatedTimeLeft / 60));
          setSeconds(updatedTimeLeft % 60);
          return updatedTimeLeft;
        } else {
          audio.play();

          if (timingType === "session") {
            setTimingType("break");
            return breakLength * 60;
          } else {
            setTimingType("session");
            return sessionLength * 60;
          }
        }
      });
    }, 1000);
  } else {
    clearInterval(intervalId);
    setTimerHasStarted(false);
  }

  return () => clearInterval(intervalId);
}, [
  isRunning,
  timingType,
  breakLength,
  sessionLength,
  timerHasStarted,
  pauseClicked,
]);

  const adjustLength = (type, increment) => {
    if (type === "break") {
      increment
        ? setBreakLength(breakLength + 1)
        : setBreakLength(breakLength - 1);
    } else if (type === "session") {
      increment
        ? setSessionLength(sessionLength + 1)
        : setSessionLength(sessionLength - 1);
    }
  };

  const startStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const reset = () => {
    setTimingType("session");
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft("");
    setMinutes(0);
    setSeconds(0);
    setPause("");
    setIsRunning(false);
    setPauseClicked(false);
    setTimerHasStarted(false);
  };

  return (
    <div id="wrap">
      <div id="title-wrap">
        <h1>25 + 5 Clock</h1>
      </div>
      <div id="buttons-wrap">
        <div className="sbLabel" id="break-label">
          <h2>Break length</h2>
          <div id="break-commands">
            <button
              disabled={breakLength === 1}
              id="break-decrement"
              onClick={() => adjustLength("break", false)}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <h2 id="break-length">{breakLength}</h2>
            <button
              disabled={breakLength === 60}
              id="break-increment"
              onClick={() => adjustLength("break", true)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="sbLabel" id="session-label">
          <h2>Session length</h2>
          <div id="session-commands">
            <button
              disabled={sessionLength === 1}
              id="session-decrement"
              onClick={() => adjustLength("session", false)}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <h2 id="session-length">{sessionLength}</h2>
            <button
              disabled={sessionLength === 60}
              id="session-increment"
              onClick={() => adjustLength("session", true)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <h2>It's {timingType} time!</h2>

      <div id="time-left">
        <h1>
          {timerHasStarted ? `${minutes}:${seconds}` : `${sessionLength}:00`}
        </h1>

        <div id="start-stop-wrap">
          <button id="start_stop" onClick={() => startStop()}>
            {isRunning ? (
              <i className="fa-solid fa-pause"></i>
            ) : (
              <i className="fa-solid fa-play"></i>
            )}
          </button>
          <button
            id="reset"
            onClick={() => {
              reset();
            }}
          >
            <i className="fa-solid fa-power-off"></i>
          </button>
        </div>
      </div>

      <div id="audio-wrap">
        <audio
          id="beep"
          volume="0.1"
          preload="auto"
          type="audio/wav"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
};

export default PomodoroTimer;
