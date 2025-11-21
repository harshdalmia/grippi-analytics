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
    { label: "Total Campaigns", value: totalCampaigns, color: "text-white" },
    { label: "Active Campaigns", value: activeCount, color: "text-green-300" },
    { label: "Total Clicks", value: formatNumber(totalClicks), color: "text-blue-400" },
    { label: "Total Cost", value: formatCurrency(totalCost), color: "text-purple-400" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-neutral-800/40 backdrop-blur-sm border border-neutral-700 rounded-xl p-10 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          <p className="text-gray-300 text-sm sm:text-base font-semibold mb-4">{stat.label}</p>
          <p className={`text-4xl sm:text-4xl font-extrabold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
