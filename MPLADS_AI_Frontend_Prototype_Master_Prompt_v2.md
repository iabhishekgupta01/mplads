# MPLADS AI MONITORING SYSTEM
## Frontend Prototype — SIH 26102
### Master UI/UX + React Architecture + CSS + Implementation Prompt

---

# HOW TO USE THIS DOCUMENT

This file is a **master implementation prompt** for an AI coding agent or frontend developer.

Give the complete document to the AI/developer and instruct it to build the frontend prototype according to this specification.

The developer/AI must not assume that the person providing the prompt already knows the desired layout.

**The layout, page hierarchy, component division, styling system, interaction model, mock data architecture, CSS architecture and SIH demonstration flow are defined here.**

The intended output is not a simple admin dashboard.

The target is an **original, government-grade AI monitoring and investigation platform** for MPLADS implementation that combines:

- Government-style trust and information hierarchy
- Modern analytics
- AI-based anomaly/risk presentation
- Geographic visualization
- Project-level investigation
- Explainable AI
- Officer decision/action workflow
- Compliance/audit traceability

The project source describes the problem as an AI-powered system for detecting anomalies, fraud and inefficiencies in MPLADS implementation. The design direction in the source emphasizes MoSPI/MPLADS/eSAKSHI-inspired government information architecture, high-density analytics, risk scoring, AI alerts and actionable resolution workflows. 

The final frontend must therefore communicate:

> **Monitor → Detect → Explain → Investigate → Act → Audit**

---

# 1. PROJECT CONTEXT

## Project

**MPLADS AI Monitoring System**

## SIH Problem Statement ID

**26102**

## Problem Statement

**Development of an AI-powered system to detect anomalies, fraud, and inefficiencies in MPLAD Scheme implementation.**

The project source identifies an officer-centric flow:

```text
Login
   ↓
Overview Dashboard
   ↓
Risk Detection
   ↓
Regional / District Drill Down
   ↓
Flagged Project
   ↓
AI Explanation
   ↓
Evidence
   ↓
Officer Action
   ↓
Status Update
   ↓
Compliance / Audit Trail
```

The source specifically emphasizes:

- risk scores;
- High / Medium / Low categories;
- AI-generated alerts;
- financial-progress mismatch;
- cost-overrun prediction;
- time-delay prediction;
- anomaly detection;
- project-level explanations;
- officer actions;
- audit trail.

Do not turn this into a generic statistics portal.

---

# 2. PRIMARY PRODUCT OBJECTIVE

The frontend should allow an officer to answer the following questions immediately:

### Question 1
What is happening across MPLADS implementation?

### Question 2
Where are the high-risk areas?

### Question 3
Which individual projects require attention?

### Question 4
Why has AI flagged this particular project?

### Question 5
What evidence supports the alert?

### Question 6
What does the AI predict?

### Question 7
What can the officer do?

### Question 8
What happened after the officer took action?

The interface must visually represent this chain.

---

# 3. THE CORE PRODUCT STORY

The application is NOT:

> "A dashboard with some charts."

It is:

> "A decision-support and monitoring system that transforms large-scale MPLADS implementation data into actionable, explainable project-risk intelligence."

The user journey should be:

```text
SEE THE STATE OF THE PROGRAM
          ↓
LOCATE RISK
          ↓
FIND PROJECT
          ↓
UNDERSTAND RISK
          ↓
SEE EVIDENCE
          ↓
TAKE ACTION
          ↓
TRACK OUTCOME
```

This is the most important design principle in the entire frontend.

---

# 4. DESIGN DIRECTION

The project source specifically wants the interface to retain the design discipline and visual patterns associated with official government information platforms while using modern analytics interactions.

Therefore use:

## Government characteristics

- restrained visual language;
- formal typography;
- strong hierarchy;
- clear labels;
- dense but readable tables;
- predictable navigation;
- explicit status;
- transparent information;
- minimal visual gimmicks.

## Modern analytics characteristics

- KPI cards;
- responsive charts;
- drill-down interactions;
- heat/risk maps;
- badges;
- progress indicators;
- AI insight panels;
- interactive filtering;
- action modals;
- timeline/audit interface.

## Overall visual concept

```text
Government Portal
        +
Enterprise Monitoring System
        +
AI Analytics Platform
```

Do NOT make it:

- neon;
- gaming-like;
- crypto-like;
- over-animated;
- overly colorful;
- glassmorphism-heavy;
- startup landing-page-like.

---

# 5. ORIGINALITY REQUIREMENT

Existing Government of India sites are inspiration only.

Do NOT:

- copy a page;
- copy exact website layout;
- copy a site's CSS;
- reproduce a portal pixel-for-pixel;
- use another site's branding as the application identity.

The final product should feel like:

> **A new Government AI Monitoring System designed specifically for MPLADS.**

Use government design principles, not copied screens.

---

# 6. PRIMARY FRONTEND TECHNOLOGY

Use:

```text
React.js
Vite
React Router
Tailwind CSS
Recharts
react-simple-maps
Lucide React
Axios
```

Optional:

```text
date-fns
React Context
```

TypeScript is preferred for a new implementation if the AI agent can maintain it cleanly.

If using JavaScript, maintain the same architecture and data contracts.

---

# 7. ARCHITECTURE PRINCIPLE

Use a **feature-oriented React architecture**.

Avoid:

```text
one giant Dashboard.jsx
one giant App.jsx
one giant CSS file
hardcoded arrays inside components
```

Instead use:

```text
Application Shell
    ↓
Pages
    ↓
Feature Components
    ↓
Reusable UI Components
    ↓
Service Layer
    ↓
Mock API / Future REST API
```

Conceptual architecture:

```text
┌───────────────────────────────────────────────┐
│                 React App                     │
├───────────────────────────────────────────────┤
│ Router                                        │
├───────────────────────────────────────────────┤
│ App Shell                                     │
│ ┌──────────────┐ ┌──────────────────────────┐ │
│ │ Sidebar      │ │ Top Header               │ │
│ └──────────────┘ └──────────────────────────┘ │
├───────────────────────────────────────────────┤
│ Page Layer                                    │
│                                               │
│ Dashboard / Projects / Risk / GIS / etc.     │
├───────────────────────────────────────────────┤
│ Feature Components                            │
│                                               │
│ KPI / Charts / Tables / AI / Actions          │
├───────────────────────────────────────────────┤
│ UI Components                                 │
│                                               │
│ Button / Modal / Badge / Card / Toast         │
├───────────────────────────────────────────────┤
│ Service Layer                                 │
│                                               │
│ API / Mock Data                                │
└───────────────────────────────────────────────┘
```

---

# 8. RECOMMENDED FILE STRUCTURE

Use approximately:

```text
src/
│
├── app/
│   ├── router.jsx
│   ├── App.jsx
│   └── providers.jsx
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── maps/
│
├── components/
│   │
│   ├── layout/
│   │   ├── AppShell.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SidebarSection.jsx
│   │   ├── TopHeader.jsx
│   │   ├── GlobalSearch.jsx
│   │   ├── NotificationCenter.jsx
│   │   ├── UserMenu.jsx
│   │   └── Breadcrumbs.jsx
│   │
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── IconButton.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── RiskBadge.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── Modal.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── Drawer.jsx
│   │   ├── Dropdown.jsx
│   │   ├── Tabs.jsx
│   │   ├── Select.jsx
│   │   ├── DateRangePicker.jsx
│   │   ├── Tooltip.jsx
│   │   ├── Toast.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── PageHeader.jsx
│   │   ├── SectionHeader.jsx
│   │   └── DataTable.jsx
│   │
│   ├── dashboard/
│   │   ├── StatCard.jsx
│   │   ├── RiskTrendChart.jsx
│   │   ├── FundAllocationChart.jsx
│   │   ├── GeographicRiskMap.jsx
│   │   ├── FlaggedProjectsTable.jsx
│   │   ├── AIInsightsPanel.jsx
│   │   └── DashboardSummary.jsx
│   │
│   ├── projects/
│   │   ├── ProjectFilters.jsx
│   │   ├── ProjectTable.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectGrid.jsx
│   │   ├── ProjectHeader.jsx
│   │   ├── ProjectMetrics.jsx
│   │   ├── FinancialPhysicalComparison.jsx
│   │   ├── RiskScoreRing.jsx
│   │   ├── AIReasonList.jsx
│   │   ├── PredictionCards.jsx
│   │   ├── CostPrediction.jsx
│   │   ├── DelayPrediction.jsx
│   │   ├── TransactionsTable.jsx
│   │   ├── EvidencePanel.jsx
│   │   ├── RecommendedAction.jsx
│   │   ├── ActionToolbar.jsx
│   │   ├── RequestAuditModal.jsx
│   │   ├── HaltPaymentModal.jsx
│   │   ├── ResolveProjectModal.jsx
│   │   └── ProjectTimeline.jsx
│   │
│   ├── risk/
│   │   ├── RiskFilters.jsx
│   │   ├── RiskSummary.jsx
│   │   ├── AlertCard.jsx
│   │   └── AlertsList.jsx
│   │
│   ├── gis/
│   │   ├── IndiaMap.jsx
│   │   ├── StateMap.jsx
│   │   ├── MapLegend.jsx
│   │   ├── MapTooltip.jsx
│   │   └── MapSidePanel.jsx
│   │
│   ├── analytics/
│   │   ├── AnalyticsFilters.jsx
│   │   ├── RiskByStateChart.jsx
│   │   ├── RiskByCategoryChart.jsx
│   │   ├── DelayChart.jsx
│   │   ├── OverrunChart.jsx
│   │   └── VendorAnomalyChart.jsx
│   │
│   └── compliance/
│       ├── AuditTimeline.jsx
│       ├── AuditFilters.jsx
│       └── AuditEventCard.jsx
│
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── ProjectsPage.jsx
│   ├── ProjectDetailsPage.jsx
│   ├── RiskAlertsPage.jsx
│   ├── FundUtilizationPage.jsx
│   ├── AnalyticsPage.jsx
│   ├── GISMapPage.jsx
│   ├── ReportsPage.jsx
│   ├── CompliancePage.jsx
│   ├── UsersPage.jsx
│   └── SettingsPage.jsx
│
├── services/
│   ├── api.js
│   ├── dashboardService.js
│   ├── projectService.js
│   ├── riskService.js
│   ├── complianceService.js
│   └── analyticsService.js
│
├── mock/
│   ├── dashboardData.js
│   ├── projectData.js
│   ├── transactionData.js
│   ├── alertData.js
│   ├── auditData.js
│   └── analyticsData.js
│
├── context/
│   ├── AuthContext.jsx
│   ├── AppContext.jsx
│   └── NotificationContext.jsx
│
├── hooks/
│   ├── useProjects.js
│   ├── useDashboard.js
│   ├── useRiskAlerts.js
│   ├── useAuth.js
│   └── useNotifications.js
│
├── utils/
│   ├── currency.js
│   ├── date.js
│   ├── risk.js
│   ├── filters.js
│   └── status.js
│
└── styles/
    ├── index.css
    ├── variables.css
    └── utilities.css
```

