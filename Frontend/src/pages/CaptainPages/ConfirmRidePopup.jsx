import React, { useRef, useState } from 'react'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { Button } from '@mui/material';
import { useNavigation } from '../../UtilityComponents/NavigateUtility';

const ConfirmRidePopup = ({ setConfirmRidePopup, setOpenPopup }) => {
    const { navigateTo } = useNavigation();
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 3) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = () => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length === 4) {
            console.log('OTP entered:', enteredOtp);

            navigateTo('CAPTAIN_RIDING');
        } else {
            alert('Please enter the complete 4-digit OTP');
        }
    };

    return (
        <div>
            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-center mb-2">Confirm this ride to start</h1>
                <div className="flex items-center justify-between w-full">
                    <img
                        src="https://img.freepik.com/free-photo/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg?uid=R56702273&ga=GA1.1.233314606.1746901734&semt=ais_hybrid&w=740"
                        alt="User"
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div className='flex items-end flex-col'>
                        <h2 className='text-2xl font-bold'>Maria Oka</h2>
                        <p>2.4 km</p>
                    </div>
                </div>
                <div className="p-4 border-b border-gray-200">
                    <div className='flex gap-1'>
                        <AddLocationIcon className="text-black text-3" />
                        <h1 className="text-sm font-medium text-gray-500">Pickup Location</h1>
                    </div>
                    <h2 className="text-lg font-semibold mt-1">Padmavati Parking</h2>
                    <h3 className="text-gray-600">Near Padmavati Temple, Satara Road, Pune</h3>
                </div>

                <div className="p-4 border-b border-gray-200">
                    <div className='flex gap-1'>
                        <WhereToVoteIcon className="text-black text-3" />
                        <h1 className="text-sm font-medium text-gray-500">Destination Location</h1>
                    </div>
                    <h2 className="text-lg font-semibold mt-1">20 Tathastu Homes</h2>
                    <h3 className="text-gray-600">bankar colony, hadapsar, Hydrabad road, Pune</h3>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center p-4 rounded-lg">
                    <h1 className="text-lg font-medium">Price</h1>
                    <h2 className="text-lg font-semibold">₹250.29 Cash</h2>
                </div>

                <div className='flex flex-col gap-3'>
                    <form className="flex flex-col gap-3">
                        <h1 className="text-lg font-medium">Enter OTP Here</h1>
                        <div className="flex items-center justify-between w-full">
                            {[0, 1, 2, 3].map((index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={otp[index]}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    inputMode="numeric"
                                />
                            ))}
                        </div>
                        <Button
                            onClick={() => {
                                setConfirmRidePopup(false);
                                setOpenPopup(false);
                            }}
                            className="!capitalize w-full py-3 !bg-gray-200 !text-gray-800 font-bold rounded-lg hover:!bg-green-700"
                        >
                            Verify OTP
                        </Button>
                    </form>

                    <div className='flex flex-row gap-3'>
                        <Button
                            onClick={() => {
                                setConfirmRidePopup(false);
                                setOpenPopup(false);
                            }}
                            className="!capitalize w-full py-3 !bg-gray-200 !text-gray-800 font-bold rounded-lg hover:!bg-green-700"
                        >
                            Ignore
                        </Button>
                        <Button
                            onClick={() => {
                                navigateTo('CAPTAIN_RIDING');
                            }
                            }
                            className="!capitalize w-full py-3 !bg-green-400 !text-black font-bold rounded-lg hover:!bg-green-700 transition"
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup