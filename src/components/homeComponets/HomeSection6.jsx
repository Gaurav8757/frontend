const HomeSection6 = () => {
    return (
        <section className="container-fluid flex flex-col md:flex-row bg-gradient-to-r from-white to-slate-400">
            <div className="flex flex-col md:flex-row ml-2 mr-2 pt-10 p-2 pb-5 text-start bg-gradient-to-r from-white to-slate-400">
                <div className="col md:w-2/3">
                    <div className="text-3xl mx-10 font-medium">Have a question? Here to help.
                        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
                            <line x1="10" y1="50" x2="90" y2="50" stroke="blue" strokeWidth="4" />
                        </svg>
                    </div>
                    {/* p2 start working from here */}
                    <div className="container w-auto sm:w-4/5 md:w-3/4 lg:w-2/3 text-justify text-xl mx-10">
                        <p>Our friendly customer support team is your extended family. Speak your heart out. They listen with undivided attention to resolve your concerns. Give us a call, request a callback or drop us an email, we’re here to help.</p>
                    </div>
                    <div className="text-center p-2 border border-slate-950 w-auto sm:w-60 mx-10 rounded-lg mt-8">
                        <span className="text-md text-blue-600">General Enquiries</span>
                        <h5 className="text-xl font-semibold tracking-tight my-2 text-gray-900">
                            100% Reliable
                        </h5>
                    </div>
                    <div className="text-center border border-slate-950 p-2 w-auto sm:w-60 rounded-lg mx-10 mt-8">
                        <span className="text-md text-blue-600">Customer Sales Enquiries</span>
                        <h5 className="text-xl font-semibold tracking-tight my-2 text-gray-900">
                            100% Reliable
                        </h5>
                    </div>
                </div>
                {/* [part-2]  */}
                <div className="grid  grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 w-auto sm:w-4/5 md:w-3/4 lg:w-2/3 justify-items-center md:justify-items-start">
                    {/* IMG DIV */}
                    <img src="/help.avif" alt="img" className="xl:mx-40 mx-0 md:mt-0 sm:mt-4  mt-20" />
                </div>
            </div>
        </section>
    );
};

export default HomeSection6;
