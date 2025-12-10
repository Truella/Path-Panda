export default function Configuration() {
  return (
    <section>
      <h2 id="configuration" className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">Configuration Options</h2>
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
  );
}
