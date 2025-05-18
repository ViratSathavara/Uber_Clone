import React from 'react';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { Button } from '@mui/material';
import axios from 'axios';

const LocationSearchPanel = ({ pickup, destination, setPanelOpen, setVehiclePanel, suggestions, onSelectSuggestion, fare, setFare }) => {
    // Ensure suggestions is always an array
    const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];


    const findTrip = async () => {
        setPanelOpen(false);
        setVehiclePanel(true);

        const res = await axios.get(`${import.meta.env.VITE_BASE_HOSTED_URI}/ride/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_token')}`,
            },
        });
        setFare(res?.data);
    }

    return (
        <div className="flex flex-col">
            {safeSuggestions.length === 0 ? (

                <div className="m-3 text-center text-gray-500">No suggestions found</div>
            ) : (
                <>
                    <div className="flex justify-center p-4">
                        <Button
                            onClick={() => {
                                findTrip()
                            }}
                            variant="contained"
                            className='w-full m-4'
                        >
                            Get Location
                        </Button>
                    </div>
                    {safeSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => onSelectSuggestion(suggestion || '')}
                            className="flex items-center gap-4 border-1 border-gray-400 rounded-lg m-3 p-1 py-3 overflow-auto cursor-pointer"
                        >
                            <LocationPinIcon />
                            <div>
                                <h4 className="font-bold">{suggestion.description || 'Location'}</h4>
                                <h5 className="font-normal">
                                    {suggestion.structured_formatting?.secondary_text || ''}
                                </h5>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default LocationSearchPanel;