import { motion } from "framer-motion";
import { ReactNode } from "react";

export function AnimatedPage({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-full min-w-0 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-10 md:py-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}
