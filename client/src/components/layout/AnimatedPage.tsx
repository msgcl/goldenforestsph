import { motion } from "framer-motion";
import { ReactNode } from "react";

export function AnimatedPage({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 ${className}`}
    >
      {children}
    </motion.div>
  );
}
