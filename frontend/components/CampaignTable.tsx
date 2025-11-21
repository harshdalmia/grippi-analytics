import type { Campaign } from "../types/campaign"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US").format(num)
}

export default function CampaignTable({
  campaigns,
}: {
  campaigns: Campaign[]
}) {
  return (
    <div>
      {/* Mobile: cards */}
      <div className="sm:hidden space-y-4">
        {campaigns.length === 0 ? (
          <div className="px-4 py-6 text-center text-gray-300 bg-neutral-800/20 rounded">No campaigns found</div>
        ) : (
          campaigns.map((c) => (
            <div key={c.id} className="bg-neutral-800/30 border border-neutral-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-lg sm:text-xl font-semibold text-white">{c.name}</div>
                  <div className="text-sm text-gray-300 mt-2">{formatNumber(c.impressions)} impressions · {formatNumber(c.clicks)} clicks</div>
                </div>
                <div className="flex flex-col items-end ml-4">
                  <div className="inline-flex items-center gap-2">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${c.status === 'Active' ? 'bg-green-400' : 'bg-gray-400'}`} />
                    <span className={`px-3 py-1.5 text-sm font-semibold rounded-full ${c.status === 'Active' ? 'bg-green-700 text-white' : 'bg-neutral-700 text-gray-300'}`}>
                      {c.status}
                    </span>
                  </div>
                  <div className="mt-3 text-base font-semibold text-gray-200">{formatCurrency(c.cost)}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop: full table */}
  <div className="hidden sm:block mt-8 sm:mt-16 md:mt-20 overflow-x-auto bg-neutral-800/30 border border-neutral-700 rounded-lg shadow-sm">
        <table className="w-full min-w-full">
          <thead className="bg-neutral-800 border-b border-neutral-700">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Campaign Name</th>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Clicks</th>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Cost</th>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Impressions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-10 text-center text-gray-300">No campaigns found</td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-8 py-6 whitespace-nowrap"><div className="text-lg font-medium text-white">{campaign.name}</div></td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="inline-flex items-center gap-2">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${campaign.status === 'Active' ? 'bg-green-400' : 'bg-gray-400'}`} />
                      <span className={`px-3 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${campaign.status === 'Active' ? 'bg-green-700 text-white' : 'bg-neutral-700 text-gray-300'}`}>{campaign.status}</span>
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-base font-medium text-gray-200">{formatNumber(campaign.clicks)}</td>
                  <td className="px-8 py-6 whitespace-nowrap text-base font-medium text-gray-200">{formatCurrency(campaign.cost)}</td>
                  <td className="px-8 py-6 whitespace-nowrap text-base font-medium text-gray-200">{formatNumber(campaign.impressions)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
