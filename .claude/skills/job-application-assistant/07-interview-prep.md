---
framework_version: 1.0.0
---

# Interview Preparation Guide

<!-- SETUP: STAR examples are personalized by running /setup based on your actual experience -->

## STAR Format

Structure answers as: **Situation** (context), **Task** (your responsibility), **Action** (what you did), **Result** (outcome).

Keep answers to 1-2 minutes. Be specific. End with what you learned or would do differently.

## Ready-Made STAR Examples

### 1. Weeber AI Voice Pipeline (Real-Time Audio Streaming & Voice AI)
**S:** Businesses faced high abandonment rates and costly human support for routine phone calls (COD confirmation, appointment scheduling), requiring low-latency conversational AI agents over telephone lines.
**T:** Architect an end-to-end multi-tenant voice pipeline connecting Twilio Media Streams to speech-to-text, LLMs, and text-to-speech with natural turn-taking and barge-in (interruption) support.
**A:** Built a WebSocket audio streaming architecture in Bun and Hono with Twilio Media Streams. Integrated Deepgram for fast streaming STT, piped tokens through LLM function calling via Vercel AI Gateway, and streamed synthesized audio back through Cartesia and ElevenLabs. Implemented interruption detection to kill active TTS playback instantly when the user speaks, plus voicemail detection and automated failover.
**R:** Achieved sub-second end-to-end response latency for natural back-and-forth dialogue; stabilized production with 2,200+ automated tests, 12-job CI/CD pipeline, and 160+ ADRs.
**Use for:** "Tell me about a complex technical challenge you solved", "Experience with WebSockets, AI, or real-time systems", "How do you ensure reliability in mission-critical applications?"

### 2. Shobhnam Marketplace (Cross-Platform Mobile App & Concurrency)
**S:** Religious and cultural event organizers needed a trustworthy way to discover and book verified devotional artists across India, but existing offline processes suffered from double-bookings and lack of payment guarantees.
**T:** Build and publish a cross-platform mobile app on Google Play Store from scratch, complete with separate customer and artist workflows, real-time availability, and secure payment escrow.
**A:** Built the mobile app using React Native and Expo with Expo Router, and engineered a backend REST API with 100+ endpoints in Node.js/Express.js and MongoDB. Designed an atomic slot-hold booking engine taking IST timezones into account to lock slots during checkout and prevent concurrency race conditions. Integrated WhatsApp Cloud API for passwordless OTP login and Razorpay with HMAC-SHA256 signature verification.
**R:** Successfully published live on the Google Play Store (`com.shobhnamofficial.app`). Built an accompanying React.js admin analytics dashboard managing bookings, payouts, bank verifications, and disputes.
**Use for:** "Tell me about a product you launched from scratch", "How do you handle race conditions or transactional concurrency?", "Experience with React Native and mobile deployment."

### 3. OniT Services CRM (Dynamic Lead Allocation Engine & Operations)
**S:** OniT Services operated on manual client workflows and offline spreadsheets, causing delayed customer responses and high operational overhead.
**T:** Architect and deploy a centralized web-based CRM and dynamic lead allocation engine to digitise all offline operations and optimize lead response times.
**A:** Built a full-stack CRM using Next.js (SSR/SSG), Node.js, Express.js, and MongoDB with role-based access control (RBAC) and JWT security. Implemented an intelligent dynamic lead allocation algorithm that categorizes incoming leads from multiple channels and auto-distributes them to subscribed clients based on availability, tier, and workload capacity. Integrated Razorpay wallet recharge and automated refunds.
**R:** Reduced manual operational overhead by 60%, improved client lead response time, and boosted team productivity by 50%.
**Use for:** "Describe a time you optimized business processes through software", "Experience with system architecture and database design", "How do you handle role-based permissions and security?"

