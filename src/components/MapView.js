import React from 'react'
import { divIcon } from 'leaflet';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

const icon = divIcon({
    className: 'custom-icon' , 
    iconSize: [32, 32]
});


export default function MapView(props) {

    const {locationArray } = props;
    const markerElements = locationArray.map((location) => {
        const {
            id , 
            country_code , 
            country , 
            province , 
            coordinates: {
                latitude , longitude
            }
         } = location;


        let title = country;
        if (province !== '' && province !== country) {
            title = `${province}, ${country}`;
        }
        return (
            <Marker 
                key={`${id}-${country_code}`} 
                position={[latitude, longitude]}
                icon={icon}
            >
                <Popup>{title}</Popup>
            </Marker>
        )       
    });

    return (
        <div>
            <Map className="map-view" center={[13,100]} zoom={13}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />        
                {markerElements}
            </Map>
        </div>
    )
}
