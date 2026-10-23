import type { Mission, Phase } from "./types";

// Default 90-minute session plan. The timer scales these proportionally for
// 60- or 120-minute sessions. A mission can override phases if it needs to.
export const standardPhases: Phase[] = [
  {
    name: "Briefing",
    minutes: 10,
    goal: "Read the brief aloud, draw roles, and agree on who is keeping notes.",
  },
  {
    name: "Clarify",
    minutes: 10,
    goal: "Question the Customer/Stakeholder. Separate facts from assumptions before proposing anything.",
  },
  {
    name: "Ideate",
    minutes: 20,
    goal: "Generate at least three different approaches. No judging yet — quantity first, then shortlist.",
  },
  {
    name: "Adapt",
    minutes: 20,
    goal: "The Mystery Twist lands here. Reassess the shortlist and adapt the plan to the new reality.",
    twistWindow: true,
  },
  {
    name: "Converge",
    minutes: 15,
    goal: "Pick one plan, make the trade-offs explicit, and prepare the deliverables.",
  },
  {
    name: "Present",
    minutes: 10,
    goal: "Pitch the plan to the Customer (about 5 minutes) and handle questions.",
  },
  {
    name: "Debrief",
    minutes: 5,
    goal: "What worked, what you'd change, and what you learned about working together.",
  },
];

