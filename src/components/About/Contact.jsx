import React, { useState } from "react";
import { motion } from "framer-motion";


const EMAIL_ACCES_KEY = import.meta.env.VITE_EMAIL_ACCESS_KEY;


const Loading = () => (

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center h-64 w-full font-['Rajdhani']"
  >
    <svg
      className="animate-spin h-12 w-12 text-green-500 dark:text-green-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    <p className="mt-4 font-semibold text-lg select-none text-[#2ECC71]">
      ..
    </p>
  </motion.div>
);

const ContactForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: EMAIL_ACCES_KEY,
        ...formData,
      }),
    });

    const result = await response.json();
    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      console.log("Form submitted successfully", result);
    } else {
      console.error("Submission failed", result);
    }
  };

  if (isSubmitting) return <Loading />;

  if (isSubmitted) {
    return (
    <div className="text-center font-['Rajdhani'] text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60] font-semibold text-xl min-h-screen flex items-center justify-center bg-[#121212]">
  Thank you! For Contact us we will get back to you soon.
</div>

    );
  }

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
          <div className="relative w-full h-16 flex items-center bg-black border border-[#2ECC71] rounded-lg overflow-hidden">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full h-full text-white px-4 pt-5 bg-transparent focus:outline-none placeholder-transparent"
            />
            <label
              className={`absolute left-4 text-sm text-[#2ECC71] transition-all 
                duration-200 pointer-events-none 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#2ECC71] ${
                  formData.name ? "top-1 text-sm" : ""
                }`}
            >
              Your Name
            </label>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 h-full bg-[#2ECC71] text-black font-bold px-6 text-2xl rounded-r-lg hover:scale-105 transition-transform"
            >
              &gt;
            </button>
          </div>
        )}

        {/* Step 2: Email */}
        {step === 2 && (
          <div className="relative w-full h-16 flex items-center bg-black border border-[#2ECC71] rounded-lg overflow-hidden">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full h-full text-white px-4 pt-5 bg-transparent focus:outline-none placeholder-transparent"
            />
            <label
              className={`absolute left-4 text-sm text-[#2ECC71] transition-all 
                duration-200 pointer-events-none 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#2ECC71] ${
                  formData.email ? "top-1 text-sm" : ""
                }`}
            >
              Email Address
            </label>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 h-full bg-[#2ECC71] text-black font-bold px-6 text-2xl rounded-r-lg hover:scale-105 transition-transform"
            >
              &gt;
            </button>
          </div>
        )}

        {/* Step 3: Message */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="relative h-40 bg-black border border-[#2ECC71] rounded-lg overflow-hidden">
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full h-full text-white p-4 pt-6 bg-transparent resize-none focus:outline-none placeholder-transparent"
              ></textarea>
              <label
                className={`absolute left-4 text-sm text-[#2ECC71] transition-all 
                  duration-200 pointer-events-none 
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                  peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#2ECC71] ${
                    formData.message ? "top-1 text-sm" : ""
                  }`}
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
