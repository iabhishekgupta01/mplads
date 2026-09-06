\# FRONTEND HANDOFF DOCUMENT — MPLADS AI MONITORING SYSTEM

\## SIH Problem Statement ID 26102

\*\*Project:\*\* Development of an AI-powered system to detect anomalies, fraud, and inefficiencies in MPLAD Scheme implementation

\*\*Frontend Goal:\*\* Build a complete, realistic, government-grade, AI-powered monitoring dashboard prototype that can be demonstrated to SIH judges and later connected to the Node.js/MongoDB/Python AI backend without redesigning the frontend.

\---

\## 0. IMPORTANT — READ THIS FIRST

This document is the \*\*single frontend handoff specification\*\* for the project.

A frontend developer should be able to take this document and start building the application without repeatedly asking:

\* What pages should exist?

\* What should the dashboard contain?

\* What should the colors be?

\* How should the sidebar/header look?

\* What happens when a project is flagged?

\* What information does the AI display?

\* What should happen when an officer clicks Request Audit?

\* What data should the frontend expect?

\* What should the SIH demo flow look like?

\* How should this resemble a Government of India platform without simply copying one?

The original project discussions describe the intended product as an \*\*officer-centric monitoring and decision-support platform\*\*, not a generic analytics dashboard. The most important product flow is:

\*\*Login → Overview Dashboard → Identify High-Risk Region → Filter Projects → Open AI-flagged Project → Understand Why It Was Flagged → Take Action → Record Action in Compliance Trail.\*\*

The supplied project material explicitly frames the system around MPLADS monitoring, AI risk scoring, anomaly detection, explainability and officer intervention.

The frontend must therefore be designed around \*\*investigation and action\*\*, not just graphs.

\---

\# 1. UNDERSTANDING THE ACTUAL GOAL OF THE PROJECT

The project is \*\*not\*\* simply:

\> "Make a dashboard showing MPLADS statistics."

The actual concept is:

\> \*\*Create an AI-assisted monitoring platform that helps government officers identify potentially risky MPLADS works, understand the reasons behind the risk, investigate the underlying project/financial information, and initiate corrective action.\*\*

The frontend should visually communicate this entire chain.

\### The product has four conceptual layers

\### Layer 1 — Monitor

The officer first needs to understand the overall health of MPLADS implementation.

Examples:

\* How many projects exist?

\* How much money has been allocated?

\* How much has been released?

\* How much has been spent?

\* How many projects are delayed?

\* How many projects are high-risk?

This is the \*\*Dashboard\*\*.

\---

\### Layer 2 — Detect

The system identifies unusual or suspicious projects.

Examples:

\* High expenditure but low physical progress.

\* Cost overruns.

\* Delayed completion.

\* Suspicious vendor payment patterns.

\* Repeated or highly similar projects.

\* Abnormal transaction behavior.

This is represented through:

\* Risk Scores

\* Risk Badges

\* AI Alerts

\* Risk Maps

\* Flagged Project tables

The project source specifically proposes an anomaly/risk presentation based on High/Medium/Low indicators and an AI-generated alerts center.

\---

\### Layer 3 — Explain

This is extremely important for SIH.

The system must not simply say:

\> Risk Score: 87

It must answer:

\> \*\*Why is this project risky?\*\*

For example:

\> Expenditure is 85% while physical progress is only 40%.

\> Project is delayed by 4 months.

\> Abnormal payment pattern detected.

\> Similar projects identified nearby.

The source explicitly emphasizes plain-language AI reasoning instead of a black-box score.

\---

\### Layer 4 — Act

The officer must be able to do something about the problem.

For example:

\*\*Request Audit\*\*

\*\*Assign for Inspection\*\*

\*\*Halt Vendor Payment\*\*

\*\*Mark False Positive\*\*

\*\*Mark Resolved\*\*

The source specifically describes this as the distinction between a passive monitoring dashboard and an actionable management system.

This is one of the most important parts of the frontend.

\---

\# 2. CORE DESIGN PHILOSOPHY

The interface should combine two worlds:

\### Government platform

It should feel:

\* Formal

\* Trustworthy

\* Structured

\* Accessible

\* Information-dense

\* Serious

\* Administrative

\* Functional

\### Modern AI analytics platform

It should also feel:

\* Modern

\* Intelligent

\* Interactive

\* Data-driven

\* Visually clear

\* Responsive

\* Action-oriented

The supplied project specification explicitly describes the intended style as a balance between the authoritative/accessibility patterns of Government of India interfaces such as MoSPI/eSAKSHI and the higher-density visualizations of modern analytics dashboards.

\### VERY IMPORTANT

\*\*Do not copy an existing website.\*\*

Use existing government websites as \*\*design inspiration only\*\*:

\* Layout discipline

\* Navigation structure

\* Typography hierarchy

\* Information density

\* Table style

\* Government terminology

\* Color restraint

\* Functional presentation

The actual UI must look like an \*\*original MPLADS AI monitoring product\*\*.

\---

\# 3. VISUAL IDENTITY

\## Primary design style

Use:

\*\*Soft off-white background + white cards + dark navy navigation + restrained government accent + clear risk colors.\*\*

The source specifies an off-white application background and white dashboard surfaces.

\### Recommended palette

