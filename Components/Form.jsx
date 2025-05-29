import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    businessName: "",
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  const payload = {
    recipient: "colten.hallett@visionaryadvance.com", // your client’s inbox
    reply_to: email, // this makes replies go to the form user
    website_name: "nwhazmat.com",
    body: message,
    html_body: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #B91C1C;">New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br>${message}</p>
      </div>
    `
  };

  try {
    console.log("Sending to API...");
    const res = await fetch("https://mail.visionaryadvance.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });


    if (res.ok) {
      alert("Your message has been sent!");
      e.target.reset(); // Optional: clears the form
    } else {
      const error = await res.json();
      console.error("Email error:", error);
      alert("There was a problem sending your message.");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Server error. Please try again.");
  }
};

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <div className="w-11/12 lg:max-w-7xl border border-black/30 rounded-lg shadow-md p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="bg-white border border-black/30 text-black rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
              type="text"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="bg-white border border-black/30 text-black rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
              type="text"
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-white border border-black/30 text-black rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
              type="email"
            />
            <input
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name (If Applicable)"
              className="bg-white border border-black/30 text-black rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
              type="text"
            />
          </div>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="bg-white border mb-4 border-black/30 text-black rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
          >
            <option value="" disabled>Select Type (Service or Training)</option>
            <option value="service">Service</option>
            <option value="training">Training</option>
          </select>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
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
  );
}
