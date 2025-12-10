export default function Initialization() {
  return (
    <section>
      <h2 id="initialization" className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">Initialization Example</h2>
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
  );
}
