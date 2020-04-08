import React , { useState , useEffect } from 'react';
import Axios from 'axios'
import 'leaflet/dist/leaflet.css'
import './css/App.scss'
import {VARIABLES} from './constants/Constants'
import MapView from './components/MapView';
import ListView from './components/ListView';


function App() {

  const [locationArray, setLocationArray] = useState([])

  function sortedLocationArray(locations) {
    return [...locations].sort((location1 , location2) => {
      return location2.latest.confirmed - location1.latest.confirmed;
    })
  }

  // load api after componentDidMount
  useEffect(()=>{
    Axios.get(VARIABLES.API_URL+`v2/locations`).then(res => {
      // sorting array
      const sortedLocations = sortedLocationArray(res.data.locations)
      setLocationArray(sortedLocations)
    }).catch(error => {
      console.log(error)
    })
  } , []);


  return (
    <div className="App">
      <ListView locationArray={locationArray} />
      <MapView locationArray={locationArray} />
    </div>
  );
}

export default App;
