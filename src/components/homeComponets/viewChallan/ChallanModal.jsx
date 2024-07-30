/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, startTransition } from "react";

function ChallanModal() {
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [timer, setTimer] = useState(30);
    const [mobileNumber, setMobileNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [isGetOtpActive, setIsGetOtpActive] = useState(false);

    const startTimer = () => {
        startTransition(() => {
        setShowOtpInput(true);
        setTimer(30);
    });
    };

    const handleMobileNumberChange = (e) => {
        const inputMobileNumber = e.target.value;
        startTransition(() => {
        setMobileNumber(inputMobileNumber);
        setIsGetOtpActive(inputMobileNumber.length === 10);
    });
    };

    useEffect(() => {
        let interval;
        if (showOtpInput && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
            }, 1000);
        } else if (timer === 0) {
            setShowOtpInput(false);
        }

        return () => {
            clearInterval(interval);
        };
    }, [showOtpInput, timer]);

    const handleOtpInputChange = (e) => {
        startTransition(() => {
        setOtp(e.target.value);
    });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle OTP submission
        // You can use the 'otp' state to handle the submitted OTP
    };

    const handleResendOTP = () => {
       
        if (!showOtpInput && !timer && isGetOtpActive) {
            startTransition(() => {
            startTimer();
        });
        }
        
    };

    return (
        <>
            <button type="button" data-modal-target="static-modal33"
                data-modal-toggle="static-modal33" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xl hover:text-black
           px-6 sm:px-8 w-auto sm:w-auto md:w-52 lg:w-80 xl:w-96 py-2.5 text-center me-2 mb-2">View Challans</button>

            <div id="static-modal33" data-modal-backdrop="static"
                tabIndex="-1" aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 inset-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50">

                <section className="p-0 flex relative scroll-smooth w-full max-w-5xl h-96 max-h-5xl mx-auto hs-scroll-inside-viewport-modal max-h-auto text-justify rounded-md overflow-y-auto border bg-gradient-to-l from-slate-00">
                    <div className="container-fluid w-1/2 hidden sm:block md:block lg:block xl:block">
                        <img src="/challancut.avif" alt="chalan" className="object-fill w-full  h-full  shadow-xl dark:shadow-gray-800" />
                    </div>
                    <div className="max-w-7xl mt-4 mx-12">
                        <h2 className="mb-4 text-xl font-bold text-gray-300 ">
                            <b>Login</b> to Continue
                        </h2>
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2 grid-cols-2 sm:gap-6 sm:mb-5">
                                <div className="w-62">
                                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Mobile Number
                                    </label>
                                    <input type="tel" name="number" id="number"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="+91 900 999 9999" value={mobileNumber} onChange={handleMobileNumberChange} required />
                                </div>
                                <div className="mt-7 ml-1 ">
                                    <button type="button" onClick={startTimer}
                                        className={`text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900 ${isGetOtpActive ? "" : "cursor-not-allowed opacity-50"}`}
                                        disabled={!isGetOtpActive}>
                                        Get OTP
                                    </button>
                                </div>
                            </div>
                        </form>

                        {showOtpInput && (
                            <form action="#" onSubmit={handleSubmit}>
                                <div className="grid gap-4 mb-4 sm:grid-cols-2 grid-cols-2 sm:gap-4 sm:mb-5">
                                    <div className="col-span-1">
                                        <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Enter OTP
                                        </label>
                                        <input type="text" name="otp" id="otp"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            onChange={handleOtpInputChange} required />
                                    </div>
                                    <div className="mt-7">
                                        <button type="submit"
                                            className="text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900">
                                            Verify OTP
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {timer && showOtpInput ? (
                            <div className="text-white text-sm">
                                Resend OTP in {timer} seconds
                            </div>
                        ) : (
                            <button onClick={handleResendOTP} className="text-white text-sm">Resend OTP</button>
                        )}
                    </div>

                    <div className="mt-3 mr-4">
                        <img src="/close.png" height={5} width={25} alt="report"
                            className=" text-slate-200  cursor-pointer text-end inline-flex justify-end"
                            data-modal-hide="static-modal33" />
                    </div>
                </section>
            </div>
        </>
    );
}

export default ChallanModal;
