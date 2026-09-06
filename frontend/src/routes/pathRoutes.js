export const viewFromPath = (path) => path.startsWith('/projects/')
  ? (path.endsWith('/progress') ? 'progress' : path.endsWith('/verification') ? 'verification' : 'detail')
  : path.startsWith('/vendors/') ? 'vendor-detail'
    : path.startsWith('/payments/') ? 'payment-detail'
      : path.startsWith('/inspections/') ? 'inspection-detail'
        : ({ '/dashboard': 'dashboard', '/projects': 'projects', '/risk-alerts': 'alerts', '/fund-utilization': 'funds', '/gis-map': 'map', '/analytics': 'analytics', '/field-dashboard': 'field-dashboard', '/inspections': 'inspections', '/vendors': 'vendors', '/payments': 'payments', '/reports': 'reports', '/compliance': 'compliance', '/users': 'users', '/settings': 'settings' }[path] || 'dashboard')

export const pathFromView = (next) => ({ dashboard: '/dashboard', projects: '/projects', alerts: '/risk-alerts', funds: '/fund-utilization', map: '/gis-map', analytics: '/analytics', 'field-dashboard': '/field-dashboard', inspections: '/inspections', vendors: '/vendors', payments: '/payments', reports: '/reports', compliance: '/compliance', users: '/users', settings: '/settings' }[next] || '/dashboard')
