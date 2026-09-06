import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  auditSeed,
  inspectionsSeed,
  paymentsSeed,
  progressSeed,
  projectsSeed,
  vendorsSeed,
} from '../data/mockData.js'
import { pathFromView, viewFromPath } from '../routes/pathRoutes.js'
import { riskLabel } from '../utils/formatters.js'
import { calculateProjectRisk } from '../services/riskEngine.jsx';

const AppContext = createContext(null)

const initialNotifications = [
  {
    id: 1,
    title: 'High risk project detected',
    detail: 'Road Construction – Sehore (Risk Score 82)',
    time: '2 min ago',
    view: 'detail',
    projectId: 'MP-2024-1001',
    unread: true,
  },
  {
    id: 2,
    title: 'Delay predicted (78% probability)',
    detail: 'Community Hall – Morena',
    time: '15 min ago',
    view: 'detail',
    projectId: 'MP-2024-1187',
    unread: true,
  },
  {
    id: 3,
    title: 'Payment anomaly flagged',
    detail: '3 identical payments released within 48 hours',
    time: '1 hr ago',
    view: 'payment-detail',
    paymentId: 'TXN-001',
    unread: true,
  },
]

export function AppProvider({ children }) {
  const initialPath = typeof window !== 'undefined' ? window.location.pathname : '/'
  const [view, setView] = useState(viewFromPath(initialPath))
  const [entry, setEntry] = useState(initialPath === '/' ? 'landing' : 'login')
  const [loggedIn, setLoggedIn] = useState(initialPath !== '/' && initialPath !== '/login')
  const [userRole, setUserRole] = useState('Ministry (DIID) Official')

  const [projects, setProjects] = useState(projectsSeed)
  const [vendors] = useState(vendorsSeed)
  const [payments, setPayments] = useState(paymentsSeed)
  const [inspections, setInspections] = useState(inspectionsSeed)
  const [progress, setProgress] = useState(progressSeed)
  const [audit, setAudit] = useState(auditSeed)
  const [notifications, setNotifications] = useState(initialNotifications)

  const [selectedId, setSelectedId] = useState(
    initialPath.startsWith('/projects/') ? initialPath.split('/').pop() : 'MP-2024-1001'
  )
  const [activeVendorId, setActiveVendorId] = useState(
    initialPath.startsWith('/vendors/') ? initialPath.split('/').pop() : 'VEND-019'
  )
  const [activePaymentId, setActivePaymentId] = useState(
    initialPath.startsWith('/payments/') ? initialPath.split('/').pop() : 'TXN-001'
  )
  const [activeInspectionId, setActiveInspectionId] = useState(
    initialPath.startsWith('/inspections/') ? initialPath.split('/').pop() : 'INSP-1001'
  )

  const [query, setQuery] = useState('')
const [riskFilter, setRiskFilter] = useState('All')

const [gisStateFilter, setGisStateFilter] = useState('All')
const [gisDistrictFilter, setGisDistrictFilter] = useState('All')

const [modal, setModal] = useState(null)
const [toast, setToast] = useState('')
const [mobileNav, setMobileNav] = useState(false)

  const selected = useMemo(() => {
  return projects.find((project) => project.id === selectedId) || projects[0]
}, [projects, selectedId])

const selectedRisk = useMemo(() => {
  if (!selected) return null

  return calculateProjectRisk(selected, {
    projects,
    payments,
    vendors,
  })
}, [selected, projects, payments, vendors])

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) =>
        `${project.id} ${project.name} ${project.district} ${project.state}`
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (riskFilter === 'All' || riskLabel(project.score) === riskFilter.toUpperCase())
    )
  }, [projects, query, riskFilter])

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3200)
  }

  const addNotification = (item) => {
    setNotifications((prev) => [
      { id: Date.now(), time: 'Just now', unread: true, ...item },
      ...prev,
    ])
  }

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    )
  }

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname
      setEntry(path === '/' ? 'landing' : 'login')
      setLoggedIn(path !== '/' && path !== '/login')
      setView(viewFromPath(path))
      const id = path.startsWith('/projects/') ? path.split('/').pop() : null
      if (id) setSelectedId(id)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const openProject = (id) => {
    setSelectedId(id)
    setView('detail')
    setEntry('login')
    setLoggedIn(true)
    window.history.pushState({}, '', `/projects/${id}`)
    setMobileNav(false)
  }

  const openVendor = (id) => {
    setActiveVendorId(id)
    window.history.pushState({}, '', `/vendors/${id}`)
    setView('vendor-detail')
    setMobileNav(false)
  }

  const openPayment = (id) => {
    setActivePaymentId(id)
    window.history.pushState({}, '', `/payments/${id}`)
    setView('payment-detail')
    setMobileNav(false)
  }

  const openInspection = (id) => {
    setActiveInspectionId(id)
    window.history.pushState({}, '', `/inspections/${id}`)
    setView('inspection-detail')
    setMobileNav(false)
  }

  const navigate = (next) => {
    setView(next)
    setEntry('login')
    setLoggedIn(true)
    window.history.pushState({}, '', pathFromView(next))
    setMobileNav(false)
  }

  const submitAction = (event) => {
    event.preventDefault()
    const action = modal
    const status =
      action === 'audit' ? 'Under Review' : action === 'halt' ? 'Funds Halted' : 'Resolved'
    const actionLabel =
      action === 'audit'
        ? 'Requested Field Audit'
        : action === 'halt'
          ? 'Halted vendor payment'
          : 'Marked project resolved'

    setProjects((current) =>
      current.map((project) => (project.id === selected.id ? { ...project, status } : project))
    )

    if (action === 'audit') {
      const newInsp = {
        id: `INSP-${1000 + inspections.length + 1}`,
        projectId: selected.id,
        officer: 'Field Officer',
        priority: 'High',
        date: '2026-09-15',
        status: 'Pending',
        reason: 'Verify reported physical progress and payment records.',
        reported: selected.physical,
        observed: null,
      }
      setInspections((prev) => [newInsp, ...prev])
      addNotification({
        title: 'New Field Audit Requested',
        detail: `${selected.name} assigned to Field Officer`,
        view: 'inspection-detail',
        inspectionId: newInsp.id,
      })
    }

    setAudit((current) => [
      {
        time: '06 Sep 2026, 05:40 PM',
        actor: userRole,
        action: actionLabel,
        detail: `${selected.name} · Officer action recorded against compliance history.`,
        tone: 'human',
      },
      ...current,
    ])

    setModal(null)
    showToast(
      action === 'audit'
        ? 'Audit request submitted. Field inspection assigned to Field Officer.'
        : action === 'halt'
          ? 'Vendor payment workflow placed on hold.'
          : 'Project marked as resolved.'
    )
  }

  // REAL FUNCTIONAL CSV GENERATOR
  const downloadProjectsCSV = (dataList = projects) => {
    const headers = [
      'Project ID',
      'Project Name',
      'State',
      'District',
      'Category',
      'Sanctioned Amount',
      'Expenditure %',
      'Physical Progress %',
      'Risk Score',
      'Status',
    ]

    const rows = dataList.map((p) => [
      `"${p.id}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.state}"`,
      `"${p.district}"`,
      `"${p.category}"`,
      p.amount,
      p.expenditure,
      p.physical,
      p.score,
      `"${p.status}"`,
    ])

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `MPLADS_Projects_Report_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Downloaded official MPLADS Projects CSV Report.')
  }

  const value = {
    view,
    setView,
    entry,
    setEntry,
    loggedIn,
    setLoggedIn,
    userRole,
    setUserRole,
    projects,
    setProjects,
    vendors,
    payments,
    setPayments,
    inspections,
    setInspections,
    progress,
    setProgress,
    audit,
    setAudit,
    notifications,
    addNotification,
    markNotificationRead,
    selectedId,
    setSelectedId,
    selected,
    selectedRisk,
    activeVendorId,
    setActiveVendorId,
    activePaymentId,
    setActivePaymentId,
    activeInspectionId,
    setActiveInspectionId,
    query,
    setQuery,
    riskFilter,
    setRiskFilter,
    gisStateFilter,
setGisStateFilter,
gisDistrictFilter,
setGisDistrictFilter,
    modal,
    setModal,
    toast,
    setToast,
    showToast,
    mobileNav,
    setMobileNav,
    filteredProjects,
    openProject,
    openVendor,
    openPayment,
    openInspection,
    navigate,
    submitAction,
    downloadProjectsCSV,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}