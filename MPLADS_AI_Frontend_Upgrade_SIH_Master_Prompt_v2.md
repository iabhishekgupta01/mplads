# MPLADS AI MONITORING SYSTEM
## SIH 26102 — MASTER FRONTEND UPGRADE & IMPLEMENTATION PROMPT

## PURPOSE

You are a senior product designer, React architect, frontend engineer and UX engineer.

You are modifying an ALREADY IMPLEMENTED frontend for:

**MPLADS AI Monitoring System**
**SIH Problem Statement ID: 26102**
**Problem Statement:** Development of an AI-powered system to detect anomalies, fraud, and inefficiencies in MPLAD Scheme implementation.

Existing deployed website:
https://mplads-bay.vercel.app/

Treat the existing codebase as the starting point. First inspect it, then improve it. Do not blindly rebuild everything.

The current implementation is not sufficiently impressive or sufficiently aligned with the complete SIH product story. Redesign and refactor it so that it becomes:

- professional;
- original;
- government-grade;
- modern;
- smooth;
- readable;
- information-rich;
- explainable;
- action-oriented;
- SIH-ready.

The final product must NOT look obviously AI-generated.

---

# 1. CORE PRODUCT UNDERSTANDING

This is NOT just an MPLADS statistics dashboard.

It is an:

> **AI-assisted monitoring, risk investigation and officer-action platform for MPLADS implementation.**

The core product cycle is:

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

The frontend must visually and functionally support this complete journey.

The officer should be able to:

1. understand overall implementation status;
2. see financial and project KPIs;
3. identify high-risk states/districts;
4. identify priority projects;
5. open a project;
6. understand why AI flagged it;
7. see financial/physical evidence;
8. inspect suspicious transaction patterns;
9. see predictions;
10. request audit / inspection;
11. halt a vendor payment workflow when appropriate;
12. mark a project resolved / false positive;
13. see the resulting status update;
14. see the action in a compliance trail.

---

# 2. SIH-ORIENTED DESIGN OBJECTIVE

The interface must support the qualities commonly emphasized in SIH evaluation:

- novelty;
- complexity;
- clarity;
- feasibility;
- practicability;
- sustainability;
- scale of impact;
- user experience;
- future progression.

The UI should make those qualities visible.

## Novelty

Do not represent AI with a generic glowing “AI” label.

Instead show meaningful intelligence:

- multi-signal risk;
- explainable findings;
- anomaly evidence;
- cost prediction;
- time-delay prediction;
- transaction patterns;
- project similarity;
- geographic risk concentration;
- recommended actions.

## Complexity

Show a connected workflow:

```text
India
→ State
→ District
→ Project
→ Financial data
→ Physical progress
→ Transactions
→ AI analysis
→ Risk
→ Action
→ Compliance
```

## Clarity

The judge should understand the product quickly.

## Feasibility

The frontend should clearly fit the intended architecture:

```text
React
  ↓
Node.js / Express
  ↓
MongoDB
  ↓
Python / FastAPI AI service
```

## Practicability

An officer must be able to take action.

## Sustainability

Components and service layers must be reusable and backend-ready.

## Scale

The interface must look capable of handling national/state/district/project data.

## User Experience

The user must naturally move from macro view to project investigation.

---

# 3. IMPORTANT REFERENCE WEBSITES

Use these only for design/information-architecture inspiration.

Do NOT clone them.

## Digital India

https://www.digitalindia.gov.in/

Use as inspiration for:

- national digital identity;
- strong institutional branding;
- structured categories;
- clear information architecture;
- government digital-service feel;
- public-sector technology presentation.

## MyGov

https://www.mygov.in/

Use as inspiration for:

- formal government identity;
- state-level organization;
- structured content;
- accessibility controls;
- search;
- clear categories;
- civic/public-service experience.

## myScheme — especially important for the landing page

https://www.myscheme.gov.in/

Use as inspiration for:

- clean government-service hero;
- one-stop platform framing;
- discovery-oriented layout;
- “How it works” flow;
- clear categories;
- FAQ;
- useful links;
- simple user journey.

myScheme currently presents a discovery-oriented homepage with a “Find Schemes For You” feature and a clear three-step pattern of entering details, searching, and selecting/applying. Adapt the INFORMATION-ARCHITECTURE principle to this project:

```text
MONITOR
→
DETECT
→
INVESTIGATE
→
ACT
```

Do not copy the actual layout or branding.

---

# 4. IMPORTANT: REMOVE COMMON AI-GENERATED DESIGN PATTERNS

The redesigned website must intentionally avoid the visual style commonly produced by generic AI website generators.

Do NOT overuse:

- huge rounded cards;
- 24–32px radius everywhere;
- glassmorphism;
- glowing borders;
- purple/blue AI gradients;
- neon colors;
- excessive radial gradients;
- giant “AI” graphics;
- random floating blobs;
- floating abstract 3D shapes;
- excessive shadows;
- giant circular gauges;
- pill-shaped UI everywhere;
- cards containing cards containing cards;
- hover-scale on every element;
- excessive motion;
- generic dashboard templates;
- meaningless micro-charts;
- fake statistics;
- oversized headings;
- unreadably small metadata.

The design should feel intentionally designed by a professional public-sector product team.

Primary principle:

> **Precision over decoration.**

Secondary principle:

> **Information hierarchy over visual gimmicks.**

---

# 5. OVERALL VISUAL DIRECTION

Target:

```text
Government Digital Service
+
Enterprise Monitoring Command Center
+
Explainable AI
+
Civic Technology
```

The aesthetic should be:

- calm;
- serious;
- credible;
- clean;
- modern;
- spacious where appropriate;
- dense where necessary;
- readable;
- original.

Avoid making the interface either:

- old-fashioned government portal, OR
- flashy startup dashboard.

The correct middle ground is:

> **Modern government technology.**

---

# 6. TWO EXPERIENCES ARE REQUIRED

The website must have TWO visually related but functionally different areas.

## A. Public landing page

Route:

```text
/
```

Purpose:

- explain the system;
- explain the problem;
- communicate the AI-assisted solution;
- show how it works;
- show capabilities;
- show impact;
- direct users into the monitoring portal.

## B. Authenticated officer portal

Routes:

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

The public site should feel editorial and institutional.

The authenticated portal should feel operational and information-dense.

---

# 7. LANDING PAGE — REQUIRED NEW FEATURE

Create a complete landing page.

This is not optional.

It should be polished enough that a judge who opens the root URL immediately understands the concept.

---

# 8. LANDING PAGE NAVIGATION

Use a professional government-style public header.

Suggested structure:

```text
┌───────────────────────────────────────────────────────────────┐
│ GOVT OF INDIA / EMBLEM     MPLADS AI MONITORING SYSTEM        │
│                                                               │
│ Overview   Capabilities   How It Works   AI   About   FAQ     │
│                                           [ Access Portal ]   │
└───────────────────────────────────────────────────────────────┘
```

Do not create a huge glass/sticky SaaS navbar.

Use a thin utility layer if helpful:

```text
Government of India
|
Accessibility
|
English / हिन्दी
```

Do not fake multilingual functionality unless implemented.

---

# 9. LANDING HERO

Hero must immediately communicate:

> AI-assisted monitoring for transparent, proactive and accountable development.

