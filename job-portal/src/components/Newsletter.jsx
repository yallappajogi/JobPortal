import React, { useState } from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    // Here you can implement functionality to store email or send to backend
    alert(`Subscribed successfully with email: ${email}`);
    setEmail("");
  };

  const handleResumeUpload = () => {
    alert("Resume upload feature coming soon!");
  };

  return (
    <div>
      {/* Email Subscription Section */}
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email me for jobs
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Subscribe to get the latest job alerts directly to your inbox!
        </p>

        <form onSubmit={handleSubscribe} className="w-full space-y-4">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="name@mail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
          />
          <input
            type="submit"
            value="Subscribe"
            className="w-full block py-2 pl-3 border bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </form>
      </div>

      {/* Resume Upload Section */}
      <div className="mt-24">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get noticed faster
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Upload your resume to increase your chances of getting hired!
        </p>

        <button
          onClick={handleResumeUpload}
          className="w-full block py-2 pl-3 border bg-blue rounded-sm text-white cursor-pointer font-semibold"
        >
          Upload Your Resume
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
