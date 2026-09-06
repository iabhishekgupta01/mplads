export const projectsSeed = [
  { id: 'MP-2024-1001', name: 'Road Construction - Sehore', state: 'Madhya Pradesh', district: 'Sehore', category: 'Road', amount: 2000000, expenditure: 85, physical: 40, score: 82, status: 'Delayed', finding: 'Financial-progress mismatch', delay: '4 months', vendorId: 'VEND-019', vendor: 'ABC Infrastructure', agency: 'MP Rural Works' },
  { id: 'MP-2024-1187', name: 'Construction of Community Hall', state: 'Madhya Pradesh', district: 'Indore', category: 'Community Infrastructure', amount: 4850000, expenditure: 92, physical: 31, score: 92, status: 'Under Review', finding: 'Suspicious billing pattern', delay: '6 months', vendorId: 'VEND-019', vendor: 'ABC Infrastructure', agency: 'MP Urban Development' },
  { id: 'MP-2025-0421', name: 'Primary Health Centre Upgrade', state: 'Madhya Pradesh', district: 'Bhopal', category: 'Health', amount: 3200000, expenditure: 78, physical: 60, score: 68, status: 'Ongoing', finding: 'Elevated cost risk', delay: '2 months', vendorId: 'VEND-044', vendor: 'CivicBuild Works', agency: 'MP Health Engineering' },
  { id: 'RJ-2024-0742', name: 'Drinking Water Pipeline', state: 'Rajasthan', district: 'Kota', category: 'Water', amount: 2800000, expenditure: 61, physical: 57, score: 43, status: 'Ongoing', finding: 'No immediate concern', delay: 'On track', vendorId: 'VEND-031', vendor: 'JalSetu Projects', agency: 'Rajasthan PHED' },
  { id: 'BR-2025-0120', name: 'Government School Infrastructure Upgrade', state: 'Bihar', district: 'Gaya', category: 'Education', amount: 4100000, expenditure: 94, physical: 48, score: 89, status: 'Delayed', finding: 'Vendor payment anomaly', delay: '5 months', vendorId: 'VEND-056', vendor: 'Eastern Buildtech', agency: 'Bihar Education Works' },
  { id: 'MH-2024-0312', name: 'Community Sanitation Facility', state: 'Maharashtra', district: 'Nashik', category: 'Sanitation', amount: 1650000, expenditure: 45, physical: 48, score: 22, status: 'Ongoing', finding: 'No immediate concern', delay: 'On track', vendorId: 'VEND-061', vendor: 'Nirmal Infra', agency: 'Maharashtra Water Board' },
]

export const vendorsSeed = [
  { id: 'VEND-019', name: 'ABC Infrastructure', risk: 86, projects: 3, payments: 12, value: 4250000, flagged: 4, states: 'Madhya Pradesh', districts: 'Sehore, Indore', finding: 'Repeated similar payment amounts' },
  { id: 'VEND-044', name: 'CivicBuild Works', risk: 62, projects: 2, payments: 7, value: 2380000, flagged: 1, states: 'Madhya Pradesh', districts: 'Bhopal, Vidisha', finding: 'Payment frequency requires review' },
  { id: 'VEND-031', name: 'JalSetu Projects', risk: 38, projects: 4, payments: 15, value: 5120000, flagged: 0, states: 'Rajasthan', districts: 'Kota, Ajmer', finding: 'No immediate concern' },
  { id: 'VEND-056', name: 'Eastern Buildtech', risk: 78, projects: 2, payments: 9, value: 3460000, flagged: 3, states: 'Bihar', districts: 'Gaya, Patna', finding: 'Transactions clustered in short periods' },
  { id: 'VEND-061', name: 'Nirmal Infra', risk: 29, projects: 3, payments: 8, value: 1970000, flagged: 0, states: 'Maharashtra', districts: 'Nashik, Pune', finding: 'No immediate concern' },
]

