import React from 'react'
import { Map , TileLayer} from 'react-leaflet'

export default function MapView() {
    return (
        <div>

            <div>Hi</div>
            <Map center={[13,100]} zoom={13}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />               
            </Map>
        </div>
    )
}
