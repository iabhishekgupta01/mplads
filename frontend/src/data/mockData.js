// ============================================================
// NIRIKSHAN CENTRALIZED DATA MODEL
// All modules read from this single source of truth.
// ============================================================

// ── PROJECT-SPECIFIC AI INTELLIGENCE ENGINE ──────────────────
export function generateProjectIntelligence(project) {
  const gap = (project.expenditure || 0) - (project.physical || 0)
  const delayMonths = parseInt(String(project.delay || '0')) || 0
  const isOnTrack = String(project.delay || '').toLowerCase().includes('track')

  // Build drivers
  const drivers = []
  if (gap >= 30) drivers.push({ id: 'FINANCIAL_MISMATCH', label: 'Financial–Physical Mismatch', score: Math.min(45, gap * 0.8), severity: 'HIGH' })
  else if (gap >= 15) drivers.push({ id: 'FINANCIAL_MISMATCH', label: 'Financial–Physical Mismatch', score: Math.min(25, gap * 0.7), severity: 'MEDIUM' })

  if (!isOnTrack && delayMonths >= 4) drivers.push({ id: 'DELAY', label: 'Schedule Delay', score: 18, severity: 'HIGH' })
  else if (!isOnTrack && delayMonths >= 2) drivers.push({ id: 'DELAY', label: 'Schedule Delay', score: 10, severity: 'MEDIUM' })

  const observed = project.observedProgress
  if (observed != null && project.physical - observed >= 7) {
    drivers.push({ id: 'EVIDENCE_GAP', label: 'Field Evidence Discrepancy', score: 12, severity: 'HIGH' })
  }

  if (project.paymentAnomalyFlag) drivers.push({ id: 'PAYMENT', label: 'Payment Anomaly', score: 22, severity: 'HIGH' })
  if (project.vendorRisk >= 70) drivers.push({ id: 'VENDOR', label: 'High-Risk Vendor', score: 8, severity: 'MEDIUM' })
  if (project.similarProjectFlag) drivers.push({ id: 'SIMILARITY', label: 'Similar Work Detected', score: 6, severity: 'LOW' })

  // Build AI finding — project-specific
  let aiFinding = ''
  const cat = (project.category || '').toLowerCase()

  if (cat.includes('road')) {
    if (gap >= 20) aiFinding = `Road construction expenditure has reached ${project.expenditure}% while physical progress is reported at ${project.physical}%. A ${gap}pp financial–physical mismatch and ${project.delay} schedule delay indicate execution concerns. Payment clustering was also detected in this period.`
    else aiFinding = `Road work shows a ${project.delay} schedule deviation. Physical execution at ${project.physical}% against ${project.expenditure}% expenditure needs monitoring. No major anomaly confirmed — verification recommended.`
  } else if (cat.includes('community') || cat.includes('hall')) {
    if (gap >= 40) aiFinding = `Community infrastructure expenditure has reached ${project.expenditure}% while reported progress is only ${project.physical}%. A ${gap}pp gap combined with suspicious billing patterns and a ${project.delay} delay creates a high-confidence risk signal. Field evidence review is essential.`
    else aiFinding = `Community hall construction shows ${project.physical}% reported progress against ${project.expenditure}% expenditure. The ${gap}pp mismatch with ${project.delay} delay requires field verification.`
  } else if (cat.includes('health')) {
    aiFinding = `Health infrastructure expenditure is ${project.expenditure}% against ${project.physical}% physical progress. A ${gap}pp mismatch with ${isOnTrack ? 'no significant delay' : project.delay + ' delay'} has been flagged. Cost overrun risk detected.`
  } else if (cat.includes('water')) {
    aiFinding = `Water infrastructure project shows ${project.physical}% completion against ${project.expenditure}% expenditure. A ${gap}pp variance is ${gap >= 15 ? 'above acceptable threshold' : 'within normal limits'}. ${isOnTrack ? 'Timeline is on track.' : `Schedule delay of ${project.delay} noted.`}`
  } else if (cat.includes('education') || cat.includes('school')) {
    if (gap >= 30) aiFinding = `School infrastructure expenditure has reached ${project.expenditure}% but physical progress is only ${project.physical}%. The ${gap}pp gap and detected payment anomaly for vendor ${project.vendor} require immediate escalation.`
    else aiFinding = `Education infrastructure shows ${project.physical}% reported progress. A ${gap}pp expenditure-progress gap with a ${project.delay} delay indicates execution concern.`
  } else {
    aiFinding = `Project expenditure is ${project.expenditure}% against ${project.physical}% physical progress — a ${gap}pp mismatch. ${isOnTrack ? '' : project.delay + ' delay detected.'} Risk score: ${project.score}/100.`
  }

  // Build recommended action
  let recommendation = ''
  if (project.score >= 80) recommendation = 'Immediately request field verification and consider halting further fund release pending evidence review and officer decision.'
  else if (project.score >= 60) recommendation = 'Schedule field inspection to verify physical progress. Cross-check payment records with site photographs before releasing next installment.'
  else if (project.score >= 40) recommendation = 'Monitor closely. Request progress documentation from district authority. No immediate action required but escalation is warranted if delay continues.'
  else recommendation = 'No immediate action required. Continue routine monitoring and verify next milestone before fund release.'

  return { drivers, aiFinding, recommendation }
}