Recommended content:

```text
MPLADS AI Monitoring System

Monitor What Matters.
Investigate What Stands Out.
Act Where Risk Emerges.

AI-assisted monitoring for project execution,
financial utilization, anomaly detection and
officer-led action.

[ Access Monitoring Portal ]
[ Explore How It Works ]
```

Right side:

A custom dashboard preview showing:

```text
427 High Risk Projects
73.3% Fund Utilization
58 High Risk in Madhya Pradesh

small risk trend
small India map
priority alert
```

The preview must be integrated into the layout, not simply a screenshot pasted in.

---

# 10. HERO BACKGROUND — MAJOR PRIORITY

The background must be significantly improved.

Do NOT use a generic plain background.

Do NOT use a strong blue-purple gradient.

Create a subtle civic-data background.

Recommended:

- off-white base;
- faint geographic contour lines;
- faint India map geometry;
- subtle grid;
- thin gold/saffron accents;
- extremely low-opacity navy data points.

Target opacity:

```text
0.03–0.07
```

Decorative elements should remain behind the content.

Concept:

```text
          faint geographic lines
       ───────────────────────────
             INDIA SHAPE
           •     •      •
       ────────────────
              HERO
```

No neon glow.

No futuristic AI network.

No floating 3D balls.

---

# 11. HERO TYPOGRAPHY

Desktop:

```text
Hero H1:
44–56px

Hero supporting copy:
18–21px

CTA:
14–16px
```

Do not use 80–100px text.

Readable is more important than dramatic.

---

# 12. LANDING TRUST STRIP

Immediately below hero:

```text
AI-Assisted Monitoring
Project Risk Intelligence
Financial Visibility
Action Traceability
```

This can be a thin horizontal section rather than four identical cards.

Use subtle separators.

---

# 13. LANDING PROBLEM SECTION

Title:

```text
The Monitoring Challenge
```

Use editorial composition rather than four identical cards.

Problems:

### Fragmented information

Financial, execution and project signals can be difficult to interpret together.

### Delayed detection

Risk may become visible only after a project has significantly diverged from expected execution.

### Limited explainability

A risk number alone does not explain what requires attention.

### Action gap

Detection becomes more useful when an officer can initiate the next step and record it.

Layout:

```text
large statement
+
supporting text
+
small metric/diagram
```

Do not use four identical colored cards.

---

# 14. LANDING SOLUTION WORKFLOW

Title:

```text
From Monitoring Data to Action
```

Display:

```text
01 MONITOR
Projects • Funds • Progress

        ↓

02 DETECT
AI risk signals

        ↓

03 INVESTIGATE
Evidence • Explanation • Prediction

        ↓

04 ACT
Audit • Review • Resolution

        ↓

05 AUDIT
Traceable officer action
```

Horizontal on desktop.

Vertical timeline on mobile.

This should be one of the strongest sections.

---

# 15. LANDING AI CAPABILITIES

Create a visually sophisticated section.

Capabilities:

```text
Cost Risk Prediction
Time Delay Prediction
Transaction Anomaly Detection
Explainable Risk Scoring
Geographic Risk Intelligence
Project Similarity Detection
```

Do NOT make six identical feature cards.

Instead use:

```text
large capability
+
description
+
mini visual
```

Alternate layout:

```text
Visual | Content
Content | Visual
Visual | Content
```

This feels more human-designed.

---

# 16. LANDING EXPLAINABLE AI PREVIEW

Show a realistic project-analysis preview:

```text
Road Construction – Sehore

82 / 100
HIGH RISK

Why is this project flagged?

85% expenditure
vs
40% physical progress

4-month delay detected

Abnormal payment pattern

Possible nearby similar project

Recommended:
Field verification
```

This tells the judge exactly what the product does.

---

# 17. LANDING "FOR WHOM"

Show user roles:

```text
Ministry Officials
National and cross-state visibility

State Nodal Officers
State and district monitoring

District Authorities
Local investigation and action

Field Officers
Assigned inspections and evidence
```

Avoid pricing-card styling.

---

# 18. LANDING SCALE SECTION

Use:

```text
From Project-Level Signals
to National Monitoring Intelligence
```

Visual hierarchy:

```text
PROJECT
   ↓
DISTRICT
   ↓
STATE
   ↓
NATIONAL
```

Supporting copy:

```text
Designed for progressive drill-down
without losing context.
```

---

# 19. LANDING SYSTEM ARCHITECTURE

Optional but recommended.

Show:

```text
Monitoring Data
      ↓
API / Data Layer
      ↓
AI Risk Engine
      ↓
Risk + Predictions
      ↓
Officer Dashboard
      ↓
Action
      ↓
Compliance
```

This supports SIH feasibility.

Do not turn this into a software-engineering diagram with tiny labels.

---

# 20. LANDING FAQ

Questions:

```text
What is the MPLADS AI Monitoring System?

How does AI identify project risk?

What kinds of anomalies can be detected?

Does the AI confirm fraud?

What evidence is shown to officers?

Can officers take action from the platform?

How are actions recorded?

Can the platform integrate with existing systems?

Can the architecture scale from district to national monitoring?
```

The answer to “Does AI confirm fraud?” should clearly state:

```text
No. The system produces risk signals and anomaly
indications to prioritize projects for human
verification and investigation.
```

---

# 21. LANDING ACCESSIBILITY

Include an accessibility control influenced by public-sector patterns.

Possible controls:

```text
Text Size +
Text Size -
High Contrast
Highlight Links
Reset
```

Also implement:

- visible keyboard focus;
- semantic navigation;
- skip-to-content;
- accessible buttons;
- form labels.

---

# 22. LANDING FOOTER

Professional structure:

```text
MPLADS AI Monitoring System

Platform
Capabilities
How It Works
Portal

Accessibility
Privacy
Terms
Contact

Prototype / Demonstration Environment
```

Do not falsely claim official ownership or certification.

---

# 23. AUTHENTICATED PORTAL VISUAL DIRECTION

After login, the design becomes more operational.

Use:

```text
Dark navy navigation
+
soft neutral background
+
white analytical surfaces
+
semantic risk colors
+
dense but readable data
```

Do not carry landing-page animations into the dashboard.

---

# 24. APPLICATION SHELL

Use:

```text
┌─────────────────────────────────────────────────────────┐
│ SIDEBAR │ TOP HEADER                                    │
│         ├───────────────────────────────────────────────┤
│         │                                               │
│         │              PAGE CONTENT                     │
│         │                                               │
└─────────┴───────────────────────────────────────────────┘
```

Desktop:

```text
Sidebar: ~260–264px
Header: ~68–72px
```

---

# 25. SIDEBAR

Top:

```text
GOVERNMENT OF INDIA

MPLADS AI
MONITORING SYSTEM

Ministry of Statistics &
Programme Implementation
```

Navigation:

```text
Dashboard

Project Monitoring

AI Analysis
  Risk & Alerts
  Fund Utilization
  Project Database

GIS Intelligence

Reports

Compliance

Administration
  User Management
  Settings
```

Bottom:

```text
Transparent Development,
Stronger India
```

Use subtle styling.

---

# 26. SIDEBAR DESIGN

Avoid:

- oversized logo;
- glowing active item;
- huge rounded pills;
- excessive nested cards.

