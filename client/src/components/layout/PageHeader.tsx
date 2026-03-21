import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="mb-10 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="brand-hero p-6 sm:p-8 md:p-10"
      >
        {badge && (
          <span className="brand-pill mb-5">
            {badge}
          </span>
        )}
        <h1 className="brand-hero-title mb-4 max-w-4xl font-outfit text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="brand-hero-copy max-w-3xl text-base leading-relaxed sm:text-lg md:text-xl">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
