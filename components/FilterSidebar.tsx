type Props = {
  filters: {
    inStock: boolean;
    onSale: boolean;
  };
  setFilters: any;
};

export default function FilterSidebar({ filters, setFilters }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-6">
      
      {/* Sub categories */}
      <div>
        <h3 className="font-semibold mb-2">Sub categories</h3>

        <label className="block text-sm">
          <input type="checkbox" className="mr-2" />
          All
        </label>

        <label className="block text-sm">
          <input
            type="checkbox"
            checked={filters.onSale}
            onChange={() =>
              setFilters((prev: any) => ({
                ...prev,
                onSale: !prev.onSale,
              }))
            }
            className="mr-2"
          />
          On sale
        </label>

        <label className="block text-sm">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={() =>
              setFilters((prev: any) => ({
                ...prev,
                inStock: !prev.inStock,
              }))
            }
            className="mr-2"
          />
          In stock
        </label>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold mb-2">Price</h3>

        <div className="flex gap-2">
          <input placeholder="₹ Min" className="border p-1 rounded w-full" />
          <input placeholder="₹ Max" className="border p-1 rounded w-full" />
        </div>
      </div>
    </div>
  );
}