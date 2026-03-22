import type { ReactNode } from "react";
import { BarChart3, Compass, Globe2, Save, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { defaultSiteCopy, type SiteCopy } from "@shared/siteCopy";
import { cn } from "@/lib/utils";

const editorInputClassName =
  "border-white/10 bg-[#0f312b] text-[#f7f3ea] placeholder:text-[#f7f3ea]/35 focus-visible:ring-[#f5d5a1] focus-visible:ring-offset-[#123831]";

type HeaderSection =
  | "about"
  | "compliance"
  | "technology"
  | "impact"
  | "clientServices"
  | "mangoProgram"
  | "agarwoodLifeCycle"
  | "ecotourism"
  | "nursery"
  | "plantation"
  | "management";

type WebsiteCopyEditorProps = {
  value: SiteCopy;
  isSaving: boolean;
  onSubmit: () => void;
  onChange: (value: SiteCopy) => void;
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#153f38] p-4 shadow-sm transition-shadow hover:border-[#f5d5a1]/25 hover:shadow-md">
      <Label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d7c39d]/85">
        {label}
      </Label>
      <div className="mt-3 space-y-1">{children}</div>
    </div>
  );
}

function EditorMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Icon className="h-5 w-5 text-[#f5d5a1]" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/65">{label}</p>
          <p className="text-lg font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card className={cn("overflow-hidden border border-white/10 bg-[linear-gradient(180deg,#102f2a_0%,#0d2723_100%)] text-white shadow-xl", className)}>
      <CardHeader className="border-b border-white/10 bg-[linear-gradient(180deg,#17463e_0%,#123831_100%)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5d5a1]/85">Website Copy</p>
        <CardTitle className="mt-2 text-2xl font-outfit text-white">{title}</CardTitle>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/65">{description}</p>
        ) : null}
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 bg-[linear-gradient(180deg,#102f2a_0%,#0e2a25_100%)] p-5 lg:grid-cols-2 xl:gap-5">{children}</CardContent>
    </Card>
  );
}

function formatTimestamp(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Not published yet";
  return parsed.toLocaleString();
}

