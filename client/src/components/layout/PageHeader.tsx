import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="mb-10 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {badge && (
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4 border border-primary/20">
            {badge}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-outfit tracking-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
