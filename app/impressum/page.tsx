import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Impressum — Hush",
  description: "Impressum für hushscreentime.com",
};

export default function Impressum(): ReactNode {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
      <a
        href="/"
        className="text-sm font-semibold text-accent transition-colors hover:text-foreground"
      >
        &larr; Back to home
      </a>

      <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Impressum
      </h1>

      <div className="mt-12 space-y-8 text-base leading-relaxed text-muted [&_strong]:text-foreground [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-foreground">
        <p>Angaben gem&auml;&szlig; &sect; 5 DDG</p>

        <p>
          Hush Labs UG (haftungsbeschr&auml;nkt)
          <br />
          <br />
          Libauer Str. 8
          <br />
          10245 Berlin
        </p>

        <div>
          <strong>Vertreten durch:</strong>
          <br />
          Patrick Franke
          <br />
          Aeloch Kim
        </div>

        <div>
          <strong>Registereintrag:</strong>
          <br />
          Eintragung im Handelsregister.
          <br />
          Registergericht: Berlin
          <br />
          Registernummer: <em>to be filled out</em>
        </div>

        <div>
          <strong>Umsatzsteuer-ID:</strong>
          <br />
          Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect;27a
          Umsatzsteuergesetz: <em>Ust-ID</em>
          <br />
          <br />
          <strong>Wirtschafts-ID:</strong>
          <br />
          <em>Wirtschafts-ID</em>
        </div>

        <div>
          <strong>
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </strong>
          <br />
          Wir nehmen an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teil. Zust&auml;ndig ist die
          Universalschlichtungsstelle des Zentrums f&uuml;r Schlichtung e.V.,
          Stra&szlig;burger Stra&szlig;e 8, 77694 Kehl am Rhein, Website:{" "}
          <a
            href="https://www.verbraucher-schlichter.de"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.verbraucher-schlichter.de
          </a>
          .
        </div>

        <div>
          <strong>Datenschutzerkl&auml;rung</strong>
          <br />
          Unter dem folgenden Link finden Sie unsere{" "}
          <a href="/privacy">Datenschutzerkl&auml;rung</a>.
        </div>
      </div>
    </div>
  );
}
