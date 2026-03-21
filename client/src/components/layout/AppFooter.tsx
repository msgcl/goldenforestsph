import { Link } from "wouter";

export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-accent/20 bg-card/80 backdrop-blur-sm dark:bg-card/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-7 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <div>
          <p className="font-semibold text-[#17392E] dark:text-foreground">CADI Operations</p>
          <p className="text-xs text-[#1B1B1B]/62 dark:text-muted-foreground">
            Crassna Agroforestry Development Inc. | Golden Forests Group
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#1B1B1B]/62 dark:text-muted-foreground">
          <Link href="/about" className="hover:text-[#17392E] hover:underline dark:hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#17392E] hover:underline dark:hover:text-foreground">
            Contact
          </Link>
          <Link href="/photo-gallery" className="hover:text-[#17392E] hover:underline dark:hover:text-foreground">
            Gallery
          </Link>
          <span className="text-[#1B1B1B]/52 dark:text-muted-foreground/80">© {year} CADI</span>
        </div>
      </div>
    </footer>
  );
}
