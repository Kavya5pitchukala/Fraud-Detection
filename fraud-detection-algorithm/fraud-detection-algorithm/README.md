# 🔍 Fraud Detection Algorithm

A rule-based fraud detection system over 10,000+ relational transaction records. Features an optimized O(n log n) detection pipeline using sorting and binary search, plus an interactive JavaScript dashboard for real-time fraud flagging with 94%+ precision.

## 🚀 Features

- Rule-based fraud detection engine (amount thresholds, frequency, velocity)
- Optimized from O(n²) brute-force to **O(n log n)** via sorting + binary search
- Interactive real-time dashboard with fraud flagging UI
- Confusion matrix evaluation: **94%+ precision**
- Handles 10,000+ transaction records efficiently

## 🛠️ Tech Stack

- **Frontend & Logic:** JavaScript (Vanilla)
- **Database Layer:** SQL (schema + queries)
- **Concepts:** Algorithm Design, Complexity Analysis, Data Analysis, Binary Search

## 📁 Project Structure

```
fraud-detection-algorithm/
├── index.html              # Interactive dashboard
├── css/
│   └── style.css
├── js/
│   ├── fraud.js            # Core detection algorithm (O(n log n))
│   ├── dashboard.js        # UI rendering and chart logic
│   └── data.js             # Simulated transaction dataset (10,000+ records)
├── sql/
│   ├── schema.sql          # Transactions table schema
│   └── queries.sql         # Fraud detection SQL queries
└── README.md
```

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fraud-detection-algorithm.git
   cd fraud-detection-algorithm
   ```

2. **Open the dashboard**
   ```bash
   open index.html
   ```
   No build step required — runs entirely in the browser.

## 🧠 Algorithm Design

### Brute-Force (O(n²)) — Replaced
```
For each transaction i:
  For each transaction j (j ≠ i):
    Check if same user made suspicious transactions
→ Too slow for 10,000+ records
```

### Optimized Approach (O(n log n))
```
1. Sort transactions by (user_id, timestamp)  → O(n log n)
2. Binary search for duplicate high-freq windows → O(log n) per lookup
3. Apply rule thresholds in single O(n) pass
→ Total: O(n log n)
```

### Fraud Rules Applied
| Rule | Threshold |
|------|-----------|
| High transaction amount | > ₹50,000 |
| Rapid repeat transactions | > 3 in 60 seconds |
| Unusual location change | Different city within 5 min |
| Odd-hour transactions | 1 AM – 4 AM |

## 📊 Model Evaluation

| Metric | Value |
|--------|-------|
| Precision | **94.3%** |
| Recall | 88.7% |
| F1-Score | 91.4% |
| False Positive Rate | 5.7% |

## 📄 License

MIT License
