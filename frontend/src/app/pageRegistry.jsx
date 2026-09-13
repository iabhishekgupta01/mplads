import Alerts from '../pages/Alerts.jsx'
import AnalyticsCenter from '../pages/AnalyticsCenter.jsx'
import Compliance from '../pages/Compliance.jsx'
import ComparisonPage from '../pages/ComparisonPage.jsx'
import ConnectedIntelligence from '../pages/ConnectedIntelligence.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import DataIntelligence from '../pages/DataIntelligence.jsx'
import FieldDashboard from '../pages/FieldDashboard.jsx'
import GisPage from '../pages/GisPage.jsx'
import InspectionDetail from '../pages/InspectionDetail.jsx'
import Inspections from '../pages/Inspections.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import PaymentDetail from '../pages/PaymentDetail.jsx'
import Payments from '../pages/Payments.jsx'
import ProjectDetail from '../pages/ProjectDetail.jsx'
import Projects from '../pages/Projects.jsx'
import ProgressPage from '../pages/ProgressPage.jsx'
import SecondaryPage from '../pages/SecondaryPage.jsx'
import VendorDetail from '../pages/VendorDetail.jsx'
import Vendors from '../pages/Vendors.jsx'
import VerificationPage from '../pages/VerificationPage.jsx'
import DuplicateIntelligence from '../pages/DuplicateIntelligence.jsx'

/**
 * Central registry for all authenticated application pages.
 *
 * Keep page components here so App.jsx is responsible only for
 * application flow and layout, not for maintaining a long list
 * of individual view conditions.
 */
export const pageRegistry = {
  // Overview
  dashboard: Dashboard,

  // Intelligence
  alerts: Alerts,
  projects: Projects,
  detail: ProjectDetail,
  progress: ProgressPage,
  verification: VerificationPage,
  data: DataIntelligence,
  connected: ConnectedIntelligence,

  // Analytics
  analytics: AnalyticsCenter,
  duplicates: DuplicateIntelligence,
  payments: Payments,
  'payment-detail': PaymentDetail,

  // Spatial
  map: GisPage,

  // Verification
  inspections: Inspections,
  'inspection-detail': InspectionDetail,
  'field-dashboard': FieldDashboard,

  // Vendors
  vendors: Vendors,
  'vendor-detail': VendorDetail,

  // Governance
  compliance: Compliance,

  // Secondary
  funds: SecondaryPage,
  reports: SecondaryPage,
  users: SecondaryPage,
  settings: SecondaryPage,
  compare: ComparisonPage,
}

export { LoginPage }
