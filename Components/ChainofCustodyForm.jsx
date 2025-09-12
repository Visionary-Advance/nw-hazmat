// Components/ChainOfCustodyForm.jsx
'use client';
import { useState } from 'react';

export default function ChainofCustodyForm() {
  const [formData, setFormData] = useState({
    // Client Information
    client: '',
    address: '',
    cityStateZip: '',
    phone: '',
    contact: '',
    
    // Sampler Information
    samplerName: '',
    email: '',
    
    // Payment
    paymentMethod: '',
    
    // Analysis
    analysis: [],
    turnaround: '',
    
    // Site Information
    siteAddress: '',
    siteCityStateZip: '',
    project: '',
    poNumber: '',
    
    // Samples
    samples: [
      { number: '', description: '', date: '', otherInfo: '' }
    ],
    
    // Chain of Custody
    relinquishedBy: '',
    relinquishedDateTime: '',
    receivedBy: '',
    receivedDateTime: '',
    resultsBy: '',
    resultsDateTime: ''
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'analysis') {
      setFormData(prev => ({
        ...prev,
        analysis: checked 
          ? [...prev.analysis, value]
          : prev.analysis.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSampleChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      samples: prev.samples.map((sample, i) => 
        i === index ? { ...sample, [field]: value } : sample
      )
    }));
  };

  const addSample = () => {
    setFormData(prev => ({
      ...prev,
      samples: [...prev.samples, { number: '', description: '', date: '', otherInfo: '' }]
    }));
  };

  const removeSample = (index) => {
    if (formData.samples.length > 1) {
      setFormData(prev => ({
        ...prev,
        samples: prev.samples.filter((_, i) => i !== index)
      }));
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-chain-of-custody', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chain-of-custody-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold fjalla-one">Chain of Custody Form</h1>
        <p className="text-gray-600 mt-2">NorthWest HazMat, Inc.</p>
      </div>

      {/* Client Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold fjalla-one mb-4 text-red-600">Client Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Client *</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Client name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Street address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">City, State, Zip</label>
            <input
              type="text"
              name="cityStateZip"
              value={formData.cityStateZip}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="City, State ZIP"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Phone number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Contact person"
            />
          </div>
        </div>
      </div>

      {/* Sampler Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold fjalla-one mb-4 text-red-600">Sampler Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sampler Name *</label>
            <input
              type="text"
              name="samplerName"
              value={formData.samplerName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Name of person collecting samples"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Sampler email"
            />
          </div>
        </div>
      </div>

      {/* Payment and Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Payment */}
        <div>
          <h2 className="text-xl font-semibold fjalla-one mb-4 text-red-600">Payment Method</h2>
          <div className="space-y-2">
            {['cash', 'check', 'card'].map(method => (
              <label key={method} className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="capitalize font-medium">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Analysis */}
        <div>
          <h2 className="text-xl font-semibold fjalla-one mb-4 text-red-600">Analysis Required</h2>
          <div className="space-y-2 mb-4">
            {[
              { value: 'asbestos', label: 'ASBESTOS' },
              { value: 'mold', label: 'MOLD' },
              { value: 'lead', label: 'LEAD' }
            ].map(analysis => (
              <label key={analysis.value} className="flex items-center">
                <input
                  type="checkbox"
                  name="analysis"
                  value={analysis.value}
                  checked={formData.analysis.includes(analysis.value)}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="font-medium">{analysis.label}</span>
              </label>
            ))}
          </div>

          {/* Asbestos Turnaround */}
          {formData.analysis.includes('asbestos') && (
            <div>
              <h3 className="text-lg font-medium mb-2">Asbestos Turnaround</h3>
              <div className="space-y-2">
                {[
                  { value: '4hour', label: '4 Hour Rush' },
                  { value: '2business', label: '2 Business Days' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="turnaround"
                      value={option.value}
                      checked={formData.turnaround === option.value}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Site Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold fjalla-one mb-4 text-red-600">Site Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Site Address</label>
            <input
              type="text"
              name="siteAddress"
              value={formData.siteAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Site street address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">City/State/Zip</label>
            <input
              type="text"
              name="siteCityStateZip"
              value={formData.siteCityStateZip}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Site city, state, zip"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Project</label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Project name/description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">PO#</label>
            <input
              type="text"
              name="poNumber"
              value={formData.poNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Purchase order number"
            />
          </div>
        </div>
      </div>

      {/* Samples */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold fjalla-one text-red-600">Sample Information</h2>
          <button
            type="button"
            onClick={addSample}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
          >
            Add Sample
          </button>
        </div>
        
        {formData.samples.map((sample, index) => (
          <div key={index} className="border border-gray-200 rounded p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Sample #{index + 1}</h3>
              {formData.samples.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSample(index)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Sample No.</label>
                <input
                  type="text"
                  value={sample.number}
                  onChange={(e) => handleSampleChange(index, 'number', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Sample number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description / Location</label>
                <input
                  type="text"
                  value={sample.description}
                  onChange={(e) => handleSampleChange(index, 'description', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Sample description and location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={sample.date}
                  onChange={(e) => handleSampleChange(index, 'date', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Other Info / Special Instructions</label>
                <input
                  type="text"
                  value={sample.otherInfo}
                  onChange={(e) => handleSampleChange(index, 'otherInfo', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Additional information"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chain of Custody */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold fjalla-one mb-4 text-red-600">Chain of Custody</h2>
        
        {/* Relinquished By */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Relinquished by (Print Name)</label>
            <input
              type="text"
              name="relinquishedBy"
              value={formData.relinquishedBy}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Name of person relinquishing samples"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date/Time</label>
            <input
              type="datetime-local"
              name="relinquishedDateTime"
              value={formData.relinquishedDateTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Received By */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Received by (Print Name)</label>
            <input
              type="text"
              name="receivedBy"
              value={formData.receivedBy}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Name of person receiving samples"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date/Time</label>
            <input
              type="datetime-local"
              name="receivedDateTime"
              value={formData.receivedDateTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Results By (Print Name)</label>
            <input
              type="text"
              name="resultsBy"
              value={formData.resultsBy}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Name of person providing results"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Date/Time</label>
            <input
              type="datetime-local"
              name="resultsDateTime"
              value={formData.resultsDateTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Generate PDF Button */}
      <div className="text-center">
        <button
          onClick={generatePDF}
          disabled={isGenerating || !formData.client || !formData.samplerName}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold text-lg fjalla-one transition-colors"
        >
          {isGenerating ? 'Generating PDF...' : 'Generate Chain of Custody PDF'}
        </button>
        
        {(!formData.client || !formData.samplerName) && (
          <p className="text-red-500 text-sm mt-2">
            Please fill in required fields: Client and Sampler Name
          </p>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-gray-50 rounded border border-gray-200">
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>Note:</strong> If submitted samples are non-homogeneous in nature, then sub-samples of the components will be analyzed and billed as separate layers. Because of equipment/measurement limitations, asbestos fiber content will be unable to be determined in some samples. Those samples determined to contain asbestos fibers, will have the following measurement percentage ranges (1% = 0-3%, 5% = 1-9%, 10% = 5-15%, 20% = 10-30%, 50% = 40-60%) as specified per EPA method 600/R-93/116. If samples are not collected by an AHERA Accredited Inspector, then the accuracy of results will be determined by the methodology and acuity of the sample collector.
        </p>
      </div>
    </div>
  );
}