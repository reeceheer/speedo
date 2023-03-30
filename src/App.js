//Import react libary & hooks from libaries, import SVG images for leaf
import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Gleaf from './images/Gleaf1.svg';
import Rleaf from './images/Rleaf1.svg';
import ReactSwitch from "react-switch";
export const ThemeContext = createContext(null);


function App() {
  // Declare state variables for speed, RPM, and time
  const [speed, setSpeed] = useState(null);
  const [rpm, setRpm] = useState(null);
  const [time] = useState(new Date());
  const [leafImage, setLeafImage] = useState(Gleaf);
  const [imageNumber, setImageNumber] = useState(1);
  const [theme, setTheme] = useState("dark")


  // Toggle for light and darkmode
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  // WebSocket connection for receiving RPM values
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000');
    // handle received RPM data
    ws.onmessage = (event) => {
      console.log('Received data:', event.data);
      setRpm(event.data);
    };
    // close the WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  // WebSocket connection for receiving speed values
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5001');
    // handle received speed data
    ws.onmessage = (event) => {
      console.log('Received data:', event.data);
      setSpeed(event.data);
    };
    // close the WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);  

  // Update leaf image based on RPM and speed values
  useEffect(() => {
    if (speed <= 20) {
      setImageNumber(rpm > 2000 ? 2 : 1);
    } else if (speed > 50) {
      setImageNumber(rpm > 2000 ? 2 : 1);
    } else {
      setImageNumber(rpm > 1500 ? 2 : 1);
    }
  }, [rpm, speed]);
  // Update leaf image based on image number state
  useEffect(() => {
    if (imageNumber === 1) {
      setLeafImage(Gleaf);
    } else if (imageNumber === 2) {
      setLeafImage(Rleaf);
    }
  }, [imageNumber]);

  // Render the dashboard UI
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className="dashboard" id={theme}>
      {/* Display the gauges */}
      <div className="gauges">
        {/* Speedometer */}
        <div className="gauge-speed">
          {/* Dial with tick marks */}
          <div className="dial1">
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
            <div className="needle" style={{ transform: `rotate(${(speed / 150) * 210 + 330 - 90}deg)` }}></div>
          </div>

{/* Speedometer label */}
<div className="label">mph</div>

{/* Speedometer value */}
<div className="value">{speed !== null ? `${speed}` : 'Loading...'}</div>
</div>

{/* Display oil temperature */}
<p className="oil">{speed !== null ? `${speed}°C` : 'Loading...'}</p>

{/* button Toggle to switch from colour theme */}
<div className='switch'>
    <ReactSwitch onChange={toggleTheme} checked={ theme === "dark" } 
    checkedIcon={false} 
    uncheckedIcon={false}
    offColor={ "#D3D8FF" }
    onColor={ "#3E64F2" }/>
    </div>

<div>
  <img className="leaf-image" src={leafImage} alt="Leaf" />
</div>

<div className="App">
    <img className="leaf-image" src={leafImage} alt="Leaf" />
  </div>

        {/* Tachometer */}
        <div className="gauge-rpm">
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
              <div className="needle1" style={{ transform: `rotate(${(rpm / 8000) * 210 + 330 - 90}deg)` }}></div>
            </div>
          </div>

        {/* Tachometer label */}
        <div className="label">rpm</div>

        {/* Tachometer value */}
        <div className="value">{rpm !== null ? rpm : 'Loading...'}</div>
      </div>
    </div>
    

      {/* Display the time */}
      <div className="time">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}</div>
    </div>
    </ThemeContext.Provider>
  );
};

export default App;

//End of Code

// Big shoutout to Filip Chmura, Reece Heer & Hawri Kazaz