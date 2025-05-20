import React, { useState } from "react";

const ContactForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can replace this with your API logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <form
        onSubmit={handleFinalSubmit}
        className="bg-[#1a1a1a] w-full max-w-md p-8 rounded-xl shadow-2xl space-y-8"
      >
        <h2 className="text-center text-[#2ECC71] text-3xl font-bold mb-2">
          Contact Us To 
        </h2>

        {/* Step 1: Name */}
        {step === 1 && (
          <div className="relative flex items-center group">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full bg-black text-white p-4 rounded-l-lg border border-[#2ECC71] focus:outline-none focus:ring-2 focus:ring-[#2ECC71] placeholder-transparent"
            />
            <label
              className="absolute left-4 top-1 text-sm text-[#2ECC71] peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
            >
              Your Name
            </label>
            <button
              type="button"
              onClick={handleNext}
              className="bg-[#2ECC71] text-black font-bold px-6 py-4 rounded-r-lg text-2xl hover:scale-105 transition-transform"
            >
              &gt;
            </button>
          </div>
        )}

        {/* Step 2: Email */}
        {step === 2 && (
          <div className="relative flex items-center group">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full bg-black text-white p-4 rounded-l-lg border border-[#2ECC71] focus:outline-none focus:ring-2 focus:ring-[#2ECC71] placeholder-transparent"
            />
            <label
              className="absolute left-4 top-1 text-sm text-[#2ECC71] peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
            >
              Email Address
            </label>
            <button
              type="button"
              onClick={handleNext}
              className="bg-[#2ECC71] text-black font-bold px-6 py-4 rounded-r-lg text-2xl hover:scale-105 transition-transform"
            >
              &gt;
            </button>
          </div>
        )}

        {/* Step 3: Message */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="relative">
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full bg-black text-white p-4 rounded-lg border border-[#2ECC71] h-40 resize-none placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
              ></textarea>
              <label
                className="absolute left-4 top-1 text-sm text-[#2ECC71] peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
              >
                Your Message
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#2ECC71] text-black font-semibold py-4 rounded-lg text-lg hover:scale-105 transition-transform shadow-md"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
