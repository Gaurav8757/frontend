import { useState } from "react";
function TrackRequest() {
  const [textInput, setTextInput] = useState("");
  const [textareaInput, setTextareaInput] = useState("");
  return (
    <section className="container-fluid relative p-0 flex justify-center my-10 bg-orange-50">
    <div className="relative  flex-col  md:w-1/3 rounded-xl shadow-xl text-xl container-fluid bg-orange-100">
      <h1 className="text-blue-800 text-xl font-semibold my-4">Track Your Request</h1>
      <div className="space-y-2 p-4 text-start">
         {/* Other form fields */}
         <label className="text-base mx-1 font-medium ">Topic</label>
        <textarea
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 w-full p-2.5"
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="TEXT"
        />

      <label className="text-base mx-1 font-medium"> Query</label>
        <textarea
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 w-full p-2.5"
          rows="4"
          cols="25"
          maxLength="300"
          value={textareaInput}
          onChange={(e) => setTextareaInput(e.target.value)}
          placeholder="Max Allowed Characters: 200"
        ></textarea>

       
        <div className="flex justify-center ">
          <button
            className="bg-orange-700 hover:bg-orange-800 text-white font-medium py-1 px-4 rounded "
            // onClick={handleSubmit}
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </section>
  );
}

export default TrackRequest;
