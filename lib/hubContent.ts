/**
 * Per-category SEO hub content.
 * Structured as data so pages/[category]/index.tsx stays a pure template.
 */

export interface HubFaq {
  question: string;
  answer: string;
}

export interface HubBodySection {
  heading: string;
  paragraphs: string[];
}

export interface HubContent {
  /** H1 sub-heading — displayed below the category title */
  tagline: string;
  /** 2–3 sentence intro that establishes authority — appears above the subcategory grid */
  intro: string;
  /** Callout box — "Why this matters" */
  whyItMatters: string;
  /** Long-form body sections below the grid (~1000 words total per category) */
  sections: HubBodySection[];
  /** 6–8 FAQs for the FAQ accordion + FAQPage JSON-LD */
  faqs: HubFaq[];
}

export const HUB_CONTENT: Record<string, HubContent> = {

  /* ─────────────────────────────────────────────────────────────────────────
     AIRPORT RULES
  ───────────────────────────────────────────────────────────────────────── */
  'airport-rules': {
    tagline: 'Everything you are allowed — and not allowed — to carry at Indian airports',
    intro:
      'India\'s aviation security framework is governed by the DGCA (Directorate General of Civil Aviation), the BCAS (Bureau of Civil Aviation Security), and on-ground enforcement by CISF (Central Industrial Security Force). Rules change frequently and vary between cabin baggage and checked baggage, domestic and international travel, and even airline-to-airline. This guide consolidates every major restriction into one place — updated regularly and written in plain language.',
    whyItMatters:
      'Baggage violations at Indian airports lead to confiscation, fines, or missed flights. Knowing exactly what is allowed — and under what conditions — before you reach the security gate saves time, money, and stress.',
    sections: [
      {
        heading: 'How Indian airport baggage rules work',
        paragraphs: [
          'At every Indian airport, your baggage passes through two layers of screening: the CISF x-ray check at the security hold area (SHA) and the airline\'s own check-in weight limits. These are separate systems. An item may be permitted by BCAS security rules but still rejected by your airline\'s dangerous goods policy — or vice versa.',
          'Cabin baggage (also called hand baggage or carry-on) is the bag you take into the aircraft cabin with you. It is subject to the strictest security scrutiny because prohibited items in the cabin pose an immediate risk during flight. Checked baggage is screened separately and has a different — though still strict — set of rules, particularly for lithium batteries and flammable items.',
          'The BCAS issues circulars that define the master list of prohibited items. Airlines may impose tighter restrictions on top of this list. When in doubt, check both your airline\'s website and the BCAS list before packing.',
        ],
      },
      {
        heading: 'Cabin baggage rules at a glance',
        paragraphs: [
          'For most Indian domestic carriers, cabin baggage is limited to 7–8 kg with linear dimensions under 55 cm × 35 cm × 25 cm. International allowances vary by airline and fare class — premium cabins typically permit 10–12 kg. One personal item (laptop bag, handbag, or small backpack) is usually allowed in addition to the main cabin bag.',
          'The most common items confiscated at security are sharp objects (scissors with blades over 6 cm, knives, razors), liquids in containers above 100 ml, power banks over 100 Wh, and items that generate heat or smoke. Lithium-ion power banks must travel in cabin baggage — they cannot go in checked luggage.',
          'The 100 ml liquid rule mirrors international standards. Each container must hold no more than 100 ml, all containers must fit into a single transparent resealable bag of no more than 1 litre capacity, and the bag must be removed from your cabin bag at the security checkpoint for separate screening.',
        ],
      },
      {
        heading: 'Checked baggage and special items',
        paragraphs: [
          'Checked baggage allows most everyday items that are banned from the cabin, including sharp tools, sporting equipment, and many liquids in larger volumes. However, certain items remain banned from checked baggage entirely — lithium batteries not installed in a device (spare batteries), safety lighters with fuel, and most pressurised gas cylinders.',
          'Sports equipment such as bicycles, golf clubs, and cricket bats can typically travel as checked baggage but must be declared at check-in and may attract excess baggage fees. Firearms require prior written permission from the airline and must be unloaded, in a hard-sided locked case, and declared at check-in.',
          'Musical instruments that cannot fit in the overhead bin may be checked or, on some carriers, booked as a separate seat. Contact your airline at least 48 hours in advance for oversized items.',
        ],
      },
      {
        heading: 'Security screening at Indian airports',
        paragraphs: [
          'All passengers at Indian airports go through a CISF security check before entering the security hold area. This includes removing shoes at many airports, placing laptops in a separate tray, and walking through a full-body scanner or metal detector arch. Pre-Enrolment for DigiYatra (facial recognition boarding) at participating airports can reduce time at certain checkpoints.',
          'Passengers with medical implants (pacemakers, metal orthopaedic hardware) should carry a doctor\'s certificate and inform CISF before screening. Medical devices such as insulin pens, nebulisers, and CPAP machines are generally permitted in the cabin with supporting documentation.',
          'Behaviour at security checkpoints is taken seriously under BCAS regulations. Interfering with, obstructing, or threatening security personnel is a criminal offence. Refer to our security screening guide for the complete list of do\'s and don\'ts at the checkpoint.',
        ],
      },
      {
        heading: 'Restricted and prohibited items',
        paragraphs: [
          'The BCAS prohibited items list is extensive. Beyond the obvious (weapons, explosives), it includes everyday items that many travellers overlook: toy guns and realistic replica firearms, self-defence sprays, magnetic materials above a certain field strength, and certain electronic devices capable of causing radio interference.',
          'Items that are "restricted" rather than outright "prohibited" may be allowed under specific conditions — for example, medical syringes are allowed if accompanied by a prescription, and dry ice (for transporting perishables) is allowed up to 2.5 kg in checked baggage with airline approval.',
          'If you are unsure about a specific item, contact your airline or the airports\'s help desk before travel. Arriving at security with a prohibited item typically means forfeiting it on the spot — there is no facility to send it back to your car or post it home.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I carry a power bank in my cabin bag on Indian domestic flights?',
        answer: 'Yes. Power banks with a capacity up to 100 Wh are allowed in cabin baggage without airline approval. Those between 100 Wh and 160 Wh require airline approval. Power banks above 160 Wh are prohibited on all flights. Power banks must never be placed in checked baggage.',
      },
      {
        question: 'How many ml of liquid can I carry in my hand luggage?',
        answer: 'Each individual container must hold a maximum of 100 ml. All containers must fit inside a single, transparent, resealable plastic bag with a maximum capacity of 1 litre. Each passenger is allowed one such bag. The bag must be presented separately at the security checkpoint.',
      },
      {
        question: 'Are scissors allowed in cabin baggage on Indian flights?',
        answer: 'Scissors with blades shorter than 6 cm (measured from the fulcrum) are permitted in cabin baggage. Scissors with longer blades must be packed in checked baggage. Round-tipped scissors used by children are generally allowed regardless of size.',
      },
      {
        question: 'What is the cabin baggage weight limit for IndiGo / Air India / Vistara?',
        answer: 'IndiGo allows 7 kg for one cabin bag on most domestic fares. Air India allows 8 kg (10 kg on business class). Rules change with fare class and route — always verify on your airline\'s website when booking, as these policies update frequently.',
      },
      {
        question: 'Can I carry medicines and syringes in my hand luggage?',
        answer: 'Yes. Prescription medicines, including injectable medications and syringes, are allowed in cabin baggage. Carry a copy of the prescription or a doctor\'s letter. Liquid medicines are exempt from the 100 ml rule when medically necessary if declared at the checkpoint.',
      },
      {
        question: 'Is a knife allowed in checked baggage on flights in India?',
        answer: 'Most knives (kitchen knives, pocket knives, scissors with blades over 6 cm) are permitted in checked baggage when securely packed. Knives are strictly prohibited in cabin baggage. Carrying any knife into the security hold area is a serious offence.',
      },
      {
        question: 'What items can I not carry in checked baggage?',
        answer: 'Items banned from checked baggage include lithium battery power banks (not installed in a device), e-cigarette refill liquids (quantities vary by airline), lighter fuel, certain aerosols, and items with explosive or flammable properties. Check your airline\'s dangerous goods policy before packing.',
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     TRAVEL DOCUMENTS
  ───────────────────────────────────────────────────────────────────────── */
  'travel-documents': {
    tagline: 'Valid ID, passport, and document rules for flying within and from India',
    intro:
      'Knowing which identity document is accepted — and by whom — is the single most common source of confusion for Indian air travellers. Requirements differ between domestic and international travel, between adults and minors, and between Indian nationals and foreign nationals holding an OCI or visa. This section covers every document scenario you might face at an Indian airport, drawn from DGCA guidelines and official Ministry of Home Affairs rules.',
    whyItMatters:
      'Boarding is denied instantly if you cannot produce a valid photo ID at check-in. Unlike train travel, there is no flexibility at airport check-in counters. Knowing exactly which documents are accepted — and which are not — prevents last-minute turnarounds at the airport.',
    sections: [
      {
        heading: 'Valid ID for domestic flights in India',
        paragraphs: [
          'For domestic air travel in India, you must present one original, valid, government-issued photo ID at check-in. The acceptable documents are: Aadhaar card (physical or m-Aadhaar on UIDAI app), passport, PAN card with photograph, Voter ID (Election Photo Identity Card / EPIC), driving licence, and employee identity cards issued by Central or State Government ministries.',
          'A photocopy of any ID is not accepted, nor are unofficial identity documents, bank passbooks, or student IDs from private institutions. The ID must be original. DigiLocker documents are increasingly being accepted at many airports — Aadhaar linked via DigiLocker is explicitly accepted — but check with your airline before relying on a digital version.',
          'Children below 2 years of age (infants) do not require a photo ID for domestic travel. Children aged 2–12 travelling with an adult may travel on the adult\'s booking without a separate ID in most cases, though airlines may ask for a birth certificate as supporting proof of age for infants.',
        ],
      },
      {
        heading: 'Passport requirements for international travel from India',
        paragraphs: [
          'For any international departure from an Indian airport, a valid passport is mandatory — no exceptions. Your passport must be valid for at least 6 months beyond your intended date of return for most destinations, though some countries only require 3 months validity. Check the specific requirements of your destination country.',
          'In addition to a valid passport, most travellers require a visa for the destination country. Some destinations offer e-Visa or visa on arrival for Indian passport holders. Always confirm visa requirements with the destination country\'s embassy or official government website — third-party sites may carry outdated information.',
          'If your passport is damaged, has flood-damaged pages, or has unofficial markings, it may be flagged at immigration. Apply for a new passport well in advance of travel — Tatkal (urgent) passports are available through the Passport Seva portal for a higher fee and reduced processing time.',
        ],
      },
      {
        heading: 'OCI card rules for air travel',
        paragraphs: [
          'Overseas Citizens of India (OCI) card holders are treated as foreign nationals for immigration purposes but enjoy many privileges equivalent to Indian citizens for domestic travel. An OCI card holder travelling on a domestic route must carry their OCI card together with their foreign passport.',
          'For international travel, OCI card holders must carry their OCI card and their current foreign passport. If the OCI booklet was issued on an old (expired) passport, they must also carry the old passport to which the OCI card is linked — immigration officers need to verify the cross-reference.',
          'OCI cards issued after 2015 no longer require a separate visa sticker for long-term stays. However, certain restricted areas in India (border regions, tribal areas) still require a Protected Area Permit (PAP) or Restricted Area Permit (RAP) even for OCI card holders.',
        ],
      },
      {
        heading: 'Minors travelling alone or without both parents',
        paragraphs: [
          'Children (under 18) travelling internationally without both parents face stricter scrutiny at immigration. Indian immigration officers may ask for a No Objection Certificate (NOC) from the absent parent(s), particularly if the child\'s surname differs from the accompanying adult\'s. While no law mandates this document for Indian passport holders, carrying a notarised NOC significantly reduces the risk of being held at the gate.',
          'Airlines have their own Unaccompanied Minor (UM) policies for children travelling alone. Most carriers allow children aged 5 and above to fly as unaccompanied minors with a paid UM service. Children under 5 cannot travel alone on any commercial airline. UM charges vary but typically range from ₹1,500 to ₹3,000 per sector.',
          'For domestic travel, a child travelling with a grandparent or relative (not the legal guardian) should carry a birth certificate and, if possible, a signed permission letter from the parents. This is not a legal requirement but avoids complications at check-in.',
        ],
      },
      {
        heading: 'Emergency and temporary travel documents',
        paragraphs: [
          'If your passport is lost or stolen abroad, contact the nearest Indian embassy or consulate immediately. They can issue an Emergency Certificate (EC) — a single-journey travel document valid for direct return to India. EC holders may be questioned at Indian immigration but will be allowed to enter.',
          'Emergency certificates are not valid for transit through third countries in most cases. If your itinerary requires a transit stop, confirm with the airline and the transit country\'s immigration authority before booking. Some countries, including the UAE and Singapore, have specific rules about transit on an EC.',
          'Within India, if you have lost your passport and need to travel urgently, a Tatkal passport can be issued within 1 to 3 working days at most Passport Seva Kendras with appropriate documentation. Police verification may be waived at the officer\'s discretion for Tatkal applications in genuine emergencies.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is an Aadhaar card valid ID for a domestic flight in India?',
        answer: 'Yes. An Aadhaar card (physical card or m-Aadhaar on the official UIDAI app) is one of the most widely accepted IDs for domestic flights in India. A photocopy of Aadhaar is not accepted — you must carry the original physical card or the official digital version on the UIDAI app.',
      },
      {
        question: 'Can I fly domestically on a PAN card?',
        answer: 'Yes, a PAN card with a photograph is accepted as valid ID for domestic air travel in India. Ensure the card is in good physical condition — heavily laminated or damaged PAN cards sometimes cause issues at check-in.',
      },
      {
        question: 'How long before flying should my passport be valid?',
        answer: 'For most international destinations, your passport must be valid for at least 6 months beyond your intended travel dates. Currently, some destinations accept 3 months of validity. Check the official government website or your destination\'s embassy for the exact requirement — rules can change without notice.',
      },
      {
        question: 'Can a child fly alone on IndiGo or Air India?',
        answer: 'Children aged 5–11 can fly as Unaccompanied Minors (UM) on most major Indian airlines including IndiGo and Air India. Most airlines have specific UM fees and procedures. Children under 5 cannot fly alone. Each airline has its own policy — always book the UM service at the time of ticket purchase.',
      },
      {
        question: 'Is a driving licence valid for airport check-in in India?',
        answer: 'Yes. A valid driving licence issued by a Regional Transport Office (RTO) is an accepted photo ID for domestic flights in India. An international driving permit (IDP) is generally not accepted as a standalone document — carry your original Indian driving licence.',
      },
      {
        question: 'What should I carry if my OCI booklet is linked to an old passport?',
        answer: 'You must carry three documents: your current foreign passport, your OCI card/booklet, and the old foreign passport to which the OCI was originally issued. Immigration officers need to link the OCI to your identity via the old passport entry. Travelling without the old passport may result in being stopped at immigration.',
      },
      {
        question: 'Is a voter ID card (EPIC) accepted for boarding a flight in India?',
        answer: 'Yes. The Electors Photo Identity Card (EPIC) or Voter ID card is a valid government-issued photo ID for domestic air travel in India. Carry the original card — photocopies are not accepted.',
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     CUSTOMS
  ───────────────────────────────────────────────────────────────────────── */
  'customs': {
    tagline: 'India customs limits, duty-free rules, and what to declare at the airport',
    intro:
      'Indian customs rules are enforced by the Central Board of Indirect Taxes and Customs (CBIC) under the Ministry of Finance. Every passenger arriving in India from abroad — including Indian nationals returning home — must pass through either the Green Channel (nothing to declare) or the Red Channel (items to declare). Understanding the limits for duty-free goods, gold, foreign currency, and restricted items before you land prevents confiscation, heavy fines, and potential prosecution.',
    whyItMatters:
      'Going through the Green Channel when you should have used the Red Channel is treated as a customs violation even if it was unintentional. The customs duty on undeclared excess gold, for example, can be up to 300% of the item\'s assessed value. Know the limits before you pack for the return journey.',
    sections: [
      {
        heading: 'Duty-free allowance for passengers arriving in India',
        paragraphs: [
          'Indian residents returning from abroad and foreign nationals arriving in India are entitled to bring a certain value of goods duty-free. As of the latest CBIC notification, Indian passengers who have been abroad for more than 3 days may bring goods worth up to ₹50,000 duty-free. Those who spent less than 3 days abroad have a lower allowance of ₹15,000.',
          'The duty-free allowance applies to personal effects and souvenirs. Alcohol and tobacco have separate limits: adults above 25 years may bring up to 2 litres of alcohol and 100 cigarettes (or 25 cigars or 125 g of tobacco) duty-free. These limits cannot be pooled across family members.',
          'Items that clearly indicate commercial intent — multiple identical units, wholesale quantities, or goods with price tags removed — will be assessed as commercial imports regardless of the declared value. Customs officers have discretionary authority to assess any item at a value they deem appropriate.',
        ],
      },
      {
        heading: 'Gold and jewellery import rules',
        paragraphs: [
          'Gold import to India is tightly regulated. Male passengers may bring up to 20 grams of gold jewellery worth no more than ₹50,000 duty-free. Female passengers may bring up to 40 grams of gold jewellery worth no more than ₹1,00,000 duty-free. These limits apply only to passengers who have resided abroad for at least a year.',
          'Gold bars and coins are treated differently from jewellery. Any gold bars or coins above 1 kg require prior import licence from the Reserve Bank of India (RBI). Gold brought in excess of the jewellery limit but within 1 kg attracts customs duty at the current rate — typically 10–15% plus applicable cess and surcharges.',
          'Gold inherited from a foreign estate or received as a wedding gift may be eligible for concessional duty or exemption with appropriate documentation. Carry the will, probate order, or marriage certificate along with the itemised list of gold pieces and their weight/value for assessment at the Red Channel.',
        ],
      },
      {
        heading: 'Foreign currency and travel cards',
        paragraphs: [
          'There is no restriction on bringing Indian rupees into India for Indian residents. However, it is illegal to take Indian rupees out of India (limited to ₹25,000 under FEMA rules). Foreign currency may be brought into India in unlimited amounts, but any amount above USD 5,000 in cash (or USD 10,000 in total including traveller\'s cheques) must be declared on the Currency Declaration Form (CDF) at the Red Channel.',
          'Failure to declare foreign currency above the threshold is a violation of the Foreign Exchange Management Act (FEMA) and can result in seizure of the undeclared amount and a penalty of up to three times the undeclared sum. Pre-loaded travel cards and forex cards are generally not counted toward the cash declaration limit.',
          'When leaving India, you may take out up to USD 3,000 in cash per trip. Higher amounts require documentation from an authorised dealer (bank or forex bureau). Keep all conversion receipts for any foreign currency purchased in India — you may be asked to produce them at the departure customs checkpoint.',
        ],
      },
      {
        heading: 'Prohibited and restricted items at Indian customs',
        paragraphs: [
          'Absolutely prohibited items at Indian customs include narcotic drugs and psychotropic substances, counterfeit currency, obscene material, exotic wildlife and wildlife products covered under CITES (Convention on International Trade in Endangered Species), and certain maps/publications that misrepresent India\'s territory.',
          'Restricted items — those permitted only with specific licences or permits — include firearms and ammunition (require import licence and NOC from the Ministry of Home Affairs), satellite phones and certain radio equipment, certain agricultural products that require a phytosanitary certificate, and prescription medicines brought in large quantities.',
          'Common items that travellers overlook include e-cigarettes and vaping devices (currently banned for import and sale in India under the PECA 2019), drones (require DGCA registration and import paperwork), and single-use plastic packaging (while not banned at customs itself, it may be checked at state entry points).',
        ],
      },
      {
        heading: 'Green channel vs Red channel — which do I use?',
        paragraphs: [
          'The Green Channel is for passengers who have nothing to declare — they carry only duty-free goods within the permitted limits and no restricted or prohibited items. The Red Channel is for passengers who have dutiable goods, restricted items, or amounts of currency above the declaration threshold.',
          'If you are unsure, use the Red Channel. Declaring an item voluntarily and paying the applicable duty is far less costly than being caught in the Green Channel with an undeclared item. Customs officers have the authority to physically inspect any luggage — the Green Channel is not a guarantee of exclusion from inspection.',
          'Pre-arrival customs declaration is now possible via the ATITHI (Arrival Tax Identification Time and Handling Interface) app of the CBIC. Completing the declaration on the app before landing can reduce your wait time at the Red Channel and signal good faith to the officer.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much gold can I bring to India from abroad without paying duty?',
        answer: 'Male passengers resident abroad for at least a year may import up to 20 grams of gold jewellery (max value ₹50,000) duty-free. Female passengers may import up to 40 grams (max value ₹1,00,000) duty-free. Gold beyond these limits or in the form of bars/coins attracts customs duty — currently around 10–15% plus cess.',
      },
      {
        question: 'What is the duty-free allowance when arriving in India from abroad?',
        answer: 'Indian passengers who spent more than 3 days abroad can bring goods worth up to ₹50,000 duty-free. Those who spent less than 3 days abroad have a ₹15,000 allowance. Alcohol (2 litres) and tobacco (100 cigarettes or 25 cigars) have separate duty-free limits for adults above 25 years.',
      },
      {
        question: 'Do I need to declare cash at Indian customs?',
        answer: 'You must declare foreign currency if you carry more than USD 5,000 in cash or more than USD 10,000 in total (cash + traveller\'s cheques + drafts). Use the Currency Declaration Form (CDF) at the Red Channel. Failure to declare is a FEMA violation and may result in seizure and penalties.',
      },
      {
        question: 'Are e-cigarettes and vaping devices allowed to be brought into India?',
        answer: 'No. E-cigarettes, vaping devices, and refill cartridges are banned in India under the Prohibition of Electronic Cigarettes Act, 2019. Importing them, even for personal use, is prohibited. They will be confiscated at customs if found.',
      },
      {
        question: 'Can I bring a drone to India from abroad?',
        answer: 'Drones can be imported but require documentation including a DGCA Remote Pilot Certificate registration, import clearance, and compliance with India\'s Drone Rules 2021. Bringing an unregistered drone through customs risks confiscation. Contact DGCA before arriving with a drone.',
      },
      {
        question: 'What happens if I accidentally go through the Green Channel with dutiable goods?',
        answer: 'Going through the Green Channel with items that should have been declared is treated as a customs offence under Section 111 of the Customs Act, even if unintentional. The goods can be confiscated and a penalty of up to the full duty amount (or higher) may be imposed. Always use the Red Channel if in doubt.',
      },
      {
        question: 'Can I bring Indian rupees back to India from abroad?',
        answer: 'Yes, Indian residents returning from abroad can bring up to ₹25,000 in Indian rupees back into India without declaration. Amounts above ₹25,000 need prior approval from the Reserve Bank of India under FEMA regulations.',
      },
    ],
  },
};
