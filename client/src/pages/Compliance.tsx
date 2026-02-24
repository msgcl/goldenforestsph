import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, FileCheck2, Scale, ScrollText } from "lucide-react";

export default function Compliance() {
  const compliances = [
    {
      title: "DENR Approval",
      desc: "Full registration and permitting with the Department of Environment and Natural Resources for the cultivation and harvesting of Aquilaria crassna.",
      icon: ScrollText
    },
    {
      title: "CITES Compliance",
      desc: "Adherence to the Convention on International Trade in Endangered Species. Agarwood is an Appendix II listed species; our plantation status guarantees legal export documentation.",
      icon: Scale
    },
    {
      title: "Bureau of Customs",
      desc: "Pre-established pathways and import/export clearances for heavy agricultural machinery, specialized inoculants, and eventual timber export.",
      icon: FileCheck2
    },
    {
      title: "Phytosanitary Certification",
      desc: "Agricultural clearances ensuring our exported products (mangoes and timber) meet international destination biosecurity standards.",
      icon: ShieldCheck
    }
  ];

  return (
    <AnimatedPage>
      <PageHeader 
        badge="Legal & Regulatory"
        title="Compliance Framework" 
        description="Institutional credibility is built on bulletproof legal foundations. We navigate the complex Philippine regulatory environment so our clients don't have to."
      />

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 mb-12 text-center">
        <p className="text-lg md:text-xl font-medium text-foreground max-w-3xl mx-auto">
          "The most critical barrier to entry in agroforestry is not land acquisition, but regulatory navigation. Our framework transforms biological risk into structured institutional security."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {compliances.map((item, i) => (
          <Card key={i} className="hover-elevate shadow-sm border-border/60">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="bg-muted p-3 rounded-xl">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-outfit mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-md">
        <h3 className="text-2xl font-bold font-outfit mb-6">Further Legal Mandates</h3>
        
        <div className="space-y-8">
          <div className="border-l-4 border-accent pl-6">
            <h4 className="font-bold text-lg mb-2">PEFC Certification Pathway</h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
              Operations are currently being modeled to align with the Programme for the Endorsement of Forest Certification (PEFC). This ultimate standard of sustainable forest management ensures our end-products command premium prices in heavily regulated first-world markets.
            </p>
          </div>
          
          <div className="border-l-4 border-primary pl-6">
            <h4 className="font-bold text-lg mb-2">Land Lease Security</h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
              All plantation acreage is secured via iron-clad, long-term lease agreements registered locally and nationally, providing guaranteed tenure that exceeds the biological lifecycle of the trees by decades.
            </p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
