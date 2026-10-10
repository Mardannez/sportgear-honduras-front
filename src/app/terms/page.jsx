export const metadata = {
  title: 'Total Work Reports POC – Terms of Service',
  description: 'Terms of Service for the Total Work Reports proof of concept.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8 sm:py-16">
      <article className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold leading-tight sm:text-4xl">
          Total Work Reports POC – Terms of Service
        </h1>

        <div className="space-y-5 text-base leading-7">
          <p>
            Total Work Reports POC is a temporary proof of concept created to evaluate the
            generation of Work Execution Reports through WhatsApp.
          </p>
          <p>The service is intended only for authorized testing users.</p>
          <p>
            Users may submit text messages and photographs through WhatsApp for the purpose of
            testing report creation and PDF generation.
          </p>
          <p>Users must only submit information and files they are authorized to use.</p>
          <p>
            The proof of concept is provided for testing and evaluation purposes only and may be
            modified, interrupted, or discontinued at any time.
          </p>
          <p>
            The generated reports should not be considered final or official business documents
            unless they have been reviewed and approved by an authorized representative.
          </p>
          <p>Users are responsible for verifying the accuracy of the information they submit.</p>

          <section aria-labelledby="terms-contact">
            <h2 id="terms-contact" className="mb-2 text-xl font-semibold">
              Contact
            </h2>
            <p>For questions regarding this proof of concept, contact:</p>
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
