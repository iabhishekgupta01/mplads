# MPLADS AI MONITORING SYSTEM — LANDING PAGE REBUILD MASTER PROMPT
## SIH 26102 | Existing project: https://mplads-bay.vercel.app/

You are a senior UI/UX designer, React engineer, frontend architect and interaction designer.

I already have an existing React frontend for my SIH project. The current landing page is not good enough. I do NOT want you to make small cosmetic edits to it.

## CORE INSTRUCTION

**DELETE/REMOVE THE EXISTING LANDING PAGE IMPLEMENTATION and RECREATE THE PUBLIC LANDING PAGE FROM SCRATCH inside the existing project.**

Do NOT delete the authenticated dashboard, project pages, API/mock services, routing needed by the portal, or other working application functionality.

Only replace/refactor the PUBLIC LANDING PAGE and its dedicated supporting components/styles/assets.

The new landing page should take strong visual inspiration from the supplied myScheme screenshot and the current myScheme website, especially its:

- government-service visual language;
- clean hero composition;
- large human/public-service visual;
- green/white civic palette;
- decorative dotted and organic backgrounds;
- icon-based category presentation;
- statistics row;
- "How it works" process section;
- About section;
- FAQ accordion;
- substantial government-style footer;
- restrained scroll/entrance effects.

Also take broad design inspiration from Digital India and MyGov for government identity, accessibility, structured information hierarchy, navigation and public-service presentation.

IMPORTANT:
Do not clone any site.
Do not copy HTML/CSS.
Do not copy exact text.
Do not use myScheme branding.
Do not create a pixel-for-pixel duplicate.

The goal is:
**"myScheme-quality landing page, but for MPLADS AI Monitoring."**

The landing page must clearly communicate that this platform is for AI-assisted monitoring, anomaly detection, project investigation, officer action and accountability.

---

# 1. PRODUCT

Name:

**MPLADS AI Monitoring System**

SIH Problem Statement ID:

**26102**

Concept:

> An AI-assisted monitoring and decision-support platform for MPLADS implementation that combines project, financial, physical-progress, timeline and transaction signals to identify potential risks, explain why they matter, and help authorized officers initiate appropriate action.

Core flow:

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

The landing page must teach this flow.

---

# 2. WHAT THE LANDING PAGE MUST ACHIEVE

Within a few seconds, a visitor should know:

1. What the platform is.
2. What problem it solves.
3. Why AI is useful here.
4. What an officer can do with it.
5. How the monitoring workflow works.
6. Why it is different from a basic dashboard.
7. How to enter the actual monitoring portal.

Do not make the visitor read a long paragraph to understand the idea.

---

# 3. IMPORTANT DESIGN INSPIRATION

Study the structure and visual rhythm of:

## myScheme
https://www.myscheme.gov.in/

Important ideas to adapt:

- government identity;
- strong visual hero;
- clean search/discovery CTA concept;
- statistics row;
- category/icon presentation;
- easy 3-step process;
- About section;
- FAQ;
- useful-links footer;
- green/mint visual accents;
- subtle decorative background graphics.

The current myScheme homepage contains a government-style header, hero imagery, a "Find Schemes For You" discovery CTA, counts, categories, an "Easy steps" process, About, FAQ and a large footer. Use that overall rhythm as inspiration.

## MyGov
https://www.mygov.in/

Adapt:

- accessibility controls;
- government identity;
- search;
- structured footer;
- public-service information hierarchy;
- state/country navigation patterns.

## Digital India
https://www.digitalindia.gov.in/

Adapt:

- national digital-service feeling;
- civic technology language;
- modern government identity;
- strategic use of imagery and content sections.

Do not copy visual assets or exact page layouts.

---

# 4. THE NEW LANDING PAGE MUST BE REBUILT

Do this first.

Suggested implementation:

```text
src/pages/LandingPage.jsx

src/components/landing/
  GovernmentUtilityBar.jsx
  LandingHeader.jsx
  HeroSection.jsx
  HeroVisual.jsx
  HeroDashboardPreview.jsx
  TrustStrip.jsx
  ChallengeSection.jsx
  SignalGapVisual.jsx
  WorkflowSection.jsx
  WorkflowStep.jsx
  CapabilitiesSection.jsx
  CapabilityFeature.jsx
  ExplainableAISection.jsx
  RiskPreview.jsx
  RolesSection.jsx
  GeographicSection.jsx
  ScaleSection.jsx
  ArchitectureSection.jsx
  ImpactSection.jsx
  FAQSection.jsx
  FAQItem.jsx
  LandingCTA.jsx
  LandingFooter.jsx
  AccessibilityMenu.jsx
```

Create these as separate components rather than putting the entire page in one file.

---

# 5. EXISTING PROJECT PRESERVATION RULE

Before editing, inspect:

- package.json
- src/App.*
- routes
- existing LandingPage
- global CSS
- Tailwind configuration
- existing images
- public assets
- dashboard components
- auth routing
- mock services

Keep existing portal routes working.

The root route should become:

