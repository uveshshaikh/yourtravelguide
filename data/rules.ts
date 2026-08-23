import { Rule } from "./types";

export const rules: Rule[] = [
  {
    slug: "power-bank-in-flight",
    title: "Power Bank in Flight - Allowed or Not (India)?",
    shortTitle: "Power bank in flight",
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["power bank", "battery", "cabin baggage", "electronics"],
    searchAliases: ["portable charger", "charger", "battery bank", "power pack"],
    // Overrides the generic "Yes — Allowed" answer-card headline: for a rule
    // whose whole complexity is "allowed WHERE, not allowed WHERE", naming
    // both locations in the headline itself removes a full read-the-summary
    // step. See data/types.ts for the field.
    verdictHeadline: "Yes — power banks are allowed in cabin baggage",
    verdict: {
      status: "allowed",
      summary: "Not allowed in checked baggage.",
    },
    // Curates the "Related rules" section (Tier 0 in lib/relatedRules.ts) to
    // exactly these 3, instead of letting it auto-pad to 6 via subcategory/tag
    // matches. See components/RuleDetail.tsx's getRelatedRules call.
    internalLinks: ["dry-cells-spare-batteries", "smart-luggage", "laptops-electronics"],
    // Emptied deliberately: the fallback "Key highlights" section (RuleDetail.tsx)
    // reads from this when there are no checklists. Both are cut for this rule
    // per the answer-first restructure -- see richContent.checklists below.
    howToComply: [],
    whyRuleExists: "Lithium batteries can enter thermal runaway if damaged. Cabins allow crew intervention; cargo holds do not.",
    extraNotes: [],
    // Airline-specific guidance, verified against each airline's own current
    // published page (2026-08-08) -- see richContent.faqs and the sources list
    // below for the same verification. Two airlines only, per the "do not
    // create a giant airline table" instruction.
    sections: [
      {
        type: 'airlineGuidance',
        airlines: [
          {
            airline: 'Air India',
            guidance: 'Air India allows power banks up to 100Wh in cabin baggage, with a maximum of 2 power banks/spare batteries. They must be protected against short circuits.',
            sourceUrl: 'https://www.airindia.com/in/en/travel-information/baggage-guidelines/restricted-baggage.html',
            lastVerified: '2026-08-08',
          },
          {
            airline: 'IndiGo',
            guidance: "IndiGo requires power banks to be carried in hand baggage and kept within the passenger's reach. Its detailed baggage policy permits power banks up to 100Wh; its 100–160Wh exception is specifically for batteries used for portable medical devices and requires approval/security clearance.",
            sourceUrl: 'https://www.goindigo.in/information/baggage-policy.html',
            lastVerified: '2026-08-08',
          },
        ],
      },
    ],
    richContent: {
      quickAnswer:
        "Power banks are allowed in cabin/hand baggage, not checked baggage. Keep it at or below 100Wh — don't assume anything higher will be accepted without checking your airline first.",
      overview: [],
      checklists: [],
      table: {
        caption: "Power bank Wh thresholds",
        headers: ["Capacity", "Status"],
        rows: [
          ["Up to 100Wh", "✅ Generally allowed — carry in cabin baggage"],
          ["100–160Wh", "⚠️ Don't assume it's allowed — check your airline first"],
          ["Over 160Wh", "❌ Not permitted as passenger baggage"],
        ],
      },
      dos: [
        "Keep it in hand/cabin baggage.",
        "Protect the terminals from short circuits.",
        "If your cabin bag is gate-checked, remove the power bank and keep it with you.",
      ],
      donts: [
        "Do not put it in checked baggage.",
        "Do not carry a swollen or damaged battery.",
        "Do not assume a larger power bank is acceptable just because another battery category has an approval pathway.",
        "Do not assume another airline's rules apply to your flight.",
      ],
      examples: [
        "20,000mAh × 3.7V ÷ 1,000 ≈ 74Wh. Use the voltage and capacity printed by the manufacturer where available.",
      ],
      faqs: [
        {
          question: "Can I carry a power bank in checked baggage?",
          answer: "No. Power banks must travel in cabin/hand baggage, not checked baggage.",
        },
        {
          question: "Is a 20,000mAh power bank allowed?",
          answer: "A 20,000mAh power bank rated at 3.7V is about 74Wh. Check the Wh rating printed on your specific power bank where available.",
        },
        {
          question: "What if my power bank is over 100Wh?",
          answer: "Don't assume it is allowed. Check your airline's current baggage policy before travelling.",
        },
        {
          question: "Can I use or charge a power bank during the flight?",
          answer: "Air India and IndiGo do not allow power banks to be charged during the flight or used to charge another device. Follow your airline's current instructions before flying.",
        },
      ],
      tips: [],
      internalLinks: [
        { label: "Electronics tray etiquette", slug: "electronics-security-tray" },
      ],
      verifiedOn: "2026-08-08",
    },
    sources: [
      {
        label: "DGCA CAR Section 2 Series X Part II",
        url: "https://www.dgca.gov.in/",
      },
      {
        label: "Air India — Restricted Baggage & Prohibited Items",
        url: "https://www.airindia.com/in/en/travel-information/baggage-guidelines/restricted-baggage.html",
      },
      {
        label: "IndiGo — Baggage Policy",
        url: "https://www.goindigo.in/information/baggage-policy.html",
      },
      {
        label: "IATA — Lithium Battery Guidance for Passengers",
        url: "https://www.iata.org/en/youandiata/travelers/batteries/",
      },
    ],
    lastUpdated: "2026-08-08",
  },
  {
    slug: "passport-photocopy-valid",
    title: "Is a Passport Photocopy Enough at Indian Airports?",
    shortTitle: "Passport photocopy?",
    category: "travel-documents",
    subcategory: "passport",
    tags: ["passport", "photocopy", "id", "documents"],
    searchAliases: ["passport copy", "xerox passport"],
    verdict: {
      status: "not_allowed",
      summary: "Photocopies are not accepted as primary ID. Carry the original passport even for domestic flights if you intend to use it as ID.",
    },
    howToComply: [],
    whyRuleExists: "Airports rely on machine-readable passports and UV/IR checks that only work on originals, preventing forgery and impersonation.",
    extraNotes: [],
    richContent: {
      quickAnswer: "No Indian airport accepts a passport photocopy as your main ID. CISF officers insist on the original booklet because only it has the chip, UV fibers, and machine-readable zone they need to validate you in seconds.",
      overview: [],
      checklists: [
        {
          title: "If the passport goes missing",
          items: [
            "Use the photocopy to file the lost passport FIR at the nearest police station.",
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
      tips: [],
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
    category: "travel-documents",
    subcategory: "domestic-flight-id",
    tags: ["ticket", "name", "spelling", "documents"],
    verdict: {
      status: "limited",
      summary: "Minor spelling errors (1-2 characters) are usually accepted with supporting ID. Major differences require ticket correction before travel.",
    },
    howToComply: [],
    whyRuleExists: "Accurate manifests are mandatory for security screening and immigration control, so airlines must ensure every passenger’s identity matches government ID.",
    extraNotes: [],
    richContent: {
      quickAnswer: "Tiny typos (one or two letters) usually pass if your ID, photo, and PNR otherwise match. Anything bigger—missing surnames, swapped passengers, nickname vs legal name—needs an official name correction before you reach the airport.",
      overview: [
        "Domestic flights are more forgiving of small spelling slips if you show Aadhaar or PAN proving it's you. International routes are strict because visas, Advance Passenger Information (API), and watchlists rely on exact spelling matching your passport.",
      ],
      checklists: [],
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
      tips: [],
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
    category: "travel-documents",
    subcategory: "minor-travelling-alone",
    tags: ["kids", "infant", "id", "family"],
    verdict: {
      status: "allowed",
      summary: "Infants under 2 need birth certificate copies; children 2-12 need school ID, Aadhaar, or passport. Teenagers should carry government photo ID.",
    },
    howToComply: [],
    whyRuleExists: "Airlines must verify age-based fares and prevent trafficking, so every minor needs traceable identification.",
    extraNotes: [],
    richContent: {
      quickAnswer: "Every child flying out of or within India needs age-proof plus a photo ID that matches the ticket name. Babies can use a birth certificate, school-going kids can show Aadhaar or student ID, and teens should carry the same government photo IDs as adults.",
      overview: [
        "For international flights, every child—even six-month-olds—must have their own passport regardless of age. Several embassies also require a signed consent letter when only one parent is travelling.",
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
      tips: [],
      internalLinks: [
        { label: "Domestic ID checklist", slug: "domestic-id-requirements" },
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
    category: "travel-documents",
    subcategory: "passport",
    tags: ["passport", "expiry", "validity", "documents"],
    verdict: {
      status: "limited",
      summary: "International routes typically need 6 months validity from arrival; domestic flights accept any unexpired passport.",
    },
    howToComply: [],
    whyRuleExists: "Many immigration authorities refuse entry to passengers whose passports may expire during their stay, to avoid undocumented overstays.",
    extraNotes: [],
    richContent: {
      quickAnswer: "Most international destinations expect your passport to remain valid for six months beyond the day you land. Domestic flights only need a passport that hasn’t expired yet, but because airlines must follow the stricter rule of the toughest transit country, they check the six-month buffer at the departure counter.",
      overview: [
        "Some countries also demand blank pages for stamps or visas, not just validity — if your booklet is almost full, renew it together with the validity issue. Tatkaal renewals issue new passports within about 3 days if you're short on time.",
      ],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["laptop", "electronics", "checked bag", "security tray"],
    verdict: {
      status: "allowed",
      summary: "Cabin strongly recommended; checked baggage only if fully powered off and padded.",
    },
    howToComply: [],
    whyRuleExists: "Electronics contain lithium cells that can overheat. Keeping them in the cabin mitigates fire risk and reduces theft claims.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Carry laptops and tablets in cabin baggage, slide them into a separate tray at screening, and power them off fully if they ever need to be gate-checked. Checked baggage is a last resort because crews cannot reach a smoking battery in the hold.",
      overview: [],
      checklists: [],
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
      tips: [],
      internalLinks: [
        { label: "electronics screening at airport security", slug: "electronics-security-tray" },
        { label: "mobile phone baggage rules", slug: "mobile-phone-in-check-in" },
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
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["phone", "checked bag", "battery"],
    verdict: {
      status: "limited",
      summary: "Technically allowed but discouraged. Phones must be switched off if checked in.",
    },
    howToComply: [],
    whyRuleExists: "Phones use lithium cells just like power banks; cargo fire suppression is limited.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Phones technically can ride in checked baggage if they are switched off, but airlines hate the idea. Keep them in the cabin so you can monitor the battery, silence alarms, and produce it if the bag is flagged mid-flight.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    title: "Is DSLR Camera Allowed in Flight? Cabin Baggage Rules India",
    shortTitle: "Camera (DSLR)",
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["camera", "dslr", "lens", "photography"],
    verdict: {
      status: "allowed",
      summary: "Allowed in cabin. Pack heavy tripods or light stands in checked baggage.",
    },
    howToComply: [],
    whyRuleExists: "Optical gear is fragile and expensive. Cabin storage prevents shock damage and theft claims.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Yes, cameras and DSLR equipment are generally allowed on flights. Cabin baggage is usually the safer place for camera bodies and lenses; if equipment is checked, switch it off and protect it from damage. Spare batteries must stay in cabin baggage and be protected against short circuits.",
      overview: [
        "Camera bodies, lenses, memory cards, and chargers can generally travel in cabin baggage within the airline's size and weight allowance.",
        "Camera equipment may also be accepted in checked baggage, but loss and impact damage are practical concerns. Confirm the operating airline's current policy before checking expensive equipment.",
        "Tripods and light stands can be treated differently according to their size, weight, and shape. Check them when required by the airline or security staff, and cover pointed ends securely.",
      ],
      checklists: [],
      table: {
        caption: "Where each piece should travel",
        headers: ["Item", "Cabin or checked?", "Notes"],
        rows: [
          ["Camera body + primary lens", "Cabin", "Keeps sensors safe from knocks"],
          ["Spare lithium batteries", "Cabin", "Same rules as power banks"],
          ["Charger without a battery", "Cabin or checked", "Pack cables so they are easy to inspect"],
          ["Tripods/light stands", "Checked", "Cover spikes and remove heads"],
        ],
      },
      dos: [
        "Use a padded case and keep the camera within your airline's cabin size and weight allowance.",
        "Protect spare-battery terminals with individual covers, sleeves, or separate pouches.",
        "Check the operating airline's policy before travelling with a large tripod or professional kit.",
      ],
      donts: [
        "Don't put loose spare batteries in checked baggage.",
        "Don't leave checked camera equipment switched on or inadequately protected.",
        "Don't assume a tripod will be accepted in the cabin; its size and shape can affect screening.",
      ],
      faqs: [
        {
          question: "Can I carry a DSLR camera in cabin baggage?",
          answer: "Generally, yes, provided the camera bag fits the operating airline's cabin baggage allowance and clears security screening.",
        },
        {
          question: "Can camera batteries go in checked baggage?",
          answer: "Spare or loose batteries should be carried in cabin baggage and protected against short circuits. Check the airline's rules for a battery installed in a camera that you plan to check.",
        },
        {
          question: "Can I carry a tripod in cabin baggage?",
          answer: "It depends on the tripod's size and shape and on airline and security instructions. Large, heavy, or pointed tripods may need to travel in checked baggage.",
        },
      ],
      tips: [],
      internalLinks: [
        { label: "power bank rules for flights", slug: "power-bank-in-flight" },
        { label: "spare battery rules for camera gear", slug: "dry-cells-spare-batteries" },
        { label: "electronics screening at airport security", slug: "electronics-security-tray" },
      ],
      verifiedOn: "2026-08-23",
    },
    sources: [
      {
        label: "Air India Cabin Baggage Guidance",
        url: "https://www.airindia.com/in/en/travel-information/baggage-guidelines/cabin-baggage.html",
      },
    ],
    lastUpdated: "2026-08-23",
  },
  {
    slug: "dry-cells-spare-batteries",
    title: "Dry Cells and Spare Batteries",
    shortTitle: "Dry cells & spares",
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["battery", "dry cell", "aa", "aaa"],
    verdict: {
      status: "allowed",
      summary: "Allowed in cabin if individually protected. Not allowed loose in checked baggage.",
    },
    howToComply: [],
    whyRuleExists: "Short circuits from loose cells can ignite nearby flammable items.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Pack AA/AAA/9V cells in their retail pack or plastic sleeves and keep them in cabin baggage. Loose cells rolling around a backpack are confiscated because their terminals can short and ignite nearby fabric.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "cabin-baggage",
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
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Smart suitcases are fine only when the power module pops out before check-in. Security wants the lithium pack in your hand luggage so a short circuit doesn’t smoulder in the cargo hold.",
      overview: [
        "Coin-cell trackers such as AirTags (under 2g lithium, no charging port) are exempt from this rule and don't need to be removed — it's the USB power bricks and GPS/charging modules that must come out.",
      ],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "security-screening",
    tags: ["security", "tray", "electronics", "cisf"],
    verdict: {
      status: "allowed",
      summary: "Large electronics must be screened separately for clear X-ray images.",
    },
    howToComply: [],
    whyRuleExists: "Dense electronics can hide prohibited shapes on X-ray. Separate trays speed up CISF screening.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Lay each large electronic (laptop, tablet, camera, power bank) in its own tray with no cables on top. Clean, flat layouts let CISF clear you in seconds and prevent re-scans.",
      overview: [
        "Airports with CT scanners (Delhi T3, Bengaluru T2) sometimes allow laptops to remain in bags, but unless the queue marshal explicitly says so, stick to the classic separate-tray layout.",
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
      tips: [],
      internalLinks: [
        { label: "Laptop cabin rules", slug: "laptops-electronics" },
        { label: "Electronics behaviour tips", slug: "airport-security-behavior-tips" },
        { label: "camera and DSLR cabin guidance", slug: "camera-dslr-in-flight" },
        { label: "Bluetooth headphones on flights", slug: "bluetooth-headphones-flight" },
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
    category: "airport-rules",
    subcategory: "security-screening",
    tags: ["security", "behavior", "cisf", "tips"],
    verdict: {
      status: "allowed",
      summary: "Follow CISF etiquette to glide through checkpoints without delays.",
    },
    howToComply: [],
    whyRuleExists: "Standardised behavior keeps the X-ray image clean, reduces manual bag checks, and lets CISF maintain throughput during peak rush.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Security queues move faster when you pre-sort everything—ID ready, pockets empty, electronics visible, and attitude calm. Think of yourself as part of the team keeping the checkpoint flowing.",
      overview: [],
      checklists: [],
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
        "Use dedicated family/senior lanes where available; the pace is calmer and officers assist with bins.",
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["bluetooth", "headphones", "wearables"],
    verdict: {
      status: "allowed",
      summary: "Allowed in cabin mode with flight-safe settings. Must pause during safety demo and landing announcements.",
    },
    howToComply: [],
    whyRuleExists: "Bluetooth is low power but crew must ensure passengers can hear safety instructions.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Bluetooth headphones and wearables are fine in flight as long as the paired phone stays in flight mode and you pause audio during safety announcements. Crew can always ask you to take them off during taxi, take-off, and landing.",
      overview: [
        "On turboprop aircraft (ATR/Q400), some regional airlines still ask passengers to switch to wired headsets due to cockpit interference concerns — respect those airline-specific announcements even if a jet flight earlier the same day had no such restriction.",
      ],
      checklists: [],
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
      tips: [],
      internalLinks: [
        { label: "power bank rules for flights", slug: "power-bank-in-flight" },
        { label: "spare battery rules for electronics", slug: "dry-cells-spare-batteries" },
        { label: "electronics screening at airport security", slug: "electronics-security-tray" },
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
    category: "airport-rules",
    subcategory: "liquids-aerosols-gels",
    tags: ["perfume", "deodorant", "liquid", "cabin"],
    verdict: {
      status: "limited",
      summary: "Cabin limit 100ml per bottle inside a 1L clear bag. Larger bottles go in checked baggage.",
    },
    howToComply: [],
    whyRuleExists: "Liquids above 100ml can conceal explosives and aerosols are flammable.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Perfumes, deodorants, and body sprays count as liquids/aerosols. Keep each cabin bottle under 100ml inside a clear 1L zip bag; larger bottles belong in checked baggage with leak-proof packing.",
      overview: [
        "Aerosol propellants are flammable, so total toiletry aerosols in checked baggage can't exceed 2L/2kg per passenger, and industrial sprays (paint, insecticide) are banned outright regardless of size.",
      ],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "liquids-aerosols-gels",
    tags: ["sanitizer", "liquid", "alcohol"],
    verdict: {
      status: "limited",
      summary: "Cabin limit 100ml per container, same as any other liquid — the 350ml pandemic-era allowance ended. Checked baggage allows larger bottles if sealed.",
    },
    howToComply: [],
    whyRuleExists: "Sanitizers contain ethanol or IPA, which is flammable; the limit balances hygiene with safety.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Hand sanitizer follows the standard 100ml-per-container liquid rule in cabin baggage, inside your 1L clear bag. The pandemic-era 350ml exemption ended and is no longer honoured at security. Larger refills go in checked baggage, sealed and cushioned.",
      overview: [
        "During the pandemic, BCAS/MoCA temporarily raised the cabin sanitizer limit to 350ml. That relaxation has since ended — sanitizer is back to the standard 100ml liquid rule. If you come across older advice quoting 350ml, treat it as out of date.",
      ],
      checklists: [],
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
          answer: "No. The allowance is based on volume, not texture. Keep container size within 100ml.",
        },
        {
          question: "Can I carry industrial disinfectants?",
          answer: "Not in cabin. They require dangerous goods clearance. Stick to consumer-grade hand rubs.",
        },
        {
          question: "Is sanitizer exempt from the 100ml rule like medicines or baby food?",
          answer: "No. Only medically necessary liquids and baby food/formula get an exemption from the 100ml limit. Sanitizer is treated as a standard liquid.",
        },
      ],
      tips: [],
      internalLinks: [
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
        { label: "Perfume & aerosol guide", slug: "perfume-in-flight" },
        { label: "Shampoo & lotion allowances", slug: "shampoo-and-lotions" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "BCAS LAGs Directive (current 100ml liquid rule)",
        url: "https://www.bcasindia.gov.in/",
      },
      {
        label: "MoCA Circular AVSEC-06/2020 (historical 350ml exemption, since ended)",
        url: "https://www.civilaviation.gov.in/",
      },
    ],
    lastUpdated: "2025-12-04",
  },
  {
    slug: "shampoo-and-lotions",
    title: "Shampoo, Lotions, and Creams",
    shortTitle: "Shampoo & lotions",
    category: "airport-rules",
    subcategory: "liquids-aerosols-gels",
    tags: ["shampoo", "lotion", "cream", "toiletry"],
    verdict: {
      status: "limited",
      summary: "Treat as liquids/gels. Cabin limit 100ml per container inside the 1L bag.",
    },
    howToComply: [],
    whyRuleExists: "LAG (liquids, aerosols, gels) restrictions standardised with ICAO rules.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Liquids, gels, and creams such as shampoo, conditioner, lotion, and facewash must stay in 100ml-or-smaller containers when travelling in cabin. Bigger bottles belong in checked baggage with lids taped and placed inside leak-proof pouches.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "liquids-aerosols-gels",
    tags: ["makeup", "cosmetics", "lipstick", "eyeliner"],
    verdict: {
      status: "limited",
      summary: "Liquid or gel-based makeup counts toward the 100ml rule; compact powders are exempt.",
    },
    howToComply: [],
    whyRuleExists: "Many cosmetic products have flammable solvents or pastes that fall under the LAG definition.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Liquid or gel cosmetics—mascara, eyeliner, foundation, liquid lipstick—count towards the 100ml liquids rule. Powders, pencils, and solid sticks are exempt but should stay capped to avoid smudging.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "liquids-aerosols-gels",
    tags: ["nail polish", "acetone", "cosmetics"],
    verdict: {
      status: "limited",
      summary: "Allowed in cabin up to 100ml and in checked bags up to 0.5L per container.",
    },
    howToComply: [],
    whyRuleExists: "Solvents release fumes and fall under dangerous goods when volumes are higher.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Nail polish and removers are flammable liquids. Carry up to 100ml in cabin (inside the liquids pouch) and up to 0.5L per container in checked baggage, with lids taped and bottles cushioned.",
      overview: [
        "Metal manicure tools, UV lamps, and nail drills add another layer: any bladed cuticle tool must be checked in, and UV/LED lamps should stay in their original foam packaging to avoid cracked bulbs.",
      ],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "liquids-aerosols-gels",
    tags: ["liquid", "bottle", "security"],
    verdict: {
      status: "not_allowed",
      summary: "Liquids above 100ml per container are banned from cabin unless exempt (baby food/medicines).",
    },
    howToComply: [],
    whyRuleExists: "Global post-2006 rules limit liquid explosive components in cabin baggage.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Any liquid, gel, aerosol, paste, or cream over 100ml per container is banned from cabin baggage unless covered by a medical or baby-food exemption. Checked baggage can hold larger quantities, but pack them securely.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "liquids-aerosols-gels",
    tags: ["hair oil", "ghee", "butter", "liquid"],
    verdict: {
      status: "limited",
      summary: "Counts as liquid/gel. Cabin up to 100ml; checked baggage allowed with leak-proof packing.",
    },
    howToComply: [],
    whyRuleExists: "Fats behave like gels in scanners and can conceal liquids.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Hair oil, ghee, butter, and similar semi-solid fats count as gels. Keep them under 100ml in cabin (inside the liquids pouch) and pack larger jars in checked baggage with screw-top lids, shrink wrap, and absorbent padding.",
      overview: [
        "Even if ghee is solid at room temperature, scanners treat it like a gel because it softens quickly. Officers swab opaque tins to check for explosive residue, so transparent containers speed things up.",
      ],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["medicine", "prescription", "tablets"],
    verdict: {
      status: "allowed",
      summary: "Tablets and essential meds are allowed in both cabin and checked baggage; carry prescriptions for controlled drugs.",
    },
    howToComply: [],
    whyRuleExists: "Passengers need uninterrupted medical support but authorities must curb misuse of narcotic-class medicines.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Tablets, essential medicines, and small medical devices belong in your cabin bag. Keep prescriptions handy for anything controlled, declare liquids over 100ml, and store everything in clearly labelled pouches.",
      overview: [
        "Controlled substances (strong painkillers, sedatives) need supporting documents — a doctor letter, a prescription with your name, and ideally the original pharmacy label. Without them, customs or CISF may confiscate the medication.",
      ],
      checklists: [],
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
      tips: [],
      internalLinks: [
        { label: "Insulin & syringes", slug: "insulin-syringes-flight" },
        { label: "CPAP and medical devices", slug: "cpap-medical-devices" },
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
        { label: "asthma inhalers in cabin baggage", slug: "asthma-inhaler-flight" },
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
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["insulin", "syringe", "diabetes"],
    verdict: {
      status: "allowed",
      summary: "Allowed in cabin with proof of medical need. Needles must remain capped until use.",
    },
    howToComply: [],
    whyRuleExists: "Airlines must facilitate chronic care while preventing weaponisation of needles.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Insulin, injections, and syringes are allowed in cabin when you carry a doctor letter or prescription with your name. Keep needles capped, store insulin in insulated pouches, and inform the airline if you need to refrigerate or plug in devices mid-flight.",
      overview: [
        "Insulin and many biologics prefer temperatures between 2–8°C. Carry a compact cooler bag with gel packs (declared as a medical exemption) — cabin crew may allow galley fridge storage on long-haul flights but aren't obligated to, so plan for self-reliance.",
      ],
      checklists: [],
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
      tips: [],
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
    title: "Is an Asthma Inhaler Allowed in Flight?",
    shortTitle: "Asthma inhaler",
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["asthma", "inhaler", "medicine"],
    verdict: {
      status: "allowed",
      summary: "Metered-dose inhalers are exempt from the 100ml limit but should be declared if metallic.",
    },
    howToComply: [],
    whyRuleExists: "Respiratory attacks need immediate relief; restrictions could endanger passengers.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Yes, asthma inhalers are generally allowed in cabin baggage. Keep essential medication accessible, in its original or clearly labelled packaging where possible, and carry a prescription or supporting document when relevant—especially for liquid medication, nebulizer supplies, or international travel.",
      overview: [
        "Cabin baggage is the practical place for an inhaler because checked bags can be delayed or unavailable during the flight. If you also pack a backup in checked baggage, protect it from damage and follow the product's storage instructions.",
        "Medicine and liquid exceptions still go through airport security screening. Be ready to identify the inhaler and any related liquid medication, and follow the security officer's instructions.",
        "For international journeys, check the operating airline and the official medicine-entry guidance for the destination and any transit country. Documentation expectations can vary.",
        "Nebulizer plug points for in-flight power are only available on limited aircraft, so notify the airline in advance if you'll need one rather than assuming it will be there.",
      ],
      checklists: [],
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
        "Keep the inhaler where you can reach it rather than deep inside a bag.",
        "Retain the original label or packaging where practical.",
        "Ask the airline in advance about a nebulizer or other powered medical device.",
      ],
      donts: [
        "Don't put your only inhaler in checked baggage.",
        "Don't assume another country's medicine or documentation rules match India's.",
        "Don't rely on onboard power for a nebulizer unless the airline has confirmed availability and use.",
      ],
      faqs: [
        {
          question: "Can I carry an inhaler through airport security?",
          answer: "Generally, yes. Present it for screening when asked and follow the security officer's instructions.",
        },
        {
          question: "Do I need a prescription for an inhaler on a flight?",
          answer: "Requirements can vary by product and journey. Carrying the prescription or another supporting document can help with screening and international checks.",
        },
        {
          question: "Can an inhaler go in checked baggage?",
          answer: "A backup may be accepted in checked baggage, but essential medication is better kept accessible in the cabin. Confirm storage and airline requirements before travel.",
        },
      ],
      tips: [],
      internalLinks: [
        { label: "Medicines in cabin", slug: "medicines-in-flight" },
        { label: "Insulin & syringe guidance", slug: "insulin-syringes-flight" },
        { label: "CPAP and medical devices", slug: "cpap-medical-devices" },
      ],
      verifiedOn: "2026-08-23",
    },
    sources: [
      {
        label: "Air India Cabin Baggage Guidance",
        url: "https://www.airindia.com/in/en/travel-information/baggage-guidelines/cabin-baggage.html",
      },
    ],
    lastUpdated: "2026-08-23",
  },
  {
    slug: "cpap-medical-devices",
    title: "CPAP Machines and Medical Devices",
    shortTitle: "CPAP & devices",
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["cpap", "medical device", "special assistance"],
    verdict: {
      status: "allowed",
      summary: "CPAP machines are generally permitted, but cabin allowance, advance notice, documents, and onboard-use rules depend on the operating airline.",
    },
    howToComply: [],
    whyRuleExists: "Ensures continuous breathing support while maintaining electrical safety standards.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "You can generally travel with a CPAP machine. Keep it in cabin baggage where possible, ask the operating airline whether it is treated as an additional medical item, and confirm its notice, documentation, and battery requirements before flying.",
      overview: [],
      checklists: [],
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
          question: "Does a CPAP machine count as carry-on baggage?",
          answer: "It depends on the operating airline and route. Some airlines treat a bag containing only an assistive medical device separately from the normal cabin allowance, while others require confirmation. Check the airline's policy before travel and avoid packing unrelated personal items in the CPAP bag.",
        },
        {
          question: "Can a CPAP machine go in checked baggage?",
          answer: "Some airlines accept CPAP machines as checked baggage, but keeping the device in the cabin is usually safer when you may need it or cannot risk loss or damage. If you check it, protect the machine carefully, carry spare lithium batteries in the cabin, and confirm the operating airline's rules.",
        },
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
      tips: [],
      internalLinks: [
        { label: "Medicines in cabin", slug: "medicines-in-flight" },
        { label: "Wheelchair & mobility guide", slug: "wheelchairs-walking-sticks" },
        { label: "Power bank watt-hour limits", slug: "power-bank-in-flight" },
      ],
      verifiedOn: "2025-12-06",
    },
    sources: [
      {
        label: "Air India Special Needs Guidance",
        url: "https://www.airindia.com/in/en/travel-information/visa-documents/travel-to-united-states/special-needs.html",
      },
      {
        label: "US DOT Assistive Device Stowage Guide",
        url: "https://www.transportation.gov/resources/individuals/aviation-consumer-protection/assistive-device-guides/assistive-device-stowage",
      },
    ],
    lastUpdated: "2026-08-23",
  },
  {
    slug: "wheelchairs-walking-sticks",
    title: "Wheelchairs and Walking Sticks",
    shortTitle: "Wheelchairs & sticks",
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["wheelchair", "mobility", "special assistance"],
    verdict: {
      status: "allowed",
      summary: "Manual aids allowed in cabin after security check. Battery wheelchairs need advance approval.",
    },
    howToComply: [],
    whyRuleExists: "Passengers with reduced mobility rely on assistive aids; rules ensure safety without discrimination.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Manual wheelchairs and walking sticks can accompany you up to the aircraft door after screening. Battery-powered chairs need advance approval, insulated terminals, and removable lithium packs brought into the cabin.",
      overview: [],
      checklists: [],
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
        "Book wheelchair assistance at least 48 hours ahead so the right equipment is waiting at departure and arrival.",
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
      tips: [],
      internalLinks: [
        { label: "CPAP & medical devices", slug: "cpap-medical-devices" },
        { label: "Power bank rules", slug: "power-bank-in-flight" },
        { label: "medicines in cabin baggage", slug: "medicines-in-flight" },
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
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["baby food", "formula", "infant"],
    verdict: {
      status: "allowed",
      summary: "Exempt from 100ml rule when traveling with an infant. Must be presented for screening separately.",
    },
    howToComply: [],
    whyRuleExists: "Babies need regular feeding; exemptions avoid depriving them while still allowing screening.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Baby milk, expressed breast milk, formula, and purees are exempt from the 100ml liquid rule when the infant or toddler travels with you. Declare them at security, keep only what you need for the journey, and use insulated containers to manage temperature.",
      overview: [
        "Breast pumps and warmers are also allowed in cabin — pack them near the top of the bag so they're easy to present for inspection.",
      ],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["food", "snacks", "homemade", "fruits"],
    verdict: {
      status: "limited",
      summary: "Dry vegetarian or non-vegetarian snacks allowed in cabin; oily curries and gravies must be checked.",
    },
    howToComply: [],
    whyRuleExists: "Security needs to see food texture on X-ray and prevent leaks that damage baggage systems.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Dry snacks, sandwiches, and cut fruits are fine in cabin as long as they aren’t greasy or liquid-heavy. Curries, chutneys, and gravies fall under the 100ml liquid rule and should go in checked baggage.",
      overview: [
        "International customs at your destination may restrict meat, seeds, or dairy even though Indian security has no objection to carrying homemade food out of the country.",
        "Dry coconut (copra) is prohibited in cabin baggage due to fire risk, regardless of how it's packed.",
      ],
      checklists: [],
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
      tips: [],
      internalLinks: [
        { label: "chocolates in cabin and checked baggage", slug: "chocolates-on-flight" },
        { label: "baby food and formula at security", slug: "baby-food-formula-flight" },
        { label: "tea and coffee powder rules", slug: "tea-coffee-powder" },
        { label: "liquid restrictions for food and drinks", slug: "liquids-over-100ml" },
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
    category: "airport-rules",
    subcategory: "liquids-aerosols-gels",
    tags: ["water", "bottle", "hydration"],
    searchAliases: ["empty bottle", "drinking bottle", "reusable bottle"],
    verdict: {
      status: "limited",
      summary: "Full bottles banned at security; empty bottles allowed and can be refilled post-screening.",
    },
    howToComply: [],
    whyRuleExists: "Liquid explosive rules require inspection of all water containers before boarding.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Bring an empty bottle through security, then refill it at airport fountains or kiosks. Full bottles over 100ml are confiscated, while medicinal/infant water is allowed if declared.",
      overview: [],
      checklists: [],
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
      tips: [],
      internalLinks: [
        { label: "Empty vs filled bottles", slug: "empty-bottles-vs-liquid" },
        { label: "Baby food exemption", slug: "baby-food-formula-flight" },
        { label: "Liquids over 100ml", slug: "liquids-over-100ml" },
      ],
      verifiedOn: "2025-12-06",
    },
    sections: [
      {
        type: "airlineGuidance",
        airlines: [
          {
            airline: "Air India",
            guidance:
              "Liquids, aerosols and gels (including water) must each be in a container of 100ml or less — a container over 100ml is not accepted at security even if it holds less water than that.",
            sourceUrl: "https://www.airindia.com/in/en/travel-information/baggage-guidelines/restricted-baggage.html",
            notes: [
              "Medicines with a valid prescription, inhalers, and baby food are treated as exceptions to this limit.",
            ],
            lastVerified: "2026-08-02",
          },
          {
            airline: "IndiGo",
            guidance:
              "Liquids in hand baggage must be in containers with a maximum volume of 100ml each, and all such containers must fit comfortably inside one transparent, re-sealable 1-litre bag.",
            sourceUrl: "https://www.goindigo.in/travel-information/en/baggage-allowance.html",
            lastVerified: "2026-08-02",
          },
        ],
      },
      {
        type: "airportGuidance",
        airports: [
          {
            airport: "Delhi (DEL) — Indira Gandhi International Airport",
            guidance:
              "Free drinking water fountains are available at various locations inside the terminal building.",
            facilityInfo:
              "Packaged water is also sold at Maximum Retail Price (MRP) through vending machines and food outlets.",
            sourceUrl: "https://x.com/DelhiAirport/status/1894373011114913814",
            lastVerified: "2026-08-02",
          },
          {
            airport: "Mumbai (BOM) — Chhatrapati Shivaji Maharaj International Airport",
            guidance: "Water bottle refill stations are available at Terminal 2.",
            facilityInfo:
              "Drinking water can also be purchased from vending machines located across the terminal.",
            sourceUrl: "https://x.com/CSMIA_Official/status/2003699027603271819",
            lastVerified: "2026-08-02",
          },
        ],
      },
      {
        type: "domesticInternationalGuidance",
        domestic:
          "No official distinction was found. Air India's and IndiGo's own baggage pages state the 100ml-per-container liquids rule without carving out a separate, looser limit for domestic departures.",
        international:
          "No official distinction was found. The same 100ml-per-container rule applies at international departures too — neither airline's official page states a stricter or different limit specifically for international flights.",
        sourceUrls: [
          "https://www.airindia.com/in/en/travel-information/baggage-guidelines/restricted-baggage.html",
          "https://www.goindigo.in/travel-information/en/baggage-allowance.html",
        ],
        lastVerified: "2026-08-02",
      },
      {
        type: "waterSafety",
        guidance:
          "No official statement from Delhi (DIAL) or Mumbai (CSMIA) airport operators was found confirming that refill-station or terminal tap water is safe to drink. This page does not assert water quality either way. If you're unsure, use the packaged bottled water sold at airport vending machines and food outlets instead (see Airport Guidance above).",
        safetyNotes: [
          "Mumbai Airport's own official complaints portal has a logged, unresolved passenger complaint (10 June 2024) describing a chlorine/bleaching-powder smell in the international terminal's drinking-water taps, with no documented official response.",
          "No equivalent complaint or statement — positive or negative — was found for Delhi (DEL).",
        ],
        exceptions: [
          "Sealed, packaged bottled water sold at airport vending machines and food outlets is a separately regulated product and isn't covered by this uncertainty.",
        ],
        sourceUrls: [
          "https://mumbaiairport.in/complaints/regarding-quality-of-the-drinking-water-provided-in-mumbai-international-terminal-drinking-water-taps/",
        ],
        lastVerified: "2026-08-02",
      },
      {
        type: "securityProcess",
        steps: [
          "Your cabin baggage, including any water bottle, goes through X-ray screening before you're allowed to board — confirmed on Air India's own passenger guidance.",
          "Any liquid you're carrying, including water, must be in a container of 100ml or less; a container over 100ml is not accepted even if it holds less liquid than that (Air India, IndiGo).",
          "All permitted liquid containers (100ml or less) must fit inside one transparent, re-sealable bag of up to 1 litre (IndiGo).",
          "Neither airline's official guidance describes checkpoint-level detail beyond this — for example, tray placement order or whether a bottle is screened separately from other items. That level of procedural detail wasn't found in an official source, so it isn't included here.",
        ],
        sourceUrls: [
          "https://www.airindia.com/in/en/frequently-asked-questions/baggage.html",
          "https://www.airindia.com/in/en/travel-information/baggage-guidelines/restricted-baggage.html",
          "https://www.goindigo.in/travel-information/en/baggage-allowance.html",
        ],
        lastVerified: "2026-08-02",
      },
    ],
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
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["tea", "coffee", "powder", "customs"],
    verdict: {
      status: "allowed",
      summary: "Allowed in both cabin and checked baggage if sealed. Large commercial quantities are subject to customs.",
    },
    howToComply: [],
    whyRuleExists: "Powders obscure X-ray images; sealed packs help officers distinguish harmless goods from suspicious materials.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Pack tea and coffee powder in sealed retail pouches or vacuum bags. Cabin carriage is fine for personal quantities, but declare anything above 1kg or if flying through countries with strict powder limits (USA, Australia).",
      overview: [
        "The US TSA enforces a separate-screening rule for powders over 350g (12oz) in cabin baggage — if you're transiting through a US airport, keep tea/coffee powder under that threshold or pack it in checked baggage instead.",
      ],
      checklists: [],
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
      tips: [],
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
    title: "Is Chocolate Allowed in Flight? Cabin and Checked Baggage",
    shortTitle: "Chocolates",
    category: "airport-rules",
    subcategory: "cabin-baggage",
    tags: ["chocolate", "duty free", "gifts"],
    verdict: {
      status: "allowed",
      summary: "Chocolate is generally allowed in both cabin and checked baggage; liquid products and customs rules need extra attention.",
    },
    howToComply: [],
    whyRuleExists: "Food imports are regulated for commercial quantities but personal use is fine.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Yes, chocolates are generally allowed in both cabin and checked baggage. However, liquid or semi-liquid chocolate products may be treated under cabin liquid rules, and international customs or biosecurity restrictions may require additional checks.",
      overview: [
        "On domestic flights in India, solid chocolate can generally travel in cabin or checked baggage within your airline's baggage allowance. Keep it packed so it remains easy to inspect and does not leak or melt onto other belongings.",
        "Chocolate sauce, spread, ganache, and other liquid or semi-liquid products can be screened as liquids or gels in cabin baggage. Check the airport and operating airline's current liquid guidance before travel.",
        "For international flights, the destination and transit countries may apply customs, food-import, or biosecurity rules. Commercial-looking quantities can also receive closer attention, so use official destination guidance and declare food when required.",
      ],
      checklists: [],
      table: {
        caption: "How different chocolate products are handled",
        headers: ["Chocolate type", "Where to pack", "What to check"],
        rows: [
          ["Solid bars or boxed chocolates", "Cabin or checked baggage", "Airline weight allowance and protective packing"],
          ["Chocolate spread, sauce, or soft filling", "Check cabin liquid rules", "Container size and security screening"],
          ["Large or commercial-looking quantity", "Check customs guidance", "Declaration, duty, or food-import requirements"],
        ],
      },
      dos: [
        "Seal chocolate in a leak-resistant bag and use a rigid outer box for delicate pieces.",
        "Keep labels and receipts for international travel, especially for gift boxes or multiple packs.",
        "Check destination customs and food-import guidance before carrying chocolate across a border.",
      ],
      donts: [
        "Don't assume chocolate spread or sauce will be screened like a solid chocolate bar.",
        "Don't pack unsealed chocolate where melting could damage baggage.",
        "Don't assume permission to carry food on the flight means it can enter every destination country.",
      ],
      faqs: [
        {
          question: "Can I keep chocolates in cabin baggage?",
          answer: "Solid chocolates are generally allowed in cabin baggage within the airline's allowance. Liquid and semi-liquid chocolate products need to follow the applicable cabin liquid and security rules.",
        },
        {
          question: "Can chocolate go in checked baggage?",
          answer: "Generally, yes. Pack it securely against crushing, leakage, and temperature changes, and keep the bag within the airline's checked-baggage allowance.",
        },
        {
          question: "How much chocolate can I carry?",
          answer: "There is no single quantity answer for every journey. Airline baggage allowances apply, while international customs may assess value, personal-use context, and destination food-import rules.",
        },
      ],
      tips: [],
      internalLinks: [
        { label: "food and snacks in cabin baggage", slug: "food-and-snacks-in-flight" },
        { label: "liquid and gel rules for cabin baggage", slug: "liquids-over-100ml" },
        { label: "cabin baggage size and weight rules", slug: "cabin-bag-count-dimensions" },
      ],
      verifiedOn: "2026-08-23",
    },
    sources: [
      {
        label: "CBIC Guide for International Travellers",
        url: "https://www.cbic.gov.in/entities/internationalTravellers",
      },
    ],
    lastUpdated: "2026-08-23",
  },
  {
    slug: "razor-cartridge-vs-blade",
    title: "Razor Types in Cabin Baggage",
    shortTitle: "Razors in cabin",
    category: "airport-rules",
    subcategory: "restricted-items",
    tags: ["razor", "blade", "shaving"],
    verdict: {
      status: "limited",
      summary: "Disposable cartridge razors allowed in cabin; safety razors with loose blades must be checked.",
    },
    howToComply: [],
    whyRuleExists: "Exposed blades can be weaponized; cartridges shield the sharp edges.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Disposable cartridge razors and electric trimmers are cabin-safe. Safety razors with removable blades, straight razors, and spare blades must go in checked baggage because exposed edges are treated as weapons.",
      overview: [],
      checklists: [],
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
          answer: "If they expose a blade at all, check them in. Small plastic-guarded razors usually pass but depend on officer discretion.",
        },
        {
          question: "Can electric trimmers stay in checked baggage?",
          answer: "Yes, but remove lithium batteries or ensure they’re switched off to avoid vibration incidents.",
        },
      ],
      tips: [],
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
    category: "airport-rules",
    subcategory: "restricted-items",
    tags: ["scissors", "nail cutter", "hand tool"],
    verdict: {
      status: "not_allowed",
      summary: "Scissors, knives, and pointed tools must go in checked baggage — there's no reliable cabin exemption by blade length. Small blunt nail cutters allowed at CISF discretion.",
    },
    howToComply: [],
    whyRuleExists: "Sharp points pose a hijacking risk and can injure crew or passengers.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Scissors, knives, and pointed tools belong in checked baggage — India doesn't publish a reliable cabin exemption based on blade length, unlike some other countries. Small blunt nail cutters often pass at officer discretion, but scissors, screwdrivers, multitools, and needles with sharp tips should be checked in to avoid confiscation.",
      overview: [
        "Kirpans have a narrow exemption: Indian nationals of Sikh faith may carry blades under 6 inches (blade) and 9 inches total, but only on domestic flights and with prior permission.",
      ],
      checklists: [],
      table: {
        caption: "Sharp item matrix",
        headers: ["Item", "Cabin", "Notes"],
        rows: [
          ["Nail cutter", "⚠️ Depends", "Allowed if blunt"],
          ["Scissors", "❌", "Checked baggage only"],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "restricted-items",
    tags: ["knife", "weapon", "blade"],
    verdict: {
      status: "not_allowed",
      summary: "Knives of any size are banned from cabin baggage and must be checked with protective sheaths.",
    },
    howToComply: [],
    whyRuleExists: "Zero-tolerance policy prevents edged weapons from entering the passenger cabin.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Knives of any size are banned from cabin baggage. Pack them in checked luggage with blade guards, declare ceremonial knives (kirpans) if eligible, and be ready for extra screening if the knife has high value or unusual design.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "restricted-items",
    tags: ["tools", "hammer", "screwdriver"],
    verdict: {
      status: "not_allowed",
      summary: "Hand tools must be checked. Cabin carriage is banned due to hijack risk.",
    },
    howToComply: [],
    whyRuleExists: "Tools can be used as blunt weapons or to tamper with aircraft fixtures.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Hand tools—hammers, screwdrivers, spanners, drill bits—must go in checked baggage. Bundle them securely, remove lithium batteries from power tools, and declare unusual items to avoid baggage recalls.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "liquids-aerosols-gels",
    tags: ["aerosol", "spray", "flammable"],
    verdict: {
      status: "limited",
      summary: "In checked baggage, toiletry aerosols allowed up to 500ml per can and 2L total. In cabin, they still follow the standard 100ml liquid rule. Non-toiletry aerosols banned outright.",
    },
    howToComply: [],
    whyRuleExists: "Pressurised containers may explode or leak flammable propellants.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "In checked baggage, toiletry aerosols (deodorant, hairspray, shaving foam) are allowed up to 500ml per can and 2L total per passenger. In cabin baggage, the same 100ml-per-container liquid rule applies as any other liquid. Non-toiletry sprays (paint, insecticide) are banned entirely regardless of where they're packed.",
      overview: [],
      checklists: [],
      table: {
        caption: "Aerosol allowance snapshot",
        headers: ["Aerosol type", "Cabin", "Checked"],
        rows: [
          ["Deodorant 90ml", "✅ Within 100ml", "✅"],
          ["Hairspray 400ml", "❌ Over 100ml", "✅ Up to 500ml"],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "restricted-items",
    tags: ["matchbox", "lighter", "fire"],
    verdict: {
      status: "limited",
      summary: "One small box of safety matches or one refillable lighter allowed on person only.",
    },
    howToComply: [],
    whyRuleExists: "Fire sources must remain under passenger control to prevent accidental ignition inside bags.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "One small box of safety matches or one standard lighter is allowed on your person—not in cabin bags. Torch lighters, refills, fuel canisters, and multiple lighters are banned. Never place matches or lighters in checked baggage.",
      overview: [
        "Many foreign airports confiscate even standard lighters during security transit, so if you're connecting internationally, carry a cheap disposable one you can surrender without fuss.",
      ],
      checklists: [],
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
      tips: [],
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
    category: "travel-documents",
    subcategory: "domestic-flight-id",
    tags: ["id", "domestic", "boarding"],
    verdict: {
      status: "allowed",
      summary: "Carry one government-issued photo ID. Digital IDs in DigiLocker or mAadhaar are accepted.",
    },
    howToComply: [],
    whyRuleExists: "CISF verifies identity before entering the terminal to maintain secure areas.",
    extraNotes: [],
    richContent: {
      quickAnswer: "Carry one original, government-issued photo ID for every passenger entering an Indian airport. CISF accepts Passport, Aadhaar, PAN, Driving Licence, Voter ID, Service IDs, and for students, a school or college card with a photo.",
      overview: [
        "Digital IDs inside DigiLocker and mAadhaar are valid because they are authenticated copies pulled directly from government servers — gallery screenshots or old printouts are not accepted.",
      ],
      checklists: [
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
      tips: [],
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
    category: "travel-documents",
    subcategory: "domestic-flight-id",
    tags: ["aadhaar", "digital id", "digilocker"],
    searchAliases: ["aadhar", "adhaar", "uidai id", "uidai"],
    verdict: {
      status: "limited",
      summary: "Printed Aadhaar photocopies accepted if QR code is legible. Photos on phone accepted only via mAadhaar/DigiLocker, not gallery images.",
    },
    howToComply: [],
    whyRuleExists: "Prevents forged IDs while supporting paperless travel initiatives.",
    extraNotes: [],
    richContent: {
      quickAnswer: "DigiLocker and mAadhaar are accepted at Indian airports as long as you show the live, in-app document with the QR code. Plain screenshots from your gallery are not enough because security can’t verify them.",
      overview: [
        "Set up your DigiLocker account days before travel, not in the security queue — many passengers try to sign up on the spot, forget their OTP, and delay everyone behind them. Once it's linked to your Aadhaar or driving licence, the document stays cached offline.",
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "security-screening",
    tags: ["boarding pass", "digital", "mobile"],
    verdict: {
      status: "allowed",
      summary: "QR boarding passes on airline apps or email are accepted at entry, security, and boarding.",
    },
    howToComply: [],
    whyRuleExists: "Digital passes speed up flow and reduce counter queuing.",
    extraNotes: [],
    richContent: {
      quickAnswer: "Yes, Indian airports accept mobile boarding passes shown on airline apps, emails, or wallets. Ensure the QR/barcode is bright, uncracked, and available offline before you join the queue.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    title: "Is a Printed Flight Ticket Required at Indian Airports?",
    shortTitle: "Printed ticket?",
    category: "airport-rules",
    subcategory: "security-screening",
    tags: ["ticket", "print", "boarding"],
    verdict: {
      status: "allowed",
      summary: "A printed ticket is generally optional; keep your e-ticket or boarding pass available on your phone and carry the required ID.",
    },
    howToComply: [],
    whyRuleExists: "Digital records are cross-checked with airline systems; paper is optional but handy in emergencies.",
    extraNotes: [],
    richContent: {
      quickAnswer: "No, a printed flight ticket is generally not required at Indian airports. Keep the airline's e-ticket or booking confirmation available on your phone for airport entry, carry the required identity document, and use your mobile or printed boarding pass after check-in.",
      overview: [
        "An e-ticket or booking confirmation and a boarding pass serve different stages of the journey. Before check-in, your booking details can establish the flight you are taking; after check-in, keep the issued boarding pass ready for security and boarding.",
        "Download the document or take a clear screenshot before leaving for the airport so it remains available without mobile data. The passenger name, flight details, and barcode or QR code should be readable.",
        "A printed copy can still be useful if your phone battery fails, you are assisting someone who is less comfortable using a phone, or an overseas airport, visa, or transit process asks for paper evidence. Check journey-specific requirements in advance.",
      ],
      checklists: [],
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
        "Download the e-ticket and boarding pass for offline access.",
        "Carry the identity document required for your route.",
        "Check the airline and departure airport if your itinerary has an unusual entry, visa, or transit requirement.",
      ],
      donts: [
        "Don't rely on a document that is only accessible with an internet connection.",
        "Don't crop out the passenger name, flight details, or scannable code.",
        "Don't treat an e-ticket as a substitute for the required identity document.",
      ],
      faqs: [
        { question: "Can I show my flight ticket on my phone?", answer: "Generally, yes. Keep the airline-issued e-ticket or booking confirmation readable and available offline, and carry the required passenger ID." },
        { question: "What should I show at airport entry and security?", answer: "At entry, be ready with your flight booking details and required ID. After check-in, keep the issued boarding pass ready for security and boarding, following local airport instructions." },
        { question: "When is a printed ticket useful?", answer: "It is a practical backup for a dead or lost phone and may help on international, visa, or transit journeys where another authority asks for paper evidence." },
      ],
      tips: [],
      internalLinks: [
        { label: "Digital boarding pass", slug: "digital-boarding-pass" },
        { label: "Domestic ID checklist", slug: "domestic-id-requirements" },
        { label: "Aadhaar digital ID tips", slug: "aadhaar-digital-id" },
      ],
      verifiedOn: "2026-08-23",
    },
    sources: [
      {
        label: "MoCA Digi Yatra Policy",
        url: "https://www.civilaviation.gov.in/sites/default/files/migration/Digi%20yatra%20policy%20doc.pdf",
      },
    ],
    lastUpdated: "2026-08-23",
  },
  {
    slug: "baggage-weight-size-limits",
    title: "Baggage Weight and Size Limits",
    shortTitle: "Checked bag limits",
    category: "airport-rules",
    subcategory: "checked-baggage",
    tags: ["baggage", "weight", "dimensions"],
    searchAliases: ["checked baggage", "check in baggage", "luggage weight", "luggage allowance"],
    verdict: {
      status: "limited",
      summary: "Domestic economy tickets include 15kg checked and 7kg cabin allowance unless airline offers more.",
    },
    howToComply: [],
    whyRuleExists: "Limits protect baggage handlers and ensure bags fit aircraft holds and overhead bins.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Typical domestic economy tickets in India include 15kg checked baggage and 7kg cabin allowance (plus one personal item). Dimensions matter too: 158cm (L+W+H) for checked bags and roughly 55×35×25cm for cabin bags unless your airline publishes a different gauge.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "hand-baggage-size-weight",
    tags: ["cabin bag", "personal item"],
    verdict: {
      status: "limited",
      summary: "Domestic airlines allow one cabin bag up to 7kg plus one personal item (handbag or laptop bag).",
    },
    howToComply: [],
    whyRuleExists: "Limits keep aisles clear during boarding and reduce weight overhead.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Most Indian airlines allow one cabin bag up to 7kg plus a personal item (laptop bag, handbag, camera sling). Follow the size gauges—roughly 55×35×25cm—and be ready for spot weighing at the gate.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "checked-baggage",
    tags: ["fragile", "glass", "electronics"],
    verdict: {
      status: "limited",
      summary: "Fragile goods allowed but travel at passenger risk. Use hard cases and declare them during check-in.",
    },
    howToComply: [],
    whyRuleExists: "Airlines cannot guarantee gentle handling; proper packing prevents breakage.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Fragile items—glassware, ceramics, electronics—can fly, but airlines treat them as ‘carried at passenger risk.’ Use rigid cases, bubble wrap, and insurance; declare anything irreplaceable before check-in.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "liquids-aerosols-gels",
    tags: ["duty free", "liquid", "steb"],
    verdict: {
      status: "limited",
      summary: "Duty-free alcohol or perfume allowed through transit only if sealed in STEBs with receipt dated within 36 hours.",
    },
    howToComply: [],
    whyRuleExists: "STEBs prove the liquid was screened at the point of sale, reducing risk of liquid explosives.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Duty-free liquor or perfume only clears onward security if it stays sealed inside an ICAO-approved STEB with a receipt less than 36 hours old. Break the seal or lose the slip and the bottle becomes a regular >100ml liquid that screeners will confiscate.",
      overview: [],
      checklists: [],
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
      tips: [],
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
    category: "customs",
    subcategory: "prohibited-items",
    tags: ["customs", "prohibited", "import"],
    verdict: {
      status: "not_allowed",
      summary: "Firearms, satellite phones, pornographic material, and counterfeit currency are prohibited unless licensed.",
    },
    howToComply: [],
    whyRuleExists: "Customs protects national security, agriculture, and revenue.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "India bars firearms, satellite phones, counterfeit currency, pornographic media, unprocessed ivory, endangered wildlife parts, most seeds/soil, and drones above 250g (DGCA's Nano category ceiling) without permits. Declare borderline items at the Red Channel or risk seizure plus penalties.",
      overview: [
        "Some gear such as drones, radio transmitters, or firearms can enter with licences from DGCA, DGFT, or WPC — carry photocopies and digital scans, since customs rarely has time to verify permits online.",
      ],
      checklists: [],
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
          answer: "Only nano drones (≤250g, DGCA's Nano category) are exempt from pilot licensing. Heavier drones need import permission and Remote Pilot IDs.",
        },
        {
          question: "What happens if customs seizes an item?",
          answer: "You receive a detention memo, followed by a formal adjudication order. You can appeal to the Commissioner (Appeals) within 60 days of that order, extendable by 30 days at their discretion. Outright prohibited goods, unlike merely restricted ones, aren't guaranteed release even on payment of a fine.",
        },
      ],
      tips: [],
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
    category: "customs",
    subcategory: "foreign-currency",
    tags: ["cash", "customs", "income tax"],
    verdict: {
      status: "limited",
      summary: "No explicit limit domestically, but amounts above INR 2 lakh can trigger questioning. International travellers must declare currency over USD 5,000 (or USD 10,000 aggregate).",
    },
    howToComply: [],
    whyRuleExists: "Income Tax Act and FEMA monitor large cash movement to curb money laundering.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Domestic flyers can technically carry any amount of Indian currency, but CISF and Income Tax question bundles above ₹2 lakh. International travellers must declare foreign currency over USD 5,000 (or USD 10,000 combined with traveller’s cheques) using the Currency Declaration Form.",
      overview: [
        "Carrying demonetised or mutilated notes can lead to confiscation, separate from the cash-declaration thresholds above.",
      ],
      checklists: [],
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
      tips: [],
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
    category: "customs",
    subcategory: "gold-jewellery",
    tags: ["gold", "jewellery", "customs"],
    verdict: {
      status: "limited",
      summary: "Personal jewellery worn is generally allowed. Bringing gold into India attracts duty beyond 20g (men) / 40g (women) by weight when abroad over 6 months.",
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
        "Wear your everyday gold freely on domestic flights, but inbound international passengers only get a duty-free allowance of 20g for men and 40g for women, by weight, after staying abroad 6 months. Declare anything heavier—bullion, coins, or bridal sets—or customs will seize it.",
      overview: [
        "Bullion bars, coins, and unfinished ornaments are never duty-free — they must be declared, invoiced, and are often routed through the Red Channel for appraisal, unlike worn personal jewellery.",
      ],
      checklists: [],
      table: {
        caption: "Gold allowance snapshot",
        headers: ["Traveller", "Duty-free allowance", "Conditions"],
        rows: [
          ["Male passenger", "20g", ">6 months abroad"],
          ["Female passenger", "40g", ">6 months abroad"],
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
      tips: [],
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
    category: "customs",
    subcategory: "duty-free-allowance",
    tags: ["alcohol", "duty free", "allowance"],
    verdict: {
      status: "limited",
      summary: "Adults can bring 2 litres of duty-free alcohol into India. Anything extra attracts customs duty (~38.5%).",
    },
    howToComply: [],
    whyRuleExists: "Controls alcohol imports and ensures revenue collection.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Each passenger aged 18+ can bring 2 litres of duty-free alcohol into India if they spent at least 48 hours abroad. Extra bottles are legal but attract ~38.5% customs duty, so declare them immediately.",
      overview: [
        "Some states (Gujarat, Bihar, certain North-Eastern states) require local permits for alcohol. Customs may release your bottles at the airport, but state excise officers can still seize them later if you transit into a dry zone.",
      ],
      checklists: [],
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
      tips: [],
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
    category: "customs",
    subcategory: "duty-free-allowance",
    tags: ["cigarettes", "tobacco", "allowance"],
    verdict: {
      status: "limited",
      summary: "Duty-free allowance: 100 cigarettes or 25 cigars or 125g tobacco when entering India. Vapes remain banned entirely.",
    },
    howToComply: [],
    whyRuleExists: "Controls tobacco imports and enforces the 2019 vape ban.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "India’s duty-free allowance is 100 cigarettes or 25 cigars or 125g of loose tobacco per adult. E-cigarettes, vapes, and heated-tobacco devices are banned outright—customs confiscates them and can file cases under the 2019 ordinance.",
      overview: [
        "Tobacco allowances are per passenger and per category — mixing categories (say, 50 cigarettes plus 12 cigars) isn't allowed. Stay within one bracket or declare the excess.",
      ],
      checklists: [],
      table: {
        caption: "Tobacco allowance options",
        headers: ["Product", "Duty-free quantity", "Notes"],
        rows: [
          ["Cigarettes", "100 sticks", "Half a standard carton"],
          ["Cigars", "25 sticks", "Store in humidor cases"],
          ["Pipe/chewing tobacco", "125g", "Must be factory sealed"],
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
          answer: "Yes, they fall under smokeless tobacco and share the 125g allowance.",
        },
        {
          question: "Can I carry hookah flavors?",
          answer: "Flavored tobacco counts toward the 125g limit. Herbal (tobacco-free) mixes usually pass but declare them if carrying multiple kilos.",
        },
        {
          question: "What about lighters?",
          answer: "One small safety lighter is typically allowed on your person, but torch/jet lighters are banned. Refer to the matches & lighters rule for details.",
        },
      ],
      tips: [],
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
    category: "airport-rules",
    subcategory: "checked-baggage",
    tags: ["gifts", "wrapping", "security"],
    verdict: {
      status: "limited",
      summary: "Wrapped gifts may be opened at security. Scissors or cutters hidden inside packages will be confiscated.",
    },
    howToComply: [],
    whyRuleExists: "Opaque wrapping hides contents and can mask prohibited items.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Security can open any wrapped gift and confiscate scissors, blades, or metal tape dispensers hidden inside. Carry gifts unwrapped through screening, pack sharp accessories in checked bags, and finish the wrapping at the destination.",
      overview: [
        "For duty-free items, staff usually provide branded bags post-security — use tissue or gift bags that fold flat in your cabin bag until you clear all checkpoints.",
      ],
      checklists: [],
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
      tips: [],
      internalLinks: [
        { label: "Sharp objects policy", slug: "sharp-objects-in-flight" },
        { label: "Perfume & liquids guide", slug: "perfume-in-flight" },
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
    category: "airport-rules",
    subcategory: "liquids-aerosols-gels",
    tags: ["bottle", "security", "liquid rule"],
    verdict: {
      status: "allowed",
      summary: "Empty bottles are allowed through security. Filled bottles over 100ml are confiscated unless exempt.",
    },
    howToComply: [],
    whyRuleExists: "Ensures no un-screened liquids enter the sterile area.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Empty bottles—plastic, metal, or glass—sail through security. As soon as they contain more than 100ml of liquid, they fall under the LAG rule unless covered by baby food or medical exemptions. Keep lids off if officers request a visual check.",
      overview: [
        "On multi-leg itineraries, remember to empty the bottle again before each additional security checkpoint — it doesn't stay cleared once refilled past the first one.",
      ],
      checklists: [],
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
      tips: [],
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
    category: "airport-rules",
    subcategory: "checked-baggage",
    tags: ["pets", "cabin", "cargo"],
    verdict: {
      status: "limited",
      summary: "Some airlines allow small cats and dogs in cabin; others only permit pets in cargo with advance booking.",
    },
    howToComply: [],
    whyRuleExists: "Ensures animal welfare while preventing cabin disruptions and disease transmission.",
    extraNotes: [],
    richContent: {
      quickAnswer:
        "Pets fly only with advance airline approval, health certificates issued within 24–48 hours, and IATA-compliant crates. Small cats/dogs sometimes ride in cabin (usually ≤7 kg including carrier); heavier animals travel in pressurised cargo.",
      overview: [
        "Documents are non-negotiable: a fit-to-fly vet certificate, a vaccination card with an anti-rabies shot more than 30 days old, and microchip data plus import/export permits for international travel.",
        "Crates must meet IATA Live Animal Regulations — rigid walls, metal bolts, absorbent bedding, and water cups accessible from outside. Sedation is discouraged because it can affect breathing at altitude.",
      ],
      checklists: [],
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
      tips: [],
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

