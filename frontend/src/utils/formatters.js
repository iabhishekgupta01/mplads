export const formatCurrency = (amount) =>
  amount >= 10000000
    ? `₹${(amount / 10000000).toFixed(1)} Cr`
    : `₹${(amount / 100000).toFixed(1)} L`

export const riskLabel = (score) =>
  score >= 80 ? 'CRITICAL' : score >= 60 ? 'HIGH' : score >= 40 ? 'MEDIUM' : 'LOW'

export const riskColor = (score) =>
  score >= 80 ? '#dc4a38' : score >= 60 ? '#d9890f' : score >= 40 ? '#b77b1e' : '#2a8a6e'

export const riskBg = (score) =>
  score >= 80 ? '#faece8' : score >= 60 ? '#fff5e4' : score >= 40 ? '#fffbeb' : '#e9f5ef'
