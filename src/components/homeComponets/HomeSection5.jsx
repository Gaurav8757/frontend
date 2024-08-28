import AdvantageModals from "./AdvantageModals";
const HomeSection5 = () => {
  return (
    <section className="container-fluid bg-slate-50">
      <div className="col ml-2 mr-2 pt-5 p-2 pb-5 text-start bg-slate-50">
        <div className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-medium">Eleedom IMF Advantage
          <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
            <line x1="10" y1="50" x2="25" y2="50" stroke="red" strokeWidth="4" />
          </svg>
        </div>
        {/* p2 start working from here */}
        <div className="text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl container w-3/2 sm:w-4/3 md:w-4/3 lg:w-4/5 xl:w-4/3 text-justify font-serif">
          <p>When you buy insurance from us, you get more than just financial safety. You also get
            our promise of simplifying complex insurance terms and conditions, quick stress-free claims,
            instant quotes from top insurers and being present for you in the toughest of times.</p>
            <div><AdvantageModals/></div>
        </div>

        
        {/* [part-2]  */}
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center   dark:text-gray-300 text-black">
          {/* <!-- card-1 --> */}
          <div className="border-4 bg-gradient-to-r from-rose-200 via-red-100 to-zinc-200 border-red-800 rounded-md shadow  transition-transform transform hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-gray-900">
            <img className="p-4  mx-auto bg-no-repeat rounded-full  object-contain" src="/quality.png" alt="image" />
            <div className="text-center my-5 font-serif">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                One of the best Prices
              </h5>
              <span className="text-base text-gray-900">Guaranteed</span>
            </div>
          </div>

          {/* <!-- card-2 --> */}
          <div className="border-4 bg-gradient-to-r from-rose-200 via-red-100 to-zinc-200 border-red-800 rounded-md shadow  transition-transform transform hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-gray-900">
            <img className="p-4 rounded-t-lg bg-no-repeat object-contain  mx-auto" src="/position.png" alt="image" />
            <div className="text-center my-5 font-serif">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                Unbiased Advice
              </h5>
              <span className="text-base text-gray-900">Keeping customers first</span>
            </div>
          </div>

          {/* <!-- card-3 --> */}
          <div className="border-4 bg-gradient-to-r from-rose-200 via-red-100 to-zinc-200 border-red-800 rounded-md shadow d transition-transform transform hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-gray-900">
            <img className="p-4  object-cover  mx-auto rounded-full" src="/reliability.png" alt="image" />
            <div className="text-center my-5 font-serif">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                100% Reliable
              </h5>
              <span className="text-base text-gray-900">Regulated by IRDAI</span>
            </div>
          </div>

          {/* <!-- card-4 --> */}
          <div className="bg-gradient-to-r from-rose-200 via-red-100 to-zinc-200 border-4 border-red-800 rounded-md shadow  transition-transform transform hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-gray-900">
            <img className="p-4 rounded-t-lg object-cover" src="/release.png" alt="image" />
            <div className="text-center my-5 font-serif">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                Claims Support
              </h5>
              <span className="text-base text-gray-900">Made stress-free</span>
            </div>
          </div>

          {/* <!-- card-5 --> */}
          <div className=" bg-gradient-to-r from-rose-200 via-red-100 to-zinc-200 border-4 border-red-800 rounded-md shadow  transition-transform transform hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-gray-900">
            <img className="p-4 rounded-t-lg object-cover  mx-auto" src="/helping.png" alt="image" />
            <div className=" my-5 flex-col text-center justify-end  font-serif ">
              <h5 className="text-base font-semibold tracking-tight text-gray-900">
                Happy to Help
              </h5>
              <span className="text-base text-gray-900">Every day of the week</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeSection5;