// ── PROJECTS ──────────────────────────────────────────────────
export const projectsSeed = [

  /* =========================================================
     MADHYA PRADESH — SEHORE
     Road construction — high risk demo case
     ========================================================= */

  {
    id: 'MP-2024-1001',
    name: 'Road Construction - Sehore',
    description: 'Rural road construction connecting villages in Sehore district. Work includes earthwork, sub-base, base course and bituminous wearing coat.',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    category: 'Road',
    amount: 2000000,
    expenditure: 85,
    physical: 40,
    observedProgress: 31,
    score: 82,
    status: 'Delayed',
    finding: 'Financial-progress mismatch + Payment anomaly',
    delay: '4 months',
    vendorId: 'VEND-019',
    vendor: 'ABC Infrastructure',
    agency: 'MP Rural Works',
    latitude: 23.2032,
    longitude: 77.0845,
    paymentAnomalyFlag: true,
    vendorRisk: 86,
    similarProjectFlag: true,
    evidence: [
      { id: 'EV-101', file: 'IMG_20260912_1430.jpg', timestamp: '12 Sep 2026, 14:30', gps: '23.2028, 77.0841', locationMatch: 'VERIFIED', visualReview: 'REQUIRES_REVIEW', description: 'Road base — earthwork layer visible, surfacing not started' },
      { id: 'EV-102', file: 'IMG_20260912_1431.jpg', timestamp: '12 Sep 2026, 14:35', gps: '23.2035, 77.0848', locationMatch: 'VERIFIED', visualReview: 'VERIFIED', description: 'Lateral drain section — WBM base incomplete' },
    ],
    verificationChecks: [
      { label: 'GPS Coordinates', status: 'ok', note: 'Image capture within 50m of project boundary' },
      { label: 'Timestamp', status: 'ok', note: 'Captured 12 Sep 2026 14:30 — within inspection window' },
      { label: 'Location Consistency', status: 'ok', note: 'GPS matches project location record' },
      { label: 'Reported Progress Match', status: 'warn', note: 'Site shows base course — reported surfacing not visible' },
      { label: 'Evidence Completeness', status: 'ok', note: '2 of 2 required images submitted' },
      { label: 'Visual Assessment', status: 'warn', note: 'Actual progress estimated at 31% vs reported 40%' },
    ],
  },

  {
    id: 'MP-2025-1014',
    name: 'Village Road Strengthening - Sehore',
    description: 'Strengthening and resurfacing of rural road near existing Sehore road works. Overlapping spatial footprint with MP-2024-1001.',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    category: 'Road',
    amount: 1850000,
    expenditure: 72,
    physical: 36,
    observedProgress: null,
    score: 76,
    status: 'Under Review',
    finding: 'Potential overlapping road work',
    delay: '3 months',
    vendorId: 'VEND-019',
    vendor: 'ABC Infrastructure',
    agency: 'MP Rural Works',
    latitude: 23.2118,
    longitude: 77.0964,
    paymentAnomalyFlag: false,
    vendorRisk: 86,
    similarProjectFlag: true,
    evidence: [],
    verificationChecks: [],
  },

  /* =========================================================
     MADHYA PRADESH — SEHORE
     Community Hall — DEMO CASE (highest risk)
     ========================================================= */

  {
    id: 'MP-2024-SEHORE-01',
    name: 'Community Hall Development - Sehore',
    description: 'Construction of community hall and public gathering facility in Sehore. Includes civil structure, roofing, flooring and utilities.',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    category: 'Community Infrastructure',
    amount: 4850000,
    expenditure: 85,
    physical: 40,
    observedProgress: 31,
    score: 88,
    status: 'Under Review',
    finding: 'Suspicious billing + Financial-physical mismatch',
    delay: '4 months',
    vendorId: 'VEND-019',
    vendor: 'ABC Infrastructure',
    agency: 'MP Urban Development',
    latitude: 23.2080,
    longitude: 77.0790,
    paymentAnomalyFlag: true,
    vendorRisk: 86,
    similarProjectFlag: true,
    evidence: [
      { id: 'EV-201', file: 'IMG_20260910_1120.jpg', timestamp: '10 Sep 2026, 11:20', gps: '23.2077, 77.0786', locationMatch: 'VERIFIED', visualReview: 'REQUIRES_REVIEW', description: 'Foundation and plinth visible — structural work incomplete' },
      { id: 'EV-202', file: 'IMG_20260910_1135.jpg', timestamp: '10 Sep 2026, 11:35', gps: '23.2082, 77.0793', locationMatch: 'VERIFIED', visualReview: 'VERIFIED', description: 'Pillars at DPC level — no superstructure' },
    ],
    verificationChecks: [
      { label: 'GPS Coordinates', status: 'ok', note: 'Image capture within project boundary' },
      { label: 'Timestamp', status: 'ok', note: 'Captured 10 Sep 2026 — within inspection window' },
      { label: 'Location Consistency', status: 'ok', note: 'GPS matches community hall site record' },
      { label: 'Reported Progress Match', status: 'warn', note: '85% expenditure but structure at early stage — only foundation visible' },
      { label: 'Evidence Completeness', status: 'ok', note: '2 of 2 required images submitted' },
      { label: 'Visual Assessment', status: 'warn', note: 'Structural evidence suggests ~31% actual vs 40% reported' },
    ],
  },

  /* =========================================================
     MADHYA PRADESH — INDORE
     Nearby community infrastructure works
     ========================================================= */

  {
    id: 'MP-2024-1187',
    name: 'Construction of Community Hall - Indore',
    description: 'Construction of community hall and public gathering facility in Indore.',
    state: 'Madhya Pradesh',
    district: 'Indore',
    category: 'Community Infrastructure',
    amount: 4850000,
    expenditure: 92,
    physical: 31,
    observedProgress: null,
    score: 92,
    status: 'Under Review',
    finding: 'Suspicious billing pattern',
    delay: '6 months',
    vendorId: 'VEND-019',
    vendor: 'ABC Infrastructure',
    agency: 'MP Urban Development',
    latitude: 22.7196,
    longitude: 75.8577,
    paymentAnomalyFlag: true,
    vendorRisk: 86,
    similarProjectFlag: true,
    evidence: [],
    verificationChecks: [],
  },

  {
    id: 'MP-2025-1193',
    name: 'Community Centre Extension - Indore',
    description: 'Extension of public community infrastructure facility in the same urban zone.',
    state: 'Madhya Pradesh',
    district: 'Indore',
    category: 'Community Infrastructure',
    amount: 4520000,
    expenditure: 68,
    physical: 39,
    observedProgress: null,
    score: 71,
    status: 'Ongoing',
    finding: 'Related infrastructure activity',
    delay: '2 months',
    vendorId: 'VEND-044',
    vendor: 'CivicBuild Works',
    agency: 'MP Urban Development',
    latitude: 22.7264,
    longitude: 75.8661,
    paymentAnomalyFlag: false,
    vendorRisk: 62,
    similarProjectFlag: true,
    evidence: [],
    verificationChecks: [],
  },

  /* =========================================================
     MADHYA PRADESH — BHOPAL
     Health works
     ========================================================= */

  {
    id: 'MP-2025-0421',
    name: 'Primary Health Centre Upgrade',
    description: 'Upgrade of primary health centre including civil and utility works.',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    category: 'Health',
    amount: 3200000,
    expenditure: 78,
    physical: 60,
    observedProgress: null,
    score: 68,
    status: 'Ongoing',
    finding: 'Elevated cost risk',
    delay: '2 months',
    vendorId: 'VEND-044',
    vendor: 'CivicBuild Works',
    agency: 'MP Health Engineering',
    latitude: 23.2599,
    longitude: 77.4126,
    paymentAnomalyFlag: false,
    vendorRisk: 62,
    similarProjectFlag: false,
    evidence: [],
    verificationChecks: [],
  },

  {
    id: 'MP-2025-0440',
    name: 'Health Sub-Centre Improvement - Bhopal',
    description: 'Civil improvement and utility upgrade of health sub-centre near Bhopal.',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    category: 'Health',
    amount: 2950000,
    expenditure: 61,
    physical: 52,
    observedProgress: null,
    score: 55,
    status: 'Ongoing',
    finding: 'Nearby related health infrastructure',
    delay: '1 month',
    vendorId: 'VEND-044',
    vendor: 'CivicBuild Works',
    agency: 'MP Health Engineering',
    latitude: 23.2697,
    longitude: 77.4218,
    paymentAnomalyFlag: false,
    vendorRisk: 62,
    similarProjectFlag: true,
    evidence: [],
    verificationChecks: [],
  },

  /* =========================================================
     RAJASTHAN — KOTA
     Water works
     ========================================================= */

  {
    id: 'RJ-2024-0742',
    name: 'Drinking Water Pipeline',
    description: 'Drinking water pipeline network improvement for residential areas in Kota.',
    state: 'Rajasthan',
    district: 'Kota',
    category: 'Water',
    amount: 2800000,
    expenditure: 61,
    physical: 57,
    observedProgress: null,
    score: 43,
    status: 'Ongoing',
    finding: 'No immediate concern',
    delay: 'On track',
    vendorId: 'VEND-031',
    vendor: 'JalSetu Projects',
    agency: 'Rajasthan PHED',
    latitude: 25.2138,
    longitude: 75.8648,
    paymentAnomalyFlag: false,
    vendorRisk: 38,
    similarProjectFlag: true,
    evidence: [],
    verificationChecks: [],
  },

  {
    id: 'RJ-2025-0761',
    name: 'Water Pipeline Extension - Kota',
    description: 'Extension of drinking water pipeline network in adjacent Kota locality.',
    state: 'Rajasthan',
    district: 'Kota',
    category: 'Water',
    amount: 2650000,
    expenditure: 54,
    physical: 51,
    observedProgress: null,
    score: 39,
    status: 'Ongoing',
    finding: 'Related water infrastructure',
    delay: 'On track',
    vendorId: 'VEND-031',
    vendor: 'JalSetu Projects',
    agency: 'Rajasthan PHED',
    latitude: 25.2191,
    longitude: 75.8732,
    paymentAnomalyFlag: false,
    vendorRisk: 38,
    similarProjectFlag: true,
    evidence: [],
    verificationChecks: [],
  },

  /* =========================================================
     BIHAR — GAYA
     Education works
     ========================================================= */

  {
    id: 'BR-2025-0120',
    name: 'Government School Infrastructure Upgrade',
    description: 'Infrastructure upgrade of government school including classrooms and sanitation.',
    state: 'Bihar',
    district: 'Gaya',
    category: 'Education',
    amount: 4100000,
    expenditure: 94,
    physical: 48,
    observedProgress: 45,
    score: 89,
    status: 'Delayed',
    finding: 'Vendor payment anomaly',
    delay: '5 months',
    vendorId: 'VEND-056',
    vendor: 'Eastern Buildtech',
    agency: 'Bihar Education Works',
    latitude: 24.7955,
    longitude: 84.9994,
    paymentAnomalyFlag: true,
    vendorRisk: 78,
    similarProjectFlag: true,
    evidence: [
      { id: 'EV-301', file: 'IMG_20260915_0930.jpg', timestamp: '15 Sep 2026, 09:30', gps: '24.7951, 84.9990', locationMatch: 'VERIFIED', visualReview: 'VERIFIED', description: 'Classroom block — 3 of 5 rooms complete' },
    ],
    verificationChecks: [
      { label: 'GPS Coordinates', status: 'ok', note: 'Location matches school survey record' },
      { label: 'Timestamp', status: 'ok', note: 'Captured within inspection window' },
      { label: 'Reported Progress Match', status: 'warn', note: '94% funds used — only 3 of 5 classrooms complete (est. 45%)' },
      { label: 'Evidence Completeness', status: 'ok', note: '1 of 2 required images submitted' },
    ],
  },

  {
    id: 'BR-2025-0137',
    name: 'Government School Boundary & Classroom Work',
    description: 'Additional school infrastructure work including boundary and classroom improvements.',
    state: 'Bihar',
    district: 'Gaya',
    category: 'Education',
    amount: 3850000,
    expenditure: 76,
    physical: 53,
    observedProgress: null,
    score: 64,
    status: 'Ongoing',
    finding: 'Related education infrastructure',
    delay: '2 months',
    vendorId: 'VEND-056',
    vendor: 'Eastern Buildtech',
    agency: 'Bihar Education Works',
    latitude: 24.8022,
    longitude: 85.0106,
    paymentAnomalyFlag: false,
    vendorRisk: 78,
    similarProjectFlag: true,
    evidence: [],
    verificationChecks: [],
  },

  /* =========================================================
     MAHARASHTRA — NASHIK
     Sanitation works
     ========================================================= */

  {
    id: 'MH-2024-0312',
    name: 'Community Sanitation Facility',
    description: 'Construction of community sanitation facility for local residents.',
    state: 'Maharashtra',
    district: 'Nashik',
    category: 'Sanitation',
    amount: 1650000,
    expenditure: 45,
    physical: 48,
    observedProgress: null,
    score: 22,
    status: 'Ongoing',
    finding: 'No immediate concern',
    delay: 'On track',
    vendorId: 'VEND-061',
    vendor: 'Nirmal Infra',
    agency: 'Maharashtra Water Board',
    latitude: 20.0059,
    longitude: 73.7797,
    paymentAnomalyFlag: false,
    vendorRisk: 29,
    similarProjectFlag: true,
    evidence: [],
    verificationChecks: [],
  },

  {
    id: 'MH-2025-0328',
    name: 'Community Toilet & Sanitation Block',
    description: 'Construction of sanitation block and public toilet facility in nearby Nashik locality.',
    state: 'Maharashtra',
    district: 'Nashik',
    category: 'Sanitation',
    amount: 1520000,
    expenditure: 39,
    physical: 42,
    observedProgress: null,
    score: 27,
    status: 'Ongoing',
    finding: 'Related sanitation infrastructure',
    delay: 'On track',
    vendorId: 'VEND-061',
    vendor: 'Nirmal Infra',
    agency: 'Maharashtra Water Board',
    latitude: 20.0121,
    longitude: 73.7908,
    paymentAnomalyFlag: false,
    vendorRisk: 29,
    similarProjectFlag: false,
    evidence: [],
    verificationChecks: [],
  },

]

