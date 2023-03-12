import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Declare state variables for speed and RPM
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(0);

    const progressPercentage = speed / 100;
    const progressRPM = rpm / 100;

  // Use the useEffect hook to update the speed and RPM every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random speed between 0 and 100 mph
      const randomSpeed = Math.floor(Math.random() * 100);

      // Generate a random RPM between 0 and 8000
      const randomRpm = Math.floor(Math.random() * 8000);

      // Update the speed and RPM state variables with the random values
      setSpeed(randomSpeed);
      setRpm(randomRpm);
    }, 1000);

    // Return a function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      {/* Display the title */}
      <h2>Speedometer and Tachometer</h2>

      {/* Display the gauges */}
      <div className="gauges">
        {/* Speedometer */}
        <div className="gauge">
          {/* Dial with tick marks */}
          <div className="dial">
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>

            {/* Speedometer needle */}
            <div className="needle"></div>
            <div className="progress-bar" style={{ transform: `${progressPercentage}%` }}></div>
          </div>

          {/* Speedometer label */}
          <div className="label">Speed</div>

          {/* Speedometer value */}
          <div className="value">{speed} mph</div>
        </div>

        {/* Tachometer */}
        <div className="gauge">
          {/* Dial with tick marks */}
          <div className="dial">
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>
            <div className="tick"></div>

            {/* Tachometer needle */}
            <div className="status-bar-container">
              <div className="status-bar-fill" style={{ width: `${progressRPM}%` }}></div>
            </div>

          </div>

          {/* Tachometer label */}
          <div className="label">RPM</div>

          {/* Tachometer value */}
          <div className="value">{rpm}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
