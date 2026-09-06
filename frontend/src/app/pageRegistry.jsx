import Alerts from '../pages/Alerts.jsx'
import AnalyticsCenter from '../pages/AnalyticsCenter.jsx'
import Compliance from '../pages/Compliance.jsx'
import Dashboard from '../pages/Dashboard.jsx'
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

/**
 * Central registry for all authenticated application pages.
 *
 * Keep page components here so App.jsx is responsible only for
 * application flow and layout, not for maintaining a long list
 * of individual view conditions.
 */
export const pageRegistry = {
  dashboard: Dashboard,
  projects: Projects,
  detail: ProjectDetail,
  progress: ProgressPage,
  verification: VerificationPage,

  'field-dashboard': FieldDashboard,
  inspections: Inspections,
  'inspection-detail': InspectionDetail,

  vendors: Vendors,
  'vendor-detail': VendorDetail,

  payments: Payments,
  'payment-detail': PaymentDetail,

  compliance: Compliance,
  alerts: Alerts,
  analytics: AnalyticsCenter,
  map: GisPage,

  funds: SecondaryPage,
  reports: SecondaryPage,
  users: SecondaryPage,
  settings: SecondaryPage,
}

export { LoginPage }