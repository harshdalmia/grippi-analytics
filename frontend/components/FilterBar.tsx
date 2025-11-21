"use client"

import type React from "react"

export default function FilterBar({
  statusFilter,
  onChange,
}: {
  statusFilter: string
  onChange: (value: string) => void
}) {
  const options = [
    { key: 'All', label: 'All' },
    { key: 'Active', label: 'Active' },
    { key: 'Paused', label: 'Paused' },
  ]

  return (
    <div className="px-6 py-10 border-b border-neutral-700 bg-neutral-800/25">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl font-semibold text-white">Campaigns</h2>
        </div>

        <div className="order-1 md:order-2 flex items-center gap-3">
          <span className="text-sm font-medium text-gray-300 mr-2 hidden md:inline">Filter:</span>
          <div className="inline-flex w-full md:w-auto gap-3 rounded-md bg-neutral-900/30 p-1 border border-neutral-700">
            {options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => onChange(opt.key)}
                className={`flex-1 text-center px-3 py-1.5 text-sm font-medium rounded-md transition focus:outline-none ${
                  statusFilter === opt.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-neutral-800/40'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
