import {
  AlertTriangle,
  BarChart3,
  CheckSquare,
  CreditCard,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  MapPin,
  Settings,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

export const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
  { label: 'Projects', icon: FolderKanban, view: 'projects' },
  { label: 'Risk & Alerts', icon: AlertTriangle, view: 'alerts' },
  { label: 'Fund Monitoring', icon: Wallet, view: 'funds' },
  { label: 'Analytics', icon: BarChart3, view: 'analytics' },
  { label: 'Field Inspections', icon: CheckSquare, view: 'inspections' },
  { label: 'Payments', icon: CreditCard, view: 'payments' },
  { label: 'GIS Map', icon: MapPin, view: 'map' },
  { label: 'Reports', icon: FileText, view: 'reports' },
  { label: 'Compliance', icon: ShieldCheck, view: 'compliance' },
]

export const bottomNavItems = [
  { label: 'Settings', icon: Settings, view: 'settings' },
  { label: 'Logout', icon: LogOut, view: 'logout' },
]
