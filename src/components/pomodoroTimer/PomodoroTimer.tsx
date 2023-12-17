import useState from 'react'

const PomodoroTimer = () => {

      const [ timingType, setTimingType ] = useState("session");
      const [breakLength, setBreakLength ] = useState(5);
      const [sessionLength, setSessionLength ] = useState(25);
      const [timeLeft, setTimeLeft] = useState("");
      const [minutes, setMinutes] = useState("");
      const [seconds, setSeconds] = useState(0);
      const [pause, setPause] = useState("");
      const [isRunning, setIsRunning] = useState(false);
      const [pauseClicked, setPauseClicked] = useState(false);
      const [timerHasStarted, setTimerHasStarted] = useState(false);

      const adjustLength = (type, increment) => {
        if (type === "break") {
          increment ? setBreakLength(breakLength +1) : setBreakLength(breakLength - 1)
        } else if (type === "session") {
          increment ? setSessionLength(sessionLength +1) : setSessionLength(sessionLength - 1)
        }
      }
      
       const startStop = () => {
          if (isRunning) {
              setIsRunning(true);
              setPauseClicked(false);
              setTimerHasStarted(true);
              setPause("");
              setTimeLeft(
                timingType === "session" 
                  ? setSessionLength(sessionLength * 60)
                  : setBreakLength(breakLength * 60)
            )
            if (pause !== "" && pauseClicked) {
                setIsRunning(true);
                setPauseClicked(false);
                setPause("");
                setTimeLeft(timeLeft)
              }
            }
            this.intervalId = setInterval(() => {
              this.setState((prevState) => {
                if (prevState.timeLeft > 0) {
                  const updatedTimeLeft = prevState.timeLeft - 1;
                  return {
                    timeLeft: updatedTimeLeft,
                    minutes: Math.floor(updatedTimeLeft / 60),
                    seconds: updatedTimeLeft % 60,
                  };
                } else {
                  const audio = document.getElementById("beep");
                  audio.play();
      
                  if (prevState.timingType === "session") {
                    return {
                      timingType: "break",
                      timeLeft: prevState.breakLength * 60,
                    };
                  } else {
                    return {
                      timingType: "session",
                      timeLeft: prevState.sessionLength * 60,
                    };
                  }
                }
              });
            }, 1000);
          } else {
            clearInterval(this.intervalId);
            this.setState((prevState) => ({
              isRunning: false,
              pausedTime: prevState.timeLeft,
              pauseClicked: true,
              minutes: Math.floor(prevState.timeLeft / 60),
              seconds: prevState.timeLeft % 60,
            }));
          }
        }

  return (
    <div>
      
    </div>
  )
}

export default PomodoroTimer




  reset() {
    clearInterval(this.intervalId);
    this.setState({
      timingType: "session",
      breakLength: 5,
      sessionLength: 25,
      timeLeft: "",
      minutes: 25,
      seconds: 0,
      pausedTime: "",
      isRunning: false,
      pauseClicked: false,
      timerHasStarted: false,
    });
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  render() {
    const formattedMinutes =
      this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes;
    const formattedSeconds =
      this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds;

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
                disabled={this.state.breakLength === 1}
                id="break-decrement"
                onClick={() => this.adjustLength("break", false)}
              >
                <i class="fa-solid fa-minus"></i>
              </button>
              <h2 id="break-length">{this.state.breakLength}</h2>
              <button
                disabled={this.state.breakLength === 60}
                id="break-increment"
                onClick={() => this.adjustLength("break", true)}
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          <div className="sbLabel" id="session-label">
            <h2>Session length</h2>
            <div id="session-commands">
              <button
                disabled={this.state.sessionLength === 1}
                id="session-decrement"
                onClick={() => this.adjustLength("session", false)}
              >
                <i class="fa-solid fa-minus"></i>
              </button>
              <h2 id="session-length">{this.state.sessionLength}</h2>
              <button
                disabled={this.state.sessionLength === 60}
                id="session-increment"
                onClick={() => this.adjustLength("session", true)}
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <div id="timer-label">
          <div id="timing-time-wrap">
            <div id="message-wrap">
              <h2>It's {this.state.timingType} time!</h2>
            </div>
            <div id="time-left">
              <h1>
                {" "}
                {this.state.timerHasStarted
                  ? `${formattedMinutes}:${formattedSeconds}`
                  : `${this.state.sessionLength}:00`}
              </h1>
            </div>
          </div>

          <div id="start-stop-wrap">
            <button id="start_stop" onClick={() => this.startStop()}>
              <i class="fa-solid fa-play"></i>
              <i class="fa-solid fa-pause"></i>
            </button>
            <button
              id="reset"
              onClick={() => {
                this.reset();
              }}
            >
              <i class="fa-solid fa-power-off"></i>
            </button>
          </div>
        </div>

        <div id="author-wrap">
          <p id="author">
            designed and coded by{" "}
            <a id="author-link" href="https://github.com/marcozammuto">
              Marco Zammuto
            </a>
          </p>
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
      </div>
    );
  }
}

ReactDOM.render(<PomodoroTimer />, document.getElementById("root"));
