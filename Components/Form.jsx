export default function Form() {
    return (
      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="w-11/12 lg:max-w-7xl border border-black/30 rounded-lg shadow-md p-6">
          <form className="flex flex-col">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
              <input
                placeholder="First Name"
                className="bg-white border border-black/30 text-black rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
                type="text"
              />
              <input
                placeholder="Last Name"
                className="bg-white border border-black/30 text-black rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
                type="text"
              />
            </div>
  
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
              <input
                placeholder="Email"
                className="bg-white border border-black/30 text-black rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
                type="email"
              />
              <input
                placeholder="Business Name (If Applicable)"
                className="bg-white border border-black/30 text-black rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
                type="text"
              />
            </div>

            <select
  className="bg-white border mb-4 border-black/30 text-black rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
  defaultValue=""
>
  <option value="" disabled>
    Select Type (Service or Training)
  </option>
  <option value="service">Service</option>
  <option value="training">Training</option>
</select>

  
            <textarea
              placeholder="Message"
              className="bg-white border h-52 border-black/30 text-black rounded-md p-2 mb-4 focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
            />
  
            <button
              className="w-full lg:w-1/12 bg-gradient-to-r bg-red-600 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-red-400 transition ease-in-out duration-150"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    )
  }
  