// ── VENDORS ───────────────────────────────────────────────────
export const vendorsSeed = [
  {
    id: 'VEND-019',
    name: 'ABC Infrastructure',
    risk: 86,
    projects: 5,
    payments: 14,
    value: 14200000,
    flagged: 5,
    states: 'Madhya Pradesh',
    districts: 'Sehore, Indore',
    finding: 'Repeated similar payment amounts across multiple projects; cluster pattern detected.',
  },
  {
    id: 'VEND-044',
    name: 'CivicBuild Works',
    risk: 62,
    projects: 3,
    payments: 9,
    value: 10670000,
    flagged: 1,
    states: 'Madhya Pradesh',
    districts: 'Bhopal, Indore',
    finding: 'Payment frequency requires review; moderate risk profile.',
  },
  {
    id: 'VEND-031',
    name: 'JalSetu Projects',
    risk: 38,
    projects: 4,
    payments: 15,
    value: 5450000,
    flagged: 0,
    states: 'Rajasthan',
    districts: 'Kota, Ajmer',
    finding: 'No immediate concern. Payments within normal thresholds.',
  },
  {
    id: 'VEND-056',
    name: 'Eastern Buildtech',
    risk: 78,
    projects: 2,
    payments: 9,
    value: 7950000,
    flagged: 3,
    states: 'Bihar',
    districts: 'Gaya, Patna',
    finding: 'Transactions clustered in short periods. High expenditure vs low physical progress.',
  },
  {
    id: 'VEND-061',
    name: 'Nirmal Infra',
    risk: 29,
    projects: 3,
    payments: 8,
    value: 3170000,
    flagged: 0,
    states: 'Maharashtra',
    districts: 'Nashik, Pune',
    finding: 'No immediate concern.',
  },
]