export const missions: Mission[] = [
  // ---------------------------------------------------------------------------
  {
    id: "reply-all-meltdown",
    codename: "MISSION 01",
    title: "Reply-All Meltdown",
    tagline:
      "A spreadsheet of learner data just went to 2,412 people. You have 72 hours to make it right.",
    domain: "Data privacy, customer trust, communication",
    level: "Intermediate",
    defaultMinutes: 90,
    teamSize: "4–7 people",
    inspiration:
      "Adapted from common small-business data incidents, where most exposures come from an email or attachment sent to the wrong people rather than a hack.",
    brief: {
      situation: [
        "BrightPath Skills is an upskilling institute for working professionals, with three centres and about 2,400 active learners. It has 9 staff: a director, two admin assistants, and six trainers. A part-time IT contractor helps on weekends.",
        "Friday, 6:40 PM. An admin assistant meant to send a polite fee reminder to 38 learners with overdue fees. Instead, she attached the master learner spreadsheet and sent it to the full “All Learners” mailing list: 2,412 addresses.",
        "The spreadsheet holds every learner's full name, phone number, email, course, fee paid and fee due. For about 90 learners, a free-text “Notes” column holds comments such as “asked for EMI – job loss” or “fee waiver – family medical issue”. There are no bank details or passwords.",
        "It is now 7:20 PM. The director is travelling but reachable by phone. The institute has no written plan for an incident like this.",
      ],
      facts: [
        { label: "Recipients", value: "2,412 email addresses (all current and recent learners)" },
        { label: "Records exposed", value: "~2,400 learners: name, phone, email, course, fees" },
        { label: "Sensitive notes", value: "~90 learners with personal or financial comments" },
        { label: "Replies so far", value: "14 replies, 3 of them “reply-all” asking “why do I have this?”" },
        { label: "Social media", value: "A learner posted a blurred screenshot in a 600-member professional community group" },
        { label: "Email recall", value: "Not possible: recall only works inside the institute's own domain" },
        { label: "Who opened it", value: "Unknown. No read tracking." },
        { label: "Next big event", value: "New-batch admissions campaign scheduled to launch Monday, 9 AM" },
      ],
      problemStatement:
        "Design BrightPath's response for the next 72 hours: contain the exposure, communicate honestly with learners, support the people most affected, and make sure this can't easily happen again, without making the situation worse.",
      constraints: [
        "72-hour planning horizon (Friday evening to Monday evening).",
        "Budget for outside help: ₹25,000 maximum.",
        "No lawyer on retainer. You can book a single 30-minute paid consultation.",
        "Assume data-protection law where BrightPath operates may require notifying a regulator and affected people within a short window. You don't need the legal details, but your plan must show how and when you'd confirm the obligations.",
        "Only the director can approve public statements. She is on a train with patchy signal.",
        "The admin assistant who sent the email is very upset and wants to resign.",
      ],
      deliverables: [
        "First-hour action list: what happens tonight, and who owns each action.",
        "Draft message to all 2,412 recipients, plus a different approach for the ~90 learners with sensitive notes.",
        "A 72-hour timeline covering containment, communication, support and decisions.",
        "Three prevention changes, ranked by impact against effort.",
        "Your decision on Monday's admissions campaign, with reasons.",
      ],
      roles: [
        { name: "Stakeholder (Director)", fit: "any", responsibility: "Plays the director. Answers questions in character and approves or rejects the plan. The facilitator gives this person the stakeholder brief." },
        { name: "Coordinator", fit: "any", responsibility: "Runs the clock, keeps the action list, and makes sure every action has an owner." },
        { name: "Communications Lead", fit: "non-technical", responsibility: "Drafts the learner messages and decides tone, channel and timing." },
        { name: "Risk Analyst", fit: "any", responsibility: "Sizes the harm. Who is most affected, and what could go wrong next?" },
        { name: "Process & Tools Builder", fit: "technical", responsibility: "Designs the prevention fixes: tools, access rules, checks." },
        { name: "Reviewer (Red Team)", fit: "any", responsibility: "Reads every draft as an angry learner would and finds the weak spots." },
        { name: "Presenter", fit: "any", responsibility: "Delivers the final plan to the Director." },
      ],
      successLooksLike: [
        "Immediate containment steps come before polished messaging.",
        "Messages are honest, specific, and don't blame an individual.",
        "Learners with sensitive notes get a more personal, separate approach.",
        "The plan shows when and how legal obligations get checked.",
        "Prevention fixes address the process, not just “be more careful”.",
      ],
    },
    phases: standardPhases,
    facilitator: {
      stakeholderBrief:
        "You are Priya Nair, director of BrightPath. You are shaken but practical. Your instinct is to protect the institute's reputation and keep Monday's campaign, which you've already paid ₹40,000 in ads for. You do care about learners and will accept a slower, more honest plan if the team explains why. Push back once on anything that sounds like “tell everyone everything immediately” (“Won't that make it bigger?”) and once on cancelling the campaign. Be firm that you won't fire the admin assistant. You want a fix, not a scapegoat.",
      stakeholderAnswers: [
        { question: "Can we recall or delete the email from inboxes?", answer: "No. It went to external personal email accounts. We can only ask people to delete it." },
        { question: "Was the file password-protected or encrypted?", answer: "No. It was a plain spreadsheet." },
        { question: "How many people have opened it?", answer: "We can't tell. Assume many have." },
        { question: "Who else has access to the master spreadsheet?", answer: "Everyone on staff. It's on a shared drive with edit access for all 9 staff." },
        { question: "Do we know who posted the screenshot?", answer: "Yes. It's a former learner who's generally friendly with the institute." },
        { question: "Do learners consent to us storing those notes?", answer: "Nobody ever asked them. The column just grew over time." },
        { question: "What tool do we use to send bulk email?", answer: "Our normal email account, with the list in the To/BCC field. No mail-merge tool." },
      ],
      hiddenFacts: [
        { trigger: "Team asks whether the spreadsheet has other tabs, or what else is in the file", reveal: "There is a second, hidden tab containing salary details for 3 staff members. Nobody on staff knows yet." },
        { trigger: "Team asks how learners are reacting or checks the replies", reveal: "One of the 14 replies is from a learner listed with “fee waiver – family medical issue”. She writes that she is humiliated and considering a complaint." },
        { trigger: "Team asks about similar past incidents", reveal: "Six months ago, a smaller list of 40 names was sent to the wrong batch. Nobody followed up." },
      ],
      watchFor: [
        "Does the team separate tonight's actions from next week's fixes, or blur them together?",
        "Does anyone ask what is actually in the file before drafting messages?",
        "Who speaks for the 90 learners with sensitive notes?",
        "How does the team treat the admin assistant: as a person to support, or a problem to remove?",
        "Do they explicitly decide on the Monday campaign, or avoid the decision?",
      ],
      solutionDirections: [
        "Tonight: a short holding email asking recipients not to open, share or forward the file and to delete it. Contact the community-group admin and the poster to take the screenshot down.",
        "Personal phone calls, not mass email, for the ~90 learners with sensitive notes, plus an offer of a direct contact person.",
        "Lock down the shared drive and remove or restrict the master sheet. Delete the free-text notes column, or move it to restricted storage.",
        "Use the single legal consultation early (Saturday) to confirm notification duties and timing, rather than guessing.",
        "Pause or delay the Monday campaign, or at least change its message, so marketing doesn't land on top of an apology.",
        "Prevention: a mail-merge tool or BCC-only template, a second-person check before bulk sends with attachments, role-based access, and minimal data in shared files.",
      ],
      commonPitfalls: [
        "Writing a long, legalistic apology before containing the spread.",
        "Over-promising (“your data is completely safe now”).",
        "Treating it as a tech problem only and ignoring the human impact.",
        "Blaming the individual instead of the process.",
      ],
      debriefQuestions: [
        "What did you decide in the first 10 minutes, and would you change it now?",
        "How did you balance speed against accuracy in your messages?",
        "Which learners did your plan protect most, and who might still feel let down?",
        "Which prevention fix would you actually bet on, and why?",
      ],
      recommendedTwists: ["T18", "T15", "T23", "T11"],
    },
  },

  // ---------------------------------------------------------------------------
  {
    id: "redesign-nobody-asked-for",
    codename: "MISSION 02",
    title: "The Redesign Nobody Asked For",
    tagline:
      "A meal-subscription app shipped a bold new design. Its loyal users are revolting. Roll back, fix forward, or something smarter?",
    domain: "Product, customer feedback, startup",
    level: "Advanced",
    defaultMinutes: 90,
    teamSize: "4–7 people",
    inspiration:
      "Inspired by famous launch backlashes, from reformulated classics to app redesigns, where companies understood what customers said but not why they said it.",
    brief: {
      situation: [
        "DabbaDash is a 3-year-old home-style meal (tiffin) subscription app with 41,000 active subscribers in two cities. It has 18 employees. Subscribers get lunch delivered every weekday and pay monthly.",
        "Six days ago, DabbaDash shipped v5.0, a complete redesign. Three big changes: (1) the one-tap “Skip tomorrow's meal” toggle was replaced by a weekly meal planner; (2) a new “Explore” home feed now promotes partner restaurants; (3) support chat moved from the home screen into a menu.",
        "The Explore feed is tied to a new partner deal that pays DabbaDash ₹9 lakh per quarter. The CEO publicly praised the redesign on social media on launch day.",
        "Since launch, ratings, refunds and cancellations have moved in the wrong direction, but new sign-ups have gone up.",
      ],
      facts: [
        { label: "App store rating", value: "4.5 → 3.1 in six days (1,900 new reviews)" },
        { label: "Review themes (sample of 200)", value: "Can't find skip 41%; too many ads/restaurants 27%; slow on older phones 14%; like the new look 9%; other 9%" },
        { label: "Daily skips", value: "Down 35%: people miss the skip, meals arrive unwanted, refund requests ×3" },
        { label: "Weekly cancellations", value: "2.1% → 3.4% of subscribers" },
        { label: "Support tickets", value: "4× normal volume; average reply time now 31 hours" },
        { label: "New sign-ups", value: "Up 12%: new users complete onboarding more often in the new design" },
        { label: "Rollback", value: "The old version can be restored within 48 hours" },
        { label: "Partner contract", value: "The Explore feed must be “visible on the home screen” until the end of the quarter (10 weeks)" },
      ],
      problemStatement:
        "Decide what DabbaDash does in the next two weeks to win back existing subscribers without throwing away what the redesign got right. Then decide how it communicates with subscribers, the restaurant partner, and its own team.",
      constraints: [
        "Team capacity: 2 engineers and 1 designer for the next 2 weeks.",
        "At most one app release per week. Store review takes 1–2 days.",
        "The partner contract can't be cancelled without losing the ₹9 lakh payment.",
        "Customer-recovery budget: ₹50,000 (credits, refunds, messaging).",
        "The CEO's public stance makes a full, silent rollback awkward.",
      ],
      deliverables: [
        "Your decision (roll back, fix forward, or a hybrid) with the reasoning behind it.",
        "A two-week plan: what goes into Release 1 and what goes into Release 2.",
        "Subscriber communication: an in-app message and a reply template for negative reviews.",
        "How you'll spend (or not spend) the ₹50,000.",
        "Two or three metrics, with targets, that tell you within 14 days whether it worked.",
      ],
      roles: [
        { name: "Customer (CEO)", fit: "any", responsibility: "Plays the CEO. Defends the redesign, cares about the partner deal, and approves the plan." },
        { name: "Coordinator", fit: "any", responsibility: "Runs the clock, tracks decisions, and keeps the team focused on two weeks, not two quarters." },
        { name: "Data Analyst", fit: "any", responsibility: "Interprets the numbers: which problem is biggest, and which numbers might mislead?" },
        { name: "Product Designer", fit: "any", responsibility: "Sketches what changes on screen in Release 1 and Release 2." },
        { name: "Engineer", fit: "technical", responsibility: "Sanity-checks effort and feasibility within 2 engineers × 2 weeks." },
        { name: "Customer Voice", fit: "non-technical", responsibility: "Represents subscribers and drafts the messages and review replies." },
        { name: "Presenter", fit: "any", responsibility: "Pitches the decision to the CEO and handles pushback." },
      ],
      successLooksLike: [
        "The team prioritises by impact, using the data, not by who shouts loudest.",
        "The plan keeps what improved (new-user onboarding) while fixing what broke.",
        "The partner contract is read carefully and handled creatively but honestly.",
        "Communication admits the mistake without trashing the team or the CEO.",
        "Success metrics are specific and measurable within 14 days.",
      ],
    },
    phases: standardPhases,
    facilitator: {
      stakeholderBrief:
        "You are Arjun Mehta, CEO of DabbaDash. You're proud of the redesign and convinced long-term users will adapt. You quietly worry about two things: an investor update in three weeks, and the partner revenue, which is about 15% of quarterly revenue. You will change your mind if the team shows you clear data and a way to keep the partner happy. Push back on any plan that just says “roll back everything”: “So the last 4 months were wasted?” Respond well to plans that keep the good parts.",
      stakeholderAnswers: [
        { question: "What exactly does the partner contract say about the Explore feed?", answer: "It must be visible on the home screen. It doesn't say where on the home screen, or how large." },
        { question: "How hard is it to bring back the one-tap skip?", answer: "Engineering estimates 2–3 days. The code still exists." },
        { question: "Why is the app slow on older phones?", answer: "The Explore feed loads lots of restaurant images. Lighter images would help, at about 3 days of work." },
        { question: "Have we talked to the partner?", answer: "Not since launch. They're happy with the click numbers so far." },
        { question: "Who is cancelling?", answer: "We haven't looked at that yet." },
        { question: "Can we A/B test?", answer: "Yes, our tools support feature flags for up to two variants." },
      ],
      hiddenFacts: [
        { trigger: "Team asks who is cancelling or segments users by age, tenure or device", reveal: "Cancellations are concentrated among subscribers older than 2 years and users aged 45+. These are the highest-value, lowest-refund customers." },
        { trigger: "Team asks how the partner is performing", reveal: "Partner restaurants get plenty of clicks but very few orders. The partner is starting to question the deal's value too." },
        { trigger: "Team asks the support team what they hear most", reveal: "Many calls are from family members who set the app up for a parent and can no longer find the skip option for them." },
      ],
      watchFor: [
        "Does the team frame it as “roll back vs keep” or find a hybrid?",
        "Does anyone question whether the sign-up increase and the cancellations are really comparable?",
        "Does the team read the contract wording carefully (“visible”, not “top” or “full-screen”)?",
        "Does anyone segment users before deciding, or treat all 41,000 as one group?",
        "Is the tone of the communication defensive, or does it own the problem?",
      ],
      solutionDirections: [
        "Release 1: bring back the one-tap skip prominently, and move support chat back to the home screen. These are small changes with a big effect on refunds.",
        "Keep Explore visible on the home screen but lower and smaller, or as a compact strip. That meets the contract while reducing the ad-heavy feel.",
        "Release 2: lighter images or a “lite mode” for older phones, plus a “classic view” toggle for long-time users.",
        "Proactively credit subscribers who received unwanted meals during the six days, using part of the ₹50,000.",
        "Talk to the partner early and frame placement changes as improving their order conversion.",
        "Reply personally to negative reviews, then ask happy-again users to update their rating.",
        "Measure skip usage, refund requests, weekly cancellation rate, rating trend, and onboarding completion for new users.",
      ],
      commonPitfalls: [
        "Rolling back everything and losing the onboarding gains.",
        "Ignoring the contract, or assuming it can't be negotiated.",
        "Planning more work than 2 engineers can ship in 2 weeks.",
        "Messaging that blames users (“the skip button is just in the planner now!”).",
      ],
      debriefQuestions: [
        "Which number in the brief most changed your thinking, and which one did you distrust?",
        "How did you handle the CEO's emotional investment in the redesign?",
        "What would you have done differently before launch to avoid this?",
        "How confident are you that your metrics will tell you the truth in 14 days?",
      ],
      recommendedTwists: ["T09", "T17", "T19", "T12"],
    },
  },

  // ---------------------------------------------------------------------------
  {
    id: "courier-down-diwali-up",
    codename: "MISSION 03",
    title: "Courier Down, Diwali Up",
    tagline:
      "Nine days before Diwali, a craft brand's only shipping partner stops pickups. 340 orders are waiting.",
    domain: "Operations, supply chain, small business",
    level: "Intermediate",
    defaultMinutes: 90,
    teamSize: "4–7 people",
    inspiration:
      "Based on classic business-continuity tabletop exercises built around supply-chain disruption, adapted to an Indian festive-season small business.",
    brief: {
      situation: [
        "Rangrez Crafts is an Ahmedabad-based brand selling hand block-printed bedsheets, cushion covers and table linen through its own website and Instagram. It has 11 staff. Diwali season brings about 40% of annual revenue.",
        "All orders ship through a single shipping aggregator. Tuesday, 9:00 AM, nine days before Diwali, the aggregator emails: because of a dispute with its main courier partner, pickups are suspended for “at least 10 days”, possibly longer.",
        "340 orders are packed or awaiting dispatch. 210 of them are marked “Gift”, with a promised delivery before Diwali. The website banner still says “Delivered before Diwali — or your money back.”",
        "About 100 new orders arrive every day this week. The owner needs a plan by lunchtime.",
      ],
      facts: [
        { label: "Pending orders", value: "340 orders, ~₹6.8 lakh total value (average ₹2,000)" },
        { label: "Gift orders", value: "210 with a pre-Diwali delivery promise" },
        { label: "Payment mix", value: "65% prepaid, 35% cash on delivery (COD)" },
        { label: "Destinations", value: "70% outside Gujarat. About 25 orders go to the Northeast or Jammu & Kashmir." },
        { label: "Local orders", value: "~15 within Ahmedabad" },
        { label: "Average parcel", value: "1.2 kg" },
        { label: "Alternatives known", value: "A direct courier account (~40% costlier, 2–3 days for KYC); India Post Speed Post counter 2 km away (~4 days to metros when tried once)" },
        { label: "Team", value: "Owner, 2 packers, 1 social-media manager, 1 accountant, 6 artisans (not available for logistics)" },
        { label: "Audience", value: "48,000 Instagram followers, 4.8★ average rating" },
      ],
      problemStatement:
        "Keep as many delivery promises as possible, protect customer trust, and decide what Rangrez does about new orders, all within a tight extra budget and a tiny team.",
      constraints: [
        "Extra logistics budget: ₹60,000 maximum. The owner won't borrow.",
        "No new hires can start within a week.",
        "Packing capacity is about 80 parcels per day with the current 2 packers.",
        "Some remote regions will be slow whatever you do.",
        "The money-back promise is public, and customers have screenshots of it.",
      ],
      deliverables: [
        "A triage plan for the 340 pending orders: groups, and the action for each group.",
        "A decision on new orders this week: keep selling, pause, or change the promise?",
        "Customer communication: one version for gift orders, another for everyone else.",
        "Budget allocation showing how the ₹60,000 is spent.",
        "One “never again” change so a single partner can't stop the business.",
      ],
      roles: [
        { name: "Customer (Owner)", fit: "any", responsibility: "Plays the owner. Explains the business, answers questions, and approves the plan." },
        { name: "Coordinator", fit: "any", responsibility: "Runs the clock and keeps the triage table up to date." },
        { name: "Logistics Analyst", fit: "any", responsibility: "Does the maths: capacity, cost per channel, what's possible by when." },
        { name: "Customer Care Lead", fit: "non-technical", responsibility: "Writes the customer messages and plans how to handle angry replies." },
        { name: "Finance Lead", fit: "any", responsibility: "Owns the ₹60,000 and the cash-flow impact of COD and refunds." },
        { name: "Systems Builder", fit: "technical", responsibility: "Designs the order-tagging or tracking sheet and the website/banner changes." },
        { name: "Presenter", fit: "any", responsibility: "Presents the plan to the Owner." },
      ],
      successLooksLike: [
        "Orders are segmented, not treated as one block.",
        "Numbers are actually worked out (capacity, cost, time), even roughly.",
        "Customers get choices, not just bad news.",
        "The public promise is updated quickly and honestly.",
        "The resilience fix is specific and realistic for a small business.",
      ],
    },
    phases: standardPhases,
    facilitator: {
      stakeholderBrief:
        "You are Farida Rangrez, owner of Rangrez Crafts. This season makes or breaks your year, so you badly want to keep selling. You're proud of the 4.8★ rating and hate the idea of breaking a promise. You don't know much about logistics alternatives. React emotionally at first (“Should we just refund everyone?”), then calm down if the team shows a clear plan. Push back on any plan that pauses all sales for more than 2 days.",
      stakeholderAnswers: [
        { question: "Can the aggregator give us a firm date?", answer: "No. Their support line just repeats “at least 10 days”." },
        { question: "Can our packers work overtime?", answer: "Yes, up to about 120 parcels a day for a week, if we pay overtime (~₹8,000 for the week)." },
        { question: "Can India Post handle COD?", answer: "Yes, but cash takes weeks to reach us and tracking is basic." },
        { question: "What is the profit margin per order?", answer: "Roughly 35% after materials and artisan pay." },
        { question: "Do gift customers know the recipient's address and date of need?", answer: "We have the address. Most didn't tell us an exact date." },
        { question: "Can we deliver locally ourselves?", answer: "The accountant has a scooter and can do about 15 drops a day." },
      ],
      hiddenFacts: [
        { trigger: "Team asks about other aggregators or what competitors use", reveal: "A competitor uses a different aggregator that onboards new sellers within 24 hours, at about 15% higher rates than your usual." },
        { trigger: "Team breaks down gift orders by destination", reveal: "About 130 of the 210 gift orders go to Mumbai, Bengaluru, Delhi NCR or Pune, which are the fastest metros for most couriers." },
        { trigger: "Team asks about the money-back promise's wording", reveal: "The terms page says the promise applies only to orders placed at least 7 days before Diwali. Most customers never read it." },
      ],
      watchFor: [
        "Does the team ask clarifying questions before jumping to “switch courier”?",
        "Does anyone do the arithmetic on capacity (80–120 parcels/day) against the backlog plus new orders?",
        "Is cash flow (COD, refunds) considered, or only shipping?",
        "Do they update the public promise, or quietly hope no one notices?",
        "How do they treat the remote-region orders that can't make it whatever happens?",
      ],
      solutionDirections: [
        "Segment orders by deadline (gift vs non-gift), destination (metro, tier-2, remote, local) and payment (prepaid vs COD).",
        "Split volume across several channels: a fast-onboarding aggregator for metro gift orders, Speed Post for tier-2 and non-urgent orders, own delivery for local ones.",
        "Give gift customers a choice: a digital gift card or message now plus the parcel later, a full refund, or keep the order with an honest delivery estimate.",
        "Offer a small discount to convert COD orders to prepaid, which protects cash flow.",
        "Update the banner and checkout immediately to show realistic delivery dates. Consider pre-orders with “ships after Diwali” pricing.",
        "Resilience: keep at least two active shipping partners, with a documented switch-over checklist.",
      ],
      commonPitfalls: [
        "Pausing all sales, or refunding everyone, before exploring options.",
        "Spending the whole budget on one expensive channel for every order.",
        "Ignoring packing capacity: a new courier doesn't help if parcels can't be packed.",
        "Hiding behind the fine print instead of using it as one input.",
      ],
      debriefQuestions: [
        "Which segment of orders did you prioritise, and what did you give up to do it?",
        "How did the numbers change your first instinct?",
        "How did you balance honesty with protecting sales?",
        "What would you put in place before next festive season?",
      ],
      recommendedTwists: ["T05", "T08", "T20", "T21"],
    },
  },

  // ---------------------------------------------------------------------------
  {
    id: "help-desk-black-hole",
    codename: "MISSION 04",
    title: "The Help Desk Black Hole",
    tagline:
      "Requests vanish into WhatsApp, email and hallway chats. Design a system 85 people will actually use, with no budget, live in three weeks.",
    domain: "Workplace operations, process design, internal tools",
    level: "Starter",
    defaultMinutes: 90,
    teamSize: "4–7 people",
    inspiration:
      "Based on the everyday problem of internal request chaos in growing companies, and on why many ticketing tools are abandoned within weeks.",
    brief: {
      situation: [
        "Kitebridge Software is an 85-person IT services company with one office. A three-person operations team handles every internal request: one IT person (laptops, access, software), one HR executive (letters, leave, policies), and one admin (ID cards, seating, supplies).",
        "Requests arrive through WhatsApp messages, email, the team chat app, and people walking up to desks. Nothing is tracked in one place.",
        "Two years ago, the company bought a ticketing tool. It was abandoned within three weeks: staff kept messaging on WhatsApp, and the ops team ended up copying requests into the tool by hand.",
        "14 new interns join in three weeks. Leadership wants a working system by then and has set the budget at zero: “Use what we already have.”",
      ],
      facts: [
        { label: "Request volume", value: "~45 requests/day across IT, HR and Admin" },
        { label: "Lost requests", value: "71% of 60 surveyed staff have had a request “lost” at least once" },
        { label: "Wait time", value: "Median 3.5 days. Worst recent case: a new joiner waited 19 days for remote-access setup." },
        { label: "Ops overhead", value: "Each ops person spends ~1.5 hours/day finding, chasing or re-asking about requests" },
        { label: "Repeat questions", value: "~30% are repeats: Wi-Fi password, leave policy, payslip download, reimbursement form" },
        { label: "Tools available", value: "Company email, shared docs & spreadsheets, online forms, team chat app, intranet page" },
        { label: "Confidential requests", value: "Some requests are sensitive: salary letters, HR complaints, medical leave" },
      ],
      problemStatement:
        "Design an internal request system that staff will actually use, that the ops team can run without extra burden, and that can go live in three weeks for the incoming interns, using only tools the company already has.",
      constraints: [
        "No new paid tools or subscriptions.",
        "The ops team can't take on more than 30 extra minutes a day of admin.",
        "Urgent issues (e.g. a laptop dies before a client call) need a response within 1 hour.",
        "Confidential HR requests must not be visible to IT or Admin.",
        "Must be live and explained to everyone within 3 weeks.",
      ],
      deliverables: [
        "The request flow: the steps from “I need something” to “done”.",
        "What the front door looks like: the channel, plus the form fields or message format.",
        "How urgent and confidential requests are handled differently.",
        "An adoption plan: how people switch, and what happens to WhatsApp requests after launch day.",
        "How you'll know in 30 days whether it worked (2–3 measures).",
      ],
      roles: [
        { name: "Stakeholder (Ops Lead)", fit: "any", responsibility: "Plays the HR executive who leads ops. Tired, skeptical, and the final approver." },
        { name: "Coordinator", fit: "any", responsibility: "Runs the clock and keeps the team on a three-week scope." },
        { name: "User Researcher", fit: "non-technical", responsibility: "Represents employees: what will make them actually use it?" },
        { name: "Process Designer", fit: "any", responsibility: "Maps the flow, owners, and response-time rules." },
        { name: "Tool Builder", fit: "technical", responsibility: "Designs (or quickly prototypes) the form, tracker or chat setup with existing tools." },
        { name: "Change Champion", fit: "non-technical", responsibility: "Plans the launch, the messaging, and how to handle people who bypass the system." },
        { name: "Presenter", fit: "any", responsibility: "Presents the design to the Ops Lead." },
      ],
      successLooksLike: [
        "The team learns why the last tool failed before designing a new one.",
        "The design reduces work for ops instead of adding to it.",
        "Repeat questions are answered without creating a ticket.",
        "Urgent and confidential paths are clear and simple.",
        "The adoption plan deals with leaders and old habits, not just the tool.",
      ],
    },
    phases: standardPhases,
    facilitator: {
      stakeholderBrief:
        "You are Meena Shah, HR executive and informal lead of the ops team. You're exhausted, and skeptical of any new system: “Last time, the tool made MORE work for us.” You want something simple. You'll warm up if the team clearly asks about your workload and shows how the design saves you time. Push back hard on anything that requires you to copy requests from WhatsApp into a tracker.",
      stakeholderAnswers: [
        { question: "Why did the last tool fail?", answer: "It was hard to use, needed a separate login, and nobody senior used it. People kept messaging us, and we had to re-enter everything." },
        { question: "Which requests are most common?", answer: "Access and password resets, leave queries, letters (address proof, experience), and supplies." },
        { question: "What counts as urgent?", answer: "Anything that stops someone from working right now, especially before client calls." },
        { question: "Does everyone have a company email and chat account?", answer: "Yes. Interns get theirs on day one." },
        { question: "Can we block WhatsApp requests?", answer: "We can't stop people messaging, but we can choose how we respond." },
        { question: "Who in leadership supports this?", answer: "The COO asked for it. The CEO hasn't said much." },
      ],
      hiddenFacts: [
        { trigger: "Team asks who sends the most requests, or how leaders make requests", reveal: "The CEO sends requests by WhatsApp late at night and expects an instant reply. Everyone has noticed." },
        { trigger: "Team asks about existing documentation or FAQs", reveal: "An onboarding document with most of the repeat answers exists, but it's out of date and buried in a shared folder nobody can find." },
        { trigger: "Team asks the IT person what slows them down", reveal: "Half of IT requests lack basic details (laptop ID, which software, which project), so every request needs a back-and-forth." },
      ],
      watchFor: [
        "Does the team ask why the last tool failed before designing?",
        "Do they protect the ops team's time, or design a beautiful system ops can't run?",
        "Is there a self-service answer for the 30% of repeat questions?",
        "Do they design a separate confidential route for HR?",
        "Does the adoption plan address leadership behaviour (the hidden CEO fact) if it surfaces?",
      ],
      solutionDirections: [
        "One front door: a short online form (or a dedicated chat space) with category, urgency and required details, feeding one shared tracker.",
        "Smart required fields, so IT gets laptop ID and software name up front, which cuts back-and-forth.",
        "A self-service FAQ page that answers the repeat 30% and is linked from the form.",
        "Urgent path: a separate channel or phone number with a 1-hour response rule.",
        "Confidential HR requests: a separate form going only to HR.",
        "Adoption: a friendly “please use the form — here's the link” reply template, leaders using it first (including the CEO), and launching with the interns as the pilot group.",
        "Measure median time to resolve, number of requests outside the system, and ops time spent chasing.",
      ],
      commonPitfalls: [
        "Designing a complex, many-step workflow that recreates the failed tool.",
        "Ignoring how people actually behave (WhatsApp habits).",
        "Forgetting confidentiality.",
        "No owner for keeping the FAQ and tracker up to date.",
      ],
      debriefQuestions: [
        "What did you learn from the last tool's failure, and how did it shape your design?",
        "How did your plan treat senior people who bypass the system?",
        "Where would your design break first in real life?",
        "How did technical and non-technical teammates contribute differently?",
      ],
      recommendedTwists: ["T12", "T07", "T14", "T22"],
    },
  },
];

export function getMission(id: string): Mission | undefined {
  return missions.find((m) => m.id === id);
}

export function missionMinutes(mission: Mission): number {
  return mission.phases.reduce((sum, p) => sum + p.minutes, 0);
}
