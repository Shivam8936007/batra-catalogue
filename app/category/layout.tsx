import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">

        <main className="flex-1">{children}</main>

        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}