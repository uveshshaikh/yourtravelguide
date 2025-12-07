import { Rule } from "./types";

export const rules: Rule[] = [
  {
    slug: "power-bank-in-flight",
    title: "Power Bank in Flight - Allowed or Not (India)?",
    shortTitle: "Power bank in flight",
    category: "flight",
    tags: ["power bank", "battery", "cabin baggage", "electronics"],
    verdict: {
      status: "allowed",
      summary: "Allowed in cabin baggage only. Strictly prohibited in checked baggage.",
    },
    howToComply: [
      "Carry power banks in cabin bags; CISF will flag them if seen in checked X-ray.",
      "Keep capacity below 100Wh (about 27,000mAh).",
      "Above 160Wh is banned from commercial flights.",
      "Mask exposed terminals with tape to avoid short circuits.",
    ],
    whyRuleExists: "Lithium batteries can enter thermal runaway if damaged. Cabins allow crew intervention; cargo holds do not.",
    extraNotes: [
      "Markings must show voltage/capacity; unmarked packs may be seized.",
      "DGCA also bans damaged or recalled batteries even in cabin.",
    ],
    richContent: {
      quickAnswer:
        "Carry power banks only in cabin baggage, with the watt-hour rating printed on the shell. Anything up to 100Wh breezes through security, 100–160Wh needs airline approval, and anything bigger stays on the ground.",
      overview: [
        "Lithium cells are happiest in the pressurised cabin where crew can reach them if the chemistry misbehaves. In the hold, a runaway cell can smoulder unnoticed, so DGCA, ICAO, and every airline tell passengers to keep detachable batteries by their side.",
        "Security officers scan each pack for a watt-hour (Wh) label. If the pack only lists milliamp-hours, convert it (mAh × volts ÷ 1,000) before you leave home and jot the math on masking tape. A clear label saves you from being sidelined at the X-ray belt while others file past.",
        "Treat exposed terminals with respect: cover them with tape or slot them inside silicone sleeves, store the bank at 30–60% charge, and never check it with your suitcase. Airline policies are aligned on this because regulators would rather refuse a charger than divert a flight for smoke in the belly.",
      ],
      checklists: [
        {
          title: "Before heading to the airport",
          items: [
            "Confirm the capacity is under 100Wh or get a written nod from the airline if it is 100–160Wh.",
            "Inspect the casing for swelling, dents, or loose USB ports; damaged packs are confiscated on sight.",
            "Label each bank with your name, phone number, and watt-hour math if the shell only shows mAh.",
          ],
        },
        {
          title: "During screening and boarding",
          items: [
            "Place the power bank in the electronics tray, separate from cables, so the X-ray shows a clean outline.",
            "Keep spare USB-C or lightning cables coiled; tangled wires trigger manual bag checks for hidden batteries.",
            "Store the bank in a ventilated pocket while charging your phone on board—crew can ask you to unplug bloated packs.",
          ],
        },
      ],
      table: {
        caption: "Watt-hour thresholds airlines actually enforce",
        headers: ["Capacity", "Allowed?", "What security expects"],
        rows: [
          ["0–100Wh", "✅ Yes", "Carry in cabin, declare only if casing is scuffed"],
          ["100–160Wh", "⚠️ Airline approval", "Show written approval + tape terminals"],
          [">160Wh", "❌ No", "Not accepted on commercial flights; ship by cargo instead"],
        ],
      },
      dos: [
        "Travel with two smaller packs instead of one chunky 200Wh brick.",
        "Use fire-resistant pouches (Lipo bags) if you carry photography batteries alongside power banks.",
        "Charge banks only after security so officers can feel the shell is cool.",
      ],
      donts: [
        "Don’t tape a power bank to the outside of smart luggage; remove it and carry it with you.",
        "Don’t throw loose coins or keys into the same pocket—scratches can short exposed ports.",
        "Never check a backpack that still contains a power bank; luggage scans catch it and delay your flight.",
      ],
      faqs: [
        {
          question: "Can I carry unlimited power banks if each one is under 100Wh?",
          answer: "Most airlines cap it at two medium banks or four smaller ones. If you show up with a dozen, expect questions about resale and dangerous goods allowances.",
        },
        {
          question: "Do airlines accept third-party brands without BIS marks?",
          answer: "Yes, but uncertified or unbranded packs draw scrutiny. Carry the retail invoice or BIS-coded packaging if the logo has rubbed off.",
        },
        {
          question: "What about power banks built into backpacks?",
          answer: "You must remove the module and carry it separately. If it is non-removable, the bag is treated like prohibited smart luggage.",
        },
      ],
      tips: [
        "Snap a photo of the watt-hour label right after purchase; handy when the shell scuffs over time.",
        "Keep USB ports dust-free with silicone plugs so officers can quickly inspect them.",
        "Pack a short 0.3m cable exclusively for security trays so your main cable stays organised.",
      ],
      internalLinks: [
        { label: "Dry cell & spare battery rules", slug: "dry-cells-spare-batteries" },
        { label: "Smart luggage checklist", slug: "smart-luggage" },
        { label: "Electronics tray etiquette", slug: "electronics-security-tray" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "DGCA CAR Section 2 Series X Part II",
        url: "https://www.dgca.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "passport-photocopy-valid",
    title: "Is a Passport Photocopy Enough at Indian Airports?",
    shortTitle: "Passport photocopy?",
    category: "documents",
    tags: ["passport", "photocopy", "id", "documents"],
    verdict: {
      status: "not_allowed",
      summary: "Photocopies are not accepted as primary ID. Carry the original passport even for domestic flights if you intend to use it as ID.",
    },
    howToComply: [
      "Keep your original passport accessible at CISF entry and airline counters.",
      "Carry laminated photocopies only as backup; they help if the passport is lost but will not grant entry.",
      "Store copies separately from the original along with soft scans in DigiLocker or phone vaults.",
    ],
    whyRuleExists: "Airports rely on machine-readable passports and UV/IR checks that only work on originals, preventing forgery and impersonation.",
    extraNotes: [
      "For lost-passport emergencies, carriers demand police reports plus airline approval; a photocopy alone cannot board you.",
      "Visa desks overseas may keep photocopies, so travel with at least two spare copies.",
    ],
    richContent: {
      quickAnswer: "No Indian airport accepts a passport photocopy as your main ID. CISF officers insist on the original booklet because only it has the chip, UV fibers, and machine-readable zone they need to validate you in seconds.",
      overview: [
        "Treat photocopies as a safety net, not your boarding pass. Security staff compare your face with the lamination, feel the texture of the cover, and scan the MRZ strip to pull up blacklisted alerts. A laminated copy, however pretty, fails all of these checks.",
        "Carry at least two photocopies plus a high-quality scan in DigiLocker so you can file police complaints faster if something goes wrong. But while entering the terminal or boarding, you must hand over the physical passport or another government photo ID.",
        "Think of it this way: the original proves who you are, the copies help you recover if the original disappears. Mixing the two roles is what causes last-minute panic at the airport gate.",
      ],
      checklists: [
        {
          title: "Before you leave home",
          items: [
            "Keep the passport in a bright holder so you can pull it out within five seconds.",
            "Store photocopies in a different pouch from the original to avoid losing everything together.",
            "Upload a PDF to DigiLocker or a secure cloud vault with offline access for emergencies.",
          ],
        },
        {
          title: "If the passport goes missing",
          items: [
            "Use the photocopy to fill the lost passport FIR at the nearest police station.",
            "Show the copy to airline/immigration desks while they verify CCTV footage.",
            "Contact the Indian mission (if overseas) with copy + passport photos for an emergency certificate.",
          ],
        },
      ],
      table: {
        caption: "When photocopies help vs when they do not",
        headers: ["Scenario", "Photocopy accepted?", "Why"],
        rows: [
          ["Terminal entry / boarding", "❌ No", "Security scanners need chip + UV marks on the real booklet."],
          ["Lost passport police report", "✅ Yes", "Helps officers note the passport number and issue date."],
          ["Foreign visa application", "⚠️ Maybe", "Some VFS counters keep copies but will still sight the original."],
        ],
      },
      dos: [
        "Carry the original passport even on domestic legs if that’s the ID printed on your ticket.",
        "Label the cover with your phone number so a good Samaritan can contact you.",
        "Keep a notarised copy with a trusted family member in case you need details urgently.",
      ],
      donts: [
        "Do not hand over a low-resolution phone photo when CISF asks for ID—this triggers secondary screening.",
        "Avoid leaving the passport in check-in luggage or backpacks that go on the conveyor belt.",
        "Never laminate the passport pages; heat damages the security film and voids the booklet.",
      ],
      faqs: [
        {
          question: "Will DigiLocker or mPassport Seva count as the original?",
          answer: "Digital IDs are accepted only when the issuing authority explicitly lists them. For passports, DGCA still wants the physical booklet because officers must stamp and inspect the pages. DigiLocker is a backup, not a replacement.",
        },
        {
          question: "Can I show a notarised photocopy?",
          answer: "A notarised copy helps for bank work but aviation security still says no. They cannot attach their verification stamp to a copy, so you would be turned away at the gate.",
        },
        {
          question: "What if the passport is with the embassy for visa stamping?",
          answer: "Carry another government ID (Aadhaar, PAN, driving licence). Airlines allow those for domestic flights. For international flights you must wait until the passport is returned.",
        },
      ],
      tips: [
        "Click a photo of the biodata page under natural light—helps if you need to share details over email quickly.",
        "Use RFID-blocking sleeves only if they still let officers scan the chip easily.",
        "Set a calendar reminder a day before travel simply titled ‘Pack passport’ to avoid night-before stress.",
      ],
      internalLinks: [
        { label: "Domestic ID checklist", slug: "domestic-id-requirements" },
        { label: "Digital boarding pass guide", slug: "digital-boarding-pass" },
        { label: "Passport validity (6-month rule)", slug: "passport-expiry-validity" },
      ],
      verifiedOn: "2025-12-05",
    },
    sources: [
      {
        label: "BCAS Valid ID Circular",
        url: "https://www.bcasindia.gov.in/",
      },
      {
        label: "MEA Passport Rules",
        url: "https://www.passportindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "name-mismatch-flight-ticket",
    title: "Name Mismatch on Flight Ticket",
    shortTitle: "Name mismatch",
    category: "documents",
    tags: ["ticket", "name", "spelling", "documents"],
    verdict: {
      status: "limited",
      summary: "Minor spelling errors (1-2 characters) are usually accepted with supporting ID. Major differences require ticket correction before travel.",
    },
    howToComply: [
      "Match ticket name exactly with government ID during booking; include middle names if they appear on ID.",
      "If there is a typo, contact the airline at least 24 hours before departure for a name correction letter or reissued ticket.",
      "Carry ID proof that clearly shows the correct spelling and keep marriage/name-change certificates handy if applicable.",
    ],
    whyRuleExists: "Accurate manifests are mandatory for security screening and immigration control, so airlines must ensure every passenger’s identity matches government ID.",
    extraNotes: [
      "Low-cost carriers often charge a fee for corrections; full-service airlines may allow a one-time fix for free.",
      "Completely different names (transferring tickets) are not allowed under DGCA rules.",
    ],
    richContent: {
      quickAnswer: "Tiny typos (one or two letters) usually pass if your ID, photo, and PNR otherwise match. Anything bigger—missing surnames, swapped passengers, nickname vs legal name—needs an official name correction before you reach the airport.",
      overview: [
        "Airlines load the name from your booking into immigration, security, and baggage databases. When that name fails to match the ID, the system flags you, the counter staff panic, and you risk a denied boarding. Fixing it with a short phone call is far cheaper than buying a new ticket later.",
        "Domestic Indian flights are kinder: most carriers accept small spelling slips if you show Aadhaar or PAN proving it’s you. International routes are strict because visas, Advance Passenger Information (API), and watchlists rely on exact spelling.",
        "Play safe: match your travel document when you book. If your passport says ‘PRIYA LAKSHMI IYER’, write it that way even if friends call you Priya Iyer on Instagram.",
      ],
      checklists: [
        {
          title: "When you spot the typo",
          items: [
            "Screenshot the booking confirmation so you have evidence of the error timing.",
            "Contact the airline via call/chat and ask for a name correction case ID.",
            "Email a photo of the ID showing the correct spelling so they can update the PNR.",
          ],
        },
        {
          title: "Documents to carry",
          items: [
            "Government ID that matches the corrected spelling.",
            "Marriage certificate or gazette proof if you recently changed surnames.",
            "Printed airline acknowledgement of the correction (or updated e-ticket).",
          ],
        },
      ],
      table: {
        caption: "Common mismatch scenarios",
        headers: ["Issue", "Airline reaction", "Fix"],
        rows: [
          ["Missing middle name", "Usually allowed on domestic flights", "Carry ID + request agent to add SSR note"],
          ["Nickname instead of passport name", "Likely denied", "Reissue ticket with legal name"],
          ["Spelling error 2+ letters", "Manual approval required", "Submit correction request 24h before departure"],
        ],
      },
      dos: [
        "Book using the exact spelling on the ID you plan to use at the airport.",
        "Check every passenger’s name before hitting Pay—especially for group trips.",
        "Save the airline chat/email transcript approving your correction.",
      ],
      donts: [
        "Don’t assume you can swap tickets between family members—DGCA forbids transfers.",
        "Avoid reaching the airport hoping the supervisor will ‘adjust’ it; they rarely can.",
        "Never edit the PDF yourself; staff can see metadata and will refuse the altered document.",
      ],
      faqs: [
        { question: "Are middle names compulsory?", answer: "Not for most domestic flights, but if your passport shows a middle name and you are flying internationally, include it. Immigration entry forms insist on matching the machine-readable line, so leaving it out can trigger manual vetting." },
        { question: "Can I correct the name at the airport counter?", answer: "Only if the airline has that facility and seats are available. Counters prioritise check-in, so they may ask you to call customer support anyway. Handle it online/phone before you leave home." },
        { question: "What about initials?", answer: "If your ID uses initials (common in South India), make sure the ticket copies the same format. Writing the expanded name while your ID shows initials can confuse security." },
      ],
      tips: [
        "Save passenger profiles in airline apps with verified IDs so auto-fill reduces typos.",
        "For visa applications, use the same spelling as the passport and airline booking to avoid mismatched paperwork.",
        "If you changed your name, carry photocopies of old IDs to show the linkage quickly.",
      ],
      internalLinks: [
        { label: "Passport photocopy rules", slug: "passport-photocopy-valid" },
        { label: "Digital boarding pass tips", slug: "digital-boarding-pass" },
        { label: "Domestic ID checklist", slug: "domestic-id-requirements" },
      ],
      verifiedOn: "2025-12-05",
    },
    sources: [
      {
        label: "DGCA Passenger Charter",
        url: "https://www.dgca.gov.in/",
      },
      {
        label: "Air India Name Correction Policy",
        url: "https://www.airindia.com/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "kids-id-requirement",
    title: "Do Kids Need ID to Fly in India?",
    shortTitle: "Kids ID rules",
    category: "documents",
    tags: ["kids", "infant", "id", "family"],
    verdict: {
      status: "allowed",
      summary: "Infants under 2 need birth certificate copies; children 2-12 need school ID, Aadhaar, or passport. Teenagers should carry government photo ID.",
    },
    howToComply: [
      "Carry a birth certificate or hospital discharge summary for infants to prove age for lap-seat eligibility.",
      "School IDs, Aadhaar cards, or passports work for children aged 2-12.",
      "If a child travels with one parent or guardian, carry consent letters plus the other parent’s ID for international trips.",
    ],
    whyRuleExists: "Airlines must verify age-based fares and prevent trafficking, so every minor needs traceable identification.",
    extraNotes: [
      "Unaccompanied minors require additional airline forms; check individual carrier policies.",
      "For international travel, children must have their own passports regardless of age.",
    ],
    richContent: {
      quickAnswer: "Every child flying out of or within India needs age-proof plus a photo ID that matches the ticket name. Babies can use a birth certificate, school-going kids can show Aadhaar or student ID, and teens should carry the same government photo IDs as adults.",
      overview: [
        "CISF guards are trained to verify a minor’s age before letting them into the terminal. They look for proof that the baby really qualifies for lap-seat travel or that the 11-year-old booked the correct fare. Without a document, you may have to step aside until another family member brings one.",
        "For international flights, every child—even six-month-olds—must have their own passport. Several embassies also ask for a letter of consent when only one parent is travelling. Prepare those papers ahead of time so you are not printing forms frantically at the airport.",
        "Use a simple folder labelled ‘Kids Travel Pack’ with plastic sleeves for certificates, vaccination cards, and consent letters. Handing over a neat bundle reassures officers and speeds up the queue for families behind you.",
      ],
      checklists: [
        {
          title: "Documents per age band",
          items: [
            "Infants (0–2): Birth certificate, hospital discharge summary, or vaccination booklet with date of birth.",
            "Children (2–12): School ID, Aadhaar, or passport with recent photo.",
            "Teens (13–17): Aadhaar, passport, PAN, or driving learner’s licence where applicable.",
          ],
        },
        {
          title: "If travelling with one parent/guardian",
          items: [
            "Consent letter signed by the non-travelling parent + their ID copy.",
            "Court order or notarised affidavit if you have sole custody.",
            "Emergency contacts of relatives at destination for airline forms.",
          ],
        },
      ],
      table: {
        caption: "Common kid-travel scenarios",
        headers: ["Scenario", "Accepted ID", "Extra steps"],
        rows: [
          ["Infant on lap", "Birth certificate copy", "Note infant name + age on PNR"],
          ["School trip", "School ID + consent letter", "Teacher carries group manifest"],
          ["UMNR (solo minor)", "Passport/Aadhaar", "Submit airline UMNR form + guardian contact"],
        ],
      },
      dos: [
        "Pack originals and copies in separate sleeves so spills or misplaced bags do not ruin everything.",
        "Explain the process to older kids so they confidently answer security questions.",
        "Attach ID-sized photos of the child to the consent letter to avoid doubt.",
      ],
      donts: [
        "Don’t rely on digital photos stored in your gallery; CISF expects physical or DigiLocker IDs.",
        "Avoid last-minute bookings without adding the child’s full name exactly as on the ID.",
        "Do not send a minor alone without reading the airline’s unaccompanied minor rules—each carrier has different age cut-offs.",
      ],
      faqs: [
        { question: "Is a photo of the birth certificate acceptable?", answer: "Carry the physical document or a DigiLocker-issued certificate. Plain phone snaps are easy to edit, so security teams reject them." },
        { question: "What if the child recently cut their hair and looks different?", answer: "Bring the most recent photo ID you have and carry a few passport photos. Officers are understanding if you can prove continuity through other documents (school fee card, vaccination booklet)." },
        { question: "Do NRIs need to show OCI cards?", answer: "If the child is travelling on an Indian passport, the regular rules apply. If they use a foreign passport, carry the OCI or visa printout along with their passport and consent letters." },
      ],
      tips: [
        "Keep snacks and colouring sheets handy; a calm child makes ID checks faster.",
        "Use matching luggage tags for the family so kids can spot their bags quickly.",
        "Snap a group photo at the airport entrance—helpful if someone wanders off and CISF asks for clothing description.",
      ],
      internalLinks: [
        { label: "Domestic ID checklist", slug: "domestic-id-requirements" },
        { label: "Minor consent letter guide", slug: "minor-travel-consent-letter" },
        { label: "Digital boarding pass tips", slug: "digital-boarding-pass" },
      ],
      verifiedOn: "2025-12-05",
    },
    sources: [
      {
        label: "MoCA Child Travel Advisory",
        url: "https://www.civilaviation.gov.in/",
      },
      {
        label: "Airline UMNR Policies",
        url: "https://www.goindigo.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "passport-expiry-validity",
    title: "Passport Validity Rules (6-Month Requirement)",
    shortTitle: "Passport validity",
    category: "documents",
    tags: ["passport", "expiry", "validity", "documents"],
    verdict: {
      status: "limited",
      summary: "International routes typically need 6 months validity from arrival; domestic flights accept any unexpired passport.",
    },
    howToComply: [
      "Renew your passport if it will expire within 6 months of your return date, especially for visa-on-arrival countries.",
      "Check destination-specific rules—some Middle East routes require 6 months + blank pages.",
      "Carry old passports with visas if renewal happens close to travel dates.",
    ],
    whyRuleExists: "Many immigration authorities refuse entry to passengers whose passports may expire during their stay, to avoid undocumented overstays.",
    extraNotes: [
      "Schengen visas usually demand 3 months validity beyond departure, but airlines follow the stricter 6-month standard to avoid fines.",
      "Tatkaal renewals issue passports within ~3 days if you face last-minute travel.",
    ],
    richContent: {
      quickAnswer: "Most international destinations expect your passport to remain valid for six months beyond the day you land. Domestic flights only need a passport that hasn’t expired yet, but because airlines must follow the stricter rule of the toughest transit country, they check the six-month buffer at the departure counter.",
      overview: [
        "This buffer gives immigration enough confidence that you won’t overstay accidentally. If your passport expires a month into a three-month trip, the host country risks being stuck with a traveller the system can’t track. That’s why airlines would rather offload you at check-in than pay fines at the destination.",
        "Some countries (Schengen, UK, Singapore) also demand blank pages for stamps or visas. If your booklet is almost full, renew it together with the validity issue—fresh booklets arrive within a week under Tatkaal.",
        "Use the ‘return date + six months’ formula. If the resulting day falls after your expiry, you’re safe. If not, book a renewal slot immediately and carry the receipt to the airport in case the new passport arrives right before departure.",
      ],
      checklists: [
        {
          title: "Renewal readiness",
          items: [
            "Count six months from your intended return date; if the passport expires earlier, apply for renewal.",
            "Gather old passports with visas—you may need them for Schengen/US interviews even after renewal.",
            "Print your appointment receipt and keep digital copies in DigiLocker.",
          ],
        },
        {
          title: "At the airport",
          items: [
            "Carry both old and new passports if the new one arrived after you obtained visas.",
            "Show evidence of renewal (SMS or acknowledgement) if you are flying domestically during processing.",
            "Check blank pages: some immigration desks insist on two free pages facing each other.",
          ],
        },
      ],
      table: {
        caption: "Destination-specific validity cues",
        headers: ["Region", "Requirement", "Notes"],
        rows: [
          ["Schengen", "3 months beyond return", "Airlines still enforce 6 months to stay safe."],
          ["Middle East", "6 months beyond entry", "Certain visas need an extra blank page for residence stickers."],
          ["South-East Asia", "6 months typical", "Visa-on-arrival counters refuse shorter validity."],
        ],
      },
      dos: [
        "Set a reminder on your phone 9 months before expiry so you have cushion for busy seasons.",
        "Use the Passport Seva portal’s police verification tracker to avoid last-minute surprises.",
        "Carry passport photos and photocopies whenever you visit an FRRO or embassy.",
      ],
      donts: [
        "Don’t book non-refundable international tickets if your passport is within the danger window.",
        "Avoid stapling boarding passes to passport pages; it tears the lamination.",
        "Don’t ignore minor damage—torn lamination + low validity equals instant denial.",
      ],
      faqs: [
        { question: "Is the six-month rule written anywhere?", answer: "Yes. Immigration advisories from MEA and most embassies explicitly state it. Airlines add the rule into their contracts of carriage because they pay heavy fines if a passenger is sent back for insufficient validity." },
        { question: "What if my visa appointment is before I can renew?", answer: "Apply for renewal first; most consulates won’t accept passports with less than a year left. If you already have a visa, carry both passports—old for visa, new for travel." },
        { question: "Does the rule apply to domestic flights?", answer: "No. Any unexpired ID works domestically. Still, if you plan an international trip soon, renew early so you don’t scramble later." },
      ],
      tips: [
        "Write the expiry date on the inside cover using washi tape for quick reference.",
        "If FRRO delays verification, escalate via the Passport Seva call centre with your file number.",
        "Use VFS walk-in services (where available) for urgent visa transfers to the new passport.",
      ],
      internalLinks: [
        { label: "Passport photocopy do’s & don’ts", slug: "passport-photocopy-valid" },
        { label: "Printed ticket rules", slug: "printed-ticket-needed" },
        { label: "Digital ID acceptance", slug: "aadhaar-digital-id" },
      ],
      verifiedOn: "2025-12-05",
    },
    sources: [
      {
        label: "Bureau of Immigration India",
        url: "https://boi.gov.in/",
      },
      {
        label: "MEA Passport Seva FAQ",
        url: "https://www.passportindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "laptops-electronics",
    title: "Laptop in Cabin vs Checked Baggage",
    shortTitle: "Laptop in cabin/check-in",
    category: "flight",
    tags: ["laptop", "electronics", "checked bag", "security tray"],
    verdict: {
      status: "allowed",
      summary: "Cabin strongly recommended; checked baggage only if fully powered off and padded.",
    },
    howToComply: [
      "Carry laptops, tablets, and e-readers in cabin and remove them for security trays.",
      "If forced to check, power off completely (no sleep mode) and cushion inside clothes.",
      "Detach power adapters and wrap cords to keep trays neat during screening.",
      "Declare damaged or swollen batteries to security staff immediately.",
    ],
    whyRuleExists: "Electronics contain lithium cells that can overheat. Keeping them in the cabin mitigates fire risk and reduces theft claims.",
    extraNotes: [
      "At most airports you must place each large electronic in a separate tray.",
      "Business laptops with removable batteries follow the same rules as spares.",
    ],
    richContent: {
      quickAnswer:
        "Carry laptops and tablets in cabin baggage, slide them into a separate tray at screening, and power them off fully if they ever need to be gate-checked. Checked baggage is a last resort because crews cannot reach a smoking battery in the hold.",
      overview: [
        "Cabin screening looks for dense rectangles on the X-ray; if your laptop stays buried under clothes, the operator sees a solid block and sends the bag for manual inspection. Taking devices out early keeps queues moving and saves you from unpacking at the belt under pressure.",
        "Lithium cells inside laptops are classed as dangerous goods when powered on or damaged. Cabin crew can smother or douse a runaway battery with halon, but no one can open the cargo bay midair. Airlines therefore insist you carry them on board and disconnect from chargers before boarding.",
        "Business travellers often juggle multiple devices—work laptop, personal tablet, e-reader. Label each with your name, and store them so they slide back quickly after security. The less time you spend repacking, the less chance you leave a MacBook behind.",
      ],
      checklists: [
        {
          title: "Prep before leaving home",
          items: [
            "Remove USB dongles and hard drives so hinges aren’t stressed in trays.",
            "Back up files to the cloud in case a rare security swab delays the device.",
            "Pack a slim sleeve that opens wide; clamshell sleeves slow you down at CISF belts.",
          ],
        },
        {
          title: "At screening and onboard",
          items: [
            "Place laptops flat in their own tray with nothing stacked on top—belts, jackets, and cables go elsewhere.",
            "If staff ask to power it on, do so quickly; dead batteries raise tampering concerns.",
            "If overhead bins are full and staff gate-check your bag, remove the laptop and keep it with you.",
          ],
        },
      ],
      table: {
        caption: "Where laptops should travel",
        headers: ["Scenario", "Best practice", "Why"],
        rows: [
          ["Routine domestic trip", "Cabin bag only", "Quick access + crew can handle battery issues"],
          ["Forced check-in", "Power off, pad with clothes, note fragile tag", "Reduces impact damage"],
          ["Multiple devices", "Stack in mesh folder", "Simplifies secondary screening"],
        ],
      },
      dos: [
        "Use TSA-friendly sleeves that unzip flat for faster inspection.",
        "Carry proof of purchase for brand-new laptops; customs may ask on return.",
        "Disable ‘wake on open’ so the fan doesn’t spin up mid-flight.",
      ],
      donts: [
        "Don’t bury laptops under toiletries; gels look messy on the X-ray image.",
        "Don’t check a laptop with a swollen battery—airlines can refuse the entire bag.",
        "Avoid piling two laptops in one tray; lay them side by side.",
      ],
      faqs: [
        {
          question: "Can I keep the laptop inside my smart backpack if the airport uses CT scanners?",
          answer: "Only in select terminals that explicitly announce ‘no need to remove electronics.’ Most Indian airports still use standard X-ray machines, so assume you must remove it.",
        },
        {
          question: "Are laptop power banks treated differently?",
          answer: "No—any removable battery follows the same watt-hour rules as regular power banks. Keep them taped and in cabin baggage.",
        },
        {
          question: "What about mini desktops or VR headsets?",
          answer: "Carry them as cabin electronics. Officers may swab them for explosives but generally treat them like laptops as long as cables are separated.",
        },
      ],
      tips: [
        "Colour-code chargers with washi tape so you can hand luggage inspectors the exact cable they need to test.",
        "Enable device location tracking; if you misplace it at security, staff can help using the tag info.",
        "Pack microfiber cloths to wipe trays—keeps your keyboard clean and reassures germ-conscious travellers.",
      ],
      internalLinks: [
        { label: "Electronics tray decoding", slug: "electronics-security-tray" },
        { label: "Smart luggage battery rule", slug: "smart-luggage" },
        { label: "Cabin bag size cheatsheet", slug: "cabin-bag-count-dimensions" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "BCAS Security Screening SOP",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "mobile-phone-in-check-in",
    title: "Can You Put Mobile Phones in Checked Baggage?",
    shortTitle: "Mobile phone in check-in",
    category: "flight",
    tags: ["phone", "checked bag", "battery"],
    verdict: {
      status: "limited",
      summary: "Technically allowed but discouraged. Phones must be switched off if checked in.",
    },
    howToComply: [
      "Keep phones in cabin so you can monitor battery swelling or overheating.",
      "If you must check one, switch it off completely and wrap inside clothing.",
      "Disable tracking tags and alarms to avoid baggage recall by CISF.",
    ],
    whyRuleExists: "Phones use lithium cells just like power banks; cargo fire suppression is limited.",
    extraNotes: [
      "Smart tags attached to checked bags should use airline approved low-energy modes.",
    ],
    richContent: {
      quickAnswer:
        "Phones technically can ride in checked baggage if they are switched off, but airlines hate the idea. Keep them in the cabin so you can monitor the battery, silence alarms, and produce it if the bag is flagged mid-flight.",
      overview: [
        "Lithium batteries are safest when the owner can intervene. A phone left buzzing in a suitcase can overheat next to clothes, and crew can’t reach the hold until landing. That’s why check-in agents remind you—sometimes repeatedly—to keep phones with you.",
        "If circumstances force you to check a spare handset (say, you’re carrying trade samples), power it down fully, wrap it inside soft clothes, and document it with photos. Airport X-rays spot switched-on devices because the battery looks ‘alive’ on the screen, so expect extra scrutiny if you ignore the request.",
        "Tracking tags and alarm apps also cause chaos. A bag that suddenly vibrates, rings, or flashes triggers a secondary inspection that can delay loading for the entire flight. Disabling everything before handover keeps operations smooth.",
      ],
      checklists: [
        {
          title: "If you must check a phone",
          items: [
            "Shut it down completely—not just airplane mode—and wait for the vibration to stop.",
            "Wrap it in a microfiber pouch or sock so the screen doesn’t crack under weight.",
            "Remove SIMs you might need on arrival and store them in your wallet.",
          ],
        },
        {
          title: "Better cabin routine",
          items: [
            "Carry chargers and power banks together so you can top up during layovers.",
            "Disable alarms and reminders you don’t need on board; rogue alarms annoy crew.",
            "Turn off Bluetooth trackers tied to checked bags or switch them to flight-safe mode if the airline mandates it.",
          ],
        },
      ],
      table: {
        caption: "Phone storage choices",
        headers: ["Where", "Recommended", "Notes"],
        rows: [
          ["Cabin bag", "✅ Best option", "You control the battery and avoid lost-luggage stress"],
          ["On your person", "✅", "Ideal for DigiYatra, OTPs, and gate changes"],
          ["Checked bag", "⚠️ Only if powered down", "Need proof if something goes wrong"],
        ],
      },
      dos: [
        "Keep spare phones in airplane mode even in the cabin so they don’t interfere with crew announcements.",
        "Note down IMEI numbers; useful if customs or airline paperwork needs proof of ownership.",
        "Carry proof-of-purchase for sealed phones to avoid customs suspicion on return trips.",
      ],
      donts: [
        "Don’t leave an old phone switched on in checked bags; alarms can trigger baggage evacuations.",
        "Don’t tape phones inside suitcases to hide them; X-ray operators notice the outline instantly.",
        "Avoid checking lithium battery cases (MagSafe, battery covers). Detach them and carry them instead.",
      ],
      faqs: [
        {
          question: "Can I ship phones in checked baggage when flying internationally?",
          answer: "Airlines prefer you to keep personal phones in cabin bags. Commercial quantities must be declared as cargo following IATA Dangerous Goods rules.",
        },
        {
          question: "Are power-down photos necessary?",
          answer: "Not mandatory, but a quick snapshot showing the battery percentage and IMEI can help if you file a claim later.",
        },
        {
          question: "What about feature phones with removable batteries?",
          answer: "Pop the battery out, tape the terminals, and carry it separately. The phone body without a cell is harmless.",
        },
      ],
      tips: [
        "Use zippered mesh pockets for gadgets so security officers can inspect them without rummaging through clothes.",
        "Set an eSIM on your smartwatch as backup communication if your phone gets flagged at screening.",
        "Photograph the condition of devices before packing; helpful for insurance claims.",
      ],
      internalLinks: [
        { label: "Power bank allowances", slug: "power-bank-in-flight" },
        { label: "Smart luggage batteries", slug: "smart-luggage" },
        { label: "Electronics tray checklist", slug: "electronics-security-tray" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "Air India Dangerous Goods Advisory",
        url: "https://www.airindia.com/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "camera-dslr-in-flight",
    title: "Camera Bodies and Lenses on Indian Flights",
    shortTitle: "Camera (DSLR)",
    category: "flight",
    tags: ["camera", "dslr", "lens", "photography"],
    verdict: {
      status: "allowed",
      summary: "Allowed in cabin. Pack heavy tripods or light stands in checked baggage.",
    },
    howToComply: [
      "Carry camera bodies and lenses in cabin to protect optics and sensors.",
      "Remove detachable batteries and keep them in a separate fire-safe pouch.",
      "Checked tripods must have spikes covered and heads wrapped.",
      "Declare drones separately; they follow UAV carriage limits.",
    ],
    whyRuleExists: "Optical gear is fragile and expensive. Cabin storage prevents shock damage and theft claims.",
    extraNotes: [
      "Monopods under 60 cm may pass security if tips are covered.",
    ],
    richContent: {
      quickAnswer:
        "Carry bodies, lenses, and memory cards in the cabin; check only heavy tripods or light stands with their spikes padded. Remove every removable battery and keep it with you to satisfy lithium rules.",
      overview: [
        "Camera gear is fragile, expensive, and often irreplaceable once you are on assignment. Airline liability barely covers ₹20,000 per kg, so putting a full-frame body in checked baggage is essentially gambling with your footage.",
        "Security wants to see a clean silhouette on the X-ray. Pack lenses upright, detach straps that look like cords, and keep silica packets in a transparent pouch so they aren’t mistaken for gel packs. If an officer swabs your camera for explosive traces, cooperate—they are protecting your shoot too.",
        "Use modular packing: padded cube for lenses, sling for bodies, rigid tube for tripods in checked baggage. Every accessory should have a place so you can reassemble the kit in minutes once you land.",
      ],
      checklists: [
        {
          title: "Packing day",
          items: [
            "Detach batteries, chargers, and external recorders; keep them in fire-resistant pouches.",
            "Carry invoices or carnet papers if you are travelling with commercial gear.",
            "Label lens caps and filters—security trays swallow plain black caps easily.",
          ],
        },
        {
          title: "At the airport",
          items: [
            "Place camera cubes directly on the tray so staff can inspect them without touching glass.",
            "Declare gimbals or drones separately—they follow their own rules.",
            "Request a hand search if you are worried about dust; CISF will accommodate if the queue allows.",
          ],
        },
      ],
      table: {
        caption: "Where each piece should travel",
        headers: ["Item", "Cabin or checked?", "Notes"],
        rows: [
          ["Camera body + primary lens", "Cabin", "Keeps sensors safe from knocks"],
          ["Spare lithium batteries", "Cabin", "Same rules as power banks"],
          ["Tripods/light stands", "Checked", "Cover spikes and remove heads"],
        ],
      },
      dos: [
        "Use TSA locks on checked tripod tubes so inspectors can reseal them.",
        "Keep desiccant sachets in a labelled zip bag so they are not mistaken for powders.",
        "Shoot a quick photo inventory before leaving—helps with insurance claims.",
      ],
      donts: [
        "Don’t leave lenses mounted during travel; leverage can snap the mount.",
        "Don’t pack unprotected drones with camera gear; they require special declaration.",
        "Avoid metal lens spanners or sharp tools in cabin—they fall under prohibited items.",
      ],
      faqs: [
        {
          question: "Are lens cleaning fluids considered liquids?",
          answer: "Yes. Bottles over 100ml must go in checked baggage, while tiny 30ml sprayers can stay in the 1L pouch.",
        },
        {
          question: "Can I carry film rolls through X-ray machines?",
          answer: "Most modern scanners are film-safe up to ISO 800, but if you shoot higher speeds request a hand inspection.",
        },
        {
          question: "Do monopods count as walking sticks?",
          answer: "Only if under 60cm and rubber-tipped. Otherwise check them with the tripod.",
        },
      ],
      tips: [
        "Mark your gear with coloured gaffer tape so you can spot it instantly on shared trays.",
        "Carry extra SD cards in fireproof cases; static-free options impress inspectors.",
        "Use quick-release plates that tighten by coin to avoid carrying Allen keys in cabin.",
      ],
      internalLinks: [
        { label: "Dry cell & spare battery guide", slug: "dry-cells-spare-batteries" },
        { label: "Smart luggage checklist", slug: "smart-luggage" },
        { label: "Fragile packing basics", slug: "fragile-items-packing" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "Vistara Sports and Camera Policy",
        url: "https://www.airvistara.com/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "dry-cells-spare-batteries",
    title: "Dry Cells and Spare Batteries",
    shortTitle: "Dry cells & spares",
    category: "flight",
    tags: ["battery", "dry cell", "aa", "aaa"],
    verdict: {
      status: "allowed",
      summary: "Allowed in cabin if individually protected. Not allowed loose in checked baggage.",
    },
    howToComply: [
      "Keep AA/AAA/C/D batteries in retail packs or plastic cases.",
      "Tape terminals of 9V and camera batteries to prevent arcing.",
      "Ban applies to damaged, leaking, or rusty cells.",
      "Do not mix batteries with coins or tools inside the same pouch.",
    ],
    whyRuleExists: "Short circuits from loose cells can ignite nearby flammable items.",
    extraNotes: [
      "Lead-acid or spillable batteries (except medically approved) remain prohibited.",
    ],
    richContent: {
      quickAnswer:
        "Pack AA/AAA/9V cells in their retail pack or plastic sleeves and keep them in cabin baggage. Loose cells rolling around a backpack are confiscated because their terminals can short and ignite nearby fabric.",
      overview: [
        "Security staff constantly pull out bags where batteries are mixed with coins, keys, or tools. When two terminals touch, heat builds up, plastic melts, and smoke follows—right inside the cabin. Simple insulation solves this.",
        "Checked baggage is riskier because vibrations can wear through tape and no one notices until the smell of smoke reaches the cockpit. Keeping spares in the cabin gives crew the chance to intervene if something feels warm.",
        "Treat even tiny AAA cells like regulated goods: label them, separate the old from the new, and recycle damaged ones before you travel. Officers love tidy battery cases because they signal you know the rules.",
      ],
      checklists: [
        {
          title: "Safe packing steps",
          items: [
            "Keep cells in original blister packs or dedicated plastic cases.",
            "Tape 9V terminals individually so clips cannot touch metal zippers.",
            "Carry only what you need; bulk packs suggest commercial transport and may be refused.",
          ],
        },
        {
          title: "On the journey",
          items: [
            "Store the case near the top of your bag for quick declaration.",
            "Check for corrosion; customs can seize leaking cells as hazardous waste.",
            "If a battery feels hot, hand it to cabin crew immediately.",
          ],
        },
      ],
      table: {
        caption: "Battery types at a glance",
        headers: ["Type", "Cabin", "Checked"],
        rows: [
          ["Alkaline AA/AAA", "✅ Allowed", "⚠️ Only if installed in devices"],
          ["9V / camera cells", "✅ Allowed if terminals taped", "❌ Not loose"],
          ["Lead-acid / car", "❌ Needs cargo", "❌"],
        ],
      },
      dos: [
        "Use separate cases for charged and empty cells to avoid mixing.",
        "Print watt-hour equivalents for rechargeable AA packs if requested.",
        "Carry a tiny screwdriver if toys need batteries removed—just place it in checked baggage if the blade exceeds limits.",
      ],
      donts: [
        "Don’t toss button cells loosely—store them in child-safe envelopes.",
        "Don’t bring rusted or leaked cells; they’ll be binned and may lead to bag searches.",
        "Avoid carrying more than a dozen high-capacity cells without documentation.",
      ],
      faqs: [
        {
          question: "Are rechargeable NiMH cells treated like lithium?",
          answer: "NiMH still need insulation but have fewer restrictions. Keep them in cabin and document capacity if unusually large.",
        },
        {
          question: "Can I carry button cells for medical devices?",
          answer: "Yes, but store them in blister packs or tape them to cardboard so they don’t get lost.",
        },
        {
          question: "What if I forget to remove batteries from checked devices?",
          answer: "Security may recall your bag from the belt, delaying departure. Always remove and carry spares separately.",
        },
      ],
      tips: [
        "Use semi-transparent battery cases so officers can count cells without opening them.",
        "Label cases ‘charged’ or ‘spent’ with masking tape to avoid mixing.",
        "Recycle old cells before travel so you don’t tote dead weight across continents.",
      ],
      internalLinks: [
        { label: "Power bank watt-hour limits", slug: "power-bank-in-flight" },
        { label: "Smart luggage removal rule", slug: "smart-luggage" },
        { label: "Electronics tray etiquette", slug: "electronics-security-tray" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "IndiGo Dangerous Goods Chart",
        url: "https://www.goindigo.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "smart-luggage",
    title: "Smart Luggage with Battery",
    shortTitle: "Smart luggage",
    category: "flight",
    tags: ["smart bag", "battery", "tracking"],
    verdict: {
      status: "limited",
      summary: "Allowed only if the lithium battery is removable. Battery must be in cabin when bag is checked.",
    },
    howToComply: [
      "Before check-in, remove the power bank module and carry it with you.",
      "If the battery cannot be removed, the bag will be denied at security.",
      "Disable GPS modules and locks during flight to avoid interference alerts.",
    ],
    whyRuleExists: "Fixed batteries in the hold are a fire hazard because crews cannot access them mid-flight.",
    extraNotes: [
      "Bags with tiny coin-cell trackers (under 2g lithium) are generally allowed.",
    ],
    richContent: {
      quickAnswer:
        "Smart suitcases are fine only when the power module pops out before check-in. Security wants the lithium pack in your hand luggage so a short circuit doesn’t smoulder in the cargo hold.",
      overview: [
        "Manufacturers build chargers, GPS trackers, and even scooters into suitcases now, but regulators didn’t rewrite the battery rule: removable equals allowed, fixed equals refused. If you can’t show how the battery detaches, the bag stays behind.",
        "Most batteries sit under the handle. Carry the tiny screwdriver (if needed) in your cabin pouch, remove the pack in front of the check-in agent, and stash it with your power banks. The bag itself can then be tagged like any normal suitcase.",
        "Coin-cell powered trackers such as AirTags remain fine as long as the airline hasn’t issued a temporary ban. Those cells are under 2g lithium and don’t power charging ports. It’s the USB power bricks that cause concern.",
      ],
      checklists: [
        {
          title: "Before you leave home",
          items: [
            "Charge the smart module to 60% so you can still use it as a power bank after landing.",
            "Practice removing the battery in under a minute; staff won’t hold the queue for trial and error.",
            "Print or bookmark the manual page showing the removable design in case staff ask for proof.",
          ],
        },
        {
          title: "At the airport",
          items: [
            "Remove the battery before the bag reaches the check-in scale.",
            "Switch off GPS/Bluetooth modules while the bag sits in the aircraft belly to preserve charge.",
            "Reinsert the module only after baggage claim when you can physically monitor it again.",
          ],
        },
      ],
      table: {
        caption: "Smart luggage decision tree",
        headers: ["Battery type", "Cabin", "Checked"],
        rows: [
          ["Removable lithium pack", "✅ As power bank", "✅ Bag allowed once pack removed"],
          ["Non-removable lithium pack", "❌", "❌ Bag refused"],
          ["Coin-cell tracker only", "✅", "✅"],
        ],
      },
      dos: [
        "Carry the removed module in the same pouch as your other batteries.",
        "If the bag has two batteries (one for GPS, one for USB), remove both.",
        "Keep mounting screws in a labelled zip bag so you don’t lose them mid-trip.",
      ],
      donts: [
        "Don’t argue that a sealed battery is ‘safe’—rules focus on accessibility, not brand claims.",
        "Don’t attempt to charge devices while the bag rides the conveyor belt.",
        "Avoid taping the module inside the bag; it must be completely separated.",
      ],
      faqs: [
        {
          question: "Is a partially removable battery acceptable?",
          answer: "Only if it can be completely detached without damaging the bag. Sliding covers are fine; soldered packs are not.",
        },
        {
          question: "Can I keep the battery connected but carry the entire bag as cabin baggage?",
          answer: "If the bag fits cabin dimensions, yes—because the battery stays under your supervision. Still be ready to remove it if staff insists.",
        },
        {
          question: "Do e-scooter suitcases need extra paperwork?",
          answer: "Yes. They often exceed watt-hour limits and may be classified as mobility devices. Check with the airline well in advance.",
        },
      ],
      tips: [
        "Add a bright ‘Battery removed’ tag to the handle so baggage screeners don’t flag the bag twice.",
        "Carry a USB meter to prove the module’s capacity if the label has faded.",
        "Store the battery in a fireproof pouch; it also protects clothes from scratches.",
      ],
      internalLinks: [
        { label: "Power bank watt-hour guide", slug: "power-bank-in-flight" },
        { label: "Cabin bag dimension rules", slug: "cabin-bag-count-dimensions" },
        { label: "Electronics tray checklist", slug: "electronics-security-tray" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "IATA Lithium Battery Guidance",
        url: "https://www.iata.org/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "electronics-security-tray",
    title: "Electronics Security Tray Checklist",
    shortTitle: "Electronics at security",
    category: "flight",
    tags: ["security", "tray", "electronics", "cisf"],
    verdict: {
      status: "allowed",
      summary: "Large electronics must be screened separately for clear X-ray images.",
    },
    howToComply: [
      "Place laptops, tablets, cameras, and power banks in individual trays with no cables on top.",
      "Empty your pockets into the tray to avoid secondary checks.",
      "Keep chargers and headphones in a mesh pouch so officers see them clearly.",
      "Label trays with your initials using the plastic placards to prevent mix-ups.",
    ],
    whyRuleExists: "Dense electronics can hide prohibited shapes on X-ray. Separate trays speed up CISF screening.",
    extraNotes: [
      "Fast-track/business lanes still require the same electronics layout unless using CT scanners (limited airports).",
    ],
    richContent: {
      quickAnswer:
        "Lay each large electronic (laptop, tablet, camera, power bank) in its own tray with no cables on top. Clean, flat layouts let CISF clear you in seconds and prevent re-scans.",
      overview: [
        "Security trays are essentially X-ray stages. When you dump a tangled ball of chargers on top of a MacBook, you create a dense blob that hides potential threats. Officers then pull you aside, empty the bag, and rescan—costing everyone time.",
        "Think assembly line: tray 1 for electronics, tray 2 for liquids, tray 3 for shoes and belts. Labels face up, nothing overlapping, pockets emptied. The more intentional your tray looks, the more confident the screener feels clearing it.",
        "Airports with CT scanners (Delhi T3, Bengaluru T2) sometimes allow laptops to remain in bags. But unless the queue marshal explicitly says so, stick to the classic layout. Consistency beats guesswork when flights are boarding.",
      ],
      checklists: [
        {
          title: "Tray packing order",
          items: [
            "Tray 1: Laptop/tablet/camera laid flat with labels facing up.",
            "Tray 2: Liquids in a 1L pouch + aerosols.",
            "Tray 3: Shoes, belt, watch, jacket, and empty pockets.",
          ],
        },
        {
          title: "Before reaching the belt",
          items: [
            "Unzip pockets and remove coins or metal keys ahead of time.",
            "Detach smartwatches if asked; some airports require it.",
            "Fold boarding pass and ID together so you can grab them once trays exit.",
          ],
        },
      ],
      table: {
        caption: "Common tray mistakes",
        headers: ["Mistake", "What happens", "Fix"],
        rows: [
          ["Stacking cables over laptop", "Bag rescanned", "Place cables beside electronics"],
          ["Leaving coins in pocket", "Body search", "Use tray for pocket items"],
          ["Mixing liquids with electronics", "Confusing X-ray image", "Separate trays"],
        ],
      },
      dos: [
        "Use silicon bands to keep chargers tidy.",
        "Place power banks in small fireproof sleeves so inspectors identify them instantly.",
        "Wait at the end of the belt to reclaim trays promptly.",
      ],
      donts: [
        "Don’t push trays roughly; they can jump the rollers and spill contents.",
        "Don’t leave trays unattended—abandoned electronics trigger alerts.",
        "Avoid standing directly at the belt exit; give others room to gather belongings.",
      ],
      faqs: [
        {
          question: "Do tablets need a separate tray like laptops?",
          answer: "Yes, unless signage at that airport specifically says tablets can stay in the bag.",
        },
        {
          question: "Can smart trays identify my property automatically?",
          answer: "DigiYatra trials include RFID trays, but they are not widespread yet. Label your gear until the rollout finishes.",
        },
        {
          question: "What about medical devices?",
          answer: "Declare them before the tray. Officers handle CPAPs and insulin coolers gently but still expect them outside the bag.",
        },
      ],
      tips: [
        "Keep a lightweight tote folded in your bag; it serves as a staging mat for tray prep.",
        "Wear slip-on shoes if possible so you’re not wrestling with laces while trays queue up.",
        "Clip AirTag or contact info to laptop sleeves in case of mix-ups.",
      ],
      internalLinks: [
        { label: "Laptop cabin rules", slug: "laptops-electronics" },
        { label: "Electronics behaviour tips", slug: "airport-security-behavior-tips" },
        { label: "Liquid 100ml policy", slug: "liquids-over-100ml" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "CISF Airport Security Advisory",
        url: "https://www.cisf.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "airport-security-behavior-tips",
    title: "Airport Security Behavior & Tips (India)",
    shortTitle: "Security behavior tips",
    category: "flight",
    tags: ["security", "behavior", "cisf", "tips"],
    verdict: {
      status: "allowed",
      summary: "Follow CISF etiquette to glide through checkpoints without delays.",
    },
    howToComply: [
      "Keep outside the bag: laptop, tablet, power bank, metal water bottle (empty), belt, coins, watch, and jacket before trays reach the X-ray.",
      "Items that always trigger checks: umbrella swords, foil-wrapped food, tangled chargers, aerosol cans, bundled cables, and opaque boxes—separate them upfront.",
      "Avoid mistakes that slow you down: forgetting to remove phones from pockets, stacking trays with overhanging straps, hiding liquids under clothes, or arguing with screeners.",
      "Arrange trays logically: first tray for electronics laid flat with labels up, second for liquids in the 1L pouch, third for shoes/belts, last for cabin bag; slide trays gently instead of pushing them hard.",
    ],
    whyRuleExists: "Standardised behavior keeps the X-ray image clean, reduces manual bag checks, and lets CISF maintain throughput during peak rush.",
    extraNotes: [
      "Use dedicated family/senior lanes where available; the pace is calmer and officers assist with bins.",
      "Place boarding pass on top of the first tray so the screener can match it quickly if an item is flagged.",
      "If unsure about an object, ask the queue marshal before joining the belt to avoid repacking mid-line.",
    ],
    richContent: {
      quickAnswer:
        "Security queues move faster when you pre-sort everything—ID ready, pockets empty, electronics visible, and attitude calm. Think of yourself as part of the team keeping the checkpoint flowing.",
      overview: [
        "CISF officers watch thousands of travellers a day. They know the difference between a confused passenger and someone trying to hide something. When you look prepared—boarding pass in hand, bag already unzipped—they reciprocate with a smoother experience.",
        "Behaviour matters as much as packing. Friendly greetings, eye contact, and quick compliance reassure officers that you respect the process. Aggressive or distracted behaviour (loud phone calls, filming without permission) slows everything down and may invite extra questioning.",
        "Use family, DigiYatra, or priority lanes if eligible. They exist to reduce bottlenecks. If a bag gets flagged, step aside promptly to the inspection table so the belt keeps moving for others.",
      ],
      checklists: [
        {
          title: "Mindset before the queue",
          items: [
            "Keep ID + boarding pass in the same hand; don’t dig through bags at the last second.",
            "Finish calls and remove earbuds so you can hear instructions.",
            "Scan signage for special rules (CT scanners, shoe removal, DigiYatra lane timings).",
          ],
        },
        {
          title: "At the security belt",
          items: [
            "Empty pockets completely—coins, tissues, lipstick—into the tray before you reach the scanner.",
            "Place prohibited-looking items aside and proactively inform the officer (e.g., travel sewing kits).",
            "Stand on the mat until green light or verbal cue before walking through the arch.",
          ],
        },
      ],
      table: {
        caption: "Behaviour cues officers love vs hate",
        headers: ["Action", "Effect", "Better approach"],
        rows: [
          ["Arguing about removing belts", "Delays whole queue", "Follow instruction then escalate politely later"],
          ["Filming checkpoints", "Security stop + data deletion", "Request permission or avoid filming"],
          ["Helping kids/seniors prep trays", "Keeps queue flowing", "Use family lane if available"],
        ],
      },
      dos: [
        "Smile and say hello; rapport eases the process.",
        "Use provided trays even if you think you can hold items—consistency helps staff.",
        "Step aside to repack instead of blocking the belt exit.",
      ],
      donts: [
        "Don’t joke about bombs, weapons, or ‘testing security’; it triggers incident reports.",
        "Don’t film officers without permission; it’s prohibited in most terminals.",
        "Avoid wearing layered metal jewellery that will obviously set off alarms unless necessary.",
      ],
      faqs: [
        {
          question: "Can I refuse a pat-down?",
          answer: "You can request a supervisor or private screening, but you cannot skip it. Cooperate politely and ask for clarification if you feel uncomfortable.",
        },
        {
          question: "What if I don’t speak the local language?",
          answer: "Use simple English words like ‘laptop?’, ‘liquid?’, or point to the item. Officers will switch to English or get someone who can assist.",
        },
        {
          question: "Are there seats for people who need more time?",
          answer: "Yes, most checkpoints have chairs near the belt. Inform the marshal so they can direct you.",
        },
      ],
      tips: [
        "Pack a light jacket with zip pockets; stash emptied pocket items there after screening.",
        "Carry a pen to fill self-declaration forms without borrowing.",
        "Encourage kids to introduce themselves in their own words so they feel confident answering officer check-in questions.",
      ],
      internalLinks: [
        { label: "Electronics tray checklist", slug: "electronics-security-tray" },
        { label: "Cabin bag size guide", slug: "cabin-bag-count-dimensions" },
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "CISF Travel Advisory 2025",
        url: "https://www.cisf.gov.in/",
      },
      {
        label: "BCAS Passenger Education Campaign",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "bluetooth-headphones-flight",
    title: "Bluetooth Headphones and Wearables in Flight",
    shortTitle: "Bluetooth headphones",
    category: "flight",
    tags: ["bluetooth", "headphones", "wearables"],
    verdict: {
      status: "allowed",
      summary: "Allowed in cabin mode with flight-safe settings. Must pause during safety demo and landing announcements.",
    },
    howToComply: [
      "Use flight mode on the paired phone/tablet and keep volume low during demos.",
      "Remove over-ear sets during take-off/landing if crew requests.",
      "Spare earbuds and charging cases count toward your battery allowance.",
    ],
    whyRuleExists: "Bluetooth is low power but crew must ensure passengers can hear safety instructions.",
    extraNotes: [
      "Some regional airlines ask passengers to switch to wired headsets on ATR/Q400 aircraft.",
    ],
    richContent: {
      quickAnswer:
        "Bluetooth headphones and wearables are fine in flight as long as the paired phone stays in flight mode and you pause audio during safety announcements. Crew can always ask you to take them off during taxi, take-off, and landing.",
      overview: [
        "Personal Electronic Device (PED) rules evolved over the last decade. DGCA now permits low-power Bluetooth once the aircraft doors close, but they prioritise communication: if the crew feels passengers can’t hear instructions, they’ll ask you to remove the headset.",
        "Cabin crew also watch battery safety. Charging cases, ANC headsets, and smartwatches all use lithium cells. Keep them in the cabin, avoid wedging them between seat cushions, and don’t charge devices during turbulence when cables can fly loose.",
        "On turboprop aircraft (ATR/Q400) you might still hear announcements banning Bluetooth because of cockpit interference concerns. Respect those airline-specific rules even if you flew a jet earlier the same day with no issue.",
      ],
      checklists: [
        {
          title: "Before boarding",
          items: [
            "Charge headphones fully so you don’t search for outlets mid-flight.",
            "Pack a tiny wired backup for airlines that still restrict Bluetooth.",
            "Clean earcups—hygiene checks are common post-pandemic.",
          ],
        },
        {
          title: "During the flight",
          items: [
            "Switch devices to flight mode and reconnect Bluetooth manually.",
            "Pause playback during safety demos and whenever crew make announcements.",
            "Store the charging case in the seat pocket only if it closes securely; otherwise keep it in your sling.",
          ],
        },
      ],
      table: {
        caption: "Bluetooth policy highlights",
        headers: ["Phase", "Allowed?", "Notes"],
        rows: [
          ["Boarding + taxi", "⚠️ Case-by-case", "Crew may ask for removal"],
          ["Cruise", "✅ Allowed", "Keep volume low enough to hear announcements"],
          ["Landing", "⚠️ Often paused", "Expect reminder to stow devices"],
        ],
      },
      dos: [
        "Download playlists offline to avoid midair streaming issues.",
        "Carry a Type-C to 3.5mm dongle if your airline’s IFE uses wired ports.",
        "Keep device firmware updated; some airlines test for low-energy compliance.",
      ],
      donts: [
        "Don’t ignore crew when they ask you to remove headsets—non-compliance can get you offloaded.",
        "Don’t leave earbuds loose on seat cushions; they roll into hinges and break.",
        "Avoid placing headphones in checked baggage; the lithium cells must stay with you.",
      ],
      faqs: [
        {
          question: "Can I use Bluetooth while the aircraft is refuelling?",
          answer: "No. During refuelling everyone must remain alert and some airlines cut cabin power entirely.",
        },
        {
          question: "Do smart rings or fitness bands count?",
          answer: "Yes, but they emit negligible power. Keep them in airplane mode if possible.",
        },
        {
          question: "What about Bluetooth keyboards for in-flight work?",
          answer: "Allowed once cruise starts. Place them on a stable tray table and keep devices secured during turbulence.",
        },
      ],
      tips: [
        "Pair headphones to both phone and laptop beforehand so you’re not fiddling midair.",
        "Carry spare ear tips; pressure changes can make loose buds fall out.",
        "Use transparency/ambient mode during cabin service so you hear crew requests.",
      ],
      internalLinks: [
        { label: "Power bank guide", slug: "power-bank-in-flight" },
        { label: "Cabin bag size rules", slug: "cabin-bag-count-dimensions" },
        { label: "Electronics etiquette", slug: "electronics-security-tray" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "MoCA Civil Aviation Requirement - PED",
        url: "https://www.civilaviation.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "perfume-in-flight",
    title: "Perfume and Deodorant Rules",
    shortTitle: "Perfume / Deodorant",
    category: "flight",
    tags: ["perfume", "deodorant", "liquid", "cabin"],
    verdict: {
      status: "limited",
      summary: "Cabin limit 100ml per bottle inside a 1L clear bag. Larger bottles go in checked baggage.",
    },
    howToComply: [
      "Use travel-size sprays (50-100ml) for cabin carriage.",
      "Ensure aerosol nozzles have protective caps.",
      "Keep checked perfumes inside leakproof pouches to protect clothes.",
    ],
    whyRuleExists: "Liquids above 100ml can conceal explosives and aerosols are flammable.",
    extraNotes: [
      "Solid perfumes (balms) are exempt from the liquid rule but must stay under 100g.",
    ],
    richContent: {
      quickAnswer:
        "Perfumes, deodorants, and body sprays count as liquids/aerosols. Keep each cabin bottle under 100ml inside a clear 1L zip bag; larger bottles belong in checked baggage with leak-proof packing.",
      overview: [
        "The 100ml rule measures container size, not how much liquid remains. That half-used 150ml bottle still gets confiscated because screeners cannot verify volume mid-queue.",
        "Aerosols add another layer: propellants are flammable. Caps must stay on, and total toiletry aerosols per passenger can’t exceed 2L/2kg. Industrial sprays (paint, insecticide) are banned outright.",
        "Checked baggage is kinder to big perfume bottles, but pressure changes still force leaks. Wrap bottles in plastic, cushion them inside clothes, and keep receipts handy for customs.",
      ],
      checklists: [
        {
          title: "Cabin packing",
          items: [
            "Decant into 50–100ml travel atomisers with volume markers.",
            "Place all liquids, gels, creams in one resealable 1L pouch for easy inspection.",
            "Carry solid perfume balms separately—they bypass the liquid rule.",
          ],
        },
        {
          title: "Checked baggage precautions",
          items: [
            "Wrap bottles in cling film, then in bubble wrap or socks.",
            "Store inside a rigid box to prevent crushing.",
            "Note customs allowances if returning with multiple duty-free bottles.",
          ],
        },
      ],
      table: {
        caption: "Perfume scenarios",
        headers: ["Item", "Cabin", "Checked"],
        rows: [
          ["100ml spray", "✅ In 1L bag", "✅"],
          ["150ml aerosol", "❌", "✅ If toiletry type"],
          ["Solid balm", "✅", "✅"],
        ],
      },
      dos: [
        "Label decanted bottles with scent name + ml so officers know it’s cosmetic.",
        "Carry a doctor note if you need medicinal inhalers alongside perfumes.",
        "Let duty-free staff seal purchases in STEBs if you have onward flights.",
      ],
      donts: [
        "Don’t spray perfume during boarding—cabins recycle air and fragrances may trigger allergies.",
        "Don’t pack glass bottles against hard toiletry caps; turbulence cracks them.",
        "Avoid taking aerosol caps off for space—they’re required to prevent accidental discharge.",
      ],
      faqs: [
        {
          question: "Can I carry perfume samples?",
          answer: "Yes, as long as each vial is under 100ml and they collectively fit the 1L bag.",
        },
        {
          question: "Do solid deodorant sticks count as liquids?",
          answer: "No, they are treated like solids unless noticeably gel-like. Keep weight under 100g to be safe.",
        },
        {
          question: "What if I buy perfume after security and connect to another flight?",
          answer: "Keep it sealed in the STEB with the receipt showing purchase within 36 hours. Transit security otherwise confiscates it.",
        },
      ],
      tips: [
        "Use leak-proof travel atomisers with locking valves.",
        "Carry unscented wipes to clean accidental spills immediately.",
        "If you love signature scents, store empty labelled bottles at home to refill before each trip.",
      ],
      internalLinks: [
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
        { label: "Duty-free liquid sealing", slug: "duty-free-liquids-return" },
        { label: "Shampoo & lotion limits", slug: "shampoo-and-lotions" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "BCAS LAGs Directive",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "sanitizer-in-flight",
    title: "Hand Sanitizer Limits",
    shortTitle: "Sanitizer allowance",
    category: "flight",
    tags: ["sanitizer", "liquid", "alcohol"],
    verdict: {
      status: "limited",
      summary: "Cabin limit 350ml per passenger (MoHFW Covid relaxation). Checked baggage allows larger bottles if sealed.",
    },
    howToComply: [
      "Carry up to 350ml combined sanitizer in cabin; prefer 100ml pump bottles for convenience.",
      "Keep alcohol content between 60-80% for effectiveness and to satisfy airline flammability rules.",
      "Store inside a zip bag to prevent leaks after pressure changes.",
    ],
    whyRuleExists: "Sanitizers contain ethanol or IPA, which is flammable; the limit balances hygiene with safety.",
    extraNotes: [
      "Some airports still ask you to show the label to confirm alcohol percentage.",
    ],
    richContent: {
      quickAnswer:
        "India still allows up to 350ml of hand sanitizer per passenger in cabin, provided bottles stay upright and labelled. Larger refills go in checked baggage, sealed and cushioned.",
      overview: [
        "During the pandemic MoCA relaxed the liquid rule for sanitizers from 100ml to 350ml. The exemption remains, but officers expect to see the printed alcohol percentage (60–80% ideal). Unlabelled liquids are treated as suspicious and may be discarded.",
        "Cabin crew want the bottle accessible yet secure. A pump bottle that leaks onto aircraft seat cushions earns you a stern warning. Use flip-cap travel bottles or lockable pumps.",
        "For checked baggage, treat sanitizer like any flammable liquid. Double-bag, keep away from electronics, and declare large volumes if you’re transporting for charity or work.",
      ],
      checklists: [
        {
          title: "Cabin allowance",
          items: [
            "Carry one or two bottles totalling 350ml—e.g., a 250ml pump + 100ml spare.",
            "Ensure the label shows brand, percentage, and manufacturer.",
            "Place the bottle in its own zip pouch to contain leaks.",
          ],
        },
        {
          title: "Checked baggage handling",
          items: [
            "Seal caps with tape, then wrap in absorbent cloth.",
            "Keep away from food and electrical items.",
            "Declare cartons above 1 litre to airline staff; they may treat it as dangerous goods.",
          ],
        },
      ],
      table: {
        caption: "Sanitizer scenarios",
        headers: ["Volume", "Cabin", "Notes"],
        rows: [
          ["≤100ml", "✅ In liquids pouch", "Counts towards LAG limit"],
          ["101–350ml", "✅ Special MoCA allowance", "Keep label visible"],
          [">350ml", "❌", "Check-in only with leak-proof packing"],
        ],
      },
      dos: [
        "Transfer gel sanitizer into leak-resistant bottles with locking flip caps.",
        "Carry unscented wipes as backup when crew limit sanitizer use.",
        "Use sanitizer after touching tray tables but let it dry fully before handling electronics.",
      ],
      donts: [
        "Don’t spray sanitizer near open flames or galley equipment—it’s flammable.",
        "Don’t carry unlabelled decanted liquids; officers must identify contents.",
        "Avoid storing sanitizer next to snacks without double-bagging; taste contamination is real.",
      ],
      faqs: [
        {
          question: "Is foam sanitizer treated differently?",
          answer: "No. The allowance is based on volume, not texture. Keep container size within 350ml.",
        },
        {
          question: "Can I carry industrial disinfectants?",
          answer: "Not in cabin. They require dangerous goods clearance. Stick to consumer-grade hand rubs.",
        },
        {
          question: "Do other countries honour India’s 350ml rule?",
          answer: "No. The allowance applies only when departing Indian airports. Follow the destination’s rule on the return journey.",
        },
      ],
      tips: [
        "Attach a mini sanitizer to your sling for quick post-security use.",
        "Carry moisturiser or barrier cream to prevent cracked skin from frequent sanitizing.",
        "Use refillable silicone bottles—they compress as liquid empties, reducing leaks.",
      ],
      internalLinks: [
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
        { label: "Perfume & aerosol guide", slug: "perfume-in-flight" },
        { label: "Shampoo & lotion allowances", slug: "shampoo-and-lotions" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "MoCA Circular AVSEC-06/2020",
        url: "https://www.civilaviation.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "shampoo-and-lotions",
    title: "Shampoo, Lotions, and Creams",
    shortTitle: "Shampoo & lotions",
    category: "flight",
    tags: ["shampoo", "lotion", "cream", "toiletry"],
    verdict: {
      status: "limited",
      summary: "Treat as liquids/gels. Cabin limit 100ml per container inside the 1L bag.",
    },
    howToComply: [
      "Buy travel bottles and label them with the volume.",
      "Wrap pump dispensers with tape so they do not leak mid-flight.",
      "Checked luggage can hold bigger bottles up to 2kg/2L total for toiletry aerosols.",
    ],
    whyRuleExists: "LAG (liquids, aerosols, gels) restrictions standardised with ICAO rules.",
    extraNotes: [
      "Solid shampoo bars bypass the liquid rule if under 100g.",
    ],
    richContent: {
      quickAnswer:
        "Liquids, gels, and creams such as shampoo, conditioner, lotion, and facewash must stay in 100ml-or-smaller containers when travelling in cabin. Bigger bottles belong in checked baggage with lids taped and placed inside leak-proof pouches.",
      overview: [
        "Airport scanners cannot distinguish harmless gels from liquid explosives, so the 100ml container rule applies worldwide. That means even half-empty 250ml salon bottles get tossed at security.",
        "Travel bottles solve it. Buy TSA/BCAS-compliant 100ml containers, label them, and keep them all inside one 1L zip pouch. Officers simply glance at the pouch, note that volumes are compliant, and wave you ahead.",
        "Checked baggage allows larger bottles but still expects smart packing. Pressure swings pop pump dispensers open mid-flight, so tape the neck, twist to the ‘locked’ position, and wrap them in clothing or absorbent material.",
      ],
      checklists: [
        {
          title: "Cabin kit",
          items: [
            "Decant only what you need for the trip into labelled 50–100ml bottles.",
            "Place the bottles plus toothpaste and creams inside one transparent pouch.",
            "Carry solid shampoo bars or sheet masks if you want to save liquid quota.",
          ],
        },
        {
          title: "Checked-bag packing",
          items: [
            "Use double-sealed pouches for anything with pump or flip tops.",
            "Keep toiletries in the middle of the suitcase surrounded by clothes.",
            "Separate glass jars from electronics to avoid mess if they shatter.",
          ],
        },
      ],
      table: {
        caption: "What counts as liquid/gel",
        headers: ["Product", "Cabin handling", "Notes"],
        rows: [
          ["Shampoo/conditioner", "≤100ml each", "Decant or carry sachets"],
          ["Body lotion", "≤100ml", "Thick creams still count as gel"],
          ["Solid shampoo bar", "Exempt", "Keep under 100g"],
        ],
      },
      dos: [
        "Use leak-proof silicone bottles with wide mouths for easy cleaning.",
        "Label products clearly so officers can see they are cosmetic, not chemicals.",
        "Carry a spare zip pouch—security may ask to re-bag if the first one tears.",
      ],
      donts: [
        "Don’t overfill travel bottles; leave headspace for pressure expansion.",
        "Don’t assume hotel toiletries pass muster; if they’re over 100ml you still can’t bring them back through security.",
        "Avoid mixing multiple products in one bottle ‘to save space’; leaks become impossible to clean.",
      ],
      faqs: [
        {
          question: "Are refill pouches treated differently from bottles?",
          answer: "No—if the pouch holds more than 100ml, you cannot take it in cabin.",
        },
        {
          question: "Can baby shampoo exceed 100ml if travelling with an infant?",
          answer: "Only baby food and milk get liquid exemptions. Baby toiletries must still follow the 100ml limit.",
        },
        {
          question: "Do sheet masks count?",
          answer: "Individually sealed sheet masks are fine because they contain minimal liquid, but keep them with your liquids pouch just in case.",
        },
      ],
      tips: [
        "Carry small funnels or refill tools to avoid spills while decanting.",
        "Use washi tape to mark which bottle is shampoo vs conditioner; marker ink fades.",
        "Place a cotton pad under screw lids before closing to absorb tiny leaks.",
      ],
      internalLinks: [
        { label: "Liquid 100ml rule", slug: "liquids-over-100ml" },
        { label: "Perfume & aerosol guide", slug: "perfume-in-flight" },
        { label: "Hair oil & ghee rules", slug: "hair-oil-ghee-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "BCAS LAGs Directive",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "makeup-in-cabin",
    title: "Makeup Items: Eyeliner, Mascara, Lipstick",
    shortTitle: "Makeup kit",
    category: "flight",
    tags: ["makeup", "cosmetics", "lipstick", "eyeliner"],
    verdict: {
      status: "limited",
      summary: "Liquid or gel-based makeup counts toward the 100ml rule; compact powders are exempt.",
    },
    howToComply: [
      "Place mascara, liquid eyeliner, foundation, and lip gloss in the transparent bag.",
      "Lipsticks and balms are allowed outside the bag but keep them capped.",
      "Metal palettes may trigger extra screening; keep them accessible.",
    ],
    whyRuleExists: "Many cosmetic products have flammable solvents or pastes that fall under the LAG definition.",
    extraNotes: [
      "Nail tools like tweezers under 6cm are fine, but blades must still be checked.",
    ],
    richContent: {
      quickAnswer:
        "Liquid or gel cosmetics—mascara, eyeliner, foundation, liquid lipstick—count towards the 100ml liquids rule. Powders, pencils, and solid sticks are exempt but should stay capped to avoid smudging.",
      overview: [
        "When in doubt, treat makeup like science class: if it pours, smears, or oozes, it belongs in the quart-sized liquids pouch. Officers see hundreds of cosmetic kits daily; organised kits sail through while messy ones cause rescans.",
        "Palettes with metal pans sometimes trigger extra screening because they look like stacked plates on the X-ray. Keeping them near the top of the bag and mentioning them upfront saves time.",
        "Sharp items such as metal nail files or tweezers under 6cm usually pass, but anything longer or with a blade should travel in checked baggage. Always respect local rules if you’re connecting via airports with stricter policies (e.g., the UK often confiscates even small tools).",
      ],
      checklists: [
        {
          title: "Liquids and gels",
          items: [
            "Store mascara, liquid eyeliner, foundation, concealer, and lip gloss inside the 1L zip pouch.",
            "Keep each container 100ml or smaller; travel minis are safer.",
            "Label skincare vs makeup to avoid confusion during inspections.",
          ],
        },
        {
          title: "Tools and palettes",
          items: [
            "Cover brush bristles with guards so they don’t look like wires.",
            "Place palettes flat to avoid cracked powders.",
            "Check sharp lash tools (metal curlers with blades) if unsure.",
          ],
        },
      ],
      table: {
        caption: "Makeup item cheat sheet",
        headers: ["Item", "Cabin rule", "Notes"],
        rows: [
          ["Liquid foundation", "≤100ml in pouch", "Stick or powder versions are exempt"],
          ["Powder compact", "Allowed", "May need separate screening"],
          ["Makeup scissors", "Check", "Counts as sharp tool"],
        ],
      },
      dos: [
        "Carry a dedicated cosmetics pouch that unfurls at security for quick inspection.",
        "Use stackable magnetic palettes to save space.",
        "Pack blotting papers or solid balm perfumes to reduce liquid count.",
      ],
      donts: [
        "Don’t carry acetone-based brush cleaners in cabin—they exceed flammable limits.",
        "Don’t leave lipsticks uncapped; melted product looks suspicious on scanners.",
        "Avoid carrying makeup knives or spatulas in cabin; they resemble blades.",
      ],
      faqs: [
        {
          question: "Are cushion compacts treated as liquids?",
          answer: "Yes. They contain saturated sponges, so keep them in the liquids pouch.",
        },
        {
          question: "What about eyelash glue?",
          answer: "It’s a liquid adhesive, so limit to 100ml containers (most are 5–10ml). Keep it with liquids.",
        },
        {
          question: "Can I carry makeup in handbag and cabin trolley?",
          answer: "Yes, but the total liquids must still fit within one 1L pouch per passenger.",
        },
      ],
      tips: [
        "Place cotton pads inside powder compacts to prevent breakage.",
        "Use small silicone brush holders instead of metal cases that look like toolkits.",
        "Carry a multi-use tint stick to cut down on separate lipstick/blush containers.",
      ],
      internalLinks: [
        { label: "Liquids rule refresher", slug: "liquids-over-100ml" },
        { label: "Razor and blade policy", slug: "razor-cartridge-vs-blade" },
        { label: "Nail polish & remover", slug: "nail-polish-remover" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "BCAS Cosmetic Carriage FAQ",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "nail-polish-remover",
    title: "Nail Polish and Removers",
    shortTitle: "Nail polish/remover",
    category: "flight",
    tags: ["nail polish", "acetone", "cosmetics"],
    verdict: {
      status: "limited",
      summary: "Allowed in cabin up to 100ml and in checked bags up to 0.5L per container.",
    },
    howToComply: [
      "Seal bottles tightly and place inside double zip bags.",
      "Acetone-based removers are highly flammable; keep away from power banks.",
      "Carry non-acetone wipes if you only need light touch-ups mid-trip.",
    ],
    whyRuleExists: "Solvents release fumes and fall under dangerous goods when volumes are higher.",
    extraNotes: [
      "Manicure kits with metal cuticle tools must go in checked baggage.",
    ],
    richContent: {
      quickAnswer:
        "Nail polish and removers are flammable liquids. Carry up to 100ml in cabin (inside the liquids pouch) and up to 0.5L per container in checked baggage, with lids taped and bottles cushioned.",
      overview: [
        "Acetone fumes ignite easily, so officers scrutinise manicure kits. Small travel bottles for touch-ups are fine, but big salon jars must travel in checked baggage with leak-proof packing.",
        "Brush-on polishes fall under the same rule; even gel polishes, though thicker, count as liquids. Keep them upright in a cosmetics case so they don’t leak onto clothing.",
        "Metal manicure tools, UV lamps, and nail drills add another layer. Blades longer than 6cm must be checked, and UV lamps should be packed carefully to avoid cracked bulbs.",
      ],
      checklists: [
        {
          title: "Cabin essentials",
          items: [
            "Limit to 1–2 small bottles (≤100ml each) plus a mini remover wipe pack.",
            "Carry spill-proof caps; add tape if the manufacturer’s cap is loose.",
            "Store in the 1L liquids pouch with other cosmetics.",
          ],
        },
        {
          title: "Checked manicure kit",
          items: [
            "Wrap full-size remover bottles in double zip bags and cushion with towels.",
            "Place metal tools in a roll-up pouch so they don’t puncture clothes.",
            "Pack UV/LED lamps in original foam packaging to avoid damage.",
          ],
        },
      ],
      table: {
        caption: "Nail product allowances",
        headers: ["Product", "Cabin", "Checked"],
        rows: [
          ["Nail polish (15ml)", "✅ In liquids pouch", "✅"],
          ["Acetone remover 300ml", "❌", "✅ Up to 0.5L per container"],
          ["Metal cuticle nippers", "❌", "✅"],
        ],
      },
      dos: [
        "Carry pre-soaked remover pads—they stay sealed and smell less.",
        "Keep receipts for expensive gel kits in case customs queries value.",
        "Let polish dry fully before heading to the airport; wet polish triggers smell complaints.",
      ],
      donts: [
        "Don’t attempt manicures in the gate area—fumes bother other travellers.",
        "Don’t travel with acetone in unlabelled bottles; officers need to know what the liquid is.",
        "Avoid packing glass remover bottles against metal tools; turbulence can smash them.",
      ],
      faqs: [
        {
          question: "Are non-acetone removers less restricted?",
          answer: "They still count as liquids and may contain flammable solvents. Follow the same limits.",
        },
        {
          question: "Can I carry nail glue?",
          answer: "Yes, but tubes are usually under 10ml. Keep them in the liquids pouch and away from heat.",
        },
        {
          question: "What about acrylic powder?",
          answer: "Powders are allowed but keep them in original containers to avoid suspicion.",
        },
      ],
      tips: [
        "Switch to peel-off polish for short trips to skip remover entirely.",
        "Use silicone bottle sleeves to reduce the chance of breakage.",
        "Carry a small trash bag to dispose used remover wipes responsibly mid-journey.",
      ],
      internalLinks: [
        { label: "Makeup kit rules", slug: "makeup-in-cabin" },
        { label: "Aerosol allowances", slug: "aerosol-cans" },
        { label: "Sharp tool policy", slug: "sharp-objects-in-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "Air India Restricted Articles Guide",
        url: "https://www.airindia.com/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "liquids-over-100ml",
    title: "Carrying Liquid Bottles Over 100ml",
    shortTitle: "Liquid bottles >100ml",
    category: "flight",
    tags: ["liquid", "bottle", "security"],
    verdict: {
      status: "not_allowed",
      summary: "Liquids above 100ml per container are banned from cabin unless exempt (baby food/medicines).",
    },
    howToComply: [
      "Split products into smaller TSA-compliant bottles.",
      "Medical or baby exemptions require proof (prescription, infant ticket).",
      "Checked baggage can hold larger bottles but wrap them to avoid leaks.",
    ],
    whyRuleExists: "Global post-2006 rules limit liquid explosive components in cabin baggage.",
    extraNotes: [
      "The 100ml rule applies even if the bottle is half empty; container size is what matters.",
    ],
    richContent: {
      quickAnswer:
        "Any liquid, gel, aerosol, paste, or cream over 100ml per container is banned from cabin baggage unless covered by a medical or baby-food exemption. Checked baggage can hold larger quantities, but pack them securely.",
      overview: [
        "The post-2006 ‘LAG’ (liquids, aerosols, gels) rule is universal: one passenger, one 1L transparent bag, each container 100ml or less. Security doesn’t negotiate because measuring mid-queue is impractical.",
        "The rule covers surprising items—yogurt cups, hair wax, nut butters, chutneys, even semi-solid desserts. If it can smear, it counts. Officers have seen every trick, so labelling and honesty are faster than debate.",
        "Medical liquids (insulin, baby milk) are exempt but must be declared and supported with prescriptions or infant tickets. Officers swab them, then return them promptly.",
      ],
      checklists: [
        {
          title: "Cabin-ready kit",
          items: [
            "Transfer toiletries into 100ml labelled bottles.",
            "Place all LAG items inside a single resealable 1L bag.",
            "Carry prescriptions/doctor letters for medicines exceeding 100ml.",
          ],
        },
        {
          title: "Checked-bag strategy",
          items: [
            "Double-bag sauces, oils, or food jars to avoid leaks.",
            "Use rigid containers for fragile glass bottles.",
            "Keep receipts for duty-free liquids in case customs needs proof of purchase.",
          ],
        },
      ],
      table: {
        caption: "LAG quick reference",
        headers: ["Item", "Cabin", "Notes"],
        rows: [
          ["100ml perfume", "✅", "Must fit in 1L bag"],
          ["200ml lotion", "❌", "Check-in only"],
          ["Baby milk", "✅ With infant", "Declare at screening"],
        ],
      },
      dos: [
        "Use travel-size bottles with printed volume marks.",
        "Carry a spare empty pouch; security provides limited replacements.",
        "Group similar items together (skincare vs food) for easier inspection.",
      ],
      donts: [
        "Don’t argue that a half-full bottle is ‘under 100ml’—container size rules.",
        "Don’t hide liquids inside shoes or gift boxes; X-ray operators flag them instantly.",
        "Avoid last-minute duty-free purchases before domestic connections—they may be seized at the next checkpoint.",
      ],
      faqs: [
        {
          question: "Does the 1L bag need to be exactly 1 litre?",
          answer: "No, but it must be able to seal. Standard 20cm × 20cm bags meet the requirement.",
        },
        {
          question: "Can I carry ice packs?",
          answer: "Frozen gel packs count as liquids once they thaw. Declare them if needed for medicine or baby food.",
        },
        {
          question: "What about powder-to-liquid mixes?",
          answer: "Powder is fine, but once mixed with water it obeys liquid rules. Keep powders in original packaging to avoid suspicion.",
        },
      ],
      tips: [
        "Store the pouch near the top of your bag so you can pull it out without unpacking everything.",
        "Use stackable travel jars for creams—they utilise vertical space better.",
        "If you frequently carry sauces, freeze them overnight; once solid they still count as gels, but leaks reduce.",
      ],
      internalLinks: [
        { label: "Perfume & aerosol guide", slug: "perfume-in-flight" },
        { label: "Baby food exemption", slug: "baby-food-formula-flight" },
        { label: "Duty-free liquids in transit", slug: "duty-free-liquids-return" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "ICAO Annex 17 Implementation",
        url: "https://www.icao.int/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "hair-oil-ghee-flight",
    title: "Hair Oil, Ghee, and Butter",
    shortTitle: "Hair oil / ghee",
    category: "flight",
    tags: ["hair oil", "ghee", "butter", "liquid"],
    verdict: {
      status: "limited",
      summary: "Counts as liquid/gel. Cabin up to 100ml; checked baggage allowed with leak-proof packing.",
    },
    howToComply: [
      "Use screw-top steel or HDPE containers with shrink wrap.",
      "Avoid glass jars in cabin; pressure changes can break them.",
      "Freeze ghee before packing so it stays semi-solid longer.",
    ],
    whyRuleExists: "Fats behave like gels in scanners and can conceal liquids.",
    extraNotes: [
      "CISF may swab containers for explosive trace detection if opaque.",
    ],
    richContent: {
      quickAnswer:
        "Hair oil, ghee, butter, and similar semi-solid fats count as gels. Keep them under 100ml in cabin (inside the liquids pouch) and pack larger jars in checked baggage with screw-top lids, shrink wrap, and absorbent padding.",
      overview: [
        "Even if ghee is solid at room temperature, scanners treat it like a gel because it softens quickly. Officers swab opaque tins to ensure no explosive residue hides inside, so transparent containers speed things up.",
        "Cabin allowance mirrors other liquids: 100ml containers only. Families heading abroad often carry homemade ghee for kids—split it into multiple mini jars for the flight and stash the bulk in checked luggage.",
        "Checked baggage requires smarter packing. Pressure changes can force lids open, so triple-seal jars, place them inside pressure bags, and cushion them with clothes you don’t mind washing.",
      ],
      checklists: [
        {
          title: "Cabin prep",
          items: [
            "Use leak-proof silicone travel jars (≤100ml) for hair oil or ghee.",
            "Label jars clearly to show it’s food or cosmetic, not chemicals.",
            "Store inside the 1L liquids/gels pouch with other toiletries.",
          ],
        },
        {
          title: "Checked baggage",
          items: [
            "Shrink-wrap or tape lids, then place jars in double zip bags.",
            "Freeze ghee overnight so it stays solid longer.",
            "Pack jars upright inside a rigid lunchbox or steel dabba to contain leaks.",
          ],
        },
      ],
      table: {
        caption: "Where each format fits",
        headers: ["Product", "Cabin", "Checked"],
        rows: [
          ["50ml hair oil", "✅", "✅"],
          ["250ml ghee jar", "❌", "✅ With leakproof packing"],
          ["Solid butter block", "❌", "✅ Keep chilled"],
        ],
      },
      dos: [
        "Line jars with parchment before screwing lids to catch drips.",
        "Keep receipts when transporting artisanal food items for customs queries.",
        "Use stainless containers instead of glass to avoid breakage.",
      ],
      donts: [
        "Don’t carry unlabeled homemade oil in soda bottles—it will be confiscated.",
        "Don’t pack jars near electronics; leaks ruin laptops.",
        "Avoid carrying huge quantities without declaring; customs may treat it as commercial import.",
      ],
      faqs: [
        {
          question: "Can I carry coconut oil solidified under 24°C?",
          answer: "If the container exceeds 100ml, it is still treated as a gel. Decant into smaller jars for cabin travel.",
        },
        {
          question: "Are Ayurvedic oils treated differently?",
          answer: "No. They follow the same LAG rules. Carry prescriptions if the oil is for medical therapy.",
        },
        {
          question: "What about ghee in hand baggage for infants?",
          answer: "If it’s essential baby food, declare it. Officers often allow slightly bigger quantities when the infant is present, but approval is discretionary.",
        },
      ],
      tips: [
        "Use mason-jar silicone sleeves to add grip and prevent cracks.",
        "Pack a small bottle of dish soap to clean accidental spills in hotel sinks.",
        "Carry disposable gloves for handling greasy containers after landing.",
      ],
      internalLinks: [
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
        { label: "Food & snacks policy", slug: "food-and-snacks-in-flight" },
        { label: "Baby food exemptions", slug: "baby-food-formula-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "BCAS LAGs Directive",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "medicines-in-flight",
    title: "Medicines With or Without Prescription",
    shortTitle: "Medicines in cabin",
    category: "flight",
    tags: ["medicine", "prescription", "tablets"],
    verdict: {
      status: "allowed",
      summary: "Tablets and essential meds are allowed in both cabin and checked baggage; carry prescriptions for controlled drugs.",
    },
    howToComply: [
      "Keep meds in original blister packs with doctor labels.",
      "Carry a prescription/doctor letter for painkillers stronger than OTC.",
      "Store them in an easy-access pouch for security declaration.",
    ],
    whyRuleExists: "Passengers need uninterrupted medical support but authorities must curb misuse of narcotic-class medicines.",
    extraNotes: [
      "Temperature-sensitive meds should stay with you; aircraft holds are not climate controlled.",
    ],
    richContent: {
      quickAnswer:
        "Tablets, essential medicines, and small medical devices belong in your cabin bag. Keep prescriptions handy for anything controlled, declare liquids over 100ml, and store everything in clearly labelled pouches.",
      overview: [
        "Medicines are mission-critical—delays or lost baggage can turn a routine trip into an emergency. Airlines therefore encourage passengers to carry meds onboard, even if they are allowed in checked baggage.",
        "Controlled substances (strong painkillers, sedatives) need supporting documents: doctor letter, prescription with passenger name, and ideally the original pharmacy label. Without them, customs officers or CISF may confiscate the medication.",
        "Temperature swings in cargo holds can ruin insulin, biologics, or inhaled meds. Use insulated pouches with gel packs (declared as medical exemptions) and inform crew if you need refrigeration support on long-haul flights.",
      ],
      checklists: [
        {
          title: "Medicine packing list",
          items: [
            "Original blister packs or labelled bottles for each drug.",
            "Doctor prescription stating generic name, dosage, and passenger name.",
            "Zip pouch segregating tablets vs liquids for quick inspection.",
          ],
        },
        {
          title: "At screening and onboard",
          items: [
            "Declare liquids over 100ml (syrups, cough mixtures) as medical exemptions.",
            "Keep meds accessible mid-flight, not buried in overhead luggage.",
            "Dispose of sharps or empty vials with cabin crew—never in seat pockets.",
          ],
        },
      ],
      table: {
        caption: "Common medicine scenarios",
        headers: ["Type", "Cabin handling", "Notes"],
        rows: [
          ["Routine tablets", "✅ Carry freely", "Keep prescription for combos"],
          ["Liquid cough syrup", "✅ With declaration", "May exceed 100ml"],
          ["Temperature-sensitive biologic", "✅ In cooler bag", "Inform airline ahead"],
        ],
      },
      dos: [
        "Carry two extra days of medication in case of delays.",
        "Use pill organisers with labelled compartments plus backup blister packs for proof.",
        "Translate prescriptions into English if travelling internationally.",
      ],
      donts: [
        "Don’t mix different pills in one unlabelled bottle; officers must identify them individually.",
        "Don’t check critical meds—even if the airline offers liability coverage, replacements may be unavailable abroad.",
        "Avoid self-medicating friends/family mid-flight unless you’re authorised; cabin crew must know before administering anything to another passenger.",
      ],
      faqs: [
        {
          question: "Can I carry over-the-counter painkillers without a prescription?",
          answer: "Yes for small personal quantities, but keep them in retail packaging to prove authenticity.",
        },
        {
          question: "Do I need to inform the airline in advance?",
          answer: "Only if you require refrigeration, sharps disposal, or if the medication must be administered onboard. Otherwise carrying meds is standard.",
        },
        {
          question: "What about international narcotics lists?",
          answer: "Check the destination’s controlled substance schedule. Some countries ban codeine or tramadol without prior clearance.",
        },
      ],
      tips: [
        "Set alarms on your phone for dosage reminders across time zones.",
        "Store digital copies of prescriptions in DigiLocker or a password manager.",
        "Pack hand sanitiser and tissues along with meds to maintain hygiene when dosing on the go.",
      ],
      internalLinks: [
        { label: "Insulin & syringes", slug: "insulin-syringes-flight" },
        { label: "CPAP and medical devices", slug: "cpap-medical-devices" },
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "MoHFW Travellers Health Advisory",
        url: "https://main.mohfw.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "insulin-syringes-flight",
    title: "Insulin, Injections, and Syringes",
    shortTitle: "Insulin & syringes",
    category: "flight",
    tags: ["insulin", "syringe", "diabetes"],
    verdict: {
      status: "allowed",
      summary: "Allowed in cabin with proof of medical need. Needles must remain capped until use.",
    },
    howToComply: [
      "Carry a doctor letter or prescription that names the passenger.",
      "Pack insulin pens in insulated sleeves with frozen gel packs (allowed even if over 100ml).",
      "Dispose used needles in sharps containers provided by cabin crew.",
    ],
    whyRuleExists: "Airlines must facilitate chronic care while preventing weaponisation of needles.",
    extraNotes: [
      "Declare syringes proactively to avoid secondary screening delays.",
    ],
    richContent: {
      quickAnswer:
        "Insulin, injections, and syringes are allowed in cabin when you carry a doctor letter or prescription with your name. Keep needles capped, store insulin in insulated pouches, and inform the airline if you need to refrigerate or plug in devices mid-flight.",
      overview: [
        "Airlines understand chronic care. They simply want proof that the syringes belong to you and that you know how to handle sharps safely. A one-page doctor letter or prescription usually settles the matter.",
        "Insulin and many biologics prefer temperatures between 2–8°C. Carry a compact cooler bag with gel packs (declared as medical exemptions). Crew may allow storage in the galley fridge on long-haul flights, but they aren’t obligated, so plan for self-reliance.",
        "Used needles must go into sharps containers—ask the crew for one. Never toss them into seat pockets or lavatory bins; doing so can injure cleaning staff and invites fines.",
      ],
      checklists: [
        {
          title: "Documents & packing",
          items: [
            "Doctor letter/prescription stating the condition and required medication.",
            "Insulated case with ice packs (frozen solid at security).",
            "Separate pouch for sterile syringes with original packing.",
          ],
        },
        {
          title: "During the journey",
          items: [
            "Declare the kit at security; officers may swab it, then return immediately.",
            "Dose discreetly and dispose of sharps using airline-provided containers.",
            "Carry extra needles and insulin in case of delays or temperature excursions.",
          ],
        },
      ],
      table: {
        caption: "Needle and medicine handling",
        headers: ["Item", "Cabin", "Notes"],
        rows: [
          ["Insulin pens", "✅ With document", "Store in insulated pouch"],
          ["Loose syringes", "✅", "Keep capped and in original sleeves"],
          ["Sharps disposal", "Crew-managed", "Ask for biohazard container"],
        ],
      },
      dos: [
        "Carry double the insulin units you need—one set near your seat, another backup in carry-on.",
        "Use travel-friendly pen needles; they take up less space and stay sterile.",
        "Note time zones to adjust dosing schedules accurately.",
      ],
      donts: [
        "Don’t leave uncapped needles on tray tables or seats.",
        "Don’t store insulin in the overhead bin during hot weather; keep it under the seat where airflow is better.",
        "Avoid packing sharps in checked baggage—temperature swings and loss risk are high.",
      ],
      faqs: [
        {
          question: "Can I carry glucagon auto-injectors?",
          answer: "Yes. Treat them like other emergency meds—keep packaging and prescription handy.",
        },
        {
          question: "Do gel packs need to be frozen?",
          answer: "Ideally yes. Security may swab them but typically allows them when clearly tied to medical use.",
        },
        {
          question: "What about insulin pumps?",
          answer: "Wear them through security but inform officers. Some pumps shouldn’t go through X-ray—request pat-down inspection instead.",
        },
      ],
      tips: [
        "Set medication alarms on your watch to stay on schedule across time zones.",
        "Carry sugar tablets or snacks for hypo treatment—declare them if semi-liquid.",
        "Store digital copies of prescriptions on your phone and backup drive.",
      ],
      internalLinks: [
        { label: "Medicines in cabin", slug: "medicines-in-flight" },
        { label: "CPAP and devices", slug: "cpap-medical-devices" },
        { label: "Baby food & medical liquid exemptions", slug: "baby-food-formula-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "DGCA Facilitation Circular",
        url: "https://www.dgca.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "asthma-inhaler-flight",
    title: "Asthma Inhalers",
    shortTitle: "Asthma inhaler",
    category: "flight",
    tags: ["asthma", "inhaler", "medicine"],
    verdict: {
      status: "allowed",
      summary: "Metered-dose inhalers are exempt from the 100ml limit but should be declared if metallic.",
    },
    howToComply: [
      "Keep inhalers in your pocket or seat pocket for quick access.",
      "Carry a spare canister if you have long layovers.",
      "Tell crew if you need to keep a spacer or nebulizer plugged into in-seat power.",
    ],
    whyRuleExists: "Respiratory attacks need immediate relief; restrictions could endanger passengers.",
    extraNotes: [
      "Nebulizer liquids count as medical exemption; bring a prescription.",
    ],
    richContent: {
      quickAnswer:
        "Asthma inhalers and spacers are allowed in cabin, exempt from the 100ml limit. Keep them accessible, carry a spare canister, and declare larger nebulizer liquids with a prescription.",
      overview: [
        "Respiratory attacks need immediate relief, so airlines treat inhalers as essential medical devices. Keep at least one inhaler on your person—seat pocket or jacket—not buried in an overhead bin.",
        "Metered-dose inhalers (MDIs) are pressurised; security may swab them but rarely confiscates. Nebulizers with liquid medicines need a doctor letter because they carry more than 100ml of solution.",
        "Cabin humidity is low and can trigger symptoms. Drink water regularly, avoid heavy perfumes, and notify crew if you anticipate needing a nebulizer plug point (available only on limited aircraft).",
      ],
      checklists: [
        {
          title: "Pre-trip prep",
          items: [
            "Check canister levels; replace if less than 30% remaining.",
            "Pack a spare inhaler and spacer in a labelled pouch.",
            "Carry prescription or asthma action plan if using steroid inhalers requiring documentation.",
          ],
        },
        {
          title: "In-flight routine",
          items: [
            "Keep inhaler within arm’s reach for take-off and landing.",
            "Inform cabin crew before using a nebulizer so they can assist with power needs.",
            "Hydrate frequently; dry air aggravates airways.",
          ],
        },
      ],
      table: {
        caption: "Respiratory gear guide",
        headers: ["Item", "Cabin status", "Notes"],
        rows: [
          ["Metered-dose inhaler", "✅", "Exempt from liquid limit"],
          ["Spacer/chamber", "✅", "Declare if metallic"],
          ["Nebulizer liquid", "✅ With prescription", "Allow extra screening"],
        ],
      },
      dos: [
        "Label inhalers with your name to avoid mix-ups on shared trips.",
        "Pack antihistamines if multiple triggers (dust, pet dander) affect you.",
        "Warm the inhaler with your hands if the cabin is extremely cold; propellant works better.",
      ],
      donts: [
        "Don’t pack inhalers in checked baggage—bags can be delayed.",
        "Don’t share inhalers with other passengers; dosage differs per person.",
        "Avoid exposing canisters to direct heat sources like galley ovens.",
      ],
      faqs: [
        {
          question: "Can I keep the inhaler in my pocket through the metal detector?",
          answer: "Yes, but remove it if the detector beeps. Many passengers hold it in their hand trays.",
        },
        {
          question: "Do dry-powder inhalers follow the same rules?",
          answer: "They’re even easier—no liquid propellant—yet still keep prescriptions handy.",
        },
        {
          question: "Will cabin crew help if I have an attack?",
          answer: "They provide first aid oxygen and can ask doctors onboard for assistance, but you must carry personal medication.",
        },
      ],
      tips: [
        "Use saline nasal spray (under 100ml) to keep airways moist.",
        "Choose seats away from galley fumes if strong smells trigger symptoms.",
        "Download airline special assistance forms if you need priority boarding to settle asthma gear.",
      ],
      internalLinks: [
        { label: "Medicines in cabin", slug: "medicines-in-flight" },
        { label: "Insulin & syringe guidance", slug: "insulin-syringes-flight" },
        { label: "CPAP and medical devices", slug: "cpap-medical-devices" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "MoCA Passenger with Special Needs FAQ",
        url: "https://www.civilaviation.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "cpap-medical-devices",
    title: "CPAP Machines and Medical Devices",
    shortTitle: "CPAP & devices",
    category: "flight",
    tags: ["cpap", "medical device", "special assistance"],
    verdict: {
      status: "allowed",
      summary: "Carried as free medical equipment. Batteries must meet lithium limits and devices need prior airline intimation for in-flight use.",
    },
    howToComply: [
      "Carry CPAP separately; it usually does not count toward cabin baggage allowance.",
      "If you intend to use it on board, inform the airline 48 hours before departure.",
      "Use FAA/ICAO approved portable oxygen concentrators only.",
    ],
    whyRuleExists: "Ensures continuous breathing support while maintaining electrical safety standards.",
    extraNotes: [
      "Bring extension cords/adapters only if airline approves; otherwise rely on battery power.",
    ],
    richContent: {
      quickAnswer:
        "CPAP machines, oxygen concentrators, and other assistive medical devices travel free as additional cabin equipment. Keep batteries within lithium limits, inform the airline 48 hours ahead if you plan to use them onboard, and carry supporting medical letters.",
      overview: [
        "Airlines differentiate between assistive devices and regular baggage—CPAPs don’t count toward cabin weight so long as they’re used for medical reasons. Still, they must clear security like any other electronic: remove from bags, place in trays, and be ready for swabs.",
        "In-flight use requires coordination. Airlines need to verify that your device is FAA/ICAO approved, that it fits seat power ratings, and that you have enough battery to last 150% of the flight time if no power outlet is provided.",
        "Batteries larger than 100Wh demand airline permission, so check the label. Carry copies of equipment manuals so staff can confirm compliance quickly.",
      ],
      checklists: [
        {
          title: "Before departure",
          items: [
            "Notify the airline 48 hours in advance through the special assistance desk.",
            "Obtain a doctor letter stating the need for the device.",
            "Check battery watt-hour rating and carry enough charged spares.",
          ],
        },
        {
          title: "At the airport and onboard",
          items: [
            "Place the CPAP or concentrator in a separate tray for screening.",
            "Keep hoses and masks in clean pouches to avoid contamination at security.",
            "If using onboard, wait until cruising altitude and inform the lead cabin crew.",
          ],
        },
      ],
      table: {
        caption: "Device readiness",
        headers: ["Device", "Documents", "Power plan"],
        rows: [
          ["CPAP", "Doctor letter + airline approval", "Battery backup 150% flight time"],
          ["Portable oxygen concentrator", "FAA approval proof", "Request seat with power if needed"],
          ["Nebulizer", "Prescription", "Carry spare batteries or use crew power when allowed"],
        ],
      },
      dos: [
        "Carry extension hoses and filters in sealed bags so they stay sterile.",
        "Label each battery with Wh rating for easy inspection.",
        "Download airline special assistance forms and keep them offline.",
      ],
      donts: [
        "Don’t rely on in-seat power without confirming the voltage/amperage—you could trip the circuit.",
        "Don’t place devices on the floor during take-off/landing unless strapped—they become projectiles.",
        "Avoid packing CPAP masks in checked baggage; replacements abroad are expensive.",
      ],
      faqs: [
        {
          question: "Do CPAP batteries count as power banks?",
          answer: "Yes, they follow the same lithium limits (up to 100Wh freely, 100–160Wh with approval). Keep them in cabin.",
        },
        {
          question: "Can cabin crew store the device during meal service?",
          answer: "They can help stow it temporarily, but you remain responsible for safe placement.",
        },
        {
          question: "What if my device uses distilled water?",
          answer: "Carry empty humidifier tanks through security and fill them with bottled water after boarding.",
        },
      ],
      tips: [
        "Pack a universal adapter if travelling internationally; ground hotels may have different sockets.",
        "Use a travel-sized CPAP bag with TSA-friendly flaps to keep hoses organised.",
        "Mark hoses with coloured tape so they don’t get mixed with other medical gear.",
      ],
      internalLinks: [
        { label: "Medicines in cabin", slug: "medicines-in-flight" },
        { label: "Wheelchair & mobility guide", slug: "wheelchairs-walking-sticks" },
        { label: "Power bank watt-hour limits", slug: "power-bank-in-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "Air India Special Assistance Guide",
        url: "https://www.airindia.com/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "wheelchairs-walking-sticks",
    title: "Wheelchairs and Walking Sticks",
    shortTitle: "Wheelchairs & sticks",
    category: "flight",
    tags: ["wheelchair", "mobility", "special assistance"],
    verdict: {
      status: "allowed",
      summary: "Manual aids allowed in cabin after security check. Battery wheelchairs need advance approval.",
    },
    howToComply: [
      "Arrive 90 minutes before domestic departure to complete wheelchair documentation.",
      "Dry-cell or gel batteries can stay attached if terminals are insulated.",
      "Lithium wheelchair batteries must be removable and carried in cabin.",
      "Walking sticks are screened and tagged so you can keep them at the gate.",
    ],
    whyRuleExists: "Passengers with reduced mobility rely on assistive aids; rules ensure safety without discrimination.",
    extraNotes: [
      "Airlines must provide an aisle chair free of charge for boarding and deplaning.",
    ],
    richContent: {
      quickAnswer:
        "Manual wheelchairs and walking sticks can accompany you up to the aircraft door after screening. Battery-powered chairs need advance approval, insulated terminals, and removable lithium packs brought into the cabin.",
      overview: [
        "Airlines prioritise accessible travel, but they need notice to arrange aisle chairs, ambulifts, or extra manpower. Booking assistance 48 hours ahead guarantees the right equipment is waiting at departure and arrival.",
        "Security screens every mobility aid. Walking sticks go through X-ray, then receive a special tag so you can keep them. Manual chairs are swabbed and returned immediately; battery chairs may require partial disassembly so crew can stow them upright in the hold.",
        "Lithium wheelchair batteries are regulated like power banks. Remove them, tape the terminals, and carry them onboard. Gel or dry-cell batteries can stay attached if terminals are insulated and the chair’s circuitry is secured.",
      ],
      checklists: [
        {
          title: "Before travel",
          items: [
            "Request wheelchair assistance or special seating via airline call centre.",
            "Print medical certificates if you need to use your own chair to the gate.",
            "Measure wheelchair dimensions to ensure they fit aircraft cargo doors.",
          ],
        },
        {
          title: "At the airport",
          items: [
            "Arrive 90 minutes early for domestic flights to finish documentation.",
            "Remove detachable accessories (cushions, bags) before handing the chair to staff.",
            "Explain brake systems or fold mechanisms so ground crew handle it correctly.",
          ],
        },
      ],
      table: {
        caption: "Battery handling for wheelchairs",
        headers: ["Battery type", "Procedure", "Notes"],
        rows: [
          ["Manual / none", "Check chair at gate", "Tag and return at arrival"],
          ["Dry cell / gel", "Can stay attached", "Insulate terminals"],
          ["Lithium", "Remove and carry in cabin", "Follow power bank limits"],
        ],
      },
      dos: [
        "Attach instruction cards describing how to fold or detach parts.",
        "Use brightly coloured straps to secure loose cables before handover.",
        "Carry spare parts (joystick knobs, fuses) in your cabin bag.",
      ],
      donts: [
        "Don’t hand over mobility aids without labelling them—multiple chairs can travel on one flight.",
        "Don’t leave medication or valuables in wheelchair pouches heading to the hold.",
        "Avoid using damaged chairs without notifying staff; they might worsen in transit.",
      ],
      faqs: [
        {
          question: "Can I use my own wheelchair inside the terminal?",
          answer: "Yes. You can ride it up to the gate and transfer to the aisle chair just before boarding.",
        },
        {
          question: "Do I need to pay for wheelchair assistance?",
          answer: "No—airlines must provide it free of charge under DGCA rules.",
        },
        {
          question: "What if my wheelchair is damaged?",
          answer: "Report it immediately before leaving the airport. Airlines are liable for repair or replacement under the passenger charter.",
        },
      ],
      tips: [
        "Use AirTag-style trackers on your chair in case it is loaded separately.",
        "Carry a lightweight travel cushion for use on airline-provided wheelchairs.",
        "Photograph the chair at check-in to document its condition.",
      ],
      internalLinks: [
        { label: "CPAP & medical devices", slug: "cpap-medical-devices" },
        { label: "Power bank rules", slug: "power-bank-in-flight" },
        { label: "Matches & lighter policy", slug: "matches-lighters" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "MoCA Rights of Persons with Disability Rules",
        url: "https://www.civilaviation.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "baby-food-formula-flight",
    title: "Baby Milk, Formula, and Food",
    shortTitle: "Baby food",
    category: "flight",
    tags: ["baby food", "formula", "infant"],
    verdict: {
      status: "allowed",
      summary: "Exempt from 100ml rule when traveling with an infant. Must be presented for screening separately.",
    },
    howToComply: [
      "Carry only the quantity needed for the journey and declare it at security.",
      "Use insulated flasks with flip lids; security may ask you to taste a small amount.",
      "Ready-to-feed packets are simpler than powder plus water at checkpoints.",
    ],
    whyRuleExists: "Babies need regular feeding; exemptions avoid depriving them while still allowing screening.",
    extraNotes: [
      "CISF allows breast pumps; pack them near the top for inspection.",
    ],
    richContent: {
      quickAnswer:
        "Baby milk, expressed breast milk, formula, and purees are exempt from the 100ml liquid rule when the infant or toddler travels with you. Declare them at security, keep only what you need for the journey, and use insulated containers to manage temperature.",
      overview: [
        "Officers understand that hungry babies can’t wait. They simply need to verify that the infant is flying with you and that the liquids are genuinely for feeding. Expect swab tests or tasting requests for suspicious-looking containers.",
        "Pack just enough for the travel day: flights, layovers, potential delays. Excess quantities raise eyebrows, especially if you can’t explain the need.",
        "Breast pumps and warmers are allowed in cabin. Keep them accessible for inspection, and carry extension cords only if the airline approves their use.",
      ],
      checklists: [
        {
          title: "What to carry",
          items: [
            "Insulated bottles with measured feeds (labelled in ml).",
            "Ready-to-feed formula cartons or dry powder with sterile water.",
            "Baby spoon, bib, wet wipes, and resealable bags for used items.",
          ],
        },
        {
          title: "At security",
          items: [
            "Declare liquids early; place them in a separate tray.",
            "Be prepared to taste a small sample if requested (parents usually do it themselves).",
            "Carry infant’s boarding pass or ticket printout to show the exemption applies.",
          ],
        },
      ],
      table: {
        caption: "Baby food approvals",
        headers: ["Item", "Cabin", "Notes"],
        rows: [
          ["Expressed breast milk", "✅", "Store in ice packs"],
          ["Powdered formula", "✅", "Keep sealed until mixing"],
          ["Fruit puree", "✅", "Use transparent containers"],
        ],
      },
      dos: [
        "Use clear bottles with measurement markings so officers can see contents.",
        "Bring a small thermos with hot water if your child prefers warm milk (declare it).",
        "Pack extra bibs and clothes in case of spills mid-flight.",
      ],
      donts: [
        "Don’t bring excessive quantities ‘just in case’; airlines worry about resale or undeclared goods.",
        "Don’t keep filled bottles at room temperature for too long—discard after 2 hours to avoid spoilage.",
        "Avoid glass jars without padding; turbulence can shatter them.",
      ],
      faqs: [
        {
          question: "Do I need the baby physically present at security?",
          answer: "Yes. The exemption applies only when the infant is boarding with you.",
        },
        {
          question: "Can I carry cow’s milk?",
          answer: "Yes in reasonable quantities for the infant. Keep it refrigerated in insulated flasks.",
        },
        {
          question: "What about toddler snacks like yogurt or pudding?",
          answer: "They count as gels but usually pass if clearly for the child. Keep packaging intact.",
        },
      ],
      tips: [
        "Attach a feeding schedule to your diaper bag; crew often help warm bottles when they understand timing.",
        "Use collapsible funnels to transfer powder without mess.",
        "Carry a travel-size dish soap and sponge to clean bottles during layovers.",
      ],
      internalLinks: [
        { label: "Kids ID checklist", slug: "kids-id-requirement" },
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
        { label: "Water bottle policy", slug: "water-bottle-airport" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "MoCA Infant Travel FAQ",
        url: "https://www.civilaviation.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "food-and-snacks-in-flight",
    title: "Homemade Food, Fruits, and Dry Snacks",
    shortTitle: "Homemade food",
    category: "flight",
    tags: ["food", "snacks", "homemade", "fruits"],
    verdict: {
      status: "limited",
      summary: "Dry vegetarian or non-vegetarian snacks allowed in cabin; oily curries and gravies must be checked.",
    },
    howToComply: [
      "Use spill-proof steel dabbas for parathas, idlis, or sandwiches.",
      "Curry, chutney, or sambar counts toward the 100ml liquid rule.",
      "Cut fruits (mango, apple) allowed in cabin if packed dry; whole jackfruit/durian banned due to odor.",
      "Declare any pickles or chutneys above 100ml and place them in checked baggage.",
    ],
    whyRuleExists: "Security needs to see food texture on X-ray and prevent leaks that damage baggage systems.",
    extraNotes: [
      "Dry coconut (copra) remains prohibited due to fire risk.",
    ],
    richContent: {
      quickAnswer:
        "Dry snacks, sandwiches, and cut fruits are fine in cabin as long as they aren’t greasy or liquid-heavy. Curries, chutneys, and gravies fall under the 100ml liquid rule and should go in checked baggage.",
      overview: [
        "Security isn’t judging your lunch; they just need to see texture on the X-ray. Dense metal boxes packed with oily gravies look like suspicious blobs, so officers will open them or ask you to check them in.",
        "Dry foods— rotis, parathas, idlis, cakes, baked goods—sail through if wrapped neatly. Avoid strong-smelling items (durian, jackfruit) that airports ban to keep the cabin bearable.",
        "For international flights, remember customs at the destination may have separate restrictions on meat, seeds, or dairy. India lets you leave with homemade food, but other countries may seize it on arrival.",
      ],
      checklists: [
        {
          title: "Cabin-friendly items",
          items: [
            "Dry sandwiches, stuffed parathas, khakhras, biscuits, nuts.",
            "Cut fruits without syrup—pack in airtight steel/food-grade boxes.",
            "Powdered spices under 100g (declare if asked).",
          ],
        },
        {
          title: "Items to check-in or avoid",
          items: [
            "Curries, chutneys, gravies exceeding 100ml per container.",
            "Pickles or achar in oil without leak-proof jars.",
            "Strong-odour fruits like durian; airports explicitly ban them.",
          ],
        },
      ],
      table: {
        caption: "Food acceptance guide",
        headers: ["Food type", "Cabin", "Notes"],
        rows: [
          ["Dry snacks", "✅", "Wrap in foil or steel boxes"],
          ["Liquid chutney", "❌", "Counts as liquid >100ml"],
          ["Pickles (sealed)", "⚠️", "Allowed in checked baggage"],
        ],
      },
      dos: [
        "Use stackable stainless or BPA-free containers with tight lids.",
        "Line boxes with parchment to absorb oil residue.",
        "Pack a small trash bag to collect used tissues and cutlery.",
      ],
      donts: [
        "Don’t pack foods with bones or skewers that can be considered sharp.",
        "Don’t carry soups or sambar unless frozen solid; they will be treated as liquids.",
        "Avoid packing loose powders without labels; customs may suspect narcotics.",
      ],
      faqs: [
        {
          question: "Can I carry non-veg items?",
          answer: "Yes, if they are dry (e.g., kebabs). Liquids or gravies face the 100ml limit.",
        },
        {
          question: "What about baby snacks like mashed banana?",
          answer: "Allowed if travelling with the child. Declare it as baby food.",
        },
        {
          question: "Do spices and powders have quantity limits?",
          answer: "Not for personal use, but carry receipts for large quantities and declare at customs if over 1kg.",
        },
      ],
      tips: [
        "Freeze parathas or idlis overnight—they stay fresh longer and don’t leak.",
        "Carry biodegradable cutlery to avoid begging crew for utensils.",
        "Label boxes with your seat number so you spot them quickly on trays.",
      ],
      internalLinks: [
        { label: "Water bottle policy", slug: "water-bottle-airport" },
        { label: "Tea & coffee powder rules", slug: "tea-coffee-powder" },
        { label: "Baby food exemption", slug: "baby-food-formula-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "IndiGo Baggage Policy",
        url: "https://www.goindigo.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "water-bottle-airport",
    title: "Carrying Water Bottles",
    shortTitle: "Water bottle",
    category: "flight",
    tags: ["water", "bottle", "hydration"],
    verdict: {
      status: "limited",
      summary: "Full bottles banned at security; empty bottles allowed and can be refilled post-screening.",
    },
    howToComply: [
      "Carry a stainless or BPA-free empty bottle through security.",
      "Use airport water stations or buy sealed bottles inside the sterile area.",
      "Medicinal water (e.g., for baby formula) can exceed 100ml but must be declared.",
    ],
    whyRuleExists: "Liquid explosive rules require inspection of all water containers before boarding.",
    extraNotes: [
      "Most Indian airports now have water fountains near gates; look for AAI signage.",
    ],
    richContent: {
      quickAnswer:
        "Bring an empty bottle through security, then refill it at airport fountains or kiosks. Full bottles over 100ml are confiscated, while medicinal/infant water is allowed if declared.",
      overview: [
        "The liquid rule covers ordinary water too. Security can’t test every full bottle without delaying the queue, so they simply ask you to empty it. Arrive with an empty flask and you’ll fly through.",
        "Airports now provide filtered water stations inside the sterile area. Some even announce chilled vs warm dispensers for baby formula. Carry a bottle with a wide mouth so you can fill it quickly without spillage.",
        "If you need water for medicine or baby formula during security, declare it. Officers may let you keep sealed medicinal water or taste-test it before clearing.",
      ],
      checklists: [
        {
          title: "Before screening",
          items: [
            "Empty the bottle completely—even small amounts trigger disposal.",
            "Detach any filters so officers can inspect them separately.",
            "Keep the lid off when placing it on the tray if asked.",
          ],
        },
        {
          title: "After security",
          items: [
            "Use refill stations or ask cafe staff for filtered water.",
            "Label the bottle with your name; many travellers carry similar flasks.",
            "Refill again before boarding—aircraft water service can be slow if turbulence hits.",
          ],
        },
      ],
      table: {
        caption: "Water scenarios",
        headers: ["Situation", "Allowed?", "Notes"],
        rows: [
          ["Empty bottle", "✅", "Place separately on tray"],
          ["Full bottle", "❌", "Empty or surrender"],
          ["Baby formula water", "✅ Declare", "Officers may test"],
        ],
      },
      dos: [
        "Carry stainless or BPA-free bottles with leak-proof lids.",
        "Use collapsible bottles if packing space is tight.",
        "Sanitise the mouthpiece before refilling to avoid airport germs.",
      ],
      donts: [
        "Don’t hide water inside opaque thermos flasks—officers will open them anyway.",
        "Don’t rely solely on airline service; delays happen.",
        "Avoid placing bottles near laptops in trays; they can roll off and crack screens.",
      ],
      faqs: [
        {
          question: "Are folding hydration bladders allowed?",
          answer: "Yes when empty. Open the cap so officers see no liquid is inside.",
        },
        {
          question: "Can I carry carbonated beverages bought before security?",
          answer: "No. Buy them inside the sterile area instead.",
        },
        {
          question: "Do airports supply hot water?",
          answer: "Many do. Otherwise, request hot water from cafes or the airline gate staff for baby formula or instant meals.",
        },
      ],
      tips: [
        "Stick a reminder on your door—‘Empty bottle’—so you don’t forget before leaving home.",
        "Carry a carabiner to hang the bottle on your backpack after refilling.",
        "If you use smart bottles with electronics, keep them in cabin—they contain batteries.",
      ],
      internalLinks: [
        { label: "Empty vs filled bottles", slug: "empty-bottles-vs-liquid" },
        { label: "Baby food exemption", slug: "baby-food-formula-flight" },
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "AAI Passenger Facilities Advisory",
        url: "https://www.aai.aero/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "tea-coffee-powder",
    title: "Tea and Coffee Powder",
    shortTitle: "Tea/coffee powder",
    category: "flight",
    tags: ["tea", "coffee", "powder", "customs"],
    verdict: {
      status: "allowed",
      summary: "Allowed in both cabin and checked baggage if sealed. Large commercial quantities are subject to customs.",
    },
    howToComply: [
      "Pack powders in original foil packs or vacuum bags.",
      "Declare quantities above 1kg at customs to avoid suspicion of contraband powders.",
      "Keep receipts handy if carrying specialty blends abroad.",
    ],
    whyRuleExists: "Powders obscure X-ray images; sealed packs help officers distinguish harmless goods from suspicious materials.",
    extraNotes: [
      "U.S. and Australian transits may limit powder volumes; check onward rules.",
    ],
    richContent: {
      quickAnswer:
        "Pack tea and coffee powder in sealed retail pouches or vacuum bags. Cabin carriage is fine for personal quantities, but declare anything above 1kg or if flying through countries with strict powder limits (USA, Australia).",
      overview: [
        "Powders look like amorphous blobs on X-ray. Sealed factory packaging or transparent zip bags with labels reassure officers that you’re carrying groceries, not contraband.",
        "Domestic Indian flights rarely object to small bags of filter coffee or chai blends. International trips, however, may require customs declarations, especially if you’re importing speciality beans for sale.",
        "Transit airports like the US enforce a 350g powder limit in cabin—larger quantities must be checked. Always check the strictest rule along your route.",
      ],
      checklists: [
        {
          title: "Packing tips",
          items: [
            "Leave powders in original, sealed packaging when possible.",
            "If repacking, use clear, heavy-duty zip bags and add printed labels.",
            "Carry receipts or invoices for premium blends to show value when re-entering India.",
          ],
        },
        {
          title: "Customs & transit",
          items: [
            "Declare quantities above 1kg to Indian customs on return.",
            "Check US/Australia powder rules if transiting—often 350g cabin limit.",
            "Avoid carrying loose powder in unlabelled jars; it will be swab-tested and may be seized.",
          ],
        },
      ],
      table: {
        caption: "Powder allowances",
        headers: ["Quantity", "Cabin", "Notes"],
        rows: [
          ["≤350g", "✅", "Usually accepted worldwide"],
          ["351g–1kg", "✅ Domestic", "Check transit rules"],
          [">1kg", "⚠️ Declare", "Customs may treat as commercial"],
        ],
      },
      dos: [
        "Vacuum-seal loose coffee to prevent aroma leakage.",
        "Use tamper-proof tape on homemade spice blends.",
        "Carry a list of ingredients in English for customs forms.",
      ],
      donts: [
        "Don’t mix powders with electronics—spillage causes inspection delays.",
        "Don’t carry unlabeled metal tins; they look suspicious on scanners.",
        "Avoid shipping large commercial quantities in personal luggage; use cargo services instead.",
      ],
      faqs: [
        {
          question: "Do instant coffee sachets count as powders?",
          answer: "Yes, but individually packed sachets rarely face scrutiny. Keep them boxed.",
        },
        {
          question: "Can I bring coffee beans?",
          answer: "Beans are easier to inspect and generally allowed. Declare them if travelling to countries with agricultural restrictions.",
        },
        {
          question: "What about tea leaves with dried fruits?",
          answer: "Some countries ban dried fruits or flowers. Check their biosecurity list before carrying.",
        },
      ],
      tips: [
        "Carry a small scoop or spoon separately to avoid sharp-tool flags.",
        "Use smell-proof bags if you don’t want the entire cabin to smell like chai.",
        "Gift packs with clear branding are easier to explain at customs.",
      ],
      internalLinks: [
        { label: "Food & snacks policy", slug: "food-and-snacks-in-flight" },
        { label: "Customs prohibited list", slug: "prohibited-items-customs" },
        { label: "Duty-free liquid sealing", slug: "duty-free-liquids-return" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "CBIC Export Passenger Guide",
        url: "https://www.cbic.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "chocolates-on-flight",
    title: "Carrying Chocolates on International Flights",
    shortTitle: "Chocolates",
    category: "flight",
    tags: ["chocolate", "duty free", "gifts"],
    verdict: {
      status: "allowed",
      summary: "Allowed in both cabin and checked baggage. Keep them below duty-free personal allowance when returning to India.",
    },
    howToComply: [
      "Carry chocolates in insulated pouches to avoid melting.",
      "Duty-free purchases must remain sealed and accompanied by the receipt.",
      "Declare bulk cartons (>5kg) to customs if you are importing them for sale.",
    ],
    whyRuleExists: "Food imports are regulated for commercial quantities but personal use is fine.",
    extraNotes: [
      "Transit airports with strict biosecurity (e.g., Australia) may seize items with nuts or dairy; check local laws.",
    ],
    richContent: {
      quickAnswer:
        "Chocolates travel happily in both cabin and checked baggage. Keep them under your personal duty-free allowance (2kg typically) when returning to India, and declare bulk cartons meant for gifting or sale.",
      overview: [
        "Cabin carriage is safest for delicate pralines—aircraft holds can melt chocolate during summer. Use insulated pouches or wrap them next to clothing layers. Duty-free purchases stay sealed in STEBs if you have onward flights.",
        "Customs only step in when you exceed personal allowances or bring commercial quantities. Keep receipts handy, especially for premium brands whose value might cross the ₹50,000 aggregate duty-free cap for general goods.",
        "Some countries restrict food products containing nuts, dairy, or fresh fruit fillings. Australia and New Zealand are notoriously strict. Declare everything if unsure to avoid fines.",
      ],
      checklists: [
        {
          title: "Packing for departure",
          items: [
            "Use insulated lunch bags to maintain shape.",
            "Separate dark, milk, and nut-based chocolates to respect allergy policies.",
            "Carry a small ice pack (gel) if you have long layovers—ensure it meets liquid exemptions.",
          ],
        },
        {
          title: "Returning to India",
          items: [
            "Stick to 2kg (approx.) or ₹50,000 value for personal use to stay within generous allowance.",
            "Declare anything above the allowance at the green/red channel to avoid confiscation.",
            "Keep duty-free receipts handy—customs officers often ask for purchase proof.",
          ],
        },
      ],
      table: {
        caption: "Chocolate checklist",
        headers: ["Quantity", "Action", "Notes"],
        rows: [
          ["Gift boxes ≤2kg", "Carry freely", "Personal use"],
          ["Bulk cartons", "Declare", "May attract duty"],
          ["Duty-free liquor + chocolate", "Keep receipts", "Both count towards ₹50k cap"],
        ],
      },
      dos: [
        "Use hard cases for delicate pralines to prevent crushing.",
        "Label nut-containing boxes if gifting to passengers with allergies.",
        "Store chocolates under the seat rather than overhead bins to avoid heat from lights.",
      ],
      donts: [
        "Don’t leave chocolates inside checked bags if you’re travelling via extremely hot destinations—they can melt and ruin clothes.",
        "Don’t gift wrap boxes before security; officers might unwrap to inspect contents.",
        "Avoid carrying chocolates with alcohol fillings to dry states in India without permits.",
      ],
      faqs: [
        {
          question: "Is there a limit on chocolates when leaving India?",
          answer: "No specific export limit for personal use. Restrictions only arise at the destination country.",
        },
        {
          question: "Do chocolates count toward weight allowance?",
          answer: "Yes, they’re part of your baggage weight. Distribute between cabin and checked bags to balance loads.",
        },
        {
          question: "Can I bring homemade sweets?",
          answer: "Dry sweets are usually fine, but items with high moisture may face customs scrutiny overseas. Pack them like other food items.",
        },
      ],
      tips: [
        "Freeze gel packs overnight and wrap them in cloth; they stay cold longer.",
        "Carry a resealable bag for partially eaten duty-free chocolate so it doesn’t attract ants in transit.",
        "Use bubble wrap for tins to prevent dents when stacking in luggage.",
      ],
      internalLinks: [
        { label: "Duty-free allowance", slug: "duty-free-alcohol-allowance" },
        { label: "Food & snacks policy", slug: "food-and-snacks-in-flight" },
        { label: "Tea & coffee powder limits", slug: "tea-coffee-powder" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "CBIC Duty Free Allowance",
        url: "https://www.cbic.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "razor-cartridge-vs-blade",
    title: "Razor Types in Cabin Baggage",
    shortTitle: "Razors in cabin",
    category: "flight",
    tags: ["razor", "blade", "shaving"],
    verdict: {
      status: "limited",
      summary: "Disposable cartridge razors allowed in cabin; safety razors with loose blades must be checked.",
    },
    howToComply: [
      "Pack cartridge and electric razors in a toiletry pouch for easy screening.",
      "Store spare blades in original packaging inside checked baggage.",
      "Straight razors are completely banned from cabin and must be declared if carried for professional use.",
    ],
    whyRuleExists: "Exposed blades can be weaponized; cartridges shield the sharp edges.",
    extraNotes: [
      "Electric trimmers count toward battery limits; keep them switched off with guards attached.",
    ],
    richContent: {
      quickAnswer:
        "Disposable cartridge razors and electric trimmers are cabin-safe. Safety razors with removable blades, straight razors, and spare blades must go in checked baggage because exposed edges are treated as weapons.",
      overview: [
        "Security officers focus on access to sharp edges. Cartridge heads encase the blade, so they’re considered low risk. Traditional DE safety razors expose the blade, making them prohibited in cabin regardless of intent.",
        "Electric trimmers carry lithium batteries; treat them like other electronics. Keep them switched off, guards on, and blades covered to avoid damaging your clothes.",
        "If you’re travelling with multiple blades (barbers, stylists), pack them in their retail cases, tape the packaging, and place them in checked baggage. Declare professional kits if carrying beyond personal use quantities.",
      ],
      checklists: [
        {
          title: "Cabin-approved items",
          items: [
            "Disposable cartridge razors with blades fixed in plastic heads.",
            "Electric shavers/trimmers with guards and battery limits met.",
            "Travel-size shaving gel (≤100ml) in liquids pouch.",
          ],
        },
        {
          title: "Must check-in",
          items: [
            "Loose safety razor blades or blade packs.",
            "Straight razors and barber razors with exposed edges.",
            "Shaving kits containing scissors beyond 6cm.",
          ],
        },
      ],
      table: {
        caption: "Razor decision matrix",
        headers: ["Type", "Cabin", "Checked"],
        rows: [
          ["Cartridge razor", "✅", "✅"],
          ["Safety razor (DE)", "❌", "✅"],
          ["Electric trimmer", "✅", "✅ (remove batteries if required)"],
        ],
      },
      dos: [
        "Carry extra cartridges in sealed blister packs to show they’re unused.",
        "Wrap electric trimmers in a cloth pouch to avoid accidental switching.",
        "Use transparent toiletry bags so officers identify shaving gear quickly.",
      ],
      donts: [
        "Don’t hide blades inside other toiletries; scanners pick them up.",
        "Don’t pack used razors with visible residue—clean them before travel.",
        "Avoid carrying barber shears in cabin; they exceed blade-length allowances.",
      ],
      faqs: [
        {
          question: "Are razor blade refills without handles allowed?",
          answer: "Yes, as long as they are cartridge refills with edges covered. Loose metal blades are not.",
        },
        {
          question: "What about eyebrow razors?",
          answer: "If they expose a blade longer than 6cm, check them in. Small plastic-guarded razors usually pass but depend on officer discretion.",
        },
        {
          question: "Can electric trimmers stay in checked baggage?",
          answer: "Yes, but remove lithium batteries or ensure they’re switched off to avoid vibration incidents.",
        },
      ],
      tips: [
        "Pack alum blocks or shaving sticks if you want to avoid liquids entirely.",
        "Use travel cases with built-in caps for cartridges; they protect both blades and fabrics.",
        "Keep a small note with airline URLs on prohibited items to show at security if questions arise.",
      ],
      internalLinks: [
        { label: "Sharp objects policy", slug: "sharp-objects-in-flight" },
        { label: "Aerosol shaving foam limits", slug: "aerosol-cans" },
        { label: "Smart luggage battery guide", slug: "smart-luggage" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "BCAS Prohibited Items List",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "sharp-objects-in-flight",
    title: "Scissors, Nail Cutters, and Hand Tools",
    shortTitle: "Scissors & tools",
    category: "flight",
    tags: ["scissors", "nail cutter", "hand tool"],
    verdict: {
      status: "not_allowed",
      summary: "Any blade over 6cm or pointed tool must go in checked baggage. Small nail cutters allowed at CISF discretion.",
    },
    howToComply: [
      "Pack scissors, multitools, screwdrivers, and pliers in checked bags with tips padded.",
      "Nail cutters without file extensions usually pass, but remove them if the screener objects.",
      "Declare kirpans that meet the 6-inch blade/9-inch total limit; only Indian nationals of Sikh faith are exempt.",
    ],
    whyRuleExists: "Sharp points pose a hijacking risk and can injure crew or passengers.",
    extraNotes: [
      "Carpentry tools like hammers, wrenches, and drill bits are automatically prohibited in cabin.",
    ],
    richContent: {
      quickAnswer:
        "Any blade or pointed tool over 6cm must be checked in. Small blunt nail cutters often pass, but scissors, screwdrivers, multitools, and needles with sharp tips belong in checked baggage to avoid confiscation.",
      overview: [
        "CISF follows BCAS’s prohibited list strictly. If an object can pierce, slice, or pry, it stays out of the cabin. Officers err on the side of caution, so even if another country allowed it, India may not.",
        "Pack tools methodically: sheath blades, wrap tips with foam, and label the pouch as ‘checked tools’. This keeps baggage handlers safe and prevents claims of improper packing if damage occurs.",
        "Kirpans have a narrow exemption: Indian nationals of Sikh faith may carry blades under 6 inches (blade) and 9 inches total, but only on domestic flights and with prior permission.",
      ],
      checklists: [
        {
          title: "Allowed in cabin",
          items: [
            "Nail cutters without long files.",
            "Small knitting needles/crochet hooks (subject to officer discretion).",
            "Plastic butter knives or cutlery provided by airlines.",
          ],
        },
        {
          title: "Must go in checked baggage",
          items: [
            "Scissors over 6cm blade length.",
            "Metal nail files, multitools, screwdrivers, chisels.",
            "Professional grooming tools (straight razors, cuticle cutters).",
          ],
        },
      ],
      table: {
        caption: "Sharp item matrix",
        headers: ["Item", "Cabin", "Notes"],
        rows: [
          ["Nail cutter", "⚠️ Depends", "Allowed if blunt"],
          ["Scissors", "❌", "Check if blades >6cm"],
          ["Multitool", "❌", "Must be checked"],
        ],
      },
      dos: [
        "Wrap blades with cardboard and tape before checking them in.",
        "Declare specialty tools (kirpan, ceremonial knives) at the counter.",
        "Carry photos/receipts to prove value for insurance claims.",
      ],
      donts: [
        "Don’t argue with security about borderline items—once confiscated, they rarely return.",
        "Don’t leave tools loose in checked baggage; they can puncture other items.",
        "Avoid carrying sharp souvenirs in hand luggage; pack them properly in checked bags.",
      ],
      faqs: [
        {
          question: "Are knitting needles allowed?",
          answer: "Generally yes if they are blunt, but security may still refuse. Bring plastic versions to improve odds.",
        },
        {
          question: "How do I measure blade length?",
          answer: "Measure the sharp edge only, from handle junction to tip.",
        },
        {
          question: "Can I carry souvenir knives from duty-free?",
          answer: "Yes, but they must be checked in. Duty-free usually holds them until boarding if you’re connecting.",
        },
      ],
      tips: [
        "Pack travel-safe grooming kits with rounded tips specifically designed for air travel.",
        "Use tool rolls or hard cases to organise hardware and prevent damage.",
        "Photograph the packed tools to prove condition if airlines mishandle them.",
      ],
      internalLinks: [
        { label: "Razor carriage rules", slug: "razor-cartridge-vs-blade" },
        { label: "Knife zero tolerance", slug: "knife-zero-tolerance" },
        { label: "Hand tools in baggage", slug: "hand-tools-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "BCAS Prohibited Items List",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "knife-zero-tolerance",
    title: "Knives and Bladed Weapons",
    shortTitle: "Knives",
    category: "flight",
    tags: ["knife", "weapon", "blade"],
    verdict: {
      status: "not_allowed",
      summary: "Knives of any size are banned from cabin baggage and must be checked with protective sheaths.",
    },
    howToComply: [
      "Pack knives inside hard cases with blade guards and place in checked suitcase.",
      "Declare ceremonial knives to airline staff; some airports require local police approval.",
      "Never gift wrap knives; security will unwrap packages for inspection.",
    ],
    whyRuleExists: "Zero-tolerance policy prevents edged weapons from entering the passenger cabin.",
    extraNotes: [
      "Duty-free shops do not sell knives to departing passengers at Indian airports due to policy.",
    ],
    richContent: {
      quickAnswer:
        "Knives of any size are banned from cabin baggage. Pack them in checked luggage with blade guards, declare ceremonial knives (kirpans) if eligible, and be ready for extra screening if the knife has high value or unusual design.",
      overview: [
        "BCAS maintains a zero-tolerance stance because blades can be weaponised. Even tiny pocket knives, souvenir daggers, or chef knives are confiscated when found in cabin bags.",
        "Packing them correctly protects both baggage handlers and your gear. Use rigid sheaths, wrap in bubble wrap, and place them in a hard-sided case. Airlines may deny liability if blades were poorly packed.",
        "Ceremonial exemptions exist only for Sikh kirpans within 6-inch blade and 9-inch total length, and only for Indian nationals on domestic routes. They must be declared at the airline counter for tagging.",
      ],
      checklists: [
        {
          title: "Packing knives safely",
          items: [
            "Use blade guards or cardboard sleeves taped securely.",
            "Place knives in the centre of your suitcase surrounded by clothes.",
            "Add a ‘sharp tools inside’ note for baggage teams.",
          ],
        },
        {
          title: "If carrying ceremonial blades",
          items: [
            "Carry ID proving eligibility (Indian passport/Aadhaar).",
            "Measure to confirm blade <6 inches and total length <9 inches.",
            "Declare at check-in; security will tag it for cabin carriage (kirpan only).",
          ],
        },
      ],
      table: {
        caption: "Knife handling summary",
        headers: ["Type", "Cabin", "Checked"],
        rows: [
          ["Kitchen knife", "❌", "✅ In sheath"],
          ["Pocket/Swiss knife", "❌", "✅"],
          ["Sikh kirpan (within limits)", "⚠️", "Allowed domestically with documentation"],
        ],
      },
      dos: [
        "Photograph rare knives before packing for insurance claims.",
        "Carry purchase invoices when bringing in expensive chef knives to prove value at customs.",
        "Use luggage with TSA-approved locks so security can inspect without cutting your case.",
      ],
      donts: [
        "Don’t wrap knives in gift paper; security will open presents.",
        "Don’t check knives loosely—punctured suitcases void compensation.",
        "Don’t assume foreign airports’ rules match India’s; follow the strictest standard.",
      ],
      faqs: [
        {
          question: "Can I carry butter knives?",
          answer: "Plastic or rounded butter knives sometimes pass, but metal ones with any edge must be checked.",
        },
        {
          question: "What about knives bought at duty-free abroad?",
          answer: "Ask the store to seal them and deliver at the gate, then pack them in checked baggage for the next leg.",
        },
        {
          question: "Do multi-tools count as knives?",
          answer: "Yes, if they have blades. Check them in alongside other tools.",
        },
      ],
      tips: [
        "Use PVC pipes with end caps to store long knives securely inside suitcases.",
        "Mark the outside of the knife roll with your contact info in case bags are screened away from you.",
        "If you collect knives, create a simple inventory spreadsheet to share with customs if requested.",
      ],
      internalLinks: [
        { label: "Sharp object policy", slug: "sharp-objects-in-flight" },
        { label: "Hand tools checklist", slug: "hand-tools-flight" },
        { label: "Gift wrapping guidelines", slug: "gift-items-wrapping" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "BCAS AVSEC Order",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "hand-tools-flight",
    title: "Hand Tools: Hammers, Screwdrivers, Spanners",
    shortTitle: "Hand tools",
    category: "flight",
    tags: ["tools", "hammer", "screwdriver"],
    verdict: {
      status: "not_allowed",
      summary: "Hand tools must be checked. Cabin carriage is banned due to hijack risk.",
    },
    howToComply: [
      "Bundle tools together with zip ties and place them in the centre of your checked suitcase.",
      "Remove rechargeable batteries from cordless drills and keep them in cabin.",
      "Provide invoices if carrying new toolkits to avoid customs confusion.",
    ],
    whyRuleExists: "Tools can be used as blunt weapons or to tamper with aircraft fixtures.",
    extraNotes: [
      "Small precision screwdriver sets are also disallowed in cabin despite size.",
    ],
    richContent: {
      quickAnswer:
        "Hand tools—hammers, screwdrivers, spanners, drill bits—must go in checked baggage. Bundle them securely, remove lithium batteries from power tools, and declare unusual items to avoid baggage recalls.",
      overview: [
        "Tools double as improvised weapons or can damage aircraft fittings, so BCAS bans them from cabins outright. Even tiny screwdrivers or pliers are confiscated when found during screening.",
        "Checked baggage is acceptable if you immobilise the tools. Use tool rolls, zip ties, or cases so heavy metal objects don’t puncture suitcases or injure baggage handlers.",
        "Cordless drills and other power tools have separate battery rules: remove the battery pack, tape the terminals, and carry it in cabin if it’s lithium-based. The tool body can go in the hold.",
      ],
      checklists: [
        {
          title: "Preparing tools",
          items: [
            "Clean grease/oil residue to avoid hazmat flags.",
            "Tie bundles with zip ties or Velcro straps.",
            "Place sharp ends inside PVC tubes or foam sleeves.",
          ],
        },
        {
          title: "Battery handling",
          items: [
            "Remove lithium packs from cordless tools and carry them in cabin.",
            "Label each battery with watt-hour rating.",
            "Keep chargers separate from sharp bits to prevent damage.",
          ],
        },
      ],
      table: {
        caption: "Tool transport overview",
        headers: ["Tool", "Cabin", "Checked"],
        rows: [
          ["Screwdriver set", "❌", "✅"],
          ["Cordless drill body", "❌", "✅ (remove battery)"],
          ["Allen keys", "❌", "✅"],
        ],
      },
      dos: [
        "Pack invoices for new tools; customs may ask about value.",
        "Use hard cases or toolboxes with locks for heavy kits.",
        "Inform the airline if your checked tool case exceeds standard size/weight.",
      ],
      donts: [
        "Don’t hide tools in cabin bags hoping they’ll go unnoticed—X-ray scanners spot them instantly.",
        "Don’t leave blades exposed inside suitcases; they can slice baggage inspectors.",
        "Avoid checking magnetic tools near laptops—they erase data if they shift around.",
      ],
      faqs: [
        {
          question: "Can I carry a small toolkit for fixing spectacles?",
          answer: "No. Even tiny screwdrivers must be checked. Carry a mini toolkit in your checked bag instead.",
        },
        {
          question: "Are plastic tools allowed?",
          answer: "If the tool is sturdy and can still be used as a weapon, officers may refuse. Treat all tools as checked baggage items.",
        },
        {
          question: "How do I pack drill bits safely?",
          answer: "Use original cases or insert them into cork blocks, then wrap with tape.",
        },
      ],
      tips: [
        "Use brightly coloured bags for tools so you can direct baggage inspectors quickly.",
        "If carrying professional equipment frequently, invest in ATA-rated tool cases.",
        "Add silica gel packs to prevent rust during humid layovers.",
      ],
      internalLinks: [
        { label: "Sharp object rules", slug: "sharp-objects-in-flight" },
        { label: "Knife zero tolerance", slug: "knife-zero-tolerance" },
        { label: "Power bank limits", slug: "power-bank-in-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "CISF Prohibited Articles Poster",
        url: "https://www.cisf.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "aerosol-cans",
    title: "Aerosol Cans and Sprays",
    shortTitle: "Aerosol cans",
    category: "flight",
    tags: ["aerosol", "spray", "flammable"],
    verdict: {
      status: "limited",
      summary: "Toiletry aerosols allowed up to 500ml per can and 2L total per passenger. Non-toiletry aerosols banned.",
    },
    howToComply: [
      "Check labels - only personal care aerosols (deodorant, hairspray, shaving foam) qualify.",
      "Ensure caps are fitted to prevent accidental discharge.",
      "Insecticides, paint sprays, or industrial aerosols are prohibited entirely.",
    ],
    whyRuleExists: "Pressurised containers may explode or leak flammable propellants.",
    extraNotes: [
      "Cans larger than 500ml must be surrendered even if partially used.",
    ],
    richContent: {
      quickAnswer:
        "Toiletry aerosols (deodorant, hairspray, shaving foam) are allowed up to 500ml per can and 2L total per passenger. Non-toiletry sprays (paint, insecticide) are banned entirely. Keep caps on and stash them upright.",
      overview: [
        "Aerosols hold pressurised propellants—shake them, heat them, or puncture them and they can burst. That’s why airlines limit quantity and insist on protective caps so no accidental discharge occurs mid-flight.",
        "Toiletry aerosols belong in the 1L liquids pouch if carried in cabin. Larger cans should be checked, still within the 500ml limit. Industrial sprays, cleaning agents, and bug bombs are prohibited regardless of volume.",
        "If you’re transporting aerosols commercially, ship them as dangerous goods cargo. Passenger flights only tolerate limited personal-use amounts.",
      ],
      checklists: [
        {
          title: "Cabin packing",
          items: [
            "Limit to travel-size cans (≤100ml) to fit the LAG rule.",
            "Ensure each nozzle has a tight cap or locking switch.",
            "Place cans upright in the liquids pouch to show officers the label.",
          ],
        },
        {
          title: "Checked baggage",
          items: [
            "Keep total quantity under 2L (e.g., four 500ml cans).",
            "Wrap cans in clothes to cushion them and absorb minor leaks.",
            "Separate aerosols from electronics and heat-sensitive items.",
          ],
        },
      ],
      table: {
        caption: "Aerosol allowance snapshot",
        headers: ["Aerosol type", "Cabin", "Checked"],
        rows: [
          ["Deodorant 150ml", "✅", "✅"],
          ["Hairspray 400ml", "⚠️", "✅ Up to 500ml"],
          ["Insecticide", "❌", "❌"],
        ],
      },
      dos: [
        "Label cans clearly; faded labels confuse inspectors.",
        "Travel with pump sprays (non-aerosol) when possible—they’re easier to clear.",
        "Release a quick test spray before packing to ensure valves aren’t clogged.",
      ],
      donts: [
        "Don’t remove caps to save space; nozzles can depress mid-flight.",
        "Don’t carry more than 2L combined—airlines can confiscate the excess.",
        "Avoid using aerosols onboard; pressurised cabins recycle air and strong scents disturb passengers.",
      ],
      faqs: [
        {
          question: "Are aerosol sunscreens allowed?",
          answer: "Yes, if labelled as personal care and within size limits.",
        },
        {
          question: "Do CO2 cartridges count as aerosols?",
          answer: "They’re pressured cartridges and usually banned unless part of safety equipment (life vests) with prior approval.",
        },
        {
          question: "What about compressed whipped cream?",
          answer: "Treated like non-toiletry aerosol—generally not allowed in cabin and risky in checked baggage. Check with airline.",
        },
      ],
      tips: [
        "Shift to solid deodorant sticks for short trips to save your aerosol quota.",
        "Place aerosols in mesh pockets so officers can visually inspect labels without unpacking everything.",
        "Carry a small plastic bag solely for aerosol caps—spares vanish easily.",
      ],
      internalLinks: [
        { label: "Perfume & deodorant rules", slug: "perfume-in-flight" },
        { label: "Shampoo and lotions", slug: "shampoo-and-lotions" },
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "IATA Table 2.3.A",
        url: "https://www.iata.org/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "matches-lighters",
    title: "Matches and Lighters",
    shortTitle: "Matches/lighter",
    category: "flight",
    tags: ["matchbox", "lighter", "fire"],
    verdict: {
      status: "limited",
      summary: "One small box of safety matches or one refillable lighter allowed on person only.",
    },
    howToComply: [
      "Keep the lighter in your pocket; do not place it in cabin bags or trays.",
      "Torch lighters, blue flame lighters, and lighter fuel are banned.",
      "Do not gift wrap matchboxes; CISF needs to see them clearly.",
    ],
    whyRuleExists: "Fire sources must remain under passenger control to prevent accidental ignition inside bags.",
    extraNotes: [
      "Many foreign airports confiscate even standard lighters; plan for transit restrictions.",
    ],
    richContent: {
      quickAnswer:
        "One small box of safety matches or one standard lighter is allowed on your person—not in cabin bags. Torch lighters, refills, fuel canisters, and multiple lighters are banned. Never place matches or lighters in checked baggage.",
      overview: [
        "Fire sources need constant supervision. Keeping the lighter in your pocket ensures you notice if it leaks or heats up. Hidden in bags, they can ignite unnoticed.",
        "Torch/jet lighters create intense flames and are prohibited worldwide. Spare lighter fuel is classified as dangerous goods and must travel via cargo, not in passenger baggage.",
        "International transits may confiscate even standard lighters, so carry a cheap disposable one you can surrender without fuss.",
      ],
      checklists: [
        {
          title: "Allowed",
          items: [
            "One pocket-sized safety lighter (BIC type) without fuel refill.",
            "One small box of safety matches carried on person.",
            "Battery-powered arc lighters only if airline explicitly allows (rare—treat as electronics).",
          ],
        },
        {
          title: "Not allowed",
          items: [
            "Torch/jet/blue-flame lighters.",
            "Lighter fuel, butane canisters, refills.",
            "Multiple matchboxes or souvenir zippo collections in hand luggage.",
          ],
        },
      ],
      table: {
        caption: "Matches & lighter policy",
        headers: ["Item", "Cabin bag", "On person"],
        rows: [
          ["Safety matches", "❌", "✅ (one box)"],
          ["Standard lighter", "❌", "✅ (one)"],
          ["Torch lighter", "❌", "❌"],
        ],
      },
      dos: [
        "Place the lighter in your jacket pocket after security so it’s easy to declare.",
        "Empty pockets before screening to show officers the lighter proactively.",
        "Buy lighters at your destination if transiting through stricter airports.",
      ],
      donts: [
        "Don’t store lighters in cabin baggage—they will be confiscated.",
        "Don’t carry more than one; multiple lighters look suspicious.",
        "Avoid gifting lighters to other passengers—they may decline and alert security.",
      ],
      faqs: [
        {
          question: "Can I carry Zippo fluid?",
          answer: "No. Liquid fuel is flammable cargo and banned from passenger baggage.",
        },
        {
          question: "Are electronic plasma lighters allowed?",
          answer: "Treat them like small electronics with lithium batteries. Some airlines ban them outright, so check ahead.",
        },
        {
          question: "Do matches count for religious rites?",
          answer: "Carry only one safety matchbox. Anything larger must be checked (though matches in checked bags are technically banned too).",
        },
      ],
      tips: [
        "Switch to flameless USB lighters when possible—they’re easier to explain as electronics (if allowed).",
        "If you don’t need a lighter immediately after landing, buy one at destination shops to avoid hassle.",
        "Store matches in a small waterproof case to prevent accidental ignition.",
      ],
      internalLinks: [
        { label: "Aerosol rules", slug: "aerosol-cans" },
        { label: "Power bank policy", slug: "power-bank-in-flight" },
        { label: "Gift wrapping guidance", slug: "gift-items-wrapping" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "BCAS Permitted Items Card",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "domestic-id-requirements",
    title: "ID Required for Domestic Flights in India",
    shortTitle: "Domestic ID",
    category: "documents",
    tags: ["id", "domestic", "boarding"],
    verdict: {
      status: "allowed",
      summary: "Carry one government-issued photo ID. Digital IDs in DigiLocker or mAadhaar are accepted.",
    },
    howToComply: [
      "Accepted IDs: Aadhaar, Passport, PAN, Driving Licence, Voter ID, Service ID, Student ID (for minors).",
      "Keep original physical card or DigiLocker verified copy ready at entry gate.",
      "International passengers need passports even on domestic legs under the same PNR.",
    ],
    whyRuleExists: "CISF verifies identity before entering the terminal to maintain secure areas.",
    extraNotes: [
      "Name on ticket must match ID exactly, including middle names.",
    ],
    richContent: {
      quickAnswer: "Carry one original, government-issued photo ID for every passenger entering an Indian airport. CISF accepts Passport, Aadhaar, PAN, Driving Licence, Voter ID, Service IDs, and for students, a school or college card with a photo.",
      overview: [
        "Think of the terminal entrance as immigration-lite. Officers check identity before you ever reach the airline counter so only ticketed passengers enter. A crisp, legible ID speeds you through in under a minute.",
        "Digital IDs inside DigiLocker and mAadhaar are valid because they are authenticated copies pulled directly from government servers. Random gallery screenshots or printouts downloaded years ago raise eyebrows.",
        "Carry the ID that matches the name on your ticket. If you booked using your passport name, show the passport. If you booked as per Aadhaar, show Aadhaar. Mismatched documents cause a loop of questions you don’t want a few hours before departure.",
      ],
      checklists: [
        {
          title: "Accepted IDs (Adults)",
          items: [
            "Passport (Indian or foreign) with valid visa if required.",
            "Aadhaar card, PVC, or DigiLocker version.",
            "PAN, Driving Licence, Voter ID, Service ID (PSU, Defence).",
          ],
        },
        {
          title: "Special cases",
          items: [
            "Students: school/college ID for domestic flights.",
            "Senior citizens: same list as adults; carry medical cards if you need priority assistance.",
            "Foreign tourists: passport + visa / e-visa printout.",
          ],
        },
      ],
      table: {
        caption: "When CISF asks more questions",
        headers: ["Situation", "What to show", "Tip"],
        rows: [
          ["Ticket name differs slightly", "ID + name-correction email", "Arrive early so supervisor can note it"],
          ["Group ticket without printed copy", "One phone displaying all PNRs", "Zoom into each passenger’s name"],
          ["Digital ID only", "DigiLocker live document", "Keep phone battery above 30%"],
        ],
      },
      dos: [
        "Keep IDs in an easy-access pouch before you join the queue.",
        "Match middle names/initials during booking to reduce questions.",
        "Carry a backup ID in case the primary one is damaged.",
      ],
      donts: [
        "Don’t hand over a photo of an ID stored in WhatsApp—officers reject it.",
        "Avoid using extremely worn-out cards; laminate or replace them in advance.",
        "Never send your only ID in checked baggage; you need it during arrival checks too.",
      ],
      faqs: [
        { question: "Can I use an e-ticket screenshot?", answer: "Yes, as long as the PNR and passenger name are clear. Pair it with your ID. CISF simply needs to see that your name is on a valid booking." },
        { question: "What if I legally changed my name?", answer: "Carry the gazette notification or marriage certificate plus both the old and new IDs. Security will note it and let you through." },
        { question: "Is a photocopy acceptable?", answer: "No. Carry the original card or DigiLocker-issued version." },
      ],
      tips: [
        "Store PDFs of all IDs in an encrypted folder as backup.",
        "Charge your phone fully if you rely on digital IDs; carry a power bank (cabin only).",
        "Label kids’ IDs with their blood group or emergency contacts—it’s helpful beyond the airport too.",
      ],
      internalLinks: [
        { label: "Aadhaar digital acceptance guide", slug: "aadhaar-digital-id" },
        { label: "Printed ticket requirements", slug: "printed-ticket-needed" },
        { label: "Kids ID checklist", slug: "kids-id-requirement" },
      ],
      verifiedOn: "2025-12-05",
    },
    sources: [
      {
        label: "Bureau of Civil Aviation Security - Valid ID List",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "aadhaar-digital-id",
    title: "Using Aadhaar Photos or Digital Copies",
    shortTitle: "Aadhaar photo",
    category: "documents",
    tags: ["aadhaar", "digital id", "digilocker"],
    verdict: {
      status: "limited",
      summary: "Printed Aadhaar photocopies accepted if QR code is legible. Photos on phone accepted only via mAadhaar/DigiLocker, not gallery images.",
    },
    howToComply: [
      "Download mAadhaar or DigiLocker and show the in-app verified ID.",
      "Avoid screenshots; security scans the QR code to verify authenticity.",
      "Carry a physical backup in case of phone battery issues.",
    ],
    whyRuleExists: "Prevents forged IDs while supporting paperless travel initiatives.",
    extraNotes: [
      "Airlines may still ask for a physical ID at boarding if scanners malfunction.",
    ],
    richContent: {
      quickAnswer: "DigiLocker and mAadhaar are accepted at Indian airports as long as you show the live, in-app document with the QR code. Plain screenshots from your gallery are not enough because security can’t verify them.",
      overview: [
        "Digital IDs are a lifesaver when wallets go missing, but they only work if the security officer can confirm it’s a government-issued copy. That means opening the DigiLocker or UIDAI app, refreshing the document, and letting the officer scan the QR code or check the watermark animation.",
        "Treat digital IDs as plan A only when your phone is charged and you have data/Wi-Fi. Otherwise, keep a physical card ready. Remember, the DigiLocker document is legally the same as a printed one, yet the verification takes a few seconds longer, so be patient.",
        "Set up your DigiLocker account days before travel. Many passengers try to sign up in the queue, forget their OTP, and delay everyone. Once it’s linked to your Aadhaar or driving licence, the document stays cached offline.",
      ],
      checklists: [
        {
          title: "Before reaching the airport",
          items: [
            "Install DigiLocker or mAadhaar from official app stores only.",
            "Link your Aadhaar and set a strong PIN.",
            "Download the ID (tap ‘Save to device’) so it works even without data.",
          ],
        },
        {
          title: "At security",
          items: [
            "Open the app, go to ‘Issued Documents’, and show the live QR code.",
            "Increase screen brightness so the QR scanner reads it quickly.",
            "Keep a backup physical ID handy in case the scanner is offline.",
          ],
        },
      ],
      table: {
        caption: "Digital ID acceptance matrix",
        headers: ["Document", "Accepted digitally?", "Notes"],
        rows: [
          ["Aadhaar via DigiLocker/mAadhaar", "✅ Yes", "Must show animated hologram or QR"],
          ["Driving Licence (DigiLocker)", "✅ Yes", "Same as Aadhaar; RTO-signed copy"],
          ["PAN card screenshot", "❌ No", "Upload to DigiLocker if needed"],
        ],
      },
      dos: [
        "Set a memorable PIN/passcode so you don’t fumble in line.",
        "Clear smudges on your screen; scanners struggle with cracks/glare.",
        "Update to the latest app version for better offline caching.",
      ],
      donts: [
        "Don’t rely on WhatsApp forwards of IDs—they count as photocopies.",
        "Avoid giving your DigiLocker PIN to others; instead share the document via the app’s sharing feature.",
        "Do not log out right before the trip; you may forget the password under pressure.",
      ],
      faqs: [
        { question: "Is a PDF downloaded months ago acceptable?", answer: "Only if it is the original DigiLocker PDF with the digital signature. Plain PDFs or photos lose authenticity. Always download fresh copies before travel." },
        { question: "What if security officers haven’t seen the app before?", answer: "Politely tell them it’s an issued DigiLocker document; most airports have QR readers now. If a lane is busy, they may direct you to a supervisor desk for scanning." },
        { question: "Can I use DigiLocker ID for boarding too?", answer: "Yes, airlines accept it during domestic boarding. For international flights, still carry the passport." },
      ],
      tips: [
        "Store your DigiLocker PIN in a password manager or jot it down in a locked note.",
        "Keep a slim physical ID holder clipped inside your cabin bag as plan B.",
        "Use phone widgets or quick shortcuts to open the app faster when CISF waves you forward.",
      ],
      internalLinks: [
        { label: "Domestic ID list", slug: "domestic-id-requirements" },
        { label: "Digital boarding pass", slug: "digital-boarding-pass" },
        { label: "Printed ticket checklist", slug: "printed-ticket-needed" },
      ],
      verifiedOn: "2025-12-05",
    },
    sources: [
      {
        label: "UIDAI Travel Advisory",
        url: "https://uidai.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "digital-boarding-pass",
    title: "Digital Boarding Pass Acceptance",
    shortTitle: "Digital boarding pass",
    category: "documents",
    tags: ["boarding pass", "digital", "mobile"],
    verdict: {
      status: "allowed",
      summary: "QR boarding passes on airline apps or email are accepted at entry, security, and boarding.",
    },
    howToComply: [
      "Ensure your phone screen brightness is high for scanners.",
      "Download the pass offline or screenshot it before arriving at the terminal.",
      "Carry a printed copy if your phone battery drains quickly.",
    ],
    whyRuleExists: "Digital passes speed up flow and reduce counter queuing.",
    extraNotes: [
      "Some smaller airports still stamp paper tags; staff will print one if needed.",
    ],
    richContent: {
      quickAnswer: "Yes, Indian airports accept mobile boarding passes shown on airline apps, emails, or wallets. Ensure the QR/barcode is bright, uncracked, and available offline before you join the queue.",
      overview: [
        "Digital passes save time at check-in, but they need a little prep. Download the PDF or add it to Apple/Google Wallet so scanners work even when airport Wi-Fi is patchy. If you rely on the airline app alone, log in before you leave home.",
        "At CISF entry you must show both your ID and the digital pass. Some airports still stamp paper bag tags, so a staff member may print them for you even if you stay paperless otherwise.",
        "Battery anxiety is real—keep at least 30% charge when you reach the gate. Screenshots are fine as backup, but the original QR should stay handy in case the agent needs to refresh seat details.",
      ],
      checklists: [
        {
          title: "Before reaching the airport",
          items: [
            "Download the boarding pass PDF or wallet file.",
            "Take a screenshot as a backup.",
            "Note the PNR and seat number separately in case scanners fail.",
          ],
        },
        {
          title: "At checkpoints",
          items: [
            "Increase brightness and remove screen protectors with scratches.",
            "Turn off dark mode; black backgrounds confuse some scanners.",
            "Keep your phone unlocked until you are past the boarding gate.",
          ],
        },
      ],
      table: {
        caption: "When paper is still needed",
        headers: ["Stage", "Digital pass", "Paper backup"],
        rows: [
          ["CISF entry", "✅ Accepted", "Carry ID alongside"],
          ["Security tray tag", "⚠️ Depends", "Some airports print a small slip"],
          ["Boarding gate", "✅ Accepted", "Gate staff can reprint if screen cracks"],
        ],
      },
      dos: [
        "Use airplane mode with Wi-Fi on; this stops random notifications from hiding the QR.",
        "Carry a slim power bank (cabin only) to avoid battery drops.",
        "Rename the screenshot with flight number for quick search.",
      ],
      donts: [
        "Don’t crop the QR too much; scanners need the border region.",
        "Avoid storing the pass only in email—download it in case internet fails.",
        "Never forward the QR to strangers; it can be misused to access your booking.",
      ],
      faqs: [
        { question: "Is a WhatsApp forward enough?", answer: "If the QR stays clear, yes—but prefer official sources. The safest option is the airline app or emailed PDF." },
        { question: "What if my phone dies mid-journey?", answer: "Request a reprint at the airline counter or ask if they can send it to the gate. Carry ID so they can confirm identity before reissuing." },
        { question: "Do I still need to tag cabin baggage?", answer: "Many airports ditched paper bag tags, but if your airport still stamps them, staff will hand you a blank tag even when you go paperless." },
      ],
      tips: [
        "Add the pass to your smartwatch if supported—great backup during boarding.",
        "Use file widgets so the pass sits on your home screen for quick access.",
        "If travelling in a group, store everyone’s passes in a shared album so any adult can present them.",
      ],
      internalLinks: [
        { label: "Printed ticket rules", slug: "printed-ticket-needed" },
        { label: "Domestic ID checklist", slug: "domestic-id-requirements" },
        { label: "DigiLocker ID tips", slug: "aadhaar-digital-id" },
      ],
      verifiedOn: "2025-12-05",
    },
    sources: [
      {
        label: "DigiYatra Programme",
        url: "https://www.digiyatra.ind.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "printed-ticket-needed",
    title: "Do You Need a Printed Ticket?",
    shortTitle: "Printed ticket?",
    category: "documents",
    tags: ["ticket", "print", "boarding"],
    verdict: {
      status: "allowed",
      summary: "Printed itineraries no longer mandatory. SMS or email confirmation plus ID is enough.",
    },
    howToComply: [
      "Show the booking SMS/email at the CISF entry gate.",
      "If your phone dies, airline counters can print a copy for a small fee.",
      "Carry paper tickets when traveling with elderly passengers who prefer them.",
    ],
    whyRuleExists: "Digital records are cross-checked with airline systems; paper is optional but handy in emergencies.",
    extraNotes: [
      "Foreign airports may still stamp paper boarding passes, so keep one for return travel.",
    ],
    richContent: {
      quickAnswer: "Printed itineraries are optional at Indian airports. Showing the SMS, email, or app confirmation with your name + PNR is enough for CISF entry. Still, keep one paper copy if you’re travelling with elders or through airports that stamp bag tags.",
      overview: [
        "Most travellers breeze through with just a phone these days. CISF officers only need to see your name, flight number, and PNR to match the airline’s manifest. An email or SMS works if it’s readable.",
        "However, printers matter when your phone battery is unreliable, when multiple passengers share the same device, or when a visa officer abroad insists on seeing onward proof. Printing a single-page itinerary at home saves you ₹50-₹200 that airlines charge for emergency printouts.",
        "A hybrid approach works best: keep everything digital but stash one folded copy in your passport sleeve as insurance.",
      ],
      checklists: [
        {
          title: "Digital-ready",
          items: [
            "Star the airline email or add it to a travel folder.",
            "Rename the SMS screenshot with the flight number for quick search.",
            "Share the ticket PDF with fellow travellers via WhatsApp/Drive so each person has access.",
          ],
        },
        {
          title: "When to carry paper",
          items: [
            "International trips with visa-on-arrival/OOT (onward/return) proof requirements.",
            "Travelling with seniors who prefer a physical document.",
            "Flying from smaller airports that still stamp bag tags manually.",
          ],
        },
      ],
      table: {
        caption: "Digital vs Printed use-cases",
        headers: ["Use case", "Digital", "Printed"],
        rows: [
          ["CISF entry", "✅ Screenshot/app", "Optional backup"],
          ["Visa counters abroad", "⚠️ Depends", "Safe to carry paper"],
          ["Lost phone", "❌", "✅ Essential"],
        ],
      },
      dos: [
        "Keep PDFs offline so they open even without network.",
        "Print in black-and-white on A4 with large font for easy reading.",
        "Highlight the PNR using a marker if you expect relatives to use it for baggage tracking.",
      ],
      donts: [
        "Don’t rely on workplace printers at the last minute; security teams may keep the building closed late night.",
        "Avoid creasing the barcode if you plan to scan it.",
        "Do not hand over booking screenshots with cropped names; include the whole line.",
      ],
      faqs: [
        { question: "Do I need printouts for connecting flights?", answer: "Not unless the foreign transit airport insists. Keep digital copies plus one print if you exit and re-enter security." },
        { question: "Can the airline print it for free?", answer: "Most low-cost airlines charge ₹50-200. Full-service carriers may waive it but expect a queue." },
        { question: "Is a photocopy enough?", answer: "Yes. Unlike IDs, a photocopy of the itinerary is fine because it’s not a security document." },
      ],
      tips: [
        "Use cloud print kiosks (like Printo, airport cafes) if you forget at home—cheaper than airline counters.",
        "Add the PDF to your e-reader/tablet as another battery-friendly backup.",
        "Write emergency contacts on the back of the printed ticket.",
      ],
      internalLinks: [
        { label: "Digital boarding pass", slug: "digital-boarding-pass" },
        { label: "Domestic ID checklist", slug: "domestic-id-requirements" },
        { label: "Aadhaar digital ID tips", slug: "aadhaar-digital-id" },
      ],
      verifiedOn: "2025-12-05",
    },
    sources: [
      {
        label: "MoCA Passenger Charter",
        url: "https://www.civilaviation.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "baggage-weight-size-limits",
    title: "Baggage Weight and Size Limits",
    shortTitle: "Checked bag limits",
    category: "flight",
    tags: ["baggage", "weight", "dimensions"],
    verdict: {
      status: "limited",
      summary: "Domestic economy tickets include 15kg checked and 7kg cabin allowance unless airline offers more.",
    },
    howToComply: [
      "Standard checked size: 158 cm sum of length + width + height.",
      "Cabin size: about 55 x 35 x 25 cm; verify on airline sites.",
      "Use portable luggage scales to avoid airport excess fees.",
      "Buy prepaid excess online; it is cheaper than counter rates.",
    ],
    whyRuleExists: "Limits protect baggage handlers and ensure bags fit aircraft holds and overhead bins.",
    extraNotes: [
      "Premium cabins and student fares often include 10kg extra checked allowance.",
    ],
    richContent: {
      quickAnswer:
        "Typical domestic economy tickets in India include 15kg checked baggage and 7kg cabin allowance (plus one personal item). Dimensions matter too: 158cm (L+W+H) for checked bags and roughly 55×35×25cm for cabin bags unless your airline publishes a different gauge.",
      overview: [
        "Airlines use weight and size limits to keep ground operations predictable and fuel costs in check. Overweight or oversized bags slow belts, injure staff, and incur fines from regulators.",
        "Low-cost carriers (IndiGo, SpiceJet, Akasa) sell add-on baggage slabs online that are far cheaper than airport counter rates. Buy extra weight 6–12 hours before departure if you know you’ll exceed limits.",
        "Cabin enforcement is stricter post-2023. Expect sizers near gates and random weight checks. Soft-sided bags pass more easily because they compress to fit overhead bins.",
      ],
      checklists: [
        {
          title: "Before leaving home",
          items: [
            "Weigh bags with a handheld scale (target 1kg below allowance).",
            "Measure linear dimensions; oversize items need prior approval.",
            "Buy extra baggage online if you’re carrying gifts or heavy gear.",
          ],
        },
        {
          title: "At the airport",
          items: [
            "Distribute heavy items between passengers to avoid one overweight bag.",
            "Keep valuables and medicines in cabin—even if checked bags are overweight.",
            "Use the baggage drop scale to validate weight before sealing the tag.",
          ],
        },
      ],
      table: {
        caption: "Sample airline allowances (economy domestic)",
        headers: ["Airline", "Checked", "Cabin"],
        rows: [
          ["IndiGo/SpiceJet/Akasa", "15kg", "7kg + personal item"],
          ["Vistara/Air India", "15–25kg depending on fare", "7–8kg"],
          ["Student fare", "25kg (varies)", "7kg"],
        ],
      },
      dos: [
        "Use compression cubes to stay within size limits without cramming.",
        "Carry a foldable duffel; move items into it if the main bag exceeds allowance.",
        "Photograph bag weight on the home scale to contest disputes politely.",
      ],
      donts: [
        "Don’t stack dense items (books, metals) at the top—redistribute weight evenly.",
        "Don’t assume international allowances apply to domestic legs on separate tickets.",
        "Avoid overstuffing cabin bags—if they bulge, staff may insist you check them.",
      ],
      faqs: [
        {
          question: "Are wheels and handles included in size measurements?",
          answer: "Yes. Airlines measure the longest points including wheels, handles, and pockets.",
        },
        {
          question: "Can two passengers pool allowances?",
          answer: "Some airlines allow pooling for checked baggage when you arrive together at the counter. Cabin allowances remain individual.",
        },
        {
          question: "Do infants get baggage allowance?",
          answer: "Lap infants typically get only a 7kg diaper bag allowance. If they have a seat, adult limits apply.",
        },
      ],
      tips: [
        "Use luggage with built-in scales to avoid surprises.",
        "Tie a bright ribbon to heavy bags so they are easy to spot at arrival even if rerouted for weight balancing.",
        "Screenshot the fare rules from your booking email and keep them offline.",
      ],
      internalLinks: [
        { label: "Cabin bag count rules", slug: "cabin-bag-count-dimensions" },
        { label: "Fragile packing guide", slug: "fragile-items-packing" },
        { label: "Hand tools policy", slug: "hand-tools-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "DGCA Passenger Charter - Baggage",
        url: "https://www.dgca.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "cabin-bag-count-dimensions",
    title: "Cabin Bag Count and Dimensions",
    shortTitle: "Cabin bag count",
    category: "flight",
    tags: ["cabin bag", "personal item"],
    verdict: {
      status: "limited",
      summary: "Domestic airlines allow one cabin bag up to 7kg plus one personal item (handbag or laptop bag).",
    },
    howToComply: [
      "Keep personal items slim enough to fit under the seat.",
      "Use soft-shell cabin bags to comply with sizers even when slightly overpacked.",
      "Place power banks and electronics in the personal item for easy removal.",
    ],
    whyRuleExists: "Limits keep aisles clear during boarding and reduce weight overhead.",
    extraNotes: [
      "Infants get an extra diaper bag allowance on most airlines.",
    ],
    richContent: {
      quickAnswer:
        "Most Indian airlines allow one cabin bag up to 7kg plus a personal item (laptop bag, handbag, camera sling). Follow the size gauges—roughly 55×35×25cm—and be ready for spot weighing at the gate.",
      overview: [
        "Cabin weight isn’t just about overhead bins. Airlines tally total cabin load to ensure exits remain clear during evacuation. That’s why they weigh random bags even after security.",
        "Personal items must fit under the seat. Think slim backpacks, laptop sleeves, or tote bags. If your ‘personal’ item looks like a second suitcase, staff will tag it for gate-checking.",
        "Families with infants usually get an extra diaper bag; medical equipment (CPAP, wheelchairs) doesn’t count toward the allowance. Know your fare class because premium and flex fares often include 10kg cabin weight.",
      ],
      checklists: [
        {
          title: "Packing smart",
          items: [
            "Use soft-shell cabin bags—they squeeze into sizers better than hard cases.",
            "Keep heavy electronics (laptops, cameras) in the personal item so main cabin bag stays under 7kg.",
            "Pack essentials (meds, documents) where you can access them without unpacking everything.",
          ],
        },
        {
          title: "At boarding",
          items: [
            "Place the cabin bag wheels-first in overhead bins; personal item under the seat.",
            "If staff ask to gate-check, remove electronics and valuables immediately.",
            "Use available sizers if you’re unsure—the gauge outside the gate tells you instantly.",
          ],
        },
      ],
      table: {
        caption: "Cabin bag allowances (indicative)",
        headers: ["Airline", "Max weight", "Personal item"],
        rows: [
          ["IndiGo/SpiceJet", "7kg", "Laptop bag/handbag"],
          ["Vistara/Air India (economy)", "7–8kg", "Yes"],
          ["Premium/Economy Flex", "8–10kg", "Yes"],
        ],
      },
      dos: [
        "Use packing cubes by category so you can pull one cube during secondary screening instead of unpacking everything.",
        "Keep a digital luggage scale clipped to your bag for quick checks.",
        "Wear heavier jackets or boots to shift weight off your baggage allowance.",
      ],
      donts: [
        "Don’t hang shopping bags on your suitcase handle—airlines count them as extra items.",
        "Don’t wait until the gate to move items; re-pack before security if your bag feels heavy.",
        "Avoid storing power banks in the overhead bin; keep them accessible per safety rules.",
      ],
      faqs: [
        {
          question: "Are duty-free bags counted?",
          answer: "Usually no, but keep them reasonable. Oversized duty-free parcels may be tagged.",
        },
        {
          question: "Can I carry a camera bag plus laptop?",
          answer: "Only if the airline allows two personal items (rare). Otherwise combine them into one sling or backpack.",
        },
        {
          question: "What if my cabin bag weighs 8kg but dimensions are fine?",
          answer: "Airlines can still ask you to check it. Buy extra cabin allowance or redistribute weight.",
        },
      ],
      tips: [
        "Use compression straps inside the bag to slim the profile for sizers.",
        "Keep toiletries at the top so you can remove the liquids pouch quickly during screening.",
        "Add a luggage tag with contact info even for cabin bags—gate checks happen unexpectedly.",
      ],
      internalLinks: [
        { label: "Baggage weight cheat sheet", slug: "baggage-weight-size-limits" },
        { label: "Smart luggage battery rules", slug: "smart-luggage" },
        { label: "Power bank policy", slug: "power-bank-in-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "IndiGo Cabin Baggage Policy",
        url: "https://www.goindigo.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "fragile-items-packing",
    title: "Packing Fragile Items",
    shortTitle: "Fragile packing",
    category: "flight",
    tags: ["fragile", "glass", "electronics"],
    verdict: {
      status: "limited",
      summary: "Fragile goods allowed but travel at passenger risk. Use hard cases and declare them during check-in.",
    },
    howToComply: [
      "Use bubble wrap and double-boxing for glass or ceramics.",
      "Stick airline-provided FRAGILE tags but still expect normal belt handling.",
      "Insure high-value items separately; airlines cap liability at about INR 20,000 per kg.",
    ],
    whyRuleExists: "Airlines cannot guarantee gentle handling; proper packing prevents breakage.",
    extraNotes: [
      "Lithium-powered fragile devices must still meet battery rules.",
    ],
    richContent: {
      quickAnswer:
        "Fragile items—glassware, ceramics, electronics—can fly, but airlines treat them as ‘carried at passenger risk.’ Use rigid cases, bubble wrap, and insurance; declare anything irreplaceable before check-in.",
      overview: [
        "Baggage belts, loaders, and turbulence don’t show mercy. If you can’t replace it easily, keep it in cabin or pack it like it’s going through a war zone.",
        "Hard cases distribute pressure better than soft suitcases. Combine bubble wrap, foam, or clothes as padding, and mark the bag ‘FRAGILE’. Staff still handle thousands of bags, so tags are reminders—not guarantees.",
        "Consider third-party insurance for art, musical instruments, or heirloom crockery. Airline liability is capped (≈₹20,000 per kg), far below the value of most fragile items.",
      ],
      checklists: [
        {
          title: "Packing steps",
          items: [
            "Wrap each item individually with bubble wrap or foam sleeves.",
            "Use double-walled cartons or hard cases inside your suitcase.",
            "Fill empty spaces with clothes or airbags to prevent shifting.",
          ],
        },
        {
          title: "At the counter",
          items: [
            "Declare fragile contents and request FRAGILE tags (bring extras if you have them).",
            "Photograph the packed bag before sealing for insurance documentation.",
            "Ask about limited release forms—some airlines make you sign one acknowledging risk.",
          ],
        },
      ],
      table: {
        caption: "Fragile item strategy",
        headers: ["Item", "Cabin or checked?", "Notes"],
        rows: [
          ["Laptop/camera", "Cabin", "Better under your supervision"],
          ["Glassware", "Checked", "Use hard case + FRAGILE tag"],
          ["Musical instrument", "Cabin (if fits)", "Buy extra seat for large cases"],
        ],
      },
      dos: [
        "Use painter’s tape to create an ‘X’ on glass surfaces—it reduces shattering.",
        "Include desiccant packs to prevent moisture damage.",
        "Carry spare packing tape in case security asks to rewrap an inspected box.",
      ],
      donts: [
        "Don’t rely on cardboard wine boxes alone—add internal cushioning.",
        "Don’t ship lithium-powered fragile devices without following battery rules.",
        "Avoid checking priceless heirlooms; courier them with specialised handlers instead.",
      ],
      faqs: [
        {
          question: "Do airlines compensate for broken items if tagged FRAGILE?",
          answer: "Only up to statutory limits. Tags are reminders, not insurance.",
        },
        {
          question: "Can I carry bubble wrap in cabin?",
          answer: "Yes. Keep a roll handy to rewrap items if security inspects them.",
        },
        {
          question: "What if my suitcase itself is fragile?",
          answer: "Use protective covers or shrink wrap at the airport to prevent scratches and cracks.",
        },
      ],
      tips: [
        "Pack a mini toolkit (screwdriver, zip ties) in checked baggage to reassemble crates on arrival.",
        "Use reusable silicone bottle sleeves for glass jars—they provide grip and cushioning.",
        "Book premium baggage handling services offered by some airports if you’re travelling with extremely delicate loads.",
      ],
      internalLinks: [
        { label: "Baggage weight rules", slug: "baggage-weight-size-limits" },
        { label: "Smart luggage battery guide", slug: "smart-luggage" },
        { label: "Food & snacks policy", slug: "food-and-snacks-in-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "Air India Baggage Handling Advisory",
        url: "https://www.airindia.com/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "duty-free-liquids-return",
    title: "Duty-Free Liquids on Return Flights",
    shortTitle: "Duty-free liquids",
    category: "flight",
    tags: ["duty free", "liquid", "steb"],
    verdict: {
      status: "limited",
      summary: "Duty-free alcohol or perfume allowed through transit only if sealed in STEBs with receipt dated within 36 hours.",
    },
    howToComply: [
      "Keep Security Tamper Evident Bag (STEB) sealed until final destination.",
      "Carry the purchase receipt showing date, flight number, and volume.",
      "During return to India, ensure bottles are within customs duty-free allowance.",
    ],
    whyRuleExists: "STEBs prove the liquid was screened at the point of sale, reducing risk of liquid explosives.",
    extraNotes: [
      "If you exit the secure area during transit, the bag may be confiscated despite STEB.",
    ],
    richContent: {
      quickAnswer:
        "Duty-free liquor or perfume only clears onward security if it stays sealed inside an ICAO-approved STEB with a receipt less than 36 hours old. Break the seal or lose the slip and the bottle becomes a regular >100ml liquid that screeners will confiscate.",
      overview: [
        "STEBs (Security Tamper-Evident Bags) prove that a duty-free bottle was inspected at the shop. The clear pouch lists the airport, date, and flight so screeners at your connection can wave it through without re-opening the bottle.",
        "Transit officers still run random explosive trace tests. If they notice a torn seal, missing receipt, or a layover longer than a calendar day, they are obliged to bin the bottle or make you check it in.",
        "On arrival in India, customs will add whatever survives transit to your personal duty-free allowance (2 litres of alcohol). Keep receipts handy to show quantity and price before leaving the green channel.",
      ],
      checklists: [
        {
          title: "Before you buy",
          items: [
            "Confirm every onward airport accepts STEBs—some smaller domestic hops still X-ray them manually.",
            "Ask the cashier to double-bag fragile glass and staple the receipt visibly inside the pouch.",
            "Plan timing: purchase within 36 hours of the final leg so the timestamp stays valid.",
          ],
        },
        {
          title: "During connections",
          items: [
            "Keep the STEB inside your cabin bag but separate it during security re-screening so officers can inspect the seal.",
            "Show boarding passes for all segments—some airports annotate the STEB with your next flight number.",
            "If you must exit the sterile area, ask the airline whether you can check the bottle in a protected box before re-clearing security.",
          ],
        },
      ],
      table: {
        caption: "Transit outcomes for duty-free liquids",
        headers: ["Scenario", "Security decision", "What you should do"],
        rows: [
          ["Seal intact + receipt <36h", "Clears LAG screening", "Proceed to gate with STEB"],
          ["Seal opened for tasting", "Confiscated", "Buy again after next checkpoint"],
          ["Forced landside exit", ">100ml rule applies", "Repack in checked bag or skip carrying"],
        ],
      },
      dos: [
        "Carry a spare foldable tote to shield STEBs from knocks inside the overhead bin.",
        "Photograph the receipt and seal number in case the ink fades mid-trip.",
        "Combine purchases so each passenger holds no more than the 2-litre customs allowance on arrival.",
      ],
      donts: [
        "Don’t decant bottles into travel flasks; customs will treat them as undeclared alcohol.",
        "Avoid buying duty-free five hours before an overnight layover—long gaps invite extra checks.",
        "Never stuff STEBs into checked baggage without extra padding; broken seals void the exemption.",
      ],
      faqs: [
        {
          question: "Can I carry two STEBs if I have two layovers?",
          answer: "Yes, but keep receipts for each. Screeners only care that each pouch is sealed, labelled, and within the time limit.",
        },
        {
          question: "What if the shop forgets to include the receipt?",
          answer: "Return immediately and request another STEB with a duplicate bill—without it, the exemption falls apart at the next checkpoint.",
        },
        {
          question: "Does the 2-litre Indian allowance include alcohol bought abroad and domestically?",
          answer: "Yes. CBIC counts all liquor in your baggage. Anything above 2 litres attracts ~38.5% duty even if it stayed sealed.",
        },
      ],
      tips: [
        "Use travel-size bubble wrap sleeves around bottles before sliding them into the STEB—security allows it as long as it stays transparent.",
        "If you are uncertain about a tight connection, pre-order pickup at the last airport so you buy after the final security check.",
        "Track STEB integrity with luggage AirTags so you know if the bag is mishandled by ramp staff when gate-checking.",
      ],
      internalLinks: [
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
        { label: "Duty-free alcohol allowance", slug: "duty-free-alcohol-allowance" },
        { label: "Cigarettes & tobacco", slug: "cigarettes-tobacco-restrictions" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "ICAO STEB Guidance",
        url: "https://www.icao.int/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "prohibited-items-customs",
    title: "Customs-Prohibited Items When Entering India",
    shortTitle: "Customs prohibited",
    category: "general-travel",
    tags: ["customs", "prohibited", "import"],
    verdict: {
      status: "not_allowed",
      summary: "Firearms, satellite phones, pornographic material, and counterfeit currency are prohibited unless licensed.",
    },
    howToComply: [
      "Declare satellite phones, drones above 249g, or firearms with DGCA and customs paperwork before travel.",
      "Do not carry seeds, soil, or animal products without quarantine clearance.",
      "Use the Red Channel if unsure; penalties for undeclared goods are steep.",
    ],
    whyRuleExists: "Customs protects national security, agriculture, and revenue.",
    extraNotes: [
      "Gold bars and bullion need BIS hallmarking and customs duty payment.",
    ],
    richContent: {
      quickAnswer:
        "India bars firearms, satellite phones, counterfeit currency, pornographic media, unprocessed ivory, endangered wildlife parts, most seeds/soil, and drones above 249g without permits. Declare borderline items at the Red Channel or risk seizure plus penalties.",
      overview: [
        "CBIC’s prohibited list mixes national security items (guns, communication gear) with biosecurity concerns (seeds, meat) and moral restrictions (obscene material). Officers have broad powers to confiscate anything undeclared.",
        "Some gear such as drones, radio transmitters, or firearms can enter with licences from DGCA, DGFT, or WPC. Carry photocopies and digital scans because customs rarely has time to verify permits online.",
        "Penalties scale quickly: confiscation, 10–300% duty penalties, and even arrest for satellite phones or wildlife contraband. Declaring voluntarily is viewed as compliance, which often leads to a warning instead of prosecution.",
      ],
      checklists: [
        {
          title: "Before you pack",
          items: [
            "Compare your gear list with DGFT Schedule I (prohibited) and Schedule II (restricted).",
            "Apply for import permits early—some (sat phones, scientific instruments) take 4–6 weeks.",
            "Photograph serial numbers and store them in cloud notes for declaration forms.",
          ],
        },
        {
          title: "At arrival",
          items: [
            "Choose the Red Channel if you even slightly exceed allowances. Officers appreciate honesty.",
            "Hand over licences, invoices, and packing lists together so inspection ends faster.",
            "Request a detention receipt if customs holds an item; it helps with insurance or appeals.",
          ],
        },
      ],
      table: {
        caption: "High-risk items and their status",
        headers: ["Item", "Status", "Notes"],
        rows: [
          ["Firearms & ammo", "Prohibited", "Only diplomats/sport shooters with DGCA permits"],
          ["Satellite phones", "Restricted", "Need DoT/WPC approval before arrival"],
          ["Seeds/soil", "Restricted", "Require plant quarantine clearance"],
          ["Counterfeit currency", "Seized", "Triggers police case"],
        ],
      },
      dos: [
        "Email scanned permits to yourself so you can retrieve them even if phones lose signal inside arrivals.",
        "Break down camera or drone kits to show they are personal gear, not merchandise.",
        "Keep BIS or Hallmark certificates for jewellery or bullion to prove authenticity.",
      ],
      donts: [
        "Don’t hide banned goods inside food or clothing—X-ray machines detect dense clusters easily.",
        "Never rely on courier declarations if you are physically carrying the item; your luggage counts separately.",
        "Avoid buying ‘duty-free’ wildlife souvenirs abroad; many are illegal in India regardless of origin receipts.",
      ],
      faqs: [
        {
          question: "Is pepper spray allowed?",
          answer: "Yes in checked baggage (≤100ml) for self-defense, but declare if carrying multiple cans.",
        },
        {
          question: "Can I bring a drone for recreational filming?",
          answer: "Only nano drones (≤249g, no control beyond line-of-sight) are exempt. Heavier drones need import permission and Remote Pilot IDs.",
        },
        {
          question: "What happens if customs seizes an item?",
          answer: "You receive a detention memo. You can appeal within 60 days or forfeit the goods if they are outright prohibited.",
        },
      ],
      tips: [
        "Bookmark the CBIC Travellers Guide PDF offline for quick reference mid-trip.",
        "Carry a multilingual list of item descriptions if you transit through non-English airports to avoid mistranslation.",
        "If buying tech abroad, keep packaging flat in your suitcase so officers see it is personal use, not commercial stock.",
      ],
      internalLinks: [
        { label: "Carrying cash rules", slug: "carrying-cash-flight" },
        { label: "Gold jewellery allowance", slug: "gold-jewellery-limit" },
        { label: "Duty-free alcohol allowance", slug: "duty-free-alcohol-allowance" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "CBIC Travellers Guide",
        url: "https://www.cbic.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "carrying-cash-flight",
    title: "Carrying Cash on Flights",
    shortTitle: "Carrying cash",
    category: "general-travel",
    tags: ["cash", "customs", "income tax"],
    verdict: {
      status: "limited",
      summary: "No explicit limit domestically, but amounts above INR 2 lakh can trigger questioning. International travellers must declare currency over USD 5,000 (or USD 10,000 aggregate).",
    },
    howToComply: [
      "Carry withdrawal slips or business invoices if transporting high cash.",
      "For international trips, fill customs form if exceeding the forex limit.",
      "Avoid keeping large bundles in cabin; use money belts or bank drafts instead.",
    ],
    whyRuleExists: "Income Tax Act and FEMA monitor large cash movement to curb money laundering.",
    extraNotes: [
      "Carrying demonetised or mutilated notes can lead to confiscation.",
    ],
    richContent: {
      quickAnswer:
        "Domestic flyers can technically carry any amount of Indian currency, but CISF and Income Tax question bundles above ₹2 lakh. International travellers must declare foreign currency over USD 5,000 (or USD 10,000 combined with traveller’s cheques) using the Currency Declaration Form.",
      overview: [
        "Airports are choke points for anti-money-laundering checks. Officers look for unusually high cash, mismatched professions, or mixed currencies without paperwork.",
        "Carrying business proceeds or wedding gifts? Document the source—withdrawal slips, GST invoices, or gift deeds calm both CISF and Income Tax teams.",
        "Foreign currency limits are strict: fill the CDF when crossing USD 5,000 cash or USD 10,000 aggregate. RBI can seize undeclared amounts, and airlines can deny boarding if they suspect smuggling.",
      ],
      checklists: [
        {
          title: "When cash is unavoidable",
          items: [
            "Split money between travelling companions so no single person holds the full stack.",
            "Bundle notes in tamper-evident envelopes and mark the amount on the outside.",
            "Carry supporting documents (bank slips, invoices, wedding invitations) in the same folder.",
          ],
        },
        {
          title: "At the airport",
          items: [
            "Declare forex above the limit at customs before you exit arrivals or board departures.",
            "Answer security questions calmly—officers mostly want the purpose and duration of travel.",
            "Use bank drafts, prepaid forex cards, or wire transfers for large values to avoid carrying bricks of cash.",
          ],
        },
      ],
      table: {
        caption: "Cash thresholds",
        headers: ["Scenario", "Limit", "Action"],
        rows: [
          ["Domestic travel", "No legal cap", "Explain source if >₹2 lakh"],
          ["Leaving India", "USD 3,000 in currency", "Carry authorised dealer receipt"],
          ["Entering India", "Declare >USD 5k cash / USD 10k aggregate", "Submit CDF"],
        ],
      },
      dos: [
        "Use DigiLocker or a secure drive to store digital copies of bank proofs.",
        "Wear a money belt or slash-proof pouch instead of tossing bundles into backpacks.",
        "Count cash privately before reaching the airport; cameras discourage open counting at terminals.",
      ],
      donts: [
        "Don’t withdraw large sums right before the flight—systems flag consecutive ATM pulls near airports.",
        "Avoid mixing multiple people’s cash; it complicates explanations to officials.",
        "Never stash currency inside electronics or toiletry bottles—X-rays highlight dense bricks instantly.",
      ],
      faqs: [
        {
          question: "Can I carry coins or commemorative currency?",
          answer: "Yes, but heavy coin rolls often trigger extra screening. Pack them in checked bags with receipts.",
        },
        {
          question: "Are forex cards exempt from declaration?",
          answer: "Prepaid cards are electronic value, so they do not count toward the USD 5,000 cash limit, but keep load slips to prove the balance.",
        },
        {
          question: "Do NRIs have different limits?",
          answer: "Arrival declaration thresholds are identical. NRIs can, however, re-export unspent foreign currency when departing again without extra paperwork.",
        },
      ],
      tips: [
        "Use tamper-evident bank envelopes for high-value notes; officers respect institutional packaging.",
        "Consider splitting currency between checked and cabin bags using TSA-recognised locks (but never store all of it in checked baggage).",
        "Record a quick video inventory on your phone before leaving home—it helps if authorities need proof later.",
      ],
      internalLinks: [
        { label: "Gold jewellery allowance", slug: "gold-jewellery-limit" },
        { label: "Customs prohibited list", slug: "prohibited-items-customs" },
        { label: "Duty-free alcohol allowance", slug: "duty-free-alcohol-allowance" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "CBIC and RBI Passenger Guidelines",
        url: "https://www.rbi.org.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "gold-jewellery-limit",
    title: "Gold Jewellery on Flights",
    shortTitle: "Gold jewellery",
    category: "general-travel",
    tags: ["gold", "jewellery", "customs"],
    verdict: {
      status: "limited",
      summary: "Personal jewellery worn is generally allowed. Bringing gold into India attracts duty beyond 20g (men) / 40g (women) allowances when abroad over 6 months.",
    },
    howToComply: [
      "Wear regular ornaments; keep invoices for heavy bridal sets.",
      "Returning NRIs/PIOs after 6 months abroad can bring duty-free gold up to the prescribed limits.",
      "Declare bullion, coins, and bars separately and pay duty at customs.",
    ],
    whyRuleExists: "Prevents smuggling and protects forex reserves.",
    extraNotes: [
      "Domestic flights do not impose limits, but Income Tax may question unexplained quantities.",
    ],
    richContent: {
      quickAnswer:
        "Wear your everyday gold freely on domestic flights, but inbound international passengers only get duty-free allowance up to 20g (₹50,000) for men and 40g (₹100,000) for women after staying abroad 6 months. Declare anything heavier—bullion, coins, or bridal sets—or customs will seize it.",
      overview: [
        "Jewellery you wear is usually treated as ‘personal effects’. Trouble starts when weight or purity signals commercial intent. Officers rely on X-ray silhouettes plus random manual inspections.",
        "Returning NRIs/PIOs must show passport stamps proving six months outside India to claim the concessional allowance. Otherwise, the entire value attracts duty (currently 15% plus surcharge).",
        "Bullion bars, coins, and unfinished ornaments are never duty-free. They must be declared, invoiced, and often routed through the Red Channel for appraisal.",
      ],
      checklists: [
        {
          title: "Before travelling",
          items: [
            "Carry purchase invoices or valuation certificates for high-value sets.",
            "Photograph each piece against a scale to document quantity and design.",
            "Note hallmark numbers or BIS cards in case officers request verification.",
          ],
        },
        {
          title: "At customs",
          items: [
            "Separate personal jewellery (worn) from packed gifts so officers can sample-check easily.",
            "Declare bullion or unworn items proactively; duty counters accept digital payments on the spot.",
            "Request an appraisal receipt if customs keeps items pending evaluation—useful for insurance claims.",
          ],
        },
      ],
      table: {
        caption: "Gold allowance snapshot",
        headers: ["Traveller", "Duty-free allowance", "Conditions"],
        rows: [
          ["Male passenger", "20g / ₹50k", ">6 months abroad"],
          ["Female passenger", "40g / ₹100k", ">6 months abroad"],
          ["Other cases", "0g", "Duty payable on full value"],
        ],
      },
      dos: [
        "Use hard cases or jewellery rolls inside cabin baggage to avoid scratches during inspection.",
        "Keep a list of heirloom pieces and their approximate age—heritage value can influence duty calculation.",
        "Declare even if you suspect value is below the limit; officers make the final call, and honesty speeds the process.",
      ],
      donts: [
        "Don’t carry raw gold dust or cut pieces; customs treats them as bullion, not jewellery.",
        "Avoid lending jewellery to co-travellers to ‘split’ the limit—if discovered, everyone gets penalised.",
        "Never mail high-value ornaments to yourself to dodge checks; parcels go through customs too.",
      ],
      faqs: [
        {
          question: "Do gemstones count toward the gold allowance?",
          answer: "No, but they are still valued separately for duty calculations. Carry gem invoices.",
        },
        {
          question: "What if I lost the purchase bill?",
          answer: "Get a valuation letter from a certified jeweller before travel; customs may still revalue but at least you have documentation.",
        },
        {
          question: "Can I import gold coins as souvenirs?",
          answer: "Coins count as bullion. Declare them and be ready to pay duty regardless of weight.",
        },
      ],
      tips: [
        "Use a handheld luggage scale to weigh packed jewellery sets—handy if officers ask for exact numbers.",
        "Store jewellery insurance details in the cloud so you can prove ownership if the airline misplaces your bag.",
        "Wear minimal pieces during transit and pack the rest neatly; it reduces the time officers spend inspecting you personally.",
      ],
      internalLinks: [
        { label: "Carrying cash", slug: "carrying-cash-flight" },
        { label: "Customs prohibited list", slug: "prohibited-items-customs" },
        { label: "Duty-free alcohol allowance", slug: "duty-free-alcohol-allowance" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "CBIC Customs Baggage Rules",
        url: "https://www.cbic.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "duty-free-alcohol-allowance",
    title: "Duty-Free Alcohol Allowance into India",
    shortTitle: "Duty-free alcohol",
    category: "general-travel",
    tags: ["alcohol", "duty free", "allowance"],
    verdict: {
      status: "limited",
      summary: "Adults can bring 2 litres of duty-free alcohol into India. Anything extra attracts customs duty (~38.5%).",
    },
    howToComply: [
      "Keep bottles sealed in STEBs with receipts.",
      "Declare quantities beyond 2 litres and pay duty to avoid confiscation.",
      "Remember airline carriage rules: bottles must be checked unless purchased after security.",
    ],
    whyRuleExists: "Controls alcohol imports and ensures revenue collection.",
    extraNotes: [
      "States like Gujarat have separate prohibition rules; check local permits for onward travel.",
    ],
    richContent: {
      quickAnswer:
        "Each passenger aged 18+ can bring 2 litres of duty-free alcohol into India if they spent at least 48 hours abroad. Extra bottles are legal but attract ~38.5% customs duty, so declare them immediately.",
      overview: [
        "CBIC counts total liquid alcohol—wine, beer, spirits—toward the 2-litre cap. Mix-and-match is fine as long as the combined volume stays within the limit.",
        "Some states (Gujarat, Bihar, certain North-Eastern states) require local permits. Customs may release the bottles, but state excise officers can seize them later if you transit into a dry zone.",
        "Duty counters inside arrivals accept cards/UPI. Paying voluntarily keeps the goods with you and prevents confiscation.",
      ],
      checklists: [
        {
          title: "Before landing",
          items: [
            "Count litres per traveller and assign bottles accordingly.",
            "Keep duty-free receipts in the STEB pocket for easy access.",
            "If over the limit, calculate approximate duty (CIF value × 38.5%) so payment is faster.",
          ],
        },
        {
          title: "At customs",
          items: [
            "Declare volumes honestly at the Red Channel even if just 200ml over—officers often waive minor excess when you self-report.",
            "Pack surplus bottles in sturdy wine sleeves before scanning checked bags again.",
            "Request an official duty receipt; you may need it for state excise checks outside the airport.",
          ],
        },
      ],
      table: {
        caption: "Allowance planner",
        headers: ["Item", "Counts toward 2L?", "Notes"],
        rows: [
          ["750ml wine", "Yes", "Three bottles = 2.25L (duty payable on 0.25L)"],
          ["Beer cans", "Yes", "Volume, not alcohol %, matters"],
          ["Duty-free miniatures", "Yes", "Combine multiple minis carefully"],
        ],
      },
      dos: [
        "Spread fragile bottles across multiple bags instead of stuffing them into one tote.",
        "Use reusable bottle protectors or inflatable sleeves for checked luggage.",
        "Check airline rules—some carriers limit total alcohol per checked suitcase due to flammability policies.",
      ],
      donts: [
        "Don’t gift wrap liquor until after customs; officers will open it.",
        "Avoid shipping alcohol via courier without excise permits—it still goes through customs scans.",
        "Never lie about quantities. Officers can X-ray your baggage and levy harsher penalties if you are caught.",
      ],
      faqs: [
        {
          question: "Does the 2-litre rule apply to duty-free purchases made in India before departure?",
          answer: "Yes. Customs counts all alcohol you carry into India regardless of where you bought it.",
        },
        {
          question: "Can minors carry alcohol for parents?",
          answer: "No. Only passengers 18+ qualify for the allowance.",
        },
        {
          question: "What is the duty rate?",
          answer: "Standard effective rate is ~38.5% of the CIF value (cost + insurance + freight). Rates can be higher for premium categories after cess.",
        },
      ],
      tips: [
        "Buy bottles with screw caps if you have multiple layovers—corks can dry out on long flights.",
        "Keep a small roll of duct tape to reseal STEBs if they loosen (without actually opening the inner pouch).",
        "If you’re gifting, carry decorative sleeves separately so you can wrap bottles after you clear customs.",
      ],
      internalLinks: [
        { label: "Duty-free liquids in transit", slug: "duty-free-liquids-return" },
        { label: "Cigarettes & tobacco", slug: "cigarettes-tobacco-restrictions" },
        { label: "Carrying cash", slug: "carrying-cash-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "CBIC Duty Free Allowance",
        url: "https://www.cbic.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "cigarettes-tobacco-restrictions",
    title: "Cigarettes and Tobacco Restrictions",
    shortTitle: "Cigarettes & vape",
    category: "flight",
    tags: ["cigarettes", "tobacco", "allowance"],
    verdict: {
      status: "limited",
      summary: "Duty-free allowance: 200 cigarettes or 50 cigars or 250g tobacco when entering India. Vapes remain banned entirely.",
    },
    howToComply: [
      "Keep cigarettes sealed in cartons with receipts.",
      "Declare larger quantities at customs to pay duty and avoid seizure.",
      "Do not carry e-cigarettes; they are confiscated with possible fines.",
    ],
    whyRuleExists: "Controls tobacco imports and enforces the 2019 vape ban.",
    extraNotes: [
      "Domestic flights allow cigarette packets in cabin, but smoking is banned everywhere inside aircraft.",
    ],
    richContent: {
      quickAnswer:
        "India’s duty-free allowance is 200 cigarettes or 50 cigars or 250g of loose tobacco per adult. E-cigarettes, vapes, and heated-tobacco devices are banned outright—customs confiscates them and can file cases under the 2019 ordinance.",
      overview: [
        "Tobacco allowances are per passenger. Mixing categories (100 cigarettes + 25 cigars) is not allowed—you must stay within one bracket or declare the excess.",
        "Once inside India, lighting up is illegal on aircraft and inside terminal buildings. Carry cigarettes sealed in their cartons to show they’re for personal use.",
        "Electronic nicotine devices remain prohibited whether or not they contain liquid. Officers seize even empty vape shells.",
      ],
      checklists: [
        {
          title: "Packing guide",
          items: [
            "Leave cigarettes in sealed duty-free sleeves with the receipt attached.",
            "Use hard cases for loose cigars to prevent crushing during baggage screening.",
            "Keep pipe or rolling tobacco inside labeled tins; unlabeled pouches attract scrutiny.",
          ],
        },
        {
          title: "At customs",
          items: [
            "Declare any quantity beyond the allowance. Duty (approx. 100% + cess) is cheaper than confiscation.",
            "Separate matches or lighters from tobacco—they have their own limits.",
            "For domestic flights, keep cigarettes accessible for security inspection; matches/lighters usually stay on your person per policy.",
          ],
        },
      ],
      table: {
        caption: "Tobacco allowance options",
        headers: ["Product", "Duty-free quantity", "Notes"],
        rows: [
          ["Cigarettes", "200 sticks", "Approx. one carton"],
          ["Cigars", "50 sticks", "Store in humidor cases"],
          ["Pipe/chewing tobacco", "250g", "Must be factory sealed"],
        ],
      },
      dos: [
        "Carry a separate zip pouch for used/empty packs to avoid littering aircraft cabins.",
        "Check destination country rules; some nations ban chewing tobacco entirely.",
        "Label cartons with passenger names when travelling as a group so each person holds their own allowance.",
      ],
      donts: [
        "Don’t buy vapes at foreign duty-free shops for Indian travel—they will be seized.",
        "Avoid stashing loose cigarettes in coat pockets; officers may assume you are reselling.",
        "Do not attempt to smoke inside airport restrooms—CCTV coverage is extensive and fines are steep.",
      ],
      faqs: [
        {
          question: "Do nicotine pouches count as tobacco?",
          answer: "Yes, they fall under smokeless tobacco and share the 250g allowance.",
        },
        {
          question: "Can I carry hookah flavors?",
          answer: "Flavored tobacco counts toward the 250g limit. Herbal (tobacco-free) mixes usually pass but declare them if carrying multiple kilos.",
        },
        {
          question: "What about lighters?",
          answer: "One small safety lighter is typically allowed on your person, but torch/jet lighters are banned. Refer to the matches & lighters rule for details.",
        },
      ],
      tips: [
        "Use odor-proof pouches if you do not want your carry-on to smell like tobacco.",
        "Moisturise hands after long flights; dry skin increases the urge to over-handle cigarettes before reaching designated areas.",
        "Mark cartons with arrival date as a reminder of when to restock within legal limits.",
      ],
      internalLinks: [
        { label: "Matches & lighter policy", slug: "matches-lighters" },
        { label: "Duty-free alcohol allowance", slug: "duty-free-alcohol-allowance" },
        { label: "Prohibited customs items", slug: "prohibited-items-customs" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "CBIC Duty Free Allowance",
        url: "https://www.cbic.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "gift-items-wrapping",
    title: "Gift Items with Scissors or Tape",
    shortTitle: "Gift items",
    category: "flight",
    tags: ["gifts", "wrapping", "security"],
    verdict: {
      status: "limited",
      summary: "Wrapped gifts may be opened at security. Scissors or cutters hidden inside packages will be confiscated.",
    },
    howToComply: [
      "Leave gifts unwrapped until you clear security, then use gift bags instead of tape and scissors.",
      "Place decorative scissors, craft knives, or tape dispensers in checked baggage.",
      "Carry gift receipts to explain electronics or jewelry values.",
    ],
    whyRuleExists: "Opaque wrapping hides contents and can mask prohibited items.",
    extraNotes: [
      "Duty-free staff can wrap purchases after screening at select airports.",
    ],
    richContent: {
      quickAnswer:
        "Security can open any wrapped gift and confiscate scissors, blades, or metal tape dispensers hidden inside. Carry gifts unwrapped through screening, pack sharp accessories in checked bags, and finish the wrapping at the destination.",
      overview: [
        "Opaque wrapping blocks X-ray clarity. CISF officers will slice open beautifully wrapped presents without hesitation if they cannot identify the contents.",
        "Craft tools—scissors, paper cutters, metal rulers—fall under sharp object rules. Keep them in checked luggage to avoid delays and confiscation.",
        "For duty-free items, staff usually provide branded bags post-security. Use tissue or gift bags that can be folded flat in your cabin bag until you clear all checkpoints.",
      ],
      checklists: [
        {
          title: "Before security",
          items: [
            "Pack flat-fold gift bags, tissue paper, and ribbon instead of pre-wrapping.",
            "Place scissors, cutters, or tape dispensers in checked baggage.",
            "Keep fragile gifts (ceramics, electronics) in protective cases with labels.",
          ],
        },
        {
          title: "After security",
          items: [
            "Use airport lounge tables or empty gates to assemble gift bags without blocking walkways.",
            "Retain receipts for electronics or jewellery in case customs asks about value.",
            "If buying duty-free, ask staff for complimentary wrapping after purchase to avoid re-openings.",
          ],
        },
      ],
      table: {
        caption: "Where to pack common gift items",
        headers: ["Item", "Cabin or checked?", "Notes"],
        rows: [
          ["Wrapped gift boxes", "Cabin", "Leave unsealed until past security"],
          ["Scissors/craft knives", "Checked", "Must follow sharp objects policy"],
          ["Tape + ribbon", "Cabin", "Allowed if blades removed"],
        ],
      },
      dos: [
        "Carry collapsible gift boxes that magnetically close—no tape needed.",
        "Label each gift with the recipient’s name on a sticky note so you can wrap quickly later.",
        "Use reusable fabric furoshiki wraps; they double as scarves in your bag until needed.",
      ],
      donts: [
        "Don’t argue if officers unwrap a present—they must verify contents for safety.",
        "Avoid hiding jewelry or cash inside plush toys; secondary screening will be more intrusive.",
        "Never carry helium balloons—compressed gas cylinders are prohibited.",
      ],
      faqs: [
        {
          question: "Can I carry pre-wrapped gifts in checked baggage?",
          answer: "Yes, but baggage screeners may still open them if the X-ray image looks suspicious.",
        },
        {
          question: "What about gift baskets with food?",
          answer: "Food is fine, but declare liquids >100ml and follow customs rules for perishables.",
        },
        {
          question: "Are decorative candles allowed?",
          answer: "Solid wax candles are allowed in cabin; gel candles count as liquids and must be under 100ml or checked.",
        },
      ],
      tips: [
        "Pack a mini double-sided tape roller (without blades) for quick assembly post-security.",
        "Carry fold-flat gift boxes sized to fit overhead bins so bows don’t get crushed.",
        "Use QR-coded greeting cards linked to digital photo albums instead of extra printed material.",
      ],
      internalLinks: [
        { label: "Sharp objects policy", slug: "sharp-objects-flight" },
        { label: "Perfume & liquids guide", slug: "perfume-on-flight" },
        { label: "Empty bottle rules", slug: "empty-bottles-vs-liquid" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "CISF Passenger Communication",
        url: "https://www.cisf.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "empty-bottles-vs-liquid",
    title: "Empty Bottles vs Liquid-Filled",
    shortTitle: "Empty bottles",
    category: "flight",
    tags: ["bottle", "security", "liquid rule"],
    verdict: {
      status: "allowed",
      summary: "Empty bottles are allowed through security. Filled bottles over 100ml are confiscated unless exempt.",
    },
    howToComply: [
      "Show the empty bottle at security; keep the lid off until after screening if asked.",
      "For onward flights, empty the bottle again before each security checkpoint.",
      "Label reusable bottles with your name to avoid mix-ups at trays.",
    ],
    whyRuleExists: "Ensures no un-screened liquids enter the sterile area.",
    extraNotes: [
      "Insulated flasks may be swabbed even when empty because walls can retain residue.",
    ],
    richContent: {
      quickAnswer:
        "Empty bottles—plastic, metal, or glass—sail through security. As soon as they contain more than 100ml of liquid, they fall under the LAG rule unless covered by baby food or medical exemptions. Keep lids off if officers request a visual check.",
      overview: [
        "Security focuses on liquid volume, not container size. Showing a bone-dry bottle proves compliance instantly.",
        "Vacuum flasks, metal tumblers, and collapsible silicone bottles are all acceptable empty. Residue can trigger swab tests, so rinse thoroughly before travel.",
        "Once you refill past security, remember to empty the bottle again before any additional checkpoints on multi-leg itineraries.",
      ],
      checklists: [
        {
          title: "Before security",
          items: [
            "Pour out all liquids, including melted ice, right before joining the queue.",
            "Separate bottle lids/caps and keep them in the tray if officers request it.",
            "Wipe condensation to avoid confusing scanners.",
          ],
        },
        {
          title: "After security",
          items: [
            "Use drinking fountains or water stations to refill—Indian airports are adding them near each gate.",
            "Empty the bottle again before transiting through another security checkpoint.",
            "Label your bottle with initials so it doesn’t get mixed up in crowded trays.",
          ],
        },
      ],
      table: {
        caption: "Container quick reference",
        headers: ["Container", "Empty allowed?", "Notes"],
        rows: [
          ["Reusable plastic bottle", "✅", "Keep lid off if asked"],
          ["Vacuum flask", "✅", "May be swabbed"],
          ["Thermal mug with foam sleeve", "✅", "Remove sleeve for inspection"],
        ],
      },
      dos: [
        "Use wide-mouth bottles so officers can easily inspect the interior.",
        "Carry a small carabiner to hang the bottle from your bag after refilling.",
        "If you rely on electrolyte mixes, pack single-serve sachets and add them only after clearing security.",
      ],
      donts: [
        "Don’t argue if officers insist on a swab test—metal walls often trigger alarms.",
        "Avoid hiding liquids inside insulated sleeves; scanners detect density differences.",
        "Don’t fill the bottle while still in the queue; wait until you have fully cleared screening.",
      ],
      faqs: [
        {
          question: "Can I carry an empty wine bottle as a souvenir?",
          answer: "Yes, but wrap it securely. Sharp glass edges may still trigger manual inspection.",
        },
        {
          question: "Are collapsible hydration bladders allowed?",
          answer: "Yes when empty. Hang them flat in the tray so officers can see both sides.",
        },
        {
          question: "What about soda cans I plan to recycle?",
          answer: "Empty cans can go through, but crushed metal sometimes alarms scanners. Expect secondary screening.",
        },
      ],
      tips: [
        "Mark fill lines (250ml, 500ml) with a paint pen so you can prep baby or medical liquids accurately after security.",
        "Use a silicone sleeve to improve grip once you refill; remove it beforehand if security requests a clear view.",
        "Keep a miniature drying cloth to wipe bottles before placing them on laptops or documents in your bag.",
      ],
      internalLinks: [
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
        { label: "Duty-free liquids in transit", slug: "duty-free-liquids-return" },
        { label: "Baby food & formula", slug: "baby-food-formula-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "BCAS LAGs Directive",
        url: "https://www.bcasindia.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "pets-in-flight",
    title: "Flying with Pets in India",
    shortTitle: "Pets on flights",
    category: "flight",
    tags: ["pets", "cabin", "cargo"],
    verdict: {
      status: "limited",
      summary: "Some airlines allow small cats and dogs in cabin; others only permit pets in cargo with advance booking.",
    },
    howToComply: [
      "Obtain fit-to-fly certificate from a registered vet within 24-48 hours of departure.",
      "Carry vaccination proof, microchip details, and import/export permits if crossing borders.",
      "Use IATA-compliant crates with absorbent lining and secure fasteners.",
      "Arrive early for pet screening; animals go through a dedicated security lane.",
    ],
    whyRuleExists: "Ensures animal welfare while preventing cabin disruptions and disease transmission.",
    extraNotes: [
      "Service animals for passengers with disabilities have broader access but still need documentation.",
    ],
    richContent: {
      quickAnswer:
        "Pets fly only with advance airline approval, health certificates issued within 24–48 hours, and IATA-compliant crates. Small cats/dogs sometimes ride in cabin (usually ≤7 kg including carrier); heavier animals travel in pressurised cargo.",
      overview: [
        "Each Indian airline runs its own pet policy. Air India, Vistara, and Akasa allow limited cabin pets; IndiGo only permits them in cargo. Submit requests at least a week in advance because most flights cap pets at two per sector.",
        "Documents are non-negotiable: fit-to-fly vet certificate, vaccination card (including anti-rabies shot >30 days old), microchip data for international travel, and import/export permits when crossing borders.",
        "Crates must follow IATA Live Animal Regulations—rigid walls, metal bolts, absorbent bedding, and water cups accessible from outside. Sedation is discouraged because it affects breathing at altitude.",
      ],
      checklists: [
        {
          title: "Two weeks before travel",
          items: [
            "Call the airline to reserve a pet slot and note crate size/weight limits.",
            "Schedule vet visits for vaccination updates and parasite treatments.",
            "Order an IATA-approved crate (length = nose to tail + half leg height).",
          ],
        },
        {
          title: "Day of travel",
          items: [
            "Feed a light meal 4 hours before departure; avoid heavy food right before check-in.",
            "Attach copies of documents to the crate in a waterproof pouch.",
            "Arrive 90 minutes earlier than usual for pet screening and payment formalities.",
          ],
        },
      ],
      table: {
        caption: "Common airline pet policies (India)",
        headers: ["Airline", "Cabin?", "Key notes"],
        rows: [
          ["Air India", "Yes (≤7kg)", "One pet per cabin section, prior approval"],
          ["Vistara", "Case-by-case", "Requires vaccination + airline consent form"],
          ["IndiGo", "No", "Only in cargo via approved partners"],
        ],
      },
      dos: [
        "Acclimate your pet to the crate weeks in advance with short practice sessions.",
        "Freeze water in the dish overnight—the ice melts slowly during the flight without spilling.",
        "Carry extra pee pads, wipes, and a travel litter tray for long layovers.",
      ],
      donts: [
        "Don’t sedate pets without veterinary advice; many airlines refuse sedated animals.",
        "Avoid wire or soft carriers for cargo—they do not meet IATA standards.",
        "Do not remove the pet from the carrier inside the terminal unless instructed by security.",
      ],
      faqs: [
        {
          question: "Are emotional support animals recognised in India?",
          answer: "Airlines evaluate them under regular pet rules. Only trained service animals (guide dogs) get guaranteed cabin access.",
        },
        {
          question: "Can rabbits or birds fly?",
          answer: "Most Indian carriers limit pets to cats and dogs. Exotic animals need wildlife clearances and are often refused.",
        },
        {
          question: "What if my pet exceeds the cabin weight limit?",
          answer: "Book cargo hold transport with temperature control. Arrive extra early for crate inspection and loading.",
        },
      ],
      tips: [
        "Place an unwashed T-shirt inside the crate so your scent calms the pet.",
        "Use GPS-enabled collar tags to monitor location during long transfers.",
        "Carry a printed photo of your pet; helpful if ground staff need to identify the crate quickly.",
      ],
      internalLinks: [
        { label: "Wheelchairs & mobility aids", slug: "wheelchairs-walking-sticks" },
        { label: "Baby food & exemptions", slug: "baby-food-formula-flight" },
        { label: "Duty-free liquids in transit", slug: "duty-free-liquids-return" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "Air India Pet Travel Policy",
        url: "https://www.airindia.com/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
];

