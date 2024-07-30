// eslint-disable-next-line react/prop-types
function AigHealth({ onClose }) {
  return (
    <section className="fixed rounded backdrop-blur-lg top-0 right-0  left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
    <div className="relative bg-transparent p-1 xl:w-10/12 lg:w-10/12 md:w-10/12 sm:w-10/12 w-11/12 max-w-4xl max-h-7xl mx-auto xl:my-40 lg:my-40 md:my-30 sm:my-10 my-10 rounded">
        <div className="flex items-center justify-between p-1 rounded-lg ">
            {/* <h3 className="text-xl font-semibold text-gray-100">
                Update health Details
            </h3> */}
            <button
                onClick={onClose}
                type="button"
                className="  hover:bg-red-400 bg-red-100  text-slate-100  rounded-lg text-sm w-7 h-7 ms-auto inline-flex justify-center items-center  ">
                <img src="/close.png" height={5} width={20} alt="close" className="hover:bg-red-400 rounded-full" />
            </button>
        </div>

        <main className="z-100 container-fluid flex justify-center p-0.5  rounded bg-gradient-to-l  from-rose-500 via-slate-300 to-rose-700">
                    <div className="relative w-full  rounded shadow-xl text-2xl items-center bg-gradient-to-r  from-rose-700 via-rose-500 to-rose-700">
                        <div className="flex flex-wrap py-5 justify-evenly">
                            <div className="h-48 w-48">
                                <img src="/aighealth.png" alt="fourwheeler" />
                            </div>

                            {/* FIELD - 1 */}
                            <div className="flex  flex-col justify-evenly mb-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-5 text-center ">
                                <div className="flex flex-col xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 mb-5">
                                    <label className="text-lg font-semibold text-yellow-50 mx-1">Vehicle Number</label>
                                    {/* <input
                                        className="input-style rounded-md focus:outline-none focus:ring-0 py-2 mt-1 text-2xl uppercase text-center font-bold placeholder:text-base placeholder:text-center"
                                        type="text"
                                        name="vehicleNo"
                                        onChange={handleChange}
                                        placeholder="Enter Vehicle Number (eg. BR-01-AM-0000)"
                                        value={vehicleNo}
                                        maxLength="13"
                                    /> */}
                                </div>
                                <button className="relative py-auto inline-flex  items-center justify-center p-0.5  0verflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-red-600  hover:-translate-y-1 duration-300 hover:bg-red-800 hover:text-whitefocus:ring-0 focus:outline-none">
                                    <span className="relative px-2 text-xl py-1 text-yellow-50 my-auto transition-all ease-in-out duration-300   group-hover:bg-opacity-0">
                                        View Offers
                                    </span>
                                    <img src="/ri.png" width={25} className="grayscale hover:translate-x-3 transition-transform duration-300" alt="button" />
                                </button>

                            </div>
                        </div>
                    </div>
                </main>
    </div>
</section>
  )
}

export default AigHealth;