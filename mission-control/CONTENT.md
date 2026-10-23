# Mission Control: full content

Generated from `src/data/` by `npm run export:content`. Edit the data files, not this file.

## Contents

1. [Reply-All Meltdown](#reply-all-meltdown)
2. [The Redesign Nobody Asked For](#redesign-nobody-asked-for)
3. [Courier Down, Diwali Up](#courier-down-diwali-up)
4. [The Help Desk Black Hole](#help-desk-black-hole)
5. [Mystery Twist Deck](#mystery-twist-deck)
6. [Team evaluation checklist](#team-evaluation-checklist)

---

<a id="reply-all-meltdown"></a>

## Mission 01: Reply-All Meltdown

*A spreadsheet of learner data just went to 2,412 people. You have 72 hours to make it right.*

**Level:** Intermediate  
**Default length:** 90 minutes (rescalable to 60 or 120)  
**Team size:** 4–7 people  
**Focus:** Data privacy, customer trust, communication  
**Inspiration:** Adapted from common small-business data incidents, where most exposures come from an email or attachment sent to the wrong people rather than a hack.

### Participant brief

#### Situation

BrightPath Skills is an upskilling institute for working professionals, with three centres and about 2,400 active learners. It has 9 staff: a director, two admin assistants, and six trainers. A part-time IT contractor helps on weekends.

Friday, 6:40 PM. An admin assistant meant to send a polite fee reminder to 38 learners with overdue fees. Instead, she attached the master learner spreadsheet and sent it to the full “All Learners” mailing list: 2,412 addresses.

The spreadsheet holds every learner's full name, phone number, email, course, fee paid and fee due. For about 90 learners, a free-text “Notes” column holds comments such as “asked for EMI – job loss” or “fee waiver – family medical issue”. There are no bank details or passwords.

It is now 7:20 PM. The director is travelling but reachable by phone. The institute has no written plan for an incident like this.

#### What we know

| | |
|---|---|
| Recipients | 2,412 email addresses (all current and recent learners) |
| Records exposed | ~2,400 learners: name, phone, email, course, fees |
| Sensitive notes | ~90 learners with personal or financial comments |
| Replies so far | 14 replies, 3 of them “reply-all” asking “why do I have this?” |
| Social media | A learner posted a blurred screenshot in a 600-member professional community group |
| Email recall | Not possible: recall only works inside the institute's own domain |
| Who opened it | Unknown. No read tracking. |
| Next big event | New-batch admissions campaign scheduled to launch Monday, 9 AM |

#### Problem statement

> Design BrightPath's response for the next 72 hours: contain the exposure, communicate honestly with learners, support the people most affected, and make sure this can't easily happen again, without making the situation worse.

#### Constraints

- 72-hour planning horizon (Friday evening to Monday evening).
- Budget for outside help: ₹25,000 maximum.
- No lawyer on retainer. You can book a single 30-minute paid consultation.
- Assume data-protection law where BrightPath operates may require notifying a regulator and affected people within a short window. You don't need the legal details, but your plan must show how and when you'd confirm the obligations.
- Only the director can approve public statements. She is on a train with patchy signal.
- The admin assistant who sent the email is very upset and wants to resign.

#### Deliverables

1. First-hour action list: what happens tonight, and who owns each action.
2. Draft message to all 2,412 recipients, plus a different approach for the ~90 learners with sensitive notes.
3. A 72-hour timeline covering containment, communication, support and decisions.
4. Three prevention changes, ranked by impact against effort.
5. Your decision on Monday's admissions campaign, with reasons.

#### Roles

- **Stakeholder (Director)** (any): Plays the director. Answers questions in character and approves or rejects the plan. The facilitator gives this person the stakeholder brief.
- **Coordinator** (any): Runs the clock, keeps the action list, and makes sure every action has an owner.
- **Communications Lead** (non-technical): Drafts the learner messages and decides tone, channel and timing.
- **Risk Analyst** (any): Sizes the harm. Who is most affected, and what could go wrong next?
- **Process & Tools Builder** (technical): Designs the prevention fixes: tools, access rules, checks.
- **Reviewer (Red Team)** (any): Reads every draft as an angry learner would and finds the weak spots.
- **Presenter** (any): Delivers the final plan to the Director.

#### Success looks like

- Immediate containment steps come before polished messaging.
- Messages are honest, specific, and don't blame an individual.
- Learners with sensitive notes get a more personal, separate approach.
- The plan shows when and how legal obligations get checked.
- Prevention fixes address the process, not just “be more careful”.

#### Session plan (90 minutes)

| # | Phase | Minutes | Goal |
|---|---|---|---|
| 1 | Briefing | 10 | Read the brief aloud, draw roles, and agree on who is keeping notes. |
| 2 | Clarify | 10 | Question the Customer/Stakeholder. Separate facts from assumptions before proposing anything. |
| 3 | Ideate | 20 | Generate at least three different approaches. No judging yet — quantity first, then shortlist. |
| 4 | Adapt (twist lands here) | 20 | The Mystery Twist lands here. Reassess the shortlist and adapt the plan to the new reality. |
| 5 | Converge | 15 | Pick one plan, make the trade-offs explicit, and prepare the deliverables. |
| 6 | Present | 10 | Pitch the plan to the Customer (about 5 minutes) and handle questions. |
| 7 | Debrief | 5 | What worked, what you'd change, and what you learned about working together. |

### Facilitator notes (do not show participants)

#### Stakeholder brief

You are Priya Nair, director of BrightPath. You are shaken but practical. Your instinct is to protect the institute's reputation and keep Monday's campaign, which you've already paid ₹40,000 in ads for. You do care about learners and will accept a slower, more honest plan if the team explains why. Push back once on anything that sounds like “tell everyone everything immediately” (“Won't that make it bigger?”) and once on cancelling the campaign. Be firm that you won't fire the admin assistant. You want a fix, not a scapegoat.

#### Likely questions and in-character answers

- **Q:** Can we recall or delete the email from inboxes?  
  **A:** “No. It went to external personal email accounts. We can only ask people to delete it.”
- **Q:** Was the file password-protected or encrypted?  
  **A:** “No. It was a plain spreadsheet.”
- **Q:** How many people have opened it?  
  **A:** “We can't tell. Assume many have.”
- **Q:** Who else has access to the master spreadsheet?  
  **A:** “Everyone on staff. It's on a shared drive with edit access for all 9 staff.”
- **Q:** Do we know who posted the screenshot?  
  **A:** “Yes. It's a former learner who's generally friendly with the institute.”
- **Q:** Do learners consent to us storing those notes?  
  **A:** “Nobody ever asked them. The column just grew over time.”
- **Q:** What tool do we use to send bulk email?  
  **A:** “Our normal email account, with the list in the To/BCC field. No mail-merge tool.”

#### Hidden facts (release only when earned)

- **When:** Team asks whether the spreadsheet has other tabs, or what else is in the file  
  **Reveal:** There is a second, hidden tab containing salary details for 3 staff members. Nobody on staff knows yet.
- **When:** Team asks how learners are reacting or checks the replies  
  **Reveal:** One of the 14 replies is from a learner listed with “fee waiver – family medical issue”. She writes that she is humiliated and considering a complaint.
- **When:** Team asks about similar past incidents  
  **Reveal:** Six months ago, a smaller list of 40 names was sent to the wrong batch. Nobody followed up.

#### Watch for

- Does the team separate tonight's actions from next week's fixes, or blur them together?
- Does anyone ask what is actually in the file before drafting messages?
- Who speaks for the 90 learners with sensitive notes?
- How does the team treat the admin assistant: as a person to support, or a problem to remove?
- Do they explicitly decide on the Monday campaign, or avoid the decision?

#### Possible solution directions (not an answer key)

- Tonight: a short holding email asking recipients not to open, share or forward the file and to delete it. Contact the community-group admin and the poster to take the screenshot down.
- Personal phone calls, not mass email, for the ~90 learners with sensitive notes, plus an offer of a direct contact person.
- Lock down the shared drive and remove or restrict the master sheet. Delete the free-text notes column, or move it to restricted storage.
- Use the single legal consultation early (Saturday) to confirm notification duties and timing, rather than guessing.
- Pause or delay the Monday campaign, or at least change its message, so marketing doesn't land on top of an apology.
- Prevention: a mail-merge tool or BCC-only template, a second-person check before bulk sends with attachments, role-based access, and minimal data in shared files.

#### Common pitfalls

- Writing a long, legalistic apology before containing the spread.
- Over-promising (“your data is completely safe now”).
- Treating it as a tech problem only and ignoring the human impact.
- Blaming the individual instead of the process.

#### Debrief questions

- What did you decide in the first 10 minutes, and would you change it now?
- How did you balance speed against accuracy in your messages?
- Which learners did your plan protect most, and who might still feel let down?
- Which prevention fix would you actually bet on, and why?

#### Suggested twists: T18, T15, T23, T11

---

<a id="redesign-nobody-asked-for"></a>

## Mission 02: The Redesign Nobody Asked For

*A meal-subscription app shipped a bold new design. Its loyal users are revolting. Roll back, fix forward, or something smarter?*

**Level:** Advanced  
**Default length:** 90 minutes (rescalable to 60 or 120)  
**Team size:** 4–7 people  
**Focus:** Product, customer feedback, startup  
**Inspiration:** Inspired by famous launch backlashes, from reformulated classics to app redesigns, where companies understood what customers said but not why they said it.

### Participant brief

#### Situation

DabbaDash is a 3-year-old home-style meal (tiffin) subscription app with 41,000 active subscribers in two cities. It has 18 employees. Subscribers get lunch delivered every weekday and pay monthly.

Six days ago, DabbaDash shipped v5.0, a complete redesign. Three big changes: (1) the one-tap “Skip tomorrow's meal” toggle was replaced by a weekly meal planner; (2) a new “Explore” home feed now promotes partner restaurants; (3) support chat moved from the home screen into a menu.

The Explore feed is tied to a new partner deal that pays DabbaDash ₹9 lakh per quarter. The CEO publicly praised the redesign on social media on launch day.

Since launch, ratings, refunds and cancellations have moved in the wrong direction, but new sign-ups have gone up.

#### What we know

| | |
|---|---|
| App store rating | 4.5 → 3.1 in six days (1,900 new reviews) |
| Review themes (sample of 200) | Can't find skip 41%; too many ads/restaurants 27%; slow on older phones 14%; like the new look 9%; other 9% |
| Daily skips | Down 35%: people miss the skip, meals arrive unwanted, refund requests ×3 |
| Weekly cancellations | 2.1% → 3.4% of subscribers |
| Support tickets | 4× normal volume; average reply time now 31 hours |
| New sign-ups | Up 12%: new users complete onboarding more often in the new design |
| Rollback | The old version can be restored within 48 hours |
| Partner contract | The Explore feed must be “visible on the home screen” until the end of the quarter (10 weeks) |

#### Problem statement

> Decide what DabbaDash does in the next two weeks to win back existing subscribers without throwing away what the redesign got right. Then decide how it communicates with subscribers, the restaurant partner, and its own team.

#### Constraints

- Team capacity: 2 engineers and 1 designer for the next 2 weeks.
- At most one app release per week. Store review takes 1–2 days.
- The partner contract can't be cancelled without losing the ₹9 lakh payment.
- Customer-recovery budget: ₹50,000 (credits, refunds, messaging).
- The CEO's public stance makes a full, silent rollback awkward.

#### Deliverables

1. Your decision (roll back, fix forward, or a hybrid) with the reasoning behind it.
2. A two-week plan: what goes into Release 1 and what goes into Release 2.
3. Subscriber communication: an in-app message and a reply template for negative reviews.
4. How you'll spend (or not spend) the ₹50,000.
5. Two or three metrics, with targets, that tell you within 14 days whether it worked.

#### Roles

- **Customer (CEO)** (any): Plays the CEO. Defends the redesign, cares about the partner deal, and approves the plan.
- **Coordinator** (any): Runs the clock, tracks decisions, and keeps the team focused on two weeks, not two quarters.
- **Data Analyst** (any): Interprets the numbers: which problem is biggest, and which numbers might mislead?
- **Product Designer** (any): Sketches what changes on screen in Release 1 and Release 2.
- **Engineer** (technical): Sanity-checks effort and feasibility within 2 engineers × 2 weeks.
- **Customer Voice** (non-technical): Represents subscribers and drafts the messages and review replies.
- **Presenter** (any): Pitches the decision to the CEO and handles pushback.

#### Success looks like

- The team prioritises by impact, using the data, not by who shouts loudest.
- The plan keeps what improved (new-user onboarding) while fixing what broke.
- The partner contract is read carefully and handled creatively but honestly.
- Communication admits the mistake without trashing the team or the CEO.
- Success metrics are specific and measurable within 14 days.

#### Session plan (90 minutes)

| # | Phase | Minutes | Goal |
|---|---|---|---|
| 1 | Briefing | 10 | Read the brief aloud, draw roles, and agree on who is keeping notes. |
| 2 | Clarify | 10 | Question the Customer/Stakeholder. Separate facts from assumptions before proposing anything. |
| 3 | Ideate | 20 | Generate at least three different approaches. No judging yet — quantity first, then shortlist. |
| 4 | Adapt (twist lands here) | 20 | The Mystery Twist lands here. Reassess the shortlist and adapt the plan to the new reality. |
| 5 | Converge | 15 | Pick one plan, make the trade-offs explicit, and prepare the deliverables. |
| 6 | Present | 10 | Pitch the plan to the Customer (about 5 minutes) and handle questions. |
| 7 | Debrief | 5 | What worked, what you'd change, and what you learned about working together. |

### Facilitator notes (do not show participants)

#### Stakeholder brief

You are Arjun Mehta, CEO of DabbaDash. You're proud of the redesign and convinced long-term users will adapt. You quietly worry about two things: an investor update in three weeks, and the partner revenue, which is about 15% of quarterly revenue. You will change your mind if the team shows you clear data and a way to keep the partner happy. Push back on any plan that just says “roll back everything”: “So the last 4 months were wasted?” Respond well to plans that keep the good parts.

#### Likely questions and in-character answers

- **Q:** What exactly does the partner contract say about the Explore feed?  
  **A:** “It must be visible on the home screen. It doesn't say where on the home screen, or how large.”
- **Q:** How hard is it to bring back the one-tap skip?  
  **A:** “Engineering estimates 2–3 days. The code still exists.”
- **Q:** Why is the app slow on older phones?  
  **A:** “The Explore feed loads lots of restaurant images. Lighter images would help, at about 3 days of work.”
- **Q:** Have we talked to the partner?  
  **A:** “Not since launch. They're happy with the click numbers so far.”
- **Q:** Who is cancelling?  
  **A:** “We haven't looked at that yet.”
- **Q:** Can we A/B test?  
  **A:** “Yes, our tools support feature flags for up to two variants.”

#### Hidden facts (release only when earned)

- **When:** Team asks who is cancelling or segments users by age, tenure or device  
  **Reveal:** Cancellations are concentrated among subscribers older than 2 years and users aged 45+. These are the highest-value, lowest-refund customers.
- **When:** Team asks how the partner is performing  
  **Reveal:** Partner restaurants get plenty of clicks but very few orders. The partner is starting to question the deal's value too.
- **When:** Team asks the support team what they hear most  
  **Reveal:** Many calls are from family members who set the app up for a parent and can no longer find the skip option for them.

#### Watch for

- Does the team frame it as “roll back vs keep” or find a hybrid?
- Does anyone question whether the sign-up increase and the cancellations are really comparable?
- Does the team read the contract wording carefully (“visible”, not “top” or “full-screen”)?
- Does anyone segment users before deciding, or treat all 41,000 as one group?
- Is the tone of the communication defensive, or does it own the problem?

#### Possible solution directions (not an answer key)

- Release 1: bring back the one-tap skip prominently, and move support chat back to the home screen. These are small changes with a big effect on refunds.
- Keep Explore visible on the home screen but lower and smaller, or as a compact strip. That meets the contract while reducing the ad-heavy feel.
- Release 2: lighter images or a “lite mode” for older phones, plus a “classic view” toggle for long-time users.
- Proactively credit subscribers who received unwanted meals during the six days, using part of the ₹50,000.
- Talk to the partner early and frame placement changes as improving their order conversion.
- Reply personally to negative reviews, then ask happy-again users to update their rating.
- Measure skip usage, refund requests, weekly cancellation rate, rating trend, and onboarding completion for new users.

#### Common pitfalls

- Rolling back everything and losing the onboarding gains.
- Ignoring the contract, or assuming it can't be negotiated.
- Planning more work than 2 engineers can ship in 2 weeks.
- Messaging that blames users (“the skip button is just in the planner now!”).

#### Debrief questions

- Which number in the brief most changed your thinking, and which one did you distrust?
- How did you handle the CEO's emotional investment in the redesign?
- What would you have done differently before launch to avoid this?
- How confident are you that your metrics will tell you the truth in 14 days?

#### Suggested twists: T09, T17, T19, T12

---

<a id="courier-down-diwali-up"></a>

## Mission 03: Courier Down, Diwali Up

*Nine days before Diwali, a craft brand's only shipping partner stops pickups. 340 orders are waiting.*

**Level:** Intermediate  
**Default length:** 90 minutes (rescalable to 60 or 120)  
**Team size:** 4–7 people  
**Focus:** Operations, supply chain, small business  
**Inspiration:** Based on classic business-continuity tabletop exercises built around supply-chain disruption, adapted to an Indian festive-season small business.

### Participant brief

#### Situation

Rangrez Crafts is an Ahmedabad-based brand selling hand block-printed bedsheets, cushion covers and table linen through its own website and Instagram. It has 11 staff. Diwali season brings about 40% of annual revenue.

All orders ship through a single shipping aggregator. Tuesday, 9:00 AM, nine days before Diwali, the aggregator emails: because of a dispute with its main courier partner, pickups are suspended for “at least 10 days”, possibly longer.

340 orders are packed or awaiting dispatch. 210 of them are marked “Gift”, with a promised delivery before Diwali. The website banner still says “Delivered before Diwali — or your money back.”

About 100 new orders arrive every day this week. The owner needs a plan by lunchtime.

#### What we know

| | |
|---|---|
| Pending orders | 340 orders, ~₹6.8 lakh total value (average ₹2,000) |
| Gift orders | 210 with a pre-Diwali delivery promise |
| Payment mix | 65% prepaid, 35% cash on delivery (COD) |
| Destinations | 70% outside Gujarat. About 25 orders go to the Northeast or Jammu & Kashmir. |
| Local orders | ~15 within Ahmedabad |
| Average parcel | 1.2 kg |
| Alternatives known | A direct courier account (~40% costlier, 2–3 days for KYC); India Post Speed Post counter 2 km away (~4 days to metros when tried once) |
| Team | Owner, 2 packers, 1 social-media manager, 1 accountant, 6 artisans (not available for logistics) |
| Audience | 48,000 Instagram followers, 4.8★ average rating |

#### Problem statement

> Keep as many delivery promises as possible, protect customer trust, and decide what Rangrez does about new orders, all within a tight extra budget and a tiny team.

#### Constraints

- Extra logistics budget: ₹60,000 maximum. The owner won't borrow.
- No new hires can start within a week.
- Packing capacity is about 80 parcels per day with the current 2 packers.
- Some remote regions will be slow whatever you do.
- The money-back promise is public, and customers have screenshots of it.

#### Deliverables

1. A triage plan for the 340 pending orders: groups, and the action for each group.
2. A decision on new orders this week: keep selling, pause, or change the promise?
3. Customer communication: one version for gift orders, another for everyone else.
4. Budget allocation showing how the ₹60,000 is spent.
5. One “never again” change so a single partner can't stop the business.

#### Roles

- **Customer (Owner)** (any): Plays the owner. Explains the business, answers questions, and approves the plan.
- **Coordinator** (any): Runs the clock and keeps the triage table up to date.
- **Logistics Analyst** (any): Does the maths: capacity, cost per channel, what's possible by when.
- **Customer Care Lead** (non-technical): Writes the customer messages and plans how to handle angry replies.
- **Finance Lead** (any): Owns the ₹60,000 and the cash-flow impact of COD and refunds.
- **Systems Builder** (technical): Designs the order-tagging or tracking sheet and the website/banner changes.
- **Presenter** (any): Presents the plan to the Owner.

#### Success looks like

- Orders are segmented, not treated as one block.
- Numbers are actually worked out (capacity, cost, time), even roughly.
- Customers get choices, not just bad news.
- The public promise is updated quickly and honestly.
- The resilience fix is specific and realistic for a small business.

#### Session plan (90 minutes)

| # | Phase | Minutes | Goal |
|---|---|---|---|
| 1 | Briefing | 10 | Read the brief aloud, draw roles, and agree on who is keeping notes. |
| 2 | Clarify | 10 | Question the Customer/Stakeholder. Separate facts from assumptions before proposing anything. |
| 3 | Ideate | 20 | Generate at least three different approaches. No judging yet — quantity first, then shortlist. |
| 4 | Adapt (twist lands here) | 20 | The Mystery Twist lands here. Reassess the shortlist and adapt the plan to the new reality. |
| 5 | Converge | 15 | Pick one plan, make the trade-offs explicit, and prepare the deliverables. |
| 6 | Present | 10 | Pitch the plan to the Customer (about 5 minutes) and handle questions. |
| 7 | Debrief | 5 | What worked, what you'd change, and what you learned about working together. |

### Facilitator notes (do not show participants)

#### Stakeholder brief

You are Farida Rangrez, owner of Rangrez Crafts. This season makes or breaks your year, so you badly want to keep selling. You're proud of the 4.8★ rating and hate the idea of breaking a promise. You don't know much about logistics alternatives. React emotionally at first (“Should we just refund everyone?”), then calm down if the team shows a clear plan. Push back on any plan that pauses all sales for more than 2 days.

#### Likely questions and in-character answers

- **Q:** Can the aggregator give us a firm date?  
  **A:** “No. Their support line just repeats “at least 10 days”.”
- **Q:** Can our packers work overtime?  
  **A:** “Yes, up to about 120 parcels a day for a week, if we pay overtime (~₹8,000 for the week).”
- **Q:** Can India Post handle COD?  
  **A:** “Yes, but cash takes weeks to reach us and tracking is basic.”
- **Q:** What is the profit margin per order?  
  **A:** “Roughly 35% after materials and artisan pay.”
- **Q:** Do gift customers know the recipient's address and date of need?  
  **A:** “We have the address. Most didn't tell us an exact date.”
- **Q:** Can we deliver locally ourselves?  
  **A:** “The accountant has a scooter and can do about 15 drops a day.”

#### Hidden facts (release only when earned)

- **When:** Team asks about other aggregators or what competitors use  
  **Reveal:** A competitor uses a different aggregator that onboards new sellers within 24 hours, at about 15% higher rates than your usual.
- **When:** Team breaks down gift orders by destination  
  **Reveal:** About 130 of the 210 gift orders go to Mumbai, Bengaluru, Delhi NCR or Pune, which are the fastest metros for most couriers.
- **When:** Team asks about the money-back promise's wording  
  **Reveal:** The terms page says the promise applies only to orders placed at least 7 days before Diwali. Most customers never read it.

#### Watch for

- Does the team ask clarifying questions before jumping to “switch courier”?
- Does anyone do the arithmetic on capacity (80–120 parcels/day) against the backlog plus new orders?
- Is cash flow (COD, refunds) considered, or only shipping?
- Do they update the public promise, or quietly hope no one notices?
- How do they treat the remote-region orders that can't make it whatever happens?

#### Possible solution directions (not an answer key)

- Segment orders by deadline (gift vs non-gift), destination (metro, tier-2, remote, local) and payment (prepaid vs COD).
- Split volume across several channels: a fast-onboarding aggregator for metro gift orders, Speed Post for tier-2 and non-urgent orders, own delivery for local ones.
- Give gift customers a choice: a digital gift card or message now plus the parcel later, a full refund, or keep the order with an honest delivery estimate.
- Offer a small discount to convert COD orders to prepaid, which protects cash flow.
- Update the banner and checkout immediately to show realistic delivery dates. Consider pre-orders with “ships after Diwali” pricing.
- Resilience: keep at least two active shipping partners, with a documented switch-over checklist.

#### Common pitfalls

- Pausing all sales, or refunding everyone, before exploring options.
- Spending the whole budget on one expensive channel for every order.
- Ignoring packing capacity: a new courier doesn't help if parcels can't be packed.
- Hiding behind the fine print instead of using it as one input.

#### Debrief questions

- Which segment of orders did you prioritise, and what did you give up to do it?
- How did the numbers change your first instinct?
- How did you balance honesty with protecting sales?
- What would you put in place before next festive season?

#### Suggested twists: T05, T08, T20, T21

---

<a id="help-desk-black-hole"></a>

## Mission 04: The Help Desk Black Hole

*Requests vanish into WhatsApp, email and hallway chats. Design a system 85 people will actually use, with no budget, live in three weeks.*

**Level:** Starter  
**Default length:** 90 minutes (rescalable to 60 or 120)  
**Team size:** 4–7 people  
**Focus:** Workplace operations, process design, internal tools  
**Inspiration:** Based on the everyday problem of internal request chaos in growing companies, and on why many ticketing tools are abandoned within weeks.

### Participant brief

#### Situation

Kitebridge Software is an 85-person IT services company with one office. A three-person operations team handles every internal request: one IT person (laptops, access, software), one HR executive (letters, leave, policies), and one admin (ID cards, seating, supplies).

Requests arrive through WhatsApp messages, email, the team chat app, and people walking up to desks. Nothing is tracked in one place.

Two years ago, the company bought a ticketing tool. It was abandoned within three weeks: staff kept messaging on WhatsApp, and the ops team ended up copying requests into the tool by hand.

14 new interns join in three weeks. Leadership wants a working system by then and has set the budget at zero: “Use what we already have.”

#### What we know

| | |
|---|---|
| Request volume | ~45 requests/day across IT, HR and Admin |
| Lost requests | 71% of 60 surveyed staff have had a request “lost” at least once |
| Wait time | Median 3.5 days. Worst recent case: a new joiner waited 19 days for remote-access setup. |
| Ops overhead | Each ops person spends ~1.5 hours/day finding, chasing or re-asking about requests |
| Repeat questions | ~30% are repeats: Wi-Fi password, leave policy, payslip download, reimbursement form |
| Tools available | Company email, shared docs & spreadsheets, online forms, team chat app, intranet page |
| Confidential requests | Some requests are sensitive: salary letters, HR complaints, medical leave |

#### Problem statement

> Design an internal request system that staff will actually use, that the ops team can run without extra burden, and that can go live in three weeks for the incoming interns, using only tools the company already has.

#### Constraints

- No new paid tools or subscriptions.
- The ops team can't take on more than 30 extra minutes a day of admin.
- Urgent issues (e.g. a laptop dies before a client call) need a response within 1 hour.
- Confidential HR requests must not be visible to IT or Admin.
- Must be live and explained to everyone within 3 weeks.

#### Deliverables

1. The request flow: the steps from “I need something” to “done”.
2. What the front door looks like: the channel, plus the form fields or message format.
3. How urgent and confidential requests are handled differently.
4. An adoption plan: how people switch, and what happens to WhatsApp requests after launch day.
5. How you'll know in 30 days whether it worked (2–3 measures).

#### Roles

- **Stakeholder (Ops Lead)** (any): Plays the HR executive who leads ops. Tired, skeptical, and the final approver.
- **Coordinator** (any): Runs the clock and keeps the team on a three-week scope.
- **User Researcher** (non-technical): Represents employees: what will make them actually use it?
- **Process Designer** (any): Maps the flow, owners, and response-time rules.
- **Tool Builder** (technical): Designs (or quickly prototypes) the form, tracker or chat setup with existing tools.
- **Change Champion** (non-technical): Plans the launch, the messaging, and how to handle people who bypass the system.
- **Presenter** (any): Presents the design to the Ops Lead.

#### Success looks like

- The team learns why the last tool failed before designing a new one.
- The design reduces work for ops instead of adding to it.
- Repeat questions are answered without creating a ticket.
- Urgent and confidential paths are clear and simple.
- The adoption plan deals with leaders and old habits, not just the tool.

#### Session plan (90 minutes)

| # | Phase | Minutes | Goal |
|---|---|---|---|
| 1 | Briefing | 10 | Read the brief aloud, draw roles, and agree on who is keeping notes. |
| 2 | Clarify | 10 | Question the Customer/Stakeholder. Separate facts from assumptions before proposing anything. |
| 3 | Ideate | 20 | Generate at least three different approaches. No judging yet — quantity first, then shortlist. |
| 4 | Adapt (twist lands here) | 20 | The Mystery Twist lands here. Reassess the shortlist and adapt the plan to the new reality. |
| 5 | Converge | 15 | Pick one plan, make the trade-offs explicit, and prepare the deliverables. |
| 6 | Present | 10 | Pitch the plan to the Customer (about 5 minutes) and handle questions. |
| 7 | Debrief | 5 | What worked, what you'd change, and what you learned about working together. |

### Facilitator notes (do not show participants)

#### Stakeholder brief

You are Meena Shah, HR executive and informal lead of the ops team. You're exhausted, and skeptical of any new system: “Last time, the tool made MORE work for us.” You want something simple. You'll warm up if the team clearly asks about your workload and shows how the design saves you time. Push back hard on anything that requires you to copy requests from WhatsApp into a tracker.

#### Likely questions and in-character answers

- **Q:** Why did the last tool fail?  
  **A:** “It was hard to use, needed a separate login, and nobody senior used it. People kept messaging us, and we had to re-enter everything.”
- **Q:** Which requests are most common?  
  **A:** “Access and password resets, leave queries, letters (address proof, experience), and supplies.”
- **Q:** What counts as urgent?  
  **A:** “Anything that stops someone from working right now, especially before client calls.”
- **Q:** Does everyone have a company email and chat account?  
  **A:** “Yes. Interns get theirs on day one.”
- **Q:** Can we block WhatsApp requests?  
  **A:** “We can't stop people messaging, but we can choose how we respond.”
- **Q:** Who in leadership supports this?  
  **A:** “The COO asked for it. The CEO hasn't said much.”

#### Hidden facts (release only when earned)

- **When:** Team asks who sends the most requests, or how leaders make requests  
  **Reveal:** The CEO sends requests by WhatsApp late at night and expects an instant reply. Everyone has noticed.
- **When:** Team asks about existing documentation or FAQs  
  **Reveal:** An onboarding document with most of the repeat answers exists, but it's out of date and buried in a shared folder nobody can find.
- **When:** Team asks the IT person what slows them down  
  **Reveal:** Half of IT requests lack basic details (laptop ID, which software, which project), so every request needs a back-and-forth.

#### Watch for

- Does the team ask why the last tool failed before designing?
- Do they protect the ops team's time, or design a beautiful system ops can't run?
- Is there a self-service answer for the 30% of repeat questions?
- Do they design a separate confidential route for HR?
- Does the adoption plan address leadership behaviour (the hidden CEO fact) if it surfaces?

#### Possible solution directions (not an answer key)

- One front door: a short online form (or a dedicated chat space) with category, urgency and required details, feeding one shared tracker.
- Smart required fields, so IT gets laptop ID and software name up front, which cuts back-and-forth.
- A self-service FAQ page that answers the repeat 30% and is linked from the form.
- Urgent path: a separate channel or phone number with a 1-hour response rule.
- Confidential HR requests: a separate form going only to HR.
- Adoption: a friendly “please use the form — here's the link” reply template, leaders using it first (including the CEO), and launching with the interns as the pilot group.
- Measure median time to resolve, number of requests outside the system, and ops time spent chasing.

#### Common pitfalls

- Designing a complex, many-step workflow that recreates the failed tool.
- Ignoring how people actually behave (WhatsApp habits).
- Forgetting confidentiality.
- No owner for keeping the FAQ and tracker up to date.

#### Debrief questions

- What did you learn from the last tool's failure, and how did it shape your design?
- How did your plan treat senior people who bypass the system?
- Where would your design break first in real life?
- How did technical and non-technical teammates contribute differently?

#### Suggested twists: T12, T07, T14, T22

---

## Mystery Twist Deck

24 reusable, scenario-independent cards across 12 categories.

| Difficulty | Meaning | Cards |
|---|---|---|
| Minor | A tweak; the plan survives with adjustments (~5 min) | 6 |
| Moderate | One part of the plan must be reworked (~10 min) | 11 |
| Major | The team must reconsider its whole approach (~15 min) | 7 |

### Customer Changes

#### T01: The New Must-Have

**Category:** Customer Changes  
**Difficulty:** Moderate

**Card text (read aloud):**

> Message from the customer: “We've just realised one thing is non-negotiable. Whatever you propose must work for people who aren't comfortable with technology or with English. If it doesn't, we can't approve it.”

**When to reveal:** Early-to-mid: right after the team has shortlisted ideas (about 35–45% into the session).

**Impact:** Challenges the team's picture of who the end user is. Ideas that rely on apps, long forms or English-only messaging have to be rethought.

**Facilitator guidance:** Watch whether the team re-checks every part of the plan or just bolts on “we'll translate it”. Notice who starts speaking for the less tech-savvy user, and whether anyone asks the customer which groups they mean.

#### T02: Changed Our Mind

**Category:** Customer Changes  
**Difficulty:** Major

**Card text (read aloud):**

> The customer has looked at your direction and rejects your team's favourite idea outright: “That's not what we need. Keep going, just not that.” They won't explain further unless you ask good questions.

**When to reveal:** Mid-session: just after the team commits to a leading idea (about 50%).

**Impact:** Removes the team's leading idea and tests how attached they were to it. Forces them to understand the customer's real need instead of defending a solution.

**Facilitator guidance:** As the customer, give a real reason only if asked a specific question (pick one that fits the mission: cost, risk, brand, or effort). Observe the emotional reaction, whether the team salvages useful parts of the rejected idea, and whether they ask “why” before starting over.

### Budget Changes

#### T03: Budget Cut in Half

**Category:** Budget Changes  
**Difficulty:** Moderate

**Card text (read aloud):**

> Finance update: the budget for your solution has just been cut by 50%, effective immediately. Nothing that was previously approved is guaranteed.

**When to reveal:** Mid-session, once the team has started assigning money or effort to parts of the plan (about 45–55%).

**Impact:** Tests whether the team actually knows what each part of the plan costs, and what they'll protect when forced to cut.

**Facilitator guidance:** Notice whether the team prices items or hand-waves. What do they cut first: the customer-facing part or the internal part? Do they look for free alternatives, phase the work, or just shrink everything evenly?

#### T04: Money With Strings

**Category:** Budget Changes  
**Difficulty:** Moderate

**Card text (read aloud):**

> Good news, sort of. A sponsor will double your budget, but only if their name is visible to every customer you serve and they get to see the results data at the end.

**When to reveal:** Mid-to-late: after the team has a budget-limited plan (about 55–65%).

**Impact:** Turns a resource gain into a trade-off between funding, brand independence, customer perception and data privacy.

**Facilitator guidance:** See whether the team accepts automatically or weighs the conditions. Do they consider what customers will think, what “results data” could include, and whether to negotiate the terms? There's no right answer. Look for an explicit, reasoned choice.

### Time Pressure

#### T05: Deadline Moved Up

**Category:** Time Pressure  
**Difficulty:** Major

**Card text (read aloud):**

> The deadline has moved. A working first version of whatever you're proposing is now needed in half the time. The full version can follow later.

**When to reveal:** Mid-session, once a full plan exists (about 50%).

**Impact:** Forces the team to split the plan into “first version now” and “later”, and to find the smallest thing that still solves the core problem.

**Facilitator guidance:** Look for a clear phase 1 vs phase 2 split. Does the team protect the most critical element, or keep the easiest parts? Notice whether anyone checks with the customer what “working” means.

#### T06: Ten-Minute Warning

**Category:** Time Pressure  
**Difficulty:** Minor

**Card text (read aloud):**

> The decision-maker has to leave early. Your team now presents 5 minutes earlier than planned, and you get only 3 minutes to pitch, with no more than one page of notes or slides.

**When to reveal:** Late: during convergence, about 70–80% into the session.

**Impact:** Tests clarity and prioritisation of the message rather than the plan itself.

**Facilitator guidance:** Shorten the clock for real. Watch who edits ruthlessly, whether the pitch leads with the decision and the ask, and whether the team stays calm or scrambles to fit everything in.

### Resource Loss

#### T07: Key Person Out

**Category:** Resource Loss  
**Difficulty:** Moderate

**Card text (read aloud):**

> Your Coordinator (or whoever has spoken most so far) has been called away. For the next 15 minutes they may listen but not speak, write or point. The team carries on without them.

**When to reveal:** Mid-session, when one person is clearly driving (about 40–60%).

**Impact:** Exposes dependence on one person and whether knowledge has been shared or written down.

**Facilitator guidance:** Enforce the silence gently. Observe who steps up, whether quieter members contribute more, and whether the team can find its own notes. Ask the silenced person afterwards what they noticed from the outside.

#### T08: The Tool Is Gone

**Category:** Resource Loss  
**Difficulty:** Moderate

**Card text (read aloud):**

> The main tool, system, supplier or channel your plan relies on is unavailable: an outage, a cancelled contract, or blocked by policy. Assume it won't be back in time.

**When to reveal:** Mid-session, once the plan clearly depends on one tool or partner (about 45–55%).

**Impact:** Reveals single points of failure. The team needs a fallback that doesn't depend on the lost resource.

**Facilitator guidance:** If several tools are involved, you choose the one the plan leans on most. Notice whether the team designs a genuine fallback or just swaps in a near-identical tool, and whether they add resilience to the final plan.

### New Information

#### T09: The Numbers Were Wrong

**Category:** New Information  
**Difficulty:** Major

**Card text (read aloud):**

> Correction from the data team: the most important number your team has been relying on is wrong. The real figure is about half what you were told. The facilitator will tell you which number.

**When to reveal:** Mid-session, after the team has visibly anchored on a figure (about 45–55%).

**Impact:** Challenges a core assumption and tests whether the solution is proportionate to the real size of the problem.

**Facilitator guidance:** Pick the figure the team quoted most often. Watch whether they know which parts of the plan rested on it, whether they right-size the response (it may now be over-engineered, or a different problem may now be the biggest), and whether they ask how reliable the other numbers are.

#### T10: Someone Already Tried This

**Category:** New Information  
**Difficulty:** Minor

**Card text (read aloud):**

> You discover that an approach very similar to your current plan was tried 18 months ago and quietly abandoned. Nobody wrote down why. One person who was there can answer exactly two questions.

**When to reveal:** Mid-session, once the team has a favoured approach (about 40–55%).

**Impact:** Tests whether the team learns from history, and the quality of their questions.

**Facilitator guidance:** Answer only two questions, in character. A good default reason for the failure: “No one owned it after launch, so it slowly died.” Notice whether the questions are sharp (“What exactly made people stop?”) or vague, and whether the team designs around the cause.

### Stakeholder Conflict

#### T11: Two Bosses, Two Answers

**Category:** Stakeholder Conflict  
**Difficulty:** Major

**Card text (read aloud):**

> Two senior stakeholders have weighed in. One says: “Speed matters most. Get something out this week.” The other says: “Quality and safety matter most. Nothing goes out until it's right.” Both must sign off on your plan.

**When to reveal:** Mid-to-late: when the team is converging (about 55–65%).

**Impact:** Introduces incompatible priorities. The team must negotiate, sequence or design a plan both can accept, rather than pick a winner.

**Facilitator guidance:** Optionally ask two volunteers to voice the stakeholders. Watch whether the team makes the trade-off explicit, finds a creative middle (phasing, guardrails, a limited pilot), or just picks the louder side.

#### T12: The Frontline Pushback

**Category:** Stakeholder Conflict  
**Difficulty:** Major

**Card text (read aloud):**

> The people who will actually run your solution day to day have seen the plan. They say it will double their workload and they won't support it as designed.

**When to reveal:** Mid-to-late, after the plan's daily operation is clear (about 55–70%).

**Impact:** Tests whether the design works for the operators, not just the customer, and whether adoption has been considered.

**Facilitator guidance:** If asked, give one concrete complaint (e.g. “We'd have to enter everything twice”). Watch whether the team listens and reduces the burden, or tries to “sell” the plan harder. Strong teams invite the frontline perspective into the redesign.

### Technical Limitations

#### T13: It Doesn't Scale

**Category:** Technical Limitations  
**Difficulty:** Moderate

**Card text (read aloud):**

> Technical review: your approach works for a small group but breaks at full scale. It would take ten times the people-hours or system capacity you planned for.

**When to reveal:** Mid-session, once the method is defined (about 45–60%).

**Impact:** Challenges feasibility. The team must automate, prioritise, pilot, or rethink the method.

**Facilitator guidance:** Notice whether the team asks which part breaks, or assumes the whole thing fails. Good responses include piloting with a subset, prioritising the highest-impact cases, or simplifying the process. Note whether anyone checks capacity numbers.

#### T14: Old Phones, Weak Signal

**Category:** Technical Limitations  
**Difficulty:** Minor

**Card text (read aloud):**

> Reality check: about a third of the people you serve use older low-end phones or have unreliable internet. Anything that needs a new app, large downloads or a constant connection won't reach them.

**When to reveal:** Early-to-mid: once the team proposes a digital channel (about 30–45%).

**Impact:** Challenges technology assumptions and widens the solution to low-bandwidth or offline options.

**Facilitator guidance:** Watch for practical alternatives (SMS, a phone call, printed or in-person options, lightweight pages) versus dismissing the group as an edge case.

### Compliance and Safety

#### T15: Privacy Check

**Category:** Compliance and Safety  
**Difficulty:** Moderate

**Card text (read aloud):**

> Compliance flag: part of your plan collects, shares or stores personal information. Before approval, you must show what data you need, who can see it, how long you keep it, and how people agree to it. Otherwise, remove that part.

**When to reveal:** Mid-session, as soon as the plan touches personal data (about 40–60%).

**Impact:** Pushes the team toward data minimisation and clear consent.

**Facilitator guidance:** Look for the team shrinking the data they collect rather than just adding a consent checkbox. Note whether they think about access rights and deletion. Don't require legal precision; reward clear, sensible reasoning.

#### T16: Policy Says No

**Category:** Compliance and Safety  
**Difficulty:** Major

**Card text (read aloud):**

> A rule nobody mentioned has surfaced: the main action at the centre of your plan isn't allowed without written approval, and approval takes two weeks.

**When to reveal:** Mid-session, once the core action is clear (about 45–55%).

**Impact:** Blocks the core action. The team must find a compliant alternative, a way to act within the rules while approval is pending, or a legitimate fast-track.

**Facilitator guidance:** Make it clear that breaking the rule isn't an option. Watch whether the team gives up, ignores the rule, or creatively finds what they can do now (interim measures, a smaller scope that doesn't need approval, starting the approval request immediately).

### Customer Feedback

#### T17: The Pilot Said “Meh”

**Category:** Customer Feedback  
**Difficulty:** Moderate

**Card text (read aloud):**

> Quick feedback from five real users who saw your idea: three found it confusing, one liked it, and one said, “I'd never use this. I'd just call someone.”

**When to reveal:** Mid-to-late, once a concrete solution exists (about 55–65%).

**Impact:** Challenges usability and whether the solution fits real behaviour.

**Facilitator guidance:** Notice whether the team dismisses the feedback (“small sample”), digs into it (“What confused them?”), or simplifies. Also notice whether anyone takes the “I'd just call someone” comment seriously as an insight.

#### T18: The Loudest Voice

**Category:** Customer Feedback  
**Difficulty:** Minor

**Card text (read aloud):**

> A single angry customer post about this situation has gone viral overnight with thousands of shares. It's partly inaccurate. Your plan now needs a public response within the hour.

**When to reveal:** Any time after the plan's direction is set (about 40–70%).

**Impact:** Adds public-communication pressure and tests accuracy, tone and priorities under scrutiny.

**Facilitator guidance:** Watch whether the team corrects inaccuracies without sounding defensive, and whether the viral post hijacks the whole plan or is handled proportionately. A strong response acknowledges, corrects and commits to action.

### Market or Competitor Changes

#### T19: Competitor Beat You to It

**Category:** Market or Competitor Changes  
**Difficulty:** Moderate

**Card text (read aloud):**

> A competitor has just announced something almost identical to your idea, and it's free. Your customers are already asking why they should wait for yours.

**When to reveal:** Mid-to-late, once the solution is defined (about 55–65%).

**Impact:** Forces the team to find what's genuinely different or valuable about their approach, or to change course.

**Facilitator guidance:** Look for the team identifying a real differentiator (trust, fit to their specific customers, service) instead of panicking. Note whether anyone suggests partnering with or learning from the competitor.

#### T20: Price Shock

**Category:** Market or Competitor Changes  
**Difficulty:** Moderate

**Card text (read aloud):**

> External costs have jumped: a key cost your plan depends on (shipping, fuel, advertising, cloud services, materials, or similar) has risen by 40% this week, and nobody knows for how long.

**When to reveal:** Mid-session, after costs are estimated (about 45–60%).

**Impact:** Tests whether the plan's economics still work and how the team handles uncertainty about duration.

**Facilitator guidance:** You choose the cost that fits the mission. Watch whether the team recalculates, passes cost to customers, absorbs it short-term, or redesigns to depend less on that input. Note how they plan for not knowing how long it will last.

### Unexpected Opportunities

#### T21: A Helping Hand

**Category:** Unexpected Opportunities  
**Difficulty:** Minor

**Card text (read aloud):**

> A partner organisation offers five volunteers for one week, free. They're enthusiastic but untrained, and they can't access your internal systems or customer data.

**When to reveal:** Any time after the plan has clear tasks (about 35–65%).

**Impact:** Tests whether the team can use extra resources wisely, given the limits.

**Facilitator guidance:** Notice whether the team finds suitable tasks (packing, phoning with scripts, testing, outreach) or forces volunteers into roles that break the data restriction. It's also fine if they decide the volunteers aren't worth the coordination cost, as long as they reason about it.

#### T22: The Shortcut

**Category:** Unexpected Opportunities  
**Difficulty:** Minor

**Card text (read aloud):**

> Someone has found an existing tool, service or partner that already does about 70% of what you need. Using it means giving up control over how it looks and works, and depending on an outside party.

**When to reveal:** Mid-session, while the team is designing its own solution (about 40–55%).

**Impact:** Raises a build-versus-use decision: speed against control and dependence.

**Facilitator guidance:** Watch whether the team evaluates what the missing 30% is and whether it matters. Note whether they consider lock-in risk, cost over time, and who owns it if the partner changes.

### Ethical Dilemmas

#### T23: Quiet Fix or Full Disclosure

**Category:** Ethical Dilemmas  
**Difficulty:** Major

**Card text (read aloud):**

> You discover that your own organisation made a mistake that contributed to this problem. Customers don't know. Disclosing it will cost trust and maybe money in the short term. Staying quiet probably won't be discovered.

**When to reveal:** Mid-to-late, once the communication plan is forming (about 55–70%).

**Impact:** Creates a direct trade-off between transparency and short-term self-interest. It can reshape all external communication.

**Facilitator guidance:** Don't steer toward an answer. Observe how the team reasons: long-term trust, likelihood of discovery, fairness to customers, and consequences for the people involved. Notice who argues which side and whether the team reaches a decision it can explain.

#### T24: Fair for Whom?

**Category:** Ethical Dilemmas  
**Difficulty:** Moderate

**Card text (read aloud):**

> Your solution helps most people, but the quickest version leaves out one group, such as people with disabilities, a particular region, or people who can't pay. Including them doubles the effort for that part.

**When to reveal:** Mid-to-late, after the solution's reach is clear (about 50–65%).

**Impact:** Forces an explicit fairness trade-off between speed and inclusion.

**Facilitator guidance:** You can name the left-out group to fit the mission. Watch whether the team acknowledges the exclusion openly, finds a cheaper interim option for that group, or phases inclusion with a commitment. Avoid rewarding token gestures.

---

## Team evaluation checklist

Each criterion is scored 0 = Not seen, 1 = Emerging, 2 = Solid, 3 = Excellent.

| Criterion | Look for |
|---|---|
| Understood the real problem | Asked clarifying questions and separated facts from assumptions before solving. |
| Explored alternatives | Generated several distinct options before converging on one. |
| Prioritised under constraints | Made trade-offs explicit and respected the stated time, budget and people limits. |
| Adapted to the twist | Reassessed calmly, kept what still worked, and changed what no longer did. |
| Collaborated as a team | Everyone contributed. Roles were used, and quieter voices were drawn in. |
| Considered people and risks | Thought about who is affected, plus fairness, privacy and what could go wrong. |
| Feasible, concrete plan | Clear owners, steps and timing. It could realistically be started tomorrow. |
| Clear, convincing pitch | Led with the decision, explained the why, and handled questions well. |
