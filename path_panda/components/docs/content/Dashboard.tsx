export default function Dashboard() {
  return (
    <section>
      <h2 id="dashboard" className="text-3xl font-bold text-[#2d2d2f] border-b pb-2 mb-6">Using the Dashboard</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Create a new tour</li>
          <li>Add/edit/delete steps</li>
          <li>Assign unique step IDs and selectors</li>
          <li>Generate embed code</li>
          <li>View analytics for user flow and completion</li>
          <li>Manage multiple tours</li>
      </ul>
    </section>
  );
}
