import { useState, useEffect } from "react";

// ── THEME ──────────────────────────────────────────────────
const T = {
  bg: "#04070f",
  surface: "#080e1a",
  card: "#0c1424",
  border: "#112240",
  borderBright: "#1e3a5f",
  green: "#00ff88",
  greenDim: "#00ff8840",
  blue: "#4fc3f7",
  blueDim: "#4fc3f720",
  amber: "#ffb347",
  amberDim: "#ffb34720",
  red: "#ff4757",
  redDim: "#ff475720",
  purple: "#c084fc",
  purpleDim: "#c084fc20",
  text: "#e2e8f0",
  muted: "#64748b",
  faint: "#1e2d40",
};

const font = "'IBM Plex Mono', 'Courier New', monospace";

// ── INITIAL PORTFOLIO ──────────────────────────────────────
const INITIAL_PORTFOLIO = [
  { ticker: "QQQ",  weight: 50,  fairValue: 650,  buyZone: 500, thesis: "Tech/AI infrastructure basket — companies building the backbone of the AI era", stopLoss: 450, type: "etf" },
  { ticker: "VXUS", weight: 15,  fairValue: 68,   buyZone: 52,  thesis: "Global diversification — emerging + developed markets in digitalization era", stopLoss: 44, type: "etf" },
  { ticker: "AMZN", weight: 10,  fairValue: 360,  buyZone: 277, thesis: "$200B capex conviction bet on AI infrastructure. $244B backlog already locked. 43% below fair value.", stopLoss: 170, type: "stock" },
  { ticker: "INTU", weight: 10,  fairValue: 694,  buyZone: 534, thesis: "Fast AI adopter, 56% below fair value. Market overreacted to AI disruption fears. QuickBooks moat intact.", stopLoss: 360, type: "stock" },
  { ticker: "TSM",  weight: 10,  fairValue: 439,  buyZone: 338, thesis: "Monopoly on advanced chip manufacturing. 2nm fully booked by NVDA + AAPL. AI can't exist without TSM.", stopLoss: 240, type: "stock" },
  { ticker: "CASH", weight: 5,   fairValue: null, buyZone: null, thesis: "Dip reserve: QQQ -7% → $800, QQQ -12% → $800, QQQ -20% → $400", stopLoss: null, type: "cash" },
];

const INITIAL_WATCHLIST = [
  { ticker: "LLY",  fairValue: 1713, buyZone: 1318, currentPrice: 1082, upside: 58, notes: "GLP-1 king. Q2 oral pill catalyst. Beat earnings massively.", status: "BUY" },
  { ticker: "GEV",  fairValue: 819,  buyZone: 630,  currentPrice: 811,  upside: 1,  notes: "AI needs power. $150B backlog. Wait for pullback to $630.", status: "WAIT" },
  { ticker: "NVDA", fairValue: 270,  buyZone: 208,  currentPrice: 189,  upside: 43, notes: "AI chip king on sale. 37/39 analyst buys.", status: "BUY" },
  { ticker: "NFLX", fairValue: 114,  buyZone: 88,   currentPrice: 81,   upside: 41, notes: "Warner deal noise, not fundamentals. Watch for deal collapse.", status: "WATCH" },
  { ticker: "LULU", fairValue: 350,  buyZone: 192,  currentPrice: 170,  upside: 106, notes: "14x P/E for premium brand. New CEO catalyst needed.", status: "WATCH" },
];

const INITIAL_THESIS = `My macro thesis is that technology is not a sector — it is infrastructure that will integrate into every industry. The companies that win are not just pure tech companies, but sector leaders who adopt technology the fastest.

QQQ (50%): These are the companies building the tools, platforms, and infrastructure that all other industries will run on. Stable compounding core.

Emerging Markets (15%): Developing economies are in the digitalization phase that developed markets went through 20-30 years ago. Growth curves are exponential at this stage.

Individual Stocks (30%): Companies that are either building critical AI infrastructure (TSM), adopting AI faster than peers while undervalued (INTU), or making massive conviction bets on the AI era (AMZN $200B capex).

What would break this thesis:
- AI proves to be a bubble with no real enterprise ROI
- Geopolitical shock disrupts semiconductor supply chains
- Regulatory crackdown on big tech disrupts the ecosystem`;

// ── HELPERS ────────────────────────────────────────────────
const fmt = (n) => n == null ? "—" : `$${Number(n).toLocaleString()}`;
const pct = (n) => n == null ? "—" : `${n > 0 ? "+" : ""}${n}%`;
const today = () => new Date().toISOString().split("T")[0];

function Badge({ color, children, small }) {
  return (
    <span style={{
      background: color + "22", color, border: `1px solid ${color}44`,
      padding: small ? "1px 6px" : "2px 8px",
      borderRadius: "3px", fontSize: small ? "10px" : "11px",
      fontWeight: "700", letterSpacing: "1px", fontFamily: font,
    }}>{children}</span>
  );
}

function Section({ title, accent, children }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        marginBottom: "16px", paddingBottom: "10px",
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ width: "3px", height: "16px", background: accent || T.green, borderRadius: "2px" }} />
        <span style={{ fontSize: "11px", color: accent || T.green, letterSpacing: "3px", textTransform: "uppercase" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text", style = {} }) {
  return (
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        background: T.surface, border: `1px solid ${T.border}`,
        color: T.text, padding: "8px 12px", borderRadius: "6px",
        fontSize: "12px", fontFamily: font, outline: "none",
        width: "100%", boxSizing: "border-box", ...style,
      }}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      style={{
        background: T.surface, border: `1px solid ${T.border}`,
        color: T.text, padding: "10px 12px", borderRadius: "6px",
        fontSize: "12px", fontFamily: font, outline: "none",
        width: "100%", boxSizing: "border-box", resize: "vertical",
      }}
    />
  );
}

