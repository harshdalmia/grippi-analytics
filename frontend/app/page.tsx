'use client';

import { useState, useEffect } from 'react';
import { Campaign } from '../types/campaign';
import Header from '../components/Header';
import StatsSummary from '../components/StatsSummary';
import FilterBar from '../components/FilterBar';
import CampaignTable from '../components/CampaignTable';
import Loading from '../components/Loading';
import ErrorBox from '../components/ErrorBox';

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (statusFilter === 'All') setFilteredCampaigns(campaigns);
    else setFilteredCampaigns(campaigns.filter((c) => c.status === statusFilter));
  }, [statusFilter, campaigns]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/campaigns`);

      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }

      const data = await response.json();
      setCampaigns(data);
      setFilteredCampaigns(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} onRetry={fetchCampaigns} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Header
          title="Campaign Analytics Dashboard"
          subtitle="Monitor and analyze your marketing campaigns"
        />

        <StatsSummary campaigns={campaigns} />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <FilterBar statusFilter={statusFilter} onChange={handleFilterChange} />
          <CampaignTable campaigns={filteredCampaigns} />
        </div>
      </div>
    </div>
  );
}