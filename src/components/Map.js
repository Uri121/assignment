
import React from 'react'
import { API_KEY } from '../config/key';
import { ReactBingmaps } from 'react-bingmaps';


export const Map = ({ pins, lines, locationName }) => {
    const center = pins && pins[0] ? pins[0].location : [13.0827, 80.2707];
    return (
        <div className="map">
            <ReactBingmaps
                bingmapKey={API_KEY}
                center={center}
                pushPins={
                    pins
                }
                polyline={pins.length > 0 ?
                    { "location": lines, "option": { fillColor: "green", strokeThickness: 5 } } : null

                }
            >

            </ReactBingmaps>
        </div >

    )
}