```text
/
  → LandingPage
```

The CTA should go to:

```text
/login
```

Authenticated portal remains:

```text
/dashboard
```

---

# 6. FINAL LANDING PAGE STRUCTURE

Use this exact section order:

```text
1. Government utility strip
2. Main navigation
3. Hero
4. Capability/trust strip
5. Monitoring challenge
6. Financial vs physical signal visual
7. How the platform works
8. AI capabilities
9. Explainable AI project preview
10. Officer roles
11. Geographic intelligence
12. Project-to-national scale
13. Technology/integration architecture
14. Impact/capabilities
15. FAQ
16. Final CTA
17. Government-style footer
```

This should feel like one continuous story.

---

# 7. PAGE VISUAL RHYTHM

Use different section treatments.

Do NOT make the entire page:

```text
white cards
white cards
white cards
```

Instead:

```text
Hero:
off-white + green organic visual

Trust:
white

Challenge:
white

Signal visual:
light mint

How it works:
very light green/mint

AI:
white

Explainability:
off-white

Roles:
white

Geographic:
very light mint

Scale:
white

Architecture:
off-white

Impact:
white

FAQ:
very light mint

CTA:
dark navy / green

Footer:
dark navy
```

This gives the page rhythm similar to polished public digital platforms.

---

# 8. COLOR PALETTE

Primary:

```text
#0F172A
```

Green:

```text
#10834B
```

Light green:

```text
#E8F7EE
```

Soft mint:

```text
#EFFAF3
```

Background:

```text
#F7FAF8
```

White:

```text
#FFFFFF
```

Text:

```text
#111827
```

Secondary text:

```text
#667085
```

Border:

```text
#E4E7EC
```

Saffron/gold accent:

```text
#C8902F
```

Risk high:

```text
#C62828
```

Risk medium:

```text
#D98A00
```

Risk low:

```text
#14804A
```

Do not turn the page into a red/green rainbow.

Green is the main public-service accent.

Risk colors are semantic only.

---

# 9. TYPOGRAPHY

Use:

```text
Inter
```

or:

```text
Roboto
```

Hero heading:

```text
44–56px desktop
```

Hero paragraph:

```text
18–21px
```

Section heading:

```text
30–38px
```

Body:

```text
16–18px
```

Navigation:

```text
14–15px
```

Small metadata:

```text
12–13px
```

Mobile:

```text
Hero:
34–40px

Section:
26–32px

Body:
15–17px
```

Do not make normal text tiny.

---

# 10. HEADER — GOVERNMENT STYLE

Create a compact upper utility strip.

Example:

```text
GOVERNMENT OF INDIA
|
MPLADS AI MONITORING SYSTEM
|
Accessibility
|
Help
```

Keep it small.

Do not put giant branding in the strip.

---

# 11. MAIN NAVBAR

Use:

```text
[Emblem/Identity] MPLADS AI Monitoring System

Overview
The Challenge
How It Works
AI Capabilities
About
FAQ

[ Access Monitoring Portal ]
```

On mobile:

```text
logo
hamburger
Access Portal
```

Navbar should be white / very light background.

On scroll:

- become slightly compact;
- subtle bottom shadow;
- retain readability.

Do NOT use heavy glassmorphism.

---

# 12. GOVERNMENT IDENTITY

If an official emblem asset already exists in the project, use it.

Otherwise use a restrained placeholder or project identity.

Do not use an unverified official seal.

Do not claim:

```text
Official Government of India platform
```

unless that is actually true.

Use:

```text
Prototype / Demonstration Environment
```

where appropriate.

---

# 13. HERO — RECREATE COMPLETELY

This is the most important visual section.

Do not reuse the existing hero markup.

Create a new one.

Desktop:

```text
┌───────────────────────────────────────────────────────────────┐
│ TOP NAV                                                       │
├───────────────────────────────┬───────────────────────────────┤
│                               │                               │
│ EYEBROW                       │       LARGE HERO VISUAL       │
│                               │                               │
│ Monitor What Matters.         │  Infrastructure / India      │
│ Investigate What Stands Out.  │  + subtle data overlays      │
│ Act Where Risk Emerges.       │                               │
│                               │                               │
│ explanatory copy              │  small metric bubbles        │
│                               │                               │
│ [Access Portal]               │  mini monitoring preview     │
│ [How It Works]                │                               │
│                               │                               │
└───────────────────────────────┴───────────────────────────────┘
```

Target hero height:

```text
560–680px
```

Do not make it 100vh.

---

# 14. HERO COPY

Eyebrow:

```text
MPLADS AI MONITORING SYSTEM
```

Main headline:

```text
Monitor What Matters.
Investigate What Stands Out.
Act Where Risk Emerges.
```

Supporting text:

```text
AI-assisted monitoring for MPLADS implementation that connects project progress, financial signals, transaction patterns and officer action in one unified view.
```

CTA:

```text
Access Monitoring Portal →
```

Secondary:

```text
Explore How It Works
```

Small supporting line:

```text
Project Monitoring • Risk Intelligence • Action Traceability
```

---

# 15. HERO VISUAL — MYSCHEME-INSPIRED APPROACH

The screenshot provided shows a large public-service family image integrated into an organic green composition.

For this project DO NOT use a family/insurance image.

Use an MPLADS-relevant visual.

Preferred visual:

- road/infrastructure;
- community development;
- public building;
- school;
- health facility;
- water infrastructure;
- officer reviewing development data.

The best approach is:

```text
large circular/organic infrastructure image
+
faint India geographic shape
+
green organic background
+
thin curved gold lines
+
small risk/data markers
```

---

# 16. HERO VISUAL COMPOSITION

Right side should roughly contain:

```text
             faint India outline

          ╭──────────────────╮
        ╱                      ╲
       │   infrastructure       │
       │       visual           │
        ╲                      ╱
          ╰──────────────────╯

   [82 Risk]         [85% Expenditure]

             [40% Physical]

        ┌─────────────────────┐
        │ MPLADS RISK OVERVIEW │
        │ 427 HIGH RISK       │
        │ small trend + map   │
        └─────────────────────┘
```

Do not overcrowd.

Only 2–4 data badges.

---

# 17. HERO BACKGROUND

This is a major requirement.

Use a layered background inspired by the light organic feel of myScheme.

Base:

```text
#F7FAF8
```

Then:

- pale mint organic shape;
- thin gold arc;
- very faint dotted grid;
- subtle India contour;
- tiny low-opacity data points.

Opacity of decorative shapes:

```text
3%–8%
```

Decorative objects should not compete with the headline.

---

# 18. HERO BACKGROUND — DO NOT USE

Absolutely avoid:

```text
purple-blue AI gradient
neon network
cyberpunk dots
glowing nodes
3D AI brain
robot
giant "AI" letters
dark sci-fi background
```

The product is civic technology, not a sci-fi product.

---

# 19. HERO ORGANIC SHAPES

Create 2–4 large soft shapes.

Example:

```text
pale green circle
pale mint irregular blob
thin gold ring
faint navy contour
```

They can overlap carefully.

No strong blur.

No glowing effect.

---

# 20. HERO DYNAMIC EFFECTS

I do want dynamic effects, but subtle ones.

Use:

### On initial page load

1. Hero text fade upward.
2. Hero image fade/slide in.
3. Data bubbles appear sequentially.
4. Mini risk preview appears.
5. CTA becomes active.

Duration:

```text
600–1000ms
```

After this:

STOP.

Do not keep looping.

---

# 21. HERO MICRO-MOTION

Optional:

- 2px image movement based on mouse position;
- 1–2px decorative line movement;
- slight parallax of a background pattern.

Very small.

Do not make the hero constantly move.

Respect `prefers-reduced-motion`.

---

# 22. HERO DASHBOARD PREVIEW

Create a small custom monitoring card.

Example:

```text
MPLADS RISK OVERVIEW

High Risk Projects
427

Fund Utilization
73.3%

Madhya Pradesh
58 high-risk cases

[small India map]

[mini risk line]
```

It must look like part of the hero visual.

---

# 23. HERO DATA BUBBLES

Use only 3:

```text
82
Risk Score

85%
Financial Progress

40%
Physical Progress
```

Optional fourth:

```text
3
Payment Signals
```

Keep typography readable.

---

# 24. HERO CTA STYLE

Primary button:

Green:

```text
#10834B
```

with white text.

Secondary:

white/transparent with navy border.

Radius:

```text
8–10px
```

Height:

```text
44–48px
```

No oversized capsule.

Hover:

- darken slightly;
- subtle shadow.

No scale animation.

---

# 25. TRUST STRIP

Immediately below hero:

```text
AI-Assisted Monitoring
|
Financial Visibility
|
Project Risk Intelligence
|
Action Traceability
```

It should look like a thin informational strip.

No 4 giant cards.

---

# 26. CHALLENGE SECTION

Heading:

```text
The Monitoring Challenge
```

Subheading:

```text
MPLADS implementation generates signals across finance, execution, timelines and transactions. The challenge is connecting these signals early enough to support informed action.
```

Main statement:

```text
When financial execution,
physical progress and
transaction behaviour diverge,
risk can be difficult to see.
```

Use a large typographic statement on one side and 4 supporting points on the other.

---

# 27. CHALLENGE POINTS

Use:

```text
01
Fragmented Signals

02
Delayed Detection

03
Limited Explainability

04
Action Gap
```

Each gets:

- number;
- title;
- 1–2 line text.

Do not make them identical colorful cards.

Use editorial layout.

---

# 28. SIGNAL GAP VISUAL

Show:

```text
FINANCIAL EXECUTION
85%

█████████████████░░░

PHYSICAL PROGRESS
40%

████████░░░░░░░░░░░

45 POINT GAP
```

Below:

```text
A mismatch like this can become a review signal.
```

Label it as illustrative/prototype data.

This section is important because it makes the AI idea concrete.

---