// ── PAYMENTS ──────────────────────────────────────────────────
export const paymentsSeed = [
  // MP-2024-1001 Road Sehore — 3 identical clustered payments
  { id: 'TXN-001', projectId: 'MP-2024-1001', vendorId: 'VEND-019', amount: 500000, date: '2026-08-22', type: 'Milestone', status: 'Flagged', flagged: true, reason: 'Three identical payments within 48 hours — possible threshold avoidance' },
  { id: 'TXN-002', projectId: 'MP-2024-1001', vendorId: 'VEND-019', amount: 500000, date: '2026-08-23', type: 'Milestone', status: 'Under Review', flagged: true, reason: 'Repeated amount pattern — second occurrence' },
  { id: 'TXN-003', projectId: 'MP-2024-1001', vendorId: 'VEND-019', amount: 500000, date: '2026-08-24', type: 'Milestone', status: 'Processed', flagged: true, reason: 'Payment clustered within 48 hours' },
  { id: 'TXN-004', projectId: 'MP-2024-1001', vendorId: 'VEND-019', amount: 100000, date: '2026-07-15', type: 'Advance', status: 'Processed', flagged: false, reason: null },

  // MP-2024-SEHORE-01 Community Hall Sehore
  { id: 'TXN-S01', projectId: 'MP-2024-SEHORE-01', vendorId: 'VEND-019', amount: 875000, date: '2026-07-10', type: 'Advance', status: 'Processed', flagged: false, reason: null },
  { id: 'TXN-S02', projectId: 'MP-2024-SEHORE-01', vendorId: 'VEND-019', amount: 875000, date: '2026-08-01', type: 'Milestone', status: 'Flagged', flagged: true, reason: 'Identical amount released 3 weeks after advance — unusually close' },
  { id: 'TXN-S03', projectId: 'MP-2024-SEHORE-01', vendorId: 'VEND-019', amount: 875000, date: '2026-08-14', type: 'Milestone', status: 'Under Review', flagged: true, reason: 'Third identical payment — pattern confirmed' },
  { id: 'TXN-S04', projectId: 'MP-2024-SEHORE-01', vendorId: 'VEND-019', amount: 650000, date: '2026-09-01', type: 'Final', status: 'Processed', flagged: false, reason: null },

  // MP-2024-1187 Community Hall Indore
  { id: 'TXN-005', projectId: 'MP-2024-1187', vendorId: 'VEND-019', amount: 875000, date: '2026-08-28', type: 'Advance', status: 'Processed', flagged: false, reason: null },
  { id: 'TXN-006', projectId: 'MP-2024-1187', vendorId: 'VEND-019', amount: 875000, date: '2026-09-02', type: 'Milestone', status: 'Flagged', flagged: true, reason: 'Same amount repeated — pattern matches Sehore contractor behavior' },

  // BR-2025-0120 School Bihar
  { id: 'TXN-007', projectId: 'BR-2025-0120', vendorId: 'VEND-056', amount: 725000, date: '2026-08-12', type: 'Milestone', status: 'Flagged', flagged: true, reason: 'Unusual payment frequency — 4 payments within 30 days' },
  { id: 'TXN-008', projectId: 'BR-2025-0120', vendorId: 'VEND-056', amount: 725000, date: '2026-08-19', type: 'Milestone', status: 'Flagged', flagged: true, reason: 'Same amount — repeated' },
  { id: 'TXN-009', projectId: 'BR-2025-0120', vendorId: 'VEND-056', amount: 725000, date: '2026-08-28', type: 'Milestone', status: 'Under Review', flagged: true, reason: 'Third identical payment' },

  // RJ-2024-0742 Water Kota
  { id: 'TXN-010', projectId: 'RJ-2024-0742', vendorId: 'VEND-031', amount: 420000, date: '2026-08-08', type: 'Milestone', status: 'Released', flagged: false, reason: null },
  { id: 'TXN-011', projectId: 'RJ-2024-0742', vendorId: 'VEND-031', amount: 280000, date: '2026-07-22', type: 'Advance', status: 'Released', flagged: false, reason: null },

  // MP-2025-1014 Village Road Sehore
  { id: 'TXN-012', projectId: 'MP-2025-1014', vendorId: 'VEND-019', amount: 350000, date: '2026-08-10', type: 'Milestone', status: 'Processed', flagged: false, reason: null },
]