---

# 9. CSS ARCHITECTURE

Tailwind should handle most component styling.

However, the implementation must still have a **central design-token architecture**.

Do not scatter random values like:

```text
#123456
#1a2b3c
#f4f4f4
```

throughout the project.

Create centralized tokens.

## `variables.css`

Conceptually:

```css
:root {
  --color-primary: #0F172A;
  --color-background: #F4F7F6;
  --color-surface: #FFFFFF;

  --color-danger: #DC2626;
  --color-warning: #F59E0B;
  --color-success: #10B981;

  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-border: #E5E7EB;

  --radius-card: 14px;
  --radius-button: 10px;

  --shadow-card: 0 2px 10px rgba(15, 23, 42, 0.04);
  --shadow-card-hover: 0 8px 24px rgba(15, 23, 42, 0.08);

  --sidebar-width: 264px;
  --header-height: 72px;
}
```

Use equivalent Tailwind theme values if configuring Tailwind tokens.

---

# 10. GLOBAL CSS REQUIREMENTS

`index.css` should establish:

- body background;
- font family;
- default text color;
- box-sizing;
- scrollbar behavior;
- accessible focus;
- button/input defaults;
- selection behavior;
- table defaults;
- consistent transitions.

Conceptually:

```css
* {
  box-sizing: border-box;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: Inter, Roboto, sans-serif;
  background: var(--color-background);
  color: var(--color-text-primary);
}
```

Use a consistent transition:

```css
transition:
  background-color 160ms ease,
  border-color 160ms ease,
  box-shadow 160ms ease,
  color 160ms ease,
  transform 160ms ease;
```

Do NOT apply aggressive animations.

---

# 11. DESIGN TOKENS

## Background

```text
Main page:
#F4F7F6 / #F8FAFC

Card:
#FFFFFF

Sidebar:
#0F172A
```

## Risk

```text
Low:
#10B981

Medium:
#F59E0B

High:
#DC2626
```

## Typography

```text
Primary:
#111827

Secondary:
#6B7280

Muted:
#9CA3AF
```

## Borders

```text
#E5E7EB
```

## State behavior

High risk should never use red for the entire page.

Use red strategically:

- badge;
- border accent;
- icon;
- high-risk KPI;
- critical alert;
- danger action.

---

# 12. LAYOUT SYSTEM

Use a desktop-first application shell.

## Desktop

Target:

```text
1440 × 900
```

Recommended:

```text
Sidebar:
264px

Header:
72px

Main content:
remaining viewport width
```

Content max width:

```text
1400px
```

Main content padding:

```text
24–32px
```

---

# 13. APPLICATION SHELL

Structure:

```jsx
<AppShell>
  <Sidebar />

  <div className="app-main">
    <TopHeader />

    <main className="page-content">
      <Outlet />
    </main>
  </div>
</AppShell>
```

CSS/layout concept:

```css
.app-shell {
  min-height: 100vh;
  display: flex;
  background: var(--color-background);
}

.app-sidebar {
  width: var(--sidebar-width);
  position: fixed;
  inset: 0 auto 0 0;
}

.app-main {
  flex: 1;
  margin-left: var(--sidebar-width);
  min-width: 0;
}

.page-content {
  padding: 28px 32px 40px;
}
```

The implementation can use Tailwind equivalents.

---

# 14. SIDEBAR LAYOUT

Visual structure:

```text
┌──────────────────────────────┐
│ GOVT EMBLEM                  │
│ MPLADS AI                    │
│ Monitoring System            │
│                              │
│ ──────────────────────────── │
│                              │
│ ▣ Dashboard                  │
│                              │
│ ▣ Project Monitoring         │
│                              │
│ ▣ AI Analysis             ˅  │
│     Risk & Alerts            │
│     Fund Utilization         │
│     Project Database         │
│                              │
│ ▣ GIS Map                    │
│ ▣ Reports                    │
│ ▣ Compliance                 │
│ ▣ User Management            │
│ ▣ Settings                   │
│                              │
│                              │
│ Transparent Development,     │
│ Stronger India               │
└──────────────────────────────┘
```

The sidebar should remain visually stable throughout navigation.

---

# 15. SIDEBAR ACTIVE STATE

Active item:

- slightly lighter surface;
- high-contrast text;
- left accent bar;
- subtle icon emphasis.

Example:

```text
┌───────────────────────┐
│▌ Dashboard            │
└───────────────────────┘
```

Do not use oversized pills.

The design should remain institutional.

---

# 16. TOP HEADER

Layout:

```text
┌────────────────────────────────────────────────────────────────────┐
│ Breadcrumb / Page Context   Search...      Date   Bell   User     │
└────────────────────────────────────────────────────────────────────┘
```

Required:

### Search

```text
Search projects, districts, MPs...
```

### Date range

```text
Jan 2024 – Sep 2025
```

### Notifications

Bell with red unread indicator.

### Live data

```text
● Live Data
Last updated 2 min ago
```

### User

```text
State Nodal Officer
Madhya Pradesh
```

---

# 17. RESPONSIVE APP SHELL

At tablet width:

- sidebar becomes collapsible;
- header compresses;
- search becomes icon/button;
- date control becomes compact.

At mobile:

- sidebar becomes drawer;
- header becomes two rows when needed;
- page padding becomes 16px.

Do not horizontally overflow the whole page.

---

# 18. PAGE ROUTES

Use:

```text
/login
/dashboard
/projects
/projects/:id
/risk-alerts
/fund-utilization
/analytics
/gis-map
/reports
/compliance
/users
/settings
```

Protected routes:

```text
/dashboard
/projects
/projects/:id
/risk-alerts
/fund-utilization
/analytics
/gis-map
/reports
/compliance
/users
/settings
```

---

# 19. LOGIN PAGE LAYOUT

Do NOT build a flashy login landing page.

Use a formal split layout.

```text
┌──────────────────────────────┬──────────────────────────────┐
│                              │                              │
│ MPLADS AI                    │        Sign In               │
│ Monitoring System            │                              │
│                              │ User ID / Email              │
│ Monitoring MPLADS for a      │ [____________________]       │
│ more transparent and         │                              │
│ developed India              │ Password                     │
│                              │ [____________________]       │
│                              │                              │
│                              │ Role                         │
│                              │ [State Nodal Officer ▼]      │
│                              │                              │
│                              │ [ Sign In ]                  │
│                              │                              │
└──────────────────────────────┴──────────────────────────────┘
```

Use subtle map/data geometry in the branding area if desired.

---

# 20. DASHBOARD — PRIMARY SCREEN

The dashboard should be optimized for a judge's first 30 seconds.

The visual hierarchy must be:

```text
1. High-risk KPI
2. Risk concentration
3. Risk trend
4. Flagged projects
5. AI insights
```

The source specifies KPI cards, risk trend, fund allocation/utilization, geographic risk map, and an AI-flagged project table. 

---

# 21. DASHBOARD PAGE LAYOUT — FINAL RECOMMENDATION

Use the following layout rather than trying to fit everything into one horizontal row:

```text
┌─────────────────────────────────────────────────────────────────────┐
│ PAGE TITLE + STATE CONTEXT + DATE                                   │
├─────────────────────────────────────────────────────────────────────┤
│ KPI 1 │ KPI 2 │ KPI 3 │ KPI 4 │ HIGH RISK                          │
├───────────────────────────────────┬─────────────────────────────────┤
│ Risk Trend                        │ Fund Allocation vs Utilization   │
│                                   │                                 │
│                                   │                                 │
├───────────────────────────────────┴─────────────────────────────────┤
│ Geographic Risk Map                                                 │
│                                                                     │
│                           INDIA MAP                                 │
│                                                                     │
├────────────────────────────────────────────┬────────────────────────┤
│ AI Flagged Projects                        │ AI Insights             │
│                                            │                        │
│                                            │                        │
└────────────────────────────────────────────┴────────────────────────┘
```

This is the recommended layout for clarity and SIH demonstration.

---

# 22. DASHBOARD HEADER

