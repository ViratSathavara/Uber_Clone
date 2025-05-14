import React from 'react'
import LocationPinIcon from '@mui/icons-material/LocationPin';

const LocationSearchPanel = ({ setSelectedLocation, setVehiclePanel, setPanelOpen }) => {

    const locations = [
        {
            currentLocation: 'Padmavati Parking',
            currentAddress: 'Near Padmavati Temple, Satara Road, Pune',
            destinationLocation: '20 Tathastu Homes',
            destinationAddress: 'bankar colony, hadapsar, Hydrabad road, Pune'
        },
        {
            currentLocation: 'Swargate Stand',
            currentAddress: 'Swargate Bus Depot, Pune',
            destinationLocation: '20 Tathastu Homes',
            destinationAddress: 'bankar colony, hadapsar, Hydrabad road, Pune'
        },
        {
            currentLocation: 'FC Road Stop',
            currentAddress: 'Near Goodluck Cafe, Fergusson College Road, Pune',
            destinationLocation: '20 Tathastu Homes',
            destinationAddress: 'bankar colony, hadapsar, Hydrabad road, Pune'
        },
        {
            currentLocation: 'Katraj Parking',
            currentAddress: 'Near Katraj Dairy, Pune',
            destinationLocation: '20 Tathastu Homes',
            destinationAddress: 'bankar colony, hadapsar, Hydrabad road, Pune'
        },
        {
            currentLocation: 'Shivajinagar Stand',
            currentAddress: 'Shivajinagar Railway Station, Pune',
            destinationLocation: '20 Tathastu Homes',
            destinationAddress: 'bankar colony, hadapsar, Hydrabad road, Pune'
        }
    ];


    return (
        <div className="flex flex-col">
            {locations.map((location, index) => (
                <div
                    key={index}
                    onClick={() => {
                        setPanelOpen(false);
                        setVehiclePanel(true);
                        setSelectedLocation(location)
                    }}
                    className="flex items-center gap-4 border-2 rounded-xl m-3 border-white active:border-black p-1"
                >
                    <LocationPinIcon />
                    <div>
                        <h4 className="font-bold">{location.currentLocation}</h4>
                        <h5 className="font-normal">{location.currentAddress}</h5>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default LocationSearchPanel