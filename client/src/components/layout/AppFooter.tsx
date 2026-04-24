import { Link } from "wouter";

export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-accent/20 bg-card/80 backdrop-blur-sm dark:bg-card/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-7 text-sm sm:px-6 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
          <p className="font-semibold text-[#17392E] dark:text-foreground">CADI Operations</p>
          <p className="text-xs text-[#1B1B1B]/62 dark:text-muted-foreground">
            Crassna Agroforestry Development Inc. | Golden Forests Group
          </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#1B1B1B]/62 dark:text-muted-foreground">
            <Link href="/about" className="hover:text-[#17392E] hover:underline dark:hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#17392E] hover:underline dark:hover:text-foreground">
              Contact
            </Link>
            <Link href="/photo-gallery" className="hover:text-[#17392E] hover:underline dark:hover:text-foreground">
              Gallery
            </Link>
            <Link href="/disclaimer" className="hover:text-[#17392E] hover:underline dark:hover:text-foreground">
              Disclaimer
            </Link>
            <span className="text-[#1B1B1B]/52 dark:text-muted-foreground/80">© {year} CADI</span>
          </div>
        </div>

        <p className="max-w-5xl text-xs leading-6 text-[#1B1B1B]/68 dark:text-muted-foreground">
          This website is published by Crassna Agroforestry Development Inc. (CADI), the Philippine operational platform of Golden Forests Group. Return profiles shown are projections only and are not guaranteed. This website does not constitute a financial promotion, investment advice or a solicitation to invest. See our full{" "}
          <Link href="/disclaimer" className="font-medium text-[#17392E] underline underline-offset-4 hover:text-[#0E241D] dark:text-foreground dark:hover:text-foreground/85">
            Risk Warning and Disclaimer
          </Link>{" "}
          for details.
        </p>
      </div>
    </footer>
  );
}
