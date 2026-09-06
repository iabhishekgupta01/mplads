export const formatCurrency = (amount) => amount >= 10000000 ? `₹${(amount / 10000000).toFixed(1)} Cr` : `₹${(amount / 100000).toFixed(1)} L`
export const riskLabel = (score) => score >= 80 ? 'HIGH' : score >= 50 ? 'MEDIUM' : 'LOW'
