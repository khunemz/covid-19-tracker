import React , { useState , useEffect } from 'react';
import MapView from './components/MapView';
import Axios from 'axios'
import 'leaflet/dist/leaflet.css'
import './css/App.scss'
import {VARIABLES} from './constants/Constants'

function App() {

  const [locationArray, setLocationArray] = useState([])

  // load api after componentDidMount
  useEffect(()=>{
    Axios.get(VARIABLES.API_URL+`v2/locations`).then(res => {
      setLocationArray(res.data.locations)
    }).catch(error => {
      console.log(error)
    })
  } , []);


  return (
    <div className="App">
      <MapView locationArray={locationArray} />
    </div>
  );
}

export default App;