Use:

- thin active border;
- light active background;
- readable icon;
- clear text;
- compact spacing.

---

# 27. TOP HEADER

Required:

```text
Breadcrumb / Context

Search projects, districts, MPs...

Date Range

Live Data ●

Notifications

Officer Profile
```

Example:

```text
MPLADS Monitoring / Dashboard

[ Search projects, districts, MPs... ]

Jan 2026 – Sep 2026

● Live Data

🔔

State Nodal Officer
Madhya Pradesh
```

---

# 28. GLOBAL SEARCH

Search:

```text
Project ID
Project Name
District
State
MP
```

Result grouping:

```text
Projects
Districts
States
```

Example:

```text
Sehore

PROJECT
Road Construction – Sehore
MP-2024-1001

DISTRICT
Sehore
Madhya Pradesh
```

Clicking a project opens the detail page.

---

# 29. NOTIFICATIONS

Use a compact popover.

Example:

```text
AI Risk Alert

Road Construction – Sehore
Risk increased to 82

2 min ago
```

Another:

```text
Payment anomaly detected

Indore
High severity

15 min ago
```

Do not use huge notification cards.

---

# 30. DASHBOARD — MAJOR REDESIGN

The dashboard should look like a **monitoring command center**, not a collection of cards.

Do NOT use:

```text
5 cards
then 2 cards
then 3 cards
then 4 cards
```

without hierarchy.

---

# 31. RECOMMENDED DASHBOARD COMPOSITION

Use:

```text
┌──────────────────────────────────────────────────────────────┐
│ Page title + scope + date                                    │
├──────────────────────────────────────────────────────────────┤
│ KPI BAND                                                      │
├────────────────────────────────────────┬─────────────────────┤
│ Risk Trend                             │ Risk Overview       │
│                                        │                     │
├────────────────────────────────────────┴─────────────────────┤
│ Geographic Risk Intelligence                                │
│                                                             │
│                    INDIA MAP                                │
│                                     Selected State Summary   │
├────────────────────────────────────────┬────────────────────┤
│ Priority Projects                      │ AI Insights         │
│                                        │                     │
├────────────────────────────────────────┴────────────────────┤
│ What Needs Attention? + Recent Actions                      │
└──────────────────────────────────────────────────────────────┘
```

This hierarchy is deliberate.

---

# 32. DASHBOARD HEADER

Use:

```text
MPLADS Monitoring Overview

Monitor fund utilization, project execution
and AI-identified risk across your jurisdiction.
```

Context:

```text
State: Madhya Pradesh
Reporting Period: FY 2025–26
```

---

# 33. KPI BAND

Use five KPIs.

```text
Total Allocated Funds
₹5,892 Cr
+6.2%

Total Released Funds
₹4,320 Cr
+5.1%

Fund Utilization
73.3%
+4.8%

Total Projects
48,326
+12.4%

High Risk Projects
427
+18.6%
```

High-risk KPI gets subtle red treatment.

---

# 34. DASHBOARD RISK OVERVIEW

Add a compact distribution panel:

```text
Risk Overview

HIGH
427

MEDIUM
1,284

LOW
3,932
```

Then a stacked semantic distribution bar.

This makes risk distribution visible without another giant chart.

---

# 35. RISK TREND CHART

Title:

```text
Risk Trend
```

Subtitle:

```text
Project risk distribution — last 12 months
```

Lines:

```text
High
Medium
Low
```

Use semantic colors.

Keep chart clean.

No heavy grid.

No animation on every point.

---

# 36. FUND ALLOCATION / UTILIZATION

Chart:

```text
Fund Allocation vs Utilization
```

Compare:

```text
Uttar Pradesh
Maharashtra
Bihar
Madhya Pradesh
Rajasthan
```

Use grouped bars.

Tooltips show:

```text
Allocated:
₹...

Utilized:
₹...
```

---

# 37. GEOGRAPHIC RISK INTELLIGENCE

Do not isolate the map as decoration.

Title:

```text
Geographic Risk Intelligence
```

Subtitle:

```text
Risk concentration across monitored states
```

Map + side summary.

Hover:

```text
Madhya Pradesh

High Risk
58 projects

Average Risk
72

[ View Details ]
```

Click:

```text
/projects?state=Madhya%20Pradesh
```

---

# 38. "WHAT NEEDS ATTENTION?" PANEL

Create a direct operational panel:

```text
What Needs Attention?

04 Critical
08 Escalated
16 New Anomalies
12 Awaiting Inspection
```

Each item clickable.

This is better than another decorative card.

---

# 39. PRIORITY PROJECTS

Title:

```text
Priority Projects Requiring Attention
```

Columns:

```text
Risk
Project
Location
Key Finding
Status
Action
```

Example:

```text
HIGH 92

Construction of Community Hall
Indore, Madhya Pradesh

Suspicious billing pattern

Under Review

View →
```

---

# 40. AI INSIGHTS

Title:

```text
AI Insights
```

Show 3 meaningful insights maximum.

Example:

```text
High-risk activity is concentrated
in 7 monitored districts.

18 projects show significant
financial-progress mismatches.

Repeated vendor payment patterns
have been detected across multiple projects.
```

Use compact editorial layout.

---

# 41. RECENT ACTIONS

Add:

```text
Recent Monitoring Actions
```

Example:

```text
10:42 AM
Field Audit Requested
Road Construction – Sehore

09:50 AM
Project Escalated
Community Hall – Indore

Yesterday
Vendor Payment Held
Water Pipeline – Rewa
```

This visually connects detection to action.

---

# 42. PROJECT MONITORING PAGE

Purpose:

Operational project search and triage.

Header:

```text
Project Monitoring

Review project execution, financial progress
and AI risk signals.
```

---

# 43. PROJECT FILTER TOOLBAR

Use ONE compact horizontal toolbar.

```text
Search
State
District
MP
Category
Status
Risk
Date
```

Actions:

```text
Apply
Clear Filters
```

Do not put each filter in its own card.

---

# 44. PROJECT TABLE

Columns:

```text
Risk
Project
Location
Category
Sanctioned
Utilized
Physical
Status
Action
```

Example:

```text
HIGH 82

Road Construction – Sehore
MP-2024-1001

Sehore, Madhya Pradesh

Road

₹20 L

85%

40%

Delayed

View →
```

Use the project ID under project name rather than consuming an entire column.

---

# 45. TABLE / GRID VIEW

Provide:

```text
[ Table ] [ Grid ]
```

Default:

```text
Table
```

Grid should show project cards.

---

# 46. PROJECT CARD

Structure:

```text
HIGH RISK        82

Road Construction – Sehore
MP-2024-1001

Sehore • Madhya Pradesh
Road

Sanctioned       ₹20,00,000
Expenditure      85%

Physical Progress
████████░░ 40%

Status
Delayed

[ View Project ]
```

Use only one strong CTA.

---

# 47. PROJECT DETAIL — CORE SIH SCREEN

Treat this as an **investigation workspace**.

Not a generic detail page.

---

# 48. PROJECT DETAIL TOP

Breadcrumb:

```text
Project Monitoring
/
Madhya Pradesh
/
Sehore
```

Title:

```text
Road Construction – Sehore

HIGH RISK · 82/100
```

Metadata:

