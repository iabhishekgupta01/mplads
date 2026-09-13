export const viewFromPath = (path) => path.startsWith('/projects/')
  ? (path.endsWith('/progress') ? 'progress' : path.endsWith('/verification') ? 'verification' : 'detail')
  : path.startsWith('/vendors/') ? 'vendor-detail'
    : path.startsWith('/payments/') ? 'payment-detail'
      : path.startsWith('/inspections/') ? 'inspection-detail'
      : ({
        '/dashboard': 'dashboard',
        '/projects': 'projects',
        '/risk-alerts': 'alerts',
        '/fund-utilization': 'funds',
        '/gis-map': 'map',
        '/analytics': 'analytics',
        '/similar-work': 'duplicates',
        '/field-dashboard': 'field-dashboard',
        '/inspections': 'inspections',
        '/vendors': 'vendors',
        '/payments': 'payments',
        '/reports': 'reports',
        '/compliance': 'compliance',
        '/users': 'users',
        '/settings': 'settings',
        '/data-intelligence': 'data',
        '/connected-intelligence': 'connected',
        '/verification': 'verification',
        '/compare': 'compare',
      }[path] || 'dashboard')

export const pathFromView = (next) => ({
  dashboard: '/dashboard',
  projects: '/projects',
  alerts: '/risk-alerts',
  funds: '/fund-utilization',
  map: '/gis-map',
  analytics: '/analytics',
  duplicates: '/similar-work',
  'field-dashboard': '/field-dashboard',
  inspections: '/inspections',
  vendors: '/vendors',
  payments: '/payments',
  reports: '/reports',
  compliance: '/compliance',
  users: '/users',
  settings: '/settings',
  data: '/data-intelligence',
  connected: '/connected-intelligence',
  verification: '/verification',
  compare: '/compare',
}[next] || '/dashboard')
