import React, { createRef, useState, useEffect } from 'react'
import { Map } from './components/Map';
import { Form } from './components/Form';
import { API_KEY } from './config/key';


const App = () => {
  const [cordsType, setCordsType] = useState("cords");
  const [coords, setCoords] = useState([]);
  const [locationName, setLocationName] = useState();
  const [lines, setLines] = useState([])
  const latRef = createRef();
  const nameRef = createRef();
  const longRef = createRef();

  const handleOptionsClick = (event) => {
    const { name } = event.target;
    setCordsType(name)
  }

  useEffect(() => {
    if (coords.length > 2) {
      setLines(prevState => [...prevState, [coords[0].location[0], coords[0].location[1]]])
    }
  }, [coords])

  useEffect(() => {
    if (!locationName) return

    fetch(`http://dev.virtualearth.net/REST/v1/Locations/${locationName}?o=json&key=${API_KEY}`).then(res => res.json()).then(data => {
      const nameCoords = data.resourceSets[0].resources[0].geocodePoints[0].coordinates
      setCoords([...coords, { location: nameCoords, option: { color: 'red' } }])
      setLines(prevState =>
        [
          ...prevState,
          nameCoords
        ])
    })
  }, [locationName])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cordsType === 'cords') {
      const lat = Number(latRef.current.value);
      const long = Number(longRef.current.value)
      setCoords(coords => [...coords, { location: [lat, long], option: { color: 'red' } }])
      setLines(prevState =>
        [
          ...prevState,
          [lat, long]
        ])
    } else {
      setLocationName(nameRef.current.value);
    }
  }

  return (
    <div className="App">
      <Form latRef={latRef} longRef={longRef} nameRef={nameRef} cordsType={cordsType} handleSubmit={handleSubmit} handleOptionsClick={handleOptionsClick} />
      <Map pins={coords} lines={lines} />
    </div>
  );
}

export default App;
