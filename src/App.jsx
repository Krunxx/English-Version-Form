import React, { useState } from "react";
import ustpLogo from "./assets/ustpLogo.png";
import Swal from 'sweetalert2';

const App = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    clientType: "",
    role: "",
    sex: "",
    age: "",
    region: "",
    campus: "",
    transactedOffice: "",
    serviceAvailed: "",
    ccAwareness: "",
    ccVisibility: "",
    ccHelp: "",
    SQD0: "",
    SQD1: "",
    SQD2: "",
    SQD3: "",
    SQD4: "",
    SQD5: "",
    SQD6: "",
    SQD7: "",
    SQD8: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    setAttemptedSubmit(true);
    // Basic validation
    if (currentSection === 1) {
      if (formData.name && formData.email && formData.clientType && formData.role && formData.sex && formData.age && formData.region) {
        setCurrentSection(currentSection + 1);
      }
    } else if (currentSection === 2) {
      if (formData.campus) {
        setCurrentSection(currentSection + 1);
      }
    } else if (currentSection === 3) {
      if (formData.serviceAvailed) {
        setCurrentSection(currentSection + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, clientType, role, sex, age, region, campus, transactedOffice, serviceAvailed, ccAwareness, ccVisibility, ccHelp, SQD0, SQD1, SQD2, SQD3, SQD4, SQD5, SQD6, SQD7, SQD8, comments } = formData;

    try {
      const response = await fetch(`https://v1.nocodeapi.com/krunxx/google_sheets/xpHINvDtukGYwqYg?tabId=Sheet1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([[new Date().toLocaleString(), name, email, clientType, role, sex, age, region, campus, transactedOffice, serviceAvailed, ccAwareness, ccVisibility, ccHelp, SQD0, SQD1, SQD2, SQD3, SQD4, SQD5, SQD6, SQD7, SQD8, comments]])
      });

      if (response.ok) {
        await Swal.fire({
          title: 'Thank you!',
          text: 'Thank you for answering the survey. God Bless!',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Reset form data
        setFormData({
          name: "",
          email: "",
          clientType: "",
          role: "",
          sex: "",
          age: "",
          region: "",
          campus: "",
          transactedOffice: "",
          serviceAvailed: "",
          ccAwareness: "",
          ccVisibility: "",
          ccHelp: "",
          SQD0: "",
          SQD1: "",
          SQD2: "",
          SQD3: "",
          SQD4: "",
          SQD5: "",
          SQD6: "",
          SQD7: "",
          SQD8: "",
          comments: "",
        });
        setCurrentSection(1);
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      await Swal.fire({
        title: 'Error!',
        text: 'There was an issue submitting your form. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-11/12 max-w-md">
        <div className="mt-4 bg-transparent p-6 rounded-lg shadow-md">
          <div className="flex justify-center">
            <img src={ustpLogo} alt="Description of image" className="max-h-40" />
          </div>
        </div>
        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-center font-semibold text-3xl">
            USTP HARMONIZED CLIENT SATISFACTION SURVEY (Online Version)
          </h3>
        </div>
        {/* Section 1 */}
        {currentSection === 1 && (
          <div>
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <p><b>ENGLISH VERSION:</b> This Client Satisfaction Measurement (CSM) tracks the customer experience of government offices. Your feedback on your recently concluded transaction will help this office provide a better service. Personal information shared will be kept confidential and you always have the option not to answer this form.</p>
            </div>
            {/* NAME */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <label className="font-bold">Name <span className="text-red-500">{attemptedSubmit && !formData.name ? "*" : ""}</span></label>
              <input type="text" name="name" className="border rounded-md p-2 w-full text-lg" value={formData.name} onChange={handleChange} />
            </div>

            {/* Email */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <label className="font-bold">Email <span className="text-red-500">{attemptedSubmit && !formData.email ? "*" : ""}</span></label>
              <input type="email" name="email" className="border rounded-md p-2 w-full" value={formData.email} onChange={handleChange} />
            </div>
            {/* Client Type */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <div className="font-bold">Client Type <span className="text-red-500">{attemptedSubmit && !formData.clientType ? "*" : ""}</span></div>
              {["Citizen", "Business", "Government (Employee or another agency)"].map((type) => (
                <div key={type} className="flex items-center">
                  <input type="radio" name="clientType" value={type} checked={formData.clientType === type} onChange={handleChange} />
                  <label className="ml-2">{type}</label>
                </div>
              ))}
            </div>
            {/* Role */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <div className="font-bold">I am a <span className="text-red-500">{attemptedSubmit && !formData.role ? "*" : ""}</span></div>
              {["Faculty", "Non-Teaching Staff", "Student", "Guardian/Parent of Student", "Alumna", "Others"].map((role) => (
                <div key={role} className="flex items-center">
                  <input type="radio" name="role" value={role} checked={formData.role === role} onChange={handleChange} />
                  <label className="ml-2">{role}</label>
                </div>
              ))}
            </div>
            {/* Sex */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <div className="font-bold">Sex <span className="text-red-500">{attemptedSubmit && !formData.sex ? "*" : ""}</span></div>
              {["Male", "Female"].map((sex) => (
                <div key={sex} className="flex items-center">
                  <input type="radio" name="sex" value={sex} checked={formData.sex === sex} onChange={handleChange} />
                  <label className="ml-2">{sex}</label>
                </div>
              ))}
            </div>
            {/* Age */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <label className="font-bold">Age <span className="text-red-500">{attemptedSubmit && !formData.age ? "*" : ""}</span></label>
              <input type="number" name="age" className="border rounded-md p-2 w-full" value={formData.age} onChange={handleChange} />
            </div>
            {/* Region */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <div className="font-bold">Region <span className="text-red-500">{attemptedSubmit && !formData.region ? "*" : ""}</span></div>
              {[
                "Region I - Ilocos Region",
                "Region II - Cagayan Valley",
                "Region III - Central Luzon",
                "Region IV-A - CALABARZON",
                "Region IV-B - MIMAROPA",
                "Region V - Bicol Region",
                "Region VI - Western Visayas",
                "Region VII - Central Visayas",
                "Region VIII - Eastern Visayas",
                "Region IX - Zamboanga Peninsula",
                "Region X - Northern Mindanao",
                "Region XI - Davao Region",
                "Region XII - SOCCSKSARGEN",
                "Region XIII - Caraga",
                "BARMM - Bangsamoro Autonomous Region in Muslim Mindanao",
                "NCR - National Capital Region",
              ].map((region) => (
                <div key={region} className="flex items-center">
                  <input type="radio" name="region" value={region} checked={formData.region === region} onChange={handleChange} />
                  <label className="ml-2">{region}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2 */}
        {currentSection === 2 && (
          <div>
            {/* Campus */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <div className="font-bold">Campus <span className="text-red-500">{attemptedSubmit && !formData.campus ? "*" : ""}</span></div>
              {["Cagayan de Oro", "Claveria", "Iligan", "Malaybalay", "Oroquieta", "Pilar", "Villanueva"].map((campus) => (
                <div key={campus} className="flex items-center">
                  <input type="radio" name="campus" value={campus} checked={formData.campus === campus} onChange={handleChange} />
                  <label className="ml-2">{campus}</label>
                </div>
              ))}
            </div>
            {/* Transacted Office */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <label className="font-bold">Transacted Office <span className="text-red-500">{attemptedSubmit && !formData.transactedOffice ? "*" : ""}</span></label>
              <input type="text" name="transactedOffice" className="border rounded-md p-2 w-full" value={formData.transactedOffice} onChange={handleChange} />
            </div>
          </div>
        )}

        {/* Section 3 */}
        {currentSection === 3 && (
          <div>
            {/* Service Availed */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <label className="font-bold">Service Availed <span className="text-red-500">{attemptedSubmit && !formData.serviceAvailed ? "*" : ""}</span></label>
              <input type="text" name="serviceAvailed" className="border rounded-md p-2 w-full" value={formData.serviceAvailed} onChange={handleChange} />
            </div>
            {/* CC Awareness */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <div className="font-bold">Are you aware of the Client Charter? <span className="text-red-500">{attemptedSubmit && !formData.ccAwareness ? "*" : ""}</span></div>
              {["Yes", "No"].map((ccAwareness) => (
                <div key={ccAwareness} className="flex items-center">
                  <input type="radio" name="ccAwareness" value={ccAwareness} checked={formData.ccAwareness === ccAwareness} onChange={handleChange} />
                  <label className="ml-2">{ccAwareness}</label>
                </div>
              ))}
            </div>
            {/* CC Visibility */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <div className="font-bold">Is the Client Charter visible in the office? <span className="text-red-500">{attemptedSubmit && !formData.ccVisibility ? "*" : ""}</span></div>
              {["Yes", "No"].map((ccVisibility) => (
                <div key={ccVisibility} className="flex items-center">
                  <input type="radio" name="ccVisibility" value={ccVisibility} checked={formData.ccVisibility === ccVisibility} onChange={handleChange} />
                  <label className="ml-2">{ccVisibility}</label>
                </div>
              ))}
            </div>
            {/* CC Help */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <div className="font-bold">Was the Client Charter helpful? <span className="text-red-500">{attemptedSubmit && !formData.ccHelp ? "*" : ""}</span></div>
              {["Yes", "No"].map((ccHelp) => (
                <div key={ccHelp} className="flex items-center">
                  <input type="radio" name="ccHelp" value={ccHelp} checked={formData.ccHelp === ccHelp} onChange={handleChange} />
                  <label className="ml-2">{ccHelp}</label>
                </div>
              ))}
            </div>
            {/* Satisfaction Questions */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <p className="font-bold">Please rate the following:</p>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={`SQD${i}`} className="flex items-center">
                  <label className="mr-2">SQD{i}: <span className="text-red-500">{attemptedSubmit && !formData[`SQD${i}`] ? "*" : ""}</span></label>
                  <input type="number" name={`SQD${i}`} min="1" max="5" value={formData[`SQD${i}`]} onChange={handleChange} />
                </div>
              ))}
            </div>
            {/* Comments */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <label className="font-bold">Comments</label>
              <textarea name="comments" className="border rounded-md p-2 w-full" value={formData.comments} onChange={handleChange} />
            </div>
          </div>
        )}
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {currentSection > 1 && <button type="button" onClick={handleBack} className="bg-gray-300 text-black py-2 px-4 rounded">Back</button>}
          {currentSection < 3 && <button type="button" onClick={handleNext} className="bg-blue-500 text-white py-2 px-4 rounded">Next</button>}
          {currentSection === 3 && <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default App;