# 29. HOW IT WORKS SECTION

Heading:

```text
How the Monitoring System Works
```

Use a layout inspired by myScheme's clear step-by-step section.

Steps:

### 01 — MONITOR

Projects, funds, execution progress and timelines come together in one view.

### 02 — DETECT

AI identifies unusual patterns and elevated-risk signals.

### 03 — INVESTIGATE

Officers see why a project was flagged, the evidence behind it and what the model predicts.

### 04 — ACT

Officers can request an audit, assign inspection, place payment workflow on hold where appropriate, or resolve the case.

### 05 — AUDIT

The system records actions and status transitions for traceability.

---

# 30. HOW-IT-WORKS VISUAL

Desktop:

```text
01 ───────→ 02 ───────→ 03 ───────→ 04 ───────→ 05
MONITOR      DETECT      INVESTIGATE   ACT          AUDIT
```

Use:

- icons;
- thin connector line;
- green highlight;
- small number circles.

Mobile:

vertical timeline.

---

# 31. WORKFLOW ANIMATION

When the section enters viewport:

- number 01 appears;
- line grows;
- number 02 appears;
- line grows;
- etc.

Do it once.

No continuous animation.

---

# 32. AI CAPABILITIES SECTION

Heading:

```text
AI That Helps Officers See the Signal
```

Subtitle:

```text
Multiple project signals are combined to help prioritize cases that may require human verification.
```

Capabilities:

```text
Cost Risk Prediction
Time Delay Prediction
Transaction Anomaly Detection
Financial–Physical Mismatch
Project Similarity Signals
Explainable Risk Score
```

---

# 33. AI CAPABILITY LAYOUT

DO NOT create six identical cards.

Instead use alternating feature rows.

Example:

```text
┌──────────────────────┬─────────────────────────────────┐
│ visual               │ Cost Risk Prediction            │
│ ₹20L → ₹23.6L        │ Predict potential cost overrun │
└──────────────────────┴─────────────────────────────────┘

┌─────────────────────────────────┬──────────────────────┐
│ Time Delay Prediction            │ visual               │
│ June → August                   │ timeline visual      │
└─────────────────────────────────┴──────────────────────┘
```

Continue this rhythm.

---

# 34. AI CAPABILITY MINI-VISUALS

Cost:

```text
₹20L
   ↓
₹23.6L
```

Time:

```text
JUNE → AUGUST
```

Payments:

```text
₹5L
₹5L
₹5L
```

Progress:

```text
85% financial
40% physical
```

Similarity:

```text
65%
similarity
```

Risk:

```text
82 / 100
```

These visuals make the system tangible.

---

# 35. EXPLAINABLE AI SECTION — MAJOR FEATURE

Heading:

```text
AI That Explains the Risk
```

Subheading:

```text
A risk score is only useful when an officer can understand what caused it and what should be checked next.
```

Create a large, elegant mock project investigation view.

---

# 36. EXPLAINABLE PROJECT PREVIEW

Display:

```text
ROAD CONSTRUCTION – SEHORE
MP-2024-1001

82 / 100
HIGH RISK

WHY IS THIS PROJECT FLAGGED?

Financial–physical mismatch
85% expenditure vs 40% physical progress

Time delay
Estimated delay: 4 months

Payment anomaly
3 similar payments within 48 hours

Similarity signal
Possible nearby similar project
65% similarity
```

Then:

```text
RECOMMENDED ACTION

Field verification recommended.
```

Button:

```text
Request Audit →
```

---

# 37. EXPLAINABILITY LAYOUT

Do:

```text
left:
project identity + risk

center:
why flagged

right:
predictions
```

Or:

```text
risk header
↓
evidence row
↓
reasons
↓
action
```

Choose whichever looks cleaner in the existing project.

---

# 38. AI PREDICTION PREVIEW

Show:

```text
Delay Probability
78%

Cost Overrun Risk
65%

Anomaly Score
82
```

Use small analytical blocks, not huge gauges.

---

# 39. LANDING PAGE OFFICER ACTION PREVIEW

Show:

```text
[ Request Audit ]
[ Halt Vendor Payment ]
[ Mark Resolved ]
```

But don't make them appear as the main landing CTA.

The landing page is introducing the capability.

---

# 40. IMPORTANT AI DISCLAIMER

Near the explainability preview:

```text
AI-generated risk indicators support prioritization
and human verification. They do not by themselves
establish fraud.
```

Use small readable text.

---

# 41. OFFICER ROLES SECTION

Heading:

```text
Designed Around the Officer
```

Four roles:

```text
Ministry Official
National and cross-state monitoring

State Nodal Officer
State and district risk oversight

District Authority
Project-level investigation and action

Field Officer
Assigned inspection and evidence
```

Use an editorial layout, not a pricing-card grid.

---

# 42. GEOGRAPHIC INTELLIGENCE SECTION

Heading:

```text
See Where Risk Is Concentrated
```

Show a large India map.

Example summary:

```text
Selected:
Madhya Pradesh

Projects
4,281

High Risk
58

Average Risk
72
```

