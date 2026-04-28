"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { categories } from "@/lib/products";
import { Search, ChevronRight } from "lucide-react";

export default function CategoryPage() {
  const router = useRouter();

  const [showNav, setShowNav] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!searchRef.current) return;
      const top = searchRef.current.getBoundingClientRect().top;
      setShowNav(top <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#FAF9F6] min-h-screen overflow-x-hidden font-sans text-gray-900">

      {/* 🔥 SCROLL NAVBAR */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 shadow-md ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Navbar />
      </div>

      {/* Hero Header */}
      <div className="pt-20 pb-16 px-4 flex flex-col items-center justify-center bg-white border-b border-gray-100">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-tr from-gray-900 to-gray-600 rounded-2xl shadow-lg flex items-center justify-center text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-forum text-[#1A202C] tracking-wide mb-3 text-center">
          Batra Utensils Store
        </h1>
        <p className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">
          {categories.length} Premium Collections
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-10 px-5 lg:px-8 mt-10">

        {/* SEARCH */}
        <div
          ref={searchRef}
          className="max-w-2xl mx-auto px-6 py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center border border-gray-100 bg-white hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-shadow cursor-text"
          onClick={() => router.push("/search")}
        >
          <Search className="w-6 h-6 text-gray-400 mr-4" />
          <input
            placeholder="Search our exclusive collections..."
            className="w-full bg-transparent outline-none text-gray-700 font-medium tracking-wide placeholder-gray-400 cursor-pointer pointer-events-none"
            readOnly
          />
        </div>

        {/* COLLECTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-20 pt-6">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => router.push(`/category/${cat.slug}`)}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer group relative"
            >
              <div className="h-64 sm:h-72 w-full bg-[#FAF9F6] p-4 flex items-center justify-center">
                <img
                  src={cat.image}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-0 w-full p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-white text-2xl font-forum tracking-wide mb-1 drop-shadow-md">
                    {cat.name}
                  </h3>
                  <p className="text-gray-300 text-xs tracking-widest uppercase font-medium">
                    {cat.images?.length || 0} Items
                  </p>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black text-white transition-all duration-300 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}