function Btn({ onClick, children, color, small, outline }) {
  const c = color || T.green;
  return (
    <button onClick={onClick} style={{
      background: outline ? "transparent" : c + "22",
      border: `1px solid ${c}66`, color: c,
      padding: small ? "5px 12px" : "8px 16px",
      borderRadius: "6px", cursor: "pointer",
      fontSize: small ? "11px" : "12px", fontFamily: font,
      fontWeight: "600", letterSpacing: "0.5px",
      transition: "all 0.15s",
    }}>{children}</button>
  );
}

// ── TABS ───────────────────────────────────────────────────
const TABS = [
  { id: "portfolio", label: "Portfolio", icon: "◈" },
  { id: "journal",   label: "Journal",   icon: "◎" },
  { id: "valuation", label: "Valuation", icon: "◆" },
  { id: "watchlist", label: "Watchlist", icon: "◉" },
  { id: "research",  label: "Research",  icon: "◐" },
  { id: "thesis",    label: "Thesis",    icon: "◑" },
];

// ══════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("portfolio");
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);
  const [journal, setJournal] = useState([]);
  const [watchlist, setWatchlist] = useState(INITIAL_WATCHLIST);
  const [thesis, setThesis] = useState(INITIAL_THESIS);
  const [checks, setChecks] = useState({});
  const [loaded, setLoaded] = useState(false);

  // Load from storage
  useEffect(() => {
    async function load() {
      try {
        const keys = ["portfolio", "journal", "watchlist", "thesis", "checks"];
        const setters = [setPortfolio, setJournal, setWatchlist, setThesis, setChecks];
        const defaults = [INITIAL_PORTFOLIO, [], INITIAL_WATCHLIST, INITIAL_THESIS, {}];
        for (let i = 0; i < keys.length; i++) {
          try {
            const r = await window.storage.get("inv_" + keys[i]);
            if (r) setters[i](JSON.parse(r.value));
          } catch { setters[i](defaults[i]); }
        }
      } catch {}
      setLoaded(true);
    }
    load();
  }, []);

  // Save helpers
  const save = async (key, val) => {
    try { await window.storage.set("inv_" + key, JSON.stringify(val)); } catch {}
  };

  const updatePortfolio = (val) => { setPortfolio(val); save("portfolio", val); };
  const updateJournal = (val) => { setJournal(val); save("journal", val); };
  const updateWatchlist = (val) => { setWatchlist(val); save("watchlist", val); };
  const updateThesis = (val) => { setThesis(val); save("thesis", val); };
  const updateChecks = (val) => { setChecks(val); save("checks", val); };

  if (!loaded) return (
    <div style={{ background: T.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font, color: T.green }}>
      Loading your investment system...
    </div>
  );

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: font, color: T.text }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${T.border}`,
        padding: "16px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: T.surface,
      }}>
        <div>
          <div style={{ fontSize: "11px", color: T.green, letterSpacing: "4px", textTransform: "uppercase" }}>
            ◈ Investment OS
          </div>
          <div style={{ fontSize: "13px", color: T.muted, marginTop: "2px" }}>
            Your personal trading system · $40,000
          </div>
        </div>
        <div style={{ fontSize: "11px", color: T.muted }}>{today()}</div>
      </div>

      {/* Tab Nav */}
      <div style={{
        display: "flex", gap: "2px", padding: "12px 24px",
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        overflowX: "auto",
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "7px 16px", borderRadius: "5px",
            border: "none", cursor: "pointer",
            background: tab === t.id ? T.green + "22" : "transparent",
            color: tab === t.id ? T.green : T.muted,
            fontSize: "12px", fontFamily: font, fontWeight: tab === t.id ? "700" : "400",
            borderBottom: tab === t.id ? `2px solid ${T.green}` : "2px solid transparent",
            whiteSpace: "nowrap", transition: "all 0.15s",
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
        {tab === "portfolio" && <PortfolioTab portfolio={portfolio} updatePortfolio={updatePortfolio} />}
        {tab === "journal"   && <JournalTab journal={journal} updateJournal={updateJournal} portfolio={portfolio} />}
        {tab === "valuation" && <ValuationTab />}
        {tab === "watchlist" && <WatchlistTab watchlist={watchlist} updateWatchlist={updateWatchlist} />}
        {tab === "research"  && <ResearchTab checks={checks} updateChecks={updateChecks} />}
        {tab === "thesis"    && <ThesisTab thesis={thesis} updateThesis={updateThesis} />}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB 1: PORTFOLIO
// ══════════════════════════════════════════════════════════
function PortfolioTab({ portfolio, updatePortfolio }) {
  const [editing, setEditing] = useState(null);
  const [newTicker, setNewTicker] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const totalWeight = portfolio.reduce((s, p) => s + (parseFloat(p.weight) || 0), 0);

  const remove = (i) => updatePortfolio(portfolio.filter((_, idx) => idx !== i));
  const add = () => {
    if (!newTicker || !newWeight) return;
    updatePortfolio([...portfolio, {
      ticker: newTicker.toUpperCase(), weight: parseFloat(newWeight),
      fairValue: null, buyZone: null, thesis: "", stopLoss: null, type: "stock"
    }]);
    setNewTicker(""); setNewWeight("");
  };
  const update = (i, field, val) => {
    const p = [...portfolio];
    p[i] = { ...p[i], [field]: val };
    updatePortfolio(p);
  };

  const weightColor = (w) => {
    const pct = w / 100;
    if (pct > 0.4) return T.amber;
    if (pct > 0.2) return T.blue;
    return T.green;
  };

  return (
    <div>
      <Section title="Current Allocation" accent={T.green}>
        {/* Weight bar */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "8px" }}>
            {portfolio.filter(p => p.ticker !== "CASH").map((p, i) => {
              const colors = [T.green, T.blue, T.amber, T.purple, T.red, T.green];
              return (
                <div key={i} style={{
                  width: `${p.weight}%`, background: colors[i % colors.length],
                  opacity: 0.8, transition: "width 0.3s",
                }} title={`${p.ticker}: ${p.weight}%`} />
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {portfolio.map((p, i) => {
              const colors = [T.green, T.blue, T.amber, T.purple, T.red, T.green, T.blue];
              return (
                <span key={i} style={{ fontSize: "10px", color: colors[i % colors.length], letterSpacing: "1px" }}>
                  ■ {p.ticker} {p.weight}%
                </span>
              );
            })}
          </div>
        </div>

        {/* Total weight check */}
        <div style={{
          padding: "8px 14px", borderRadius: "6px", marginBottom: "16px",
          background: Math.abs(totalWeight - 100) < 0.5 ? T.greenDim : T.amberDim,
          border: `1px solid ${Math.abs(totalWeight - 100) < 0.5 ? T.green : T.amber}44`,
          fontSize: "12px", color: Math.abs(totalWeight - 100) < 0.5 ? T.green : T.amber,
        }}>
          Total Weight: {totalWeight.toFixed(1)}% {Math.abs(totalWeight - 100) < 0.5 ? "✓ Balanced" : "⚠ Adjust to 100%"}
        </div>

        {/* Position cards */}
        {portfolio.map((pos, i) => (
          <div key={i} style={{
            background: T.card, border: `1px solid ${T.border}`,
            borderRadius: "8px", padding: "16px", marginBottom: "8px",
          }}>
            {editing === i ? (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                  <div>
                    <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>WEIGHT %</div>
                    <Input value={pos.weight} onChange={v => update(i, "weight", parseFloat(v) || 0)} type="number" />
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>FAIR VALUE</div>
                    <Input value={pos.fairValue || ""} onChange={v => update(i, "fairValue", parseFloat(v) || null)} type="number" placeholder="$" />
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>BUY ZONE</div>
                    <Input value={pos.buyZone || ""} onChange={v => update(i, "buyZone", parseFloat(v) || null)} type="number" placeholder="$" />
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>STOP LOSS</div>
                    <Input value={pos.stopLoss || ""} onChange={v => update(i, "stopLoss", parseFloat(v) || null)} type="number" placeholder="$" />
                  </div>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>THESIS</div>
                  <Textarea value={pos.thesis} onChange={v => update(i, "thesis", v)} rows={2} placeholder="Why do you own this?" />
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Btn onClick={() => setEditing(null)} color={T.green} small>Save</Btn>
                  <Btn onClick={() => remove(i)} color={T.red} small outline>Remove</Btn>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: T.text }}>{pos.ticker}</span>
                    <Badge color={weightColor(pos.weight)}>{pos.weight}%</Badge>
                    <Badge color={T.muted} small>{pos.type.toUpperCase()}</Badge>
                  </div>
                  {pos.thesis && (
                    <div style={{ fontSize: "11px", color: T.muted, lineHeight: "1.6", maxWidth: "600px" }}>
                      {pos.thesis.substring(0, 120)}{pos.thesis.length > 120 ? "..." : ""}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                    {pos.fairValue && <span style={{ fontSize: "11px", color: T.blue }}>Target: {fmt(pos.fairValue)}</span>}
                    {pos.buyZone && <span style={{ fontSize: "11px", color: T.green }}>Buy zone: {fmt(pos.buyZone)}</span>}
                    {pos.stopLoss && <span style={{ fontSize: "11px", color: T.red }}>Stop: {fmt(pos.stopLoss)}</span>}
                    <span style={{ fontSize: "11px", color: T.muted }}>≈ {fmt(40000 * pos.weight / 100)}</span>
                  </div>
                </div>
                <Btn onClick={() => setEditing(i)} color={T.blue} small outline>Edit</Btn>
              </div>
            )}
          </div>
        ))}

        {/* Add position */}
        <div style={{
          background: T.card, border: `1px dashed ${T.border}`,
          borderRadius: "8px", padding: "16px", marginTop: "12px",
        }}>
          <div style={{ fontSize: "11px", color: T.muted, marginBottom: "10px", letterSpacing: "2px" }}>ADD POSITION</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Input value={newTicker} onChange={setNewTicker} placeholder="TICKER" style={{ width: "100px" }} />
            <Input value={newWeight} onChange={setNewWeight} placeholder="Weight %" type="number" style={{ width: "100px" }} />
            <Btn onClick={add} color={T.green}>Add</Btn>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB 2: TRADING JOURNAL
// ══════════════════════════════════════════════════════════
function JournalTab({ journal, updateJournal, portfolio }) {
  const [form, setForm] = useState({
    date: today(), ticker: "", action: "BUY", price: "", shares: "",
    thesis: "", whatCouldGoWrong: "", target: "", timeline: "", sentiment: "NEUTRAL"
  });
  const [view, setView] = useState(null);

  const add = () => {
    if (!form.ticker || !form.price) return;
    const entry = { ...form, id: Date.now() };
    updateJournal([entry, ...journal]);
    setForm({ date: today(), ticker: "", action: "BUY", price: "", shares: "", thesis: "", whatCouldGoWrong: "", target: "", timeline: "", sentiment: "NEUTRAL" });
  };

  const actionColor = (a) => a === "BUY" ? T.green : a === "SELL" ? T.red : T.amber;
  const sentimentColor = (s) => s === "BULLISH" ? T.green : s === "BEARISH" ? T.red : T.muted;

  return (
    <div>
      <Section title="New Journal Entry" accent={T.blue}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>DATE</div>
            <Input value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} type="date" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>TICKER</div>
            <Input value={form.ticker} onChange={v => setForm(f => ({ ...f, ticker: v.toUpperCase() }))} placeholder="e.g. AMZN" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>ACTION</div>
            <select value={form.action} onChange={e => setForm(f => ({ ...f, action: e.target.value }))} style={{
              background: T.surface, border: `1px solid ${T.border}`, color: actionColor(form.action),
              padding: "8px 12px", borderRadius: "6px", fontSize: "12px", fontFamily: font,
              width: "100%", outline: "none",
            }}>
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
              <option value="HOLD">HOLD / NOTE</option>
            </select>
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>PRICE</div>
            <Input value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} placeholder="$" type="number" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>SHARES</div>
            <Input value={form.shares} onChange={v => setForm(f => ({ ...f, shares: v }))} placeholder="qty" type="number" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>SENTIMENT</div>
            <select value={form.sentiment} onChange={e => setForm(f => ({ ...f, sentiment: e.target.value }))} style={{
              background: T.surface, border: `1px solid ${T.border}`, color: sentimentColor(form.sentiment),
              padding: "8px 12px", borderRadius: "6px", fontSize: "12px", fontFamily: font,
              width: "100%", outline: "none",
            }}>
              <option value="BULLISH">BULLISH</option>
              <option value="NEUTRAL">NEUTRAL</option>
              <option value="BEARISH">BEARISH</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>WHY AM I DOING THIS? (THESIS)</div>
          <Textarea value={form.thesis} onChange={v => setForm(f => ({ ...f, thesis: v }))} placeholder="Be specific. What's the thesis? What data supports this decision?" rows={3} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>WHAT COULD MAKE ME WRONG?</div>
            <Textarea value={form.whatCouldGoWrong} onChange={v => setForm(f => ({ ...f, whatCouldGoWrong: v }))} placeholder="Risks, bear case, what would break the thesis?" rows={2} />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>TARGET PRICE & TIMELINE</div>
            <Input value={form.target} onChange={v => setForm(f => ({ ...f, target: v }))} placeholder="e.g. $360 in 12-18 months" style={{ marginBottom: "8px" }} />
            <Input value={form.timeline} onChange={v => setForm(f => ({ ...f, timeline: v }))} placeholder="Timeline / exit condition" />
          </div>
        </div>
        <Btn onClick={add} color={T.blue}>Log Entry →</Btn>
      </Section>

      <Section title={`Journal Log (${journal.length} entries)`} accent={T.purple}>
        {journal.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: T.muted, fontSize: "12px" }}>
            No entries yet. Log your first trade above.
          </div>
        ) : journal.map((e, i) => (
          <div key={e.id} style={{
            background: T.card, border: `1px solid ${T.border}`,
            borderLeft: `3px solid ${actionColor(e.action)}`,
            borderRadius: "8px", padding: "14px", marginBottom: "8px",
            cursor: "pointer",
          }} onClick={() => setView(view === i ? null : i)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Badge color={actionColor(e.action)} small>{e.action}</Badge>
                <span style={{ fontSize: "14px", fontWeight: "700", color: T.text }}>{e.ticker}</span>
                {e.price && <span style={{ fontSize: "12px", color: T.muted }}>@ {fmt(e.price)}</span>}
                {e.shares && <span style={{ fontSize: "12px", color: T.muted }}>× {e.shares} shares</span>}
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Badge color={sentimentColor(e.sentiment)} small>{e.sentiment}</Badge>
                <span style={{ fontSize: "11px", color: T.muted }}>{e.date}</span>
                <span style={{ fontSize: "11px", color: T.muted }}>{view === i ? "▲" : "▼"}</span>
              </div>
            </div>
            {view === i && (
              <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: `1px solid ${T.border}` }}>
                {e.thesis && (
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ fontSize: "10px", color: T.green, letterSpacing: "2px", marginBottom: "4px" }}>THESIS</div>
                    <div style={{ fontSize: "12px", color: T.text, lineHeight: "1.7" }}>{e.thesis}</div>
                  </div>
                )}
                {e.whatCouldGoWrong && (
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ fontSize: "10px", color: T.red, letterSpacing: "2px", marginBottom: "4px" }}>RISKS / WHAT COULD GO WRONG</div>
                    <div style={{ fontSize: "12px", color: T.text, lineHeight: "1.7" }}>{e.whatCouldGoWrong}</div>
                  </div>
                )}
                {(e.target || e.timeline) && (
                  <div>
                    <div style={{ fontSize: "10px", color: T.blue, letterSpacing: "2px", marginBottom: "4px" }}>TARGET & TIMELINE</div>
                    <div style={{ fontSize: "12px", color: T.text }}>{e.target} — {e.timeline}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </Section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB 3: VALUATION CALCULATOR
// ══════════════════════════════════════════════════════════
function ValuationTab() {
  const [ticker, setTicker] = useState("");
  const [eps, setEps] = useState("");
  const [peLow, setPeLow] = useState("");
  const [peMid, setPeMid] = useState("");
  const [peHigh, setPeHigh] = useState("");
  const [current, setCurrent] = useState("");
  const [notes, setNotes] = useState("");
  const [results, setResults] = useState(null);

  const calc = () => {
    const e = parseFloat(eps), lo = parseFloat(peLow), mid = parseFloat(peMid), hi = parseFloat(peHigh), cur = parseFloat(current);
    if (!e || !lo || !mid || !hi) return;
    const cons = e * lo, base = e * mid, bull = e * hi;
    const buyZone = (base / 1.3).toFixed(0);
    const upside = cur ? (((base - cur) / cur) * 100).toFixed(1) : null;
    const verdict = cur
      ? cur < buyZone ? "STRONG BUY — Below buy zone"
      : cur < base ? "BUY — Below fair value"
      : cur < bull ? "FAIR — At or near fair value"
      : "EXPENSIVE — Above fair value"
      : "Enter current price for verdict";
    const verdictColor = cur
      ? cur < buyZone ? T.green : cur < base ? T.green : cur < bull ? T.amber : T.red
      : T.muted;
    setResults({ cons, base, bull, buyZone, upside, verdict, verdictColor, cur, e, mid });
    setNotes(notes || `Buy ${ticker} at ${fmt(buyZone)} or below. Target ${fmt(base.toFixed(0))} in 12-18 months. Sell if thesis breaks or stock hits ${fmt(bull.toFixed(0))}.`);
  };

  return (
    <div>
      <Section title="Valuation Calculator" accent={T.amber}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>TICKER</div>
            <Input value={ticker} onChange={v => setTicker(v.toUpperCase())} placeholder="e.g. NVDA" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>CURRENT PRICE</div>
            <Input value={current} onChange={setCurrent} placeholder="$" type="number" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>FORWARD EPS (12-month estimate)</div>
            <Input value={eps} onChange={setEps} placeholder="e.g. 6.00" type="number" />
          </div>
        </div>
        <div style={{ fontSize: "10px", color: T.muted, marginBottom: "8px", letterSpacing: "2px" }}>P/E RANGE (check historical on Yahoo Finance)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "10px", color: T.red, marginBottom: "4px" }}>CONSERVATIVE (low P/E)</div>
            <Input value={peLow} onChange={setPeLow} placeholder="e.g. 30" type="number" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.amber, marginBottom: "4px" }}>BASE CASE (mid P/E)</div>
            <Input value={peMid} onChange={setPeMid} placeholder="e.g. 45" type="number" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.green, marginBottom: "4px" }}>BULL CASE (high P/E)</div>
            <Input value={peHigh} onChange={setPeHigh} placeholder="e.g. 55" type="number" />
          </div>
        </div>
        <Btn onClick={calc} color={T.amber}>Calculate →</Btn>
      </Section>

      {results && (
        <Section title="Results" accent={results.verdictColor}>
          <div style={{
            background: results.verdictColor + "15",
            border: `1px solid ${results.verdictColor}44`,
            borderRadius: "8px", padding: "16px", marginBottom: "16px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "11px", color: results.verdictColor, letterSpacing: "3px", marginBottom: "6px" }}>VERDICT</div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: results.verdictColor }}>{results.verdict}</div>
            {results.upside && (
              <div style={{ fontSize: "13px", color: T.muted, marginTop: "6px" }}>
                {results.upside > 0 ? "+" : ""}{results.upside}% to fair value
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
            {[
              { label: "CONSERVATIVE", value: fmt(results.cons.toFixed(0)), color: T.red },
              { label: "FAIR VALUE", value: fmt(results.base.toFixed(0)), color: T.amber },
              { label: "BULL CASE", value: fmt(results.bull.toFixed(0)), color: T.green },
              { label: "BUY ZONE", value: fmt(results.buyZone), color: T.blue, sub: "30% margin of safety" },
            ].map((r, i) => (
              <div key={i} style={{
                background: T.card, border: `1px solid ${r.color}33`,
                borderTop: `3px solid ${r.color}`,
                borderRadius: "8px", padding: "14px", textAlign: "center",
              }}>
                <div style={{ fontSize: "10px", color: r.color, letterSpacing: "1px", marginBottom: "6px" }}>{r.label}</div>
                <div style={{ fontSize: "18px", fontWeight: "700", color: r.color }}>{r.value}</div>
                {r.sub && <div style={{ fontSize: "10px", color: T.muted, marginTop: "4px" }}>{r.sub}</div>}
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px", letterSpacing: "2px" }}>BUY/SELL PLAN (EDIT AND SAVE)</div>
            <Textarea value={notes} onChange={setNotes} rows={3} />
          </div>
        </Section>
      )}

      <Section title="How to Use This Calculator" accent={T.muted}>
        <div style={{ fontSize: "12px", color: T.muted, lineHeight: "1.9" }}>
          <div style={{ marginBottom: "8px" }}><span style={{ color: T.blue }}>Step 1:</span> Find Forward EPS on Yahoo Finance → Analysis tab → EPS Estimates (next year)</div>
          <div style={{ marginBottom: "8px" }}><span style={{ color: T.blue }}>Step 2:</span> Find historical P/E range — look at 3 year P/E chart on Macrotrends.net</div>
          <div style={{ marginBottom: "8px" }}><span style={{ color: T.blue }}>Step 3:</span> Enter conservative (lowest), base (average), bull (highest) P/E from history</div>
          <div style={{ marginBottom: "8px" }}><span style={{ color: T.blue }}>Step 4:</span> Compare result to current price — if current is below buy zone, it's a strong entry</div>
          <div><span style={{ color: T.amber }}>Rule:</span> Never buy above your base fair value without exceptional reason</div>
        </div>
      </Section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB 4: WATCHLIST
// ══════════════════════════════════════════════════════════
function WatchlistTab({ watchlist, updateWatchlist }) {
  const [form, setForm] = useState({ ticker: "", fairValue: "", buyZone: "", currentPrice: "", notes: "", status: "WATCH" });

  const add = () => {
    if (!form.ticker) return;
    const upside = form.fairValue && form.currentPrice
      ? (((form.fairValue - form.currentPrice) / form.currentPrice) * 100).toFixed(1)
      : null;
    updateWatchlist([{ ...form, upside, id: Date.now() }, ...watchlist]);
    setForm({ ticker: "", fairValue: "", buyZone: "", currentPrice: "", notes: "", status: "WATCH" });
  };

  const remove = (i) => updateWatchlist(watchlist.filter((_, idx) => idx !== i));
  const statusColor = (s) => ({ BUY: T.green, WAIT: T.amber, WATCH: T.blue, AVOID: T.red })[s] || T.muted;

  return (
    <div>
      <Section title="Add to Watchlist" accent={T.blue}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>TICKER</div>
            <Input value={form.ticker} onChange={v => setForm(f => ({ ...f, ticker: v.toUpperCase() }))} placeholder="e.g. LLY" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>CURRENT PRICE</div>
            <Input value={form.currentPrice} onChange={v => setForm(f => ({ ...f, currentPrice: parseFloat(v) || "" }))} placeholder="$" type="number" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>FAIR VALUE</div>
            <Input value={form.fairValue} onChange={v => setForm(f => ({ ...f, fairValue: parseFloat(v) || "" }))} placeholder="$" type="number" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>BUY ZONE</div>
            <Input value={form.buyZone} onChange={v => setForm(f => ({ ...f, buyZone: parseFloat(v) || "" }))} placeholder="$" type="number" />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "10px", marginBottom: "10px" }}>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>NOTES / THESIS</div>
            <Input value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} placeholder="Why is this interesting?" />
          </div>
          <div>
            <div style={{ fontSize: "10px", color: T.muted, marginBottom: "4px" }}>STATUS</div>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} style={{
              background: T.surface, border: `1px solid ${T.border}`, color: statusColor(form.status),
              padding: "8px 12px", borderRadius: "6px", fontSize: "12px", fontFamily: font,
              width: "100%", outline: "none",
            }}>
              <option value="BUY">BUY</option>
              <option value="WATCH">WATCH</option>
              <option value="WAIT">WAIT FOR ENTRY</option>
              <option value="AVOID">AVOID</option>
            </select>
          </div>
        </div>
        <Btn onClick={add} color={T.blue}>Add to Watchlist →</Btn>
      </Section>

      <Section title={`Watchlist (${watchlist.length})`} accent={T.purple}>
        {watchlist.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: T.muted, fontSize: "12px" }}>
            Watchlist is empty. Add stocks you're monitoring above.
          </div>
        ) : watchlist.map((w, i) => {
          const sc = statusColor(w.status);
          const inBuyZone = w.currentPrice && w.buyZone && w.currentPrice <= w.buyZone;
          return (
            <div key={w.id || i} style={{
              background: T.card,
              border: `1px solid ${inBuyZone ? T.green + "66" : T.border}`,
              borderLeft: `3px solid ${sc}`,
              borderRadius: "8px", padding: "14px", marginBottom: "8px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: T.text }}>{w.ticker}</span>
                    <Badge color={sc}>{w.status}</Badge>
                    {inBuyZone && <Badge color={T.green}>IN BUY ZONE</Badge>}
                    {w.upside && <span style={{ fontSize: "12px", color: w.upside > 0 ? T.green : T.red }}>{w.upside > 0 ? "+" : ""}{w.upside}% upside</span>}
                  </div>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "6px" }}>
                    {w.currentPrice && <span style={{ fontSize: "11px", color: T.muted }}>Now: {fmt(w.currentPrice)}</span>}
                    {w.fairValue && <span style={{ fontSize: "11px", color: T.amber }}>Fair: {fmt(w.fairValue)}</span>}
                    {w.buyZone && <span style={{ fontSize: "11px", color: T.green }}>Buy zone: {fmt(w.buyZone)}</span>}
                  </div>
                  {w.notes && <div style={{ fontSize: "11px", color: T.muted, lineHeight: "1.6" }}>{w.notes}</div>}
                </div>
                <Btn onClick={() => remove(i)} color={T.red} small outline>×</Btn>
              </div>
            </div>
          );
        })}
      </Section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB 5: RESEARCH CHECKLIST
// ══════════════════════════════════════════════════════════
const CHECKLISTS = {
  daily: {
    label: "Daily (10 min)", color: T.green,
    items: [
      { id: "d1", text: "Check The Market Ear newsletter", link: "themarketear.com", tag: "Macro" },
      { id: "d2", text: "Scan Finviz heat map for sector moves", link: "finviz.com/map", tag: "Pulse" },
      { id: "d3", text: "Check Google News alerts for your tickers", link: "news.google.com", tag: "News" },
      { id: "d4", text: "Any position down 5%+? Check why before reacting", link: "", tag: "Risk" },
    ]
  },
  weekly: {
    label: "Weekly (30 min)", color: T.blue,
    items: [
      { id: "w1", text: "Run Finviz screener: PEG<1, down 20%+, EPS growth >15%", link: "finviz.com/screener", tag: "Screen" },
      { id: "w2", text: "Read Stratechery — tech integration insights", link: "stratechery.com", tag: "Research" },
      { id: "w3", text: "Check earnings calendar for next 2 weeks", link: "earningswhispers.com", tag: "Calendar" },
      { id: "w4", text: "Is any watchlist stock at or below buy zone?", link: "", tag: "Entry" },
      { id: "w5", text: "Read one earnings transcript from current holdings", link: "seekingalpha.com", tag: "Deep Dive" },
    ]
  },
  monthly: {
    label: "Monthly (60 min)", color: T.amber,
    items: [
      { id: "m1", text: "Re-run valuations on AMZN, INTU, TSM with latest EPS", link: "finance.yahoo.com", tag: "Valuation" },
      { id: "m2", text: "Write 1 paragraph on each holding: thesis still intact?", link: "", tag: "Thesis" },
      { id: "m3", text: "Find 1-2 new stocks from screener to research", link: "finviz.com", tag: "Pipeline" },
      { id: "m4", text: "Portfolio performance vs QQQ benchmark check", link: "", tag: "Performance" },
      { id: "m5", text: "Read one Howard Marks memo", link: "oaktree.com/insights", tag: "Macro" },
      { id: "m6", text: "Update watchlist prices and statuses", link: "", tag: "Watchlist" },
    ]
  },
  quarterly: {
    label: "Quarterly (4 hrs)", color: T.purple,
    items: [
      { id: "q1", text: "Export Robinhood statement for the quarter", link: "", tag: "Accounting" },
      { id: "q2", text: "Update cost basis and shares in Google Sheet", link: "", tag: "Records" },
      { id: "q3", text: "Calculate portfolio return vs QQQ and S&P 500", link: "", tag: "Performance" },
      { id: "q4", text: "Re-evaluate thesis on every holding", link: "", tag: "Thesis" },
      { id: "q5", text: "Rebalance any position drifted 3%+ from target", link: "", tag: "Rebalance" },
      { id: "q6", text: "Record realized gains/losses for tax purposes", link: "", tag: "Tax" },
      { id: "q7", text: "Update price targets with new EPS estimates", link: "", tag: "Targets" },
      { id: "q8", text: "Write quarterly portfolio summary paragraph", link: "", tag: "Journal" },
      { id: "q9", text: "Review trading journal — what patterns do you notice?", link: "", tag: "Review" },
    ]
  }
};

function ResearchTab({ checks, updateChecks }) {
  const toggle = (id) => {
    const key = `${id}_${today()}`;
    updateChecks({ ...checks, [key]: !checks[key] });
  };
  const isChecked = (id) => !!checks[`${id}_${today()}`];

  const tagColor = (tag) => {
    const map = { Macro: T.amber, Pulse: T.blue, News: T.green, Risk: T.red, Screen: T.purple, Research: T.blue, Calendar: T.amber, Entry: T.green, Valuation: T.amber, Thesis: T.purple, Pipeline: T.blue, Performance: T.green, Accounting: T.amber, Records: T.blue, Tax: T.red, Rebalance: T.green, Targets: T.amber, Journal: T.purple, Review: T.blue };
    return map[tag] || T.muted;
  };

  return (
    <div>
      <div style={{ marginBottom: "16px", padding: "14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: "8px" }}>
        <div style={{ fontSize: "11px", color: T.muted, marginBottom: "6px" }}>TODAY'S DATE (checklists reset daily)</div>
        <div style={{ fontSize: "13px", color: T.text }}>{today()}</div>
      </div>

      {Object.entries(CHECKLISTS).map(([key, list]) => {
        const done = list.items.filter(item => isChecked(item.id)).length;
        return (
          <Section key={key} title={`${list.label} — ${done}/${list.items.length}`} accent={list.color}>
            <div style={{
              background: T.faint, borderRadius: "4px", height: "4px", marginBottom: "14px",
            }}>
              <div style={{
                width: `${(done / list.items.length) * 100}%`,
                height: "100%", background: list.color, borderRadius: "4px",
                transition: "width 0.3s",
              }} />
            </div>
            {list.items.map(item => {
              const checked = isChecked(item.id);
              return (
                <div key={item.id} onClick={() => toggle(item.id)} style={{
                  display: "flex", gap: "12px", alignItems: "center",
                  padding: "10px 12px", marginBottom: "4px",
                  background: checked ? list.color + "10" : T.card,
                  border: `1px solid ${checked ? list.color + "44" : T.border}`,
                  borderRadius: "6px", cursor: "pointer", transition: "all 0.15s",
                }}>
                  <div style={{
                    width: "16px", height: "16px", minWidth: "16px",
                    border: `2px solid ${checked ? list.color : T.muted}`,
                    borderRadius: "3px", background: checked ? list.color : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "10px", color: T.bg, fontWeight: "700",
                  }}>{checked ? "✓" : ""}</div>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontSize: "12px",
                      color: checked ? T.muted : T.text,
                      textDecoration: checked ? "line-through" : "none",
                    }}>{item.text}</span>
                    {item.link && !checked && (
                      <span style={{ fontSize: "10px", color: list.color, marginLeft: "8px", opacity: 0.7 }}>
                        → {item.link}
                      </span>
                    )}
                  </div>
                  <Badge color={tagColor(item.tag)} small>{item.tag}</Badge>
                </div>
              );
            })}
          </Section>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB 6: THESIS
// ══════════════════════════════════════════════════════════
function ThesisTab({ thesis, updateThesis }) {
  const [editing, setEditing] = useState(false);
  const [reading, setReading] = useState([
    { title: "Stratechery by Ben Thompson", url: "stratechery.com", why: "Best tech integration analysis on the internet. Weekly deep dives.", checked: false },
    { title: "Howard Marks Memos", url: "oaktree.com/insights", why: "Best macro thinking available for free. Teaches you HOW to think.", checked: false },
    { title: "Sequoia AI Report", url: "sequoiacap.com", why: "Best forward-looking view on where AI is heading.", checked: false },
    { title: "The Market Ear", url: "themarketear.com", why: "Daily macro summary, data-driven. 10 min read.", checked: false },
    { title: "Matt Levine — Money Stuff", url: "bloomberg.com/opinion/authors/ARbTQlRLRjE/matthew-s-levine", why: "Best financial markets commentary available. Free on Bloomberg.", checked: false },
  ]);

  return (
    <div>
      <Section title="My Investment Thesis" accent={T.green}>
        <div style={{ marginBottom: "12px", padding: "10px 14px", background: T.card, borderRadius: "6px", fontSize: "11px", color: T.muted }}>
          Write your thesis clearly. When a stock drops 20%, re-read this. Either your thesis still holds (buy more) or something changed (re-evaluate). This document is your north star.
        </div>
        {editing ? (
          <div>
            <Textarea value={thesis} onChange={updateThesis} rows={16} />
            <div style={{ marginTop: "10px" }}>
              <Btn onClick={() => setEditing(false)} color={T.green}>Save Thesis</Btn>
            </div>
          </div>
        ) : (
          <div>
            <div style={{
              background: T.card, border: `1px solid ${T.border}`,
              borderRadius: "8px", padding: "20px",
              fontSize: "12px", color: T.text, lineHeight: "1.9",
              whiteSpace: "pre-wrap", marginBottom: "12px",
            }}>{thesis}</div>
            <Btn onClick={() => setEditing(true)} color={T.green} outline>Edit Thesis</Btn>
          </div>
        )}
      </Section>

      <Section title="Macro Reading List" accent={T.amber}>
        <div style={{ fontSize: "12px", color: T.muted, marginBottom: "14px", lineHeight: "1.7" }}>
          One hour/week on these sources and your macro thinking sharpens dramatically in 6 months.
        </div>
        {reading.map((r, i) => (
          <div key={i} style={{
            background: T.card, border: `1px solid ${T.border}`,
            borderRadius: "8px", padding: "14px", marginBottom: "8px",
            display: "flex", gap: "12px", alignItems: "flex-start",
          }}>
            <div
              onClick={() => setReading(list => list.map((item, idx) => idx === i ? { ...item, checked: !item.checked } : item))}
              style={{
                width: "16px", height: "16px", minWidth: "16px",
                border: `2px solid ${r.checked ? T.amber : T.muted}`,
                borderRadius: "3px", background: r.checked ? T.amber : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "10px", color: T.bg, fontWeight: "700", cursor: "pointer", marginTop: "2px",
              }}
            >{r.checked ? "✓" : ""}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: r.checked ? T.muted : T.text, marginBottom: "2px" }}>{r.title}</div>
              <div style={{ fontSize: "11px", color: T.amber, marginBottom: "4px" }}>{r.url}</div>
              <div style={{ fontSize: "11px", color: T.muted, lineHeight: "1.6" }}>{r.why}</div>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Diversification Upgrade — Missing Pieces" accent={T.red}>
        <div style={{ fontSize: "12px", color: T.muted, marginBottom: "14px", lineHeight: "1.7" }}>
          Your portfolio is ~80% correlated to tech. These are the positions that would genuinely reduce correlation while still fitting your "tech integrates into everything" thesis.
        </div>
        {[
          { ticker: "GEV", why: "AI needs power. Industrials company winning because of tech. Zero tech correlation.", signal: "Fairly valued at $811 — wait for $630", color: T.amber },
          { ticker: "JPM", why: "AI transforms finance. Moves differently from tech. Fortress balance sheet.", signal: "Slightly expensive — wait for pullback below $250", color: T.blue },
          { ticker: "LLY", why: "AI accelerates drug discovery. Healthcare never correlates with tech crashes.", signal: "Strong buy territory at current price of ~$1,025", color: T.green },
        ].map((item, i) => (
          <div key={i} style={{
            background: T.card,
            border: `1px solid ${item.color}33`,
            borderLeft: `3px solid ${item.color}`,
            borderRadius: "8px", padding: "14px", marginBottom: "8px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: T.text, marginBottom: "4px" }}>{item.ticker}</div>
                <div style={{ fontSize: "12px", color: T.muted, marginBottom: "6px", lineHeight: "1.6" }}>{item.why}</div>
                <Badge color={item.color} small>{item.signal}</Badge>
              </div>
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}
