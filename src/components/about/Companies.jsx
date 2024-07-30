function Companies() {
  return (
    <section className="container-fluid relative bg-white">
      <div className="container-fluid  pb-4 pt-10
       sm:pt-10 bg-orange-50">
        {/* part - 1 */}
        <div className="flex flex-col lg:flex-row bg-orange-50">
          <div className="lg:w-1/2  max-w-4xl   h-auto flex justify-center items-center mb-6 pb-5 lg:mb-0 sm:order-first md:order-first lg:order-first xl:order-first">
            <img
              src="/logo.webp" // Add the actual image source
              alt="company img"
              className="w-1/2 sm:w-1/2  md:w-1/2 lg:w-1/4 xl:w-1/4 xl:absolute lg:absolute top-24  max-w-4xl mx-auto me-auto lg:w-fit xl:w-fit h-auto  items-center transition-transform transform hover:scale-105 duration-300 ease-in-out"
            />
          </div>

          <div className="w-full lg:w-1/2 max-w-5xl mb-5 mt-16 lg:mr-10 rounded-lg  bg-orange-50">

            <div className="text-2xl text-blue-700 font-semibold bg-orange-50">
              Welcome to Eleedom IMF PVT. LTD. <br/>
               (Your Trusted Insurance Partner)
            </div>
            <div className="w-full flex items-center justify-center  text-justify">
              <p className=" text-xl mt-5 mx-10">Established in 2022, Eleedom IMF PVT. LTD has a rich legacy that spans over 16 years in the insurance industry. What started as an individual agency in Bihar has evolved into a leading insurance marketing firm, proudly serving the region and beyond.</p>
            </div>
          </div>
        </div>

        {/* part-2 */}
        <div className="flex flex-col lg:flex-row bg-orange-50">
          <div className="lg:w-1/2 max-w-4xl lg:mr-10 h-auto flex justify-center items-center mb-6 pb-5 lg:mb-0 sm:order-first md:order-first lg:order-first xl:order-first">
           {/* Update UI on Monday */}
            {/* <img
              src="/cname.png" // Add the actual image source
              alt="company img"
              className="w-1/2 sm:w-1/2 md:w-1/2 max-w-5xl mx-auto me-auto llg:w-fit xl:w-fit h-auto  items-center transition-transform transform hover:scale-105 duration-300 ease-in-out"
            /> */}
          </div>

          <div className="w-full lg:w-1/2  max-w-5xl mb-5 mt-10 lg:mr-10 rounded-lg  dark:border-gray-100">

            <div className="text-2xl text-blue-700 font-semibold">
              Our Journey
            </div>
            <div className="w-full flex items-center justify-center  text-justify">
              <p className=" text-xl mt-5 mx-10">Rooted in the heart of Bihar, we embarked on our journey in 2006 as individual agents dedicated to providing reliable and comprehensive insurance solutions. Over the years, our commitment to excellence and client satisfaction propelled us to the forefront of the industry.</p>
            </div>
          </div>
        </div>

        {/* part - 3 */}
        <div className="flex flex-col lg:flex-row bg-orange-50">
          <div className="lg:w-1/2 max-w-4xl lg:mr-10 h-auto flex justify-center items-center mb-6 pb-5 lg:mb-0 sm:order-first md:order-first lg:order-first xl:order-first">
            {/* <img
              src="/logo.png" // Add the actual image source
              alt="company img"
              className="w-1/2 sm:w-1/2 md:w-1/2 max-w-5xl mx-auto me-auto lg:w-1/2 xl:w-1/3 h-auto rounded-full items-center transition-transform transform hover:scale-105 duration-300 ease-in-out"
            /> */}
          </div>

          <div className="w-full lg:w-1/2  max-w-5xl mb-5 mt-10 lg:mr-10 rounded-lg  dark:border-gray-100">

            <div className="text-2xl text-blue-700 font-semibold">
              Leading the Way
            </div>
            <div className="w-full flex items-center justify-center  text-justify">
              <p className=" text-xl mt-5 mx-10">For the past five years, we have proudly held the title of the leading insurance agent in our region. This achievement is a testament to our unwavering dedication to our clients and our passion for safeguarding what matters most to them.</p>
            </div>
          </div>
        </div>
        {/* part-4 */}
        <div className="bg-orange-100">
        <div className="text-2xl mt-32 mb-12 w-full text-blue-700 flex-nowrap font-semibold ">Why Choose Eleedom IMF PVT. LTD.</div>
        
<div className="flex justify-center ">
        <ol className="text-xl text-justify w-3/4 leading-relaxed">
          <li>
          <b>1. Experience:</b> With over a decade of experience, we bring a wealth of knowledge to the table, ensuring you receive expert advice and tailored solutions.
          </li>
          <li><b>
          2. Local Expertise:</b> As a company deeply rooted in Bihar, we understand the unique challenges and opportunities of our region, allowing us to provide insurance solutions that resonate with the local community.
          </li>
          <li><b>
          3. Customer-Centric Approach:</b> Your satisfaction is our priority. We prioritize clear communication, transparency, and personalized service to meet your unique needs.
          </li>
        </ol>
        </div>
</div>
<div className="bg-orange-100">
        <div className="text-2xl mt-10  mb-8 w-full text-blue-700 flex-nowrap font-semibold">Our Services</div>
        <div className="flex justify-center">
        <ol className="text-xl text-justify w-3/4 leading-relaxed">
          <li>
          <b>1. General Insurance:</b> Protect your assets, business, and personal belongings with our wide range of general insurance options.
          </li>
          <li><b>
          2. Personal Insurance:</b> Safeguard your health, life, and loved ones with our personalized personal insurance solutions.
          </li>
          <li><b>
          3. Business Insurance:</b> We understand the complexities of running a business. Our business insurance plans are designed to mitigate risks and support your growth.
          </li>
        </ol></div></div>

        <div className="bg-orange-100">
        <div className="text-2xl mt-10  mb-8 w-full text-blue-700 flex-nowrap font-semibold">Join Us in Securing Your Future</div>
        <div className="flex justify-center ">
        <ol className="text-xl text-justify w-3/4 leading-relaxed">
        Whether you&apos;re an individual looking for personal protection or a business seeking comprehensive coverage, Eleedom IMF PVT LTD is here for you. Explore our website to discover the perfect insurance solution for your needs.
Partner with us for a secure and prosperous future.
</ol>
        </div>
</div>
      </div>
      
    </section>
  );
}

export default Companies;
