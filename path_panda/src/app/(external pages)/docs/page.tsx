'use client';

export default function DocsPage() {
  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      <section className="bg-white py-20 text-center shadow-sm">
        <h1 className="text-5xl font-bold text-[#2d2d2f]">Documentation</h1>
        <p className="mt-4 text-[#2d2d2f]/80 max-w-2xl mx-auto text-lg sm:text-xl">
          Everything you need to know to get started with PathPanda.
        </p>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Installation Section */}
          <section>
            <h2 className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">1. Installation</h2>
            <p className="mb-4 text-lg text-gray-700">Include the script on your website by adding the following line to your HTML&apos;s `&lt;head&gt;` section:</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              <code>
                {`<script src="https://your-domain.com/tour.js" data-tour-id="YOUR_ID"></script>`}
              </code>
            </pre>
          </section>

          {/* Initialization Example Section */}
          <section>
            <h2 className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">2. Initialization Example</h2>
            <p className="mb-4 text-lg text-gray-700">Initialize the tour on your page with a JavaScript snippet like this:</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              <code>
                {`window.Tour.init({
  steps: [
    { id: "step-1", target: "#navbar", message: "This is your navigation" },
    { id: "step-2", target: "#hero", message: "Start exploring here" }
  ]
});`}
              </code>
            </pre>
          </section>

          {/* Configuration Options Section */}
          <section>
            <h2 className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">3. Configuration Options</h2>
            <p className="mb-4 text-lg text-gray-700">Customize the tour by passing these options to the `init` method:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>steps:</strong> Array of step objects.</li>
              <li><strong>animationSpeed:</strong> Speed of transitions between steps.</li>
              <li><strong>themeColors:</strong> Customize the color scheme.</li>
              <li><strong>avatar:</strong> Show or hide the tour guide avatar (true/false).</li>
              <li><strong>showProgress:</strong> Display a progress indicator (true/false).</li>
              <li><strong>position:</strong> Position of the tour popover (&apos;top&apos;, &apos;bottom&apos;, &apos;center&apos;).</li>
            </ul>
          </section>
          
          {/* Using the Dashboard Section */}
          <section>
            <h2 className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">4. Using the Dashboard</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Create a new tour</li>
                <li>Add/edit/delete steps</li>
                <li>Assign unique step IDs and selectors</li>
                <li>Generate embed code</li>
                <li>View analytics for user flow and completion</li>
                <li>Manage multiple tours</li>
            </ul>
          </section>

          {/* Troubleshooting Section */}
          <section>
            <h2 className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">5. Troubleshooting</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Element not found (incorrect CSS selector)</li>
                <li>Script doesn’t load (missing path)</li>
                <li>Tour doesn’t start (no active steps defined)</li>
                <li>Avatar overlapping elements (adjust position or theme)</li>
            </ul>
          </section>

          {/* Developer FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">6. Developer FAQ</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Bundle size limits</li>
                <li>Lazy-loading behavior</li>
                <li>Caching & CDN recommendations</li>
                <li>Supporting multiple tours on one page</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
