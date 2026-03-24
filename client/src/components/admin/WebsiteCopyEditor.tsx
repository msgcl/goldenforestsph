import { useMemo, useState, type ReactNode } from "react";
import {
  Compass,
  Eye,
  FileText,
  Globe2,
  LayoutTemplate,
  PencilLine,
  Save,
  ShieldCheck,
  Sparkles,
  SplitSquareVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { defaultSiteCopy, type SiteCopy } from "@shared/siteCopy";
import { cn } from "@/lib/utils";
import {
  BRAND_FONT_OPTIONS,
  createPageTypography,
  type BrandFontOption,
  type SiteCopyPageKey,
} from "@/lib/siteTypography";

const editorInputClassName =
  "border-white/10 bg-[#0f312b] text-[#f7f3ea] placeholder:text-[#f7f3ea]/35 focus-visible:ring-[#f5d5a1] focus-visible:ring-offset-[#123831]";

const editorSelectClassName =
  "h-11 w-full rounded-xl border border-white/10 bg-[#0f312b] px-3 text-sm text-[#f7f3ea] outline-none transition focus:border-[#f5d5a1]/60 focus:ring-2 focus:ring-[#f5d5a1] focus:ring-offset-2 focus:ring-offset-[#123831]";

type WebsiteCopyEditorProps = {
  value: SiteCopy;
  isSaving: boolean;
  onSubmit: () => void;
  onChange: (value: SiteCopy) => void;
};

type FieldDescriptor = {
  path: string;
  label: string;
  value: string | string[];
  isArray: boolean;
  multiline: boolean;
};

type ViewMode = "edit" | "preview" | "split";

const pageCatalog: Array<{
  key: SiteCopyPageKey;
  label: string;
  eyebrow: string;
  description: string;
}> = [
  { key: "home", label: "Home", eyebrow: "Landing Page", description: "Hero messaging, metrics, highlights, and homepage snapshot copy." },
  { key: "about", label: "About", eyebrow: "Overview", description: "Corporate profile, overview narratives, and operating mandate." },
  { key: "compliance", label: "Compliance", eyebrow: "Regulatory", description: "Legal positioning, highlight items, and mandate descriptions." },
  { key: "technology", label: "Technology", eyebrow: "AI Stack", description: "Technology stack messaging and operational benefits." },
  { key: "impact", label: "Impact", eyebrow: "Impact Page", description: "Environmental and social impact language." },
  { key: "clientServices", label: "Client Services", eyebrow: "Client Care", description: "Ownership, reporting, and visitation services copy." },
  { key: "mangoProgram", label: "Mango Program", eyebrow: "Program Detail", description: "Mango program overview, benefits, and return snapshot." },
  { key: "agarwoodLifeCycle", label: "Agarwood Life Cycle", eyebrow: "Program Detail", description: "Agarwood lifecycle, insurance, and commercial model copy." },
  { key: "ecotourism", label: "Ecotourism", eyebrow: "Travel", description: "Travel program details, routes, and destination copy." },
  { key: "contact", label: "Contact", eyebrow: "Contact Page", description: "Contact labels, office details, and support microcopy." },
  { key: "nursery", label: "Nursery", eyebrow: "Operations", description: "Nursery metrics, propagation text, and technology notes." },
  { key: "plantation", label: "Plantation", eyebrow: "Operations", description: "Field deployment, lifecycle, and milestone messaging." },
  { key: "management", label: "Management", eyebrow: "Leadership", description: "Management page intro, helper text, and category labels." },
  { key: "photoGallery", label: "Photo Gallery", eyebrow: "Media Archive", description: "Gallery hero, browsing labels, and archive microcopy." },
];

function formatTimestamp(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Not published yet";
  return parsed.toLocaleString();
}

function startCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\./g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function buildFieldLabel(path: string) {
  return path
    .split(".")
    .map((segment) => startCase(segment))
    .join(" / ");
}

function getValueAtPath(source: unknown, path: string[]) {
  return path.reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[key];
  }, source);
}

function updateValueAtPath<T>(source: T, path: string[], nextValue: unknown): T {
  if (path.length === 0) return source;

  const [head, ...rest] = path;
  const currentRecord = (source as Record<string, unknown>) ?? {};

  return {
    ...currentRecord,
    [head]:
      rest.length === 0
        ? nextValue
        : updateValueAtPath((currentRecord[head] as Record<string, unknown>) ?? {}, rest, nextValue),
  } as T;
}

function collectTextFields(source: Record<string, unknown>, prefix = ""): FieldDescriptor[] {
  return Object.entries(source).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      return [
        {
          path,
          label: buildFieldLabel(path),
          value,
          isArray: false,
          multiline: value.length > 90 || /description|intro|paragraph|details|helper|footnote/i.test(path),
        },
      ];
    }

    if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
      return [
        {
          path,
          label: buildFieldLabel(path),
          value: value as string[],
          isArray: true,
          multiline: true,
        },
      ];
    }

    if (value && typeof value === "object") {
      return collectTextFields(value as Record<string, unknown>, path);
    }

    return [];
  });
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

