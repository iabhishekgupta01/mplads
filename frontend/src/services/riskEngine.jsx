import { paymentsSeed, projectsSeed } from '../data/mockData.js'

const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(Number(value) || 0, min), max)

const getRiskLevel = (score) => {
  if (score >= 80) return 'CRITICAL'
  if (score >= 60) return 'HIGH'
  if (score >= 40) return 'MEDIUM'
  return 'LOW'
}

const getSeverity = (score) => {
  if (score >= 80) return 'Critical'
  if (score >= 60) return 'High'
  if (score >= 40) return 'Medium'
  return 'Low'
}

const calculateProgressMismatch = (project) => {
  const gap = Math.max(0, project.expenditure - project.physical)

  let score = 0

  if (gap >= 50) score = 30
  else if (gap >= 35) score = 26
  else if (gap >= 25) score = 20
  else if (gap >= 15) score = 12
  else if (gap >= 10) score = 6

  return {
    id: 'FINANCIAL_PHYSICAL_MISMATCH',
    name: 'Financial–Physical Mismatch',
    category: 'Financial Integrity',
    score,
    severity: getSeverity(score),
    detected: score > 0,
    evidence: {
      expenditure: project.expenditure,
      physicalProgress: project.physical,
      gap,
    },
    explanation:
      score > 0
        ? `Expenditure is ${project.expenditure}% while reported physical progress is ${project.physical}%, creating a ${gap} percentage-point gap.`
        : 'Financial expenditure is broadly aligned with reported physical progress.',
  }
}

const calculateDelayRisk = (project) => {
  const delayText = String(project.delay || '').toLowerCase()

  const monthsMatch = delayText.match(/(\d+(?:\.\d+)?)\s*month/)
  const months = monthsMatch ? Number(monthsMatch[1]) : 0

  let score = 0

  if (months >= 6) score = 22
  else if (months >= 4) score = 18
  else if (months >= 2) score = 12
  else if (months > 0) score = 6

  const probability = clamp(
    months >= 6 ? 88 : months >= 4 ? 78 : months >= 2 ? 58 : months > 0 ? 35 : 12
  )

  return {
    id: 'DELAY_RISK',
    name: 'Schedule Delay Risk',
    category: 'Execution',
    score,
    severity: getSeverity(score),
    detected: score > 0,
    evidence: {
      reportedDelay: project.delay,
      delayMonths: months,
      probability,
    },
    explanation:
      months > 0
        ? `The project is currently delayed by approximately ${months} month${months === 1 ? '' : 's'} against its expected execution timeline.`
        : 'No material schedule delay is currently indicated.',
  }
}

const calculatePaymentRisk = (project, payments) => {
  const projectPayments = payments.filter(
    (payment) => payment.projectId === project.id
  )

  const flaggedPayments = projectPayments.filter((payment) => payment.flagged)

  const identicalAmounts = {}

  projectPayments.forEach((payment) => {
    const amount = Number(payment.amount) || 0
    identicalAmounts[amount] = (identicalAmounts[amount] || 0) + 1
  })

  const repeatedAmountGroups = Object.entries(identicalAmounts).filter(
    ([, count]) => count >= 2
  )

  let score = 0

  if (flaggedPayments.length >= 3) score = 24
  else if (flaggedPayments.length === 2) score = 18
  else if (flaggedPayments.length === 1) score = 10
  else if (repeatedAmountGroups.length > 0) score = 8

  return {
    id: 'PAYMENT_ANOMALY',
    name: 'Payment Pattern Anomaly',
    category: 'Financial Integrity',
    score,
    severity: getSeverity(score),
    detected: score > 0,
    evidence: {
      totalPayments: projectPayments.length,
      flaggedPayments: flaggedPayments.length,
      repeatedAmountGroups: repeatedAmountGroups.map(([amount, count]) => ({
        amount: Number(amount),
        count,
      })),
      payments: projectPayments,
    },
    explanation:
      score > 0
        ? `${flaggedPayments.length || repeatedAmountGroups.length} suspicious payment pattern${flaggedPayments.length === 1 ? '' : 's'} detected for this project.`
        : 'No significant payment pattern anomaly detected.',
  }
}

const calculateDuplicateRisk = (project, projects) => {
  const similarProjects = projects.filter(
    (candidate) =>
      candidate.id !== project.id &&
      candidate.state === project.state &&
      candidate.district === project.district &&
      candidate.category === project.category
  )

  /*
   * Prototype similarity signal.
   *
   * In the production system this can be replaced by:
   * - geospatial similarity
   * - NLP project-description similarity
   * - beneficiary/location matching
   * - asset coordinates
   * - historical work matching
   */
  let score = 0

  if (similarProjects.length >= 2) score = 16
  else if (similarProjects.length === 1) score = 8

  return {
    id: 'SIMILAR_WORK',
    name: 'Similar / Duplicate Work Signal',
    category: 'Compliance',
    score,
    severity: getSeverity(score),
    detected: score > 0,
    evidence: {
      similarProjectCount: similarProjects.length,
      similarProjects: similarProjects.map((item) => ({
        id: item.id,
        name: item.name,
        district: item.district,
        category: item.category,
      })),
    },
    explanation:
      score > 0
        ? `${similarProjects.length} project${similarProjects.length === 1 ? '' : 's'} with matching location and work category require comparison for possible duplication or overlap.`
        : 'No strong duplicate-work signal detected from the available prototype data.',
  }
}

