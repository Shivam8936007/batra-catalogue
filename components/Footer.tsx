export default function Footer() {
  return (
    <div className="border-t border-gray-300 mt-3 px-7 py-5">
      <div className="max-w-5xl pb-25">

        {/* Heading */}
        <h2 className="text-blue-600 font-semibold text-sm uppercase tracking-wide ">
          CONTACT US
        </h2>

        {/* Content */}
        <div className="mt-2 space-y-2 text-gray-900">

          {/* Phone */}
          <div>
            <p className="font-semibold text-sm ">Phone</p>
            <a
              href="tel:+919711261091"
              className="text-gray-700 text-sm border-b border-gray-900 pb-[2px] inline-block"
            >
              +91 97112 61091
            </a>
          </div>

          {/* Email */}
          <div>
            <p className="font-semibold text-sm mb-1">Email</p>
            <a
              href="mailto:batrautensilsstore@gmail.com"
              className="text-gray-700 text-sm border-b border-gray-900 pb-[2px] inline-block"
            >
              batrautensilsstore@gmail.com
            </a>
          </div>

        </div>
      </div>

      {/* WhatsApp Chat Button */}
      {/* <a 
        href="https://wa.me/919711261091"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer z-40"
      >
        <span className="text-green-500 text-xs">●</span>
        <span className="font-medium text-xs">CHAT</span>
      </a> */}
    </div>
  );
}