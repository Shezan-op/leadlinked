import type { QuestionConfig } from '../types/questionnaire';

export interface SectionMeta {
  id: string;
  number: string;
  title: string;
  description: string;
  questionIds: string[];
}

export const SECTIONS: SectionMeta[] = [
  {
    id: 'foundation',
    number: '01',
    title: 'Business Foundation',
    description: 'The core origins, mechanics, goals, and commercial offerings of the business.',
    questionIds: ['q01', 'q02', 'q03', 'q04', 'q05'],
  },
  {
    id: 'customer',
    number: '02',
    title: 'Customer',
    description: 'Psychographics, buying triggers, hesitation points, and ideal user profiles.',
    questionIds: ['q06', 'q07', 'q08', 'q09', 'q10'],
  },
  {
    id: 'market_competition',
    number: '03',
    title: 'Market & Competition',
    description: 'Category landscape, reference benchmarks, and competitive perception.',
    questionIds: ['q11', 'q12', 'q13', 'q14'],
  },
  {
    id: 'brand',
    number: '04',
    title: 'Brand',
    description: 'Identity signals, tone of voice, personality traits, and non-negotiables.',
    questionIds: ['q15', 'q16', 'q17', 'q18'],
  },
  {
    id: 'marketing_content',
    number: '05',
    title: 'Marketing & Content',
    description: 'Channel activities, editorial themes, and authoritative knowledge vectors.',
    questionIds: ['q19', 'q20', 'q21', 'q22'],
  },
  {
    id: 'sales_conversion',
    number: '06',
    title: 'Sales & Conversion',
    description: 'Purchasing mechanics, conversion velocity, drop-off friction, and primary actions.',
    questionIds: ['q23', 'q24', 'q25'],
  },
  {
    id: 'digital_presence',
    number: '07',
    title: 'Digital Presence',
    description: 'Owned digital touchpoints, active web footprints, and friction areas.',
    questionIds: ['q26', 'q27'],
  },
  {
    id: 'assets_execution',
    number: '08',
    title: 'Assets & Execution',
    description: 'Collateral repository, operational constraints, and unstated strategic nuances.',
    questionIds: ['q28', 'q29', 'q30'],
  },
];

