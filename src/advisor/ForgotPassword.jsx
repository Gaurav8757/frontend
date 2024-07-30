import { NavLink } from "react-router-dom";

function ForgotPassword() {
  return (
    <>
    <section className="container-fluid h-screen relative bg-orange-500">
      <div className="container-fluid pt-5 flex flex-col md:flex-row items-center  justify-between bg-orange-500">
        <div className="flex-shrink-4  mx-20 mt-16  md:h-full h-full pb-40">
          <img
            src="/forgot.webp"
            className="h-full w-full rounded-lg mx-auto "
            alt="Logo"
          />
        </div>
        <div className="flex-shrink-1 px-32  md:h-full h-full w-full xs:w-full -mt-20 sm:w-full md:1/2 mx-auto lg:w-1/2 xl:w-1/2 xl:py-10">
          <div className="w-full max-w-xl p-6 space-y-6 sm:p-10 bg-white rounded-lg shadow ">
            <h2 className="text-2xl font-bold text-gray-900 ">
            Forgot Password
            </h2>
            <form
              className="mt-0 space-y-3"
              method="POST"
            //   onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-3 text-sm text-start font-medium text-gray-900"
                >
                  Your Email
                </label>
                <input
                  type="text"
                  name="email "
                  id="email"
                //   value={email }
                //   onChange={(e) => {
                //     const inputValue = e.target.value;
                //     setEmail(inputValue);
                //    // Assuming you want to set mobile to the same value as email
                //   }}
                  autoComplete="email || mobile"
                  className="bg-gray-200 border border-gray-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 active:placeholderbg-gray-400focus:border-primary-500 block w-full p-2.5"
                  placeholder="forgot@gmail.com"
                  required
                />
              </div>
              <div className=" text-end text-sm text-black m-0 ">
              Remember your password?  
             <NavLink to = "/advisor" className="ml-2 font-semibold text-red-700 hover:text-red-500">
             Sign in
             </NavLink>
              </div>
            
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:ring-blue-900 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:ring focus-visible:ring-indigo-600 focus-visible:ring-opacity-50"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default ForgotPassword;