Use:

```text
MPLADS Monitoring Overview
```

Subtitle:

```text
Track project execution, fund utilization and AI-detected risks.
```

Context:

```text
State: Madhya Pradesh
Reporting Period: FY 2025–26
```

Optional action:

```text
Export Report
```

Do not make the header excessively tall.

---

# 23. KPI CARDS

Create reusable:

```jsx
<StatCard />
```

Each card:

```text
Icon
Label
Large Value
Trend
Context
```

### Card 1

```text
Total Allocated Funds
₹5,892 Cr
↗ +6.2%
vs last year
```

### Card 2

```text
Total Released Funds
₹4,320 Cr
↗ +5.1%
vs last year
```

### Card 3

```text
Fund Utilization
73.3%
↗ +4.8%
vs last year
```

### Card 4

```text
Total Projects
48,326
↗ +12.4%
vs last year
```

### Card 5

```text
High Risk Projects
427
↗ +18.6%
vs last month
```

High-risk card must be visually stronger.

---

# 24. KPI CARD CSS BEHAVIOR

Default:

```text
white surface
border
subtle shadow
14px radius
20px padding
```

Hover:

```text
slightly stronger shadow
```

Do not:

- rotate card;
- enlarge card significantly;
- apply gradient;
- add heavy animation.

---

# 25. RISK TREND PANEL

Title:

```text
Risk Trend
```

Subtitle:

```text
Project risk distribution over the last 12 months
```

Chart:

```text
High Risk
Medium Risk
Low Risk
```

Tooltip:

```text
August 2026

High Risk: 427
Medium Risk: 1,284
Low Risk: 3,932
```

The chart should have:

- clear labels;
- readable axis;
- no unnecessary gridlines;
- sensible tooltips;
- empty state;
- loading state.

---

# 26. FUND ALLOCATION / UTILIZATION PANEL

Title:

```text
Fund Allocation vs Utilization
```

Use states such as:

```text
Uttar Pradesh
Maharashtra
Bihar
Madhya Pradesh
Rajasthan
```

Compare:

```text
Allocated
Utilized
```

Add a legend.

Tooltips should show actual values and formatted INR amounts.

---

# 27. GEOGRAPHIC RISK MAP PANEL

This should be one of the strongest visual elements.

Title:

```text
Geographic Risk Overview
```

Subtitle:

```text
Risk concentration across states
```

India map.

Risk:

```text
Low → Green
Medium → Amber
High → Red
```

Legend:

```text
Low Risk
Medium Risk
High Risk
```

---

# 28. MAP INTERACTION

Hover state:

```text
Madhya Pradesh

High Risk
58 flagged projects

Average Risk
72

View Details →
```

Click:

```text
→ /projects?state=Madhya Pradesh
```

This is important.

The map should drive investigation.

---

# 29. FLAGGED PROJECT TABLE

Title:

```text
AI Flagged Projects
```

Subtitle:

```text
Highest-risk projects requiring attention
```

Columns:

```text
Project ID
Project Name
State
District
Allocated
Utilized
Risk
AI Finding
Status
Action
```

Use a maximum initial display of 5–10 rows.

Button:

```text
View All
```

---

# 30. FLAGGED PROJECT TABLE ROW

Example:

```text
MPLADS-2024-1187
Construction of Community Hall
Madhya Pradesh
Indore

₹48.5 L
92%

92 HIGH

Suspicious billing pattern

Under Review

[View]
```

Risk badge should be clear but not oversized.

---

# 31. AI INSIGHTS PANEL

Title:

```text
AI Insights
```

Example cards:

```text
35% increase in high-risk projects
over the last 3 months.

18 projects show significant
financial-progress mismatches.

Recurring vendor patterns detected
across multiple projects.

7 districts require enhanced monitoring.
```

Each insight can include:

- icon;
- headline;
- short evidence;
- severity;
- optional View action.

---

# 32. PROJECT MONITORING PAGE

This page should be optimized for operational filtering.

Header:

```text
Project Monitoring

Search and analyze MPLADS works across
states, districts and constituencies.
```

---

# 33. PROJECT FILTER AREA

Recommended layout:

```text
┌───────────────────────────────────────────────────────────────────┐
│ Search Project...                                                 │
│ State ▼ │ District ▼ │ MP ▼ │ Category ▼ │ Status ▼ │ Risk ▼    │
│                                                                  │
│ Date Range                              Clear Filters             │
└───────────────────────────────────────────────────────────────────┘
```

Use compact controls.

Do not give every filter a giant card.

---

# 34. FILTER BEHAVIOR

All filters must actually work.

State:

```text
Madhya Pradesh
```

then:

- district options should optionally become relevant to MP;
- project list should update.

Risk:

```text
High
```

then only High projects appear.

Status:

```text
Under Review
```

then only those projects appear.

Clear Filters resets everything.

---

# 35. SEARCH BEHAVIOR

Search:

```text
Sehore
```

should match:

- project name;
- district;
- project ID;
- MP name.

Search results should update immediately or after a short debounce.

---

# 36. PROJECT TABLE

Columns:

```text
Project ID
Project
Location
Category
Agency
Sanction Date
Cost
Progress
Risk
Status
Action
```

Use sticky table header if useful.

Make long project names truncate gracefully with tooltip.

---

# 37. PROJECT GRID VIEW

Toggle:

```text
[ Table ] [ Grid ]
```

Default:

```text
Table
```

Grid is useful for quick visual browsing.

---

# 38. PROJECT CARD

Recommended structure:

```text
┌────────────────────────────────────────┐
│ HIGH RISK                         82   │
│                                        │
│ Road Construction – Sehore             │
│ MP-2024-1001                            │
│ Sehore • Madhya Pradesh                │
│                                        │
│ Work Category           Road            │
│ Sanctioned              ₹20,00,000      │
│                                        │
│ Physical Progress       40%             │
│ ████████░░░░░░                         │
│                                        │
│ Expenditure             85%             │
│ Status                  Delayed         │
│                                        │
│               [ View Project ]          │
└────────────────────────────────────────┘
```

Do not overload the card.

---

# 39. PROJECT DETAILS PAGE — MOST IMPORTANT PAGE

The project details page is the **core innovation screen**.

A judge should be able to understand the problem without scrolling excessively.

The first screenful should show:

```text
Project
Risk
Money
Physical progress
Risk explanation
```

---

# 40. PROJECT DETAIL PAGE — RECOMMENDED LAYOUT

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Breadcrumb                                                            │
│ Road Construction – Sehore     [ HIGH RISK ]                         │
│ Project ID | District | State | Work Category                       │
├──────────────────────────────────────────────────────────────────────┤
│ KPI 1 │ KPI 2 │ KPI 3 │ KPI 4 │ KPI 5 │ KPI 6                       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ Financial vs Physical Progress                                      │
│                                                                      │
├────────────────────────────────┬─────────────────────────────────────┤
│                                │                                     │
│ AI Risk Score                  │ Why is this project flagged?        │
│                                │                                     │
│      82 / 100                  │ ⚠ reason                             │
│      HIGH RISK                 │ ⚠ reason                             │
│                                │ ⚠ reason                             │
├────────────────────────────────┴─────────────────────────────────────┤
│ AI Predictions                                                       │
│ Cost Risk │ Delay Risk │ Anomaly Score                               │
├──────────────────────────────────────────────────────────────────────┤
│ Transaction Anomaly / Evidence                                      │
├──────────────────────────────────────────────────────────────────────┤
│ Recommended Action                                                   │
├──────────────────────────────────────────────────────────────────────┤
│ Action Toolbar                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

# 41. PROJECT HEADER

Example:

```text
Road Construction – Sehore

[ ● HIGH RISK ]

Project ID: MP-2024-1001
District: Sehore
State: Madhya Pradesh
Work Type: Road
```

Optional:

```text
MP: Sample MP
Executing Agency: Sample Agency
```

---

# 42. PROJECT KPI ROW

Show:

```text
Sanctioned Amount
₹20,00,000

Released Amount
₹18,00,000

Expenditure
₹17,00,000
85%

Physical Progress
40%

Expected Completion
June 2026

Delay
4 Months
```

Each metric should be visually distinct.

---

# 43. FINANCIAL VS PHYSICAL PROGRESS

This is one of the most important pieces of UI.

Use two horizontal progress indicators:

```text
Financial Progress
85%
█████████████████░░░

Physical Progress
40%
████████░░░░░░░░░░░
```

Then show:

```text
Progress Gap
45 percentage points
```

Callout:

```text
Expenditure is significantly higher
than reported physical progress.
```

This is the simplest visual way to communicate the anomaly.

---

# 44. RISK SCORE RING

Use a reusable:

```jsx
<RiskScoreRing score={82} />
```

Visual:

```text
        ╭────────╮
      ╭─          ─╮
     │     82       │
     │    /100      │
     │  HIGH RISK   │
      ╰─          ─╯
        ╰────────╯
```

Rules:

```text
0–49   LOW
50–79  MEDIUM
80–100 HIGH
```

The center must show the number.

The category must always be visible.

---

# 45. WHY IS THIS PROJECT FLAGGED?

Title:

```text
Why is this project flagged?
```

Use individual alert items.

### Example

```text
⚠ Financial-progress mismatch

Expenditure has reached 85% while
physical progress is 40%.
```

```text
⚠ Project delay

Current progress indicates an estimated
4-month delay.
```

```text
⚠ Payment anomaly

Multiple similar payments were detected
within a short period.
```

```text
⚠ Similar project pattern

A nearby project shows unusually similar
attributes.
Duplicate probability: 65%.
```

