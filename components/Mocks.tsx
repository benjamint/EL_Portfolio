import type { ReactNode } from "react";

type Tone = "green" | "red" | "amber" | "blue" | "grey";
const B = ({ t, children }: { t: Tone; children: ReactNode }) => <span className={`b b-${t}`}>{children}</span>;
const Av = ({ n }: { n: string }) => (
  <span className="avatar">
    <i>{n.split(" ").map((p) => p[0]).join("").slice(0, 2)}</i>
    {n}
  </span>
);

function App({ active, title, sub, children }: { active: string; title: string; sub?: string; children: ReactNode }) {
  const groups: [string, string[]][] = [
    ["Merchants", ["Merchants", "Onboarding pipeline"]],
    ["RiskOps", ["Review queue", "Re-verification findings", "Watchlist", "Blacklist", "Confirmed fraud", "Website compliance", "Support chats"]],
  ];
  return (
    <div className="app" role="img" aria-label={`${title} screen, anonymised`}>
      <aside className="app-side">
        <div className="app-logo"><i />Internal</div>
        {groups.map(([h, items]) => (
          <div key={h}>
            <div className="app-nav-h">{h}</div>
            {items.map((it) => (
              <div key={it} className={`app-nav${it === active ? " on" : ""}`}>{it}</div>
            ))}
          </div>
        ))}
      </aside>
      <div className="app-main">
        <div className="app-title">{title} <span className="sandbox">Sandbox</span></div>
        {sub && <div className="app-sub">{sub}</div>}
        {children}
      </div>
    </div>
  );
}

