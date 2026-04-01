-- ============================================================
-- Fraud Detection - SQL Queries
-- ============================================================

-- 1. High-amount transactions
SELECT id, user_id, amount, merchant, timestamp
FROM transactions
WHERE amount > 50000
ORDER BY amount DESC;

-- 2. Rapid repeat transactions (more than 3 in 60 seconds per user)
SELECT user_id, COUNT(*) AS tx_count, MIN(timestamp) AS window_start
FROM transactions
WHERE timestamp >= NOW() - INTERVAL 60 SECOND
GROUP BY user_id
HAVING tx_count > 3;

-- 3. Odd-hour transactions (1 AM - 4 AM)
SELECT * FROM transactions
WHERE HOUR(timestamp) BETWEEN 1 AND 3
ORDER BY timestamp DESC;

-- 4. Precision / Recall evaluation
SELECT
  SUM(is_fraud = 1 AND flagged = 1)  AS true_positive,
  SUM(is_fraud = 0 AND flagged = 1)  AS false_positive,
  SUM(is_fraud = 1 AND flagged = 0)  AS false_negative,
  SUM(is_fraud = 0 AND flagged = 0)  AS true_negative
FROM transactions;
