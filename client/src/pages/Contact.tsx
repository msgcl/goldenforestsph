import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Smartphone, Mail, Globe, MapPin } from "lucide-react";
import { FormEvent, useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useSiteCopy } from "@/hooks/use-site-copy";
import { defaultSiteCopy } from "@shared/siteCopy";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { data: siteCopy } = useSiteCopy();
  const copy = siteCopy?.contact ?? defaultSiteCopy.contact;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact-messages", {
        firstName,
        lastName,
        email,
        message,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      toast({ title: "Message sent", description: "Your message has been received." });
    } catch {
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="mb-10 max-w-4xl">
        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4 border border-primary/20">
          {copy.badge}
        </span>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          {copy.intro}
        </p>
      </div>

      <div className="grid max-w-6xl grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.92fr)] xl:items-start">
        <Card className="border-border/60 bg-[#003a34] shadow-md">
          <CardContent className="p-5 md:p-7">
            <h2 className="mb-2 text-3xl font-outfit text-accent md:text-4xl">{copy.formTitle}</h2>
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-[#F3E9D6]/80">
              {copy.formDescription}
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-base text-accent">
                    {copy.firstNameLabel}
                  </label>
                  <Input
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="h-11 border-accent/20 bg-[#F3E9D6] text-[#1B1B1B] focus-visible:ring-accent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-base text-accent">
                    {copy.lastNameLabel}
                  </label>
                  <Input
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="h-11 border-accent/20 bg-[#F3E9D6] text-[#1B1B1B] focus-visible:ring-accent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-base text-accent">
                  {copy.emailLabel}
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="h-11 border-accent/20 bg-[#F3E9D6] text-[#1B1B1B] focus-visible:ring-accent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-base text-accent">
                  {copy.messageLabel}
                </label>
                <Textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  className="min-h-[140px] border-accent/20 bg-[#F3E9D6] text-[#1B1B1B] focus-visible:ring-accent"
                />
              </div>

              <Button type="submit" className="h-11 w-full text-lg font-semibold" disabled={isSubmitting}>
                {isSubmitting ? copy.submittingLabel : copy.submitLabel}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-md">
          <CardContent className="p-6 md:p-7">
            <div className="mb-5">
              <h3 className="text-2xl font-outfit font-semibold text-foreground">{copy.detailsTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {copy.detailsDescription}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+9710509745232"
                className="block rounded-xl border border-border/60 bg-card p-5 hover-elevate"
              >
                <div className="flex items-start gap-3">
                  <Smartphone className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{copy.mobileLabel}</p>
                    <p className="text-lg font-semibold text-foreground">+971 (0) 50 974 5232</p>
                    <p className="text-lg font-semibold text-foreground">+971 (0) 50 944 0661</p>
                  </div>
                </div>
              </a>

              <a
                href="mailto:office@goldenforests.ai"
                className="block rounded-xl border border-border/60 bg-card p-5 hover-elevate"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{copy.emailInfoLabel}</p>
                    <p className="text-lg font-semibold text-foreground whitespace-nowrap">office@goldenforests.ai</p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.goldenforests.ai/"
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-border/60 bg-card p-5 hover-elevate"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{copy.websiteLabel}</p>
                    <p className="text-lg font-semibold text-foreground whitespace-nowrap">www.goldenforests.ai</p>
                  </div>
                </div>
              </a>

              <div className="w-full rounded-2xl border border-border/60 bg-card p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="w-full space-y-5">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{copy.salesOfficeLabel}</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        Level 25, Al Sila Tower, Al Maryah Island, ADGM, Abu Dhabi, UAE
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{copy.managementOfficeLabel}</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        Level 24, Philippines Stock Exchange Tower, One Bonafacio Street, 5th Ave Cor. 28th Street, BGC, Taguig City, Philippines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  );
}