function Table({ head, rows, minWidth }: { head: string[]; rows: ReactNode[][]; minWidth?: number }) {
  return (
    <div className="tbl-wrap">
      <table className="tbl" style={minWidth ? { minWidth } : undefined}>
        <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const M = ({ n, id }: { n: string; id: string }) => (
  <><div className="strong">{n}</div><div className="id">{id}</div></>
);

function Pipeline() {
  const kyc = (s: string) => <B t={s === "Completed" ? "green" : s === "Failed" ? "red" : s === "Running" ? "blue" : "grey"}>{s}</B>;
  const rows = [
    ["Harbour Roast Coffee", "Kestrel Holdings", "In progress", "3 hours", "Failed", "In progress", "Automated"],
    ["Ridge & Vine Estates", "N. Dube", "Ready to trade", "6 hours", "Completed", "Completed", "Automated"],
    ["Northern Quay Co", "Kestrel Holdings", "In progress", "1 day", "Running", "N/A", "Automated · QA"],
    ["Nova Quayside", "Kestrel Holdings", "Awaiting risk approval", "1 day", "Completed", "Completed", "Automated"],
    ["Bothwell Traders", "Summit Gems", "In progress", "1 day", "Running", "In progress", "Automated · QA"],
    ["Coastal Connect", "Kestrel Holdings", "Disqualified", "5 hours", "Failed", "N/A", "Automated · QA"],
    ["Trackside Motors", "Trackside Motors (Pty) Ltd", "In progress", "1 day", "Running", "In progress", "Automated · QA"],
  ];
  const phase = (p: string) => <B t={p === "Ready to trade" ? "green" : p === "Disqualified" ? "red" : p.startsWith("Awaiting") ? "amber" : "grey"}>{p}</B>;
  return (
    <App active="Onboarding pipeline" title="Onboarding pipeline" sub="Every merchant from sign-up to ready-to-trade. Last 30 days.">
      <div className="toolbar"><span className="chip on">All phases</span><span className="chip">All pipes</span><span className="chip">Time in phase ↓</span><span className="chip">Filters</span></div>
      <Table head={["Merchant", "Current phase", "Time in phase", "KYC", "KYB", "Pipe"]} rows={rows.map((r) => [<M n={r[0]} id={r[1]} key="m" />, phase(r[2]), r[3], kyc(r[4]), kyc(r[5]), <span className="sm" key="p">{r[6]}</span>])} />
    </App>
  );
}

function ReviewQueue() {
  const rows: ReactNode[][] = [
    [<M n="Ridgeway Collective" id="49548d48c208" key="a" />, <B t="blue" key="t">RE-KYB</B>, <span key="r">UBO verification <span className="sm">+1</span></span>, <span className="sm" key="s">Trigger</span>, <B t="amber" key="st">In review</B>, <Av n="You" key="as" />, <span key="d">16 Sep<div className="over">Overdue 24 days</div></span>],
    [<M n="Atlas Commerce" id="b62c0f6418fd" key="a" />, <B t="grey" key="t">RE-KYC</B>, "ID verification", <span className="sm" key="s">Scheduled</span>, <B t="red" key="st">Non-compliant</B>, <Av n="Lerato N." key="as" />, <span key="d">20 Aug<div className="over">Overdue 51 days</div></span>],
    [<M n="Cedar & Finch" id="0a9b24945f70" key="a" />, <B t="blue" key="t">RE-KYB</B>, "Director change", <span className="sm" key="s">Trigger</span>, <B t="amber" key="st">In review</B>, <span className="assign" key="as">Assign</span>, <span key="d">14 Sep<div className="over">Overdue 26 days</div></span>],
    [<M n="Morrow Logistics" id="2d55e3363d87" key="a" />, <B t="blue" key="t">RE-KYB</B>, "Address verification", <span className="sm" key="s">Trigger</span>, <B t="green" key="st">Compliant</B>, <Av n="Thandi M." key="as" />, <span key="d">29 Aug<div className="sm">Closed</div></span>],
  ];
  return (
    <App active="Review queue" title="Review queue">
      <div className="stat-row">
        <div className="stat"><b>3</b><span>Needs review</span></div>
        <div className="stat"><b>1</b><span>Unassigned</span></div>
        <div className="stat"><b>1</b><span>In review</span></div>
        <div className="stat"><b>1</b><span>Non-compliant</span></div>
      </div>
      <div className="toolbar"><span className="chip on">Assigned to me · 1</span><span className="chip">Needs review</span><span className="chip">Filters</span><span className="chip">Trigger review</span></div>
      <Table head={["Merchant", "Type", "Required action", "Source", "Status", "Assignee", "Due"]} rows={rows} minWidth={720} />
    </App>
  );
}

function Drawer() {
  return (
    <div className="app" style={{ gridTemplateColumns: "1fr" }} role="img" aria-label="Review detail drawer, anonymised">
      <div className="drawer-layout">
        <div className="drawer-dim">
          <div className="app-title">Review queue</div>
          <div className="tbl-wrap" style={{ marginTop: 12 }}>
            <table className="tbl" style={{ minWidth: 0 }}><tbody>
              {["Ridgeway Collective", "Atlas Commerce", "Cedar & Finch", "Morrow Logistics", "Harbour Roast Coffee", "Bothwell Traders"].map((n) => <tr key={n}><td className="strong">{n}</td><td className="sm">RE-KYB</td></tr>)}
            </tbody></table>
          </div>
        </div>
        <div className="drawer">
          <div className="sm">RE-KYB · Trigger based</div>
          <h4>Ridgeway Collective</h4>
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}><B t="amber">In review</B><B t="red">Overdue 24 days</B></div>
          <dl className="kv">
            <dt>Trigger</dt><dd>Director list on company registry differs from record</dd>
            <dt>Risk rating</dt><dd>Medium · next scheduled review 2028</dd>
            <dt>Assignee</dt><dd>You</dd>
          </dl>
          <div className="dsec">
            <div className="dsec-h">Requested from merchant</div>
            <div className="req"><span>New director ID + screening</span><B t="amber">Awaiting</B></div>
            <div className="req"><span>UBO declaration</span><B t="green">Received</B></div>
          </div>
          <div className="dsec">
            <div className="dsec-h">Audit trail</div>
            <ul className="log">
              <li>Reminder 2 sent to owner and admins<span>System · 14 Sep, 09:00</span></li>
              <li>UBO declaration uploaded<span>Merchant · 11 Sep, 15:42</span></li>
              <li>Claimed review<span>You · 2 Sep, 10:15</span></li>
              <li>Finding created: new director detected<span>System · 2 Sep, 06:00</span></li>
            </ul>
          </div>
          <div className="drawer-actions"><span className="dbtn primary">Approve</span><span className="dbtn">Escalate</span><span className="dbtn">Extend…</span></div>
        </div>
      </div>
    </div>
  );
}

function Findings() {
  const rows: ReactNode[][] = [
    [<M n="Cedar & Finch" id="0a9b24945f70" key="a" />, "New director detected on registry extract", <B t="red" key="s">Blocking</B>, "Director change", <span className="assign" key="as">Assign</span>, "44 days"],
    [<M n="Ridgeway Collective" id="49548d48c208" key="a" />, "Registry director list differs from held record", <B t="red" key="s">Blocking</B>, "Director change", <Av n="You" key="as" />, "43 days"],
    [<M n="Atlas Commerce" id="b62c0f6418fd" key="a" />, "Registered address no longer matches registry", <B t="amber" key="s">Advisory</B>, "Registered address", <Av n="Lerato N." key="as" />, "51 days"],
    [<M n="Morrow Logistics" id="2d55e3363d87" key="a" />, "Beneficial ownership percentage drift", <B t="amber" key="s">Advisory</B>, "UBO mismatch", <Av n="Thandi M." key="as" />, "44 days"],
  ];
  return (
    <App active="Re-verification findings" title="Re-verification findings" sub="Open findings from change detection. Separate from the KYC/KYB review queue.">
      <div className="toolbar"><span className="chip on">Open only</span><span className="chip">Assigned to me · 1</span><span className="chip">Filters</span></div>
      <Table head={["Merchant", "What changed", "Severity", "Finding type", "Assignee", "Open for"]} rows={rows} minWidth={720} />
    </App>
  );
}

function Enforcement() {
  const steps = [
    ["Day 0", "Notice", "Email to the primary contact and a dashboard banner for owners and admins.", ""],
    ["Day 7", "Reminder 1", "Only the documents this trigger needs.", ""],
    ["Day 14", "Reminder 2", "Queue item flags as due soon.", ""],
    ["Day 28", "Reminder 3", "Item moves to overdue for the analyst.", "late"],
    ["Day 35", "Final warning", "Merchant told what happens next and when.", "late"],
    ["Day 42", "Enforcement", "Non-compliance flag, settlement restriction or suspension; offboarding review.", "final"],
  ];
  return (
    <div className="enf">
      <div className="enf-track">
        {steps.map(([d, n, desc, cls]) => (
          <div className={`enf-step ${cls}`} key={d}>
            <div className="enf-dot" />
            <div className="enf-day">{d}</div>
            <div className="enf-name">{n}</div>
            <div className="enf-desc">{desc}</div>
          </div>
        ))}
      </div>
      <div className="enf-foot"><span>At any step, analysts can</span><B t="grey">Pause</B><B t="grey">Extend</B><B t="grey">Override</B><span>— with a required reason, written to the audit log.</span></div>
    </div>
  );
}

function EntryPoints() {
  return (
    <div>
      <div className="eps">
        <div className="ep">
          <div className="ep-n">01 · Transactions</div>
          <h5>Block from the list</h5>
          <p>Spot a bad transaction, act on it in place. Peach staff only.</p>
          <div className="ep-ui">
            <div style={{ display: "flex", justifyContent: "space-between" }}><span className="strong">ZAR 1 547,20</span><B t="red">Declined</B></div>
            <div className="sm">Card •••• 4471 · Skyline Mobile</div>
            <div className="menu"><div>View transaction</div><div>Refund</div><div className="danger">Add card to blocklist</div></div>
          </div>
        </div>
        <div className="ep">
          <div className="ep-n">02 · Merchant profile</div>
          <h5>Rules for one merchant</h5>
          <p>A risk tab on each merchant for limits and rules that apply only to them.</p>
          <div className="ep-ui">
            <div className="toolbar" style={{ marginBottom: 6 }}><span className="chip">Overview</span><span className="chip">Compliance</span><span className="chip on">Risk</span></div>
            <div className="req"><span>Max ticket ZAR 5 000</span><B t="green">On</B></div>
            <div className="req"><span>Block high-risk BINs</span><B t="green">On</B></div>
          </div>
        </div>
        <div className="ep">
          <div className="ep-n">03 · RiskOps</div>
          <h5>Transaction Controls</h5>
          <p>Platform-wide rules, set and audited by the risk team.</p>
          <div className="ep-ui">
            <div className="req"><span>Velocity: 5 cards / device / hr</span><B t="green">Live</B></div>
            <div className="req"><span>Blocked countries list</span><B t="green">Live</B></div>
            <div className="req"><span>Payout pattern alert</span><B t="amber">Draft</B></div>
          </div>
        </div>
      </div>
      <div className="rule-model">All three create the same object: <b>scope · condition · action · reason · owner</b></div>
    </div>
  );
}

function FraudBoard() {
  const card = (id: string, m: string, amt: string, src: string, matched: boolean, who?: string) => (
    <div className="fcard" key={id}>
      <div className="fcard-top"><span className="id">{id}</span>{who ? <Av n={who} /> : <span className="sm">Unassigned</span>}</div>
      <div className="strong">{m}</div>
      <div className="fcard-amt">ZAR {amt}</div>
      <div className="fcard-row"><B t="grey">{src}</B>{matched ? <B t="green">Matched</B> : <B t="amber">Unmatched</B>}</div>
    </div>
  );
  return (
    <App active="Confirmed fraud" title="Confirmed fraud">
      <div className="toolbar"><span className="chip">Table</span><span className="chip on">Board</span><span className="chip">Import</span><span className="chip">Add case</span><span className="chip">Filters</span></div>
      <div className="board">
        <div className="col"><div className="col-h">New <span>3</span></div>
          {card("CF-000020", "QuickPay Store", "2 100,00", "Bank alert", true)}
          {card("CF-000013", "Skyline Mobile", "309,45", "Scheme report", false)}
          {card("CF-000012", "Skyline Mobile", "1 547,20", "Scheme report", false)}
        </div>
        <div className="col"><div className="col-h">Investigating <span>2</span></div>
          {card("CF-000006", "Demo Merchant B", "47,00", "Merchant", true, "Naledi K.")}
          {card("CF-000005", "Demo Merchant B", "23,00", "Scheme report", true, "Sipho D.")}
        </div>
        <div className="col"><div className="col-h">Closed <span>2</span></div>
          {card("CF-000010", "Demo Merchant A", "50,00", "Internal", true, "Kofi A.")}
          {card("CF-000008", "Demo Merchant B", "100,00", "Bank alert", true, "Amara O.")}
        </div>
        <div className="col"><div className="col-h">Duplicates <span>0</span></div><div className="sm" style={{ padding: 6 }}>Merged or ignored cases land here.</div></div>
      </div>
    </App>
  );
}

function Support() {
  const rows: ReactNode[][] = [
    [<M n="Ridgeway Collective" id="49548d48c208" key="a" />, "Settlements", <B t="red" key="s">Escalated</B>, <B t="red" key="p">High</B>, <span className="assign" key="as">Assign</span>, "18 min", "Asked for a person after repeated settlement questions."],
    [<M n="Cedar & Finch" id="0a9b24945f70" key="a" />, "Account access", <B t="red" key="s">Escalated</B>, <B t="red" key="p">High</B>, <span className="assign" key="as">Assign</span>, "42 min", "Can't reset 2FA; stuck in a bot loop."],
    [<M n="Morrow Logistics" id="2d55e3363d87" key="a" />, "Transactions", <B t="blue" key="s">Agent active</B>, <B t="amber" key="p">Medium</B>, <Av n="You" key="as" />, "8 min", "Refund dispute; agent claimed."],
  ];
  return (
    <App active="Support chats" title="Support chats">
      <div className="stat-row">
        <div className="stat"><b>2</b><span>Needs action</span></div>
        <div className="stat"><b>2</b><span>Unassigned</span></div>
        <div className="stat"><b>1</b><span>Agent active</span></div>
        <div className="stat"><b>0</b><span>Waiting on merchant</span></div>
      </div>
      <Table head={["Merchant", "Topic", "Status", "Priority", "Assignee", "Wait", "Escalation reason"]} rows={rows} minWidth={820} />
    </App>
  );
}

function Checkout() {
  return (
    <div className="phones">
      <div className="phone" role="img" aria-label="Embedded checkout payment method selection">
        <div className="ph-bar"><span>9:41</span><span>harbourroast.co.za</span></div>
        <div className="ph-head"><span className="ph-brand">Harbour Roast</span><span className="ph-amt">ZAR 48.99</span></div>
        <div className="pay-btn"> Pay</div>
        <div className="pm on"><span>Card</span><span className="pm-ic"><i /><i /><i /></span></div>
        <div className="pm"><span>Bank app pay</span><span className="pm-ic"><i /></span></div>
        <div className="pm"><span>Voucher</span><span className="pm-ic"><i /></span></div>
        <div className="pm"><span>Instant EFT</span><span className="pm-ic"><i /></span></div>
        <div className="ph-foot">🔒 Secured by Peach Payments</div>
      </div>
      <div className="phone" role="img" aria-label="Embedded checkout card form">
        <div className="ph-bar"><span>9:41</span><span>harbourroast.co.za</span></div>
        <div className="ph-head"><span className="sm">← Back</span><span className="ph-amt">ZAR 48.99</span></div>
        <div className="flabel">Card number</div><div className="field">4242 4242 4242 4242</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div><div className="flabel">Expiry</div><div className="field">MM / YY</div></div>
          <div><div className="flabel">CVV</div><div className="field">•••</div></div>
        </div>
        <div className="flabel">Name on card</div><div className="field">As shown on card</div>
        <div className="pay-btn" style={{ background: "#1e5b4a" }}>Pay ZAR 48.99</div>
        <div className="ph-foot">Real-time validation before submit</div>
      </div>
      <div className="phone" role="img" aria-label="Embedded checkout success state">
        <div className="ph-bar"><span>9:41</span><span>harbourroast.co.za</span></div>
        <div className="success-ic">✓</div>
        <div style={{ textAlign: "center", fontWeight: 600 }}>Payment successful</div>
        <div className="sm" style={{ textAlign: "center", marginBottom: 14 }}>A receipt is on its way to your email.</div>
        <div className="req"><span className="sm">Amount</span><span>ZAR 48.99</span></div>
        <div className="req"><span className="sm">Method</span><span>Card •••• 4242</span></div>
        <div className="req"><span className="sm">Date</span><span>25 Jul 2024</span></div>
        <div className="ph-foot">Returning you to the store…</div>
      </div>
    </div>
  );
}

function FloatCard() {
  return (
    <div className="float-ui">
      <div className="form">
        <div style={{ fontWeight: 600, marginBottom: 12 }}>Create a card</div>
        <div className="flabel">Who is this card for?</div><div className="field" style={{ color: "#1d1d1b" }}>Ama Owusu</div>
        <div className="flabel">Card nickname</div><div className="field">e.g. Stock purchases</div>
        <div className="flabel">Linked credit line</div><div className="field" style={{ color: "#1d1d1b" }}>Working capital · GHS 40,000 available</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div><div className="flabel">Limit type</div><div className="field" style={{ color: "#1d1d1b" }}>Monthly</div></div>
          <div><div className="flabel">Limit</div><div className="field" style={{ color: "#1d1d1b" }}>GHS 8,000</div></div>
        </div>
        <div className="pay-btn" style={{ background: "#1e5b4a", marginTop: 4 }}>Create card</div>
        <div className="sm" style={{ textAlign: "center" }}>Active within minutes</div>
      </div>
      <div className="vcard" role="img" aria-label="Virtual card">
        <div className="vcard-top"><B t="green">Active</B><b>float</b></div>
        <div className="vcard-num">•••• •••• •••• 5681</div>
        <div className="vcard-bot"><span>AMA OWUSU</span><span>Limit GHS 8,000 / mo</span></div>
      </div>
    </div>
  );
}

const screens: Record<string, () => ReactNode> = {
  "ram-pipeline": Pipeline,
  "ram-review-queue": ReviewQueue,
  "ram-drawer": Drawer,
  "ram-findings": Findings,
  "ram-enforcement": Enforcement,
  "risk-entry-points": EntryPoints,
  "risk-fraud-board": FraudBoard,
  "risk-support": Support,
  "checkout-widget": Checkout,
  "float-card": FloatCard,
};

export function Screen({ id, bare }: { id: string; bare?: boolean }) {
  const C = screens[id];
  if (!C) return null;
  if (bare) return <C />;
  return <div className="mock"><C /><div className="mock-note">Recreated in code with illustrative data. Names, IDs and amounts are not real.</div></div>;
}
