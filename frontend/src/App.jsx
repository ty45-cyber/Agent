// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout       from './components/Layout.jsx'
import Dashboard    from './pages/Dashboard.jsx'
import ReportDetail from './pages/ReportDetail.jsx'
import Agents       from './pages/Agents.jsx'
import CycleMonitor from './pages/CycleMonitor.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index            element={<Dashboard />}    />
          <Route path="reports/:id" element={<ReportDetail />} />
          <Route path="agents"    element={<Agents />}       />
          <Route path="cycle"     element={<CycleMonitor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}