// ============================================================
// data.js — Simulated Transaction Dataset Generator
// Generates 10,000+ realistic transaction records
// ============================================================

const MERCHANTS = ['Amazon', 'Flipkart', 'Swiggy', 'Zomato', 'IRCTC', 'PhonePe', 'GPay', 'Paytm'];
const CITIES    = ['Hyderabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Kolkata'];

/**
 * Generate a random integer between min and max (inclusive)
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate synthetic transaction dataset
 * @param {number} count - number of transactions (default: 10000)
 * @returns {Array} transactions
 */
function generateTransactions(count = 10000) {
  const transactions = [];
  const baseTime = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 days ago
  const fraudUserIds = new Set([12, 47, 88, 156, 203, 389, 412, 567, 789, 934]);

  for (let i = 0; i < count; i++) {
    const userId    = randInt(1, 1000);
    const isFraud   = fraudUserIds.has(userId) && Math.random() < 0.4;
    const timestamp = baseTime + randInt(0, 30 * 24 * 60 * 60 * 1000);

    // Fraud transactions have suspicious patterns
    const amount = isFraud
      ? randInt(45000, 150000)
      : randInt(50, 15000);

    // Fraud may happen in odd hours
    const fraudDate = new Date(timestamp);
    if (isFraud && Math.random() < 0.5) fraudDate.setHours(randInt(1, 3));

    transactions.push({
      id:        i + 1,
      userId,
      amount,
      merchant:  MERCHANTS[randInt(0, MERCHANTS.length - 1)],
      city:      CITIES[randInt(0, CITIES.length - 1)],
      timestamp: isFraud ? fraudDate.getTime() : timestamp,
      isFraud,
    });
  }

  return transactions;
}

// Singleton dataset
const TRANSACTIONS = generateTransactions(10000);

if (typeof module !== 'undefined') {
  module.exports = { generateTransactions, TRANSACTIONS };
}
