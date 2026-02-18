import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy — Hush",
  description: "Privacy policy for hushscreentime.com",
};

export default function PrivacyPolicy(): ReactNode {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
      <a
        href="/"
        className="text-sm font-semibold text-accent transition-colors hover:text-foreground"
      >
        &larr; Back to home
      </a>

      <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: February 18, 2026</p>

      <div className="mt-12 space-y-10 text-base leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:mt-0 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_strong]:text-foreground [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        <section>
          <h2>1. Introduction</h2>
          <p>
            This privacy policy explains how Hush Labs UG
            (haftungsbeschr&auml;nkt) (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) collects, uses, and protects your personal data
            when you visit <strong>hushscreentime.com</strong> (&ldquo;the
            Website&rdquo;). We are committed to protecting your privacy in
            accordance with the General Data Protection Regulation (GDPR) and
            other applicable data protection laws.
          </p>
        </section>

        <section>
          <h2>2. Data Controller</h2>
          <p>
            The data controller responsible for your personal data is:
          </p>
          <p className="mt-2">
            Hush Labs UG (haftungsbeschr&auml;nkt)
            <br />
            Libauer Str. 8
            <br />
            10245 Berlin, Germany
            <br />
            Represented by: Patrick Franke, Aeloch Kim
            <br />
            <br />
            Email:{" "}
            <a href="mailto:hi@hushscreentime.com">hi@hushscreentime.com</a>
          </p>
        </section>

        <section>
          <h2>3. Data We Collect</h2>
          <p>We collect the following personal data:</p>
          <ul className="mt-2">
            <li>
              <strong>Email address</strong> — when you sign up for our waitlist
              via the form on the Website.
            </li>
          </ul>
          <p className="mt-2">
            We do not collect any other personal data through the Website. We do
            not use cookies for tracking purposes.
          </p>
        </section>

        <section>
          <h2>4. Purpose and Legal Basis</h2>
          <p>We process your email address for the following purpose:</p>
          <ul className="mt-2">
            <li>
              <strong>Waitlist registration</strong> — to notify you when Hush
              launches and to send you relevant product updates. The legal basis
              is your consent (Art. 6(1)(a) GDPR), which you provide by
              submitting the waitlist form.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Third-Party Services</h2>
          <p>We use the following third-party services to operate the Website:</p>
          <ul className="mt-2">
            <li>
              <strong>Vercel</strong> (Vercel Inc., San Francisco, USA) — hosting
              and deployment of the Website, including Vercel Analytics for
              anonymous, aggregated usage statistics. Vercel Analytics does not
              use cookies and does not collect personal data. See{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel&apos;s privacy policy
              </a>
              .
            </li>
            <li>
              <strong>Supabase</strong> (Supabase Inc., San Francisco, USA) —
              database hosting for storing waitlist email addresses. See{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Supabase&apos;s privacy policy
              </a>
              .
            </li>
          </ul>
          <p className="mt-2">
            Both services may process data in the United States. Appropriate
            safeguards are in place in accordance with GDPR requirements,
            including Standard Contractual Clauses (SCCs).
          </p>
        </section>

        <section>
          <h2>6. Data Retention</h2>
          <p>
            We retain your email address for as long as necessary to fulfill the
            purpose of the waitlist, or until you request its deletion. After the
            product launch, waitlist data will be deleted unless you have opted
            into further communications.
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <p>Under the GDPR, you have the right to:</p>
          <ul className="mt-2">
            <li>
              <strong>Access</strong> — request a copy of the personal data we
              hold about you.
            </li>
            <li>
              <strong>Rectification</strong> — request correction of inaccurate
              data.
            </li>
            <li>
              <strong>Erasure</strong> — request deletion of your data
              (&ldquo;right to be forgotten&rdquo;).
            </li>
            <li>
              <strong>Withdrawal of consent</strong> — withdraw your consent at
              any time, without affecting the lawfulness of processing based on
              consent before its withdrawal.
            </li>
            <li>
              <strong>Data portability</strong> — receive your data in a
              structured, machine-readable format.
            </li>
            <li>
              <strong>Lodge a complaint</strong> — file a complaint with a
              supervisory authority.
            </li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:hi@hushscreentime.com">hi@hushscreentime.com</a>.
          </p>
        </section>

        <section>
          <h2>8. Security</h2>
          <p>
            We take appropriate technical and organizational measures to protect
            your personal data against unauthorized access, alteration,
            disclosure, or destruction. All data in transit is encrypted via
            HTTPS. Access to stored data is restricted to authorized personnel.
          </p>
        </section>

        <section>
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will
            be posted on this page with an updated revision date. We encourage
            you to review this page periodically.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            If you have any questions about this privacy policy or our data
            practices, please contact us at:
          </p>
          <p className="mt-2">
            Hush Labs UG (haftungsbeschr&auml;nkt)
            <br />
            Libauer Str. 8, 10245 Berlin, Germany
            <br />
            Email:{" "}
            <a href="mailto:hi@hushscreentime.com">hi@hushscreentime.com</a>
          </p>
          <p className="mt-2">
            For our full legal details, see our{" "}
            <a href="/impressum">Impressum</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
