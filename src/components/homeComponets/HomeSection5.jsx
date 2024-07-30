import AdvantageModals from "./AdvantageModals";
const HomeSection5 = () => {
  return (
    <section className="container-fluid bg-gradient-to-r from-white to-slate-50">
      <div className="col ml-2 mr-2 pt-10 p-2 pb-5 text-start bg-gradient-to-r from-white to-slate-50">
        <div className="text-3xl mx-10 font-medium">Eleedom IMF Advantage
          <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
            <line x1="10" y1="50" x2="90" y2="50" stroke="red" strokeWidth="4" />
          </svg>
        </div>
        {/* p2 start working from here */}
        <div className="container w-4/5 sm:w-3/2 md:w-2/3 lg:w-3/4  text-justify text-xl mx-10">
          <p>When you buy insurance from us, you get more than just financial safety. You also get
            our promise of simplifying complex insurance terms and conditions, quick stress-free claims,
            instant quotes from top insurers and being present for you in the toughest of times.</p>
            <div><AdvantageModals/></div>
        </div>

        
        {/* [part-2]  */}
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-items-center text-xl xs:text-xl sm:text-xl md:text-xl xl:text-xl m-10  dark:text-gray-300 text-black">
          {/* <!-- card-1 --> */}
          <div className="border border-gray-200 rounded-md shadow dark:border-gray-700 transition-transform transform hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-gray-900">
            <img className="p-4 w-3/4 mx-auto rounded-full  object-cover" src="/guarantee.svg" alt="image" />
            <div className="text-center">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                One of the best Prices
              </h5>
              <span className="text-base text-gray-900">Guaranteed</span>
            </div>
          </div>

          {/* <!-- card-2 --> */}
          <div className="border border-gray-200 rounded-md shadow dark:border-gray-700 transition-transform transform hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-gray-900">
            <img className="p-4 rounded-t-lg object-cover w-3/4 mx-auto" src="/customers.svg" alt="image" />
            <div className="text-center my-5">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                Unbiased Advice
              </h5>
              <span className="text-base text-gray-900">Keeping customers first</span>
            </div>
          </div>

          {/* <!-- card-3 --> */}
          <div className="border border-gray-200 rounded-md shadow dark:border-gray-700 transition-transform transform hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-gray-900">
            <img className="p-4  object-cover w-3/4 mx-auto rounded-full" src="/reliable.jpg" alt="image" />
            <div className="text-center">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                100% Reliable
              </h5>
              <span className="text-base text-gray-900">Regulated by IRDAI</span>
            </div>
          </div>

          {/* <!-- card-4 --> */}
          <div className="bg-transparent border border-gray-200 rounded-md shadow dark:border-gray-700 transition-transform transform hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-gray-900">
            <img className="p-4 rounded-t-lg object-cover" src="/claim-support.svg" alt="image" />
            <div className="text-center my-5">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900">
                Claims Support
              </h5>
              <span className="text-base text-gray-900">Made stress-free</span>
            </div>
          </div>

          {/* <!-- card-5 --> */}
          <div className="bg-transparent border border-gray-200 rounded-md shadow dark:border-gray-700 transition-transform transform hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-gray-900">
            <img className="p-4 rounded-t-lg object-cover w-3/4 mx-auto" src="/helped.webp" alt="image" />
            <div className="text-center">
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
