const HomeSection6 = () => {
  return (
    <section className="container-fluid flex flex-col md:flex-row bg-slate-50">
      <div className="flex flex-col md:flex-row  pt-5  pb-5 text-start   bg-slate-50">
        <div className=" container w-3/2 sm:w-4/3 md:w-4/3 lg:w-4/5 xl:w-4/3">
          <div className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl mx-5 font-medium">
            Have a question? Here to help.
            <svg
              width="70"
              height="70"
              xmlns="http://www.w3.org/2000/svg"
              className="-mt-12 -ml-2"
            >
              <line
                x1="10"
                y1="50"
                x2="30"
                y2="50"
                stroke="red"
                strokeWidth="4"
              />
            </svg>
          </div>
          {/* p2 start working from here */}
          <div className="container w-auto w-3/2 sm:w-4/3 md:w-4/3 lg:w-4/5 xl:w-4/3 text-justify text-base sm:text-xl md:text-xl lg:text-xl xl:text-xl mx-5 font-serif">
            <p>
              Our friendly customer support team is your extended family. Speak
              your heart out. They listen with undivided attention to resolve
              your concerns. Give us a call, request a callback or drop us an
              email, we’re here to help.
            </p>
          </div>
          <div className="text-center p-1 border-2 border-slate-950 w-2/3 sm:w-2/3 md:w-2/3 lg:w-2/5 xl:w-2/5 mx-5 rounded xl:mt-16 mt-8">
            <span className="text-base sm:text-xl md:text-xl lg:text-xl xl:text-xl text-red-700 font-semibold">
              General Enquiries
            </span>
            <h5 className="text-base sm:text-xl md:text-xl lg:text-xl xl:text-xl font-normal font-serif tracking-tight my-1 text-gray-900">
              100% Reliable
            </h5>
          </div>
          <div className="text-center border-2 border-red-800 p-1 w-2/3 sm:w-2/3 md:w-2/3 lg:w-2/5 xl:w-2/5 rounded ml-20 mr-2 mt-10">
            <span className="text-base sm:text-xl md:text-xl lg:text-xl xl:text-xl text-red-700 font-semibold">
              Customer Sales Enquiries
            </span>
            <h5 className="text-base sm:text-xl md:text-xl lg:text-xl xl:text-xl font-normal font-serif tracking-tight my-1 text-gray-900">
              100% Authentic
            </h5>
          </div>
        </div>
        {/* [part-2]  */}
        <div className="grid  grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1  sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/2 justify-items-center md:justify-items-start">
          {/* IMG DIV */}
          <img
            src="/help.png"
            alt="img"
            className="w-3/4 md:w-full xl:mx-1  mt-5 xl:my-auto md:my-auto "
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSection6;
