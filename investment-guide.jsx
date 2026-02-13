import { useState } from "react";

const tabs = [
  { id: 1, label: "8-10% APY?", icon: "📈" },
  { id: 2, label: "Over-Diversified?", icon: "🔀" },
  { id: 3, label: "Improvements", icon: "⚡" },
  { id: 4, label: "Deploy Funds", icon: "💰" },
  { id: 5, label: "Rebalancing", icon: "⚖️" },
  { id: 6, label: "Stay On Top", icon: "🎯" },
  { id: 7, label: "Accounting", icon: "📋" },
];

const portfolio = [
  { ticker: "QQQ", weight: 50, type: "etf", inQQQ: false },
  { ticker: "VXUS", weight: 10, type: "etf", inQQQ: false },
  { ticker: "EEM", weight: 5, type: "etf", inQQQ: false },
  { ticker: "IBIT", weight: 5, type: "alt", inQQQ: false },
  { ticker: "IAU", weight: 5, type: "alt", inQQQ: false },
  { ticker: "NVDA", weight: 2.5, type: "stock", inQQQ: true },
  { ticker: "GOOGL", weight: 2.5, type: "stock", inQQQ: true },
  { ticker: "META", weight: 2.5, type: "stock", inQQQ: true },
  { ticker: "AAPL", weight: 2.5, type: "stock", inQQQ: true },
  { ticker: "AMZN", weight: 2.5, type: "stock", inQQQ: false },
  { ticker: "MSFT", weight: 2.5, type: "stock", inQQQ: true },
  { ticker: "INTU", weight: 2.5, type: "stock", inQQQ: true },
  { ticker: "TSM", weight: 2.5, type: "stock", inQQQ: false },
  { ticker: "NFLX", weight: 2.5, type: "stock", inQQQ: true },
  { ticker: "CASH", weight: 2.5, type: "cash", inQQQ: false },
];

const colors = {
  etf: "#00d4ff",
  stock: "#a78bfa",
  alt: "#f59e0b",
  cash: "#34d399",
};

export default function App() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      background: "#060912",
      minHeight: "100vh",
      color: "#e2e8f0",
      padding: "24px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#00d4ff", boxShadow: "0 0 12px #00d4ff"
          }} />
          <span style={{ fontSize: "11px", color: "#00d4ff", letterSpacing: "3px", textTransform: "uppercase" }}>
            Portfolio Intelligence
          </span>
        </div>
        <h1 style={{
          fontSize: "22px", fontWeight: "700", color: "#f8fafc",
          letterSpacing: "-0.5px", margin: 0
        }}>
          Your Investment Playbook
        </h1>
        <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
          $40,000 · 15 positions · 7 questions answered
        </p>
      </div>

      {/* Tab Nav */}
      <div style={{
        display: "flex", gap: "4px", flexWrap: "wrap",
        marginBottom: "24px", background: "#0d1117",
        padding: "6px", borderRadius: "10px",
        border: "1px solid #1e293b"
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "8px 14px",
              borderRadius: "7px",
              border: "none",
              cursor: "pointer",
              fontSize: "11px",
              fontFamily: "inherit",
              letterSpacing: "0.5px",
              fontWeight: activeTab === t.id ? "700" : "400",
              background: activeTab === t.id ? "#00d4ff" : "transparent",
              color: activeTab === t.id ? "#060912" : "#64748b",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        background: "#0d1117",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        padding: "28px",
        minHeight: "400px",
      }}>
        {activeTab === 1 && <Tab1 />}
        {activeTab === 2 && <Tab2 />}
        {activeTab === 3 && <Tab3 />}
        {activeTab === 4 && <Tab4 />}
        {activeTab === 5 && <Tab5 />}
        {activeTab === 6 && <Tab6 />}
        {activeTab === 7 && <Tab7 />}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: "14px", fontWeight: "700", color: "#00d4ff",
      letterSpacing: "2px", textTransform: "uppercase",
      marginBottom: "20px", marginTop: 0,
      borderBottom: "1px solid #1e293b", paddingBottom: "12px"
    }}>{children}</h2>
  );
}

