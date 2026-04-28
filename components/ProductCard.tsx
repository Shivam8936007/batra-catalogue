
import { useRouter } from "next/navigation";
type Props = {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  discount: string;
  image: string;
};

export default function ProductCard({
  id,
  name,
  price,
  oldPrice,
  discount,
  image,
}: Props) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/product/${id}`)}
      className="bg-white  pb-5 rounded-md shadow overflow-hidden cursor-pointer hover:shadow-lg transition">

      {/* IMAGE */}
      <div className="relative">
        <img
          src={image}
          className="w-full h-40 object-cover"
        />

        {/* Discount Badge */}
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          {discount}
        </span>

        {/* Photos Badge */}
        <span className="absolute bottom-2 right-2 bg-white text-xs px-2 py-1 rounded shadow">
          2 photos
        </span>
      </div>

      {/* DETAILS */}
      <div className="p-2">
        <p className="text-sm">{name}</p>

        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold">₹{price}</span>
          <span className="line-through text-gray-400 text-sm">
            ₹{oldPrice}
          </span>
        </div>
      </div>

      {/* BUTTON */}
      <button className="w-full bg-[#506FD4] hover:bg-[#3F5BB5] text-white py-2 text-sm">
        ADD TO CART
      </button>
    </div>
  );
}