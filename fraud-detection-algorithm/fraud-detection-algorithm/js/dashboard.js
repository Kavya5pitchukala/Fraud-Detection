// ============================================================
// dashboard.js — UI Rendering for Fraud Detection Dashboard
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const transactions = generateTransactions(10000);
  let flagged = [];
  let metrics = {};

  // ─── Run Detection ───────────────────────────────────────
  function runDetection() {
    const start = performance.now();
    flagged  = detectFraud(transactions);
    const end = performance.now();
    metrics  = evaluateModel(flagged, transactions);

    renderStats(flagged, transactions, (end - start).toFixed(2));
    renderMatrix(metrics);
    renderTable(flagged.slice(0, 50));
  }

  // ─── Stats Cards ─────────────────────────────────────────
  function renderStats(flagged, all, ms) {
    document.getElementById('total-tx').textContent     = all.length.toLocaleString();
    document.getElementById('flagged-tx').textContent   = flagged.length.toLocaleString();
    document.getElementById('precision').textContent    = metrics.precision + '%';
    document.getElementById('exec-time').textContent    = ms + ' ms';
  }

  // ─── Confusion Matrix ────────────────────────────────────
  function renderMatrix(m) {
    document.getElementById('tp').textContent = m.tp;
    document.getElementById('fp').textContent = m.fp;
    document.getElementById('fn').textContent = m.fn;
    document.getElementById('tn').textContent = m.tn;
    document.getElementById('f1').textContent = m.f1 + '%';
    document.getElementById('recall').textContent = m.recall + '%';
  }

  // ─── Flagged Table ───────────────────────────────────────
  function renderTable(rows) {
    const tbody = document.getElementById('flagged-body');
    tbody.innerHTML = rows.map(tx => `
      <tr class="risk-${tx.riskScore >= 2 ? 'high' : 'low'}">
        <td>#${tx.id}</td>
        <td>User ${tx.userId}</td>
        <td>₹${tx.amount.toLocaleString()}</td>
        <td>${tx.merchant}</td>
        <td>${tx.city}</td>
        <td>${new Date(tx.timestamp).toLocaleString()}</td>
        <td>${tx.reasons.join(', ')}</td>
        <td><span class="badge risk-${tx.riskScore >= 2 ? 'high' : 'medium'}">${tx.riskScore >= 2 ? 'HIGH' : 'MEDIUM'}</span></td>
      </tr>
    `).join('');
  }

  // ─── Filter ──────────────────────────────────────────────
  document.getElementById('filter-risk').addEventListener('change', (e) => {
    const val = e.target.value;
    const filtered = val === 'all' ? flagged
      : val === 'high' ? flagged.filter(t => t.riskScore >= 2)
      : flagged.filter(t => t.riskScore < 2);
    renderTable(filtered.slice(0, 50));
  });

  // ─── Init ────────────────────────────────────────────────
  document.getElementById('run-btn').addEventListener('click', runDetection);
  runDetection();
});
