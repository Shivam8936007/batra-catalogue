"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/lib/products";
import { getProductNameFromImage } from "@/lib/utils";

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // 🔥 Flatten all category images into searchable products
  const allProducts = categories.flatMap((cat) =>
    cat.images.map((img, index) => {
      const name = getProductNameFromImage(img, cat.name);
      return {
        name,
        category: cat.name,
        slug: cat.slug,
        index,
        image: img,
      };
    })
  );

  // 🔥 Filter based on search (matches name or category)
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4">

      {/* 🔍 SEARCH BAR */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow">
        <button onClick={() => router.back()} className="text-xl">
          ←
        </button>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products"
          className="flex-1 outline-none"
        />
      </div>

      {/* 🔥 STATES */}
      {query === "" ? (
        <div className="text-center mt-20 text-gray-500">
          🔍 Search products...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          ❌ No results found
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {filteredProducts.map((p, i) => (
            <div
              key={i}
              className="cursor-pointer bg-white rounded-xl shadow hover:scale-105 transition"
              onClick={() =>
                router.push(`/product/${p.slug}-${p.index}`)
              }
            >
              <img
                src={p.image}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-2 text-sm text-center">
                <div className="font-medium truncate">{p.name}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{p.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}