const calculateCostRisk = (project) => {
  /*
   * Prototype cost-risk heuristic.
   *
   * This is deliberately isolated so it can later be replaced
   * by an ML regression/model using historical project costs.
   */
  const financialProgressGap = Math.max(
    0,
    project.expenditure - project.physical
  )

  let score = 0

  if (financialProgressGap >= 45) score = 15
  else if (financialProgressGap >= 30) score = 12
  else if (financialProgressGap >= 20) score = 8
  else if (financialProgressGap >= 10) score = 4

  const probability = clamp(
    score >= 15 ? 78 : score >= 12 ? 68 : score >= 8 ? 52 : score >= 4 ? 35 : 15
  )

  return {
    id: 'COST_OVERRUN_RISK',
    name: 'Cost Overrun Risk',
    category: 'Financial Planning',
    score,
    severity: getSeverity(score),
    detected: score > 0,
    evidence: {
      expenditure: project.expenditure,
      physicalProgress: project.physical,
      probability,
    },
    explanation:
      score > 0
        ? `The financial consumption rate is materially ahead of physical execution, increasing the probability of future cost pressure.`
        : 'Current financial execution does not indicate a significant cost-overrun signal.',
  }
}

const calculateVendorRisk = (project, vendors = []) => {
  const vendor = vendors.find((item) => item.id === project.vendorId)

  if (!vendor) {
    return {
      id: 'VENDOR_RISK',
      name: 'Vendor Risk',
      category: 'Vendor Integrity',
      score: 0,
      severity: 'Low',
      detected: false,
      evidence: {},
      explanation: 'No vendor risk information is available.',
    }
  }

  const vendorRisk = clamp(vendor.risk)

  let score = 0

  if (vendorRisk >= 80) score = 12
  else if (vendorRisk >= 60) score = 8
  else if (vendorRisk >= 40) score = 4

  return {
    id: 'VENDOR_RISK',
    name: 'Vendor Risk',
    category: 'Vendor Integrity',
    score,
    severity: getSeverity(score),
    detected: score > 0,
    evidence: {
      vendorId: vendor.id,
      vendorName: vendor.name,
      vendorRisk,
      flaggedProjects: vendor.flagged,
      vendorFinding: vendor.finding,
    },
    explanation:
      score > 0
        ? `${vendor.name} has a vendor risk score of ${vendorRisk}/100 and requires additional scrutiny.`
        : `${vendor.name} does not currently show a significant vendor-level risk signal.`,
  }
}

export const calculateProjectRisk = (
  project,
  {
    projects = projectsSeed,
    payments = paymentsSeed,
    vendors = [],
  } = {}
) => {
  if (!project) return null

  const signals = [
    calculateProgressMismatch(project),
    calculateDelayRisk(project),
    calculatePaymentRisk(project, payments),
    calculateDuplicateRisk(project, projects),
    calculateCostRisk(project),
    calculateVendorRisk(project, vendors),
  ]

  const activeSignals = signals.filter((signal) => signal.detected)

  /*
   * The score is derived from independent signals.
   *
   * The project's existing score is NOT used to calculate the
   * new score. This is intentional: the engine should explain
   * the score instead of simply repeating the mock score.
   */
  const rawScore = signals.reduce((total, signal) => total + signal.score, 0)

  const score = clamp(rawScore)

  const confidence = clamp(
    58 +
      activeSignals.length * 6 +
      (project.expenditure != null ? 5 : 0) +
      (project.physical != null ? 5 : 0)
  )

  const riskLevel = getRiskLevel(score)

  const priority =
    score >= 80 ? 'Immediate Investigation' :
    score >= 60 ? 'Priority Review' :
    score >= 40 ? 'Monitor Closely' :
    'Routine Monitoring'

  const strongestSignals = [...activeSignals]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  let recommendation = 'Continue routine monitoring.'

  if (
    strongestSignals.some(
      (signal) => signal.id === 'FINANCIAL_PHYSICAL_MISMATCH'
    )
  ) {
    recommendation =
      'Request field verification of physical progress before further fund release.'
  } else if (
    strongestSignals.some((signal) => signal.id === 'PAYMENT_ANOMALY')
  ) {
    recommendation =
      'Review payment records and supporting bills before approving subsequent payments.'
  } else if (
    strongestSignals.some((signal) => signal.id === 'DELAY_RISK')
  ) {
    recommendation =
      'Review milestone recovery plan and initiate schedule monitoring.'
  }

  return {
    projectId: project.id,
    score,
    riskLevel,
    confidence,
    priority,
    signals,
    activeSignals,
    strongestSignals,
    recommendation,

    summary:
      activeSignals.length > 0
        ? `${activeSignals.length} independent risk signal${activeSignals.length === 1 ? '' : 's'} detected across financial, execution, payment, vendor and compliance dimensions.`
        : 'No significant anomaly detected from the available project data.',

    generatedAt: new Date().toISOString(),
  }
}

export const calculateAllProjectRisks = (
  projects = projectsSeed,
  options = {}
) =>
  projects.map((project) => ({
    ...project,
    aiRisk: calculateProjectRisk(project, {
      projects,
      ...options,
    }),
  }))

export const getProjectRisk = (projectId, options = {}) => {
  const projects = options.projects || projectsSeed
  const project = projects.find((item) => item.id === projectId)

  if (!project) return null

  return calculateProjectRisk(project, {
    ...options,
    projects,
  })
}