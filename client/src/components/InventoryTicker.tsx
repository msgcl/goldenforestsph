type InventoryTickerItem = {
  label: string;
  value: string;
  note: string;
};

interface InventoryTickerProps {
  eyebrow: string;
  title: string;
  items: readonly InventoryTickerItem[];
  tone?: "light" | "dark";
}

export function InventoryTicker({
  eyebrow,
  title,
  items,
  tone = "light",
}: InventoryTickerProps) {
  const dark = tone === "dark";

  return (
    <div
      className={
        dark
          ? "overflow-hidden rounded-[1.75rem] border border-[#C8A070]/25 bg-[#17392E] text-[#FBFCF7] shadow-xl shadow-black/10"
          : "overflow-hidden rounded-[1.75rem] border border-accent/20 bg-card shadow-sm"
      }
    >
      <div className={dark ? "border-b border-white/10 px-5 py-4 sm:px-6" : "border-b border-accent/20 px-5 py-4 sm:px-6"}>
        <p className={dark ? "text-xs font-semibold uppercase tracking-[0.18em] text-[#C8A070]" : "text-xs font-semibold uppercase tracking-[0.18em] text-accent"}>
          {eyebrow}
        </p>
        <h3 className={dark ? "mt-1 text-xl font-semibold text-[#FBFCF7]" : "mt-1 text-xl font-semibold text-[#17392E]"}>
          {title}
        </h3>
      </div>

      <div className="grid gap-4 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={
              dark
                ? "rounded-2xl border border-white/10 bg-white/8 px-4 py-4 backdrop-blur-sm"
                : "rounded-2xl border border-accent/15 bg-background/75 px-4 py-4"
            }
          >
            <p className={dark ? "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C8A070]" : "text-[11px] font-semibold uppercase tracking-[0.16em] text-primary"}>
              {item.note}
            </p>
            <p className={dark ? "mt-2 text-3xl font-semibold text-[#FBFCF7]" : "mt-2 text-3xl font-semibold text-[#17392E]"}>
              {item.value}
            </p>
            <p className={dark ? "mt-1 text-sm text-[#F3E9D6]" : "mt-1 text-sm text-muted-foreground"}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
