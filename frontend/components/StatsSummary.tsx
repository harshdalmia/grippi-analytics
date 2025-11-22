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

export default function StatsSummary({ campaigns }: { campaigns: Campaign[] }) {
  const totalCampaigns = campaigns.length
  const activeCount = campaigns.filter((c) => c.status === "Active").length
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0)
  const totalCost = campaigns.reduce((sum, c) => sum + c.cost, 0)

  const stats = [
    { label: "Total Campaigns", value: totalCampaigns, color: "text-white", icon: (
      <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h3l2 2 2-2h6a2 2 0 002-2V7"/></svg>
    ) },
    { label: "Active Campaigns", value: activeCount, color: "text-green-300", icon: (
      <svg className="w-6 h-6 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    ) },
    { label: "Total Clicks", value: formatNumber(totalClicks), color: "text-blue-400", icon: (
      <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20"/></svg>
    ) },
    { label: "Total Cost", value: formatCurrency(totalCost), color: "text-purple-400", icon: (
      <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8c-3.866 0-7 1.343-7 3s3.134 3 7 3 7-1.343 7-3-3.134-3-7-3z"/></svg>
    ) },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="surface p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all flex flex-col"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5">{stat.icon}</div>
              <p className="text-gray-300 text-sm sm:text-base font-semibold">{stat.label}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className={`text-5xl sm:text-6xl font-extrabold ${stat.color}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
