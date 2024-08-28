const HomeSection4 = () => {
  return (
    <section className="container-fluid bg-gradient-to-r from-slate-50 to-slate-50">
      <div
        className="container-fluid   p-5 mx-auto flex leading-relaxed flex-col md:flex-row justify-around items-center bg-cover bg-repeat brightness-100  contrast-125"
        style={{ backgroundImage: "url(/bg1.jpg)", }}>
        <div className="md:w-1/2 text-start text-base sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl   justify-center md:text-start ">
          <p className=" font-normal font-serif ">What makes</p>
          <p className=" font-thin leading-snug ">
            <b className="font-semibold font-mono text-red-700">
              Eleedom Imf Private Limited
            </b>{" "}
            <span className="font-serif whitespace-nowrap font-normal">one of</span>
          </p>
          <p>
            <b className=" leading-snug font-normal font-serif">
              India&apos;s favourite places
            </b>
          </p>

          <p>
            <span className="font-normal font-serif">to</span>
            <b className=" font-semibold font-mono text-red-700">
              {" "}
              buy insurance
            </b>
            <b className="ml-1 font-serif">?</b>
          </p>
        </div>

        <div className="md:w-1/2 xl:w-1/4 lg:w-1/4 w-full  grid grid-cols-2 md:grid-cols-2  lg:grid-cols-2  gap-4  mt-4  text-start  items-center text-xs sm:text-base md:text-base lg:text-base xl:text-md">
          <div className="hover:shadow-2xl hover:shadow-red-800 transition transform hover:-translate-y-2 hover:-translate-x-2   p-2 rounded-lg border-red-800 bg-red-200 border-l-4 ">
            <img className="w-8" src="/confetti.png" />
            <p className="text-lg sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-red-800 font-semibold pb-3">
              1 million+
            </p>
            <p className="font-serif font-medium">
              Customers trust us &amp; have bought their insurance on ELLEDOM
              IMF PVT LTD
            </p>
          </div>
          {/* 2nd */}
          <div className="hover:shadow-2xl hover:shadow-gray-800 shadow-2xl shadow-white transition transform hover:-translate-y-2 hover:translate-x-2  p-2 rounded-lg  border-black bg-slate-200  border-l-4">
            <img className="w-8" src="/search.png" />
            <p className="text-lg sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-black font-semibold pb-3">
              350+ insurers
            </p>
            <p className="font-serif font-medium">
              Partnered with us so that you can compare easily &amp;
              transparently
            </p>
          </div>
          {/* 3rd */}
          <div className=" hover:shadow-2xl hover:shadow-gray-800 shadow-2xl shadow-white transition transform hover:translate-y-2 hover:-translate-x-2  p-2 rounded-lg  border-black bg-slate-200  border-l-4">
            <img className="w-8" src="/star.png" />
            <p className="text-lg sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-black  font-semibold pb-3">
              Great Price
            </p>
            <p className="font-serif font-medium">
              For all kinds of insurance plans available online
            </p>
          </div>
          <div className="hover:shadow-2xl hover:shadow-red-800 transition transform hover:translate-y-4 hover:translate-x-2  shadow-white p-2 rounded-lg border-red-800 bg-red-200  border-l-4">
            <img className="w-10" src="/lady-skin.png" />
            <p className="text-lg sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-red-800 pb-3 font-semibold">Claims</p>
            <p className="font-serif font-semi">
              Support built in with every policy for help, when you need it the
              most
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection4;
