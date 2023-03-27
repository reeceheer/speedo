  import React, { useState, useEffect } from 'react';
  import './App.css';
  import Gleaf from './images/Gleaf.svg';
  import Rleaf from './images/Rleaf.svg';


  function App() {
    // Declare state variables for speed, RPM, and time
    const [speed, setSpeed] = useState(0);
    const [rpm, setRpm] = useState(0);
    const [time, setTime] = useState(new Date());
    const [oil, setOil] = useState([]); //maybe change to null?
    const [leaf, setLeaf] = useState([]);
    const [rpm1, setRpm1] = useState([null]);
    const [speed1, setSpeed1] = useState(0);
    const [leafImage, setLeafImage] = useState(Gleaf);
    /*const APP_ID = "";*/
    /*const APP_KEY = "";*/

    useEffect(() => {
      console.log('Fetching API data...')
      const intervalId = setInterval(() => {

        fetch('http://localhost:5001/value')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.value === 1) {
      setLeafImage(Gleaf);
    } else if (data.value === 2) {
      setLeafImage(Rleaf);
    }
  })
  .catch(error => {
    console.error('Error fetching random value:', error);
  });
        // Fetch random value from API and update state
      }, 5000);
    
      return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
      const interval = setInterval(() => {
        // Define async functions to fetch data for speed, RPM, and oil
        const fetchSpeedData = async () => {
          const response = await fetch("http://localhost:5000/oil");
          const data = await response.json();
          setSpeed(data.oil);
        };
  
        const fetchRpmData = async () => {
          const response = await fetch("http://localhost:5000/oil");
          const data = await response.json();
          setRpm(data.oil);
        };
  
        const fetchOilData = async () => {
          const response = await fetch("http://localhost:5000/oil");
          const data = await response.json();
          setOil(data.oil);
        };
  
        fetchSpeedData();
        fetchRpmData();
        fetchOilData();
  
        // Update the time state variable with the current time
        setTime(new Date());
      }, 30000);
  
      // Return a function to clear the interval when the component unmounts
      return () => clearInterval(interval);
    }, []);
  


    const getOil = async () => {
      const response = await fetch(
        `` 
      );
      const data = await response.json();
      console.log(data)
      setOil(data.hits);
    };

    const getLeaf = async () => {
      const response = await fetch(
        `http://localhost:5004/leaf`
      );
      const data = await response.json();
      console.log(data)
      setLeaf(data.hits);
    }; 

    const getSpeed1 = async () => {
      const response = await fetch(
        `http://localhost:5001/speed`
      );
      const data = await response.json();
      console.log(data)
      setSpeed1(data.hits);
    };

    const getRpm1 = async () => {
      const response = await fetch(
        `https://64208ffe25cb6572104bd468.mockapi.io/number`
      );
      const data = await response.json();
      console.log(data)
      setRpm1(data.rpm1);
    }; 


    
    

  //   // Use the useEffect hook to update the speed, RPM, and time every second
  //  useEffect(() => {
  //     const interval = setInterval(() => {
  //       // Generate a random speed between 0 and 150 mph
  //       const randomSpeed = Math.floor(Math.random() * 150);

  //       // Generate a random RPM between 0 and 8000
  //       const randomRpm = Math.floor(Math.random() * 8000);

  //       // Update the speed and RPM state variables with the random values
  //       setSpeed(randomSpeed);
  //       setRpm(randomRpm)

  //       // Update the time state variable with the current time
  //       setTime(new Date());
  //     }, 1000);

  //     // Return a function to clear the interval when the component unmounts
  //     return () => clearInterval(interval);
  //   }, []);

    

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
              <div className="needle" style={{ transform: `rotate(${(speed1 / 150) * 210 + 330 - 90}deg)` }}></div>
<div className="progress-bar" style={{ transform: `scaleX(${speed1 / 150})` }}></div>


            </div>

{/* Speedometer label */}
<div className="label">mph</div>

{/* Speedometer value */}
<div className="value">{speed !== null ? `${speed}` : 'Loading...'}</div>
</div>

{/* Display oil temperature */}
<p className="oil">{oil !== null ? `${oil}°C` : 'Loading...'}</p>

<div>
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
                <div className="needle1" style={{ transform: `rotate(${(rpm1 / 8000) * 210 + 330 - 90}deg)` }}></div>
                <div className="progress-bar" style={{ transform: `scaleX(${rpm1 / 8000})` }}></div>
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