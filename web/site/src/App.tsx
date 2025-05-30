import { Layout } from "./components/layout/Layout"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./views/dashboard/Dashboard"
import Reports from "./views/reports/Reports"
import { Home } from "./views/home/Home"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}

export default App
