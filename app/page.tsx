"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleStart = () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number to continue.");
      return;
    }
    

    localStorage.setItem("phone", phone);

    router.push("/category");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] font-sans font-medium text-gray-900 relative overflow-hidden">
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-[#E6F3F1] rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[40%] bg-gray-200 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>

      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white p-10 w-full max-w-[440px] text-center relative z-10 mx-5">
        <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-gray-900 to-gray-600 rounded-2xl shadow-xl flex items-center justify-center text-white mb-8 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-forum text-[#1A202C] tracking-wide mb-3">
          Batra Utensils
        </h1>

        <p className="text-gray-500 text-sm md:text-[15px] font-normal leading-relaxed mb-10 max-w-[280px] mx-auto">
          Enter your phone number to access our exclusive premium collections.
        </p>

        <div className="space-y-6">
          <div className="relative flex items-center w-full">
            <div className="absolute left-4 flex items-center gap-2 border-r border-gray-200 pr-3">
              <span className="text-lg">🇮🇳</span>
              <span className="text-gray-600 font-semibold text-[15px]">
                +91
              </span>
            </div>
            <input
              type="tel"
              placeholder="Your number..."
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-24 pr-4 shadow-sm outline-none text-[15px] tracking-wide placeholder-gray-400 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all font-semibold"
              maxLength={10}
            />
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-[#1A202C] hover:bg-black text-white py-4 rounded-2xl text-[15px] tracking-widest font-bold uppercase hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
          >
            Enter Store
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-400 uppercase tracking-widest font-semibold font-forum">
          Premium Quality Guaranteed
        </p>
      </div>
    </div>
  );
}