\`\`\`text

PRIMARY NAVY

# 0F172A

APPLICATION BACKGROUND

# F4F7F6

or

# F8FAFC

CARD / SURFACE

# FFFFFF

HIGH RISK

# DC2626

MEDIUM RISK

# F59E0B

LOW RISK

# 10B981

BORDER

# E5E7EB

PRIMARY TEXT

# 111827

SECONDARY TEXT

# 6B7280

SUBTLE GOLD / SAFFRON

# F59E0B

\`\`\`

The project source gives essentially this same hierarchy, with navy as the primary brand color, red for critical risk, amber for medium risk and emerald for healthy/completed states.

\---

\# 4. TYPOGRAPHY

Use:

\*\*Inter\*\*

Alternative:

\*\*Roboto\*\*

Typography should be clean and highly readable. The supplied specification specifically recommends Inter or Roboto and large bold KPI typography with muted metadata text.

\### Typography hierarchy

\`\`\`text

Page Title

24–32px

font-weight: 700

Section Heading

18–22px

font-weight: 600

KPI Number

28–40px

font-weight: 700

Card Title

14–16px

font-weight: 500/600

Body

14–16px

Metadata

12–13px

Table Header

11–12px

uppercase / slightly tracked

\`\`\`

Do not use giant decorative headings everywhere.

This is an administrative application.

\---

\# 5. CARD DESIGN

Cards are a major part of the visual system.

Use:

\`\`\`text

background: white

border-radius: 12–16px

border: 1px solid #E5E7EB

box-shadow: subtle

\`\`\`

The project source specifically recommends rounded-xl cards with subtle shadows to separate information without clutter.

\### Avoid

\* Huge floating cards

\* Excessive gradients

\* Neon colors

\* Glassmorphism

\* Excessive animations

\* Huge illustrations

\* Startup-style landing page effects

This is a \*\*government analytics application\*\*.

\---

\# 6. MAIN APPLICATION LAYOUT

The application should use a persistent shell.

\`\`\`text

┌───────────────────────────────────────────────────────────────┐

│ SIDEBAR │ TOP HEADER │

│ ├─────────────────────────────────────────────────────┤

│ │ │

│ │ PAGE CONTENT │

│ │ │

│ │ │

│ │ │

│ │ │

└───────────────────────────────────────────────────────────────┘

\`\`\`

The source specifies a persistent left sidebar and sticky top header.

\---

\# 7. SIDEBAR

\## Header section

At the top:

\*\*Government of India emblem/logo placeholder\*\*

Then:

\*\*MPLADS AI Monitoring System\*\*

Subtext:

\*\*Ministry of Statistics & Programme Implementation\*\*

The source specifically proposes this branding direction.

\---

\## Navigation

Recommended structure:

\`\`\`text

Dashboard

Project Monitoring

AI Analysis

Risk & Alerts

Fund Utilization

Project Database

GIS Map

Reports

Compliance

User Management

Settings

\`\`\`

This follows the supplied project structure.

\---

\## Sidebar bottom

Use a subtle mission statement:

\> Transparent Development, Stronger India

or

\> People's Development, Our Shared Responsibility

Keep it understated.

Do not make it look like an advertisement.

\---

\# 8. TOP HEADER

The header remains sticky.

It should contain:

\### Left

Breadcrumb or page title.

\### Center

Global search:

\`\`\`text

Search projects, districts, MPs...

\`\`\`

Search should conceptually support:

\* Project ID

\* Project Name

\* District

\* State

\* MP

\### Right

Date range:

\`\`\`text

Jan 2024 – Sep 2025

\`\`\`

Notification bell:

\`\`\`text

🔔

\`\`\`

with a small red unread indicator.

Live data:

\`\`\`text

● Live Data

Last updated 2 min ago

\`\`\`

The source specifically requires a global search, date range, notifications and Live Data/Last Updated indicator.

\---

\# 9. ROUTES

The frontend should include these routes:

\`\`\`text

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

\`\`\`

The \*\*critical SIH prototype routes\*\* are:

\`\`\`text

/login

/dashboard

/projects

/projects/:id

/risk-alerts

/gis-map

/compliance

\`\`\`

The other routes can initially be prototype-quality secondary screens.

\---

\# 10. LOGIN PAGE

The login should be simple.

\### Desktop

Two columns.

Left:

\`\`\`text

MPLADS AI

Monitoring System

Monitoring MPLADS for a more

transparent and developed India.

\`\`\`

Right:

\`\`\`text

Welcome back

User ID / Email

Password

Role

\[State Nodal Officer ▼\]

\[ Sign In \]

\`\`\`

Possible demo roles:

\`\`\`text

Ministry Official

State Nodal Officer

District Authority

\`\`\`

\### Important

Authentication does not need to be fully production-ready for the frontend prototype.

A mock login is acceptable.

The important thing is that once logged in, the dashboard looks realistic.

\---

\# 11. DASHBOARD — MOST IMPORTANT SCREEN

This is the page that judges will see first.

The dashboard should answer within seconds:

\> What is happening?

\> Where is the problem?

\> How serious is it?

\> Which projects require attention?

\---

\# 12. DASHBOARD HEADER

Example:

\`\`\`text

Good Morning, State Nodal Officer

MPLADS monitoring overview across Madhya Pradesh

\`\`\`

Better generic production wording:

\`\`\`text

MPLADS Monitoring Overview

Track project execution, fund utilization and AI-detected risks.

\`\`\`

Avoid making every page overly personal.

\---

\# 13. KPI ROW

Create a reusable component:

\`\`\`text

&lt;StatCard /&gt;

\`\`\`

Five primary cards.

\### Card 1

\`\`\`text

Total Allocated Funds

₹ 5,892 Cr

↗ +6.2%

vs last year

\`\`\`

\### Card 2

\`\`\`text

Total Released Funds

₹ 4,320 Cr

↗ +5.1%

vs last year

\`\`\`

\### Card 3

\`\`\`text

Fund Utilization

73.3%

↗ +4.8%

vs last year

\`\`\`

\### Card 4

\`\`\`text

Total Projects

48,326

↗ +12.4%

vs last year

\`\`\`

\### Card 5 — MOST VISUALLY IMPORTANT

\`\`\`text

HIGH RISK PROJECTS

427

↗ +18.6%

vs last month

\`\`\`

Use a faint red background.

The source explicitly lists these dashboard KPIs and asks that the High Risk card visually attract attention.

\---

\# 14. DASHBOARD CHART AREA

Use a responsive grid.

Desktop:

\`\`\`text

┌───────────────────────┬───────────────────────┐

│ Risk Trend │ Fund Allocation │

│ │ vs Utilization │

└───────────────────────┴───────────────────────┘

┌───────────────────────────────────────────────┐

│ Geographic Risk Map │

└───────────────────────────────────────────────┘

\`\`\`

Or three-column arrangement where screen size allows.

\---

\# 15. RISK TREND CHART

Use a line chart.

X-axis:

\`\`\`text

Jan

Feb

Mar

Apr

...

Dec

\`\`\`

Lines:

\`\`\`text

High Risk

Medium Risk

Low Risk

\`\`\`

Tooltip:

\`\`\`text

August 2026

High Risk: 427

Medium Risk: 1,284

Low Risk: 3,932

\`\`\`

The project source specifically calls for a 12-month High/Medium/Low risk trend.

\---

\# 16. FUND ALLOCATION VS UTILIZATION

Use a grouped bar chart.

Example:

\`\`\`text

State Allocated Utilized

Uttar Pradesh

Maharashtra

Bihar

Madhya Pradesh

\`\`\`

Use the project's neutral visual hierarchy.

Do not make every chart rainbow-colored.

The source specifically identifies allocated-vs-utilized state comparisons as a desired visualization.

\---

\# 17. INDIA / STATE RISK MAP

This is an important visual differentiator.

Use:

\`\`\`text

India SVG map

\`\`\`

States have risk levels.

Example:

\`\`\`text

Green = Low

Amber = Medium

Red = High

\`\`\`

When hovering over a state:

\`\`\`text

Madhya Pradesh

High Risk

58 flagged projects

Average Risk Score

72

View Details →

\`\`\`

The supplied design specifically proposes map-based geographic risk visualization and hover interaction.

\### IMPORTANT

The map must have actual purpose.

When the user clicks Madhya Pradesh:

\`\`\`text

→ Filter dashboard/projects to Madhya Pradesh

\`\`\`

It should not merely look impressive.

\---

\# 18. FLAGGED PROJECT TABLE

This is the bridge between macro and micro analysis.

Title:

\`\`\`text

AI Flagged Projects

\`\`\`

Subtitle:

\`\`\`text

Highest-risk projects requiring attention

\`\`\`

Show top 5 or 10.

Columns:

\`\`\`text

Project ID

Project Name

State

District

Allocated

Utilized

Risk Score

Risk Category

AI Findings

Status

Action

\`\`\`

Example:

\`\`\`text

MPLADS-2024-1187

Construction of Community Hall

Madhya Pradesh

Indore

₹48.5 L

92%

92

HIGH

Suspicious billing pattern

Under Review

View

\`\`\`

These columns closely follow the supplied specification.

\---

\# 19. RISK BADGE DESIGN

Never display only:

\`\`\`text

92

\`\`\`

Instead:

\`\`\`text

92 HIGH

\`\`\`

or:

\`\`\`text

● High Risk

92/100

\`\`\`

\### Rules

\`\`\`text

0–49 Low

50–79 Medium

80–100 High

\`\`\`

The project material repeatedly uses this three-tier model.

Use text + color.

Do \*\*not\*\* rely on color alone.

\---

\# 20. AI INSIGHTS PANEL

Add a panel called:

\`\`\`text

AI Insights

\`\`\`

Example:

\`\`\`text

High-risk projects increased by 35%

over the last 3 months.

Recurring vendor patterns detected

across 124 projects.

18 projects show significant gaps

between financial and physical progress.

7 districts require enhanced monitoring.

\`\`\`

The supplied project specification explicitly calls for AI-generated plain-language insights.

\---

\# 21. PROJECTS PAGE

This is the complete project directory.

Header:

\`\`\`text

Project Monitoring

Search and analyze MPLADS works across

states, districts and constituencies.

\`\`\`

\---

\## Filter bar

Filters:

\`\`\`text

Search

State

District

MP

Work Category

Project Status

Risk Level

Date Range

\`\`\`

Example:

\`\`\`text

State: Madhya Pradesh

District: Sehore

Risk: High

Status: Ongoing

\`\`\`

The source explicitly requires filtering by State, District, MP, Project Status and Risk Level.

\---

\# 22. TABLE / CARD TOGGLE

Provide:

\`\`\`text

\[ Table \] \[ Grid \]

\`\`\`

\### Table view

Optimized for professional users.

\### Grid view

Useful for visually browsing project information.

The supplied design specification explicitly proposes a table/card toggle.

\---

\# 23. PROJECT CARD

Each project card should include:

\`\`\`text

Project Name

Project ID

District • State

Work Category

Sanctioned Amount

₹XX,XX,XXX

Physical Progress

████████░░ 40%

Expenditure

85%

Risk

82/100 HIGH

Status

Delayed

\[ View Project \]

\`\`\`

Do not put 20 fields on the card.

The card is for scanning.

The detailed page contains the rest.

\---

\# 24. PROJECT DETAIL PAGE

THIS IS THE MOST IMPORTANT PAGE IN THE ENTIRE PROJECT.

This screen demonstrates your real innovation.

The source explicitly describes the project detail page as the core feature for AI explainability and officer intervention.

\---

\# 25. PROJECT DETAIL HEADER

Example:

\`\`\`text

Road Construction – Sehore

🔴 HIGH RISK

Project ID: MP-2024-1001

District: Sehore

Work Type: Road

MP: \[Name\]

Executing Agency: \[Agency\]

\`\`\`

Provide breadcrumb:

\`\`\`text

Dashboard

/

Project Monitoring

/

MP-2024-1001

\`\`\`

\---

\# 26. PROJECT QUICK KPI ROW

Display:

\`\`\`text

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

\`\`\`

These examples are based on the supplied frontend specification.

\---

\# 27. FINANCIAL VS PHYSICAL PROGRESS

This visualization is extremely important.

Display:

\`\`\`text

Financial Progress

85%

█████████████████░░░

Physical Progress

40%

████████░░░░░░░░░░░

\`\`\`

Then:

\`\`\`text

Financial–Physical Progress Gap

45 percentage points

\`\`\`

Below:

\> Expenditure is significantly higher than reported physical progress.

This immediately tells the judge why the system is useful.

\---

\# 28. AI RISK ANALYSIS PANEL

Use a three-column structure.

\### Column 1 — Risk Score

Large visual:

\`\`\`text

82

/100

HIGH RISK

\`\`\`

Use a donut/circular chart.

The supplied design specifically proposes a large circular risk score visualization.

\---

\# 29. COLUMN 2 — WHY IS THIS PROJECT FLAGGED?

Title:

\`\`\`text

Why is this project flagged?

\`\`\`

Display four findings.

\### Finding 1

⚠

\`\`\`text

Expenditure (85%) is significantly

higher than physical progress (40%).

\`\`\`

\### Finding 2

⚠

\`\`\`text

Project delay of 4 months detected.

\`\`\`

\### Finding 3

⚠

\`\`\`text

Abnormal payment pattern identified.

\`\`\`

\### Finding 4

⚠

\`\`\`text

Similar projects found in nearby

locations.

Duplicate probability: 65%

\`\`\`

These example reasons directly reflect the supplied project design.

\---

\# 30. COLUMN 3 — AI PREDICTIONS

Show structured model outputs.

\`\`\`text

Delay Probability

78%

Cost Overrun Risk

65%

Anomaly Score

82

\`\`\`

The source specifies these example prediction outputs.

\---

\# 31. COST OVERRUN PREDICTION

Show:

\`\`\`text

Predicted Final Cost

₹23,60,000

Estimated Overrun

18%

\`\`\`

And text:

\> Model predicts final project cost will exceed the sanctioned amount based on current expenditure trajectory and historical project patterns.

Important:

Do not say:

\> "AI has proven fraud."

Instead say:

\> "AI detected a high-risk pattern requiring verification."

This is much more appropriate for the product.

\---

\# 32. TIME OVERRUN PREDICTION

Display:

\`\`\`text

Expected Completion

August 2026

Estimated Delay

4 Months

\`\`\`

Then:

\> Physical progress and elapsed project time indicate elevated delay risk.

The original blueprint describes exactly this type of predictive presentation.

\---

\# 33. SUSPICIOUS TRANSACTION SECTION

Add:

\`\`\`text

Transaction Anomaly

\`\`\`

Example table:

\`\`\`text

Date Vendor Amount Status

\----------------------------------------------------

14 Aug Vendor A ₹5,00,000 ⚠ Flagged

14 Aug Vendor A ₹5,00,000 ⚠ Flagged

15 Aug Vendor A ₹5,00,000 ⚠ Flagged

\`\`\`

Then:

\`\`\`text

Pattern detected:

3 identical payments released within 48 hours.

\`\`\`

The project source gives this type of suspicious billing scenario as the intended AI explanation.

\---

\# 34. RECOMMENDED ACTION

Create a dedicated section.

\`\`\`text

Recommended Action

\`\`\`

Example:

\> Field verification recommended. Check reported physical progress and payment records before further disbursement.

This should be visually prominent but not alarming.

\---

\# 35. ACTION BUTTONS

Buttons:

\`\`\`text

\[ Request Audit \]

\[ Halt Vendor Payment \]

\[ Mark Resolved \]

\`\`\`

Optional:

\`\`\`text

\[ Mark False Positive \]

\[ Assign for Inspection \]

\[ View Documents \]

\[ View Geo-tagged Photos \]

\`\`\`

The supplied specification explicitly identifies these actions.

\---

\# 36. REQUEST AUDIT MODAL

When the officer clicks:

\`\`\`text

Request Audit

\`\`\`

open modal:

\`\`\`text

Request Field Audit

Project:

Road Construction – Sehore

Assign Officer:

\[ Select Officer ▼ \]

Priority:

\[ High ▼ \]

Reason:

\[ textarea \]

Additional Instructions:

\[ textarea \]

\[ Cancel \] \[ Submit Request \]

\`\`\`

After submission:

\`\`\`text

Audit request created successfully.

Project status changed to Under Review.

\`\`\`

\---

\# 37. HALT VENDOR PAYMENT MODAL

This should be a stronger confirmation.

\`\`\`text

Halt Vendor Payment?

You are about to place the associated

vendor payment workflow on hold.

Reason:

\[ textarea \]

\[ Cancel \]

\[ Confirm Halt \]

\`\`\`

After confirmation:

\`\`\`text

Vendor payment status:

HALTED

\`\`\`

The frontend must visibly change state.

That change is important in the SIH demo.

\---

\# 38. MARK RESOLVED

Modal:

\`\`\`text

Mark Project Resolved

Resolution Notes:

\[ textarea \]

Supporting Reference:

\[ optional \]

\[ Cancel \]

\[ Confirm Resolution \]

\`\`\`

After:

\`\`\`text

Project Status

Resolved

Resolved by:

State Nodal Officer

Resolved at:

06 Sep 2026, 10:42 AM

\`\`\`

\---

\# 39. COMPLIANCE / AUDIT TRAIL

This page proves accountability.

Example timeline:

\`\`\`text

06 Sep 2026

10:42 AM

State Nodal Officer

Requested Field Audit

Reason:

Mismatch between expenditure and physical progress.

\------------------------------------------------

05 Sep 2026

04:18 PM

AI Risk Engine

Updated Risk Score

68 → 82

Reason:

New transaction anomaly detected.

\------------------------------------------------

01 Sep 2026

11:02 AM

System

Project flagged

Reason:

Financial-progress mismatch.

\`\`\`

The source specifically recommends maintaining an audit/compliance trail whenever an officer takes action.

\---

\# 40. RISK & ALERTS PAGE

This should behave like an investigation inbox.

Header:

\`\`\`text

AI Risk & Alerts

Prioritize projects requiring investigation.

\`\`\`

Tabs:

\`\`\`text

All

High Risk

Medium Risk

Low Risk

Unresolved

Under Review

Resolved

\`\`\`

Each alert:

\`\`\`text

HIGH RISK

92/100

Construction of Community Hall

Indore, Madhya Pradesh

Triggered by:

• 94% expenditure

• 31% physical progress

• Vendor payment anomaly

Detected:

2 hours ago

\[ Investigate \]

\`\`\`

\---

\# 41. FUND UTILIZATION PAGE

Purpose:

Show where money is going.

Sections:

\`\`\`text

Fund Overview

Allocated

Released

Utilized

Remaining

\`\`\`

Charts:

\`\`\`text

Allocated vs Released vs Expenditure

Monthly Expenditure

State-wise Utilization

District-wise Utilization

\`\`\`

Add a special section:

\`\`\`text

High Expenditure / Low Progress

\`\`\`

This is particularly useful because it directly connects financial data to anomaly detection.

\---

\# 42. GIS MAP PAGE

This should be a dedicated investigation map.

Layout:

\`\`\`text

┌──────────────────────┬─────────────────────────┐

│ Filters │ │

│ │ │

│ State │ MAP │

│ District │ │

│ Risk Level │ │

│ Work Category │ │

│ │ │

└──────────────────────┴─────────────────────────┘

\`\`\`

Map interaction:

\`\`\`text

Hover

→ State summary

Click

→ Filter projects

Double click / detail

→ District view

\`\`\`

Selected state panel:

\`\`\`text

Madhya Pradesh

Projects

4,281

High Risk

58

Average Risk

64

Funds Utilized

74.2%

\[ View Projects \]

\`\`\`

\---

\# 43. ANALYTICS PAGE

This is a secondary advanced analytics section.

Recommended cards/charts:

\`\`\`text

Risk by State

Risk by District

Risk by Work Category

Cost Overrun Distribution

Delay Distribution

Vendor Anomaly Frequency

Financial vs Physical Progress Gap

Monthly Risk Trend

\`\`\`

Optional:

\`\`\`text

Model Performance

\`\`\`

But only include this if real model evaluation data exists.

Do not invent accuracy values merely for visual appeal.

\---

\# 44. REPORTS PAGE

Prototype functionality:

\`\`\`text

Generate Report

Report Type:

\[ State Monitoring Report ▼ \]

State:

\[ Madhya Pradesh ▼ \]

Date Range:

\[ Jan 2026 – Sep 2026 \]

Risk Level:

\[ All ▼ \]

\[ Generate Report \]

\`\`\`

Report preview can contain:

\`\`\`text

Executive Summary

Financial Overview

Project Statistics

High Risk Projects

AI Findings

Officer Actions

\`\`\`

Add:

\`\`\`text

Download PDF

Export CSV

\`\`\`

For the first prototype these can be mocked or disabled gracefully if backend export is not ready.

\---

\# 45. USER MANAGEMENT

Secondary prototype page.

Table:

\`\`\`text

Name

Role

State

District

Status

Last Active

Action

\`\`\`

Roles:

\`\`\`text

Ministry Official

State Nodal Officer

District Authority

Field Officer

\`\`\`

The project discussions specifically considered role-based access where different administrative levels see different scopes.

\---

\# 46. SETTINGS

Include:

\`\`\`text

Profile

Notification Preferences

Dashboard Preferences

Risk Thresholds

System Information

\`\`\`

Risk thresholds can display:

\`\`\`text

Low: 0–49

Medium: 50–79

High: 80–100

\`\`\`

For the prototype these can be visual settings rather than editable backend configuration.

\---

\# 47. FRONTEND DATA MODEL

The frontend must be designed against structured objects.

\### Project

\`\`\`javascript

{

projectId: "MP-2024-1001",

projectName: "Road Construction - Sehore",

state: "Madhya Pradesh",

district: "Sehore",

constituency: "Sehore",

mpName: "Sample MP",

workCategory: "Road",

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

flagReasons: \[

"Expenditure is significantly higher than physical progress",

"Project delay detected",

"Abnormal payment pattern identified",

"Similar projects detected nearby"

\],

lastScoredAt: "2026-09-06T09:30:00Z"

}

}

\`\`\`

The supplied backend design contains essentially these project and AI fields.

\---

\# 48. TRANSACTION DATA

Use:

\`\`\`javascript

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

\`\`\`

The supplied backend blueprint defines these transaction concepts for fraud/anomaly detection.

\---

\# 49. API CONTRACT

Build the frontend as though the backend already exists.

Initially use mock services.

Later replace them with actual API calls.

Expected endpoints from the project specification:

\`\`\`text

GET /api/projects/dashboard-stats

GET /api/projects/flagged

POST /api/projects/:id/action

\`\`\`

The source specifies these endpoints and their intended purposes.

Possible additional frontend-friendly endpoints:

\`\`\`text

GET /api/projects

GET /api/projects/:id

GET /api/projects/:id/transactions

GET /api/risk-alerts

GET /api/compliance

GET /api/analytics

GET /api/map

\`\`\`

These additional endpoints are implementation recommendations for keeping the frontend clean; they are not explicitly defined by the supplied document.

\---

\# 50. MOCK API LAYER

During frontend development:

\`\`\`text

Component

↓

Service

↓

Mock JSON

\`\`\`

Later:

\`\`\`text

Component

↓

Service

↓

Express API

↓

MongoDB / AI Service

\`\`\`

Do NOT write:

\`\`\`javascript

const projects = \[...\]

\`\`\`

inside the actual page component.

Instead:

\`\`\`text

mock/projects.js

services/projectService.js

pages/Projects.jsx

\`\`\`

This makes backend integration much easier.

\---

\# 51. FRONTEND FOLDER STRUCTURE

Use something close to:

\`\`\`text

src/

│

├── components/

│ ├── layout/

│ │ ├── AppShell.jsx

│ │ ├── Sidebar.jsx

│ │ └── TopHeader.jsx

│ │

│ ├── common/

│ │ ├── Button.jsx

│ │ ├── Modal.jsx

│ │ ├── Badge.jsx

│ │ ├── ProgressBar.jsx

│ │ ├── EmptyState.jsx

│ │ ├── LoadingState.jsx

│ │ └── Toast.jsx

│ │

│ ├── dashboard/

│ │ ├── StatCard.jsx

│ │ ├── RiskTrendChart.jsx

│ │ ├── FundChart.jsx

│ │ ├── RiskMap.jsx

│ │ └── FlaggedProjectsTable.jsx

│ │

│ ├── projects/

│ │ ├── ProjectFilters.jsx

│ │ ├── ProjectTable.jsx

│ │ ├── ProjectCard.jsx

│ │ ├── ProjectHeader.jsx

│ │ ├── ProjectMetrics.jsx

│ │ ├── FinancialProgress.jsx

│ │ ├── RiskAnalysis.jsx

│ │ ├── AIReasonList.jsx

│ │ ├── PredictionCards.jsx

│ │ ├── TransactionsTable.jsx

│ │ └── ActionToolbar.jsx

│ │

│ ├── risk/

│ │ ├── RiskBadge.jsx

│ │ ├── AlertCard.jsx

│ │ └── RiskFilters.jsx

│ │

│ └── compliance/

│ └── AuditTimeline.jsx

│

├── pages/

│ ├── Login.jsx

│ ├── Dashboard.jsx

│ ├── Projects.jsx

│ ├── ProjectDetails.jsx

│ ├── RiskAlerts.jsx

│ ├── FundUtilization.jsx

│ ├── Analytics.jsx

│ ├── GISMap.jsx

│ ├── Reports.jsx

│ ├── Compliance.jsx

│ ├── Users.jsx

│ └── Settings.jsx

│

├── services/

│ ├── api.js

│ ├── projectService.js

│ ├── dashboardService.js

│ ├── riskService.js

│ └── complianceService.js

│

├── mock/

│ ├── dashboard.js

│ ├── projects.js

│ ├── transactions.js

│ ├── alerts.js

│ └── analytics.js

│

├── hooks/

├── context/

├── utils/

├── assets/

│

├── App.jsx

└── main.jsx

\`\`\`

\---

\# 52. REQUIRED COMPONENTS

At minimum create reusable:

\`\`\`text

AppShell

Sidebar

TopHeader

StatCard

RiskBadge

StatusBadge

ProjectTable

ProjectCard

ProjectFilters

RiskScoreRing

ProgressBar

RiskTrendChart

FundUtilizationChart

IndiaRiskMap

AIInsightPanel

AlertCard

AIReasonList

PredictionCard

TransactionTable

ActionToolbar

ActionModal

AuditTimeline

Toast

LoadingSkeleton

EmptyState

ErrorState

\`\`\`

Do not duplicate similar components across pages.

\---

\# 53. STATE MANAGEMENT

The frontend should manage:

\`\`\`text

Authenticated user

Current role

Selected state

Selected district

Global date range

Project filters

Selected project

Notifications

Action submission state

Dashboard data

\`\`\`

For a prototype, React Context/state can be enough.

Do not introduce an overly complicated state-management architecture unless necessary.

\---

\# 54. RESPONSIVE DESIGN

\### Desktop

Primary target.

Expected viewport:

\`\`\`text

1440 × 900

\`\`\`

The dashboard should look excellent here.

\### Laptop

Must remain fully usable around:

\`\`\`text

1280 × 720

\`\`\`

\### Tablet

Sidebar collapses.

Cards become two columns.

\### Mobile

Use:

\`\`\`text

hamburger menu

single-column sections

horizontal-scroll tables where unavoidable

stacked KPI cards

\`\`\`

But remember:

\*\*The primary user is an officer using a desktop/laptop.\*\*

Do not sacrifice desktop density just to make a mobile landing page.

\---

\# 55. LOADING STATES

Every major asynchronous component needs loading UX.

For KPI:

\`\`\`text

████████

████

\`\`\`

For tables:

Skeleton rows.

For chart:

Chart skeleton.

For map:

Map loading placeholder.

Never show a totally blank white area while data is loading.

\---

\# 56. ERROR STATES

Example:

\`\`\`text

Unable to load project data.

The monitoring service did not respond.

\[ Retry \]

\`\`\`

Do not display raw backend errors.

\---

\# 57. EMPTY STATES

Example:

\`\`\`text

No projects match the selected filters.

Try changing the district, risk level or date range.

\`\`\`

\---

\# 58. ACTION SUCCESS

After:

\`\`\`text

Request Audit

\`\`\`

show:

\`\`\`text

✓ Audit request submitted successfully.

Project status updated to Under Review.

\`\`\`

For Halt:

\`\`\`text

✓ Vendor payment workflow placed on hold.

\`\`\`

For Resolve:

\`\`\`text

✓ Project marked as resolved.

\`\`\`

Use toasts plus visible state changes.

\---

\# 59. ANIMATION RULES

Keep animation subtle.

Allowed:

\* Chart entrance

\* Hover elevation

\* Sidebar transition

\* Modal transition

\* Toast appearance

\* Risk indicator animation

\* Map hover

Avoid:

\* Constant pulsing everywhere

\* Flying cards

\* Excessive page transitions

\* Animated background

\* Loading effects that resemble a gaming interface

Government monitoring software should feel stable.

\---

\# 60. IMPORTANT AI LANGUAGE RULE

The UI should never claim:

\> "This project is fraudulent."

Unless the backend actually establishes something that legally supports that claim.

Use:

\`\`\`text

AI flagged

Potential anomaly

Elevated risk

Suspicious pattern

Requires verification

Investigation recommended

Possible duplicate

Unusual payment behavior

\`\`\`

The system is primarily a \*\*decision-support and triage platform\*\*.

That makes the product concept more credible.

\---

\# 61. SIH DEMO FLOW — THIS MUST WORK PERFECTLY

This is the flow the frontend developer must test repeatedly.

\## Step 1

Open:

\`\`\`text

/login

\`\`\`

Login as:

\`\`\`text

State Nodal Officer

\`\`\`

\---

\## Step 2

Automatically navigate to:

\`\`\`text

/dashboard

\`\`\`

Judge sees:

\`\`\`text

High Risk Projects: 427

\`\`\`

\---

\## Step 3

Judge sees the India map.

Madhya Pradesh appears as elevated risk.

Click:

\`\`\`text

Madhya Pradesh

\`\`\`

\---

\## Step 4

Projects are filtered.

Example:

\`\`\`text

Road Construction – Sehore

82/100 HIGH

\`\`\`

\---

\## Step 5

Click:

\`\`\`text

View

\`\`\`

Open:

\`\`\`text

/projects/MP-2024-1001

\`\`\`

\---

\## Step 6

Immediately show:

\`\`\`text

82 / 100

HIGH RISK

\`\`\`

Then:

\`\`\`text

Expenditure: 85%

Physical Progress: 40%

\`\`\`

\---

\## Step 7

Show AI explanation:

\`\`\`text

Why is this project flagged?

• Financial-progress mismatch

• Four-month project delay

• Abnormal payment pattern

• Similar project detected nearby

\`\`\`

\---

\## Step 8

Show:

\`\`\`text

Delay Probability: 78%

Cost Overrun Risk: 65%

Anomaly Score: 82

\`\`\`

\---

\## Step 9

Open transaction evidence:

\`\`\`text

3 identical payments

within 48 hours

\`\`\`

\---

\## Step 10

Judge understands the problem.

Then click:

\`\`\`text

Request Audit

\`\`\`

\---

\## Step 11

Officer assignment modal appears.

Submit.

\---

\## Step 12

Project changes:

\`\`\`text

HIGH RISK

\`\`\`

to:

\`\`\`text

UNDER REVIEW

\`\`\`

And the Compliance page gets a new entry:

\`\`\`text

Field audit requested

by State Nodal Officer

\`\`\`

That final step is critical.

It proves the system does something rather than merely displaying charts.

\---

\# 62. DEMO PROJECT DATA

At least 10–20 manually designed projects should exist in the initial frontend prototype.

Among them, deliberately include:

\### Normal project

\`\`\`text

Expenditure: 45%

Physical Progress: 48%

Risk: 22

\`\`\`

\### Cost risk

\`\`\`text

Expenditure: 92%

Physical Progress: 60%

Risk: 78

\`\`\`

\### Delay risk

\`\`\`text

Time elapsed: 90%

Physical progress: 48%

Risk: 81

\`\`\`

\### Financial-progress anomaly

\`\`\`text

Expenditure: 85%

Physical progress: 40%

Risk: 82

\`\`\`

\### Vendor anomaly

\`\`\`text

3 identical payments

within 48 hours

Risk: 89

\`\`\`

\### Duplicate project

\`\`\`text

Similar title/location/vendor

Risk: 76

\`\`\`

\### Resolved project

\`\`\`text

Previous risk: 88

Status: Resolved

\`\`\`

This gives the frontend developer realistic scenarios to test every UI state.

The source itself proposes synthetic data with intentionally injected anomalies such as high expenditure/low progress and duplicate vendor/payment patterns.

\---

\# 63. WHAT THE BACKEND/AI WILL EVENTUALLY PROVIDE

The frontend should be ready to consume:

\### Cost prediction

\`\`\`text

Predicted final cost

Cost overrun percentage

Cost risk probability

\`\`\`

\### Time prediction

\`\`\`text

Expected completion

Predicted delay

Delay probability

\`\`\`

\### Anomaly detection

\`\`\`text

Anomaly score

Flag type

Evidence

\`\`\`

\### Overall risk

\`\`\`text

0–100 risk score

Risk category

Reasons

\`\`\`

The project architecture proposes supervised models such as Random Forest/XGBoost for cost/time prediction and Isolation Forest for unsupervised anomaly detection.

The frontend developer \*\*does not need to implement these models\*\*.

The frontend only needs to display their outputs correctly.

\---

\# 64. WHAT THE FRONTEND SHOULD NOT DO

Do not:

\* Train ML models inside React.

\* Put heavy data-processing logic inside components.

\* Hardcode all data inside JSX.

\* Build every page independently.

\* Make the UI dependent on a specific backend implementation.

\* Claim AI proves fraud.

\* Copy an official website.

\* Make the dashboard look like a cryptocurrency analytics platform.

\* Overuse animations.

\* Create fake model accuracy metrics.

\* Display meaningless charts merely because "SIH needs AI."

Every visualization should answer a question.

\---

\# 65. CHART DESIGN PRINCIPLE

Every chart must answer one question.

\### Risk Trend

\> Is project risk increasing?

\### Fund Utilization

\> Where is allocated money actually being used?

\### Geographic Map

\> Where are risk concentrations?

\### Financial vs Physical Progress

\> Is money being spent faster than actual work is progressing?

\### Vendor chart

\> Are specific vendors showing unusual payment behavior?

That is far stronger than having 15 decorative charts.

\---

\# 66. ACCESSIBILITY

Use:

\* Strong contrast

\* Visible focus states

\* Proper button labels

\* Text alongside colors

\* Keyboard-accessible modals

\* Accessible table headers

\* Tooltips that explain charts

\* No critical information communicated through color alone

For example:

Bad:

\`\`\`text

🟥

\`\`\`

Good:

\`\`\`text

● High Risk

82/100

\`\`\`

\---

\# 67. GOVERNMENT-STYLE CONTENT LANGUAGE

Use:

\`\`\`text

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

\`\`\`

Avoid:

\`\`\`text

Woohoo!

Awesome!

Growth hacking!

Fraud score!

AI magic!

\`\`\`

The interface should feel institutional.

\---

\# 68. VISUAL PRIORITY

The user should naturally look at the dashboard in this order:

\`\`\`text

1\. High Risk KPI

↓

2\. Risk Map

↓

3\. Flagged Projects

↓

4\. Risk Score

↓

5\. AI Reasoning

↓

6\. Recommended Action

\`\`\`

This is the intended officer workflow reflected across the supplied specification.

\---

\# 69. SIH JUDGE EXPERIENCE

A judge should be able to understand the project without the team having to explain every UI element.

The visual narrative should be:

\> "Here is the national/state monitoring picture."

↓

\> "AI identifies the areas where risk is concentrated."

↓

\> "Here are the specific problematic projects."

↓

\> "Here is exactly why this project was flagged."

↓

\> "Here is the evidence."

↓

\> "Here is the recommended action."

↓

\> "The officer can initiate that action."

↓

\> "The action becomes part of the compliance trail."

That is the core product story.

\---

\# 70. TECHNICAL FRONTEND STACK

Recommended:

\`\`\`text

React

Vite

Tailwind CSS

React Router

Recharts

react-simple-maps

Lucide React

Axios

\`\`\`

Optional:

\`\`\`text

React Context

date-fns

\`\`\`

Do not install 30 libraries unnecessarily.

The original blueprint specifically recommends React with Tailwind and Recharts, with a map solution such as react-simple-maps.

\---

\# 71. FRONTEND DEVELOPMENT ORDER

The developer should \*\*not\*\* build all pages randomly.

Build in this exact order.

\### Phase 1 — Foundation

\`\`\`text

Vite setup

Tailwind

Routing

AppShell

Sidebar

TopHeader

Global theme

\`\`\`

\### Phase 2 — Login

\`\`\`text

Login

Mock authentication

Role selection

\`\`\`

\### Phase 3 — Dashboard

\`\`\`text

KPI cards

Risk chart

Fund chart

Map

Flagged project table

AI insights

\`\`\`

\### Phase 4 — Projects

\`\`\`text

Project filters

Project table

Project cards

Search

Risk badges

\`\`\`

\### Phase 5 — Project Detail

\`\`\`text

Project header

Metrics

Financial-progress comparison

Risk score

AI reasoning

Predictions

Transactions

Actions

\`\`\`

\### Phase 6 — Action workflow

\`\`\`text

Request Audit modal

Halt Payment modal

Resolve modal

Toasts

State updates

\`\`\`

\### Phase 7 — Risk & Alerts

\`\`\`text

Risk queue

Filters

Alert cards

\`\`\`

\### Phase 8 — Compliance

\`\`\`text

Audit timeline

Action history

\`\`\`

\### Phase 9 — GIS

\`\`\`text

Interactive map

State filters

District drill-down

\`\`\`

\### Phase 10 — Secondary pages

\`\`\`text

Fund Utilization

Analytics

Reports

Users

Settings

\`\`\`

\### Phase 11 — Polish

\`\`\`text

Responsive behavior

Loading states

Empty states

Error states

Accessibility

Animations

Spacing

Typography

\`\`\`

\---

\# 72. DEFINITION OF DONE

The frontend is considered complete only when:

\### Application

\`\`\`text

✓ Login works

✓ Routing works

✓ Sidebar works

✓ Header works

✓ Dashboard loads

✓ Project listing loads

✓ Filters work

✓ Search works

✓ Risk badges work

✓ Map interaction works

✓ Project details work

✓ AI reasoning is visible

✓ Prediction cards work

✓ Transaction evidence works

✓ Action modals work

✓ Status changes work

✓ Compliance entry appears

✓ Loading states exist

✓ Error states exist

✓ Responsive layout works

\`\`\`

\### SIH Demo

A developer must be able to execute this without manually changing code:

\`\`\`text

Login

→ Dashboard

→ Madhya Pradesh

→ Sehore

→ Road Construction

→ Risk 82

→ AI Explanation

→ Transaction anomaly

→ Request Audit

→ Under Review

→ Compliance Entry

\`\`\`

\---

\# 73. MOST IMPORTANT DESIGN DECISION

Do \*\*not\*\* make the dashboard the entire product.

The dashboard is the entry point.

The real product is:

\`\`\`text

Dashboard

↓

Detection

↓

Investigation

↓

Explanation

↓

Decision

↓

Action

↓

Audit Trail

\`\`\`

That is what should differentiate this project from a simple MPLADS statistics website.

\---

\# 74. FINAL HANDOFF INSTRUCTION TO THE FRONTEND DEVELOPER

You are building an \*\*original Government of India-style AI monitoring and investigation dashboard for MPLADS implementation\*\*.

Use official-government platforms such as MoSPI/eSAKSHI as \*\*visual and information-architecture inspiration only\*\*. Do not copy any existing website.

The UI must combine:

\`\`\`text

Government credibility

-

High-density analytics

-

AI explainability

-

Risk visualization

-

Project-level investigation

-

Officer action workflow

-

Compliance tracking

\`\`\`

The most important pages are:

\`\`\`text

1\. Login

2\. Dashboard

3\. Project Monitoring

4\. Project Detail / AI Investigation

5\. Risk & Alerts

6\. GIS Risk Map

7\. Compliance

\`\`\`

The most important visual components are:

\`\`\`text

KPI cards

Risk badges

Risk trend

Fund utilization chart

India/state risk map

Flagged project table

Risk score donut

Financial vs physical progress comparison

AI findings

Prediction cards

Transaction anomaly table

Action toolbar

Audit timeline

\`\`\`

The most important interaction is:

\`\`\`text

Find risky project

→ understand why

→ inspect evidence

→ take action

→ update status

→ record action

\`\`\`

Do not build a static dashboard.

Build a \*\*demonstrable monitoring workflow\*\*.

The source material describes the intended system as a MERN application with a dedicated Python AI service, where Node/Express orchestrates the data and the AI service provides risk/prediction outputs. The frontend therefore needs to remain cleanly separated from those implementation details and consume structured API data.

The supplied implementation strategy also explicitly envisions a realistic synthetic dataset and a live-looking SIH demonstration where a high-risk project is discovered, explained and acted upon.

\---

\# 75. ONE-LINE PRODUCT DESCRIPTION FOR THE DEVELOPER

\> \*\*"Build a modern, government-grade MPLADS monitoring dashboard where officers can see overall implementation health, locate AI-detected risks geographically, drill into suspicious projects, understand the AI's reasoning and predictions, inspect financial/physical evidence, initiate corrective actions and maintain an auditable compliance trail."\*\*

This is the frontend target.

And importantly, this specification is designed around the goal reflected across your previous project discussions: \*\*not merely making something technically functional, but making the SIH judges immediately understand the problem, see the AI value, see the evidence, and see the action happen on screen.\*\* The original project notes repeatedly emphasize exactly that progression from macro monitoring to an AI-flagged project and then to officer intervention.