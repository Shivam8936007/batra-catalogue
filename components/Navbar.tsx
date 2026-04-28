"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, ShoppingBag } from "lucide-react";

const categories = [
  "Kitchen Utensils",
  "Equipments & Machinery",
  "Buffetware",
  "Bakeware",
  "Barware",
  "Chafing Dish",
  "Tableware",
  "Crockery and Glassware",
  "Signages",
  "Chef Uniform",
  "Hotel Amenities",
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false); // mobile drawer
  const [showMore, setShowMore] = useState(false); // dropdown

  const moreRef = useRef<HTMLDivElement | null>(null);

  const visibleCategories = categories.slice(0, 6);
  const moreCategories = categories.slice(6);

  const showBack =
    pathname !== "/" && pathname !== "/category";

  // 🔒 lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // ❌ close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 slug generator
  const getSlug = (cat: string) =>
    cat.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  return (
    <>
      {/* NAVBAR */}
      <div className="bg-white shadow px-4 py-3 sticky top-0 z-50 w-full">
        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* 🍔 MOBILE MENU */}
            <button
              className="md:hidden p-1 -ml-1 outline-none text-gray-700 rounded-md active:bg-gray-100"
              onClick={() => setOpen(true)}
            >
              <Menu className="w-6 h-6 text-[#2D3748]" />
            </button>

            {/* BACK BUTTON */}
            {showBack && (
              <button onClick={() => router.back()} className="text-xl px-1">
                ←
              </button>
            )}

            <Link href="/category" className="font-bold text-lg">
              Batra Utensils Store
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-6 text-sm items-center relative">

            {/* FIRST 6 */}
            {visibleCategories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${getSlug(cat)}`}
                className="hover:text-blue-600 whitespace-nowrap"
              >
                {cat}
              </Link>
            ))}

            {/* MORE DROPDOWN */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setShowMore(!showMore)}
                className="hover:text-blue-600"
              >
                More ▾
              </button>

              {showMore && (
                <div className="absolute top-8 left-0 w-60 bg-white shadow-lg border rounded-md z-50 max-h-80 overflow-y-auto">
                  {moreCategories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/category/${getSlug(cat)}`}
                      onClick={() => setShowMore(false)}
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex gap-4 items-center">
            <button onClick={() => router.push("/search")}>
              <Search className="w-5 h-5 text-[#2D3748]" />
            </button>
            <div className="relative cursor-pointer block">
               <ShoppingBag className="w-6 h-6 text-[#2D3748]" />
               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">1</span>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE DRAWER */}
      <div
        className={`fixed top-0 left-0 z-[1000] h-[100dvh] w-screen ${
          open ? "block" : "hidden"
        }`}
      >
        {/* OVERLAY */}
        <div
          className="absolute inset-0 bg-black/40 h-[100dvh] w-screen"
          onClick={() => setOpen(false)}
        />

        {/* DRAWER */}
        <div
          style={{ willChange: "transform" }}
          className={`absolute top-0 left-0 h-[100dvh] w-[80%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center p-4 border-b shrink-0">
            <h2 className="font-semibold text-lg">My Account</h2>
            <button onClick={() => setOpen(false)} className="p-2 -mr-2 text-gray-500">✕</button>
          </div>

          {/* CATEGORY LIST */}
          <div className="flex-1 overflow-y-auto pb-6">
            <div className="flex flex-col py-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${getSlug(cat)}`}
                  onClick={() => setOpen(false)}
                  className="px-5 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}