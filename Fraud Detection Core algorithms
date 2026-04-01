// ============================================================
// fraud.js — Core Fraud Detection Algorithm
// Optimized: O(n log n) via sorting + binary search
// ============================================================

/**
 * Fraud detection rules configuration
 */
const RULES = {
  HIGH_AMOUNT_THRESHOLD: 50000,       // ₹50,000+
  RAPID_TX_WINDOW_SEC: 60,            // 60-second window
  RAPID_TX_COUNT: 3,                  // more than 3 transactions
  ODD_HOUR_START: 1,                  // 1 AM
  ODD_HOUR_END: 4,                    // 4 AM
};

/**
 * Binary search — find first transaction index by userId in sorted array
 * O(log n)
 */
function binarySearchUser(transactions, userId) {
  let lo = 0, hi = transactions.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (transactions[mid].userId === userId) {
      // Walk back to first occurrence
      while (mid > 0 && transactions[mid - 1].userId === userId) return mid - 1;
      return mid;
    }
    transactions[mid].userId < userId ? (lo = mid + 1) : (hi = mid - 1);
  }
  return -1;
}

/**
 * Main fraud detection pipeline — O(n log n)
 * @param {Array} transactions - raw transaction records
 * @returns {Array} flagged transactions with reasons
 */
function detectFraud(transactions) {
  // Step 1: Sort by userId then timestamp — O(n log n)
  const sorted = [...transactions].sort((a, b) =>
    a.userId !== b.userId ? a.userId - b.userId : a.timestamp - b.timestamp
  );

  const flagged = [];
  const seen = new Map(); // userId → [timestamps]

  // Step 2: Single O(n) pass with binary search lookups
  for (let i = 0; i < sorted.length; i++) {
    const tx = sorted[i];
    const reasons = [];

    // Rule 1: High amount
    if (tx.amount > RULES.HIGH_AMOUNT_THRESHOLD) {
      reasons.push(`High amount: ₹${tx.amount.toLocaleString()}`);
    }

    // Rule 2: Rapid repeat transactions (binary search window)
    if (!seen.has(tx.userId)) seen.set(tx.userId, []);
    const userTxTimes = seen.get(tx.userId);
    userTxTimes.push(tx.timestamp);

    // Count transactions in last 60 seconds using binary search
    const windowStart = tx.timestamp - RULES.RAPID_TX_WINDOW_SEC * 1000;
    let lo = 0, hi = userTxTimes.length - 1, firstInWindow = userTxTimes.length;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (userTxTimes[mid] >= windowStart) { firstInWindow = mid; hi = mid - 1; }
      else lo = mid + 1;
    }
    const txInWindow = userTxTimes.length - firstInWindow;
    if (txInWindow > RULES.RAPID_TX_COUNT) {
      reasons.push(`Rapid transactions: ${txInWindow} in 60s`);
    }

    // Rule 3: Odd-hour transaction
    const hour = new Date(tx.timestamp).getHours();
    if (hour >= RULES.ODD_HOUR_START && hour < RULES.ODD_HOUR_END) {
      reasons.push(`Odd-hour transaction at ${hour}:00`);
    }

    if (reasons.length > 0) {
      flagged.push({ ...tx, reasons, riskScore: reasons.length });
    }
  }

  // Sort flagged by risk score descending
  return flagged.sort((a, b) => b.riskScore - a.riskScore);
}

/**
 * Evaluate precision/recall against labeled dataset
 * @param {Array} flagged    - detected fraud transactions
 * @param {Array} allTx      - all transactions with .isFraud label
 */
function evaluateModel(flagged, allTx) {
  const flaggedIds = new Set(flagged.map(t => t.id));
  let tp = 0, fp = 0, fn = 0, tn = 0;

  allTx.forEach(tx => {
    const detected = flaggedIds.has(tx.id);
    if (detected && tx.isFraud)       tp++;
    else if (detected && !tx.isFraud) fp++;
    else if (!detected && tx.isFraud) fn++;
    else                              tn++;
  });

  const precision = tp / (tp + fp) || 0;
  const recall    = tp / (tp + fn) || 0;
  const f1        = 2 * precision * recall / (precision + recall) || 0;

  return {
    tp, fp, fn, tn,
    precision: (precision * 100).toFixed(1),
    recall:    (recall * 100).toFixed(1),
    f1:        (f1 * 100).toFixed(1),
    matrix: [[tp, fp], [fn, tn]]
  };
}

// Export for use in dashboard
if (typeof module !== 'undefined') {
  module.exports = { detectFraud, evaluateModel, RULES };
}
