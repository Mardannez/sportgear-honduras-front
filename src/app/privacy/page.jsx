export const metadata = {
  title: 'Total Work Reports POC – Privacy Policy',
  description: 'Privacy Policy for the Total Work Reports proof of concept.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8 sm:py-16">
      <article className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold leading-tight sm:text-4xl">
          Total Work Reports POC – Privacy Policy
        </h1>

        <div className="space-y-5 text-base leading-7">
          <p>
            This application is a temporary proof of concept developed to test the integration of
            WhatsApp Business with the Total Dashboard platform.
          </p>

          <section aria-labelledby="information-processed">
            <h2 id="information-processed" className="mb-3 text-xl font-semibold">
              Information processed
            </h2>
            <p>
              The application may process information voluntarily submitted by authorized test users
              through WhatsApp, including:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>WhatsApp phone number</li>
              <li>Text messages</li>
              <li>Photographs and images</li>
              <li>Report title</li>
              <li>Client name</li>
              <li>Work execution information submitted for report generation</li>
            </ul>
          </section>

          <p>
            This information is used exclusively to test the creation and generation of Work
            Execution Reports.
          </p>
          <p>
            Information collected during the proof of concept is not sold or used for advertising
            purposes.
          </p>
          <p>Access to the application is intended only for authorized testing users.</p>
          <p>
            Data may be temporarily processed or stored by services involved in the proof of
            concept, including WhatsApp Business Cloud, n8n, Total Dashboard, Google Cloud Storage,
            and Google Vertex AI.
          </p>

          <section aria-labelledby="privacy-contact">
            <h2 id="privacy-contact" className="mb-2 text-xl font-semibold">
              Contact
            </h2>
            <p>
              For questions regarding this proof of concept or its data processing practices,
              contact:
            </p>
            <a
              className="font-semibold text-primary underline underline-offset-4"
              href="mailto:dantrochez88@gmail.com"
            >
              dantrochez88@gmail.com
            </a>
          </section>

          <p className="pt-4 text-sm text-muted-foreground">Last updated: October 2026.</p>
        </div>
      </article>
    </main>
  );
}
