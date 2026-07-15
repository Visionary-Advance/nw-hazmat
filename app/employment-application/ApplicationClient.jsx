'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { track } from "@/lib/amplitude";

export default function ApplicationClient() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    certifications: '',
    experience: '',
    availableForEmergency: '',
    message: '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      alert("reCAPTCHA not loaded. Please try again.");
      return;
    }

    const recaptchaToken = await executeRecaptcha("employment_application");

    // Convert file to base64 if present
    let attachment = null;
    if (file) {
      try {
        // Use FileReader to properly convert to base64
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result;
            // Remove the data URI prefix if present (e.g., "data:image/png;base64,")
            const base64Data = result.includes(',') ? result.split(',')[1] : result;
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        attachment = {
          filename: file.name,
          content: base64,
          content_type: file.type || 'application/octet-stream'
        };

        console.log('File converted to base64:', {
          filename: file.name,
          size: file.size,
          type: file.type,
          base64Length: base64.length,
          base64Preview: base64.substring(0, 50) + '...'
        });

        // Validate the base64 string
        if (!base64 || base64.length === 0) {
          throw new Error('Base64 conversion resulted in empty string');
        }
      } catch (error) {
        console.error('Error converting file to base64:', error);
        alert('Error processing file attachment. Please try again.');
        return;
      }
    }

    const payload = {
      recaptchaToken,
      from: "noreply@mail.visionaryadvance.com",
      to: ["office@nwhazmat.com"], // Update this to your jobs email
      reply_to: formData.email,
      subject: `New Job Application from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #15803d;">New Job Application</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Certifications:</strong><br>${formData.certifications || 'None specified'}</p>
          <p><strong>Experience:</strong><br>${formData.experience || 'None specified'}</p>
          <p><strong>Available for Emergency Response:</strong> ${formData.availableForEmergency || 'Not specified'}</p>
          <p><strong>Additional Message:</strong><br>${formData.message || 'None'}</p>
          ${file ? `<p><strong>Attachment:</strong> ${file.name}</p>` : ''}
        </div>
      `,
      text: `
        New Job Application

        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Certifications: ${formData.certifications || 'None specified'}
        Experience: ${formData.experience || 'None specified'}
        Available for Emergency Response: ${formData.availableForEmergency || 'Not specified'}
        Additional Message: ${formData.message || 'None'}
        ${file ? `Attachment: ${file.name}` : ''}
      `,
      ...(attachment && { attachments: [attachment] })
    };

    console.log("Sending job application via Resend...");
    console.log("Payload being sent:", {
      ...payload,
      attachments: payload.attachments ? payload.attachments.map(att => ({
        filename: att.filename,
        content_type: att.content_type,
        contentLength: att.content.length,
        contentPreview: att.content.substring(0, 50) + '...'
      })) : 'No attachments'
    });

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
        track("Employment Application Submitted");
        alert("Application submitted successfully!");
        setFormData({
          name: '',
          email: '',
          phone: '',
          certifications: '',
          experience: '',
          availableForEmergency: '',
          message: '',
        });
        setFile(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        console.error("Email error:", resJson);
        alert("There was a problem submitting your application. Please try again.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <header className="w-full max-w-xl text-center mb-6 mt-4">
        <h1 className="text-3xl md:text-4xl font-bold fjalla-one mb-2">
          Hazmat Careers in Eugene &amp; Lane County, Oregon
        </h1>
        <p className="text-gray-600">
          Join the NorthWest HazMat team. Submit your employment application
          below and attach your resume or certifications.
        </p>
      </header>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-xl rounded-xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Apply Now</h2>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          name="certifications"
          placeholder="List any Hazmat certifications (e.g., OSHA, HAZWOPER, etc.)"
          rows="2"
          value={formData.certifications}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          name="experience"
          placeholder="Briefly describe your Hazmat or cleanup experience"
          rows="3"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          name="availableForEmergency"
          value={formData.availableForEmergency}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Are you available for emergency response calls?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Sometimes">Sometimes</option>
        </select>

        <textarea
          name="message"
          placeholder="Anything else you'd like us to know?"
          rows="3"
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div>
          <label className="block mb-1 font-medium">Upload Resume or Certification Image</label>
          <input
            type="file"
            accept=".pdf,image/*,.doc,.docx"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {file && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Selected file:</p>
              <p className="text-sm text-gray-500">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded font-semibold transition-colors duration-150"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