export function WebsiteCopyEditor({
  value,
  isSaving,
  onSubmit,
  onChange,
}: WebsiteCopyEditorProps) {
  const toLineBlock = (items: string[]) => items.join("\n");
  const toLineItems = (text: string) =>
    text
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);

  const updateSection = (section: keyof typeof defaultSiteCopy, updates: Record<string, unknown>) => {
    onChange({
      ...value,
      [section]: {
        ...value[section],
        ...updates,
      },
    });
  };

  const updateHeader = (
    section: HeaderSection,
    field: "badge" | "title" | "description",
    nextValue: string,
  ) => {
    onChange({
      ...value,
      [section]: {
        ...value[section],
        header: {
          ...value[section].header,
          [field]: nextValue,
        },
      },
    });
  };

  const hierarchyGroups = [
    { label: "Overview", pages: ["Home", "About", "Management"] },
    { label: "Operations", pages: ["Nursery Operations", "Plantation Operations", "Compliance & Regs", "AI Technology"] },
    { label: "Programs", pages: ["Agarwood Program", "Mango Program", "Ecotourism", "Community Impact"] },
    { label: "Client & Media", pages: ["Client Services", "Contact Us", "Photo Gallery"] },
  ];

  return (
    <form
      className="space-y-6 [&_input]:border-white/10 [&_input]:bg-[#0f312b] [&_input]:text-[#f7f3ea] [&_input]:placeholder:text-[#f7f3ea]/35 [&_textarea]:border-white/10 [&_textarea]:bg-[#0f312b] [&_textarea]:text-[#f7f3ea] [&_textarea]:placeholder:text-[#f7f3ea]/35"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Card className="overflow-hidden border-none bg-[linear-gradient(135deg,#0b3029_0%,#11483f_58%,#1a5a4e_100%)] text-white shadow-xl">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f5d5a1]">Editorial Workspace</p>
              <h2 className="mt-3 text-3xl font-outfit font-semibold tracking-tight md:text-4xl">Website Copy Studio</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
                Safe mode is still active, but the workspace is now structured like a proper editorial console. Update headlines,
                labels, descriptions, and page narratives without touching layout, styling, imagery, or behavior.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 xl:max-w-sm">
              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                <EditorMetric icon={ShieldCheck} label="Mode" value="Safe Copy" />
                <EditorMetric icon={Compass} label="Coverage" value="Full Site" />
                <EditorMetric icon={Globe2} label="Last Publish" value={formatTimestamp(value._meta.updatedAt)} />
              </div>
              <Button
                type="submit"
                disabled={isSaving}
                className="h-12 rounded-2xl bg-[#f5d5a1] px-5 text-base font-semibold text-[#0f2f29] hover:bg-[#f0ca8f]"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving copy..." : "Save Website Copy"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/10 bg-[linear-gradient(180deg,#12362f_0%,#0f2e29_100%)] text-white shadow-lg">
        <CardContent className="grid gap-4 p-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5d5a1]/10">
                <ShieldCheck className="h-5 w-5 text-[#f5d5a1]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Protected layout system</p>
                <p className="text-xs leading-relaxed text-white/65">Page structure and styling stay locked while you refine copy.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5d5a1]/10">
                <BarChart3 className="h-5 w-5 text-[#f5d5a1]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Cleaner editorial flow</p>
                <p className="text-xs leading-relaxed text-white/65">Each page now reads like a polished content block instead of a raw settings list.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5d5a1]/10">
                <Sparkles className="h-5 w-5 text-[#f5d5a1]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Fast publish action</p>
                <p className="text-xs leading-relaxed text-white/65">Save from the top hero or the sticky action at the bottom of the editor.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/10 bg-[linear-gradient(180deg,#12362f_0%,#0f2e29_100%)] text-white shadow-lg">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-xl font-outfit">Sidebar Hierarchy</CardTitle>
          <p className="text-sm text-white/65">The copy editor follows the same public-site grouping used in the sidebar menu.</p>
        </CardHeader>
        <CardContent className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
          {hierarchyGroups.map((group) => (
            <div key={group.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5d5a1]">{group.label}</p>
              <div className="mt-3 space-y-2 text-sm text-white/80">
                {group.pages.map((page) => (
                  <p key={page}>{page}</p>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <SectionCard
        title="Contact Page"
        description="Core contact labels, support messaging, form titles, and office-detail microcopy."
      >
        <Field label="Contact Badge">
          <Input className={editorInputClassName} value={value.contact.badge} onChange={(e) => updateSection("contact", { badge: e.target.value })} />
        </Field>
        <Field label="Contact Intro">
          <Textarea className={editorInputClassName} value={value.contact.intro} onChange={(e) => updateSection("contact", { intro: e.target.value })} />
        </Field>
        <Field label="Form Title">
          <Input className={editorInputClassName} value={value.contact.formTitle} onChange={(e) => updateSection("contact", { formTitle: e.target.value })} />
        </Field>
        <Field label="Details Title">
          <Input className={editorInputClassName} value={value.contact.detailsTitle} onChange={(e) => updateSection("contact", { detailsTitle: e.target.value })} />
        </Field>
        <Field label="Form Description">
          <Textarea className={editorInputClassName} value={value.contact.formDescription} onChange={(e) => updateSection("contact", { formDescription: e.target.value })} />
        </Field>
        <Field label="Details Description">
          <Textarea className={editorInputClassName} value={value.contact.detailsDescription} onChange={(e) => updateSection("contact", { detailsDescription: e.target.value })} />
        </Field>
        <Field label="First Name Label">
          <Input className={editorInputClassName} value={value.contact.firstNameLabel} onChange={(e) => updateSection("contact", { firstNameLabel: e.target.value })} />
        </Field>
        <Field label="Last Name Label">
          <Input className={editorInputClassName} value={value.contact.lastNameLabel} onChange={(e) => updateSection("contact", { lastNameLabel: e.target.value })} />
        </Field>
        <Field label="Email Field Label">
          <Input className={editorInputClassName} value={value.contact.emailLabel} onChange={(e) => updateSection("contact", { emailLabel: e.target.value })} />
        </Field>
        <Field label="Message Field Label">
          <Input className={editorInputClassName} value={value.contact.messageLabel} onChange={(e) => updateSection("contact", { messageLabel: e.target.value })} />
        </Field>
        <Field label="Submit Button Label">
          <Input className={editorInputClassName} value={value.contact.submitLabel} onChange={(e) => updateSection("contact", { submitLabel: e.target.value })} />
        </Field>
        <Field label="Submitting Button Label">
          <Input className={editorInputClassName} value={value.contact.submittingLabel} onChange={(e) => updateSection("contact", { submittingLabel: e.target.value })} />
        </Field>
        <Field label="Mobile Label">
          <Input className={editorInputClassName} value={value.contact.mobileLabel} onChange={(e) => updateSection("contact", { mobileLabel: e.target.value })} />
        </Field>
        <Field label="Email Info Label">
          <Input className={editorInputClassName} value={value.contact.emailInfoLabel} onChange={(e) => updateSection("contact", { emailInfoLabel: e.target.value })} />
        </Field>
        <Field label="Website Label">
          <Input className={editorInputClassName} value={value.contact.websiteLabel} onChange={(e) => updateSection("contact", { websiteLabel: e.target.value })} />
        </Field>
        <Field label="Sales Office Label">
          <Input className={editorInputClassName} value={value.contact.salesOfficeLabel} onChange={(e) => updateSection("contact", { salesOfficeLabel: e.target.value })} />
        </Field>
        <Field label="Management Office Label">
          <Input className={editorInputClassName} value={value.contact.managementOfficeLabel} onChange={(e) => updateSection("contact", { managementOfficeLabel: e.target.value })} />
        </Field>
        <Field label="First Name Placeholder">
          <Input className={editorInputClassName} value={value.contact.firstNamePlaceholder} onChange={(e) => updateSection("contact", { firstNamePlaceholder: e.target.value })} />
        </Field>
        <Field label="Last Name Placeholder">
          <Input className={editorInputClassName} value={value.contact.lastNamePlaceholder} onChange={(e) => updateSection("contact", { lastNamePlaceholder: e.target.value })} />
        </Field>
        <Field label="Email Placeholder">
          <Input className={editorInputClassName} value={value.contact.emailPlaceholder} onChange={(e) => updateSection("contact", { emailPlaceholder: e.target.value })} />
        </Field>
        <Field label="Message Placeholder">
          <Input className={editorInputClassName} value={value.contact.messagePlaceholder} onChange={(e) => updateSection("contact", { messagePlaceholder: e.target.value })} />
        </Field>
        <Field label="Success Toast Title">
          <Input className={editorInputClassName} value={value.contact.successTitle} onChange={(e) => updateSection("contact", { successTitle: e.target.value })} />
        </Field>
        <Field label="Success Toast Description">
          <Textarea className={editorInputClassName} value={value.contact.successDescription} onChange={(e) => updateSection("contact", { successDescription: e.target.value })} />
        </Field>
        <Field label="Error Toast Title">
          <Input className={editorInputClassName} value={value.contact.errorTitle} onChange={(e) => updateSection("contact", { errorTitle: e.target.value })} />
        </Field>
        <Field label="Error Toast Description">
          <Textarea className={editorInputClassName} value={value.contact.errorDescription} onChange={(e) => updateSection("contact", { errorDescription: e.target.value })} />
        </Field>
        <Field label="Phone Numbers">
          <Textarea className={editorInputClassName} value={toLineBlock(value.contact.phoneNumbers)} onChange={(e) => updateSection("contact", { phoneNumbers: toLineItems(e.target.value) })} />
        </Field>
        <Field label="Email Value">
          <Input className={editorInputClassName} value={value.contact.emailValue} onChange={(e) => updateSection("contact", { emailValue: e.target.value })} />
        </Field>
        <Field label="Email Link">
          <Input className={editorInputClassName} value={value.contact.emailHref} onChange={(e) => updateSection("contact", { emailHref: e.target.value })} />
        </Field>
        <Field label="Website Value">
          <Input className={editorInputClassName} value={value.contact.websiteValue} onChange={(e) => updateSection("contact", { websiteValue: e.target.value })} />
        </Field>
        <Field label="Website Link">
          <Input className={editorInputClassName} value={value.contact.websiteHref} onChange={(e) => updateSection("contact", { websiteHref: e.target.value })} />
        </Field>
        <Field label="Holding Company Label">
          <Input className={editorInputClassName} value={value.contact.holdingCompanyLabel} onChange={(e) => updateSection("contact", { holdingCompanyLabel: e.target.value })} />
        </Field>
        <Field label="Holding Company Address">
          <Textarea className={editorInputClassName} value={toLineBlock(value.contact.holdingCompanyAddress)} onChange={(e) => updateSection("contact", { holdingCompanyAddress: toLineItems(e.target.value) })} />
        </Field>
        <Field label="Sales Office Title">
          <Input className={editorInputClassName} value={value.contact.salesOfficeTitle} onChange={(e) => updateSection("contact", { salesOfficeTitle: e.target.value })} />
        </Field>
        <Field label="Sales Office Company">
          <Textarea className={editorInputClassName} value={value.contact.salesOfficeCompany} onChange={(e) => updateSection("contact", { salesOfficeCompany: e.target.value })} />
        </Field>
        <Field label="Sales Office Address">
          <Textarea className={editorInputClassName} value={toLineBlock(value.contact.salesOfficeAddress)} onChange={(e) => updateSection("contact", { salesOfficeAddress: toLineItems(e.target.value) })} />
        </Field>
        <Field label="Management Office Address">
          <Textarea className={editorInputClassName} value={toLineBlock(value.contact.managementOfficeAddress)} onChange={(e) => updateSection("contact", { managementOfficeAddress: toLineItems(e.target.value) })} />
        </Field>
      </SectionCard>

      <SectionCard title="About Page" description="Corporate profile, overview storytelling, and mandate content for the company introduction page.">
        <Field label="Badge"><Input className={editorInputClassName} value={value.about.header.badge} onChange={(e) => updateHeader("about", "badge", e.target.value)} /></Field>
        <Field label="Title"><Input className={editorInputClassName} value={value.about.header.title} onChange={(e) => updateHeader("about", "title", e.target.value)} /></Field>
        <Field label="Header Description"><Textarea className={editorInputClassName} value={value.about.header.description} onChange={(e) => updateHeader("about", "description", e.target.value)} /></Field>
        <Field label="Overview Title"><Input value={value.about.overviewTitle} onChange={(e) => updateSection("about", { overviewTitle: e.target.value })} /></Field>
        <Field label="Mandate Title"><Input value={value.about.mandateTitle} onChange={(e) => updateSection("about", { mandateTitle: e.target.value })} /></Field>
        <Field label="Overview Paragraphs"><Textarea value={toLineBlock(value.about.overviewParagraphs)} onChange={(e) => updateSection("about", { overviewParagraphs: toLineItems(e.target.value) })} /></Field>
        <Field label="Mandate Bullets"><Textarea value={toLineBlock(value.about.mandateItems)} onChange={(e) => updateSection("about", { mandateItems: toLineItems(e.target.value) })} /></Field>
      </SectionCard>

      <SectionCard title="Compliance Page" description="Regulatory positioning, legal framing, and structured compliance card content.">
        <Field label="Badge"><Input value={value.compliance.header.badge} onChange={(e) => updateHeader("compliance", "badge", e.target.value)} /></Field>
        <Field label="Title"><Input value={value.compliance.header.title} onChange={(e) => updateHeader("compliance", "title", e.target.value)} /></Field>
        <Field label="Header Description"><Textarea value={value.compliance.header.description} onChange={(e) => updateHeader("compliance", "description", e.target.value)} /></Field>
        <Field label="Hero Title"><Input value={value.compliance.heroTitle} onChange={(e) => updateSection("compliance", { heroTitle: e.target.value })} /></Field>
        <Field label="Hero Description"><Textarea value={value.compliance.heroDescription} onChange={(e) => updateSection("compliance", { heroDescription: e.target.value })} /></Field>
        <Field label="Highlight Items"><Textarea value={toLineBlock(value.compliance.highlightItems)} onChange={(e) => updateSection("compliance", { highlightItems: toLineItems(e.target.value) })} /></Field>
        <Field label="Compliance Card Titles"><Textarea value={toLineBlock(value.compliance.complianceTitles)} onChange={(e) => updateSection("compliance", { complianceTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Compliance Card Descriptions"><Textarea value={toLineBlock(value.compliance.complianceDescriptions)} onChange={(e) => updateSection("compliance", { complianceDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Mandates Section Title"><Input value={value.compliance.mandatesTitle} onChange={(e) => updateSection("compliance", { mandatesTitle: e.target.value })} /></Field>
        <Field label="Mandate Titles"><Textarea value={toLineBlock(value.compliance.mandateTitles)} onChange={(e) => updateSection("compliance", { mandateTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Mandate Descriptions"><Textarea value={toLineBlock(value.compliance.mandateDescriptions)} onChange={(e) => updateSection("compliance", { mandateDescriptions: toLineItems(e.target.value) })} /></Field>
      </SectionCard>

      <SectionCard title="Technology Page" description="Agroforestry intelligence messaging, stack copy, and operational benefits.">
        <Field label="Badge"><Input value={value.technology.header.badge} onChange={(e) => updateHeader("technology", "badge", e.target.value)} /></Field>
        <Field label="Title"><Input value={value.technology.header.title} onChange={(e) => updateHeader("technology", "title", e.target.value)} /></Field>
        <Field label="Header Description"><Textarea value={value.technology.header.description} onChange={(e) => updateHeader("technology", "description", e.target.value)} /></Field>
        <Field label="Technology Stack Title"><Input value={value.technology.stackTitle} onChange={(e) => updateSection("technology", { stackTitle: e.target.value })} /></Field>
        <Field label="Benefits Title"><Input value={value.technology.benefitsTitle} onChange={(e) => updateSection("technology", { benefitsTitle: e.target.value })} /></Field>
        <Field label="Stack Item Titles"><Textarea value={toLineBlock(value.technology.stackTitles)} onChange={(e) => updateSection("technology", { stackTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Stack Item Descriptions"><Textarea value={toLineBlock(value.technology.stackDescriptions)} onChange={(e) => updateSection("technology", { stackDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Benefits"><Textarea value={toLineBlock(value.technology.benefits)} onChange={(e) => updateSection("technology", { benefits: toLineItems(e.target.value) })} /></Field>
      </SectionCard>

      <SectionCard title="Impact Page" description="Environmental and community impact statements, benefit cards, and standards copy.">
        <Field label="Badge"><Input value={value.impact.header.badge} onChange={(e) => updateHeader("impact", "badge", e.target.value)} /></Field>
        <Field label="Title"><Input value={value.impact.header.title} onChange={(e) => updateHeader("impact", "title", e.target.value)} /></Field>
        <Field label="Header Description"><Textarea value={value.impact.header.description} onChange={(e) => updateHeader("impact", "description", e.target.value)} /></Field>
        <Field label="Card Titles"><Textarea value={toLineBlock(value.impact.cardTitles)} onChange={(e) => updateSection("impact", { cardTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Card Descriptions"><Textarea value={toLineBlock(value.impact.cardDescriptions)} onChange={(e) => updateSection("impact", { cardDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Standards Title"><Input value={value.impact.standardsTitle} onChange={(e) => updateSection("impact", { standardsTitle: e.target.value })} /></Field>
        <Field label="Standards Description"><Textarea value={value.impact.standardsDescription} onChange={(e) => updateSection("impact", { standardsDescription: e.target.value })} /></Field>
      </SectionCard>

      <SectionCard title="Client Services Page" description="Ownership, reporting, visitation, logistics, and itinerary copy for clients.">
        <Field label="Badge"><Input value={value.clientServices.header.badge} onChange={(e) => updateHeader("clientServices", "badge", e.target.value)} /></Field>
        <Field label="Title"><Input value={value.clientServices.header.title} onChange={(e) => updateHeader("clientServices", "title", e.target.value)} /></Field>
        <Field label="Header Description"><Textarea value={value.clientServices.header.description} onChange={(e) => updateHeader("clientServices", "description", e.target.value)} /></Field>
        <Field label="Service Card Titles"><Textarea value={toLineBlock(value.clientServices.serviceTitles)} onChange={(e) => updateSection("clientServices", { serviceTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Service Card Descriptions"><Textarea value={toLineBlock(value.clientServices.serviceDescriptions)} onChange={(e) => updateSection("clientServices", { serviceDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Tracking Card Bullets"><Textarea value={toLineBlock(value.clientServices.serviceBullets[0] ?? [])} onChange={(e) => updateSection("clientServices", { serviceBullets: [toLineItems(e.target.value), value.clientServices.serviceBullets[1] ?? []] })} /></Field>
        <Field label="Reporting Card Bullets"><Textarea value={toLineBlock(value.clientServices.serviceBullets[1] ?? [])} onChange={(e) => updateSection("clientServices", { serviceBullets: [value.clientServices.serviceBullets[0] ?? [], toLineItems(e.target.value)] })} /></Field>
        <Field label="Visitation Title"><Input value={value.clientServices.visitationTitle} onChange={(e) => updateSection("clientServices", { visitationTitle: e.target.value })} /></Field>
        <Field label="Visitation Description"><Textarea value={value.clientServices.visitationDescription} onChange={(e) => updateSection("clientServices", { visitationDescription: e.target.value })} /></Field>
        <Field label="Logistics Title"><Input value={value.clientServices.logisticsTitle} onChange={(e) => updateSection("clientServices", { logisticsTitle: e.target.value })} /></Field>
        <Field label="Logistics Description"><Textarea value={value.clientServices.logisticsDescription} onChange={(e) => updateSection("clientServices", { logisticsDescription: e.target.value })} /></Field>
        <Field label="Itinerary Title"><Input value={value.clientServices.itineraryTitle} onChange={(e) => updateSection("clientServices", { itineraryTitle: e.target.value })} /></Field>
        <Field label="Itinerary Description"><Textarea value={value.clientServices.itineraryDescription} onChange={(e) => updateSection("clientServices", { itineraryDescription: e.target.value })} /></Field>
      </SectionCard>

      <SectionCard title="Mango Program Page" description="Investment overview, insurance, benefits, and snapshot content for the mango program.">
        <Field label="Badge"><Input value={value.mangoProgram.header.badge} onChange={(e) => updateHeader("mangoProgram", "badge", e.target.value)} /></Field>
        <Field label="Title"><Input value={value.mangoProgram.header.title} onChange={(e) => updateHeader("mangoProgram", "title", e.target.value)} /></Field>
        <Field label="Header Description"><Textarea value={value.mangoProgram.header.description} onChange={(e) => updateHeader("mangoProgram", "description", e.target.value)} /></Field>
        <Field label="Overview Title"><Input value={value.mangoProgram.overviewTitle} onChange={(e) => updateSection("mangoProgram", { overviewTitle: e.target.value })} /></Field>
        <Field label="Insurance Title"><Input value={value.mangoProgram.insuranceTitle} onChange={(e) => updateSection("mangoProgram", { insuranceTitle: e.target.value })} /></Field>
        <Field label="Overview Points"><Textarea value={toLineBlock(value.mangoProgram.overviewPoints)} onChange={(e) => updateSection("mangoProgram", { overviewPoints: toLineItems(e.target.value) })} /></Field>
        <Field label="Insurance Description"><Textarea value={value.mangoProgram.insuranceDescription} onChange={(e) => updateSection("mangoProgram", { insuranceDescription: e.target.value })} /></Field>
        <Field label="Insurance Points"><Textarea value={toLineBlock(value.mangoProgram.insurancePoints)} onChange={(e) => updateSection("mangoProgram", { insurancePoints: toLineItems(e.target.value) })} /></Field>
        <Field label="Benefits Title"><Input value={value.mangoProgram.benefitsTitle} onChange={(e) => updateSection("mangoProgram", { benefitsTitle: e.target.value })} /></Field>
        <Field label="Benefits Points"><Textarea value={toLineBlock(value.mangoProgram.benefitsPoints)} onChange={(e) => updateSection("mangoProgram", { benefitsPoints: toLineItems(e.target.value) })} /></Field>
        <Field label="Snapshot Title"><Input value={value.mangoProgram.snapshotTitle} onChange={(e) => updateSection("mangoProgram", { snapshotTitle: e.target.value })} /></Field>
        <Field label="Snapshot Labels"><Textarea value={toLineBlock(value.mangoProgram.snapshotLabels)} onChange={(e) => updateSection("mangoProgram", { snapshotLabels: toLineItems(e.target.value) })} /></Field>
        <Field label="Snapshot Values"><Textarea value={toLineBlock(value.mangoProgram.snapshotValues)} onChange={(e) => updateSection("mangoProgram", { snapshotValues: toLineItems(e.target.value) })} /></Field>
        <Field label="Snapshot Footnote"><Textarea value={value.mangoProgram.snapshotFootnote} onChange={(e) => updateSection("mangoProgram", { snapshotFootnote: e.target.value })} /></Field>
      </SectionCard>

      <SectionCard title="Agarwood Life Cycle Page" description="Lifecycle narrative, insurance framing, commercial copy, and stage-by-stage program messaging.">
        <Field label="Badge"><Input value={value.agarwoodLifeCycle.header.badge} onChange={(e) => updateHeader("agarwoodLifeCycle", "badge", e.target.value)} /></Field>
        <Field label="Title"><Input value={value.agarwoodLifeCycle.header.title} onChange={(e) => updateHeader("agarwoodLifeCycle", "title", e.target.value)} /></Field>
        <Field label="Header Description"><Textarea value={value.agarwoodLifeCycle.header.description} onChange={(e) => updateHeader("agarwoodLifeCycle", "description", e.target.value)} /></Field>
        <Field label="Overview Title"><Input value={value.agarwoodLifeCycle.overviewTitle} onChange={(e) => updateSection("agarwoodLifeCycle", { overviewTitle: e.target.value })} /></Field>
        <Field label="Commercial Title"><Input value={value.agarwoodLifeCycle.commercialTitle} onChange={(e) => updateSection("agarwoodLifeCycle", { commercialTitle: e.target.value })} /></Field>
        <Field label="Overview Points"><Textarea value={toLineBlock(value.agarwoodLifeCycle.overviewPoints)} onChange={(e) => updateSection("agarwoodLifeCycle", { overviewPoints: toLineItems(e.target.value) })} /></Field>
        <Field label="Commercial Points"><Textarea value={toLineBlock(value.agarwoodLifeCycle.commercialPoints)} onChange={(e) => updateSection("agarwoodLifeCycle", { commercialPoints: toLineItems(e.target.value) })} /></Field>
        <Field label="Insurance Title"><Input value={value.agarwoodLifeCycle.insuranceTitle} onChange={(e) => updateSection("agarwoodLifeCycle", { insuranceTitle: e.target.value })} /></Field>
        <Field label="Insurance Description"><Textarea value={value.agarwoodLifeCycle.insuranceDescription} onChange={(e) => updateSection("agarwoodLifeCycle", { insuranceDescription: e.target.value })} /></Field>
        <Field label="Insurance Points"><Textarea value={toLineBlock(value.agarwoodLifeCycle.insurancePoints)} onChange={(e) => updateSection("agarwoodLifeCycle", { insurancePoints: toLineItems(e.target.value) })} /></Field>
        <Field label="Stage Titles"><Textarea value={toLineBlock(value.agarwoodLifeCycle.stageTitles)} onChange={(e) => updateSection("agarwoodLifeCycle", { stageTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Stage Periods"><Textarea value={toLineBlock(value.agarwoodLifeCycle.stagePeriods)} onChange={(e) => updateSection("agarwoodLifeCycle", { stagePeriods: toLineItems(e.target.value) })} /></Field>
        <Field label="Stage Details"><Textarea value={toLineBlock(value.agarwoodLifeCycle.stageDetails)} onChange={(e) => updateSection("agarwoodLifeCycle", { stageDetails: toLineItems(e.target.value) })} /></Field>
      </SectionCard>

      <SectionCard title="Ecotourism Page" description="Travel experience messaging, route guidance, and destination-related content.">
        <Field label="Badge"><Input value={value.ecotourism.header.badge} onChange={(e) => updateHeader("ecotourism", "badge", e.target.value)} /></Field>
        <Field label="Title"><Input value={value.ecotourism.header.title} onChange={(e) => updateHeader("ecotourism", "title", e.target.value)} /></Field>
        <Field label="Header Description"><Textarea value={value.ecotourism.header.description} onChange={(e) => updateHeader("ecotourism", "description", e.target.value)} /></Field>
        <Field label="Intro Paragraphs"><Textarea value={toLineBlock(value.ecotourism.introParagraphs)} onChange={(e) => updateSection("ecotourism", { introParagraphs: toLineItems(e.target.value) })} /></Field>
        <Field label="Guide Title"><Input value={value.ecotourism.guideTitle} onChange={(e) => updateSection("ecotourism", { guideTitle: e.target.value })} /></Field>
        <Field label="Flights Title"><Input value={value.ecotourism.flightsTitle} onChange={(e) => updateSection("ecotourism", { flightsTitle: e.target.value })} /></Field>
        <Field label="Guide Items"><Textarea value={toLineBlock(value.ecotourism.guideItems)} onChange={(e) => updateSection("ecotourism", { guideItems: toLineItems(e.target.value) })} /></Field>
        <Field label="Flight Items"><Textarea value={toLineBlock(value.ecotourism.flightItems)} onChange={(e) => updateSection("ecotourism", { flightItems: toLineItems(e.target.value) })} /></Field>
        <Field label="Route Title"><Input value={value.ecotourism.routeTitle} onChange={(e) => updateSection("ecotourism", { routeTitle: e.target.value })} /></Field>
        <Field label="Context Title"><Input value={value.ecotourism.contextTitle} onChange={(e) => updateSection("ecotourism", { contextTitle: e.target.value })} /></Field>
        <Field label="Route Steps"><Textarea value={toLineBlock(value.ecotourism.routeSteps)} onChange={(e) => updateSection("ecotourism", { routeSteps: toLineItems(e.target.value) })} /></Field>
        <Field label="Context Items"><Textarea value={toLineBlock(value.ecotourism.contextItems)} onChange={(e) => updateSection("ecotourism", { contextItems: toLineItems(e.target.value) })} /></Field>
        <Field label="Gallery Title"><Input value={value.ecotourism.galleryTitle} onChange={(e) => updateSection("ecotourism", { galleryTitle: e.target.value })} /></Field>
        <Field label="Destination Names"><Textarea value={toLineBlock(value.ecotourism.featuredDestinationNames)} onChange={(e) => updateSection("ecotourism", { featuredDestinationNames: toLineItems(e.target.value) })} /></Field>
        <Field label="Destination Details"><Textarea value={toLineBlock(value.ecotourism.featuredDestinationDetails)} onChange={(e) => updateSection("ecotourism", { featuredDestinationDetails: toLineItems(e.target.value) })} /></Field>
        <Field label="Destination Images"><Textarea value={toLineBlock(value.ecotourism.featuredDestinationImages)} onChange={(e) => updateSection("ecotourism", { featuredDestinationImages: toLineItems(e.target.value) })} /></Field>
      </SectionCard>

      <SectionCard title="Home Page" description="Homepage hero language, stat cards, governance copy, and CTA-supporting text.">
        <Field label="Hero Badge"><Input value={value.home.heroBadge} onChange={(e) => updateSection("home", { heroBadge: e.target.value })} /></Field>
        <Field label="Hero Title Prefix"><Input value={value.home.heroTitlePrefix} onChange={(e) => updateSection("home", { heroTitlePrefix: e.target.value })} /></Field>
        <Field label="Hero Title Highlight"><Input value={value.home.heroTitleHighlight} onChange={(e) => updateSection("home", { heroTitleHighlight: e.target.value })} /></Field>
        <Field label="Hero Description"><Textarea value={value.home.heroDescription} onChange={(e) => updateSection("home", { heroDescription: e.target.value })} /></Field>
        <Field label="Primary CTA"><Input value={value.home.primaryCtaLabel} onChange={(e) => updateSection("home", { primaryCtaLabel: e.target.value })} /></Field>
        <Field label="Secondary CTA"><Input value={value.home.secondaryCtaLabel} onChange={(e) => updateSection("home", { secondaryCtaLabel: e.target.value })} /></Field>
        <Field label="Top Stat Labels"><Textarea value={toLineBlock(value.home.statsLabels)} onChange={(e) => updateSection("home", { statsLabels: toLineItems(e.target.value) })} /></Field>
        <Field label="Top Stat Values"><Textarea value={toLineBlock(value.home.statsValues)} onChange={(e) => updateSection("home", { statsValues: toLineItems(e.target.value) })} /></Field>
        <Field label="Top Stat Descriptions"><Textarea value={toLineBlock(value.home.statsDescriptions)} onChange={(e) => updateSection("home", { statsDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Live Metrics Title"><Input value={value.home.liveMetricsTitle} onChange={(e) => updateSection("home", { liveMetricsTitle: e.target.value })} /></Field>
        <Field label="Current Stock Label"><Input value={value.home.currentStockLabel} onChange={(e) => updateSection("home", { currentStockLabel: e.target.value })} /></Field>
        <Field label="Stock Labels"><Textarea value={toLineBlock(value.home.stockLabels)} onChange={(e) => updateSection("home", { stockLabels: toLineItems(e.target.value) })} /></Field>
        <Field label="Sale Header Prefix"><Input value={value.home.saleHeaderPrefix} onChange={(e) => updateSection("home", { saleHeaderPrefix: e.target.value })} /></Field>
        <Field label="Sale Card Labels"><Textarea value={toLineBlock(value.home.saleCardLabels)} onChange={(e) => updateSection("home", { saleCardLabels: toLineItems(e.target.value) })} /></Field>
        <Field label="Summary Card Labels"><Textarea value={toLineBlock(value.home.summaryCardLabels)} onChange={(e) => updateSection("home", { summaryCardLabels: toLineItems(e.target.value) })} /></Field>
        <Field label="Summary Card Descriptions"><Textarea value={toLineBlock(value.home.summaryCardDescriptions)} onChange={(e) => updateSection("home", { summaryCardDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Deployment Milestone Value"><Input value={value.home.deploymentMilestoneValue} onChange={(e) => updateSection("home", { deploymentMilestoneValue: e.target.value })} /></Field>
        <Field label="Nursery CTA"><Input value={value.home.nurseryCtaLabel} onChange={(e) => updateSection("home", { nurseryCtaLabel: e.target.value })} /></Field>
        <Field label="Snapshot Title"><Input value={value.home.snapshotTitle} onChange={(e) => updateSection("home", { snapshotTitle: e.target.value })} /></Field>
        <Field label="Snapshot Description"><Textarea value={value.home.snapshotDescription} onChange={(e) => updateSection("home", { snapshotDescription: e.target.value })} /></Field>
        <Field label="Gallery CTA"><Input value={value.home.galleryCtaLabel} onChange={(e) => updateSection("home", { galleryCtaLabel: e.target.value })} /></Field>
        <Field label="Snapshot Card Titles"><Textarea value={toLineBlock(value.home.snapshotCardTitles)} onChange={(e) => updateSection("home", { snapshotCardTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Snapshot Card Descriptions"><Textarea value={toLineBlock(value.home.snapshotCardDescriptions)} onChange={(e) => updateSection("home", { snapshotCardDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Governance Titles"><Textarea value={toLineBlock(value.home.governanceTitles)} onChange={(e) => updateSection("home", { governanceTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Governance Descriptions"><Textarea value={toLineBlock(value.home.governanceDescriptions)} onChange={(e) => updateSection("home", { governanceDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Visits Title"><Input value={value.home.visitsTitle} onChange={(e) => updateSection("home", { visitsTitle: e.target.value })} /></Field>
        <Field label="Visits Description"><Textarea value={value.home.visitsDescription} onChange={(e) => updateSection("home", { visitsDescription: e.target.value })} /></Field>
        <Field label="Visits Bullets"><Textarea value={toLineBlock(value.home.visitsBullets)} onChange={(e) => updateSection("home", { visitsBullets: toLineItems(e.target.value) })} /></Field>
      </SectionCard>

      <SectionCard title="Nursery Page" description="Propagation dashboard, stock messaging, gallery microcopy, and nursery technology language.">
        <Field label="Badge"><Input value={value.nursery.header.badge} onChange={(e) => updateHeader("nursery", "badge", e.target.value)} /></Field>
        <Field label="Title"><Input value={value.nursery.header.title} onChange={(e) => updateHeader("nursery", "title", e.target.value)} /></Field>
        <Field label="Header Description"><Textarea value={value.nursery.header.description} onChange={(e) => updateHeader("nursery", "description", e.target.value)} /></Field>
        <Field label="Overview Eyebrow"><Input value={value.nursery.overviewEyebrow} onChange={(e) => updateSection("nursery", { overviewEyebrow: e.target.value })} /></Field>
        <Field label="Overview Title"><Input value={value.nursery.overviewTitle} onChange={(e) => updateSection("nursery", { overviewTitle: e.target.value })} /></Field>
        <Field label="Overview Description"><Textarea value={value.nursery.overviewDescription} onChange={(e) => updateSection("nursery", { overviewDescription: e.target.value })} /></Field>
        <Field label="Stock Labels"><Textarea value={toLineBlock(value.nursery.stockLabels)} onChange={(e) => updateSection("nursery", { stockLabels: toLineItems(e.target.value) })} /></Field>
        <Field label="Stock Descriptions"><Textarea value={toLineBlock(value.nursery.stockDescriptions)} onChange={(e) => updateSection("nursery", { stockDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Sale Header Prefix"><Input value={value.nursery.saleHeaderPrefix} onChange={(e) => updateSection("nursery", { saleHeaderPrefix: e.target.value })} /></Field>
        <Field label="Sale Card Labels"><Textarea value={toLineBlock(value.nursery.saleCardLabels)} onChange={(e) => updateSection("nursery", { saleCardLabels: toLineItems(e.target.value) })} /></Field>
        <Field label="Sale Card Notes"><Textarea value={toLineBlock(value.nursery.saleCardNotes)} onChange={(e) => updateSection("nursery", { saleCardNotes: toLineItems(e.target.value) })} /></Field>
        <Field label="Gallery Title"><Input value={value.nursery.galleryTitle} onChange={(e) => updateSection("nursery", { galleryTitle: e.target.value })} /></Field>
        <Field label="Gallery Link Label"><Input value={value.nursery.galleryLinkLabel} onChange={(e) => updateSection("nursery", { galleryLinkLabel: e.target.value })} /></Field>
        <Field label="Propagation Title"><Input value={value.nursery.propagationTitle} onChange={(e) => updateSection("nursery", { propagationTitle: e.target.value })} /></Field>
        <Field label="Propagation Descriptions"><Textarea value={toLineBlock(value.nursery.propagationDescriptions)} onChange={(e) => updateSection("nursery", { propagationDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Dashboard Title"><Input value={value.nursery.dashboardTitle} onChange={(e) => updateSection("nursery", { dashboardTitle: e.target.value })} /></Field>
        <Field label="Growth Labels"><Textarea value={toLineBlock(value.nursery.growthLabels)} onChange={(e) => updateSection("nursery", { growthLabels: toLineItems(e.target.value) })} /></Field>
        <Field label="Growth Descriptions"><Textarea value={toLineBlock(value.nursery.growthDescriptions)} onChange={(e) => updateSection("nursery", { growthDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Mortality Label"><Input value={value.nursery.mortalityLabel} onChange={(e) => updateSection("nursery", { mortalityLabel: e.target.value })} /></Field>
        <Field label="Updated Prefix"><Input value={value.nursery.updatedPrefix} onChange={(e) => updateSection("nursery", { updatedPrefix: e.target.value })} /></Field>
        <Field label="Empty State Label"><Input value={value.nursery.emptyStateLabel} onChange={(e) => updateSection("nursery", { emptyStateLabel: e.target.value })} /></Field>
        <Field label="Technology Title"><Input value={value.nursery.technologyTitle} onChange={(e) => updateSection("nursery", { technologyTitle: e.target.value })} /></Field>
        <Field label="Technology Card Titles"><Textarea value={toLineBlock(value.nursery.technologyTitles)} onChange={(e) => updateSection("nursery", { technologyTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Technology Card Descriptions"><Textarea value={toLineBlock(value.nursery.technologyDescriptions)} onChange={(e) => updateSection("nursery", { technologyDescriptions: toLineItems(e.target.value) })} /></Field>
      </SectionCard>

      <SectionCard title="Plantation Page" description="Field deployment, milestone content, soil protocol copy, and lifecycle messaging.">
        <Field label="Badge"><Input value={value.plantation.header.badge} onChange={(e) => updateHeader("plantation", "badge", e.target.value)} /></Field>
        <Field label="Title"><Input value={value.plantation.header.title} onChange={(e) => updateHeader("plantation", "title", e.target.value)} /></Field>
        <Field label="Header Description"><Textarea value={value.plantation.header.description} onChange={(e) => updateHeader("plantation", "description", e.target.value)} /></Field>
        <Field label="Gallery Title"><Input value={value.plantation.galleryTitle} onChange={(e) => updateSection("plantation", { galleryTitle: e.target.value })} /></Field>
        <Field label="Gallery Description"><Textarea value={value.plantation.galleryDescription} onChange={(e) => updateSection("plantation", { galleryDescription: e.target.value })} /></Field>
        <Field label="Milestone Title"><Input value={value.plantation.milestoneTitle} onChange={(e) => updateSection("plantation", { milestoneTitle: e.target.value })} /></Field>
        <Field label="Milestone Description"><Textarea value={value.plantation.milestoneDescription} onChange={(e) => updateSection("plantation", { milestoneDescription: e.target.value })} /></Field>
        <Field label="Milestone Labels"><Textarea value={toLineBlock(value.plantation.milestoneLabels)} onChange={(e) => updateSection("plantation", { milestoneLabels: toLineItems(e.target.value) })} /></Field>
        <Field label="Milestone Values"><Textarea value={toLineBlock(value.plantation.milestoneValues)} onChange={(e) => updateSection("plantation", { milestoneValues: toLineItems(e.target.value) })} /></Field>
        <Field label="Milestone Notes"><Textarea value={toLineBlock(value.plantation.milestoneNotes)} onChange={(e) => updateSection("plantation", { milestoneNotes: toLineItems(e.target.value) })} /></Field>
        <Field label="Land Preparation Title"><Input value={value.plantation.landPreparationTitle} onChange={(e) => updateSection("plantation", { landPreparationTitle: e.target.value })} /></Field>
        <Field label="Soil Protocol Title"><Input value={value.plantation.soilProtocolTitle} onChange={(e) => updateSection("plantation", { soilProtocolTitle: e.target.value })} /></Field>
        <Field label="Soil Protocol Description"><Textarea value={value.plantation.soilProtocolDescription} onChange={(e) => updateSection("plantation", { soilProtocolDescription: e.target.value })} /></Field>
        <Field label="Cassava Title"><Input value={value.plantation.cassavaTitle} onChange={(e) => updateSection("plantation", { cassavaTitle: e.target.value })} /></Field>
        <Field label="Cassava Description"><Textarea value={value.plantation.cassavaDescription} onChange={(e) => updateSection("plantation", { cassavaDescription: e.target.value })} /></Field>
        <Field label="Lifecycle Title"><Input value={value.plantation.lifecycleTitle} onChange={(e) => updateSection("plantation", { lifecycleTitle: e.target.value })} /></Field>
        <Field label="Agarwood Label"><Input value={value.plantation.agarwoodLabel} onChange={(e) => updateSection("plantation", { agarwoodLabel: e.target.value })} /></Field>
        <Field label="Agarwood Subtitle"><Input value={value.plantation.agarwoodSubtitle} onChange={(e) => updateSection("plantation", { agarwoodSubtitle: e.target.value })} /></Field>
        <Field label="Mango Label"><Input value={value.plantation.mangoLabel} onChange={(e) => updateSection("plantation", { mangoLabel: e.target.value })} /></Field>
        <Field label="Mango Subtitle"><Input value={value.plantation.mangoSubtitle} onChange={(e) => updateSection("plantation", { mangoSubtitle: e.target.value })} /></Field>
        <Field label="Agarwood Lifecycle Titles"><Textarea value={toLineBlock(value.plantation.agarwoodLifecycleTitles)} onChange={(e) => updateSection("plantation", { agarwoodLifecycleTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Agarwood Lifecycle Descriptions"><Textarea value={toLineBlock(value.plantation.agarwoodLifecycleDescriptions)} onChange={(e) => updateSection("plantation", { agarwoodLifecycleDescriptions: toLineItems(e.target.value) })} /></Field>
        <Field label="Mango Lifecycle Titles"><Textarea value={toLineBlock(value.plantation.mangoLifecycleTitles)} onChange={(e) => updateSection("plantation", { mangoLifecycleTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Mango Lifecycle Descriptions"><Textarea value={toLineBlock(value.plantation.mangoLifecycleDescriptions)} onChange={(e) => updateSection("plantation", { mangoLifecycleDescriptions: toLineItems(e.target.value) })} /></Field>
      </SectionCard>

      <SectionCard title="Management Page" description="Leadership page headline content, helper text, and category labels.">
        <Field label="Badge"><Input value={value.management.header.badge} onChange={(e) => updateHeader("management", "badge", e.target.value)} /></Field>
        <Field label="Title"><Input value={value.management.header.title} onChange={(e) => updateHeader("management", "title", e.target.value)} /></Field>
        <Field label="Header Description"><Textarea value={value.management.header.description} onChange={(e) => updateHeader("management", "description", e.target.value)} /></Field>
        <Field label="Helper Text"><Textarea value={value.management.helperText} onChange={(e) => updateSection("management", { helperText: e.target.value })} /></Field>
        <Field label="Category Titles"><Textarea value={toLineBlock(value.management.categoryTitles)} onChange={(e) => updateSection("management", { categoryTitles: toLineItems(e.target.value) })} /></Field>
        <Field label="Fallback Detail Text"><Textarea value={value.management.fallbackDetailText} onChange={(e) => updateSection("management", { fallbackDetailText: e.target.value })} /></Field>
      </SectionCard>

      <SectionCard title="Photo Gallery Page" description="Photo archive hero copy, browsing labels, search microcopy, and category descriptors.">
        <Field label="Back Button Label"><Input value={value.photoGallery.backButtonLabel} onChange={(e) => updateSection("photoGallery", { backButtonLabel: e.target.value })} /></Field>
        <Field label="Hero Badge"><Input value={value.photoGallery.heroBadge} onChange={(e) => updateSection("photoGallery", { heroBadge: e.target.value })} /></Field>
        <Field label="Hero Title"><Input value={value.photoGallery.heroTitle} onChange={(e) => updateSection("photoGallery", { heroTitle: e.target.value })} /></Field>
        <Field label="Hero Description"><Textarea value={value.photoGallery.heroDescription} onChange={(e) => updateSection("photoGallery", { heroDescription: e.target.value })} /></Field>
        <Field label="Stat Labels"><Textarea value={toLineBlock(value.photoGallery.statLabels)} onChange={(e) => updateSection("photoGallery", { statLabels: toLineItems(e.target.value) })} /></Field>
        <Field label="Search Placeholder"><Input value={value.photoGallery.searchPlaceholder} onChange={(e) => updateSection("photoGallery", { searchPlaceholder: e.target.value })} /></Field>
        <Field label="Category Count Label"><Input value={value.photoGallery.categoryCountLabel} onChange={(e) => updateSection("photoGallery", { categoryCountLabel: e.target.value })} /></Field>
        <Field label="Showing Label"><Input value={value.photoGallery.showingLabel} onChange={(e) => updateSection("photoGallery", { showingLabel: e.target.value })} /></Field>
        <Field label="Filtered Results Label"><Input value={value.photoGallery.filteredResultsLabel} onChange={(e) => updateSection("photoGallery", { filteredResultsLabel: e.target.value })} /></Field>
        <Field label="Current Collection Value Label"><Input value={value.photoGallery.currentCollectionValueLabel} onChange={(e) => updateSection("photoGallery", { currentCollectionValueLabel: e.target.value })} /></Field>
        <Field label="Collections Suffix"><Input value={value.photoGallery.collectionsLabelSuffix} onChange={(e) => updateSection("photoGallery", { collectionsLabelSuffix: e.target.value })} /></Field>
        <Field label="Browse Collections Title"><Input value={value.photoGallery.browseCollectionsTitle} onChange={(e) => updateSection("photoGallery", { browseCollectionsTitle: e.target.value })} /></Field>
        <Field label="Browse Collections Description"><Textarea value={value.photoGallery.browseCollectionsDescription} onChange={(e) => updateSection("photoGallery", { browseCollectionsDescription: e.target.value })} /></Field>
        <Field label="Current Collection Label"><Input value={value.photoGallery.currentCollectionLabel} onChange={(e) => updateSection("photoGallery", { currentCollectionLabel: e.target.value })} /></Field>
        <Field label="View Hint"><Input value={value.photoGallery.viewHint} onChange={(e) => updateSection("photoGallery", { viewHint: e.target.value })} /></Field>
        <Field label="Search Results Title"><Input value={value.photoGallery.searchResultsTitle} onChange={(e) => updateSection("photoGallery", { searchResultsTitle: e.target.value })} /></Field>
        <Field label="Full Gallery Suffix"><Input value={value.photoGallery.fullGallerySuffix} onChange={(e) => updateSection("photoGallery", { fullGallerySuffix: e.target.value })} /></Field>
        <Field label="Search Summary Prefix"><Input value={value.photoGallery.searchSummaryPrefix} onChange={(e) => updateSection("photoGallery", { searchSummaryPrefix: e.target.value })} /></Field>
        <Field label="Search Match Suffix"><Input value={value.photoGallery.searchSummaryMatchSuffix} onChange={(e) => updateSection("photoGallery", { searchSummaryMatchSuffix: e.target.value })} /></Field>
        <Field label="Collection Summary Singular"><Input value={value.photoGallery.collectionSummarySingular} onChange={(e) => updateSection("photoGallery", { collectionSummarySingular: e.target.value })} /></Field>
        <Field label="Collection Summary Plural"><Input value={value.photoGallery.collectionSummaryPlural} onChange={(e) => updateSection("photoGallery", { collectionSummaryPlural: e.target.value })} /></Field>
        <Field label="No Results Title"><Input value={value.photoGallery.noResultsTitle} onChange={(e) => updateSection("photoGallery", { noResultsTitle: e.target.value })} /></Field>
        <Field label="No Results Description"><Textarea value={value.photoGallery.noResultsDescription} onChange={(e) => updateSection("photoGallery", { noResultsDescription: e.target.value })} /></Field>
        <Field label="Category Labels"><Textarea value={toLineBlock(value.photoGallery.categoryLabels)} onChange={(e) => updateSection("photoGallery", { categoryLabels: toLineItems(e.target.value) })} /></Field>
        <Field label="Category Subtitles"><Textarea value={toLineBlock(value.photoGallery.categorySubtitles)} onChange={(e) => updateSection("photoGallery", { categorySubtitles: toLineItems(e.target.value) })} /></Field>
      </SectionCard>

      <div className="sticky bottom-4 z-10 flex justify-end">
        <Button
          type="submit"
          disabled={isSaving}
          className="h-12 rounded-2xl px-5 text-base font-semibold shadow-lg"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Website Copy"}
        </Button>
      </div>
    </form>
  );
}
