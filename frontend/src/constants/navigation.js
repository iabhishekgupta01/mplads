import { AlertTriangle, BarChart3, ClipboardCheck, FileText, IndianRupee, LayoutDashboard, Map, ShieldCheck, SlidersHorizontal, Users } from 'lucide-react'

export const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
  { label: 'Project Monitoring', icon: ClipboardCheck, view: 'projects' },
  { label: 'Risk & Alerts', icon: AlertTriangle, view: 'alerts', badge: '12' },
  { label: 'Analytics', icon: BarChart3, view: 'analytics' },
  { label: 'Field Operations', icon: ClipboardCheck, view: 'field-dashboard' },
  { label: 'Inspections', icon: ShieldCheck, view: 'inspections' },
  { label: 'Payments', icon: IndianRupee, view: 'payments' },
  { label: 'Vendors', icon: Users, view: 'vendors' },
  { label: 'GIS Map', icon: Map, view: 'map' },
  { label: 'Fund Utilization', icon: IndianRupee, view: 'funds' },
  { label: 'Reports', icon: FileText, view: 'reports' },
  { label: 'Compliance', icon: ShieldCheck, view: 'compliance' },
  { label: 'User Management', icon: Users, view: 'users' },
  { label: 'Settings', icon: SlidersHorizontal, view: 'settings' },
]