// ── INSPECTIONS ───────────────────────────────────────────────
export const inspectionsSeed = [
  {
    id: 'INSP-1001',
    projectId: 'MP-2024-1001',
    officer: 'Anita Sharma',
    priority: 'High',
    date: '2026-09-12',
    status: 'Submitted',
    reason: 'Verify reported physical progress against payment records.',
    reported: 40,
    observed: 31,
    verificationResult: 'Progress discrepancy confirmed — 9pp variance',
  },
  {
    id: 'INSP-1002',
    projectId: 'MP-2024-SEHORE-01',
    officer: 'Rakesh Verma',
    priority: 'High',
    date: '2026-09-10',
    status: 'Submitted',
    reason: 'Verify community hall construction against 85% expenditure claim.',
    reported: 40,
    observed: 31,
    verificationResult: 'Structural evidence suggests ~31% actual progress',
  },
  {
    id: 'INSP-1003',
    projectId: 'MP-2024-1187',
    officer: 'Sanjay Mehta',
    priority: 'High',
    date: '2026-09-14',
    status: 'Pending',
    reason: 'Review delayed community infrastructure and 92% expenditure.',
    reported: 31,
    observed: null,
    verificationResult: null,
  },
  {
    id: 'INSP-1004',
    projectId: 'BR-2025-0120',
    officer: 'Meera Kumari',
    priority: 'Medium',
    date: '2026-09-15',
    status: 'Submitted',
    reason: 'Validate vendor payment anomaly against physical work.',
    reported: 48,
    observed: 45,
    verificationResult: '3pp variance — within threshold but pattern concerning',
  },
]