```text
Project ID: MP-2024-1001
Work Type: Road
Execution Agency: Sample Agency
```

Right:

```text
Request Audit
More Actions
```

Do not show six giant action buttons.

---

# 49. PROJECT KPI ROW

```text
Sanctioned
₹20,00,000

Released
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

---

# 50. FINANCIAL VS PHYSICAL COMPARISON

This should be visually prominent.

```text
Financial Progress
85%
█████████████████░░░

Physical Progress
40%
████████░░░░░░░░░░░

Financial–Physical Gap
45 percentage points
```

Interpretation:

```text
Financial execution is substantially ahead
of reported physical progress.
```

This is one of the most important anomaly signals.

---

# 51. AI RISK ANALYSIS

Layout:

```text
┌──────────────────────────────┬──────────────────────────────┐
│ Risk Score                   │ Why is this project flagged? │
│                              │                              │
│ 82 / 100                    │ Financial mismatch           │
│ HIGH RISK                    │ Time delay                  │
│                              │ Payment anomaly              │
│                              │ Similarity signal            │
└──────────────────────────────┴──────────────────────────────┘
```

Do not let the ring consume most of the page.

The reasons are more important than the graphic.

---

# 52. RISK SCORE

Use reusable:

```jsx
<RiskScore />
```

Display:

```text
82
/100
HIGH RISK
```

Small explanation:

```text
Composite indicator based on cost,
time, transaction and progress signals.
```

---

# 53. WHY FLAGGED SECTION

Use:

```text
Why is this project flagged?
```

Each finding:

```text
Financial-progress mismatch

85% expenditure vs 40% physical progress.

View evidence →
```

```text
Time delay

Approximately 4-month delay indicated.

View prediction →
```

```text
Payment anomaly

Repeated similar transactions detected
within a short time window.

View transactions →
```

```text
Similarity signal

Nearby project shows similar characteristics.

Similarity: 65%

View related projects →
```

This is better than generic bullets.

---

# 54. AI PREDICTIONS

Use three compact analytical modules:

```text
Cost Overrun Risk
65%
Estimated overrun: 18%

Delay Probability
78%
Estimated delay: 4 months

Anomaly Score
82
High
```

Each has one explanatory sentence.

---

# 55. COST PREDICTION

Show:

```text
Sanctioned Cost
₹20,00,000

Predicted Final Cost
₹23,60,000

Estimated Overrun
18%
```

Do not call it a confirmed future cost.

Use:

```text
Model prediction
```

---

# 56. TIME PREDICTION

Show:

```text
Original Expected Completion
June 2026

Predicted Completion
August 2026

Estimated Delay
4 Months
```

Use a simple timeline.

---

# 57. PAYMENT ANOMALY EVIDENCE

Title:

```text
Payment Anomaly Evidence
```

Banner:

```text
AI detected 3 similar payments
within 48 hours.
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

Highlight flagged rows subtly.

Do not make the entire table red.

---

# 58. RELATED PROJECT SIGNAL

Section:

```text
Related Project Signals
```

Example:

```text
Possible similar project

Community Road Improvement – Sehore

Similarity
65%

Shared signals:
• nearby location
• similar work category
• similar estimated cost

[ View Related Project ]
```

Use "possible similar" rather than "duplicate confirmed".

---

# 59. PROJECT HISTORY

Timeline:

```text
Sanctioned
   ↓
Funds Released
   ↓
Work Started
   ↓
Progress Update
   ↓
AI Flag
   ↓
Officer Review
   ↓
Current Status
```

This gives a chronological story.

---

# 60. EVIDENCE SECTION

Tabs:

```text
Documents
Site Photos
Transactions
History
```

Prototype may use placeholders.

Label synthetic/demo evidence appropriately.

---

# 61. RECOMMENDED ACTION

Bottom of investigation page:

```text
Recommended Action

Field verification recommended.

Check reported physical progress
and payment records before
further disbursement.
```

Use subtle amber information styling.

---

# 62. ACTION TOOLBAR

Use:

```text
[ Request Audit ]
[ Halt Vendor Payment ]
[ Mark Resolved ]
```

Optional via More Actions:

```text
Mark False Positive
Assign Inspection
```

Button hierarchy:

Primary:
Request Audit

Danger:
Halt Vendor Payment

Secondary:
Mark Resolved

---

# 63. REQUEST AUDIT MODAL

Title:

```text
Request Field Audit
```

Fields:

```text
Project
Road Construction – Sehore

Assign Officer
[ Select Officer ]

Priority
[ High ]

Reason
[ text area ]

Additional Instructions
[ text area ]
```

Buttons:

```text
Cancel
Submit Request
```

Submit behavior:

1. loading;
2. disable submit;
3. success;
4. modal closes;
5. project status changes;
6. toast appears;
7. audit event added.

Result:

```text
UNDER REVIEW
```

---

# 64. HALT VENDOR PAYMENT MODAL

Title:

```text
Halt Vendor Payment?
```

Message:

```text
This will place the associated
payment workflow on hold until review.
```

Reason:

```text
[ text area ]
```

Buttons:

```text
Cancel
Confirm Halt
```

Result:

```text
FUNDS HALTED
```

---

# 65. MARK RESOLVED MODAL

Fields:

```text
Resolution Notes
Supporting Reference
```

Result:

```text
RESOLVED
```

and audit event.

---

# 66. IMPORTANT STATE MODEL

Separate RISK from WORKFLOW STATUS.

Risk:

```text
Low
Medium
High
```

Workflow:

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

Valid combination:

```text
HIGH RISK
UNDER REVIEW
```

Do NOT reduce the AI risk score simply because an officer requested an audit.

---

# 67. RISK & ALERTS PAGE

Make this an investigation inbox.

Header:

```text
Risk & Alerts

Prioritize projects requiring investigation.
```

Summary:

```text
Critical
04

High
18

Medium
47

Under Review
12
```

---

# 68. ALERT ROW / CARD

Prefer compact rows over huge cards.

```text
HIGH 92

Financial-progress mismatch

Road Construction – Sehore
Sehore, Madhya Pradesh

Detected 12 min ago

[ Investigate ]
```

Another:

```text
HIGH 89

Payment anomaly

Community Hall – Indore

3 similar payments
within 48 hours

[ Investigate ]
```

---

# 69. FUND UTILIZATION PAGE

Structure:

```text
Fund Overview
↓
Allocation / Release / Utilization
↓
State Comparison
↓
Monthly Trend
↓
High Expenditure / Low Progress
```

Top metrics:

```text
Allocated
Released
Utilized
Remaining
```

---

# 70. HIGH EXPENDITURE / LOW PROGRESS TABLE

Columns:

```text
Project
District
Expenditure
Physical Progress
Gap
Risk
```

This is a direct bridge between financial monitoring and AI anomaly detection.

---

# 71. GIS INTELLIGENCE PAGE

Use:

```text
Geographic Risk Intelligence
```

Left:

```text
State
District
Risk
Category
```

Center:

```text
India map
```

Right:

```text
Selected Area
Madhya Pradesh

Projects
4,281

High Risk
58

Average Risk
72

Fund Utilization
74.2%

[ View Projects ]
```

Map click must drive navigation/filtering.

---

# 72. ANALYTICS PAGE

Group analytics instead of dumping random charts.

