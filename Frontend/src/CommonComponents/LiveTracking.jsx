import React, { useEffect, useState, useCallback, useRef } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    minHeight: '400px',
    height: '100%',
};

const LiveTracking = () => {
    const [position, setPosition] = useState(null);
    const intervalRef = useRef(null);

    // Function to update position using Geolocation API
    const updatePosition = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    });
                },
                (err) => {
                    console.error('Error getting position:', err);
                }
            );
        }
    }, []);

    useEffect(() => {
        updatePosition();

        intervalRef.current = setInterval(updatePosition, 2000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [updatePosition]);

    return (
        <div className="w-full h-full">
            <LoadScript googleMapsApiKey="AIzaSyDgtD1Kp8yUQ_9-qqss2QUFRDX2RjH6ywI">
                {position && (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={position}
                        zoom={15}
                    >
                        <Marker position={position} />
                    </GoogleMap>
                )}
                {!position && <div>Getting your location...</div>}
            </LoadScript>
        </div>
    );
};

export default LiveTracking;