// ── PROGRESS ──────────────────────────────────────────────────
export const progressSeed = [
  { id: 'PROG-001', projectId: 'MP-2024-1001', percent: 35, date: '2026-09-05', by: 'District Authority', role: 'District Authority', remarks: 'Road base layer complete.', verification: 'Verified' },
  { id: 'PROG-002', projectId: 'MP-2024-1001', percent: 40, date: '2026-09-10', by: 'Field Officer', role: 'Field Officer', remarks: 'Road base work reported complete. Bituminous layer pending.', verification: 'Pending Verification' },
  { id: 'PROG-003', projectId: 'MP-2024-SEHORE-01', percent: 40, date: '2026-09-10', by: 'Agency', role: 'Implementing Agency', remarks: 'Superstructure work ongoing.', verification: 'Pending Verification' },
  { id: 'PROG-004', projectId: 'MP-2024-1187', percent: 31, date: '2026-09-01', by: 'Agency', role: 'Implementing Agency', remarks: 'Foundation and plinth complete.', verification: 'Pending Verification' },
]

// ── RISK TREND DATA ────────────────────────────────────────────
export const trendData = [
  { month: 'Apr', high: 2, medium: 3, low: 5, critical: 1 },
  { month: 'May', high: 3, medium: 4, low: 5, critical: 1 },
  { month: 'Jun', high: 3, medium: 4, low: 4, critical: 2 },
  { month: 'Jul', high: 4, medium: 5, low: 4, critical: 2 },
  { month: 'Aug', high: 5, medium: 5, low: 3, critical: 3 },
  { month: 'Sep', high: 6, medium: 5, low: 2, critical: 4 },
]