## Risk

- risk by state;
- risk by district;
- risk by category.

## Financial

- allocated;
- released;
- expenditure;
- utilization.

## Execution

- physical progress;
- delay;
- financial-progress gap.

## Anomaly

- vendor patterns;
- transaction anomalies;
- similarity patterns.

---

# 73. REPORTS PAGE

Header:

```text
Generate Monitoring Report
```

Controls:

```text
Report Type
State
District
Date Range
Risk Level
```

Buttons:

```text
Generate Report
Download PDF
Export CSV
```

Report preview:

```text
Executive Summary
Financial Health
Project Health
Risk Findings
AI Insights
Officer Actions
```

---

# 74. COMPLIANCE PAGE

Title:

```text
Compliance & Action Trail
```

Intro:

```text
Chronological record of system alerts
and officer actions.
```

Timeline example:

```text
06 Sep 2026 · 10:42 AM

FIELD AUDIT REQUESTED

Officer:
State Nodal Officer

Project:
Road Construction – Sehore

Reason:
Financial-progress mismatch

Status:
Delayed → Under Review
```

---

# 75. USER MANAGEMENT

Table:

```text
Name
Role
Region
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

---

# 76. SETTINGS

Sections:

```text
Profile
Notifications
Accessibility
Risk Thresholds
System Information
```

Risk threshold display:

```text
Low:
0–49

Medium:
50–79

High:
80–100
```

---

# 77. ROLE-AWARE DEMO

Default demo:

```text
Role:
State Nodal Officer

Jurisdiction:
Madhya Pradesh
```

Ministry Official:

```text
India
```

District Authority:

```text
Sehore
```

Field Officer:

```text
Assigned Projects
```

---

# 78. FRONTEND ARCHITECTURE

Use feature-oriented architecture.

Recommended:

```text
src/
├── app/
│   ├── App.jsx
│   ├── router.jsx
│   └── providers.jsx
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── maps/
│
├── components/
│   ├── landing/
│   ├── layout/
│   ├── ui/
│   ├── dashboard/
│   ├── projects/
│   ├── risk/
│   ├── gis/
│   ├── analytics/
│   └── compliance/
│
├── pages/
│   ├── LandingPage.jsx
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
│   ├── analyticsService.js
│   └── complianceService.js
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
│   ├── useAuth.js
│   ├── useProjects.js
│   ├── useDashboard.js
│   ├── useRiskAlerts.js
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
    ├── tokens.css
    ├── globals.css
    └── utilities.css
```

---

# 79. LANDING COMPONENT ARCHITECTURE

Create:

```text
landing/
├── LandingHeader
├── HeroSection
├── TrustStrip
├── ProblemSection
├── SolutionFlow
├── AICapabilities
├── ExplainableRiskPreview
├── RoleSection
├── ScaleSection
├── ArchitectureSection
├── FAQSection
└── LandingFooter
```

---

# 80. DASHBOARD COMPONENT ARCHITECTURE

```text
dashboard/
├── DashboardHeader
├── KPIBand
├── StatCard
├── RiskOverview
├── RiskTrendChart
├── FundAllocationChart
├── GeographicRisk
├── IndiaRiskMap
├── PriorityProjects
├── AIInsightsPanel
├── AttentionQueue
└── RecentActions
```

---

# 81. PROJECT COMPONENT ARCHITECTURE

```text
projects/
├── ProjectFilters
├── ProjectTable
├── ProjectGrid
├── ProjectCard
├── ProjectDetailsHeader
├── ProjectMetrics
├── FinancialPhysicalComparison
├── RiskScore
├── AIExplanation
├── PredictionPanel
├── PaymentEvidence
├── RelatedProjects
├── ProjectTimeline
├── EvidenceTabs
├── RecommendedAction
├── ActionToolbar
├── RequestAuditModal
├── HaltPaymentModal
└── ResolveProjectModal
```

---

# 82. COMMON UI COMPONENTS

Use:

```text
Button
IconButton
Card
Section
Badge
RiskBadge
StatusBadge
Input
SearchInput
Select
Dropdown
Tabs
Modal
Drawer
ConfirmDialog
Tooltip
ProgressBar
ScoreRing
DataTable
Toast
Skeleton
EmptyState
ErrorState
PageHeader
SectionHeader
```

---

# 83. CSS ARCHITECTURE

Use Tailwind for component styling but maintain centralized design tokens.

Create:

```text
tokens.css
globals.css
utilities.css
```

---

# 84. DESIGN TOKENS

Use:

```css
:root {
  --color-primary: #0F172A;
  --color-background: #F4F7F6;
  --color-background-soft: #EEF2F1;
  --color-surface: #FFFFFF;

  --color-high: #C62828;
  --color-medium: #D98A00;
  --color-low: #14804A;

  --color-accent: #C8902F;

  --color-text-primary: #111827;
  --color-text-secondary: #667085;
  --color-text-muted: #98A2B3;

  --color-border: #E4E7EC;

  --radius-card: 14px;
  --radius-control: 9px;
  --radius-badge: 9999px;

  --shadow-card: 0 2px 10px rgba(15,23,42,0.04);
  --shadow-card-hover: 0 6px 18px rgba(15,23,42,0.07);

  --sidebar-width: 264px;
  --header-height: 72px;
}
```

Do not use random color values throughout the app.

---

# 85. GLOBAL CSS

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

Add visible focus:

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

# 86. BACKGROUND CSS

Use subtle layered backgrounds.

Example:

```css
.public-page {
  background:
    radial-gradient(
      circle at 18% 8%,
      rgba(200, 144, 47, 0.045),
      transparent 24%
    ),
    radial-gradient(
      circle at 84% 18%,
      rgba(15, 23, 42, 0.025),
      transparent 30%
    ),
    linear-gradient(
      180deg,
      #F8FAF9 0%,
      #F4F7F6 100%
    );
}
```

Then add optional SVG/geographic pattern as a pseudo-element with very low opacity.

Do not make the background visually dominant.

---

# 87. CARD CSS

Default:

```css
.card {
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}
```

Hover only if clickable:

```css
.card-clickable:hover {
  box-shadow: var(--shadow-card-hover);
}
```

Do not add transform scale by default.

---

# 88. BUTTON CSS

Use semantic variants.

```text
Primary
Secondary
Outline
Ghost
Danger
```

Controls:

```text
8–10px radius
40–44px height
14–16px text
```

Buttons must not become giant pills.

---

# 89. INPUT CSS

Use:

```text
height:
40–44px

border:
#E4E7EC

radius:
8–10px

text:
14–15px
```

Focus:

```text
border + subtle ring
```

---

# 90. BADGE CSS

Risk badge:

```text
font-size:
12–13px

font-weight:
600

padding:
4px 8px

radius:
9999px
```

Use pill shape ONLY for badges.

---

# 91. TABLE CSS

Use:

```text
Header:
12–13px
semibold

Body:
13–14px

Row:
56–68px

Border:
subtle

Hover:
very subtle background
```

Do not make tables look like giant cards.

---

# 92. TYPOGRAPHY SYSTEM

Landing:

```text
H1:
44–56px

H2:
32–38px

H3:
20–24px

Body:
18–21px
```

Portal:

```text
Page title:
26–32px

Section:
18–22px

KPI:
30–40px

