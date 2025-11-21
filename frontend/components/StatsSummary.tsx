import { Campaign } from '../types/campaign';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num);
}

export default function StatsSummary({ campaigns }: { campaigns: Campaign[] }) {
  const totalCampaigns = campaigns.length;
  const activeCount = campaigns.filter((c) => c.status === 'Active').length;
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalCost = campaigns.reduce((sum, c) => sum + c.cost, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-sm mb-1">Total Campaigns</p>
        <p className="text-2xl font-bold text-gray-900">{totalCampaigns}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-sm mb-1">Active Campaigns</p>
        <p className="text-2xl font-bold text-green-600">{activeCount}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-sm mb-1">Total Clicks</p>
        <p className="text-2xl font-bold text-blue-600">{formatNumber(totalClicks)}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-sm mb-1">Total Cost</p>
        <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalCost)}</p>
      </div>
    </div>
  );
}
