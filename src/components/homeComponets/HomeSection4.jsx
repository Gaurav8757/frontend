
const HomeSection4 = () => {
    return (
        <section className="container-fluid bg-gradient-to-r from-slate-200 to-slate-100">

            <div className="container-fluid   p-5 mx-auto flex leading-relaxed flex-col md:flex-row justify-around items-center bg-cover bg-repeat brightness-100  contrast-125" style={{ backgroundImage: "url(/bg1.jpg)" }}>

                <div className="md:w-1/2 text-start sm:text-4xl text-3xl   justify-center md:text-start ">
                    <p className=" font-thin leading-snug">What makes</p>
                    <p className=" font-thin leading-snug"><b className="font-semibold ">Eleedom Imf Private Limited</b> one of</p>
                    <b className=" font-semibold leading-snug">India&apos;s favourite places </b>
                    <br />
                    <span className="font-thin">to</span>
                    
                    <b className=" font-semibold"> buy insurance?</b>
                </div>

                <div className="md:w-1/4 grid grid-cols-2 md:grid-cols-1  lg:grid-cols-2  gap-4  mt-10  text-start  items-center">
                    <div className="shadow-2xl transition transform hover:-translate-y-2 hover:-translate-x-2  hover:shadow-none p-4 rounded-lg border-blue-800 bg-slate-100 border-l-4 ">
                        <img className="w-10" src="/confetti.png"/>
                        <p className="text-2xl text-blue-800 font-semibold pb-3">1 million+</p>
                        <p className="">customers trust us &amp; have bought their insurance on ELLEDOM IMF PVT LTD</p>
                    </div>
                    {/* 2nd */}
                    <div className="shadow-2xl transition transform hover:-translate-y-2 hover:translate-x-2 hover:shadow-none p-4 rounded-lg shadow-white border-sky-400 bg-slate-100  border-l-4">
                    <img className="w-10" src="/search.png"/>
                        <p className="text-2xl text-sky-400 font-semibold pb-3">350+ insurers</p>
                        <p className="">partnered with us so that you can compare easily &amp; transparently</p> 
                    </div>
                    {/* 3rd */}
                    <div className=" shadow-2xl transition transform hover:translate-y-2 hover:-translate-x-2  hover:shadow-none p-4 rounded-lg  border-green-400 bg-slate-100  border-l-4">
                    <img className="w-10" src="/star.png"/>
                        <p className="text-2xl text-green-400  font-semibold pb-3">Great Price</p>
                        <p className="">for all kinds of insurance plans available online</p>
                    </div>
                    <div className="shadow-2xl  transition transform hover:translate-y-2 hover:translate-x-2 hover:shadow-none shadow-white p-4 rounded-lg border-yellow-400 bg-slate-100  border-l-4">
                    <img className="w-10" src="/lady-skin.png"/>
                        <p className="text-2xl text-yellow-400 pb-3">Claims</p>
                        <p className="">support built in with every policy for help, when you need it the most</p>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default HomeSection4;