export const paymentsSeed = [
  { id: 'TXN-001', projectId: 'MP-2024-1001', vendorId: 'VEND-019', amount: 500000, date: '2026-08-22', type: 'Milestone payment', status: 'Flagged', flagged: true, reason: 'Three identical payments detected within 48 hours' },
  { id: 'TXN-002', projectId: 'MP-2024-1001', vendorId: 'VEND-019', amount: 500000, date: '2026-08-23', type: 'Milestone payment', status: 'Under Review', flagged: true, reason: 'Repeated amount pattern' },
  { id: 'TXN-003', projectId: 'MP-2024-1001', vendorId: 'VEND-019', amount: 500000, date: '2026-08-24', type: 'Milestone payment', status: 'Processed', flagged: true, reason: 'Payment clustered within 48 hours' },
  { id: 'TXN-004', projectId: 'MP-2024-1187', vendorId: 'VEND-019', amount: 875000, date: '2026-08-28', type: 'Advance', status: 'Processed', flagged: false, reason: 'No immediate concern' },
  { id: 'TXN-005', projectId: 'BR-2025-0120', vendorId: 'VEND-056', amount: 725000, date: '2026-08-12', type: 'Milestone payment', status: 'Flagged', flagged: true, reason: 'Unusual payment frequency' },
  { id: 'TXN-006', projectId: 'RJ-2024-0742', vendorId: 'VEND-031', amount: 420000, date: '2026-08-08', type: 'Milestone payment', status: 'Released', flagged: false, reason: 'No immediate concern' },
]

export const inspectionsSeed = [
  { id: 'INSP-1001', projectId: 'MP-2024-1001', officer: 'Anita Sharma', priority: 'High', date: '2026-09-12', status: 'Pending', reason: 'Verify reported physical progress and payment records.', reported: 40, observed: null },
  { id: 'INSP-1002', projectId: 'MP-2024-1187', officer: 'Rakesh Verma', priority: 'High', date: '2026-09-14', status: 'Scheduled', reason: 'Review delayed community infrastructure work.', reported: 31, observed: null },
  { id: 'INSP-1003', projectId: 'BR-2025-0120', officer: 'Meera Kumari', priority: 'Medium', date: '2026-09-15', status: 'Submitted', reason: 'Validate vendor payment anomaly.', reported: 48, observed: 45 },
]

export const progressSeed = [
  { id: 'PROG-001', projectId: 'MP-2024-1001', percent: 35, date: '2026-09-05', by: 'District Authority', role: 'District Authority', remarks: 'Submitted progress report.', verification: 'Verified' },
  { id: 'PROG-002', projectId: 'MP-2024-1001', percent: 40, date: '2026-09-10', by: 'Field Officer', role: 'Field Officer', remarks: 'Road base work reported complete.', verification: 'Pending Verification' },
]

export const trendData = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month, index) => ({ month, high: 310 + index * 11, medium: 980 + index * 28, low: 3580 + index * 77 }))
export const fundData = [{ state: 'Uttar Pradesh', allocated: 82, utilized: 61 }, { state: 'Maharashtra', allocated: 68, utilized: 55 }, { state: 'Bihar', allocated: 59, utilized: 39 }, { state: 'Madhya Pradesh', allocated: 54, utilized: 42 }, { state: 'Rajasthan', allocated: 46, utilized: 36 }]
export const auditSeed = [{ time: '05 Sep 2026, 04:18 PM', actor: 'AI Risk Engine', action: 'Risk score updated', detail: '68 → 82 · New transaction anomaly detected.', tone: 'ai' }, { time: '01 Sep 2026, 11:02 AM', actor: 'System', action: 'Project flagged', detail: 'Financial-progress mismatch detected.', tone: 'system' }, { time: '15 Aug 2026, 09:30 AM', actor: 'District Authority', action: 'Progress report submitted', detail: 'Physical progress reported at 40%.', tone: 'human' }]
