-- ============================================================
-- Fraud Detection - SQL Schema
-- ============================================================

CREATE TABLE transactions (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NOT NULL,
    amount      DECIMAL(12, 2) NOT NULL,
    merchant    VARCHAR(100),
    city        VARCHAR(100),
    timestamp   DATETIME NOT NULL,
    is_fraud    TINYINT(1) DEFAULT 0,
    INDEX idx_user_id  (user_id),
    INDEX idx_timestamp (timestamp),
    INDEX idx_amount   (amount)
);
