function Companies() {
  return (
    <section className="container-fluid relative bg-white">
      <div
        className="container-fluid  
       bg-slate-50"
      >
        {/* part - 1 */}
        <div className="flex flex-col md:flex-row my-auto justify-center bg-slate-50">
          <div className="   h-auto flex justify-center items-center ">
            <img
              src="/logo.webp" // Add the actual image source
              alt="company img"
              className="w-1/2 md:w-2/3 lg:w-1/2 mt-4 md:mt-0 items-center transition-transform transform hover:scale-105 duration-300 ease-in-out"
            />
          </div>

          <div className="w-full mt-4 flex my-auto flex-col lg:w-1/2 max-w-5xl  rounded-lg  bg-slate-50">
            {/* part-1 */}
            <div className="w-full mx-auto items-center justify-center  text-justify">
              <h1 className="text-xl text-center text-red-800 font-semibold bg-slate-50">
                Welcome to Eleedom IMF PVT. LTD. <br />
                (Your Trusted Insurance Partner)
              </h1>
              <p className=" text-lg my-0.5 mx-5">
                Established in 2022, Eleedom IMF PVT. LTD has a rich legacy that
                spans over 16 years in the insurance industry. What started as
                an individual agency in Bihar has evolved into a leading
                insurance marketing firm, proudly serving the region and beyond.
              </p>
            </div>
            {/* part -2 */}
            <div className="w-full mx-auto items-center justify-center mt-4 text-justify">
              <h1 className="text-xl text-center text-red-800 font-semibold">
                Our Journey
              </h1>
              <div className="w-full flex items-center justify-center  text-justify">
                <p className=" text-lg my-0.5 mx-5">
                  Rooted in the heart of Bihar, we embarked on our journey in
                  2006 as individual agents dedicated to providing reliable and
                  comprehensive insurance solutions. Over the years, our
                  commitment to excellence and client satisfaction propelled us
                  to the forefront of the industry.
                </p>
              </div>
            </div>
            {/* part -3 */}
            <div className="w-full mx-auto items-center justify-center mt-4 text-justify">
              <h1 className="text-xl text-center text-red-800 font-semibold">
                Leading the Way
              </h1>
              <div className="w-full flex items-center justify-center  text-justify">
                <p className=" text-lg my-0.5 mx-5">
                  For the past five years, we have proudly held the title of the
                  leading insurance agent in our region. This achievement is a
                  testament to our unwavering dedication to our clients and our
                  passion for safeguarding what matters most to them.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* section-2 */}
        <div className="bg-slate-50 my-10 flex">
          <div className="w-full  mx-auto items-center justify-center mt-4 text-justify">
            <h1 className="text-xl text-center text-red-800 font-semibold">
              Why Choose Eleedom IMF PVT. LTD.
            </h1>
            <div className="block md:flex">
            {/* 1 */}
            <div className="w-full  flex flex-col mt-4 items-center justify-center  text-justify">
              <h1 className="text-xl text-center text-red-800 font-semibold">
                Experience
              </h1>
              <p className=" text-lg my-0.5 mx-5">
                With over a decade of experience, we bring a wealth of knowledge
                to the table, ensuring you receive expert advice and tailored
                solutions.
              </p>
            </div>

            {/* 2 */}
            <div className="w-full flex flex-col mt-4 items-center justify-center  text-justify">
              <h1 className="text-xl text-center text-red-800 font-semibold">
              Local Expertise
              </h1>
              <p className=" text-lg my-0.5 mx-5">
              As a company deeply rooted in Bihar,
                we understand the unique challenges and opportunities of our
                region, allowing us to provide insurance solutions that resonate
                with the local community.
              </p>
            </div>

             {/* 3 */}
             <div className="w-full  flex flex-col mt-4 items-center justify-center  text-justify">
              <h1 className="text-xl text-center text-red-800 font-semibold">
              Customer-Centric Approach
              </h1>
              <p className=" text-lg my-0.5 mx-5">
              Your satisfaction is our
                priority. We prioritize clear communication, transparency, and
                personalized service to meet your unique needs.
              </p>
            </div>
          </div>
          </div>
        </div>


         {/* section-3 */}
         <div className="bg-slate-50 mb-10 flex">
          <div className="w-full  mx-auto items-center justify-center text-justify">
            <h1 className="text-xl text-center text-red-800 font-semibold">
            Our Services
            </h1>
            <div className="block md:flex">
            {/* 1 */}
            <div className="w-full  flex flex-col mt-4 items-center justify-center  text-justify">
              <h1 className="text-xl text-center text-red-800 font-semibold">
              General Insurance
              </h1>
              <p className=" text-lg my-0.5 mx-5">
              Protect your assets, business, and
                personal belongings with our wide range of general insurance
                options.
              </p>
            </div>

            {/* 2 */}
            <div className="w-full flex flex-col mt-4 items-center justify-center  text-justify">
              <h1 className="text-xl text-center text-red-800 font-semibold">
              Personal Insurance
              </h1>
              <p className=" text-lg my-0.5 mx-5">
              Safeguard your health, life, and
              loved ones with our personalized personal insurance solutions.
              </p>
            </div>

             {/* 3 */}
             <div className="w-full  flex flex-col mt-4 items-center justify-center  text-justify">
              <h1 className="text-xl text-center text-red-800 font-semibold">
              Business Insurance
              </h1>
              <p className=" text-lg my-0.5 mx-5">
              We understand the complexities of
                running a business. Our business insurance plans are designed to
                mitigate risks and support your growth.
              </p>
            </div>
          </div>
          </div>
        </div>

       
      

        <div className="bg-slate-50">
        <h1 className="text-xl text-center text-red-800 font-semibold">
        Join Us in Securing Your Future
              </h1>
        
          <div className="flex justify-center text-justify  ">
          <p className=" text-lg my-0.5 mx-5">
          Whether you&apos;re an individual looking for personal protection
              or a business seeking comprehensive coverage, Eleedom IMF PVT LTD
              is here for you. Explore our website to discover the perfect
              insurance solution for your needs. Partner with us for a secure
              and prosperous future.
              </p>
         
          </div>
        </div>
      </div>
    </section>
  );
}

export default Companies;
