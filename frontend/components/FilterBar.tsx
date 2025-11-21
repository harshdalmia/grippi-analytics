export default function FilterBar({
  statusFilter,
  onChange,
}: {
  statusFilter: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-900">Campaigns</h2>
      <div className="flex items-center gap-2">
        <label htmlFor="status-filter" className="text-sm text-gray-600">
          Filter by Status:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={onChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Campaigns</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
        </select>
      </div>
    </div>
  );
}
