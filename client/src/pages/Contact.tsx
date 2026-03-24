import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Mail, Globe, MapPin, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";
import { createPageTypography } from "@/lib/siteTypography";

const PIPEDRIVE_FORM_URL =
  "https://webforms.pipedrive.com/f/ccFXKfVy5hM7bSUc7TncVRQZb2ZjziEa2mp80r9GPdeGh6WdNUurWsIIM6eEqUZGH9";
const PIPEDRIVE_LOADER_URL = "https://webforms.pipedrive.com/f/loader";

export default function Contact() {
  const { data: siteCopy } = useSiteCopy();
  const resolvedSiteCopy = siteCopy ?? defaultSiteCopy;
  const copy = resolvedSiteCopy.contact;
  const font = createPageTypography(resolvedSiteCopy, "contact");
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(true);

  useEffect(() => {
    const container = formContainerRef.current;
    if (!container) return;

    setIsFormLoading(true);
    container.innerHTML = "";
    container.setAttribute("data-pd-webforms", PIPEDRIVE_FORM_URL);
    container.className = "pipedriveWebForms min-h-[420px]";

    const script = document.createElement("script");
    script.src = PIPEDRIVE_LOADER_URL;
    script.async = true;
    container.appendChild(script);

    const interval = window.setInterval(() => {
      const iframe = container.querySelector("iframe");
      if (!iframe) return;

      const markLoaded = () => setIsFormLoading(false);
      iframe.addEventListener("load", markLoaded, { once: true });

      if ((iframe as HTMLIFrameElement).contentWindow || iframe.getAttribute("src")) {
        window.setTimeout(markLoaded, 250);
      }

      window.clearInterval(interval);
    }, 200);

    const timeout = window.setTimeout(() => {
      setIsFormLoading(false);
      window.clearInterval(interval);
    }, 8000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      container.innerHTML = "";
    };
  }, []);

  return (
    <AnimatedPage>
      <div className="mb-10 max-w-4xl">
        <span className={font("badge", "inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4 border border-primary/20")}>
          {copy.badge}
        </span>
        <p className={font("intro", "text-lg md:text-xl text-muted-foreground max-w-4xl leading-relaxed")}>
          {copy.intro}
        </p>
      </div>

      <div className="max-w-6xl space-y-6">
        <Card className="border-[#D8C9B1] bg-[linear-gradient(180deg,#F6EFE2_0%,#EFE4CF_100%)] shadow-[0_24px_54px_rgba(88,65,32,0.12)]">
          <CardContent className="p-5 md:p-7">
            <h2 className={font("formTitle", "mb-2 text-3xl text-[#6F4E2C] md:text-4xl")}>{copy.formTitle}</h2>
            <p className={font("formDescription", "mb-6 max-w-2xl text-sm leading-relaxed text-[#6A5A44]")}>
              {copy.formDescription}
            </p>
            <div className="contact-pipedrive-frame">
              <div className="contact-pipedrive-shell mx-auto w-full max-w-[820px]">
                {isFormLoading ? (
                  <div className="contact-pipedrive-loading">
                    <div className="contact-pipedrive-loading-panel">
                      <LoaderCircle className="h-6 w-6 animate-spin text-[#8A673E]" />
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8A673E]">
                          Loading Form
                        </p>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-[#6A5A44]">
                          Preparing the secure Pipedrive form. This can take a few seconds while the CRM widget loads.
                        </p>
                      </div>
                    </div>
                    <div className="contact-pipedrive-skeleton-grid" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                ) : null}
                <div
                  ref={formContainerRef}
                  className={`pipedriveWebForms min-h-[420px] transition-opacity duration-500 ${isFormLoading ? "opacity-0" : "opacity-100"}`}
                  data-pd-webforms={PIPEDRIVE_FORM_URL}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <div className="max-w-2xl">
            <h3 className={font("detailsTitle", "text-2xl font-semibold text-foreground")}>{copy.detailsTitle}</h3>
            <p className={font("detailsDescription", "mt-2 text-sm leading-relaxed text-muted-foreground")}>
              {copy.detailsDescription}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:auto-rows-fr">
            <a
              href="tel:+9710509745232"
              className="contact-detail-card block h-full rounded-xl p-5 hover-elevate"
            >
              <div className="flex items-start gap-3">
                <Smartphone className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className={font("mobileLabel", "text-xs uppercase tracking-wider text-[#7A6240]")}>{copy.mobileLabel}</p>
                  {copy.phoneNumbers.map((phone, index) => (
                    <p key={`${phone}-${index}`} className={font("phoneNumbers", index === 0 ? "mt-2 text-base font-semibold leading-relaxed text-[#2F2417]" : "text-base font-semibold leading-relaxed text-[#2F2417]")}>
                      {phone}
                    </p>
                  ))}
                </div>
              </div>
            </a>

            <a
              href={copy.emailHref}
              className="contact-detail-card block h-full rounded-xl p-5 hover-elevate"
            >
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className={font("emailInfoLabel", "text-xs uppercase tracking-wider text-[#7A6240]")}>{copy.emailInfoLabel}</p>
                  <p className={font("emailValue", "mt-2 text-base font-semibold leading-relaxed text-[#2F2417] break-words")}>{copy.emailValue}</p>
                </div>
              </div>
            </a>

            <a
              href={copy.websiteHref}
              target="_blank"
              rel="noreferrer"
              className="contact-detail-card block h-full rounded-xl p-5 hover-elevate"
            >
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className={font("websiteLabel", "text-xs uppercase tracking-wider text-[#7A6240]")}>{copy.websiteLabel}</p>
                  <p className={font("websiteValue", "mt-2 text-base font-semibold leading-relaxed text-[#2F2417] break-words")}>{copy.websiteValue}</p>
                </div>
              </div>
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:auto-rows-fr">
            <div className="contact-detail-card h-full rounded-xl p-5">
              <div className="flex h-full items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className={font("holdingCompanyLabel", "text-xs uppercase tracking-wider text-[#7A6240]")}>{copy.holdingCompanyLabel}</p>
                  <address className={font("holdingCompanyAddress", "mt-2 not-italic text-base font-semibold leading-relaxed text-[#2F2417]")}>
                    {copy.holdingCompanyAddress.map((line, index) => (
                      <p key={`${line}-${index}`} className={index === 0 ? "" : "mt-3"}>
                        {line}
                      </p>
                    ))}
                  </address>
                </div>
              </div>
            </div>

            <div className="contact-detail-card h-full rounded-xl p-5">
              <div className="flex h-full items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className={font("salesOfficeTitle", "text-xs uppercase tracking-wider text-[#7A6240]")}>{copy.salesOfficeTitle}</p>
                  <address className="mt-2 not-italic text-base font-semibold leading-relaxed text-[#2F2417]">
                    <p className={font("salesOfficeCompany", "mb-4")}>{copy.salesOfficeCompany}</p>
                    {copy.salesOfficeAddress.map((line, index) => (
                      <p
                        key={`${line}-${index}`}
                        className={font("salesOfficeAddress", index === 0 ? "" : "mt-3")}
                      >
                        {line}
                      </p>
                    ))}
                  </address>
                </div>
              </div>
            </div>

            <div className="contact-detail-card h-full rounded-xl p-5">
              <div className="flex h-full items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className={font("managementOfficeLabel", "text-xs uppercase tracking-wider text-[#7A6240]")}>{copy.managementOfficeLabel}</p>
                  <address className={font("managementOfficeAddress", "mt-2 not-italic text-base font-semibold leading-relaxed text-[#2F2417]")}>
                    {copy.managementOfficeAddress.map((line, index) => (
                      <p key={`${line}-${index}`} className={index === 0 ? "" : "mt-3"}>
                        {line}
                      </p>
                    ))}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