Each finding should be concise.

---

# 46. AI PREDICTION CARDS

Three major cards:

```text
Delay Probability
78%

Cost Overrun Risk
65%

Anomaly Score
82
```

Optional fourth:

```text
Overall Risk
82/100
```

Do not display machine-learning jargon without explanation.

---

# 47. COST PREDICTION

Use:

```text
Predicted Final Cost
₹23,60,000

Estimated Overrun
18%
```

Visual:

```text
Sanctioned Cost
₹20,00,000

Predicted Cost
₹23,60,000
```

Supporting text:

```text
Model prediction based on current
expenditure trajectory and project context.
```

---

# 48. TIME PREDICTION

Use:

```text
Expected Completion
August 2026

Estimated Delay
4 Months
```

Show:

```text
Original
June 2026

Predicted
August 2026
```

Do not hide the actual dates.

---

# 49. TRANSACTION ANOMALY

Title:

```text
Payment / Transaction Analysis
```

Table:

```text
Date
Transaction ID
Vendor
Amount
Description
AI Status
```

Example:

```text
14 Aug
TXN-001
ABC Infrastructure
₹5,00,000
Road material payment
FLAGGED

14 Aug
TXN-002
ABC Infrastructure
₹5,00,000
Road material payment
FLAGGED

15 Aug
TXN-003
ABC Infrastructure
₹5,00,000
Road material payment
FLAGGED
```

---

# 50. TRANSACTION INSIGHT CALLOUT

Display beneath table:

```text
Pattern detected

3 identical payments released
within 48 hours.

Requires verification.
```

This is a major SIH storytelling element.

---

# 51. EVIDENCE PANEL

Optional section:

```text
Supporting Evidence
```

Tabs:

```text
Documents
Geo-tagged Photos
Transactions
Project History
```

For prototype:

- documents can be placeholders;
- photos can be demo images/placeholders;
- historical events can use mock timeline.

Always label synthetic/demo material appropriately.

---

# 52. RECOMMENDED ACTION PANEL

Title:

```text
Recommended Action
```

Example:

```text
Field verification recommended.

Check reported physical progress and
payment records before further disbursement.
```

Use a subtle amber information container.

Do not make this look like a fatal error.

---

# 53. ACTION TOOLBAR

Buttons:

```text
[ Request Audit ]
[ Halt Vendor Payment ]
[ Mark Resolved ]
```

Optional:

```text
[ Mark False Positive ]
[ Assign for Inspection ]
```

Button hierarchy:

### Primary

Request Audit

### Danger

Halt Vendor Payment

### Secondary

Mark Resolved

### Ghost

Mark False Positive

---

# 54. REQUEST AUDIT MODAL

Title:

```text
Request Field Audit
```

Fields:

```text
Project
Road Construction – Sehore

Assign Officer
[ Select Officer ▼ ]

Priority
[ High ▼ ]

Reason
[________________________]

Additional Instructions
[________________________]
```

Buttons:

```text
Cancel
Submit Request
```

On submit:

1. show loading;
2. submit action;
3. update status;
4. close modal;
5. show toast;
6. add audit event;
7. update visible page.

Result:

```text
Project Status
UNDER REVIEW
```

---

# 55. HALT VENDOR PAYMENT MODAL

Title:

```text
Halt Vendor Payment?
```

Message:

```text
You are about to place the associated
vendor payment workflow on hold.
```

Fields:

```text
Reason
[________________________]
```

Buttons:

```text
Cancel
Confirm Halt
```

After confirmation:

```text
Payment Status
HALTED
```

And project status can become:

```text
Funds Halted
```

---

# 56. MARK RESOLVED MODAL

Title:

```text
Mark Project Resolved
```

Fields:

```text
Resolution Notes
[________________________]

Supporting Reference
[________________________]
```

After:

```text
Status
RESOLVED

Resolved by
State Nodal Officer

Resolved at
06 Sep 2026
```

---

# 57. ACTION STATE MANAGEMENT

The frontend must simulate state changes.

Example:

```text
Delayed
    ↓
Request Audit
    ↓
Under Review
```

Another:

```text
Delayed
    ↓
Halt Vendor Payment
    ↓
Funds Halted
```

Another:

```text
Under Review
    ↓
Mark Resolved
    ↓
Resolved
```

These changes must update:

- project detail;
- project table;
- dashboard if applicable;
- risk alerts;
- compliance/audit trail.

---

# 58. RISK & ALERTS PAGE

Purpose:

Create a triage inbox.

Header:

```text
AI Risk & Alerts

Prioritize projects requiring investigation.
```

Tabs:

```text
All
High Risk
Medium Risk
Low Risk
Unresolved
Under Review
Resolved
```

---

# 59. ALERT CARD DESIGN

Example:

```text
┌───────────────────────────────────────────┐
│ HIGH RISK                      92 / 100   │
│                                           │
│ Construction of Community Hall            │
│ Indore, Madhya Pradesh                    │
│                                           │
│ Triggered by                               │
│ • 94% expenditure                         │
│ • 31% physical progress                  │
│ • Vendor payment anomaly                  │
│                                           │
│ Detected 2 hours ago                      │
│                                           │
│                 [ Investigate ]            │
└───────────────────────────────────────────┘
```

---

# 60. FUND UTILIZATION PAGE

Purpose:

Understand where money is going.

Top cards:

```text
Allocated
Released
Utilized
Remaining
```

Charts:

```text
Allocated vs Released vs Expenditure
Monthly Expenditure
State-wise Utilization
District-wise Utilization
```

Special table:

```text
High Expenditure / Low Progress
```

Columns:

```text
Project
District
Expenditure
Physical Progress
Gap
Risk
```

This creates a direct connection between financial monitoring and anomaly detection.

---

# 61. GIS PAGE

Dedicated investigation map.

Desktop:

```text
┌───────────────────────────┬─────────────────────────────┐
│ Filters                   │                             │
│                           │                             │
│ State                     │         INDIA MAP           │
│ District                  │                             │
│ Risk Level                │                             │
│ Category                  │                             │
│                           │                             │
└───────────────────────────┴─────────────────────────────┘
```

Side panel:

```text
Selected State
Madhya Pradesh

Projects
4,281

High Risk
58

Average Risk
64

Fund Utilization
74.2%

[ View Projects ]
```

---

# 62. ANALYTICS PAGE

Use a clean analytical layout.

Sections:

```text
Risk Distribution
Risk by State
Risk by District
Risk by Work Category
Cost Overrun
Time Delay
Vendor Anomaly
Financial vs Physical Gap
```

Do not create charts merely to fill space.

Each chart must answer a specific question.

---

# 63. REPORTS PAGE

Header:

```text
Generate Monitoring Report
```

Filters:

```text
Report Type
State
District
Date Range
Risk Level
```

Preview:

```text
Executive Summary
Financial Overview
Project Statistics
High Risk Projects
AI Findings
Officer Actions
```

Buttons:

```text
Generate
Download PDF
Export CSV
```

For prototype, export can be mocked.

---

# 64. COMPLIANCE / AUDIT PAGE

This page is highly important for credibility.

Title:

```text
Compliance & Audit Trail
```

Timeline:

```text
06 Sep 2026
10:42 AM

State Nodal Officer
Requested Field Audit

Project:
Road Construction – Sehore

Reason:
Mismatch between expenditure
and physical progress.
```

Next:

```text
05 Sep 2026
04:18 PM

AI Risk Engine
Risk score updated

68 → 82

Reason:
New transaction anomaly detected.
```

Next:

```text
01 Sep 2026
11:02 AM

System
Project flagged

Reason:
Financial-progress mismatch.
```

---

# 65. AUDIT TIMELINE COMPONENT

Create:

```jsx
<AuditTimeline events={events} />
```

Each event contains:

```text
timestamp
actor
actorRole
action
project
reason
oldStatus
newStatus
```

Display a clear progression.

---

# 66. USER MANAGEMENT

Table:

```text
Name
Role
State
District
Status
Last Active
Action
```

Roles:

```text
Ministry Official
State Nodal Officer
District Authority
Field Officer
```

This can remain a secondary prototype page.

---

# 67. SETTINGS

Sections:

```text
Profile
Notification Preferences
Dashboard Preferences
Risk Thresholds
System Information
```

Risk thresholds:

```text
Low:
0–49

Medium:
50–79

High:
80–100
```

---

# 68. ROLE-AWARE UI

Mock role context.

Example:

### Ministry Official

Dashboard context:

```text
India
```

### State Nodal Officer

```text
Madhya Pradesh
```

### District Authority

```text
Sehore
```

### Field Officer

```text
Assigned Projects
```

The prototype can use local state instead of real authorization.

---

# 69. DATA ARCHITECTURE

The frontend must consume structured data.

Do not hardcode data directly inside UI JSX.

Use:

```text
Page
 ↓
Hook / Service
 ↓
Mock API
```

Later:

```text
Page
 ↓
Hook / Service
 ↓
Axios
 ↓
Node / Express
 ↓
MongoDB / AI service
```

This allows backend integration without rewriting the UI.

---

# 70. PROJECT DATA CONTRACT

Use this approximate structure:

