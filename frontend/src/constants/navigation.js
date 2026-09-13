import {
  AlertTriangle,
  BarChart3,
  CheckSquare,
  Database,
  FileText,
  FolderKanban,
  GitCompare,
  LayoutDashboard,
  LogOut,
  MapPin,
  Network,
  Settings,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

export const navItems = [
  // OVERVIEW
  { label: 'Risk Command Center', icon: LayoutDashboard, view: 'dashboard', group: 'OVERVIEW' },

  // INTELLIGENCE
  { label: 'AI Priority Queue', icon: AlertTriangle, view: 'alerts', group: 'INTELLIGENCE' },
  { label: 'Project Intelligence', icon: FolderKanban, view: 'projects', group: 'INTELLIGENCE' },
  { label: 'Data Intelligence', icon: Database, view: 'data', group: 'INTELLIGENCE' },
  { label: 'Connected Signals', icon: Network, view: 'connected', group: 'INTELLIGENCE' },

  // ANALYTICS
  { label: 'Risk Analytics', icon: BarChart3, view: 'analytics', group: 'ANALYTICS' },
  { label: 'Payment Intelligence', icon: Wallet, view: 'payments', group: 'ANALYTICS' },
  { label: 'Similar Work Detection', icon: GitCompare, view: 'duplicates', group: 'ANALYTICS' },

  // SPATIAL
  { label: 'GIS Intelligence', icon: MapPin, view: 'map', group: 'SPATIAL' },

  // VERIFICATION
  { label: 'Field Verification', icon: CheckSquare, view: 'inspections', group: 'VERIFICATION' },

  // GOVERNANCE
  { label: 'Reports', icon: FileText, view: 'reports', group: 'GOVERNANCE' },
  { label: 'Action & Audit', icon: ShieldCheck, view: 'compliance', group: 'GOVERNANCE' },
]

export const bottomNavItems = [
  { label: 'Settings', icon: Settings, view: 'settings' },
  { label: 'Logout', icon: LogOut, view: 'logout' },
]
