'use client';

import { useState } from 'react';

export default function JobApplicationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    certifications: '',
    experience: '',
    availableForEmergency: '',
    message: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'file' && formData.file) {
        data.append('file', formData.file);
      } else {
        data.append(key, formData[key]);
      }
    });

    const res = await fetch('/api/apply', {
      method: 'POST',
      body: data,
    });

    if (res.ok) {
      alert('Application submitted!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        certifications: '',
        experience: '',
        availableForEmergency: '',
        message: '',
        file: null,
      });
    } else {
      alert('Submission failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
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
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <textarea
          name="certifications"
          placeholder="List any Hazmat certifications (e.g., OSHA, HAZWOPER, etc.)"
          rows="2"
          value={formData.certifications}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <textarea
          name="experience"
          placeholder="Briefly describe your Hazmat or cleanup experience"
          rows="3"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <select
          name="availableForEmergency"
          value={formData.availableForEmergency}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
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
          className="w-full border border-gray-300 p-2 rounded"
        />

        <div>
          <label className="block mb-1 font-medium">Upload Resume or Certification Image</label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded font-semibold"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