Use:

```text
Low
Medium
High
```

as semantic map colors.

---

# 43. MAP INTERACTION

Hover:

```text
Madhya Pradesh
58 High-Risk Projects
Average Risk 72
```

Click:

```text
→ monitoring portal
```

The landing-page map can navigate to:

```text
/projects?state=Madhya%20Pradesh
```

---

# 44. SCALE SECTION

Heading:

```text
From Project Signals to National Intelligence
```

Visual:

```text
PROJECT
   ↓
DISTRICT
   ↓
STATE
   ↓
NATIONAL
```

Supporting:

```text
Progressive drill-down without losing financial,
geographic and project context.
```

---

# 45. ARCHITECTURE SECTION

Heading:

```text
One Monitoring Layer. Multiple Intelligence Signals.
```

Show:

```text
Project Data
Financial Data
Progress Data
Transaction Data
      ↓
AI Risk Engine
      ↓
Risk + Predictions + Explanation
      ↓
Officer Monitoring Portal
      ↓
Action
      ↓
Compliance
```

Keep labels large enough to read.

---

# 46. INTEGRATION LANGUAGE

Do not claim live government integration.

Use:

```text
Designed for integration with existing
government data systems and operational workflows.
```

If using synthetic data:

```text
Prototype / Demonstration Environment
```

---

# 47. IMPACT SECTION

Heading:

```text
Designed for Better Oversight
```

Use four large capability statements:

```text
Program-Scale Monitoring
From project to national view.

AI-Assisted Triage
Prioritize cases requiring attention.

Explainable Intelligence
Understand why a project was flagged.

Action Traceability
Record what happened after review.
```

Do NOT use fake statistics.

---

# 48. FAQ SECTION

Heading:

```text
Questions About the Monitoring System
```

Questions:

1. What is the MPLADS AI Monitoring System?
2. How does the AI identify project risk?
3. What anomalies can the platform detect?
4. Does the AI confirm fraud?
5. What evidence is shown to officers?
6. Can officers take action from the portal?
7. How are officer actions recorded?
8. Can the platform integrate with existing systems?
9. Can it scale from district to national monitoring?

Use a clean accordion.

---

# 49. FAQ BEHAVIOR

Only one/two items open at a time.

Animation:

```text
150–220ms
```

Use chevron rotation.

No giant bouncing transitions.

---

# 50. FAQ ANSWER FOR FRAUD

Use:

```text
No. The system produces risk indicators and anomaly
signals to help prioritize projects for human
verification and investigation. A model output is
not, by itself, a legal determination of fraud.
```

This is important for credibility.

---

# 51. FINAL CTA SECTION

Near bottom:

```text
Turn complex monitoring data
into actionable intelligence.

[ Access Monitoring Portal → ]
```

Use:

- deep navy background;
- soft green/gold decoration;
- white text.

Keep it elegant.

---

# 52. FOOTER

Use a substantial government-style footer inspired by the structure of myScheme/MyGov.

Columns:

```text
MPLADS AI Monitoring System

Platform
Overview
AI Capabilities
How It Works
Monitoring Portal

Resources
Risk & Alerts
Reports
Compliance
FAQ

Support
Contact
Feedback
Accessibility

Useful Links
Digital India
MyGov
National Portal of India
Open Government Data
```

Only use real external URLs.

Do not fabricate contact information.

---

# 53. FOOTER UTILITY LINKS

Include:

```text
Privacy
Disclaimer
Terms & Conditions
Accessibility
Contact
Feedback
```

If detailed legal pages do not yet exist, create sensible placeholder routes/pages rather than dead buttons.

---

# 54. FOOTER IDENTITY

Bottom:

```text
MPLADS AI Monitoring System
Prototype / Demonstration Environment
```

Do not falsely claim official ownership.

---

# 55. ACCESSIBILITY MENU

Include an accessible control similar in spirit to MyGov.

Options:

```text
Increase Text
Decrease Text
High Contrast
Highlight Links
Reset
```

Implement at least:

- text size adjustment;
- high contrast;
- visible keyboard focus.

Store preferences locally.

---

# 56. BACKGROUND DESIGN SYSTEM

Create 4 reusable decorative patterns:

## Pattern A
Dotted grid.

## Pattern B
Faint geographic contour.

## Pattern C
Organic pale green shape.

## Pattern D
Thin gold curved line.

Use these across sections with very low opacity.

Do not repeat the exact same pattern in every section.

---

# 57. BACKGROUND DECORATION RULE

Decorative elements must be:

```text
subtle
asymmetric
purposeful
low opacity
```

No decoration should interfere with text.

---

# 58. IMAGE RULE

Use real or high-quality relevant imagery.

Best subjects:

- roads;
- schools;
- healthcare facilities;
- water infrastructure;
- community projects;
- rural development;
- public infrastructure;
- officer/data monitoring.

Do NOT use:

- random corporate people;
- handshake;
- robot;
- cyber brain;
- stock AI image;
- generic software engineer;
- cryptocurrency imagery.

