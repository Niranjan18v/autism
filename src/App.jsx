import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import EmotionMatching from './pages/EmotionMatching'
import CommunicationModule from './pages/CommunicationModule'
import EducationModule from './pages/EducationModule'
import Assessment from './pages/Assessment'
import Register from './pages/Register'
import ClinicalReport from './pages/ClinicalReport'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/activity/emotion-matching" element={<EmotionMatching />} />
        <Route path="/activity/communication" element={<CommunicationModule />} />
        <Route path="/activity/education" element={<EducationModule />} />
        <Route path="/activity/assessment" element={<Assessment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report" element={<ClinicalReport />} />
      </Routes>
    </Router>
  )
}

export default App