// ── FUND DATA ──────────────────────────────────────────────────
export const fundData = [
  { state: 'Madhya Pradesh', allocated: 82, utilized: 75 },
  { state: 'Bihar', allocated: 59, utilized: 52 },
  { state: 'Rajasthan', allocated: 46, utilized: 38 },
  { state: 'Maharashtra', allocated: 38, utilized: 30 },
]

// ── AUDIT SEED ────────────────────────────────────────────────
export const auditSeed = [
  { time: '13 Sep 2026, 03:00 PM', actor: 'AI Risk Engine', action: 'Risk score escalated', detail: 'MP-2024-SEHORE-01 risk elevated to 88 — financial-physical gap and payment cluster confirmed.', tone: 'ai', projectId: 'MP-2024-SEHORE-01' },
  { time: '12 Sep 2026, 02:45 PM', actor: 'Rakesh Verma (Field Officer)', action: 'Evidence verification submitted', detail: 'MP-2024-SEHORE-01 — Reported 40% vs observed 31%. SHA-256 record generated.', tone: 'human', projectId: 'MP-2024-SEHORE-01' },
  { time: '12 Sep 2026, 02:30 PM', actor: 'Anita Sharma (Field Officer)', action: 'Evidence verification submitted', detail: 'MP-2024-1001 Road Sehore — Reported 40% vs evidence-supported 31%. 9pp discrepancy recorded.', tone: 'human', projectId: 'MP-2024-1001' },
  { time: '05 Sep 2026, 04:18 PM', actor: 'AI Risk Engine', action: 'Risk score updated', detail: 'MP-2024-1001 Road Sehore — Score 68 → 82. New transaction anomaly detected.', tone: 'ai', projectId: 'MP-2024-1001' },
  { time: '01 Sep 2026, 11:02 AM', actor: 'System', action: 'Projects flagged', detail: 'Financial-progress mismatch detected across 3 Sehore projects.', tone: 'system', projectId: null },
  { time: '15 Aug 2026, 09:30 AM', actor: 'District Authority', action: 'Progress report submitted', detail: 'MP-2024-1001 Physical progress reported at 40%.', tone: 'human', projectId: 'MP-2024-1001' },
]