```javascript
{
  projectId: "MP-2024-1001",

  projectName: "Road Construction - Sehore",

  state: "Madhya Pradesh",
  district: "Sehore",
  constituency: "Sehore",

  mpName: "Sample MP",

  workCategory: "Road",

  executionAgency: "Sample Agency",

  sanctionedAmount: 2000000,
  totalReleasedAmount: 1800000,
  totalExpenditure: 1700000,

  reportedPhysicalProgress: 40,

  sanctionDate: "2024-06-15",
  expectedCompletionDate: "2026-06-30",

  status: "Delayed",

  aiRiskProfile: {
    overallScore: 82,
    riskCategory: "High",

    costOverrunProbability: 65,
    timeDelayProbability: 78,
    anomalyScore: 82,

    duplicateProbability: 65,

    predictedFinalCost: 2360000,

    predictedCompletionDate: "2026-08-30",

    estimatedDelayMonths: 4,

    flagReasons: [
      "Expenditure is significantly higher than physical progress",
      "Project delay detected",
      "Abnormal payment pattern identified",
      "Similar project detected nearby"
    ],

    recommendedAction:
      "Field verification recommended. Check physical progress and payment records.",

    lastScoredAt: "2026-09-06T09:30:00Z"
  }
}
```

---

# 71. TRANSACTION DATA CONTRACT

```javascript
{
  transactionId: "TXN-001",

  projectId: "MP-2024-1001",

  vendorId: "VEND-019",

  vendorName: "ABC Infrastructure",

  amount: 500000,

  paymentDate: "2026-08-14",

  description: "Road material payment",

  isFlaggedByAI: true
}
```

---

# 72. ALERT DATA CONTRACT

```javascript
{
  id: "ALERT-001",

  projectId: "MP-2024-1001",

  riskScore: 82,

  riskCategory: "High",

  title: "Financial-physical progress mismatch",

  description:
    "Expenditure has reached 85% while reported physical progress is 40%.",

  severity: "High",

  status: "Unresolved",

  createdAt: "2026-09-06T09:00:00Z"
}
```

---

# 73. AUDIT EVENT CONTRACT

```javascript
{
  id: "AUD-001",

  projectId: "MP-2024-1001",

  actor: "State Nodal Officer",

  actorRole: "State Nodal Officer",

  action: "Requested Field Audit",

  previousStatus: "Delayed",

  newStatus: "Under Review",

  reason:
    "Mismatch between expenditure and physical progress.",

  timestamp:
    "2026-09-06T10:42:00Z"
}
```

---

# 74. MOCK DATA VOLUME

For the first prototype:

```text
20–30 projects
15–30 transactions
10–20 alerts
10+ audit events
```

Later this can scale to thousands of records.

The frontend architecture must not assume only 5 records exist.

---

# 75. DEMO PROJECT — PRIMARY SHOWCASE

Create one hero project for the SIH presentation.

```text
Project ID:
MP-2024-1001

Project:
Road Construction – Sehore

State:
Madhya Pradesh

District:
Sehore

Category:
Road

Sanctioned:
₹20,00,000

Released:
₹18,00,000

Expenditure:
₹17,00,000

Expenditure:
85%

Physical Progress:
40%

Delay:
4 Months

Risk:
82 / 100 HIGH
```

AI findings:

```text
Financial-progress mismatch
Project delay
Abnormal payment pattern
Possible nearby duplicate/similar project
```

Predictions:

```text
Delay Probability: 78%
Cost Overrun Risk: 65%
Anomaly Score: 82
```

Payment pattern:

```text
3 identical payments
within 48 hours
```

---

# 76. DEMO PROJECT — IMPORTANT UX RULE

This project should be discoverable naturally.

Do NOT make the developer create a hidden special route like:

```text
/demo-project
```

Instead it must appear in the normal workflow:

```text
Dashboard
→ Madhya Pradesh
→ Sehore
→ Road Construction – Sehore
```

This makes the demo feel like a real system.

---

# 77. SIH DEMO FLOW

The complete demo must work without modifying code during presentation.

## STEP 1

Open:

```text
/login
```

Select:

```text
State Nodal Officer
```

Login.

---

## STEP 2

Landing:

```text
/dashboard
```

Judge sees:

```text
High Risk Projects
427
```

---

## STEP 3

Judge sees risk concentration on map.

Click:

```text
Madhya Pradesh
```

---

## STEP 4

Navigate/filter:

```text
Sehore
```

---

## STEP 5

Find:

```text
Road Construction – Sehore
82/100 HIGH
```

---

## STEP 6

Open project.

First screenful shows:

```text
82/100 HIGH RISK

Expenditure:
85%

Physical Progress:
40%

Gap:
45 points
```

---

## STEP 7

Judge reads:

```text
Why is this project flagged?

Financial-progress mismatch
Four-month delay
Payment anomaly
Possible similar project
```

---

## STEP 8

Show:

```text
Delay Probability
78%

Cost Overrun Risk
65%

Anomaly Score
82
```

---

## STEP 9

Show:

```text
3 identical payments
within 48 hours
```

---

## STEP 10

Click:

```text
Request Audit
```

---

## STEP 11

Select officer:

```text
Field Officer
```

Enter:

```text
Verify reported physical progress
and payment records.
```

Submit.

---

## STEP 12

Status becomes:

```text
UNDER REVIEW
```

---

## STEP 13

Open Compliance:

```text
Field Audit Requested
```

The new event appears in the audit timeline.

---

# 78. WHY THIS FLOW MATTERS

A chart alone does not show impact.

The complete flow demonstrates:

```text
Data
 ↓
AI
 ↓
Risk
 ↓
Explanation
 ↓
Evidence
 ↓
Officer
 ↓
Action
 ↓
Traceability
```

This is the central prototype story.

---

# 79. AI OUTPUT PRESENTATION RULES

AI values must be understandable to a government user.

Do not simply display:

```text
0.823
0.654
-0.172
```

Instead:

```text
Overall Risk
82 / 100

Delay Probability
78%

Cost Overrun Risk
65%

Anomaly Score
82
```

Explain each metric where useful.

---

# 80. AI EXPLAINABILITY RULE

The model output must never be a black box.

Every high-risk project should have:

```text
Overall Score
+
Risk Category
+
Reasons
+
Evidence
+
Recommended Action
```

Example:

```text
Risk Score
82 / 100

Why flagged:
• 85% expenditure vs 40% physical progress
• 4-month delay
• repeated vendor payment pattern

Recommended:
Field verification
```

---

# 81. AI / FRAUD LANGUAGE RULE

Never use language that presents an AI score as legal proof of fraud.

Use:

```text
AI flagged
Potential anomaly
Elevated risk
Suspicious pattern
Requires verification
Possible duplicate
Investigation recommended
Unusual payment behavior
```

Avoid:

```text
Fraud confirmed
Corrupt vendor
Guilty officer
Confirmed scam
```

The frontend is a monitoring and decision-support interface.

---

# 82. RISK BADGE SYSTEM

Create reusable:

```jsx
<RiskBadge score={82} />
```

Rules:

```text
0–49
Low

50–79
Medium

80–100
High
```

Badge examples:

```text
● LOW
24

● MEDIUM
63

● HIGH
82
```

Do not rely on color alone.

---

# 83. STATUS BADGE SYSTEM

Create separately from risk badges.

Examples:

```text
Not Started
Ongoing
Delayed
Under Review
Funds Halted
Completed
Resolved
False Positive
```

Risk:

```text
High / Medium / Low
```

Status:

```text
Delayed / Under Review / Resolved
```

Do not mix these concepts.

---

# 84. CURRENCY UTILITY

Create:

```javascript
formatCurrencyINR()
```

Examples:

```text
₹20,00,000
₹17,00,000
₹5,892 Cr
```

Do not display:

```text
2000000
1700000
5892
```

The interface should feel India-specific.

---

# 85. DATE UTILITY

Create:

```javascript
formatDate()
formatDateTime()
```

Examples:

```text
06 Sep 2026

06 Sep 2026, 10:42 AM

14 Aug 2026
```

---

# 86. COMMON CARD COMPONENT

Create:

```jsx
<Card>
  ...
</Card>
```

Props:

```text
padding
title
subtitle
headerAction
className
```

Cards should have one consistent visual identity.

---

# 87. BUTTON SYSTEM

Use reusable variants:

```text
primary
secondary
danger
ghost
outline
link
```

Primary:

```text
navy
```

Danger:

```text
red
```

Warning:

```text
amber
```

Success:

```text
green
```

Do not create custom button styles on every page.

---

# 88. MODAL SYSTEM

Every modal should use one reusable base component.

Required behavior:

- overlay;
- centered desktop modal;
- responsive mobile width;
- keyboard close;
- Escape close;
- accessible title;
- focus handling where possible;
- disabled/loading submit state.

---

# 89. TOAST SYSTEM

Use consistent notification positions.

Recommended:

```text
bottom-right desktop
bottom-center mobile
```

Success:

```text
✓ Audit request submitted
```

Error:

```text
✕ Unable to update project
```

Warning:

```text
⚠ Confirmation required
```

---

# 90. LOADING UX

Each major component requires a loading state.

Examples:

### KPI

Skeleton block.

### Table

Skeleton rows.

### Chart

Skeleton chart surface.

### Map

Map loading placeholder.

### Project details

Skeleton layout.

Never display a blank area without context.

---

# 91. EMPTY STATE UX

Example:

```text
No projects found

No projects match the current filters.

[ Clear Filters ]
```

For alerts:

```text
No unresolved alerts

All currently visible alerts
have been reviewed.
```

---

# 92. ERROR STATE UX

Example:

```text
Unable to load project data.

The monitoring service did not respond.

[ Retry ]
```

Never show raw technical stack traces.

---

# 93. TABLE DESIGN

Use:

- white surface;
- subtle borders;
- compact header;
- readable rows;
- hover state;
- fixed alignment;
- risk/status badges;
- consistent numeric alignment.

