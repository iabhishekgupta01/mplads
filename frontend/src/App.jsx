import ActionModal from './components/common/ActionModal.jsx'
import Toast from './components/common/Toast.jsx'
import AppShell from './components/layout/AppShell.jsx'
import { AppProvider, useApp } from './context/AppContext.jsx'
import StrictLandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { pageRegistry } from './app/pageRegistry.jsx';

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

  // Public landing page
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

  // Authentication gate
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

  // Resolve the active page from the central registry.
  const ActivePage = pageRegistry[view] || pageRegistry.dashboard

  return (
    <AppShell>
      <ActivePage />

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