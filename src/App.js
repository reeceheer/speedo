import React, { useState, useEffect } from 'react';
import './App.css';
import Gleaf from './images/Gleaf.svg';
import Rleaf from './images/Rleaf.svg';


function App() {
  // Declare state variables for speed, RPM, and time
  const [speed, setSpeed] = useState(null);
  const [rpm, setRpm] = useState(null);
  const [time] = useState(new Date());
  const [leafImage, setLeafImage] = useState(Gleaf);
  const [imageNumber, setImageNumber] = useState(1);


  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000');
  
    ws.onmessage = (event) => {
      console.log('Received data:', event.data);
      setRpm(event.data);
    };
  
    return () => {
      ws.close();
    };
  }, []);


  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5001');
  
    ws.onmessage = (event) => {
      console.log('Received data:', event.data);
      setSpeed(event.data);
    };
  
    return () => {
      ws.close();
    };
  }, []);  


  useEffect(() => {
    if (speed <= 20) {
      setImageNumber(rpm > 2000 ? 2 : 1);
    } else if (speed > 50) {
      setImageNumber(rpm > 2000 ? 2 : 1);
    } else {
      setImageNumber(rpm > 1500 ? 2 : 1);
    }
  }, [rpm, speed]);

  useEffect(() => {
    if (imageNumber === 1) {
      setLeafImage(Gleaf);
    } else if (imageNumber === 2) {
      setLeafImage(Rleaf);
    }
  }, [imageNumber]);

  
  return (
    <div className="dashboard">
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
            <div className="needle" style={{ transform: `rotate(${(speed / 
150) * 210 + 330 - 90}deg)` }}></div>
          </div>

{/* Speedometer label */}
<div className="label">mph</div>

{/* Speedometer value */}
<div className="value">{speed !== null ? `${speed}` : 'Loading...'}</div>
</div>

{/* Display oil temperature */}
<p className="oil">{speed !== null ? `${speed}°C` : 'Loading...'}</p>

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
              <div className="needle1" style={{ transform: `rotate(${(rpm 
/ 8000) * 210 + 330 - 90}deg)` }}></div>
            </div>
          </div>

        {/* Tachometer label */}
        <div className="label">rpm</div>

        {/* Tachometer value */}
        <div className="value">{rpm !== null ? rpm : 'Loading...'}</div>
      </div>
    </div>

      {/* Display the time */}
      <div className="time">{time.toLocaleTimeString([], {hour: '2-digit', 
minute:'2-digit', hour12: false})}</div>
    </div>
  );
};

export default App;