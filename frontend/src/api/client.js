// src/api/client.js

import {
  MOCK_REPORTS,
  MOCK_AGENTS,
  MOCK_JOBS,
  MOCK_STATS,
} from '../mock/data.js'

const USE_MOCK   = import.meta.env.VITE_USE_MOCK !== 'false'
const BASE_URL   = import.meta.env.VITE_API_URL || 'http://localhost:8080'
const MOCK_DELAY = 320 // ms — simulates network latency

// ── Mock delay helper ─────────────────────────────────────────────────────────

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// ── Real HTTP fetch ───────────────────────────────────────────────────────────

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: { message: res.statusText } }))
    throw new Error(err?.error?.message || `HTTP ${res.status}`)
  }
  return res.json()
}

// ── API surface ───────────────────────────────────────────────────────────────

export const api = {
  // Reports
  async getReports(limit = 20) {
    if (USE_MOCK) {
      await delay(MOCK_DELAY)
      return MOCK_REPORTS.slice(0, limit)
    }
    return apiFetch(`/reports?limit=${limit}`)
  },

  async getReport(id) {
    if (USE_MOCK) {
      await delay(MOCK_DELAY)
      const r = MOCK_REPORTS.find((r) => r.id === id)
      if (!r) throw new Error('Report not found')
      return r
    }
    return apiFetch(`/reports/${id}`)
  },

  async getLatestReportForAsset(asset) {
    if (USE_MOCK) {
      await delay(MOCK_DELAY)
      return MOCK_REPORTS.find((r) => r.asset === asset.toUpperCase()) || null
    }
    return apiFetch(`/reports/asset/${asset}`)
  },

  async getReportStats() {
    if (USE_MOCK) {
      await delay(MOCK_DELAY)
      return MOCK_STATS
    }
    return apiFetch('/reports/stats')
  },

  // Agents
  async getAgents() {
    if (USE_MOCK) {
      await delay(MOCK_DELAY)
      return MOCK_AGENTS
    }
    return apiFetch('/agents')
  },

  async getAgent(id) {
    if (USE_MOCK) {
      await delay(MOCK_DELAY)
      const a = MOCK_AGENTS.find((a) => a.id === id)
      if (!a) throw new Error('Agent not found')
      return a
    }
    return apiFetch(`/agents/${id}`)
  },

  // Jobs
  async getJobs(asset, status = 'completed') {
    if (USE_MOCK) {
      await delay(MOCK_DELAY)
      return MOCK_JOBS.filter(
        (j) => j.asset === asset.toUpperCase() && j.status === status
      )
    }
    return apiFetch(`/jobs?asset=${asset}&status=${status}`)
  },

  // Health
  async getHealth() {
    if (USE_MOCK) {
      await delay(100)
      return { status: 'ok (mock)', version: '0.1.0' }
    }
    return apiFetch('/health')
  },
}