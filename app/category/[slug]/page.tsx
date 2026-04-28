"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { categories } from "@/lib/products";
import { getProductNameFromImage } from "@/lib/utils";

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const slug = decodeURIComponent(params.slug as string);

  const [filters, setFilters] = useState({
    inStock: false,
    onSale: false,
  });

  const category = categories.find((c) => c.slug === slug);
  const images = category?.images || [];

  const activeFiltersCount = (filters.inStock ? 1 : 0) + (filters.onSale ? 1 : 0);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 font-sans text-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-forum capitalize text-[#1A202C] tracking-wide">
              {slug.replace(/-/g, " ")} Collection
            </h1>
            <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest font-medium">
              {images.length} Premium Items
            </p>
          </div>
          
          <button className="bg-transparent border border-[#1A202C] hover:bg-[#1A202C] hover:text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 w-fit">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
             Download Catalog
          </button>
        </div>

        <hr className="border-gray-200 mb-6" />

        {/* Filters */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-shrink-0">
            <button className="bg-white border border-gray-200 text-gray-800 px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow-md transition-shadow">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
               Filters
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 items-center pt-2">
            <button className="bg-[#1A202C] text-white px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 shadow-sm border border-transparent hover:scale-105 transition-transform">
              View All
            </button>

            <button
              onClick={() => setFilters({ ...filters, onSale: !filters.onSale })}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-transform hover:scale-105 ${filters.onSale
                  ? "bg-[#1A202C] text-white border-transparent shadow-sm"
                  : "bg-white border-gray-200 text-gray-800 shadow-sm border"
                }`}
            >
              Exclusive Offers
            </button>

            <button
              onClick={() => setFilters({ ...filters, inStock: !filters.inStock })}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-transform hover:scale-105 ${filters.inStock
                  ? "bg-[#1A202C] text-white border-transparent shadow-sm"
                  : "bg-white border-gray-200 text-gray-800 shadow-sm border"
                }`}
            >
              Ready to Ship
            </button>
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <div className="bg-[#E6F3F1] border border-[#128C7E]/20 text-[#128C7E] px-6 py-3 rounded-full flex justify-between items-center text-sm font-semibold mb-8 max-w-sm">
            <span>{activeFiltersCount} filters active</span>
            <button
              onClick={() => setFilters({ inStock: false, onSale: false })}
              className="underline underline-offset-2 hover:text-[#075E54]"
            >
              Clear all
            </button>
          </div>
        )}

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 bg-transparent">
          {images.map((img, index) => {
            const fileName = getProductNameFromImage(img, category?.name || "");
            
            return (
              <div 
                key={index}
                onClick={() => router.push(`/product/${slug}-${index}`)} 
                className="bg-white rounded-[1.25rem] border border-gray-100 overflow-hidden cursor-pointer flex flex-col group hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300 transform hover:-translate-y-1 h-full"
              >
                <div className="relative p-3 pb-0">
                  <div className="rounded-xl overflow-hidden bg-[#FAF9F6] aspect-[4/5] relative">
                    <img src={img} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider px-2.5 py-1.5 rounded uppercase">Featured</div>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-grow items-center text-center">
                   <p className="text-[15px] text-gray-900 font-medium line-clamp-2 leading-relaxed mb-4 font-forum tracking-wide">{fileName}</p>
                   
                   <button 
                     onClick={(e) => { 
                       e.stopPropagation(); 
                       window.open(`https://wa.me/919711261091?text=Hi!%20I%20am%20interested%20in%20${encodeURIComponent(fileName)}`, '_blank'); 
                     }}
                     className="w-full mt-auto bg-transparent border border-[#128C7E] hover:bg-[#128C7E] hover:text-white flex items-center justify-center gap-2 text-[#128C7E] text-[12px] uppercase tracking-widest font-bold py-3 rounded-xl transition-all"
                   >
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                     </svg>
                     GET QUOTES
                   </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}