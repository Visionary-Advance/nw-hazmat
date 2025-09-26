import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
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

    const payload = {
      from: "noreply@mail.visionaryadvance.com", // You'll need to verify this domain with Resend
      to: ["colten.hallett@visionaryadvance.com"],
      reply_to: formData.email,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #B91C1C;">New Contact Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Phone Number:</strong> ${formData.phone}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Business Name:</strong> ${formData.businessName}</p>
          <p><strong>Type:</strong> ${formData.type}</p>
          <p><strong>Message:</strong><br>${formData.message}</p>
        </div>
      `,
      text: `
        New Contact Submission
        
        Name: ${formData.name}
        Phone Number: ${formData.phone}
        Email: ${formData.email}
        Business Name: ${formData.businessName}
        Type: ${formData.type}
        Message: ${formData.message}
      `
    };

    console.log("Sending email via Resend...");
    console.log("Payload:", payload);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("API response received");

      const resJson = await res.json();
      console.log("API JSON:", resJson);

      if (res.ok) {
        alert("Your message has been sent!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          businessName: "",
          type: "",
          message: "",
        });
      } else {
        console.error("Email error:", resJson);
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="bg-white border border-black/30 text-black rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
              type="text"
              required
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="bg-white border border-black/30 text-black rounded-md p-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-black/30 transition ease-in-out duration-150"
              type="tel"
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
              required
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
            required
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
            required
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