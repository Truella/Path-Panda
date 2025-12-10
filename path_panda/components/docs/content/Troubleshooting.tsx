export default function Troubleshooting() {
  return (
    <section>
      <h2 id="troubleshooting" className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">Troubleshooting</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Element not found (incorrect CSS selector)</li>
          <li>Script doesn’t load (missing path)</li>
          <li>Tour doesn’t start (no active steps defined)</li>
          <li>Avatar overlapping elements (adjust position or theme)</li>
      </ul>
    </section>
  );
}
