import React, { useState, useEffect } from 'react';
import './App.css';
import Gleaf from './images/Gleaf.svg';
import Rleaf from './images/Rleaf.svg';

function App() {
  // Declare state variables for speed, RPM, and time
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(null);
  const [time, setTime] = useState(new Date());
  const [oil, setOil] = useState([]); //maybe change to null?
  const [leaf, setLeaf] = useState([]);
  const [rpm1, setRpm1] = useState([null]); // maybe change
  const [speed1, setSpeed1] = useState(0);
  const [leafImage, setLeafImage] = useState(Gleaf);
  const [output, setOutput] = useState(0);
  const [oilValue, setOilValue] = useState(null);


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
    const ws = new WebSocket('ws://localhost:5002');

    ws.onmessage = (event) => {
      setOutput(Number(event.data));
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (output === 1) {
      setLeafImage(Gleaf);
    } else if (output === 2) {
      setLeafImage(Rleaf);
    }
  }, [output]);

  
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
            <div className="needle" style={{ transform: `rotate(${(speed / 150) * 210 + 330 - 90}deg)` }}></div>
          </div>

{/* Speedometer label */}
<div className="label">mph</div>

{/* Speedometer value */}
<div className="value">{oilValue !== null ? `${speed}` : 'Loading...'}</div>
</div>

{/* Display oil temperature */}
<p className="oil">{oilValue !== null ? `${speed}°C` : 'Loading...'}</p>

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
  );
};

export default App;