---

# 59. HERO IMAGE RULE

If you need a custom illustration and no appropriate local asset exists, create a visually coherent project-specific illustration rather than inserting a random stock image.

The hero visual should combine:

```text
infrastructure
+
India
+
data
+
risk
```

---

# 60. ASSET ORGANIZATION

Use:

```text
src/assets/landing/
```

for page-specific assets.

Keep:

```text
images/
illustrations/
patterns/
icons/
```

separate.

Optimize images.

Prefer WebP/AVIF where practical.

---

# 61. RESPONSIVE DESIGN — DESKTOP

Primary target:

```text
1440 × 900
```

Secondary:

```text
1280 × 720
```

At desktop:

- two-column hero;
- wide visual;
- horizontal workflow;
- alternating features;
- wide map.

---

# 62. TABLET

At ~768–1024:

- hero may stay two-column until it becomes cramped;
- workflow becomes smaller;
- features can stack;
- navigation simplifies.

---

# 63. MOBILE

At <768:

- hero becomes one column;
- hero visual appears after CTA;
- workflow becomes vertical;
- feature sections stack;
- FAQ becomes full width;
- footer stacks.

---

# 64. MOBILE HERO

Order:

```text
eyebrow
headline
paragraph
primary CTA
secondary CTA
small trust line
visual
```

Do not put a huge image before the headline.

---

# 65. MOBILE HERO VISUAL

Compact layout:

```text
[82 Risk] [85% Finance]

[40% Physical]

small India map
+
mini dashboard preview
```

Do not squeeze the desktop visual into mobile.

---

# 66. MOBILE NAV

Use:

```text
logo/name
menu
Access Portal
```

Drawer:

```text
Overview
Challenge
How It Works
AI
Roles
About
FAQ
```

---

# 67. RESPONSIVE TYPOGRAPHY

Desktop:

```text
Hero:
48px

Section:
36px

Body:
18px
```

Mobile:

```text
Hero:
36px

Section:
28–30px

Body:
15–17px
```

---

# 68. CSS ARCHITECTURE

Use existing Tailwind if already configured.

Create/maintain:

```text
src/styles/tokens.css
src/styles/globals.css
src/styles/landing.css
```

Use Tailwind classes for layout/components.

Use custom CSS for:

- background patterns;
- organic shapes;
- complex hero effects;
- special transitions.

---

# 69. DESIGN TOKENS

Use:

```css
:root {
  --landing-bg: #F7FAF8;
  --landing-green: #10834B;
  --landing-green-soft: #E8F7EE;
  --landing-navy: #0F172A;
  --landing-text: #111827;
  --landing-muted: #667085;
  --landing-border: #E4E7EC;
  --landing-gold: #C8902F;

  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 14px;

  --shadow-soft:
    0 4px 18px rgba(15,23,42,0.05);
}
```

---

# 70. DO NOT OVERUSE CARDS

Cards should be reserved for:

- hero monitoring preview;
- key capability preview;
- risk preview;
- compact metrics.

Sections such as:

- challenge;
- how it works;
- about;
- FAQ

should be mostly flat/editorial.

This is critical for avoiding an AI-generated appearance.

---

# 71. BORDER RADIUS

Use:

```text
8–10px:
buttons/inputs

12–16px:
major panels

9999px:
badges/tags only
```

Do not give every section huge rounded corners.

---

# 72. SHADOWS

Use subtle shadows.

Default:

```text
0 4px 18px rgba(15,23,42,.05)
```

Avoid deep floating shadows.

---

# 73. HOVER BEHAVIOR

The user explicitly does NOT want excessive hover effects.

Therefore:

Hover only on:

- nav links;
- buttons;
- FAQ;
- clickable project preview;
- map state;
- actual links.

Hover effect:

```text
small color transition
small shadow/border change
```

No:

```text
scale 1.1
rotate
bounce
glow
```

---

# 74. ANIMATION SYSTEM

Use only:

```text
fade
fade-up
line draw
small slide
subtle number count
```

Durations:

```text
150–220ms:
micro interaction

500–800ms:
section entrance

600–1000ms:
hero entrance
```

---

# 75. REDUCED MOTION

Support:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```

Do not break usability.

---

# 76. NO CONTINUOUS ANIMATION

Do not continuously animate:

- cards;
- icons;
- charts;
- map;
- background;
- buttons.

One-time entrance is enough.

---

# 77. NO AUTO CAROUSEL

Do not put critical information inside an auto-rotating carousel.

The hero can be a stable composition.

---

# 78. NO SCROLL JACKING

Native scrolling must remain natural.

---

# 79. SMOOTH ANCHOR NAVIGATION

Navigation links should scroll smoothly to:

```text
#challenge
#workflow
#capabilities
#ai
#roles
#scale
#architecture
#faq
```

---

# 80. ACTIVE SECTION NAVIGATION

As the user scrolls, highlight the relevant nav item subtly if implemented.

Do not overdo it.

---

# 81. SEO

Set:

Title:

```text
MPLADS AI Monitoring System | AI-Assisted Project Risk Monitoring
```

Description:

```text
AI-assisted monitoring platform for MPLADS implementation, project risk intelligence, financial-progress analysis, anomaly detection and officer action workflows.
```

Use OpenGraph metadata if practical.

---

# 82. LANDING PAGE DATA LABEL

Use:

```text
Prototype / Demonstration Environment
```

in the footer or utility region.

Do not write "live government data" unless it is real.

---

# 83. MOCK DATA

Hero/dashboard preview can use:

```text
High Risk Projects:
427

