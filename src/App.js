  import React, { useState, useEffect } from 'react';
  import './App.css';



  function App() {
    // Declare state variables for speed, RPM, and time
    const [speed, setSpeed] = useState(0);
    const [rpm, setRpm] = useState(0);
    const [time, setTime] = useState(new Date());
    const [oil, setOil] = useState([]);
    const [leaf, setLeaf] = useState([]);
    const [speed1, setSpeed1] = useState([]);
    const [rpm1, setRpm1] = useState([]);
    /*const APP_ID = "";*/
    /*const APP_KEY = "";*/

    useEffect(() => {
      getOil();
    }, []);

    useEffect(() => {
      getLeaf();
    }, []);

    useEffect(() => {
      getSpeed1();
    }, []);

    useEffect(() => {
      getRpm1();
    }, []);


    const getOil = async () => {
      const response = await fetch(
        `http://localhost:5000/oil`
      );
      const data = await response.json();
      console.log(data)
      /*setOil(data.hits);*/
    };

    const getLeaf = async () => {
      const response = await fetch(
        `http://localhost:5004/leaf`
      );
      const data = await response.json();
      console.log(data)
      /*setLeaf(data.hits);*/
    };

    const getSpeed1 = async () => {
      const response = await fetch(
        `http://localhost:5001/speed`
      );
      const data = await response.json();
      console.log(data)
      /*setSpped1(data.hits);*/
    };

    const getRpm1 = async () => {
      const response = await fetch(
        `http://localhost:5000/rpm`
      );
      const data = await response.json();
      console.log(data)
      /*setRpm1(data.hits);*/
    };

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
<div className="progress-bar" style={{ transform: `scaleX(${speed / 150})` }}></div>


            </div>

            {/* Speedometer label */}
            <div className="label">mph</div>

            {/* Speedometer value */}
            <div className="value">{speed1}</div>
          </div>

          <h1> {oil.map} </h1>

                  <p className='oil'>45C {oil}</p>
                  <div className='Rleaf'></div>
                  <div className='Gleaf'></div>
                  
                  

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
                <div className="progress-bar" style={{ transform: `scaleX(${rpm / 8000})` }}></div>
              </div>
            </div>

            {/* Tachometer label */}
            <div className="label">rpm</div>
            <h1> {rpm1.map} </h1>
            {/* Tachometer value */}
            <div className="value">{rpm1}</div>
          </div>
        </div>

        {/* Display the time */}
        <div className="time">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        



        
      </div>
    );
  };

  export default App;