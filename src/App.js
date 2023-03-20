  import React, { useState, useEffect } from 'react';
  import './App.css';

  function App() {
    // Declare state variables for speed, RPM, and time
    const [speed, setSpeed] = useState(0);
    const [rpm, setRpm] = useState(0);
    const [time, setTime] = useState(new Date());

    // Use the useEffect hook to update the speed, RPM, and time every second
    useEffect(() => {
      const interval = setInterval(() => {
        // Generate a random speed between 0 and 150 mph
        const randomSpeed = Math.floor(Math.random() * 150);

        // Generate a random RPM between 0 and 8000
        const randomRpm = Math.floor(Math.random() * 8000);

        // Update the speed and RPM state variables with the random values
        setSpeed(randomSpeed);
        setRpm(randomRpm);

        // Update the time state variable with the current time
        setTime(new Date());
      }, 1000);

      // Return a function to clear the interval when the component unmounts
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="dashboard">
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
              <div className="needle" style={{ transform: `rotate(${(speed / 150) * 180 - 45}deg)` }}></div>
              <div className="progress-bar" style={{ transform: `scaleX(${speed / 150})` }}></div>
            </div>

            {/* Speedometer label */}
            <div className="label">Speed</div>

            {/* Speedometer value */}
            <div className="value">{speed} mph</div>
          </div>

          {/* Tachometer */}
          <div className="gauge">
            <div className='gauge1'></div>
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
                <div className="needle1" style={{ transform: `rotate(${(rpm / 8000) * 180 - 90}deg)` }}></div>
                <div className="progress-bar" style={{ transform: `scaleX(${rpm / 8000})` }}></div>
              </div>
            </div>

            {/* Tachometer label */}
            <div className="label">RPM</div>

            {/* Tachometer value */}
            <div className="value">{rpm}</div>
          </div>
        </div>

        {/* Display the time */}
        <div className="time">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      </div>
    );
  };

  export default App;