Numeric columns should preferably align consistently.

Long text should truncate with tooltip.

---

# 94. TABLE DENSITY

The application is intended for professional users.

Therefore tables may be relatively dense.

Recommended row height:

```text
56–68px
```

Do not make each row enormous.

---

# 95. CHART DESIGN

Chart principles:

- no decorative 3D charts;
- no pie-chart overload;
- no rainbow palette;
- clear legends;
- readable tooltips;
- consistent axes;
- responsive width;
- minimum usable height.

Recommended chart height:

```text
280–360px
```

---

# 96. MAP DESIGN

The map should not dominate the entire application.

The purpose is:

```text
Identify geographic concentration
```

not:

```text
Show off a map library
```

The map must link to project filtering.

---

# 97. SEARCH DESIGN

Global search should support:

```text
Project
District
State
MP
```

Dropdown:

```text
Projects
Districts
States
```

Example:

```text
Sehore

Projects
Road Construction – Sehore
Community Hall – Sehore

District
Sehore
```

Click → destination.

---

# 98. NOTIFICATION CENTER

Notification popover:

```text
AI Risk Alert

Road Construction – Sehore
Risk increased to 82

2 min ago
```

Another:

```text
Vendor anomaly detected
Indore
High severity

15 min ago
```

Allow mark-as-read behavior in local state.

---

# 99. ROLE-AWARE DASHBOARD CONTEXT

Do not necessarily change entire layouts by role.

Instead change:

- title;
- scope;
- filters;
- visible project set;
- location context.

Example:

```text
Ministry Official
Nationwide Monitoring

State Nodal Officer
Madhya Pradesh Monitoring

District Authority
Sehore Monitoring
```

---

# 100. RESPONSIVE BREAKPOINT STRATEGY

Recommended conceptual breakpoints:

```text
>= 1280px
Desktop

1024–1279px
Compact Desktop

768–1023px
Tablet

< 768px
Mobile
```

Desktop requirements:

- full sidebar;
- 5 KPI cards can fit;
- 2-column chart area;
- large table.

Tablet:

- 2–3 KPI cards per row;
- charts may stack;
- sidebar collapses.

Mobile:

- 1 KPI per row or 2 compact columns;
- charts stack;
- project details stack vertically;
- actions become full-width;
- map reduces height.

---

# 101. MOBILE PROJECT DETAIL

The three-column AI section must stack:

```text
Risk Score
↓
Why Flagged
↓
AI Predictions
```

Transactions become horizontally scrollable if needed.

Action toolbar should become:

```text
Request Audit
Halt Payment
Mark Resolved
```

stacked or two-column.

---

# 102. ACCESSIBILITY REQUIREMENTS

Mandatory:

- keyboard navigation;
- clear focus states;
- semantic labels;
- accessible buttons;
- accessible modal;
- readable color contrast;
- descriptive icons;
- text + color for risk;
- charts with labels/tooltips.

Bad:

```text
red dot
```

Good:

```text
● HIGH RISK
82 / 100
```

---

# 103. PERFORMANCE

The prototype must remain responsive.

Use:

- memoization where useful;
- pagination;
- efficient filtering;
- lazy loading of secondary routes;
- optimized map rendering;
- small icon assets;
- no unnecessary state updates.

Do not overengineer.

---

# 104. MOCK BACKEND SERVICE

The service layer should expose functions like:

```javascript
dashboardService.getDashboardStats()

projectService.getProjects(filters)

projectService.getProjectById(id)

projectService.getProjectTransactions(id)

projectService.submitAction(id, payload)

riskService.getAlerts(filters)

complianceService.getAuditTrail()

analyticsService.getAnalytics()
```

Initially these use mock data.

Later they use Axios.

---

# 105. FUTURE API CONTRACT

Prepare the frontend for:

```text
GET /api/projects/dashboard-stats

GET /api/projects/flagged

GET /api/projects

GET /api/projects/:id

GET /api/projects/:id/transactions

GET /api/risk-alerts

POST /api/projects/:id/action

GET /api/compliance

GET /api/analytics

GET /api/map
```

The original project architecture explicitly identifies dashboard statistics, flagged projects and officer project actions as core endpoints.

---

# 106. API ABSTRACTION

Do not:

```jsx
fetch("http://localhost:5000/api/projects")
```

from random components.

Instead:

```text
service
↓
api client
```

Example:

```javascript
export const getProjects = async (filters) => {
  return api.get("/projects", { params: filters });
};
```

The mock implementation can have the same function signature.

---

# 107. STATE MANAGEMENT

Track global state for:

```text
authenticated user
role
state scope
district scope
notifications
date range
```

Local state for:

```text
modal open/close
selected project action
filters
table view
```

Do not move every tiny value into global state.

---

# 108. FILTER STATE

Recommended shape:

```javascript
{
  search: "",
  state: "",
  district: "",
  mp: "",
  workCategory: "",
  status: "",
  riskLevel: "",
  startDate: "",
  endDate: ""
}
```

---

# 109. PROJECT DETAILS STATE

Recommended UI state:

```javascript
{
  actionModal: null,
  isSubmitting: false,
  statusOverride: null,
  toast: null
}
```

The actual project remains sourced from service data.

---

# 110. DEMO DATA SCENARIOS

Include at least:

### Normal

```text
Expenditure: 45%
Physical: 48%
Risk: 22
Status: Ongoing
```

### Moderate cost risk

```text
Expenditure: 78%
Physical: 60%
Risk: 68
```

### High delay risk

```text
Physical: 48%
High elapsed time
Risk: 81
```

### Financial-progress mismatch

```text
Expenditure: 85%
Physical: 40%
Risk: 82
```

### Vendor anomaly

```text
Three identical payments
Risk: 89
```

### Duplicate-like project

```text
Similar title/location/vendor
Risk: 76
```

### Resolved

```text
Risk: 88 previously
Status: Resolved
```

### Under Review

```text
Risk: 82
Status: Under Review
```

---

# 111. EXAMPLE PROJECT NAMES

Use realistic but clearly synthetic examples such as:

```text
Road Construction – Sehore
Construction of Community Hall – Indore
Primary Health Centre Upgrade – Bhopal
Drinking Water Pipeline – Rewa
Government School Infrastructure Upgrade – Jabalpur
Community Sanitation Facility – Ujjain
Rural Access Road Improvement – Vidisha
Public Library Construction – Sagar
```

Do not imply these are real government records.

---

# 112. WORK CATEGORIES

Use:

```text
Road
Education
Health
Water
Sanitation
Community Infrastructure
Public Facilities
```

---

# 113. GOVERNMENT STYLE CONTENT

Use formal terms:

```text
Project Monitoring
Fund Utilization
Execution Agency
Sanctioned Amount
Released Amount
Expenditure
Physical Progress
Risk Indicator
AI Findings
Officer Action
Compliance Trail
Field Inspection
Audit
Status
```

Avoid:

```text
AI magic
Growth score
Fraud hunter
Awesome
Woohoo
```

---

# 114. SIH-FIRST VISUAL PRIORITY

The design must help a judge understand the product quickly.

The recommended visual priority is:

```text
High Risk KPI
      ↓
Risk Map
      ↓
Flagged Projects
      ↓
Project Risk Score
      ↓
AI Reasons
      ↓
Evidence
      ↓
Action
      ↓
Compliance
```

This is more valuable than adding 20 extra charts.

---

# 115. NOISE CONTROL

Do not show every possible dataset field everywhere.

Use:

### Dashboard

Only decision-useful information.

### Project directory

Scanning information.

### Project details

Full investigation information.

This creates hierarchy.

---

# 116. DASHBOARD DENSITY

Target approximately:

```text
20%
KPIs

30%
Charts / Map

35%
Projects / AI findings

15%
Margins / context
```

Do not treat the ratios as mathematical requirements; they represent visual intent.

---

# 117. PAGE HEADER COMPONENT

Create reusable:

```jsx
<PageHeader
  title="Project Monitoring"
  subtitle="Search and analyze MPLADS works"
  actions={<... />}
/>
```

This keeps pages consistent.

---

# 118. SECTION HEADER COMPONENT

Use:

```jsx
<SectionHeader
  title="AI Flagged Projects"
  subtitle="Highest-risk projects requiring attention"
  action={<ViewAll />}
/>
```

---

# 119. COMMON SPACING SYSTEM

Use consistent spacing:

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
```

Do not invent random 17px/23px/37px values unless needed.

---

# 120. COMMON BORDER RADIUS

Use:

```text
Cards:
14px

Buttons:
10px

Inputs:
10px

Badge:
9999px / pill

Modals:
16px
```

---

# 121. ICON SIZING

General:

```text
small:
16px

normal:
18px

large:
20–24px

dashboard feature:
24–28px
```

Do not place huge icons everywhere.

---

# 122. SHADOW SYSTEM

Use subtle shadows.

Default card:

```text
0 2px 10px rgba(...)
```

Hover:

```text
0 8px 24px rgba(...)
```

Avoid heavy black shadows.

---

# 123. RISK VISUAL RULE

Red is reserved for urgency.

Do not:

- make the entire high-risk card red;
- make every warning background red;
- color all chart data red.

Use:

```text
red accent
+
red badge
+
small red icon
```

This makes real alerts stand out.

---

# 124. MAP COLOR RULE

Map colors should remain semantic.

```text
Low:
green

Medium:
amber

