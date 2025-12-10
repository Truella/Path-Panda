export default function Faq() {
  return (
    <section>
      <h2 id="faq" className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">Developer FAQ</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Bundle size limits</li>
          <li>Lazy-loading behavior</li>
          <li>Caching & CDN recommendations</li>
          <li>Supporting multiple tours on one page</li>
      </ul>
    </section>
  );
}