export const QUESTIONS_CONFIG: QuestionConfig[] = [
  // SECTION 1: BUSINESS FOUNDATION
  {
    id: 'q01',
    sectionId: 'foundation',
    sectionTitle: 'Business Foundation',
    sectionSubtitle: 'The narrative and evolution',
    title: 'Business Story',
    description:
      'Tell us the story behind the business. What led to its creation, how has it evolved, and what should we understand about the journey so far?',
    type: 'long_text',
    required: true,
    placeholder: 'Give us the candid origins, turning points, pivots, and current chapter...',
  },
  {
    id: 'q02',
    sectionId: 'foundation',
    sectionTitle: 'Business Foundation',
    sectionSubtitle: 'Plain english definition',
    title: 'What the Business Actually Does',
    description:
      'If you had to explain what your business does to someone who has never heard of it, how would you describe it in your own words?',
    type: 'long_text',
    required: true,
    placeholder: 'In simple, unambiguous terms: who do you serve and what real-world outcome do you deliver?',
  },
  {
    id: 'q03',
    sectionId: 'foundation',
    sectionTitle: 'Business Foundation',
    sectionSubtitle: 'Commercial architecture',
    title: 'Products / Services / Offers',
    description:
      'Walk us through everything you currently sell or offer. Include your major products/services, important variations, packages, pricing structure, and anything you consider a core offer.',
    type: 'long_text',
    required: true,
    placeholder: 'List your core packages, tiers, entry-point offers, or retainers...',
    acceptsFiles: true,
    maxFiles: 5,
    suggestedUploads: ['Product catalogue', 'Service brochure', 'Price list', 'Menu', 'Existing PDF'],
  },
  {
    id: 'q04',
    sectionId: 'foundation',
    sectionTitle: 'Business Foundation',
    sectionSubtitle: 'True differentiation',
    title: 'What Makes the Business Different',
    description:
      'Why should someone choose your business instead of another business offering something similar?',
    type: 'long_text',
    required: true,
    placeholder: 'What is your genuine competitive edge, unique mechanism, or operational truth?',
  },
  {
    id: 'q05',
    sectionId: 'foundation',
    sectionTitle: 'Business Foundation',
    sectionSubtitle: 'Near-term horizons',
    title: 'Business Goals',
    description:
      'What are you trying to achieve through the business over the next 6–12 months, and what would make you feel that this work has genuinely been successful?',
    type: 'long_text',
    required: true,
    placeholder: 'Specific revenue marks, client volumes, market positioning, or key strategic milestones...',
  },

  // SECTION 2: CUSTOMER
  {
    id: 'q06',
    sectionId: 'customer',
    sectionTitle: 'Customer',
    sectionSubtitle: 'Audience definition',
    title: 'Ideal Customer',
    description:
      'Describe the people you most want to attract. Tell us who they are, what they care about, what they usually need, and what makes them a good customer for your business.',
    type: 'long_text',
    required: true,
    placeholder: 'Demographics, industry status, operational scale, mindsets, or personal values...',
  },
  {
    id: 'q07',
    sectionId: 'customer',
    sectionTitle: 'Customer',
    sectionSubtitle: 'Incentive to search',
    title: 'Customer Problems',
    description:
      'What problems, desires, frustrations, or situations usually bring someone to you in the first place?',
    type: 'long_text',
    required: true,
    placeholder: 'What pain point has reached an intolerable boiling point before they reach out?',
  },
  {
    id: 'q08',
    sectionId: 'customer',
    sectionTitle: 'Customer',
    sectionSubtitle: 'The path to conversion',
    title: 'Customer Decision Process',
    description:
      'What normally happens between someone discovering your business and actually becoming a customer? Walk us through the journey as it happens today.',
    type: 'long_text',
    required: true,
    placeholder: 'From discovery (referral, search, social) to conversation, evaluation, and agreement...',
  },
  {
    id: 'q09',
    sectionId: 'customer',
    sectionTitle: 'Customer',
    sectionSubtitle: 'Hesitations & resistance',
    title: 'Customer Objections',
    description:
      'What questions, doubts, objections, or concerns do customers commonly have before buying from you?',
    type: 'long_text',
    required: true,
    placeholder: 'Pricing, timing, past bad experiences with competitors, complexity, or doubt of results...',
  },
  {
    id: 'q10',
    sectionId: 'customer',
    sectionTitle: 'Customer',
    sectionSubtitle: 'High-affinity relationships',
    title: 'Best Customers',
    description:
      'Think about the customers you have genuinely loved working with. What made them a great fit for your business?',
    type: 'long_text',
    required: false,
    placeholder: 'What shared traits made these engagements frictionless, profitable, or inspiring?',
  },

  // SECTION 3: MARKET & COMPETITION
  {
    id: 'q11',
    sectionId: 'market_competition',
    sectionTitle: 'Market & Competition',
    sectionSubtitle: 'Industry context',
    title: 'Market',
    description:
      'How would you describe the market or category you operate in, and what is currently happening in it that we should understand?',
    type: 'long_text',
    required: true,
    placeholder: 'Current trends, shifts in consumer expectations, tech changes, or new regulatory demands...',
  },
  {
    id: 'q12',
    sectionId: 'market_competition',
    sectionTitle: 'Market & Competition',
    sectionSubtitle: 'Alternative choices',
    title: 'Competitors',
    description:
      'Who do customers compare you with, or who do you consider your main competitors? Share their names, websites, social profiles, or anything else useful.',
    type: 'long_text_with_links',
    required: true,
    placeholder: 'List specific competitors, their website URLs, or direct comparison points...',
  },
  {
    id: 'q13',
    sectionId: 'market_competition',
    sectionTitle: 'Market & Competition',
    sectionSubtitle: 'Comparative distinction',
    title: 'Competitive Perception',
    description:
      'When customers compare you with competitors, what do you want them to notice about your business?',
    type: 'long_text',
    required: true,
    placeholder: 'The standout signals: speed, caliber of thought, craftsmanship, transparency, or results...',
  },
  {
    id: 'q14',
    sectionId: 'market_competition',
    sectionTitle: 'Market & Competition',
    sectionSubtitle: 'Aesthetic & strategic taste',
    title: 'Inspiration',
    description:
      'Which brands, businesses, websites, creators, campaigns, or visual identities do you admire? Tell us what you like about them.',
    type: 'long_text_with_links',
    required: false,
    placeholder: 'Names, links, or notes on what makes their positioning or visual delivery compelling...',
    acceptsFiles: true,
    maxFiles: 5,
    suggestedUploads: ['Screenshots of inspirational sites', 'Moodboard references', 'Campaign assets'],
  },

  // SECTION 4: BRAND
  {
    id: 'q15',
    sectionId: 'brand',
    sectionTitle: 'Brand',
    sectionSubtitle: 'Visual & verbal system',
    title: 'Current Brand Identity',
    description:
      'Describe how you currently want the business to look, sound, and feel. If you already have a defined brand identity, tell us what should be preserved.',
    type: 'long_text',
    required: false,
    placeholder: 'Tonal guidelines, visual style, colors, fonts, or heritage elements that must stay...',
    acceptsFiles: true,
    maxFiles: 5,
    suggestedUploads: ['Logo', 'Brand guide', 'Brand fonts', 'Colour palette', 'Existing brand assets'],
  },
  {
    id: 'q16',
    sectionId: 'brand',
    sectionTitle: 'Brand',
    sectionSubtitle: 'Character & demeanor',
    title: 'Brand Personality',
    description:
      'If your brand were a person, how would you describe its personality and the impression you want people to have after interacting with it?',
    type: 'long_text',
    required: true,
    placeholder: 'E.g., authoritative yet approachable, sharp and witty, understated and deeply competent...',
  },
  {
    id: 'q17',
    sectionId: 'brand',
    sectionTitle: 'Brand',
    sectionSubtitle: 'Reputational shift',
    title: 'Brand Perception',
    description:
      'How do customers currently perceive your business, and how would you like that perception to change or evolve?',
    type: 'long_text',
    required: true,
    placeholder: 'Current impression vs. the aspirational standard you want to command...',
  },
  {
    id: 'q18',
    sectionId: 'brand',
    sectionTitle: 'Brand',
    sectionSubtitle: 'Guardrails & taboos',
    title: 'Things We Must Avoid',
    description:
      'What should we absolutely avoid in the brand, communication, design, content, or marketing? Tell us anything you strongly dislike or never want associated with the business.',
    type: 'long_text',
    required: false,
    placeholder: 'Cliches, tones, colors, claims, aggressive sales tactics, or aesthetics you hate...',
  },

  // SECTION 5: MARKETING & CONTENT
  {
    id: 'q19',
    sectionId: 'marketing_content',
    sectionTitle: 'Marketing & Content',
    sectionSubtitle: 'Active channels & learnings',
    title: 'Current Marketing',
    description:
      'What marketing are you currently doing, where are you active, and what has or hasn\'t worked so far?',
    type: 'long_text',
    required: true,
    placeholder: 'SEO, paid ads, cold outreach, LinkedIn, email newsletters, referrals, events...',
  },
  {
    id: 'q20',
    sectionId: 'marketing_content',
    sectionTitle: 'Marketing & Content',
    sectionSubtitle: 'Historical collateral inventory',
    title: 'Existing Content',
    description:
      'What content, marketing material, campaigns, photos, videos, brochures, presentations, or other assets already exist that we can work with?',
    type: 'long_text',
    required: false,
    placeholder: 'Inventory of current media, decks, past campaign performance, case studies...',
    acceptsFiles: true,
    maxFiles: 5,
    suggestedUploads: ['Pitch decks', 'Existing case study documents', 'Flyers or brochures'],
  },
  {
    id: 'q21',
    sectionId: 'marketing_content',
    sectionTitle: 'Marketing & Content',
    sectionSubtitle: 'Strategic takeaway',
    title: 'Content Direction',
    description:
      'What do you want your audience to regularly see, learn, believe, or feel when they interact with your content?',
    type: 'long_text',
    required: true,
    placeholder: 'The core epiphany or perspective you want consistently reinforced in their mind...',
  },
  {
    id: 'q22',
    sectionId: 'marketing_content',
    sectionTitle: 'Marketing & Content',
    sectionSubtitle: 'Domain intellectual property',
    title: 'Topics and Expertise',
    description:
      'What subjects, questions, ideas, processes, stories, or areas of expertise could your business talk about for hours?',
    type: 'long_text',
    required: true,
    placeholder: 'Niche insights, contrarian viewpoints, technical breakdowns, proprietary methods...',
  },

  // SECTION 6: SALES & CONVERSION
  {
    id: 'q23',
    sectionId: 'sales_conversion',
    sectionTitle: 'Sales & Conversion',
    sectionSubtitle: 'Transaction logistics',
    title: 'How People Buy',
    description:
      'How does a customer actually purchase from you today? Describe the process from enquiry to payment, including the people, platforms, conversations, and steps involved.',
    type: 'long_text',
    required: true,
    placeholder: 'Discovery call, proposal delivery, contract signing, invoice processing, software onboarding...',
  },
  {
    id: 'q24',
    sectionId: 'sales_conversion',
    sectionTitle: 'Sales & Conversion',
    sectionSubtitle: 'Pipeline friction',
    title: 'Sales Bottlenecks',
    description:
      'Where do potential customers usually drop off, hesitate, disappear, or take too long to make a decision?',
    type: 'long_text',
    required: false,
    placeholder: 'Proposal review delay, internal committee approvals, sticker shock, or complex onboarding...',
  },
  {
    id: 'q25',
    sectionId: 'sales_conversion',
    sectionTitle: 'Sales & Conversion',
    sectionSubtitle: 'North Star conversion goal',
    title: 'Conversion Action',
    description:
      'What is the most valuable action you want a potential customer to take after discovering the business?',
    type: 'single_select_with_other',
    required: true,
    options: [
      'Buy',
      'Book',
      'Call',
      'WhatsApp',
      'Submit enquiry',
      'Request quote',
      'Visit store/location',
      'Book consultation',
      'Sign up',
      'Other',
    ],
  },

  // SECTION 7: DIGITAL PRESENCE
  {
    id: 'q26',
    sectionId: 'digital_presence',
    sectionTitle: 'Digital Presence',
    sectionSubtitle: 'Active footprints',
    title: 'Existing Digital Presence',
    description:
      'Share every important digital property currently connected to the business.',
    type: 'links',
    required: true,
    linkFields: [
      { key: 'website', label: 'Primary Website', placeholder: 'https://yourbusiness.com', required: true },
      { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourhandle' },
      { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourpage' },
      { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/yourcompany' },
      { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@yourchannel' },
      { key: 'google_business', label: 'Google Business Profile', placeholder: 'https://maps.google.com/?cid=...' },
      { key: 'other', label: 'Other Properties / Links', placeholder: 'Twitter/X, TikTok, Substack, etc.' },
    ],
  },
  {
    id: 'q27',
    sectionId: 'digital_presence',
    sectionTitle: 'Digital Presence',
    sectionSubtitle: 'Audit of current state',
    title: 'Website / Digital Problems',
    description:
      'What currently feels wrong, outdated, confusing, weak, or incomplete across your website and digital presence?',
    type: 'long_text',
    required: false,
    placeholder: 'Poor mobile performance, outdated copy, confusing value proposition, weak conversion funnel...',
    acceptsFiles: true,
    maxFiles: 5,
    suggestedUploads: ['Screenshots', 'Existing designs', 'Reports', 'Examples'],
  },

  // SECTION 8: ASSETS & EXECUTION
  {
    id: 'q28',
    sectionId: 'assets_execution',
    sectionTitle: 'Assets & Execution',
    sectionSubtitle: 'Collateral & production files',
    title: 'Available Assets',
    description:
      'Upload anything you already have that could help us understand, represent, or market the business.',
    type: 'file_upload',
    required: false,
    acceptsFiles: true,
    maxFiles: 10,
    suggestedUploads: [
      'Logos',
      'Brand files',
      'Product photos',
      'Product videos',
      'Team photos',
      'Office/store photos',
      'Brochures',
      'Catalogues',
      'Presentations',
      'Previous ads',
      'Testimonials',
      'Case studies',
      'Documents',
    ],
  },
  {
    id: 'q29',
    sectionId: 'assets_execution',
    sectionTitle: 'Assets & Execution',
    sectionSubtitle: 'Real-world boundaries',
    title: 'Constraints',
    description:
      'What constraints should we know about before we start? This could include budget, timelines, approvals, people involved, locations, technology, compliance, brand restrictions, availability, or anything else that may affect execution.',
    type: 'long_text',
    required: true,
    placeholder: 'Deadlines, legal approvals, internal review committees, non-negotiable tech stacks...',
  },
  {
    id: 'q30',
    sectionId: 'assets_execution',
    sectionTitle: 'Assets & Execution',
    sectionSubtitle: 'Unaddressed context',
    title: 'Anything Else',
    description:
      'What haven\'t we asked that you believe we should know before working on your business?',
    type: 'long_text',
    required: false,
    placeholder: 'Any final thoughts, underlying goals, nuances, or thoughts you wish to share...',
    acceptsFiles: true,
    maxFiles: 5,
    suggestedUploads: ['Supplementary documents', 'Notes', 'Additional files'],
  },
];

export const TOTAL_QUESTIONS_COUNT = QUESTIONS_CONFIG.length; // Exactly 30
