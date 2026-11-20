---
synced: 2026-11-20
---

<!-- English translation of zh-Hant.md, kept in sync by an agent. Keep every {#id}, and the same number of items in each list. -->

# Stone Chen

> 陳絲彤

## Headline {#headline}

Frontend Engineer · Tech Lead

## Summary {#summary}

From frontend development and product requirements to leading teams that ship faster. Hands-on experience with high-traffic financial products and medical AI products, fluent in React, Vue 3 and TypeScript, and the builder of my team's AI development infrastructure.

## Location {#location}

Anywhere in Taiwan or overseas

## About {#bio}

I graduated from National Chengchi University with a double major in Advertising and Japanese. Studying across marketing, design, and language taught me to approach problems from the perspective of users and the product. In my sophomore year, I finished an introductory programming course at the top of my class and experienced, for the first time, the satisfaction of solving real problems with code. That led me to commit to software development and become a frontend engineer.

Over nearly three years at Cathay United Bank, I worked on the CUBE online banking platform and led the fund and foreign currency modules, serving more than 3.4 million visits per month. In a highly regulated environment with strict quality requirements, I grew from implementing requirements to evaluating feasibility with product managers from a frontend perspective and driving projects to delivery.

In 2026, I joined Futago Talents, a hospital-funded startup, and was assigned to the AI Center at Chung Shan Medical University Hospital as Frontend Tech Lead and TPM. I translate requirements between clinicians, data analysts, and engineers, and brought an AI voice-based endoscopy reporting system to production within one month of receiving the requirements. I also re-scoped delayed features and delivered two major features to acceptance within two weeks.

Beyond feature delivery, I have kept deepening how I apply AI: from using it to speed up my own development, to bringing it into a single part of the team's workflow at Cathay (for example, an n8n-based knowledge base), to building the team's AI development infrastructure at Chung Shan, turning AI from a personal tool into the way the whole team works.

Looking back on my path from a cross-disciplinary background to tech lead, I believe that not limiting myself is the key to growth. I aim to stay adaptable, keep building depth in my expertise, and be a teammate who makes products more stable and workflows smoother.

## Highlights {#highlights}

- 3.4M｜monthly visits, CUBE online banking
- +50%｜dev efficiency after building a team AI harness
- 1 month｜from requirements to go-live, medical AI

## Experience {#experience}

### Frontend Tech Lead / TPM｜AI Center, Chung Shan Medical University Hospital {#csmuh}

- Location：Taichung
- Note：Employed by Futago Talents, a hospital-backed startup
- Timeline：CSMUH AI Center｜Frontend Tech Lead / TPM
- Tags：Vue 3, Nuxt, TypeScript, Web Components, Storybook, AI Agent, Medical AI

#### Highlights {#items}

- TPM for the NTUH Beihu Branch endoscopy AI voice-to-record system: turned clinical needs into specs and tasks with clinicians, data analysts and engineers; live within one month of intake, report time −60%, about 20% of physicians' day saved.
- Leading a team of four engineers with agile and spec-first practices: re-split and re-prioritized a stalled backlog so two major features passed acceptance within two weeks.
- Built aic-fe-infra, shared dev infrastructure for all frontend projects: unified AI agent rules and skills keep output consistent across projects for Claude Code, Codex and Copilot; PR checks and Dependabot upgrades are likewise changed in one place and rolled out by a version bump.
- Leading the frontend modernization of MedAssist Hub (醫點家), a national-award-winning Django platform, starting with a file explorer for AI-parsed results; built a Web Components library shared across projects via CDN.

#### Resume only {#details}

- Audited five frontend projects and planned their consolidation.
- Generated types from OpenAPI specs with Orval to integrate RESTful APIs and speed up frontend–backend collaboration.
- Made project progress and tasks visible to everyone.
- Team workflow: spec and demo before build, DB schema and API contracts first, mock server, Storybook, daily standups and an onboarding handbook.
- aic-fe-infra CI: a reusable workflow and composite action give every project the same PR check (install, check, build); Dependabot batches weekly minor and patch upgrades into one PR.
- aic-fe-infra agent config: .agents/ is the single source; a sync script merges shared and project rules into instruction files and skills for Claude Code, Codex and GitHub Copilot (review-and-ship, record-adr, modern-web-guidance).
- Wrote the setup-fe-infra skill and an idempotent init script that never overwrites project settings, plus a Linear skill that opens the full planning, development and acceptance ticket tree for a new requirement.

### Frontend Engineer｜Cathay United Bank {#cube}

- Location：Taipei
- Timeline：Cathay United Bank｜Frontend Engineer, CUBE online banking
- Tags：React, TypeScript, FinTech, Performance, AI-assisted dev, Azure DevOps

#### Highlights {#items}

- CUBE online banking: built and maintained features on a platform with 400+ features, 3.4M+ monthly visits and annual revenue in the hundreds of millions of NT dollars; led the fund and foreign-currency modules (top 10 by traffic, 93% of revenue).
- Built an internal n8n knowledge base so 40+ cross-team members answer frontend questions themselves, saving about 2 person-days a month.
- ROBO: rebuilt the animated marketing site for SEO and Core Web Vitals; LCP −35%, FCP −40%, TTFB −55% in CrUX.

#### Resume only {#details}

- On-call operations with Grafana monitoring and incident handling.
- Introduced AI-assisted code review (about 90% less review time), Figma-to-code, and automation for regression tests, deployments and scaffolding; dev efficiency +50%.
- Automated operational workflows and CI/CD with scripts, cutting a 3-hour manual deployment to 2 minutes.
- Bond purchase O2O: improved collaboration and component reuse, supporting revenue growth from long-tail users.
- Fund inventory: built shared components (sticky-header tables, tour, pagination, skeleton) and optimized rendering of large data sets.
- Foreign-currency time deposit: handled complex form validation and display logic.
- Generated API types with Orval (OpenAPI) to speed up backend integration.
- Extended Storybook with MDX so design and documentation stay in sync.
- Implemented React ErrorBoundary, bundle-size analysis and security scanning.
- Wrote coding standards and workflow docs to shorten onboarding; active in frontend study groups and knowledge sharing.

### Visual Designer Assistant｜Engoo {#engoo}

- Location：Taipei
- Tags：Figma, Adobe Ps/Ai, A/B testing

#### Highlights {#items}

- CIS, print, social and ad creative design.
- Analyzed the Engoo brand to design presentation masters and corporate envelopes.
- Used A/B tests to learn what each audience responds to and adjusted ad creative accordingly.

## Education {#education}

### National Chengchi University {#nccu}

- Degree：BA Advertising, double major in Japanese
- Timeline：National Chengchi University｜Advertising, double major in Japanese

## Languages {#languages}

- Mandarin Chinese｜Native
- English｜professional working proficiency｜TOEIC 935
- Japanese｜professional working proficiency｜JLPT N1

## Skills {#skills}

### Frameworks and languages {#frameworks}

- Items：React 19, Vue 3, Nuxt, Web Components, TypeScript, Effect.ts, Jotai, React Hook Form
- Resume only：JavaScript (ES6+), HTML5, CSS3, SCSS, Yup, i18n, Day.js, Chart.js, three.js, RESTful API

### Quality and performance {#quality}

- Items：Vitest, Storybook, Lighthouse, Web Vitals, Code splitting, SSG, Orval (OpenAPI)
- Resume only：Lazy Loading, Bundle analysis, ErrorBoundary

### Delivery and team {#delivery}

- Items：Vite, Azure DevOps, CI/CD, GitHub Actions, Mock server, Plop, Scrum, Figma
- Resume only：Git

### AI tooling {#ai}

- Items：Claude Code, Codex, AI agent skills, AI code review, Figma to Code, n8n, Claude Design System, LLM context docs, Discord bot second brain
- Resume only：GitHub Copilot, Ollama

### UI and design {#design}

- Items：Chakra UI, Tailwind CSS, Framer Motion, Adobe Ps/Ai

## Projects {#projects}

### Train Monopoly {#train-monopoly}

A Taiwan-railway take on Monopoly, deployed with GitHub Actions.

### Tools and experiments {#playground}

Small utilities and a playground for new tech.

### Food blog {#foodie}

A self-built blog about eating out.

### StarsBlooming {#starsblooming}

An e-commerce site for my handmade dried-flower accessory brand, from visual design to deployment, using SVG animation and parallax scrolling for depth and engagement.

### Personal website {#personal-site}

One resume source drives the website, Notion and 104; an AI agent keeps the Chinese, English and Japanese versions in sync, with structural checks to keep them consistent. Includes my portfolio and a playground of small tools.

## Volunteering {#volunteer}

- Volunteer at a homeless services nonprofit (2025–present)
- Volunteer at an animal shelter
- Volunteer photographer, World Vision (2022)

## Interests {#interests}

Reading (monthly book club), half marathons, guitar