function Badge({ color, children }) {
  return (
    <span style={{
      background: color + "20",
      color: color,
      border: `1px solid ${color}40`,
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "1px",
    }}>{children}</span>
  );
}

function Card({ children, accent }) {
  return (
    <div style={{
      background: "#111827",
      border: `1px solid ${accent || "#1e293b"}`,
      borderLeft: `3px solid ${accent || "#00d4ff"}`,
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
    }}>{children}</div>
  );
}

function Row({ label, value, sub, color }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "10px 0",
      borderBottom: "1px solid #1e293b",
    }}>
      <div>
        <div style={{ fontSize: "13px", color: "#e2e8f0" }}>{label}</div>
        {sub && <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>{sub}</div>}
      </div>
      <div style={{ fontSize: "13px", fontWeight: "700", color: color || "#00d4ff" }}>{value}</div>
    </div>
  );
}

function Tab1() {
  return (
    <div>
      <SectionTitle>📈 Q1: Is this portfolio good for 8-10% APY?</SectionTitle>

      <Card accent="#f59e0b">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>Honest Answer</span>
          <Badge color="#f59e0b">REALITY CHECK</Badge>
        </div>
        <p style={{ fontSize: "13px", color: "#e2e8f0", margin: 0, lineHeight: "1.7" }}>
          8-10% APY is actually your <strong style={{ color: "#f59e0b" }}>floor, not your ceiling</strong>. Your portfolio is built for significantly higher returns — and significantly higher risk. Don't aim low.
        </p>
      </Card>

      <div style={{ marginTop: "20px" }}>
        <Row label="QQQ 10-Year Historical APY" value="~17-18%" sub="Your 50% core anchor" color="#34d399" />
        <Row label="S&P 500 Historical APY" value="~10-12%" sub="Benchmark comparison" color="#94a3b8" />
        <Row label="Your Portfolio (Bull Case)" value="15-20%+" sub="If tech continues dominating" color="#34d399" />
        <Row label="Your Portfolio (Base Case)" value="10-15%" sub="Normal market environment" color="#00d4ff" />
        <Row label="Your Portfolio (Bear Case)" value="-20% to -30%" sub="Tech sector correction" color="#f87171" />
      </div>

      <Card accent="#a78bfa" style={{ marginTop: "16px" }}>
        <p style={{ fontSize: "13px", color: "#e2e8f0", margin: 0, lineHeight: "1.7" }}>
          <strong style={{ color: "#a78bfa" }}>The real risk:</strong> Your portfolio is ~70% correlated to tech. In 2022, QQQ dropped 33%. Your portfolio would have dropped ~25-28% that year. That's the price of shooting for 15-20% APY. Still worth it at your age — you have 40+ years to recover and compound.
        </p>
      </Card>

      <div style={{
        background: "#0a1628",
        border: "1px solid #1e3a5f",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "16px",
      }}>
        <div style={{ fontSize: "11px", color: "#3b82f6", letterSpacing: "2px", marginBottom: "12px" }}>
          COMPOUNDING MATH ON YOUR $40K
        </div>
        {[
          { label: "At 8% APY for 10 years", value: "$86,357", note: "Conservative" },
          { label: "At 12% APY for 10 years", value: "$124,147", note: "Likely" },
          { label: "At 17% APY for 10 years", value: "$210,834", note: "Bull case" },
          { label: "At 12% APY for 30 years", value: "$1,197,614", note: "🔥 Long game" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1e293b" }}>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>{r.label}</span>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#00d4ff" }}>{r.value}</div>
              <div style={{ fontSize: "10px", color: "#64748b" }}>{r.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tab2() {
  const qqqStocks = portfolio.filter(p => p.inQQQ && p.type === "stock");
  const nonQQQ = portfolio.filter(p => !p.inQQQ);

  return (
    <div>
      <SectionTitle>🔀 Q2: Are You Over-Diversified?</SectionTitle>

      <Card accent="#f87171">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>The Core Problem</span>
          <Badge color="#f87171">DOUBLE EXPOSURE</Badge>
        </div>
        <p style={{ fontSize: "13px", color: "#e2e8f0", margin: 0, lineHeight: "1.7" }}>
          <strong style={{ color: "#f87171" }}>6 of your individual stocks are already inside QQQ.</strong> You're essentially paying double for the same exposure. When QQQ goes up, your individual positions go up too — but you're not getting extra upside because the position sizes are too small to matter.
        </p>
      </Card>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "2px", marginBottom: "12px" }}>STOCKS ALREADY INSIDE QQQ (REDUNDANT)</div>
        {qqqStocks.map(s => (
          <div key={s.ticker} style={{
            display: "flex", justifyContent: "space-between",
            padding: "10px 12px", marginBottom: "4px",
            background: "#1a0a0a", border: "1px solid #3f1212",
            borderRadius: "6px",
          }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#f87171" }}>{s.ticker}</span>
              <span style={{ fontSize: "11px", color: "#64748b" }}>Already in QQQ</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", color: "#f87171" }}>{s.weight}%</div>
              <div style={{ fontSize: "10px", color: "#64748b" }}>${(40000 * s.weight / 100).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      <Card accent="#34d399">
        <div style={{ fontSize: "11px", color: "#34d399", letterSpacing: "2px", marginBottom: "12px" }}>THE MATH PROBLEM</div>
        <p style={{ fontSize: "13px", color: "#e2e8f0", margin: 0, lineHeight: "1.7" }}>
          If NVDA doubles (2x), your 2.5% position goes to 5%. That adds just <strong style={{ color: "#34d399" }}>+2.5% to your total portfolio</strong>. Not life-changing. For individual stocks to meaningfully move your portfolio, you need 5-10% minimum conviction sizing. At 2.5% you're diversified to the point of irrelevance.
        </p>
      </Card>

      <div style={{
        background: "#0a1628",
        border: "1px solid #1e3a5f",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "16px",
      }}>
        <div style={{ fontSize: "11px", color: "#3b82f6", letterSpacing: "2px", marginBottom: "12px" }}>
          VERDICT ON YOUR DIVERSIFICATION
        </div>
        {[
          { label: "Number of tickers", value: "15", verdict: "Fine", color: "#34d399" },
          { label: "Redundant positions (in QQQ)", value: "6", verdict: "Problem", color: "#f87171" },
          { label: "Positions too small to matter", value: "10 at 2.5%", verdict: "Problem", color: "#f87171" },
          { label: "True diversification score", value: "6/10", verdict: "Needs work", color: "#f59e0b" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1e293b" }}>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>{r.label}</span>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "#e2e8f0" }}>{r.value}</span>
              <Badge color={r.color}>{r.verdict}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tab3() {
  return (
    <div>
      <SectionTitle>⚡ Q3: How to Improve Your Holdings</SectionTitle>

      <Card accent="#f59e0b">
        <div style={{ fontSize: "11px", color: "#f59e0b", letterSpacing: "2px", marginBottom: "10px" }}>THE CORE FIX — SOLVE THE OVERLAP PROBLEM</div>
        <p style={{ fontSize: "13px", color: "#e2e8f0", margin: 0, lineHeight: "1.7" }}>
          You have two clean options. Pick one:
        </p>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        <div style={{ background: "#0a1a0a", border: "1px solid #166534", borderRadius: "8px", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: "#34d399", letterSpacing: "2px", marginBottom: "10px" }}>OPTION A: GO CONVICTION</div>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 10px 0", lineHeight: "1.6" }}>Remove QQQ overlap stocks. Increase their individual weight to 5-7% each.</p>
          <div style={{ fontSize: "12px", color: "#34d399" }}>✓ Your winners actually move the needle</div>
          <div style={{ fontSize: "12px", color: "#34d399" }}>✓ Cleaner, intentional portfolio</div>
          <div style={{ fontSize: "12px", color: "#f87171" }}>✗ More stock-specific risk</div>
        </div>
        <div style={{ background: "#0a0a1a", border: "1px solid #1e3a5f", borderRadius: "8px", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: "#3b82f6", letterSpacing: "2px", marginBottom: "10px" }}>OPTION B: PURE ETF</div>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 10px 0", lineHeight: "1.6" }}>Remove all individual QQQ overlap stocks. Add freed-up 15% to non-tech opportunities.</p>
          <div style={{ fontSize: "12px", color: "#34d399" }}>✓ Less maintenance</div>
          <div style={{ fontSize: "12px", color: "#34d399" }}>✓ Cleaner diversification</div>
          <div style={{ fontSize: "12px", color: "#f87171" }}>✗ Less upside on conviction plays</div>
        </div>
      </div>

      <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "2px", marginBottom: "12px" }}>SPECIFIC IMPROVEMENTS</div>

      {[
        {
          action: "ADD LLY (Eli Lilly)",
          reason: "Trading 40% below fair value. GLP-1 dominance. Oral pill catalyst in Q2. Best risk/reward we found.",
          suggested: "5%",
          color: "#34d399",
          tag: "ADD"
        },
        {
          action: "INCREASE AMZN to 5%",
          reason: "$200B capex creating AI infrastructure moat. Trading 43% below fair value. Best individual stock opportunity.",
          suggested: "5%",
          color: "#34d399",
          tag: "INCREASE"
        },
        {
          action: "REMOVE AAPL, MSFT, GOOGL, META",
          reason: "All inside QQQ already. At 2.5% each they add no meaningful upside. Free up 10% for better ideas.",
          suggested: "0%",
          color: "#f87171",
          tag: "REMOVE"
        },
        {
          action: "KEEP INTU at 2.5% or increase to 5%",
          reason: "56% upside to fair value. Beaten down on AI fears that are overblown. Clear value play.",
          suggested: "5%",
          color: "#f59e0b",
          tag: "INCREASE"
        },
        {
          action: "KEEP NFLX (after Warner clarity)",
          reason: "Drop is Warner deal noise, not fundamentals. 40% below analyst targets if deal collapses.",
          suggested: "2.5%",
          color: "#f59e0b",
          tag: "HOLD"
        },
        {
          action: "RECONSIDER IAU (Gold)",
          reason: "At 21 with 40+ year horizon, gold is drag on returns. Consider replacing with more equity exposure.",
          suggested: "0-5%",
          color: "#f59e0b",
          tag: "REVIEW"
        },
      ].map((item, i) => (
        <div key={i} style={{
          background: "#111827",
          border: "1px solid #1e293b",
          borderRadius: "8px",
          padding: "14px",
          marginBottom: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
              <Badge color={item.color}>{item.tag}</Badge>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#f8fafc" }}>{item.action}</span>
            </div>
            <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.6" }}>{item.reason}</p>
          </div>
          <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Suggested</div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: item.color }}>{item.suggested}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Tab4() {
  const deployed = 27000;
  const total = 40000;
  const remaining = total - deployed;
  const pct = (deployed / total * 100).toFixed(0);

  return (
    <div>
      <SectionTitle>💰 Q4: How to Deploy Your Remaining $13,000</SectionTitle>

      <div style={{
        background: "#0a1628",
        border: "1px solid #1e3a5f",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
          <div>
            <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>DEPLOYED</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#34d399" }}>${deployed.toLocaleString()}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>PROGRESS</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#00d4ff" }}>{pct}%</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>REMAINING</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#f59e0b" }}>${remaining.toLocaleString()}</div>
          </div>
        </div>
        <div style={{ background: "#1e293b", borderRadius: "4px", height: "8px" }}>
          <div style={{
            width: `${pct}%`, height: "100%",
            background: "linear-gradient(90deg, #00d4ff, #34d399)",
            borderRadius: "4px",
          }} />
        </div>
      </div>

      <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "2px", marginBottom: "12px" }}>RECOMMENDED DEPLOYMENT PLAN</div>

      {[
        {
          week: "NOW (This week)",
          amount: "$5,000",
          action: "Deploy into your highest conviction undervalued stocks",
          detail: "LLY ($2,000) + AMZN ($2,000) + INTU ($1,000) — all below fair value",
          color: "#34d399",
          urgency: "URGENT"
        },
        {
          week: "Week 2-3",
          amount: "$4,000",
          action: "Continue staged deployment across core portfolio",
          detail: "Follow your original allocation percentages proportionally",
          color: "#00d4ff",
          urgency: "SCHEDULED"
        },
        {
          week: "Week 4-5",
          amount: "$2,000",
          action: "Fill remaining positions",
          detail: "Top off any positions that have dipped from Week 1",
          color: "#a78bfa",
          urgency: "SCHEDULED"
        },
        {
          week: "Keep as Reserve",
          amount: "$2,000",
          action: "Dip reserve — NEVER deploy unless triggered",
          detail: "QQQ -7% → deploy $800 | QQQ -12% → deploy $800 | QQQ -20% → deploy $400",
          color: "#f59e0b",
          urgency: "RESERVE"
        },
      ].map((item, i) => (
        <div key={i} style={{
          background: "#111827",
          border: `1px solid ${item.color}30`,
          borderLeft: `3px solid ${item.color}`,
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "10px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Badge color={item.color}>{item.urgency}</Badge>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>{item.week}</span>
            </div>
            <span style={{ fontSize: "18px", fontWeight: "700", color: item.color }}>{item.amount}</span>
          </div>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#e2e8f0", marginBottom: "4px" }}>{item.action}</div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>{item.detail}</div>
        </div>
      ))}

      <Card accent="#f87171">
        <div style={{ fontSize: "11px", color: "#f87171", letterSpacing: "2px", marginBottom: "8px" }}>GOLDEN RULE</div>
        <p style={{ fontSize: "13px", color: "#e2e8f0", margin: 0, lineHeight: "1.7" }}>
          Never deploy your dip reserve just because time has passed. It exists for real corrections only. If no -7%+ correction occurs in 12 weeks, deploy half and keep the rest as permanent reserve.
        </p>
      </Card>
    </div>
  );
}

function Tab5() {
  return (
    <div>
      <SectionTitle>⚖️ Q5: When & How to Rebalance</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "20px" }}>
        {[
          { period: "Quarterly", action: "Full rebalance review", detail: "Jan, Apr, Jul, Oct", color: "#00d4ff" },
          { period: "Monthly", action: "Light check", detail: "Any position ±5%?", color: "#a78bfa" },
          { period: "Triggered", action: "Event-based", detail: "Earnings, major news", color: "#f59e0b" },
        ].map((item, i) => (
          <div key={i} style={{
            background: "#111827",
            border: `1px solid ${item.color}30`,
            borderTop: `3px solid ${item.color}`,
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "15px", fontWeight: "700", color: item.color, marginBottom: "6px" }}>{item.period}</div>
            <div style={{ fontSize: "12px", color: "#e2e8f0", marginBottom: "4px" }}>{item.action}</div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>{item.detail}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "2px", marginBottom: "12px" }}>THE QUARTERLY REBALANCE PROCESS</div>

      {[
        { step: "01", title: "Check drift", detail: "If any position is >3% above or below target weight, it needs attention", color: "#00d4ff" },
        { step: "02", title: "Don't sell winners", detail: "Before selling to rebalance, check: can you add to underweight positions with new money instead? This avoids triggering capital gains.", color: "#34d399" },
        { step: "03", title: "Re-evaluate thesis", detail: "Has anything changed fundamentally? New competition? Guidance cut? If thesis breaks, sell regardless of gains/losses.", color: "#a78bfa" },
        { step: "04", title: "Update price targets", detail: "Run the P/E valuation exercise again with new EPS estimates from latest earnings. Is your target still valid?", color: "#f59e0b" },
        { step: "05", title: "Document everything", detail: "Write down WHY you made any changes. Future you will thank present you.", color: "#f87171" },
      ].map((item, i) => (
        <div key={i} style={{
          display: "flex", gap: "16px", padding: "14px",
          background: "#111827", border: "1px solid #1e293b",
          borderRadius: "8px", marginBottom: "8px",
        }}>
          <div style={{
            fontSize: "18px", fontWeight: "700",
            color: item.color, minWidth: "32px", opacity: 0.6,
          }}>{item.step}</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#e2e8f0", marginBottom: "4px" }}>{item.title}</div>
            <div style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.6" }}>{item.detail}</div>
          </div>
        </div>
      ))}

      <Card accent="#34d399">
        <div style={{ fontSize: "11px", color: "#34d399", letterSpacing: "2px", marginBottom: "8px" }}>WHEN TO ADD MORE MONEY</div>
        {[
          "Add money on a set schedule (monthly/quarterly) regardless of market conditions",
          "Extra contribution: when a conviction stock drops 10%+ with no fundamental change",
          "Never add to a position just because it's down — verify the thesis first",
          "Tax season bonus, internship income, gifts → immediately invest proportionally",
        ].map((item, i) => (
          <div key={i} style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.6", padding: "4px 0", display: "flex", gap: "8px" }}>
            <span style={{ color: "#34d399" }}>→</span>
            <span>{item}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function Tab6() {
  return (
    <div>
      <SectionTitle>🎯 Q6: Staying On Top of Everything</SectionTitle>

      <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "2px", marginBottom: "12px" }}>YOUR WEEKLY ROUTINE — 45 MIN TOTAL</div>

      {[
        {
          time: "Daily — 10 min",
          color: "#00d4ff",
          tasks: [
            { task: "The Market Ear newsletter", where: "themarketear.com", type: "Macro" },
            { task: "Finviz heat map", where: "finviz.com/map", type: "Pulse" },
            { task: "Google News alerts for your tickers", where: "Google Alerts", type: "News" },
          ]
        },
        {
          time: "Weekly — 30 min",
          color: "#a78bfa",
          tasks: [
            { task: "Run Finviz screener (PEG<1, down 20%+)", where: "finviz.com", type: "Research" },
            { task: "Read Stratechery (tech deep dive)", where: "stratechery.com", type: "Tech" },
            { task: "Check earnings calendar for next 2 weeks", where: "earningswhispers.com", type: "Calendar" },
          ]
        },
        {
          time: "Monthly — 60 min",
          color: "#34d399",
          tasks: [
            { task: "Portfolio performance review vs QQQ benchmark", where: "Your spreadsheet", type: "Review" },
            { task: "Re-run valuations on your individual stocks", where: "Yahoo Finance", type: "Valuation" },
            { task: "Research 1-2 new stocks from screener", where: "Seeking Alpha", type: "Pipeline" },
          ]
        },
        {
          time: "Quarterly — 3-4 hours",
          color: "#f59e0b",
          tasks: [
            { task: "Full earnings season deep dive", where: "Seeking Alpha transcripts", type: "Earnings" },
            { task: "Re-evaluate thesis on each holding", where: "Your trading journal", type: "Thesis" },
            { task: "Rebalance portfolio if needed", where: "Robinhood", type: "Action" },
          ]
        },
      ].map((period, i) => (
        <div key={i} style={{
          background: "#111827",
          border: `1px solid ${period.color}30`,
          borderLeft: `3px solid ${period.color}`,
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "12px",
        }}>
          <div style={{ fontSize: "12px", fontWeight: "700", color: period.color, marginBottom: "12px", letterSpacing: "1px" }}>
            {period.time}
          </div>
          {period.tasks.map((t, j) => (
            <div key={j} style={{
              display: "flex", justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: j < period.tasks.length - 1 ? "1px solid #1e293b" : "none",
            }}>
              <div>
                <div style={{ fontSize: "12px", color: "#e2e8f0" }}>{t.task}</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>{t.where}</div>
              </div>
              <Badge color={period.color}>{t.type}</Badge>
            </div>
          ))}
        </div>
      ))}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: "8px", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: "#f87171", letterSpacing: "2px", marginBottom: "10px" }}>SELL SIGNALS</div>
          {["CEO sudden resignation", "Earnings miss + guidance cut", "Major customer loss", "Thesis broken (not just price drop)", "Better risk/reward opportunity"].map((s, i) => (
            <div key={i} style={{ fontSize: "12px", color: "#94a3b8", padding: "4px 0", display: "flex", gap: "8px" }}>
              <span style={{ color: "#f87171" }}>✗</span><span>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: "8px", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: "#34d399", letterSpacing: "2px", marginBottom: "10px" }}>BUY SIGNALS</div>
          {["PEG ratio under 1.0", "Down 20%+ with no thesis change", "Earnings beat + guidance raised", "Insider buying", "Sector rotation into position"].map((s, i) => (
            <div key={i} style={{ fontSize: "12px", color: "#94a3b8", padding: "4px 0", display: "flex", gap: "8px" }}>
              <span style={{ color: "#34d399" }}>✓</span><span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tab7() {
  const [checkedItems, setCheckedItems] = useState({});

  const toggle = (id) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div>
      <SectionTitle>📋 Q7: Accounting, Auditing & Documentation</SectionTitle>

      <Card accent="#a78bfa">
        <div style={{ fontSize: "11px", color: "#a78bfa", letterSpacing: "2px", marginBottom: "8px" }}>YOUR MASTER SPREADSHEET (BUILD THIS TODAY)</div>
        <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0, lineHeight: "1.7" }}>
          Create a Google Sheet with these tabs: <strong style={{ color: "#e2e8f0" }}>Portfolio</strong>, <strong style={{ color: "#e2e8f0" }}>Transactions</strong>, <strong style={{ color: "#e2e8f0" }}>Thesis Log</strong>, <strong style={{ color: "#e2e8f0" }}>Watchlist</strong>, <strong style={{ color: "#e2e8f0" }}>Performance</strong>
        </p>
      </Card>

      <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "2px", marginBottom: "12px", marginTop: "20px" }}>
        PORTFOLIO TAB — TRACK FOR EVERY POSITION
      </div>
      <div style={{
        background: "#0a1628",
        border: "1px solid #1e3a5f",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "20px",
        overflowX: "auto",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
          <thead>
            <tr>
              {["Ticker", "Shares", "Avg Cost", "Current", "P&L%", "Target", "Stop Loss", "Thesis"].map(h => (
                <th key={h} style={{ padding: "8px", textAlign: "left", color: "#3b82f6", borderBottom: "1px solid #1e293b" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["QQQ", "45.2", "$543", "$560", "+3.1%", "$650", "$450", "Tech dominance"],
              ["NVDA", "12.0", "$189", "$195", "+3.2%", "$270", "$140", "AI chips"],
              ["LLY", "1.9", "$1,082", "$1,090", "+0.7%", "$1,713", "$850", "GLP-1"],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{
                    padding: "8px",
                    color: j === 4 ? "#34d399" : "#94a3b8",
                    borderBottom: "1px solid #1e293b",
                  }}>{cell}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td colSpan={8} style={{ padding: "8px", color: "#64748b", fontStyle: "italic" }}>... and so on for every position</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "2px", marginBottom: "12px" }}>TOOLS ECOSYSTEM</div>
      {[
        { tool: "Google Sheets", use: "Master portfolio tracker, performance calculations, tax records", cost: "Free", color: "#34d399" },
        { tool: "Robinhood Statements", use: "Export monthly statements for cost basis, realized gains/losses", cost: "Free", color: "#34d399" },
        { tool: "Empower (Personal Capital)", use: "Automatic portfolio aggregation, net worth tracking", cost: "Free", color: "#34d399" },
        { tool: "TurboTax / Tax Professional", use: "Capital gains reporting — important given your situation", cost: "Paid", color: "#f59e0b" },
        { tool: "Koyfin", use: "Valuation tracking, comparable analysis, watchlist", cost: "$30/mo", color: "#f59e0b" },
      ].map((item, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between",
          padding: "12px", marginBottom: "6px",
          background: "#111827", border: "1px solid #1e293b",
          borderRadius: "8px", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#e2e8f0" }}>{item.tool}</div>
            <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>{item.use}</div>
          </div>
          <Badge color={item.color}>{item.cost}</Badge>
        </div>
      ))}

      <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "2px", marginBottom: "12px", marginTop: "20px" }}>
        QUARTERLY AUDIT CHECKLIST
      </div>
      {[
        { id: "a", text: "Export Robinhood statement for the quarter" },
        { id: "b", text: "Update cost basis and shares in Google Sheet" },
        { id: "c", text: "Calculate portfolio performance vs QQQ (your benchmark)" },
        { id: "d", text: "Re-run valuations on all individual holdings" },
        { id: "e", text: "Review thesis log — has anything changed?" },
        { id: "f", text: "Record any realized gains/losses for tax purposes" },
        { id: "g", text: "Update target prices based on new EPS estimates" },
        { id: "h", text: "Check total invested vs. target allocation percentages" },
        { id: "i", text: "Write 1-paragraph portfolio summary for future reference" },
      ].map((item) => (
        <div
          key={item.id}
          onClick={() => toggle(item.id)}
          style={{
            display: "flex", gap: "12px", alignItems: "center",
            padding: "10px 12px", marginBottom: "4px",
            background: checkedItems[item.id] ? "#0a1a0a" : "#111827",
            border: `1px solid ${checkedItems[item.id] ? "#166534" : "#1e293b"}`,
            borderRadius: "6px", cursor: "pointer",
          }}
        >
          <div style={{
            width: "16px", height: "16px", minWidth: "16px",
            border: `2px solid ${checkedItems[item.id] ? "#34d399" : "#374151"}`,
            borderRadius: "3px",
            background: checkedItems[item.id] ? "#34d399" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "10px", color: "#060912",
          }}>
            {checkedItems[item.id] ? "✓" : ""}
          </div>
          <span style={{
            fontSize: "12px",
            color: checkedItems[item.id] ? "#64748b" : "#94a3b8",
            textDecoration: checkedItems[item.id] ? "line-through" : "none",
          }}>{item.text}</span>
        </div>
      ))}

      <Card accent="#f59e0b" style={{ marginTop: "16px" }}>
        <div style={{ fontSize: "11px", color: "#f59e0b", letterSpacing: "2px", marginBottom: "8px" }}>⚠️ TAX NOTE — IMPORTANT FOR YOU</div>
        <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0, lineHeight: "1.7" }}>
          Since your money comes from capital gains and inheritance, talk to a CPA about cost basis tracking from day one. Short-term gains (under 1 year) are taxed as regular income. Long-term gains (1+ year) are taxed at 0%, 15%, or 20% depending on income. Holding for 1+ year is almost always smarter from a tax perspective.
        </p>
      </Card>
    </div>
  );
}
