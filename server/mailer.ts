import nodemailer from "nodemailer";

type ContactEmailInput = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  submittedAt: Date;
};

function readBooleanEnv(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  return value.toLowerCase() === "true";
}

function readNumberEnv(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getMailConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL || "office@goldenforests.ai";

  if (!host || !user || !pass || !to) {
    return null;
  }

  return {
    host,
    port: readNumberEnv(process.env.SMTP_PORT, 587),
    secure: readBooleanEnv(process.env.SMTP_SECURE, false),
    user,
    pass,
    to,
    from: process.env.CONTACT_FROM_EMAIL || user,
  };
}

export function isContactEmailEnabled() {
  return getMailConfig() !== null;
}

export async function sendContactFormEmail(input: ContactEmailInput) {
  const config = getMailConfig();
  if (!config) {
    return { enabled: false as const };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const fullName = `${input.firstName} ${input.lastName}`.trim();
  const safeMessage = escapeHtml(input.message).replace(/\r?\n/g, "<br />");
  const submittedAt = input.submittedAt.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: input.email,
    subject: `New contact form submission from ${fullName}`,
    text: [
      "A new contact form message was submitted.",
      "",
      `Name: ${fullName}`,
      `Email: ${input.email}`,
      `Submitted: ${submittedAt}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #1b1b1b; line-height: 1.6;">
        <h2 style="margin-bottom: 12px;">New contact form message</h2>
        <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p style="margin: 0 0 16px;"><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
        <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
        <div style="padding: 12px; border: 1px solid #d8d8d8; border-radius: 8px; background: #fafafa;">
          ${safeMessage}
        </div>
      </div>
    `,
  });

  return { enabled: true as const };
}
