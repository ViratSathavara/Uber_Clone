import React from 'react';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { Button } from '@mui/material';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from "../CommonComponents/Toast";

const LocationSearchPanel = ({ pickup, destination, setPanelOpen, setVehiclePanel, suggestions, onSelectSuggestion, setFare }) => {
    const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

    const findTrip = async () => {
        
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_HOSTED_URI}/ride/get-fare`, {
                params: { 
                    pickup: encodeURIComponent(pickup), 
                    destination: encodeURIComponent(destination) 
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('user_token')}`,
                },
        });
        
        if (res?.status === 200) {
            setFare(res?.data);
            setPanelOpen(false);
            setVehiclePanel(true);
        } else {
            throw new Error(res.data.message || "Unknown error occurred");
        }
    } catch (error) {
        setVehiclePanel(false);
        
        if (error.response) {
            const { status, data } = error.response;
            
            if (status === 404) {
                showErrorToast("Please enter a valid pickup and destination");
            } else if (status === 400) {
                if (data.errors) {
                    showErrorToast("Validation errors: " + data.errors.map(e => e.msg).join(", "));
                } else {
                    showErrorToast(data.message || "Please check your input");
                }
            } else if (status === 500) {
                showErrorToast("Server error. Please try again later.");
            }
        } else if (error.request) {
            showErrorToast("Network error. Please check your connection.");
        } else {
            showErrorToast("Request error: " + error.message);
        }
        
    }
};

    return (
        <div className="flex flex-col h-full">

            <>
                <div className="sticky top-0 z-10 bg-white py-4 shadow-sm">
                    <Button
                        onClick={findTrip}
                        disabled={pickup?.length === 0 || destination?.length === 0}
                        variant="contained"
                        className="w-full bg-black hover:bg-gray-800 text-white font-medium rounded-lg shadow-sm transition-colors duration-300"
                        sx={{
                            padding: '12px 0',
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: '500'
                        }}
                    >
                        Get Location
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto px-2 pb-4">
                    {safeSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => onSelectSuggestion(suggestion || '')}
                            className="flex items-center gap-3 border border-gray-200 rounded-lg mx-2 my-2 p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                        >
                            <LocationPinIcon className="text-gray-500" />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 truncate">{suggestion.description || 'Location'}</h4>
                                <h5 className="text-sm text-gray-500 truncate">
                                    {suggestion.structured_formatting?.secondary_text || ''}
                                </h5>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        </div>
    );
};

export default LocationSearchPanel;