High:
red
```

Unselected states should remain neutral enough that selected states are obvious.

---

# 125. CHART COLOR CONSISTENCY

Use the same semantic mapping everywhere.

```text
High → red
Medium → amber
Low → green
```

Do not change meaning from page to page.

---

# 126. ROLE OF AI

The AI must appear as a supporting intelligence layer, not a decorative label.

Good:

```text
AI Risk Score
AI Findings
AI Predictions
AI Flag
```

Better:

```text
AI Risk Score
+
Evidence
+
Human-readable explanation
+
Recommended action
```

The second is the desired approach.

---

# 127. BACKEND INDEPENDENCE

The frontend should work completely without backend initially.

Use mock service data.

The API layer must be replaceable.

This allows:

```text
Frontend complete
+
Backend in progress
```

without blocking the UI.

---

# 128. NO HARD-DEPENDENCY ON ML

If the real Python service is not available:

```text
use realistic mock AI responses
```

The UI must still function.

When the Python service becomes available:

```text
replace mock responses
```

No visual redesign should be needed.

---

# 129. AI RESPONSE SHAPE

Prepare for:

```javascript
{
  overallScore: 82,
  riskCategory: "High",

  costOverrunProbability: 65,
  timeDelayProbability: 78,
  anomalyScore: 82,

  predictedFinalCost: 2360000,

  predictedCompletionDate: "2026-08-30",

  estimatedDelayMonths: 4,

  flagReasons: [...],

  recommendedAction: "..."
}
```

---

# 130. FRONTEND ERROR BOUNDARIES

Use an application-level error boundary where practical.

If one chart fails:

```text
the dashboard should still render
```

A single visualization should not crash the application.

---

# 131. DEMO RELIABILITY

Before delivery, test the exact sequence:

```text
login
→ dashboard
→ map
→ filtered projects
→ project detail
→ action modal
→ status change
→ compliance
```

Do this several times.

The demo should not depend on refreshing the browser or manually editing local data.

---

# 132. URL ROUTING FOR DRILL-DOWN

Recommended:

```text
/projects?state=Madhya%20Pradesh

/projects?state=Madhya%20Pradesh&district=Sehore

/projects/MP-2024-1001
```

This makes navigation reproducible.

---

# 133. PROJECT DETAIL TABS

Optional tabs:

```text
Overview
Transactions
Evidence
History
```

However, do NOT hide the main risk explanation behind tabs.

The key AI information must be visible immediately.

---

# 134. FIXED ACTION BAR

On long project detail pages, consider a sticky bottom action bar:

```text
┌─────────────────────────────────────────────────────────────┐
│ Recommended Action    Request Audit   Halt   Mark Resolved │
└─────────────────────────────────────────────────────────────┘
```

This can improve the investigation workflow.

Use carefully so it does not block content.

---

# 135. DOCUMENT VIEWER

Prototype modal:

```text
Document Preview

Project Sanction Order
Payment Record
Progress Report
Inspection Record

[ Close ]
```

Synthetic files can be placeholders.

---

# 136. GEO-TAGGED PHOTO VIEWER

Use a simple gallery:

```text
Site Image 1
Site Image 2
Site Image 3
```

Optional metadata:

```text
Location
Capture date
Project ID
```

---

# 137. PROJECT HISTORY

Timeline:

```text
Sanctioned
   ↓
Fund Released
   ↓
Work Started
   ↓
Progress Report
   ↓
AI Flag
   ↓
Officer Review
```

This creates a story of the project lifecycle.

---

# 138. REPORTING LANGUAGE

Instead of:

```text
Project is fraudulent
```

use:

```text
Project requires investigation
```

Instead of:

```text
AI proved vendor fraud
```

use:

```text
AI detected an unusual vendor payment pattern
```

---

# 139. SYNTHETIC DATA LABELING

Because the prototype may use generated/demo data, consider a small low-visual-weight label:

```text
Prototype environment
Synthetic monitoring data
```

Do not put giant "FAKE DATA" labels across every card.

One contextual indicator in the interface/footer is enough.

---

# 140. FOOTER

Optional application footer:

```text
MPLADS AI Monitoring System
Prototype Environment
```

Do not make the footer compete with the application.

---

# 141. DASHBOARD RESPONSIVE LAYOUT

### >1280px

```text
5 KPI cards
2 charts
full map
table + insight panel
```

### 1024–1279px

```text
3 + 2 KPI
2 charts
map
table
insights below table
```

### 768–1023px

```text
2 KPI columns
charts stacked
map
table
```

### <768px

```text
1 KPI column
charts stacked
map reduced
cards stacked
table horizontally scrollable
```

---

# 142. PROJECT DETAIL RESPONSIVE LAYOUT

Desktop:

```text
KPI row
↓
Progress comparison
↓
3-column AI analysis
↓
Predictions
↓
Transactions
↓
Evidence
↓
Action
```

Mobile:

```text
Header
↓
KPI cards
↓
Progress comparison
↓
Risk Score
↓
Why Flagged
↓
Predictions
↓
Transactions
↓
Evidence
↓
Actions
```

---

# 143. VISUAL HIERARCHY OF PROJECT DETAIL

The strongest visual element should be:

```text
Risk Score
```

Second:

```text
Financial vs Physical mismatch
```

Third:

```text
Why flagged
```

Fourth:

```text
Evidence
```

Fifth:

```text
Action
```

---

# 144. PROJECT DETAIL "ABOVE THE FOLD"

At 1440 × 900, the user should ideally see:

```text
Project header
Project KPIs
Financial / Physical Progress
Risk Score
At least 2 AI reasons
```

Do not push the core insight 1,500px down the page.

---

# 145. PROJECT DIRECTORY "ABOVE THE FOLD"

The user should see:

```text
Page title
Filter bar
Project list
```

without unnecessary hero sections.

---

# 146. DASHBOARD "ABOVE THE FOLD"

The user should see:

```text
Page title
KPI cards
start of charts
High Risk KPI
```

The initial viewport should establish risk immediately.

---

# 147. PAGE BACKGROUND

Do not use pure white for the entire application.

Use:

```text
#F4F7F6
```

or:

```text
#F8FAFC
```

Then white cards appear naturally.

---

# 148. VISUAL DEPTH

Use:

```text
off-white background
+
white surface
+
border
+
subtle shadow
```

This is sufficient.

No need for complicated gradients.

---

# 149. TYPOGRAPHY HIERARCHY

Suggested:

```text
Page title:
28px / 700

Section:
18–20px / 600

Card title:
14–16px / 600

KPI:
32–40px / 700

Body:
14–16px

Metadata:
12–13px
```

---

# 150. INFORMATION HIERARCHY

High importance:

```text
Risk
Status
Project name
Amount
Physical progress
```

Medium:

```text
Date
Agency
MP
Category
```

Low:

```text
Timestamp
Supporting metadata
```

---

# 151. SIH PRESENTATION PRINCIPLE

The judges should not have to ask:

> "Where is the AI?"

It should be visually obvious.

Visible AI elements:

```text
AI Risk Score
AI Findings
AI Predictions
AI Alerts
AI Insights
```

But AI must be connected to actual data evidence.

---

# 152. SIH PRESENTATION PRINCIPLE 2

The judges should not have to ask:

> "What happens after detection?"

The action toolbar should answer:

```text
Request Audit
Halt Vendor Payment
Mark Resolved
```

And the compliance page should prove the result.

---

# 153. SIH PRESENTATION PRINCIPLE 3

The judges should not have to ask:

> "Why should an officer trust the AI?"

Because the UI shows:

```text
Score
+
Reason
+
Evidence
+
Prediction
```

This is explainability.

---

# 154. NO FAKE MODEL PERFORMANCE

Do not display:

```text
97.8% accuracy
99.2% fraud detection
98% confidence
```

unless real evaluation data exists.

If no true metric exists, omit it.

The frontend should show model outputs, not invented performance claims.

---

# 155. OPTIONAL MODEL INFO PANEL

If useful:

```text
How this risk score is generated
```

Provide simple explanation:

```text
Overall risk combines cost risk,
time risk, transaction anomalies and
financial-progress mismatch.
```

Do not turn this into a machine-learning textbook.

---

# 156. FUTURE AI ARCHITECTURE AWARENESS

The broader project architecture expects:

```text
React
 ↓
Node / Express
 ↓
MongoDB
 ↓
Python / FastAPI
```

Potential AI components:

```text
Cost / Time prediction
Random Forest or XGBoost

