"use client";

import { motion } from "framer-motion";

export default function CardMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 12px 30px rgba(0,0,0,0.15)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}