### 4. Systaldyn Enterprise Delivery (Highcharts & Embold Quality Assurance)
**S:** Enterprise client Hitachi America required rich, interactive data visualizations for complex industrial datasets across two major initiatives (AI-EASE and Material Dismantler Org).
**T:** Deliver responsive frontend interfaces consuming enterprise REST APIs and clean up codebase maintainability issues before delivery.
**A:** Built responsive React.js UI modules, integrating Highcharts to turn dense tabular data into interactive, real-time visual dashboards. Ran Embold static analysis across the codebases, identifying code smells, modularity gaps, and circular dependencies, systematically refactoring components to meet enterprise standards.
**R:** Delivered all modules on schedule with zero client-reported critical defects; established reusable charting components adopted across the engineering team.
**Use for:** "How do you maintain high code quality?", "Experience with enterprise clients and frontend dashboards."

## Common Tough Questions

### "Why are you looking for a new role?"
> "I have delivered significant impact across full-stack web, mobile with my published Play Store app, and cutting-edge voice AI architectures. I'm eager to join an ambitious team where I can apply my end-to-end execution skills, work on scalable production products, and continue growing alongside experienced engineering leaders."

### "You don't have 5+ years of experience."
> "While my total professional tenure is over 2 years, the breadth and depth of what I've shipped is substantial: I've architected a 2,200-test voice AI platform with real-time WebSockets, published an Android app on Google Play with 100+ API endpoints, and built CRM systems that slashed operational overhead by 60%. I learn fast, take complete ownership, and deliver production-ready software with high velocity."

### "Where do you see yourself in 3-5 years?"
> "As a Senior Full Stack or Staff AI Engineer, leading core system architecture, mentoring junior developers, and designing reliable, high-throughput distributed systems and agentic AI products that serve millions of users."

### "What is your biggest weakness?"
> "Because I love building and shipping, I sometimes want to implement features immediately rather than writing extensive documentation up front. I mitigated this during the Weeber project by enforcing a strict requirement: writing Architecture Decision Records (ADRs) and comprehensive automated tests before deploying new pipeline stages."

### "Why this company specifically?"
> Customize per company. Must reference: specific projects, company values, market position, or team structure. Never give a generic answer.

## Questions You Should Ask Interviewers

### About the Role
- "What does a typical week look like in this role?"
- "What would success look like in the first 6 months?"
- "What's the biggest challenge the team is facing right now?"

### About the Team
- "How big is the team, and how do you divide work?"
- "What does the development/project lifecycle look like, from idea to production?"
- "How do you onboard new team members?"

### About Tech & Growth
- "What's your current tech stack for [relevant area]?"
- "Is there room to grow into more architectural or strategic decisions?"
- "How does the team stay current with new tools and methods?"

### About Culture (use these to prevent disappointment)
- "How would you describe the team culture?"
- "What does professional development look like here?"
- "Is there flexibility for remote/hybrid work?"
- "What's the balance between development/new projects and maintenance work?"
- "How would you describe the leadership style in this team?"
- "What do people who thrive here have in common?"

## Phone/Video Interview Tips
- Have STAR examples written out (use this file)
- Keep a glass of water nearby
- Smile when speaking (it changes your tone)
- Ask for clarification if a question is vague
- It's OK to take 5 seconds to think before answering
- End with: "Is there anything else you'd like to know about my background?"

## After the Application (Best Practice)

### Follow-Up Etiquette
- **Don't call to "stand out"** or to learn more about the role post-submission - this risks a negative impression
- If the employer specified a timeline, respect it and wait
- If no timeline was given and significant time has passed (2+ weeks), a brief call to ask about status is acceptable
- If you have genuinely new, relevant information to share, a short follow-up is fine

### Thank-You Notes
- When you receive any update (interview invitation, rejection, or status update), send a brief thank-you message
- Express appreciation for their time and the process
- Keep it short (2-3 sentences)

## Roleplay Guidelines
When the user asks for interview practice:
1. Ask which role/company to simulate
2. Start with easy warm-up questions ("Tell me about yourself")
3. Progress to role-specific technical questions
4. Include 1-2 behavioral questions using the competencies from the job posting
5. End with a tough question or curveball
6. After each answer, give brief feedback: what worked, what to sharpen
7. Suggest which STAR example would work best for each question
