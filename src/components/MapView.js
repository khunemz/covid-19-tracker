import React from 'react'
import { divIcon } from 'leaflet';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

// const icon = divIcon({
//     className: 'custom-icon' , 
//     iconSize: [32, 32]
// });


const icons = {
    xxSmall: divIcon({
        className: 'custom-icon pink' , 
        iconSize: [12, 12]
    }) , 
    xSmall: divIcon({
        className: 'custom-icon pink' , 
        iconSize: [16, 16]
    }) ,
    small: divIcon({
        className: 'custom-icon pink' , 
        iconSize: [24, 24]
    }) ,
    normal: divIcon({
        className: 'custom-icon purple' , 
        iconSize: [32, 32]
    }) , 
    large: divIcon({
        className: 'custom-icon purple' , 
        iconSize: [48, 48] 
    }) ,
    xLarge: divIcon({
        className: 'custom-icon red' , 
        iconSize: [72, 72]
    }) ,
    xxLarge: divIcon({
        className: 'custom-icon red' , 
        iconSize: [96, 96]
    })
}

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
            } , 
            latest: {confirmed}
         } = location;

      
        let markerIcon = icons.xxSmall;
        if (confirmed >= 101 && confirmed <=500) {
            markerIcon = icons.xSmall;
        } else if (confirmed >= 501 && confirmed <=1000) {
            markerIcon = icons.small;
        } else if (confirmed >= 1001 && confirmed <=5000) {
            markerIcon = icons.normal;
        } else if (confirmed >= 5001 && confirmed <=10000) {
            markerIcon = icons.large;
        }  else if (confirmed >= 10001 && confirmed <=50000) {
            markerIcon = icons.xLarge;
        } else if (confirmed >= 50001) {
            markerIcon = icons.xxLarge;
        }

        let title = `${country}-(${confirmed})`
        if (province !== '' && province !== country) {
            title = `${province}-${country}-(${confirmed})`;
        }
        return (
            <Marker 
                key={`${id}-${country_code}`} 
                position={[latitude, longitude]}
                icon={markerIcon}
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
