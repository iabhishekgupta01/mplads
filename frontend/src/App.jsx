import ActionModal from './components/common/ActionModal.jsx'
import Toast from './components/common/Toast.jsx'
import AppShell from './components/layout/AppShell.jsx'
import { AppProvider, useApp } from './context/AppContext.jsx'

import Alerts from './pages/Alerts.jsx'
import AnalyticsCenter from './pages/AnalyticsCenter.jsx'
import Compliance from './pages/Compliance.jsx'
import Dashboard from './pages/Dashboard.jsx'
import FieldDashboard from './pages/FieldDashboard.jsx'
import GisPage from './pages/GisPage.jsx'
import InspectionDetail from './pages/InspectionDetail.jsx'
import Inspections from './pages/Inspections.jsx'
import StrictLandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import PaymentDetail from './pages/PaymentDetail.jsx'
import Payments from './pages/Payments.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Projects from './pages/Projects.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import SecondaryPage from './pages/SecondaryPage.jsx'
import VendorDetail from './pages/VendorDetail.jsx'
import Vendors from './pages/Vendors.jsx'
import VerificationPage from './pages/VerificationPage.jsx'

import './App.css'

function AppContent() {
  const {
    view,
    entry,
    setEntry,
    loggedIn,
    setLoggedIn,
    setView,
    modal,
    setModal,
    toast,
    submitAction,
    selected,
  } = useApp()

  if (entry === 'landing') {
    return (
      <StrictLandingPage
        onEnter={() => {
          setEntry('login')
          window.history.pushState({}, '', '/login')
        }}
      />
    )
  }

  if (!loggedIn) {
    return (
      <LoginPage
        onLogin={() => {
          setLoggedIn(true)
          setView('dashboard')
          window.history.pushState({}, '', '/dashboard')
        }}
      />
    )
  }

  return (
    <AppShell>
      {view === 'dashboard' && <Dashboard />}
      {view === 'projects' && <Projects />}
      {view === 'detail' && <ProjectDetail />}
      {view === 'progress' && <ProgressPage />}
      {view === 'verification' && <VerificationPage />}
      {view === 'field-dashboard' && <FieldDashboard />}
      {view === 'inspections' && <Inspections />}
      {view === 'inspection-detail' && <InspectionDetail />}
      {view === 'vendors' && <Vendors />}
      {view === 'vendor-detail' && <VendorDetail />}
      {view === 'payments' && <Payments />}
      {view === 'payment-detail' && <PaymentDetail />}
      {view === 'compliance' && <Compliance />}
      {view === 'alerts' && <Alerts />}
      {view === 'analytics' && <AnalyticsCenter />}
      {view === 'map' && <GisPage />}
      {['funds', 'reports', 'users', 'settings'].includes(view) && <SecondaryPage />}

      {modal && (
        <ActionModal
          type={modal}
          project={selected}
          onClose={() => setModal(null)}
          onSubmit={submitAction}
        />
      )}
      <Toast message={toast} />
    </AppShell>
  )
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App

export {
  Alerts,
  AnalyticsCenter,
  Compliance,
  Dashboard,
  FieldDashboard,
  GisPage,
  InspectionDetail,
  Inspections,
  LoginPage,
  PaymentDetail,
  Payments,
  ProjectDetail,
  Projects,
  ProgressPage,
  SecondaryPage,
  VendorDetail,
  Vendors,
  VerificationPage,
}