Fund Utilization:
73.3%

Madhya Pradesh:
58 High-Risk Projects

Average Risk:
72
```

All values are demo/illustrative unless backed by a real data source.

---

# 84. PRIMARY DEMO PROJECT PREVIEW

Use:

```text
Road Construction – Sehore
MP-2024-1001

Risk:
82 / 100 HIGH

Financial Progress:
85%

Physical Progress:
40%

Delay:
4 Months
```

AI signals:

```text
Financial-progress mismatch
Payment anomaly
Time delay
Similarity signal
```

---

# 85. LANDING PAGE "ABOUT" CONTENT

Include a short section:

```text
About the Platform

The MPLADS AI Monitoring System is designed as an
AI-assisted monitoring and decision-support platform
for public development projects. It connects financial,
physical-progress, timeline and transaction signals to
help authorized users identify cases that may require
verification and action.
```

Do not make unsupported claims of real deployment.

---

# 86. WHY MYSCHEME-LIKE STRUCTURE IS USEFUL

The public landing page must prioritize discoverability and simple explanation.

Therefore use this conceptual sequence:

```text
What is it?
↓
Why does it matter?
↓
How does it work?
↓
What does AI do?
↓
What can an officer do?
↓
Where does it scale?
↓
How can I access the system?
```

This is the adaptation of a citizen-service discovery pattern to an officer-monitoring product.

---

# 87. DIFFERENCE FROM MYSCHEME

myScheme is citizen-focused.

This project is officer-focused.

Therefore:

myScheme concept:

```text
Find → Search → Select & Apply
```

This project:

```text
Monitor → Detect → Investigate → Act → Audit
```

That should be the key adaptation.

---

# 88. GOVERNMENT-STYLE FOOTER CONTENT

Use real public links only, where needed:

Digital India:
https://www.digitalindia.gov.in/

MyGov:
https://www.mygov.in/

National Portal:
https://www.india.gov.in/

Open Government Data:
https://www.data.gov.in/

Do not invent official URLs.

---

# 89. NO FALSE OFFICIAL ASSOCIATION

The website is a prototype.

Avoid statements that imply it has been officially adopted.

Use:

```text
Prototype / Demonstration Environment
```

unless the project team later supplies verified official authorization.

---

# 90. FINAL LANDING PAGE SCREEN FLOW

The page should look roughly like:

```text
UTILITY BAR
────────────────────────────────────────────

NAVBAR
────────────────────────────────────────────

HERO
────────────────────────────────────────────
Headline          Infrastructure + Data Visual
Text
CTA               Risk / Finance / Progress
────────────────────────────────────────────

TRUST STRIP
────────────────────────────────────────────

THE MONITORING CHALLENGE
────────────────────────────────────────────

FINANCIAL 85% vs PHYSICAL 40%
────────────────────────────────────────────

HOW IT WORKS
01 → 02 → 03 → 04 → 05
────────────────────────────────────────────

AI CAPABILITIES
feature row
feature row
feature row
────────────────────────────────────────────

EXPLAINABLE AI
Project investigation preview
────────────────────────────────────────────

OFFICER ROLES
────────────────────────────────────────────

GEOGRAPHIC INTELLIGENCE
India map
────────────────────────────────────────────

SCALE
Project → District → State → Nation
────────────────────────────────────────────

ARCHITECTURE
Data → AI → Portal → Action → Audit
────────────────────────────────────────────

IMPACT
────────────────────────────────────────────

FAQ
────────────────────────────────────────────

FINAL CTA
────────────────────────────────────────────

