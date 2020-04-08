import React , { useState , useEffect , useCallback } from 'react';
import Axios from 'axios'
import 'leaflet/dist/leaflet.css'
import './css/App.scss'
import {VARIABLES} from './constants/Constants'
import MapView from './components/MapView';
import ListView from './components/ListView';
import DetailsView from './components/DetailsView';


function App() {

  const [locationArray, setLocationArray] = useState([])
  const [selectedLocation , setSelectedLocation] = useState(null);
  const [mapCenter , setMapCenter] = useState([13.75398, 100.50144])

  function sortedLocationArray(locations) {
    return [...locations].sort((location1 , location2) => {
      return location2.latest.confirmed - location1.latest.confirmed;
    })
  }

  const onSelectLocation = useCallback(
    (id) => {
      
        const location = locationArray.find(_location => _location.id === id)
        if  (location === undefined) {
          setSelectedLocation(null);
        }

        setSelectedLocation(location);
        const { coordinates: {latitude, longitude}} = location;

        setMapCenter([latitude, longitude])
      
    },
    [locationArray],
  )

  const onDeSelectLocation = useCallback(
    () => {
      setSelectedLocation(null);
    },
    [],
  )
  

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

  let detailsView = null;
  if (selectedLocation != null) {
    detailsView = <DetailsView location={selectedLocation} onClickClose={onDeSelectLocation} />
  }

  return (
    <div className="App">
      <ListView locationArray={locationArray} selectedLocation={selectedLocation} 
        onSelectItem={onSelectLocation}
        onDeSelectItem={onDeSelectLocation}
      />
      <MapView locationArray={locationArray} 
        mapCenter={mapCenter}
        onSelectMarker={onSelectLocation}
      />
      {detailsView}
    </div>
  );
}

export default App;