Anomaly detection
Isolation Forest
```

The frontend does NOT implement these models.

It renders their output.

---

# 157. DATA SOURCE AWARENESS

The project material proposes a synthetic/mock data strategy for the prototype because real government fraud data is not available for the demo environment.

Therefore:

- make data realistic;
- make anomaly cases obvious enough for demo;
- do not claim the values are official;
- keep the architecture ready for real API data later.

---

# 158. CORE ANOMALY SCENARIOS TO REPRESENT

The UI should support at least:

### Financial-progress mismatch

```text
Expenditure: 85%
Physical progress: 40%
```

### Cost overrun

```text
Predicted cost > sanctioned cost
```

### Time overrun

```text
Predicted completion > expected completion
```

### Vendor anomaly

```text
Repeated similar payments
```

### Duplicate/similar project

```text
Similar project pattern
```

---

# 159. AI INSIGHT GENERATION STRUCTURE

For each project, model results can be transformed into:

```text
Risk category
↓
Reasons
↓
Evidence
↓
Predictions
↓
Recommended action
```

The frontend should display exactly this hierarchy.

---

# 160. IMPLEMENTATION PHASES

## Phase 1 — Foundation

Build:

```text
Vite
Tailwind
Router
Design tokens
AppShell
Sidebar
Header
```

Do not build pages yet.

Verify shell.

---

## Phase 2 — Login

Build:

```text
Login
Mock Auth
Protected Routes
Role Context
```

---

## Phase 3 — Dashboard

Build:

```text
KPI
Risk Trend
Fund Chart
Map
Flagged Projects
AI Insights
```

This should become the first milestone.

---

## Phase 4 — Projects

Build:

```text
Filters
Search
Table
Grid
Risk badges
Pagination
```

---

## Phase 5 — Project Detail

Build:

```text
Project header
KPIs
Progress comparison
Risk score
AI findings
Predictions
Transactions
Evidence
Recommended action
```

---

## Phase 6 — Workflow

Build:

```text
Request Audit
Halt Payment
Mark Resolved
Status changes
Toast
Audit events
```

---

## Phase 7 — Risk & Alerts

Build:

```text
Alert queue
Filters
Investigation navigation
```

---

## Phase 8 — GIS

Build:

```text
Interactive map
State filtering
District context
```

---

## Phase 9 — Compliance

Build:

```text
Audit timeline
Filters
Action history
```

---

## Phase 10 — Secondary Pages

Build:

```text
Funds
Analytics
Reports
Users
Settings
```

---

## Phase 11 — Polish

Implement:

```text
responsive
loading
empty
error
accessibility
animations
spacing
typography
performance
```

---

# 161. MILESTONE 1 ACCEPTANCE

After Phase 1, the developer should be able to navigate:

```text
/login
/dashboard
/projects
/projects/:id
```

and see the same shell.

---

# 162. MILESTONE 2 ACCEPTANCE

Dashboard must have:

```text
5 KPIs
2 charts
map
flagged project table
AI insight panel
```

---

# 163. MILESTONE 3 ACCEPTANCE

Project page must display:

```text
Risk
Financial vs Physical
Reasons
Predictions
Transactions
Actions
```

---

# 164. MILESTONE 4 ACCEPTANCE

Action workflow must change state:

```text
Delayed
→ Under Review
```

and show audit record.

---

# 165. DEFINITION OF DONE

The frontend is not complete until:

```text
[ ] Login works
[ ] Protected routes work
[ ] Sidebar works
[ ] Header works
[ ] Search works
[ ] Date filter UI works
[ ] Notifications work
[ ] Dashboard works
[ ] KPI cards work
[ ] Risk chart works
[ ] Fund chart works
[ ] Map works
[ ] Map click drills down
[ ] Flagged table works
[ ] AI insights appear
[ ] Projects page works
[ ] Filters work
[ ] Search works
[ ] Grid/table toggle works
[ ] Project detail works
[ ] Risk score works
[ ] AI reasons work
[ ] Predictions work
[ ] Transaction evidence works
[ ] Request Audit works
[ ] Halt Payment works
[ ] Mark Resolved works
[ ] Status updates work
[ ] Toast works
[ ] Compliance updates work
[ ] Risk alerts work
[ ] GIS works
[ ] Reports page exists
[ ] Fund utilization page exists
[ ] Analytics page exists
[ ] Users page exists
[ ] Settings page exists
[ ] Loading states exist
[ ] Empty states exist
[ ] Error states exist
[ ] Responsive design works
[ ] Accessibility basics work
[ ] Demo flow works without code edits
```

---

# 166. FINAL VISUAL ACCEPTANCE TEST

The final UI should look like:

> **An official Government of India monitoring system modernized with AI-powered analytics.**

It must feel:

```text
credible
professional
dense
clear
intelligent
action-oriented
original
```

It must NOT feel:

```text
generic
template-like
gaming-like
crypto-like
overdesigned
copied
```

---

# 167. FINAL UX ACCEPTANCE TEST

A judge with no prior knowledge of the project should be able to infer:

```text
This monitors MPLADS.
        ↓
This finds risky projects.
        ↓
This explains why they are risky.
        ↓
This shows supporting evidence.
        ↓
An officer can take action.
        ↓
The system records that action.
```

If the UI cannot communicate these points, redesign the visual hierarchy before adding more features.

---

# 168. THE SINGLE MOST IMPORTANT SCREEN

If development time becomes limited:

Build these perfectly:

```text
1. Dashboard
2. Project Detail
3. Action Workflow
4. Compliance
```

A polished four-screen core workflow is much better than twelve unfinished pages.

---

# 169. THE SINGLE MOST IMPORTANT INTERACTION

The following interaction must feel seamless:

```text
Dashboard
    ↓
Madhya Pradesh
    ↓
Sehore
    ↓
Road Construction – Sehore
    ↓
82 / 100 HIGH RISK
    ↓
85% expenditure vs 40% physical progress
    ↓
AI explanation
    ↓
transaction anomaly
    ↓
Request Audit
    ↓
Under Review
    ↓
Compliance Entry
```

This is the heart of the prototype.

---

# 170. FINAL AI CODING AGENT INSTRUCTION

You are not being asked to produce a concept-only UI.

You are being asked to **implement the frontend prototype**.

Therefore:

1. Set up the project.
2. Create the routing.
3. Create the application shell.
4. Create the design tokens.
5. Create reusable components.
6. Create realistic mock data.
7. Create mock services.
8. Build the dashboard.
9. Build the project directory.
10. Build the project investigation page.
11. Build risk alerts.
12. Build GIS.
13. Build fund utilization.
14. Build analytics.
15. Build compliance.
16. Build reports/users/settings.
17. Implement action workflows.
18. Implement status transitions.
19. Implement responsive behavior.
20. Implement loading/error/empty states.
21. Test the complete SIH demo flow.
22. Keep the implementation clean and backend-ready.

Do not stop at a wireframe.

Do not only output HTML.

Do not only output screenshots.

Do not produce pseudo-code instead of implementation.

Create the actual React application.

---

# 171. AI CODING AGENT DEVELOPMENT BEHAVIOR

When implementing:

### First

Create the project skeleton and verify it runs.

### Second

Build the shell and design system.

### Third

Build dashboard and project detail.

### Fourth

Build state-changing workflows.

### Fifth

Build secondary pages.

### Sixth

Polish and test.

Do not jump randomly between files.

---

# 172. WHEN SOMETHING IS AMBIGUOUS

Follow this priority:

```text
1. Product objective
2. Officer workflow
3. SIH demo workflow
4. Design system
5. Component architecture
6. Visual polish
```

If two UI decisions conflict, prefer the one that makes investigation and officer action easier.

---

# 173. WHEN IMPLEMENTATION TIME IS LIMITED

Prioritize:

```text
Dashboard
Project Details
AI Explainability
Action Workflow
Compliance
```

Then:

```text
Risk Alerts
GIS
Funds
Analytics
Reports
Users
Settings
```

Do not spend the majority of time polishing Settings while Project Details looks unfinished.

---

# 174. FINAL COMPONENT MAP

```text
APP
│
├── AppShell
│   ├── Sidebar
│   └── TopHeader
│
├── Dashboard
│   ├── PageHeader
│   ├── StatCard × 5
│   ├── RiskTrendChart
│   ├── FundAllocationChart
│   ├── GeographicRiskMap
│   ├── FlaggedProjectsTable
│   └── AIInsightsPanel
│
├── Projects
│   ├── PageHeader
│   ├── ProjectFilters
│   ├── ProjectTable
│   └── ProjectGrid
│
├── ProjectDetails
│   ├── ProjectHeader
│   ├── ProjectMetrics
│   ├── FinancialPhysicalComparison
│   ├── RiskScoreRing
│   ├── AIReasonList
│   ├── PredictionCards
│   ├── TransactionsTable
│   ├── EvidencePanel
│   ├── RecommendedAction
│   ├── ActionToolbar
│   └── ActionModals
│
├── RiskAlerts
│   ├── RiskFilters
│   ├── RiskSummary
│   └── AlertsList
│
├── GIS
│   ├── IndiaMap
│   ├── MapLegend
│   └── MapSidePanel
│
├── Analytics
│   └── Charts
│
├── Compliance
│   └── AuditTimeline
│
└── Secondary
    ├── FundUtilization
    ├── Reports
    ├── Users
    └── Settings
```

---

# 175. FINAL PRODUCT DESCRIPTION FOR THE DEVELOPER

Build an **original Government-style MPLADS AI Monitoring System** with a persistent dark-navy navigation shell, soft off-white workspace, white analytical cards, restrained government accenting, semantic risk colors, high-density data tables, modern charts, an interactive geographic risk map and a deeply detailed project investigation interface.

The dashboard must immediately communicate:

```text
How much money?
How many projects?
How much is being used?
Where is the risk?
Which projects are risky?
```

The project detail page must communicate:

```text
What is the risk?
Why did AI flag it?
What does the model predict?
What evidence exists?
What should the officer do?
```

The action workflow must communicate:

```text
The officer can act.
```

The compliance page must communicate:

```text
The action is recorded.
```

The entire system must communicate:

> **AI does not merely detect. It helps officers investigate and act.**

---

# 176. FINAL BUILD COMMAND

**Build the complete frontend according to this document.**

The implementation should be visually polished enough for an SIH demonstration, structurally clean enough for a real development team, and architecturally ready to replace mock services with the existing Node.js/Express/MongoDB/Python AI backend.

The core narrative must remain:

```text
MONITOR
   ↓
DETECT
   ↓
EXPLAIN
   ↓
INVESTIGATE
   ↓
ACT
   ↓
AUDIT
```

That is the product.

That is the frontend architecture.

That is the SIH demonstration story.