Body:
14–16px

Table:
13–14px

Metadata:
12–13px
```

---

# 93. IMPORTANT TEXT RULE

Do not make the dashboard tiny.

Normal body text should generally be:

```text
14–16px
```

Do not use 9–10px for normal data.

Metadata can be:

```text
12–13px
```

---

# 94. HOVER RULE

Minimal.

Use hover on:

- navigation;
- clickable project;
- table row;
- map state;
- buttons;
- interactive elements.

Do NOT add hover animations to:

- every KPI;
- every chart;
- every section;
- decorative backgrounds.

No exaggerated scaling.

---

# 95. ANIMATION RULE

Smooth but restrained.

Use:

```text
150–220ms
ease
```

Good:

- modal;
- drawer;
- route fade;
- filter updates;
- toast;
- map selection.

Avoid:

- floating cards;
- continuous gradients;
- giant reveal animations;
- excessive motion;
- pulsing everywhere.

Only `Live Data` may subtly pulse.

---

# 96. NO AI VISUAL CLICHES

Do not use:

```text
✨ AI
```

everywhere.

Do not use:

```text
neural network
robot
brain
glowing circuit
```

as primary visuals.

Use data and evidence instead.

---

# 97. MAP DESIGN

Map must support:

```text
hover
click
selection
tooltip
navigation
```

Unselected states neutral.

Selected state highlighted.

Risk semantic colors:

```text
High:
red

Medium:
amber

Low:
green
```

---

# 98. CHART DESIGN

Keep charts:

- flat;
- clean;
- readable;
- semantic.

No:

- 3D;
- rainbow;
- excessive animation;
- fake data labels everywhere.

Every chart needs a question.

---

# 99. CHART QUESTIONS

Risk Trend:

> Is risk increasing?

Fund chart:

> Where is money being utilized?

Map:

> Where is risk concentrated?

Financial vs Physical:

> Is financial execution ahead of physical progress?

Vendor analysis:

> Are there unusual payment patterns?

---

# 100. MOCK DATA

Use at least:

```text
20–30 projects
15–30 transactions
10–20 alerts
10+ audit events
```

Create meaningful variation.

---

# 101. REQUIRED DEMO PROJECT

Use:

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

Physical:
40%

Delay:
4 Months

Risk:
82 / 100 HIGH
```

AI reasons:

```text
Financial-progress mismatch
4-month delay
Payment anomaly
Possible similar project
```

Predictions:

```text
Delay Probability:
78%

Cost Overrun Risk:
65%

Anomaly Score:
82
```

Transaction evidence:

```text
3 similar ₹5,00,000 payments
within 48 hours
```

---

# 102. PROJECT DATA MODEL

Use approximately:

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

# 103. TRANSACTION DATA MODEL

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

# 104. ALERT DATA MODEL

```javascript
{
  id: "ALERT-001",
  projectId: "MP-2024-1001",
  riskScore: 82,
  riskCategory: "High",
  title: "Financial-progress mismatch",
  description:
    "Expenditure has reached 85% while reported physical progress is 40%.",
  severity: "High",
  status: "Unresolved",
  createdAt: "2026-09-06T09:00:00Z"
}
```

---

# 105. AUDIT EVENT MODEL

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

# 106. SERVICE LAYER

Do NOT import raw mock arrays inside pages.

Use:

```text
Page
 ↓
Hook
 ↓
Service
 ↓
Mock API
```

Example methods:

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

---

# 107. FUTURE API CONTRACT

Prepare for:

```text
GET /api/projects/dashboard-stats

GET /api/projects

GET /api/projects/flagged

GET /api/projects/:id

GET /api/projects/:id/transactions

GET /api/risk-alerts

POST /api/projects/:id/action

GET /api/compliance

GET /api/analytics

GET /api/map
```

Do not hardcode API URLs in components.

---

# 108. AXIOS LAYER

Use one API abstraction:

```javascript
api.get(...)
api.post(...)
```

Future backend replacement should require minimal changes.

---

# 109. MOCK VS REAL API

The frontend must run even if backend is unavailable.

Initially:

```text
Mock Service
```

Later:

```text
Axios → Express
```

The UI should not need redesign.

---

# 110. RISK HELPER

Create utility:

```javascript
getRiskLevel(score)
```

returns:

```text
Low
Medium
High
```

Create:

```javascript
getRiskClass(score)
```

for styling.

---

# 111. CURRENCY UTILITY

Create:

```javascript
formatCurrencyINR(value)
```

Examples:

```text
₹20,00,000
₹18,00,000
₹17,00,000
₹5,892 Cr
```

---

# 112. DATE UTILITY

Create:

```javascript
formatDate()
formatDateTime()
```

Examples:

```text
06 Sep 2026

06 Sep 2026, 10:42 AM
```

---

# 113. SEARCH/FILTER ARCHITECTURE

Filter shape:

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

Use one shared filtering mechanism.

---

# 114. URL FILTERS

Recommended:

```text
/projects?state=Madhya%20Pradesh
```

or:

```text
/projects?state=Madhya%20Pradesh&risk=High
```

When map or dashboard drives project navigation, preserve context.

---

# 115. APPLICATION STATE

Global:

```text
user
role
jurisdiction
notifications
dateRange
```

Local:

```text
project filters
modal state
view mode
selected map state
```

Do not put every tiny piece of state globally.

---

# 116. AUTHENTICATION

For prototype:

```text
Mock authentication
```

Login page:

```text
Email/User ID
Password
Role
```

Use local state/context.

Protected routes should redirect to login.

---

# 117. LANDING → PORTAL FLOW

CTA:

```text
Access Monitoring Portal
```

routes:

```text
/login
```

After login:

```text
/dashboard
```

---

# 118. NAVIGATION FLOW

Dashboard:

```text
High Risk KPI
→
Projects filtered to High
```

Map:

```text
Madhya Pradesh
→
Projects filtered by state
```

Project:

```text
View
→
/projects/MP-2024-1001
```

Risk alert:

```text
Investigate
→
project details
```

---

# 119. EXACT SIH DEMO FLOW

This must work without code changes.

```text
LANDING PAGE
     ↓
ACCESS MONITORING PORTAL
     ↓
LOGIN
     ↓
STATE NODAL OFFICER
     ↓
DASHBOARD
     ↓
HIGH RISK = 427
     ↓
MADHYA PRADESH MAP
     ↓
SEHORE
     ↓
ROAD CONSTRUCTION – SEHORE
     ↓
82/100 HIGH RISK
     ↓
85% EXPENDITURE VS 40% PHYSICAL PROGRESS
     ↓
AI REASONS
     ↓
TRANSACTION ANOMALY
     ↓
REQUEST AUDIT
     ↓
UNDER REVIEW
     ↓
COMPLIANCE TRAIL
```

---

# 120. FIRST 30 SECONDS OF JUDGE EXPERIENCE

The judge should immediately see:

```text
What is this?
```

Answer:

MPLADS monitoring.

Then:

```text
What is different?
```

Answer:

AI-assisted risk intelligence.

Then:

```text
What can it do?
```

Answer:

Detect → Explain → Investigate → Act.

---

# 121. FIRST 2 MINUTES OF DEMO

Show:

```text
National/state overview
↓
Risk concentration
↓
Specific project
↓
AI explanation
↓
Evidence
↓
Action
```

