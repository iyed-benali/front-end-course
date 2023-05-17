import React, { useState, useEffect } from 'react';

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let countdown;
    if (isRunning) {
      countdown = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            clearInterval(countdown);
            handleSwitchTimer();
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel('Session');
    setIsRunning(false);
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  const handleSwitchTimer = () => {
    const audio = document.getElementById('beep');
    audio.play();
    if (timerLabel === 'Session') {
      setTimerLabel('Break');
      setTimeLeft(breakLength * 60);
    } else {
      setTimerLabel('Session');
      setTimeLeft(sessionLength * 60);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1 && !isRunning) {
      setBreakLength((prevLength) => prevLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60 && !isRunning) {
      setBreakLength((prevLength) => prevLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1 && !isRunning) {
      setSessionLength((prevLength) => prevLength - 1);
      setTimeLeft((prevTime) => (prevTime - 60 >= 0 ? prevTime - 60 : prevTime));
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60 && !isRunning) {
      setSessionLength((prevLength) => prevLength + 1);
      setTimeLeft((prevTime) => prevTime + 60);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mt-4">25 + 5 Clock</h1>
          <div className="card mt-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <h2 id="timer-label">Session</h2>
                <h1 id="time-left" className="display-1">
                  {formatTime(timeLeft)}
                </h1>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="text-center">
                    <h3 id="break-label">Break Length</h3>
                    <button
                      id="break-decrement"
                      className="btn btn-secondary"
                      onClick={handleBreakDecrement}
                      disabled={isRunning}
                    >
                      -
                    </button>
                    <span id="break-length" className="length">
                      {breakLength}
                    </span>
                    <button
                      id="break-increment"
                      className="btn btn-secondary"
                      onClick={handleBreakIncrement}
                      disabled={isRunning}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <h3 id="session-label">Session Length</h3>
                    <button
                      id="session-decrement"
                      className="btn btn-secondary"
                      onClick={handleSessionDecrement}
                      disabled={isRunning}
                    >
                      -
                    </button>
                    <span id="session-length" className="length">
                      {sessionLength}
                    </span>
                    <button
                      id="session-increment"
                      className="btn btn-secondary"
                      onClick={handleSessionIncrement}
                      disabled={isRunning}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  id="start_stop"
                  className="btn btn-primary"
                  onClick={handleStartStop}
                >
                  {isRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  id="reset"
                  className="btn btn-danger"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio id="beep" src="path/to/audio-file.mp3" />
    </div>
  );
  ;
};

export default App;
