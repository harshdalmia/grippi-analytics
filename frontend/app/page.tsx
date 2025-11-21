"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import StatsSummary from "@/components/StatsSummary"
import FilterBar from "@/components/FilterBar"
import CampaignTable from "@/components/CampaignTable"
import Loading from "@/components/Loading"
import ErrorBox from "@/components/ErrorBox"
import type { Campaign } from "@/types/campaign"

const API_URL = process.env.NEXT_PUBLIC_API_URL 

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  useEffect(() => {
    if (statusFilter === "All") setFilteredCampaigns(campaigns)
    else setFilteredCampaigns(campaigns.filter((c) => c.status === statusFilter))
  }, [statusFilter, campaigns])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/campaigns`)

      if (!response.ok) {
        throw new Error("Failed to fetch campaigns")
      }

      const data = await response.json()
      setCampaigns(data)
      setFilteredCampaigns(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (value: string) => {
    setStatusFilter(value)
  }

  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} onRetry={fetchCampaigns} />

  return (
    <main className="min-h-screen bg-neutral-900">
     <div className="w-full mx-auto px-6 py-10 space-y-12">
        <Header title="Campaign Analytics Dashboard" subtitle="Monitor and analyze your marketing campaigns" />

        <StatsSummary campaigns={campaigns} />

        <div className="bg-neutral-800/30 border border-neutral-700 rounded-lg shadow-sm overflow-hidden space-y-7 mt-10 sm:mt-14 lg:mt-20 p-6 sm:p-8 lg:p-10">
          <FilterBar statusFilter={statusFilter} onChange={handleFilterChange} />
          <CampaignTable campaigns={filteredCampaigns} />
        </div>
      </div>
    </main>
  )
}