Do not spend two minutes on Settings.

---

# 122. SIH "AHA MOMENT"

The best moment should be:

```text
85% money spent
vs
40% physical progress

+
3 suspicious similar payments
+
AI risk 82
+
explainable reasons

↓
Request Audit

↓
UNDER REVIEW
```

This is the visual proof of value.

---

# 123. RISK LANGUAGE

Do NOT say:

```text
Fraud confirmed.
```

Use:

```text
Potential anomaly
AI flagged
Elevated risk
Suspicious pattern
Requires verification
Possible duplicate
Investigation recommended
```

The UI should support human verification rather than falsely declaring guilt.

---

# 124. AI EXPLAINABILITY REQUIREMENT

Every high-risk project should have:

```text
Score
+
Reasons
+
Evidence
+
Predictions
+
Recommended action
```

Do not show only:

```text
82/100
```

---

# 125. AI SCORE EXPLANATION

Optional panel:

```text
How is this score generated?

The risk indicator combines signals from:
• financial execution
• physical progress
• project timeline
• transaction patterns
• similarity signals
```

And:

```text
The score is a decision-support signal,
not a standalone determination of fraud.
```

---

# 126. SECONDARY EXPERIENCE — FUND MONITORING

The project source strongly emphasizes financial monitoring.

Ensure users can move from:

```text
Fund utilization
→ high expenditure
→ low progress
→ project
```

---

# 127. SECONDARY EXPERIENCE — GIS

Ensure:

```text
Map
→ state
→ projects
→ project detail
```

Map must drive the product.

---

# 128. SECONDARY EXPERIENCE — COMPLIANCE

Ensure:

```text
Project action
→ audit event
→ compliance timeline
```

This demonstrates accountability.

---

# 129. ACCESSIBILITY

Mandatory:

```text
skip link
keyboard focus
accessible buttons
accessible dialogs
semantic labels
high contrast option
text scaling
```

Use text + color for risk.

Bad:

```text
red dot
```

Good:

```text
HIGH RISK
82 / 100
```

---

# 130. RESPONSIVE DESIGN

Target:

```text
1440 × 900
1280 × 720
1024 × 768
768 × 1024
390 × 844
```

---

# 131. DESKTOP

Desktop should show:

```text
full sidebar
full header
5 KPIs
two-column analytics
wide map
wide table
```

---

# 132. TABLET

Use:

```text
collapsed sidebar
2 KPI columns
stack charts where necessary
```

---

# 133. MOBILE

Use:

```text
drawer sidebar
single-column content
stacked KPIs
horizontal-scroll table
stacked project detail sections
full-width action buttons
```

---

# 134. LANDING MOBILE

Hero:

```text
single column
```

Workflow:

```text
vertical
```

Feature sections:

```text
stacked
```

CTA:

```text
full width
```

---

# 135. PROJECT DETAIL MOBILE

Order:

```text
Header
↓
Metrics
↓
Financial / Physical
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

# 136. PERFORMANCE

Avoid:

- heavy video background;
- excessive SVG animation;
- 3D frameworks;
- unnecessary dependencies.

Use:

- lazy routes;
- pagination;
- optimized map;
- reusable components;
- efficient filtering.

---

# 137. ERROR STATES

Example:

```text
Unable to load monitoring data.

The monitoring service did not respond.

[ Retry ]
```

---

# 138. EMPTY STATES

Example:

```text
No projects match the selected filters.

Try changing the state, district or risk level.

[ Clear Filters ]
```

---

# 139. LOADING STATES

Every important section must have skeletons:

```text
KPI skeleton
Chart skeleton
Map skeleton
Table skeleton
Project detail skeleton
```

---

# 140. ACTION LOADING

When an action is being submitted:

```text
Submit Request...
```

Button disabled.

After success:

```text
✓ Audit request submitted
```

---

# 141. NO FAKE STATISTICS

Do not display fake model accuracy such as:

```text
98.7% accuracy
99.3% fraud detection
```

unless real evaluation data exists.

Likewise do not claim:

```text
Live government data
Integrated with eSAKSHI
```

unless actually integrated.

Use:

```text
Prototype Monitoring Data
```

and:

```text
Designed for integration with existing
government data systems.
```

---

# 142. PROTOTYPE DATA LABEL

Use a small contextual indicator:

```text
Prototype / Demonstration Environment
```

Do not put huge "FAKE DATA" banners everywhere.

---

# 143. IMAGES

Use meaningful visuals only:

- infrastructure;
- roads;
- schools;
- health facilities;
- water systems;
- rural development;
- maps.

Avoid:

- generic AI robots;
- abstract businesspeople;
- handshake stock photos;
- meaningless technology images.

---

# 144. LANDING PAGE VISUAL STYLE

Use:

```text
real-world infrastructure imagery
+
subtle geographic graphics
+
dashboard preview
+
editorial typography
```

This will feel more connected to MPLADS.

---

# 145. SOURCE OF VISUAL INSPIRATION

The supplied project blueprint asks for a visual balance between authoritative government interfaces and modern analytics dashboards.

Reference:

- MoSPI/MPLADS/eSAKSHI style patterns for authority, hierarchy and administrative data;
- Digital India for national digital-service identity;
- MyGov for public-sector navigation, accessibility and structured content;
- myScheme for discovery-oriented information architecture and simple workflow presentation.

Do not duplicate those sites.

---

# 146. DO NOT REBUILD RANDOMLY

Before making changes:

1. inspect existing routes;
2. inspect package.json;
3. inspect Tailwind configuration;
4. inspect current global CSS;
5. inspect existing components;
6. inspect current mock data;
7. identify working functionality;
8. identify broken/weak areas;
9. refactor;
10. implement.

Preserve good existing functionality.

---

# 147. REFACTORING PRIORITY

Refactor only where it improves:

- maintainability;
- visual consistency;
- performance;
- backend readiness.

Do not rewrite working code unnecessarily.

---

# 148. CSS REFACTORING PRIORITY

Find and replace:

```text
random colors
random spacing
random radius
random shadows
random typography
duplicate styles
```

with shared tokens/components.

---

# 149. DESIGN REFACTORING PRIORITY

Replace:

```text
card-heavy layout
```

with:

```text
sections
+
tables
+
editorial blocks
+
meaningful cards
```

---

# 150. COMPONENT REFACTORING PRIORITY

Replace:

```text
repeated markup
```

with:

```text
StatCard
RiskBadge
StatusBadge
SectionHeader
PageHeader
DataTable
Modal
```

---

# 151. DASHBOARD COMPONENT RULE

No single component should become a giant 1,500–2,000 line dashboard file.

Keep major areas separate.

---

# 152. PAGE COMPONENT RULE

Pages should compose components.

Example:

```jsx
<DashboardPage>
  <DashboardHeader />
  <KPIBand />
  <RiskTrend />
  <RiskOverview />
  <GeographicRisk />
  <PriorityProjects />
  <AIInsights />
  <AttentionQueue />
</DashboardPage>
```

---

# 153. PROJECT DETAILS COMPONENT RULE

Compose:

```jsx
<ProjectDetailsPage>
  <ProjectDetailsHeader />
  <ProjectMetrics />
  <FinancialPhysicalComparison />
  <RiskAnalysis />
  <PredictionPanel />
  <PaymentEvidence />
  <RelatedProjects />
  <ProjectTimeline />
  <EvidenceTabs />
  <RecommendedAction />
  <ActionToolbar />
