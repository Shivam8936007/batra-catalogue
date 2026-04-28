"use client";

import { useParams, useRouter } from "next/navigation";
import { categories } from "@/lib/products";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  // format: kitchen-utensils-0
  const [slug, indexStr] = id.split("-");
  const index = parseInt(indexStr);

  const category = categories.find((c) => c.slug === slug);

  if (!category) return <div>Product not found</div>;

  const images = category.images;
  const productImage = images[index];

  const [selectedImage, setSelectedImage] = useState(
    productImage || images[0]
  );

  let rawName = productImage ? productImage.split('/').pop()?.replace(/\.[^/.]+$/, "") || `${category.name} Product` : `${category.name} Product`;
  if (/^\d+/.test(rawName) || rawName.length <= 2) {
    rawName = `Premium ${category.name}`;
  }
  const fileName = rawName.replace(/[-_]/g, ' ');
  
  // 🔥 Fake product data
  const product = {
    name: fileName,
    description: `Experience the exceptional quality of our ${fileName}. Crafted for durability and style, this product is perfect for any setting. Whether you are a professional or just looking for the best, the ${fileName} will exceed your expectations with its premium finish and reliable performance. Designed to elevate your everyday use, it combines functionality with a sleek profile.`,
    id: index,
  };

  const sizes = ["Standard", "Medium", "Large"];
  const colors = ["#1F2937", "#9CA3AF", "#FCA5A5", "#6EE7B7", "#93C5FD"];

  // 🔥 More products = from other categories
  const moreProducts = categories
    .filter((c) => c.slug !== slug)
    .flatMap((c) =>
      c.images.map((img, i) => ({
        slug: c.slug,
        index: i,
        image: img,
      }))
    );

  const handlePrev = () => {
    const currentIndex = images.indexOf(selectedImage);
    const prev = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setSelectedImage(images[prev]);
  };

  const handleNext = () => {
    const currentIndex = images.indexOf(selectedImage);
    const next = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(images[next]);
  };

  return (
    <div className="w-full min-h-screen font-sans text-gray-900">
      {/* <Navbar /> */}

      {/* Full-bleed two-column split */}
      <div className="w-full flex flex-col lg:flex-row min-h-screen">

        {/* Left Column: Image Gallery — white background */}
        <div className="w-full lg:w-1/2 bg-[#FAF9F6] flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 pt-20 lg:pt-28 pb-10">
          {/* Main Image Wrapper */}
          <div className="relative w-full max-w-[520px] aspect-square md:aspect-[4/5] lg:aspect-square bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center justify-center group">
            {/* <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur text-gray-800 p-2 rounded-full shadow-md hover:bg-white hover:scale-110 transition z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button> */}

            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />

            {/* <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur text-gray-800 p-2 rounded-full shadow-md hover:bg-white hover:scale-110 transition z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button> */}
          </div>

          {/* Thumbnails */}
          {/* <div className="flex gap-3 mt-6 overflow-x-auto scrollbar-hide pb-2 w-full max-w-[520px] justify-center">
            {images.slice(0, 5).map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                  selectedImage === img
                    ? "border-[#2D3748] shadow-md scale-105"
                    : "border-transparent shadow-sm opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} className="w-full h-full object-cover bg-white" />
              </button>
            ))}
          </div> */}
        </div>

        {/* Right Column: Product Details — gray/lavender background, full-bleed */}
        <div className="w-full lg:w-1/2 bg-[#E8E6F0] flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-10 lg:pt-28 pb-10">
          
          <p className="text-[#a0aab8] text-xs font-bold tracking-[0.15em] uppercase mb-3">
            SKU: {slug}-{index}
          </p>
          
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-forum text-[#1A202C] leading-[1.1] mb-6">
            {product.name}
          </h1>
          
          <p className="text-[16px] text-[#4A5568] leading-relaxed font-light max-w-lg">
            {product.description}
          </p>

          <hr className="border-[#ccc8d8] mb-8 max-w-lg" />

          <div className="max-w-lg">
            <button 
              onClick={() => {
                const encodedImage = encodeURI(selectedImage);
                const message = `Hi! I am interested in ${product.name}.\n\nProduct Image: ${window.location.origin}${encodedImage}`;
                window.open(`https://api.whatsapp.com/send?phone=919711261091&text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="w-full bg-[#128C7E] hover:bg-[#075E54] flex items-center justify-center gap-3 text-white py-4 rounded-xl font-semibold tracking-widest text-sm shadow-[0_8px_20px_rgba(18,140,126,0.3)] hover:shadow-[0_8px_25px_rgba(18,140,126,0.4)] transition-all uppercase"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="white"></path>
              </svg>
              GET QUOTES
            </button>
          </div>
        </div>
      </div>

      {/* Global FloatingWhatsApp is now handled by the layouts */}
      
      <div className="bg-white py-16 mt-8 border-t border-gray-100 w-full px-6 sm:px-10 lg:px-16">
        <div className="w-full">
          {categories.map((cat) => (
            <div key={cat.slug} className="mb-14">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-forum text-[#1A202C] tracking-wide mb-1">
                    {cat.name} Collection
                  </h2>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{cat.images.length} Designer Pieces</p>
                </div>
              </div>
              
              <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide shrink-0 snap-x">
                {cat.images.map((img, i) => {
                  let rawFName = img.split('/').pop()?.replace(/\.[^/.]+$/, "") || "";
                  if (/^\d+/.test(rawFName) || rawFName.length <= 2) {
                    rawFName = `Premium ${cat.name}`;
                  }
                  const fName = rawFName.replace(/[-_]/g, ' ');

                  return (
                    <div 
                      key={i} 
                      className="min-w-[200px] w-[200px] snap-start bg-[#FAF9F6] rounded-2xl border border-gray-100 overflow-hidden cursor-pointer flex flex-col group hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
                      onClick={() => router.push(`/product/${cat.slug}-${i}`)}
                    >
                       <div className="relative p-3 pb-0">
                         <div className="rounded-xl overflow-hidden bg-white aspect-[4/5]">
                           <img src={img} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                         </div>
                       </div>
                       
                       <div className="p-4 flex flex-col flex-grow w-full items-center text-center">
                          <p className="text-[14px] text-gray-900 font-medium line-clamp-2 leading-relaxed mb-4 font-forum tracking-wide">{fName}</p>
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              const encodedImg = encodeURI(img);
                              const message = `Hi! I am interested in ${fName}.\n\nProduct Image: ${window.location.origin}${encodedImg}`;
                              window.open(`https://api.whatsapp.com/send?phone=919711261091&text=${encodeURIComponent(message)}`, '_blank'); 
                            }}
                            className="w-full mt-auto bg-transparent border border-[#128C7E] hover:bg-[#128C7E] hover:text-white flex items-center justify-center gap-2 text-[#128C7E] text-[11px] uppercase tracking-widest font-bold py-2.5 rounded-lg transition-all"
                          >
                            GET QUOTES
                          </button>
                       </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}