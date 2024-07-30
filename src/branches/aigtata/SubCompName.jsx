import { useState } from 'react';
import AigCarVehicle from './Popup/AigCarVehicle.jsx';
import AigTwVehicle from './Popup/AigTwVehicle.jsx';
import AigHealth from './Popup/AigHealth1.jsx';

function SubCompName() {
    const [showCarPopup, setShowCarPopup] = useState(false);
    const [showTwPopup, setShowTwPopup] = useState(false);
    const [showHealthPopup, setShowHealthPopup] = useState(false);

    const handleUpdateClick = (popupType) => {
        if (popupType === 'car') {
            setShowCarPopup(true);
        } else if (popupType === 'tw') {
            setShowTwPopup(true);
        } else if (popupType === 'health') {
            setShowHealthPopup(true);
        }
    };

    const handleClosePopup = (popupType) => {
        if (popupType === 'car') {
            setShowCarPopup(false);
        } else if (popupType === 'tw') {
            setShowTwPopup(false);
        } else if (popupType === 'health') {
            setShowHealthPopup(false);
        }
    };

    return (
        <div className="sm:ml-48 bg-slate-300">
            <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 bg-blue-50 gap-4 py-8 p-2">
                <div className="flex flex-col p-4 justify-center rounded-md bg-red-500 shadow-2xl text-center">
                    <button className="hover:-translate-y-3 hover:scale-110 hover:drop-shadow-2xl shadow-red-950 duration-300" onClick={() => handleUpdateClick('tw')}>
                        <img src="/motorbike.png" className="object-fill drop-shadow-2xl shadow-slate-900 border-gray-200" alt="TW" />
                        <h2 className="font-semibold text-base sm:text-lg text-white">TW</h2>
                    </button>
                </div>

                <div className="flex flex-col p-4 justify-center bg-blue-500 rounded-md shadow-xl text-center">
                    <button className="hover:-translate-y-3 hover:scale-110 hover:drop-shadow-2xl shadow-blue-950 duration-300" onClick={() => handleUpdateClick('car')}>
                        <img src="/road.png" className="object-fill drop-shadow-2xl shadow-slate-900" alt="CAR" />
                        <h2 className="font-semibold text-base sm:text-lg text-white">4-WHEELER</h2>
                    </button>
                </div>

                <div className="flex flex-col p-4 justify-center bg-rose-700 rounded-md shadow-xl text-center">
                    <button className="hover:-translate-y-3 hover:scale-110 hover:drop-shadow-2xl shadow-red-950 duration-300 mx-auto" onClick={() => handleUpdateClick('health')}>
                        <img src="/healthcare.png" className="object-fill drop-shadow-2xl p-8 shadow-slate-900" alt="HEALTH" />
                        <h2 className="font-semibold text-base sm:text-lg text-white">HEALTH</h2>
                    </button>
                </div>

                <div className="block rounded-xl border border-gray-800 p-4"></div>
            </div>

            {showCarPopup && <AigCarVehicle onClose={() => handleClosePopup('car')} />}
            {showTwPopup && <AigTwVehicle onClose={() => handleClosePopup('tw')} />}
            {showHealthPopup && <AigHealth onClose={() => handleClosePopup('health')} />}
        </div>
    );
}

export default SubCompName;