</ProjectDetailsPage>
```

---

# 154. LANDING COMPONENT RULE

Compose:

```jsx
<LandingPage>
  <LandingHeader />
  <HeroSection />
  <TrustStrip />
  <ProblemSection />
  <SolutionFlow />
  <AICapabilities />
  <ExplainableRiskPreview />
  <RoleSection />
  <ScaleSection />
  <ArchitectureSection />
  <FAQSection />
  <LandingFooter />
</LandingPage>
```

---

# 155. GLOBAL UX RULE

Every screen should answer:

```text
What is this?
What should I look at?
What can I do next?
```

If a page cannot answer those questions, improve it.

---

# 156. NO DEAD BUTTONS

Every visible button must:

- navigate;
- open something;
- update state;
- trigger action;
- or scroll to relevant content.

Do not display decorative buttons that do nothing.

---

# 157. NO DEAD NAVIGATION

All nav items must lead somewhere.

If a page is prototype-only, still provide a meaningful placeholder experience.

Do not leave blank screens.

---

# 158. PAGE PRIORITY

Build/polish in this order:

```text
1. Landing
2. Dashboard
3. Project Details
4. Action Workflow
5. Compliance
6. Risk & Alerts
7. GIS
8. Projects
9. Fund Utilization
10. Analytics
11. Reports
12. Users
13. Settings
```

---

# 159. IF DEVELOPMENT TIME IS LIMITED

Make these excellent:

```text
Landing
Dashboard
Project Investigation
Action
Compliance
```

A polished core workflow is better than 12 unfinished pages.

---

# 160. FINAL VISUAL TEST

The result should feel:

```text
professional
government-grade
modern
calm
credible
data-driven
original
```

It should NOT feel:

```text
AI-generated
template-based
crypto-like
gaming-like
over-designed
gradient-heavy
```

---

# 161. FINAL SIH TEST

A judge must be able to understand:

```text
Problem
↓
Solution
↓
AI
↓
Risk
↓
Explanation
↓
Evidence
↓
Action
↓
Impact
↓
Accountability
```

---

# 162. FINAL DEMO TEST

Run:

```text
Landing
→ Access Portal
→ Login
→ Dashboard
→ High Risk
→ Madhya Pradesh
→ Sehore
→ Road Construction – Sehore
→ Risk 82
→ Why Flagged
→ Payment Evidence
→ Request Audit
→ Under Review
→ Compliance
```

No manual code changes.

---

# 163. BUILD TEST

Run:

```bash
npm run build
```

Fix every build error.

Do not finish with broken build.

---

# 164. ROUTING TEST

Verify:

```text
/
 /login
/dashboard
/projects
/projects/MP-2024-1001
/risk-alerts
/fund-utilization
/analytics
/gis-map
/reports
/compliance
/users
/settings
```

All must work.

Ensure Vercel SPA fallback is correctly configured if required.

---

# 165. FINAL QA CHECKLIST

## Landing

```text
[ ] polished government-style navbar
[ ] readable hero
[ ] improved background
[ ] clear CTA
[ ] problem section
[ ] solution workflow
[ ] AI capabilities
[ ] explainability preview
[ ] roles
[ ] scale
[ ] FAQ
[ ] accessibility
[ ] footer
```

## Dashboard

```text
[ ] KPI band
[ ] risk overview
[ ] risk trend
[ ] fund chart
[ ] geographic intelligence
[ ] priority projects
[ ] AI insights
[ ] attention queue
[ ] recent actions
```

## Project Details

```text
[ ] project header
[ ] risk
[ ] metrics
[ ] financial vs physical
[ ] AI reasons
[ ] predictions
[ ] payment evidence
[ ] related signals
[ ] timeline
[ ] evidence
[ ] recommended action
[ ] action toolbar
```

## Workflow

```text
[ ] Request Audit
[ ] Assign officer
[ ] Add reason
[ ] Loading
[ ] Success
[ ] Status updates
[ ] Compliance updates
```

## Quality

```text
[ ] readable typography
[ ] refined background
[ ] minimal hover
[ ] restrained animation
[ ] no AI visual clichés
[ ] no dead buttons
[ ] no broken routes
[ ] responsive
[ ] accessible
[ ] build passes
```

---

# 166. FINAL PRODUCT NARRATIVE

The final application must tell one continuous story:

```text
Government development projects
generate large volumes of information
        ↓
The system brings project, financial,
progress and transaction signals together
        ↓
AI identifies unusual patterns
        ↓
Risk is prioritized
        ↓
The officer sees why
        ↓
The officer sees evidence
        ↓
The officer sees predictions
        ↓
The officer takes action
        ↓
The system records that action
```

---

# 167. MOST IMPORTANT UX PRINCIPLE

The project is not:

> “AI that says this project is risky.”

The project is:

> **“AI-assisted monitoring that helps an officer discover, understand, investigate and act on potential project risks.”**

The frontend must communicate this difference.

---

# 168. MOST IMPORTANT VISUAL PRINCIPLE

Do not make the app impressive by adding more effects.

Make it impressive by making:

```text
hierarchy
+
information
+
evidence
+
workflow
+
visual consistency
```

impressive.

---

# 169. FINAL CODING AGENT INSTRUCTION

You must modify the existing project rather than returning only suggestions.

Perform:

```text
INSPECT
→
REFACTOR
→
DESIGN
→
IMPLEMENT
→
CONNECT MOCK DATA
→
TEST
→
POLISH
```

Actually implement the frontend.

Do not return only:

- wireframes;
- pseudo-code;
- design ideas;
- isolated components;
- explanations without code.

The final result must be a working React application.

---

# 170. FINAL PRODUCT PRIORITY

If there is conflict between visual decoration and product clarity:

**Choose product clarity.**

If there is conflict between more features and a polished core journey:

**Choose the polished core journey.**

If there is conflict between flashy AI visuals and government credibility:

**Choose government credibility.**

If there is conflict between tiny text and fitting more information:

**Choose readable text.**

If there is conflict between animation and smoothness:

**Choose restrained smoothness.**

---

# 171. FINAL ONE-LINE TARGET

Build:

> **An original, government-grade, AI-assisted MPLADS monitoring and investigation platform where officers can monitor implementation, discover risk, understand AI findings, inspect evidence, take action and maintain a transparent compliance trail — presented through a polished public landing page and a modern operational dashboard.**

---

# 172. FINAL PRODUCT FLOW

```text
PUBLIC LANDING
      ↓
UNDERSTAND THE PROBLEM
      ↓
UNDERSTAND THE SOLUTION
      ↓
SEE HOW AI HELPS
      ↓
ACCESS PORTAL
      ↓
LOGIN
      ↓
DASHBOARD
      ↓
RISK CONCENTRATION
      ↓
PROJECT TRIAGE
      ↓
PROJECT INVESTIGATION
      ↓
AI EXPLANATION
      ↓
EVIDENCE
      ↓
OFFICER ACTION
      ↓
STATUS CHANGE
      ↓
COMPLIANCE TRAIL
```

This is the desired final state.
