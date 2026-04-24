import { AnimatedPage } from "@/components/layout/AnimatedPage";

const disclaimerSections = [
  {
    title: "Important Notice",
    body:
      "This website is published by Crassna Agroforestry Development Inc. (CADI), a corporation registered in the Philippines and the operational plantation management platform of Golden Forests Group. It is provided for informational and operational transparency purposes only. Nothing on this website constitutes a financial promotion, investment advice, a solicitation to invest or an offer to purchase any investment product or asset.",
  },
  {
    title: "Projected Returns",
    body:
      "Any commercial, operational, or yield information referenced on this website is based on modelling assumptions, planned plantation operations, and historical agricultural data where available. It is not a guarantee, promise, or representation of future performance. Actual outcomes may differ materially from any projections. The value of biological assets and income derived from them may go down as well as up.",
  },
  {
    title: "Operational Data",
    body:
      "Nursery stock figures, plantation metrics and operational data displayed on this website are updated periodically and are provided for client transparency purposes only. They are indicative and subject to change. CADI accepts no liability for any decisions made on the basis of data contained on this website.",
  },
  {
    title: "Nature of Investment",
    body:
      "Investment in agroforestry plantation assets is long-term and illiquid in nature. There is no established secondary market for tree ownership and investors may not be able to realise the value of their investment within a predictable timeframe. Investments of this nature carry biological, environmental, market, operational and regulatory risks.",
  },
  {
    title: "Regulatory Compliance",
    body:
      "CADI operates in full compliance with Philippine environmental, agricultural and corporate regulations including all requirements of the Department of Environment and Natural Resources (DENR) and applicable CITES obligations in respect of Aquilaria crassna cultivation.",
  },
  {
    title: "Jurisdiction",
    body:
      "This website and the information it contains are directed at sophisticated and professional investors only. Persons accessing this website are responsible for ensuring compliance with all applicable laws and regulations in their own jurisdiction. This website does not constitute a public offer or financial promotion in any jurisdiction where such an offer or promotion would require regulatory authorisation.",
  },
  {
    title: "Confidentiality",
    body:
      "Certain sections of this website contain operational and commercial information that is confidential to Golden Forests Group clients and authorised personnel. Such information must not be reproduced, distributed or shared with third parties without the prior written consent of Golden Forests Group.",
  },
  {
    title: "No Liability",
    body:
      "CADI, Golden Forests Group, their directors, officers, employees and advisers accept no liability for any loss or damage arising from reliance on the information contained on this website. To the fullest extent permitted by law, all warranties and representations are excluded.",
  },
  {
    title: "Contact",
    body:
      "For queries regarding these disclaimers or your investment please contact office@goldenforests.ai",
  },
];

export default function Disclaimer() {
  return (
    <AnimatedPage className="max-w-6xl">
      <section className="rounded-[2rem] border border-[#35584B] bg-[linear-gradient(180deg,#17392E_0%,#123128_100%)] p-5 shadow-[0_24px_56px_rgba(9,39,34,0.2)] sm:p-7 md:p-8">
        <div className="border-b border-[#35584B] pb-5">
          <h1 className="text-3xl font-semibold tracking-tight text-[#F5EADB] sm:text-4xl">
            Risk Warning and Disclaimer
          </h1>
          <p className="mt-2 text-base leading-7 text-[#E7DCC8]">
            Crassna Agroforestry Development Inc. (CADI)
          </p>
          <p className="mt-1 text-xs italic text-[#C6B89B] sm:text-sm">Last updated: April 2026</p>
        </div>

        <div className="mt-6 space-y-4">
          {disclaimerSections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-[1.35rem] border border-[#406556] bg-[linear-gradient(180deg,#214439_0%,#1B382F_100%)] px-4 py-4 shadow-[0_12px_28px_rgba(0,0,0,0.16)] sm:px-5 sm:py-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D0AC76] bg-[#D0AC76]/18 text-sm font-semibold text-[#F5EADB]">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-[#F3E6D3] sm:text-xl">{section.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#E3D9C8] sm:text-[0.98rem]">
                    {section.title === "Contact" ? (
                      <>
                        For queries regarding these disclaimers or your investment please contact{" "}
                        <a
                          href="mailto:office@goldenforests.ai"
                          className="font-semibold text-[#E9C48B] underline decoration-[#E9C48B] decoration-2 underline-offset-4 hover:text-[#F5EADB]"
                        >
                          office@goldenforests.ai
                        </a>
                      </>
                    ) : (
                      section.body
                    )}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AnimatedPage>
  );
}