function SurfaceCard({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="overflow-hidden border border-white/10 bg-[linear-gradient(180deg,#102f2a_0%,#0d2723_100%)] text-white shadow-xl">
      <CardHeader className="border-b border-white/10 bg-[linear-gradient(180deg,#17463e_0%,#123831_100%)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5d5a1]/85">Website Copy</p>
            <CardTitle className="mt-2 text-2xl font-outfit text-white">{title}</CardTitle>
            {description ? <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/65">{description}</p> : null}
          </div>
          {actions}
        </div>
      </CardHeader>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

export function WebsiteCopyEditor({
  value,
  isSaving,
  onSubmit,
  onChange,
}: WebsiteCopyEditorProps) {
  const [selectedPage, setSelectedPage] = useState<SiteCopyPageKey>("home");
  const [viewMode, setViewMode] = useState<ViewMode>("split");

  const selectedPageMeta = pageCatalog.find((page) => page.key === selectedPage) ?? pageCatalog[0];
  const selectedPageValue = value[selectedPage] as Record<string, unknown>;
  const fields = useMemo(() => collectTextFields(selectedPageValue), [selectedPageValue]);
  const selectedPageTypography = value.typography[selectedPage];
  const previewFont = createPageTypography(value, selectedPage);

  const updateFieldValue = (path: string, nextValue: string) => {
    const pathParts = path.split(".");
    const currentValue = getValueAtPath(value[selectedPage], pathParts);
    const resolvedValue = Array.isArray(currentValue)
      ? nextValue
          .split(/\r?\n/)
          .map((item) => item.trim())
          .filter(Boolean)
      : nextValue;

    onChange({
      ...value,
      [selectedPage]: updateValueAtPath(value[selectedPage], pathParts, resolvedValue),
    });
  };

  const updateFieldFont = (path: string, nextFont: "default" | BrandFontOption) => {
    const currentPageTypography = value.typography[selectedPage];
    const nextTypography =
      nextFont === "default"
        ? Object.fromEntries(Object.entries(currentPageTypography).filter(([key]) => key !== path))
        : {
            ...currentPageTypography,
            [path]: nextFont,
          };

    onChange({
      ...value,
      typography: {
        ...value.typography,
        [selectedPage]: nextTypography,
      },
    });
  };

  const showEditor = viewMode === "edit" || viewMode === "split";
  const showPreview = viewMode === "preview" || viewMode === "split";

  return (
    <form
      className="space-y-6 [&_input]:border-white/10 [&_input]:bg-[#0f312b] [&_input]:text-[#f7f3ea] [&_input]:placeholder:text-[#f7f3ea]/35 [&_textarea]:border-white/10 [&_textarea]:bg-[#0f312b] [&_textarea]:text-[#f7f3ea] [&_textarea]:placeholder:text-[#f7f3ea]/35"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Card className="overflow-hidden border-none bg-[linear-gradient(135deg,#0b3029_0%,#11483f_58%,#1a5a4e_100%)] text-white shadow-xl">
        <CardContent className="p-6 md:p-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-end">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f5d5a1]">Editorial Workspace</p>
              <h2 className="mt-3 text-3xl font-outfit font-semibold tracking-tight md:text-4xl">Website Copy Studio</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
                Choose a page, edit every available text field, preview the selected page’s copy layout, and assign approved brand fonts per text block before publishing.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <EditorMetric icon={ShieldCheck} label="Mode" value="Safe Copy" />
                <EditorMetric icon={Compass} label="Selected Page" value={selectedPageMeta.label} />
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

      <SurfaceCard
        title="Page Navigator"
        description="Focus the editor on one public-facing page at a time. The preview panel updates instantly as you edit."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {pageCatalog.map((page) => (
            <button
              key={page.key}
              type="button"
              onClick={() => setSelectedPage(page.key)}
              className={cn(
                "rounded-[1.35rem] border p-4 text-left transition-all duration-200",
                selectedPage === page.key
                  ? "border-[#f5d5a1]/40 bg-[linear-gradient(135deg,#1a5a4e_0%,#123831_100%)] shadow-lg"
                  : "border-white/10 bg-white/5 hover:border-[#f5d5a1]/25 hover:bg-white/10",
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5d5a1]">{page.eyebrow}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{page.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{page.description}</p>
            </button>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard
        title={`${selectedPageMeta.label} Studio`}
        description={`All text content currently available for ${selectedPageMeta.label.toLowerCase()} is editable below. Each field can inherit the default page typography or switch to an approved brand font.`}
        actions={
          <div className="flex flex-wrap gap-2">
            {[
              { key: "edit", label: "Edit", icon: PencilLine },
              { key: "preview", label: "Preview", icon: Eye },
              { key: "split", label: "Split", icon: SplitSquareVertical },
            ].map((mode) => (
              <Button
                key={mode.key}
                type="button"
                variant={viewMode === mode.key ? "default" : "outline"}
                className={cn(
                  "rounded-xl",
                  viewMode === mode.key ? "bg-[#f5d5a1] text-[#0f2f29] hover:bg-[#f0ca8f]" : "border-white/15 bg-white/5 text-white hover:bg-white/10",
                )}
                onClick={() => setViewMode(mode.key as ViewMode)}
              >
                <mode.icon className="mr-2 h-4 w-4" />
                {mode.label}
              </Button>
            ))}
          </div>
        }
      >
        <div
          className={cn(
            "grid gap-5",
            showEditor && showPreview ? "xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]" : "grid-cols-1",
          )}
        >
          {showEditor ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5d5a1]">Editable Fields</p>
                  <p className="mt-1 text-sm text-white/65">{fields.length} text block{fields.length === 1 ? "" : "s"} available on this page.</p>
                </div>
                <LayoutTemplate className="h-5 w-5 text-[#f5d5a1]" />
              </div>

              <div className="grid gap-4">
                {fields.map((field) => {
                  const currentFont = selectedPageTypography[field.path];
                  const fieldText = Array.isArray(field.value) ? field.value.join("\n") : field.value;

                  return (
                    <div key={field.path} className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,#123831_0%,#102f2a_100%)] p-4 shadow-sm">
                      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px]">
                        <div>
                          <Label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d7c39d]/85">
                            {field.label}
                          </Label>
                          <div className="mt-3">
                            {field.multiline || field.isArray ? (
                              <Textarea
                                className={cn(editorInputClassName, "min-h-[120px]")}
                                value={fieldText}
                                onChange={(event) => updateFieldValue(field.path, event.target.value)}
                              />
                            ) : (
                              <Input
                                className={editorInputClassName}
                                value={fieldText}
                                onChange={(event) => updateFieldValue(field.path, event.target.value)}
                              />
                            )}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <Label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d7c39d]/85">
                            Font Style
                          </Label>
                          <select
                            className={cn(editorSelectClassName, "mt-3")}
                            value={currentFont ?? "default"}
                            onChange={(event) => updateFieldFont(field.path, event.target.value as "default" | BrandFontOption)}
                          >
                            {BRAND_FONT_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <p className="mt-3 text-xs leading-relaxed text-white/60">
                            This selection applies to the matching live text block on the public page after save.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {showPreview ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5d5a1]">Preview Mode</p>
                    <p className="mt-1 text-sm text-white/65">Live mock-up of the selected page’s editable text blocks.</p>
                  </div>
                  <Eye className="h-5 w-5 text-[#f5d5a1]" />
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-[#f5d5a1]/18 bg-[linear-gradient(180deg,#f7f3ea_0%,#efe4cf_100%)] p-5 text-[#17392E] shadow-[0_24px_44px_rgba(0,0,0,0.12)]">
                <div className="mb-5 rounded-[1.3rem] border border-[#17392E]/10 bg-white/65 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9a7a47]">{selectedPageMeta.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#17392E]">{selectedPageMeta.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4b5f57]">{selectedPageMeta.description}</p>
                </div>

                <div className="space-y-3">
                  {fields.map((field) => {
                    const previewValue = Array.isArray(field.value) ? field.value.join(" • ") : field.value;
                    return (
                      <div key={field.path} className="rounded-[1.1rem] border border-[#17392E]/10 bg-white/70 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d6d3d]">{field.label}</p>
                        <p className={previewFont(field.path, "mt-2 text-sm leading-relaxed text-[#17392E]")}>
                          {previewValue}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </SurfaceCard>

      <Card className="border border-white/10 bg-[linear-gradient(180deg,#12362f_0%,#0f2e29_100%)] text-white shadow-lg">
        <CardContent className="grid gap-4 p-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5d5a1]/10">
                <ShieldCheck className="h-5 w-5 text-[#f5d5a1]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Protected layout system</p>
                <p className="text-xs leading-relaxed text-white/65">Layout and non-copy behavior remain protected while text and approved font overrides stay editable.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5d5a1]/10">
                <FileText className="h-5 w-5 text-[#f5d5a1]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Full field coverage</p>
                <p className="text-xs leading-relaxed text-white/65">Every text field exposed in the selected page data model is available here automatically.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5d5a1]/10">
                <Sparkles className="h-5 w-5 text-[#f5d5a1]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Live publish action</p>
                <p className="text-xs leading-relaxed text-white/65">Saved copy and font changes are written to the same site-copy payload used by the public website.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="sticky bottom-4 z-10 flex justify-end">
        <Button
          type="submit"
          disabled={isSaving}
          className="h-12 rounded-2xl px-5 text-base font-semibold shadow-lg"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Website Copy"}
        </Button>
      </div>
    </form>
  );
}
