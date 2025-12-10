export default function Installation() {
  return (
    <section>
      <h2 id="installation" className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">Installation</h2>
      <p className="mb-4 text-lg text-gray-700">Include the script on your website by adding the following line to your HTML&apos;s `&lt;head&gt;` section:</p>
      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
        <code>
          {`<script src="https://your-domain.com/tour.js" data-tour-id="YOUR_ID"></script>`}
        </code>
      </pre>
    </section>
  );
}