FOOTER
────────────────────────────────────────────
```

---

# 91. CRITICAL "HUMAN-DESIGNED" RULE

The page should contain visual variety.

Use:

- editorial typography;
- asymmetric layouts;
- horizontal rules;
- section labels;
- diagrams;
- illustrations;
- data visuals;
- large whitespace;
- different section backgrounds.

Do not create the same component 20 times.

---

# 92. DO NOT USE THESE VISUAL PATTERNS

Do NOT create:

```text
[icon] title
number
subtitle
```

repeated 10 times.

Do NOT create:

```text
rounded white card
rounded white card
rounded white card
```

throughout.

Do NOT use:

```text
gradient green-blue AI
```

Do NOT use:

```text
purple AI glow
```

Do NOT use:

```text
glassmorphism
```

Do NOT use:

```text
giant animated blobs
```

Do NOT use:

```text
AI robot illustration
```

---

# 93. VISUAL QUALITY TARGET

The design target is:

```text
myScheme
+
Digital India
+
MyGov
+
modern enterprise data product
```

but with an original MPLADS identity.

It should look appropriate for:

- SIH judges;
- government officers;
- technology reviewers;
- academic evaluators.

---

# 94. LANDING PAGE SHOULD FEEL LIKE A REAL PRODUCT

Avoid language such as:

```text
Welcome to the future of AI!
```

Use:

```text
AI-assisted monitoring for transparent,
proactive and accountable development.
```

---

# 95. SIH VALUE STORY

The landing page should make the following obvious:

## Problem

Monitoring is difficult when information is fragmented.

## Solution

One system combines multiple signals.

## AI

AI identifies risk patterns and predicts potential issues.

## Explainability

The system explains why it flagged a project.

## Action

Officers can initiate next steps.

## Accountability

Actions are recorded.

## Scale

Project → District → State → Nation.

---

# 96. FINAL DESIGN TEST

After implementation, open the page and ask:

Does it resemble a polished government digital service?

Does the hero immediately communicate MPLADS + AI monitoring?

Does the page look related to the myScheme screenshot without copying it?

Is the visual background interesting but subtle?

Is the text readable?

Does the website avoid generic AI-generated style?

Does it avoid excessive hover?

Does it avoid excessive rounded cards?

Does it have a clear story?

Can a judge understand the project without a verbal explanation?

If not, keep refining.

---

# 97. IMPLEMENTATION TEST

Run:

```bash
npm run build
```

Fix all errors.

Then run the site.

Test:

```text
/
```

Then:

```text
Access Monitoring Portal
→ /login
```

Verify authenticated portal still works.

---

# 98. ROUTING REQUIREMENT

Do not break:

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

Root `/` is the new landing page.

---

# 99. FINAL CORE DEMO

The landing page should lead naturally to the SIH demonstration:

```text
LANDING
  ↓
Access Monitoring Portal
  ↓
LOGIN
  ↓
DASHBOARD
  ↓
High Risk
  ↓
Madhya Pradesh
  ↓
Sehore
  ↓
Road Construction – Sehore
  ↓
82/100 HIGH RISK
  ↓
Why flagged?
  ↓
Evidence
  ↓
Request Audit
  ↓
Under Review
  ↓
Compliance
```

Do not break this flow while redesigning the landing page.

---

# 100. FINAL NON-NEGOTIABLE REQUIREMENTS

The final landing page must:

```text
[ ] Completely replace the existing weak landing page
[ ] Be implemented inside the existing project
[ ] Preserve the portal/dashboard
[ ] Have a government-style header
[ ] Have a myScheme-inspired hero
[ ] Have a project-specific hero visual
[ ] Have a sophisticated background
[ ] Have subtle dynamic entrance effects
[ ] Have no excessive hover
[ ] Have readable typography
[ ] Have a trust strip
[ ] Explain the monitoring challenge
[ ] Show financial vs physical mismatch
[ ] Show the monitoring workflow
[ ] Explain AI capabilities
[ ] Show explainable AI preview
[ ] Show officer roles
[ ] Show geographic intelligence
[ ] Show project-to-national scale
[ ] Show architecture/integration concept
[ ] Show impact/capabilities
[ ] Have FAQ
[ ] Have accessibility tools
[ ] Have useful footer
[ ] Have real external links where used
[ ] Have no fake government claims
[ ] Have no fake performance metrics
[ ] Have no fake live-data claim
[ ] Work on mobile
[ ] Work on tablet
[ ] Work on desktop
[ ] Pass npm run build
[ ] Preserve all portal routes
```

---

# 101. FINAL INSTRUCTION TO THE AI CODING AGENT

Do NOT respond with a plan only.

Do NOT tell me what I could build.

Do NOT give me a design mockup only.

**Actually modify the existing React project.**

Follow:

```text
INSPECT EXISTING PROJECT
        ↓
REMOVE OLD LANDING PAGE
        ↓
CREATE NEW LANDING COMPONENT ARCHITECTURE
        ↓
CREATE NEW DESIGN TOKENS
        ↓
CREATE NEW BACKGROUND SYSTEM
        ↓
CREATE NEW HERO
        ↓
CREATE ALL LANDING SECTIONS
        ↓
ADD SUBTLE MOTION
        ↓
CONNECT CTA TO /login
        ↓
PRESERVE AUTHENTICATED PORTAL
        ↓
TEST RESPONSIVE LAYOUT
        ↓
RUN npm run build
        ↓
FIX ERRORS
        ↓
FINAL POLISH
```

The page must be **implemented**, not merely described.

The final goal is:

> **Create a high-quality MPLADS AI Monitoring public landing page with the clean, attractive, government-service feel of the provided myScheme reference, the institutional credibility of Digital India/MyGov, and an original AI-monitoring identity built around Monitor → Detect → Explain → Investigate → Act → Audit.**

Do not make it look like an AI-generated template.

Make it look deliberately designed.
