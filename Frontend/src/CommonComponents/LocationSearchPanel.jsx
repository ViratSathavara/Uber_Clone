import React from 'react'
import LocationPinIcon from '@mui/icons-material/LocationPin';

const LocationSearchPanel = ({ vehiclePanel, setVehiclePanel, setPanelOpen }) => {

    console.log(vehiclePanel, setVehiclePanel)

    const locations = [
        {
            title: 'Padmavati Parking',
            address: 'Near Padmavati Temple, Satara Road, Pune'
        },
        {
            title: 'Swargate Stand',
            address: 'Swargate Bus Depot, Pune'
        },
        {
            title: 'FC Road Stop',
            address: 'Near Goodluck Cafe, Fergusson College Road, Pune'
        },
        {
            title: 'Katraj Parking',
            address: 'Near Katraj Dairy, Pune'
        },
        {
            title: 'Shivajinagar Stand',
            address: 'Shivajinagar Railway Station, Pune'
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
                    }}
                    className="flex items-center gap-4 border-2 rounded-xl m-3 border-white active:border-black p-1"
                >
                    <LocationPinIcon />
                    <div>
                        <h4 className="font-bold">{location.title}</h4>
                        <h5 className="font-normal">{location.address}</h5>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default LocationSearchPanel