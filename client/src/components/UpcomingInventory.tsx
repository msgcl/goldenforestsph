import { AGARWOOD_2027_INVENTORY } from "@/lib/publicInventory";

export function UpcomingInventory() {
  return (
    <section aria-label="2027 agarwood inventory" className="rounded-[1.45rem] border border-[#E3C38F] bg-[#FAEDD5] p-5 shadow-sm sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C5A16]">2027 Planting Stock</p>
      <p className="mt-3 font-outfit text-4xl font-semibold leading-none text-[#7C5124] sm:text-5xl">{AGARWOOD_2027_INVENTORY.toLocaleString()}</p>
      <p className="mt-3 text-sm text-[#8B6B3F]">Agarwood seedlings for outplanting in Q3 2027</p>
    </section>
  );
}
