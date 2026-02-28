// Description template assembly logic

export const DIFFERENTIATORS = [
  'family-owned and operated',
  'award-winning',
  'locally owned and operated',
  'licensed and insured',
  'available 24/7',
  'offering free estimates',
  'veteran-owned',
  'woman-owned',
  'eco-friendly',
  'BBB accredited',
  'serving the community for over a decade',
  'committed to 100% satisfaction',
];

export const TRUST_FACTORS = [
  'quality workmanship',
  'fair and transparent pricing',
  'fast response times',
  'attention to detail',
  'exceptional customer service',
  'reliability and professionalism',
  'years of experience',
  'honest and straightforward communication',
  'going above and beyond',
  'treating every project like our own',
];

export const CTA_TEMPLATES = [
  'Call today for a free estimate.',
  'Visit us at {address}.',
  'Book online at {website}.',
  'Contact us today to get started.',
  'Call now to schedule your appointment.',
  'Request a free quote online.',
  'Stop by our location or give us a call.',
  'Visit our website to learn more.',
];

export function buildSentence1(businessInfo) {
  const { businessName, businessType, city, yearEstablished } = businessInfo;
  const typeLabel = businessType?.label || 'business';
  const parts = [`${businessName || '[Business Name]'} is a ${typeLabel.toLowerCase()}`];
  if (city) parts[0] += ` serving ${city} and surrounding areas`;
  if (yearEstablished) parts[0] += ` since ${yearEstablished}`;
  return parts[0] + '.';
}

export function buildSentence2(services) {
  const filled = services.filter(s => s.trim());
  if (filled.length === 0) return 'We specialize in [service 1], [service 2], and [service 3].';
  if (filled.length === 1) return `We specialize in ${filled[0]}.`;
  if (filled.length === 2) return `We specialize in ${filled[0]} and ${filled[1]}.`;
  const last = filled.pop();
  return `We specialize in ${filled.join(', ')}, and ${last}.`;
}

export function buildSentence3(differentiator) {
  if (!differentiator) return 'What sets us apart: [differentiator].';
  return `What sets us apart: we are ${differentiator}.`;
}

export function buildSentence4(trustFactor) {
  if (!trustFactor) return 'Our customers trust us for [trust factor].';
  return `Our customers trust us for ${trustFactor}.`;
}

export function buildSentence5(ctaTemplate, businessInfo) {
  if (!ctaTemplate) return '[Call to action].';
  let cta = ctaTemplate;
  const fullAddress = [businessInfo.streetAddress, businessInfo.city, businessInfo.state].filter(Boolean).join(', ');
  cta = cta.replace('{address}', fullAddress || '[your address]');
  cta = cta.replace('{website}', businessInfo.website || '[your website]');
  return cta;
}

export function assembleFullDescription(sentences) {
  return sentences.filter(s => s.trim()).join(' ');
}

// Platform-specific description adapters
export function adaptForPlatform(platform, fullDescription, businessInfo, sentences) {
  const { businessName, city, state, website, phone } = businessInfo;

  switch (platform) {
    case 'google-business-profile':
    case 'bing-places':
      return fullDescription;

    case 'yelp':
      return `${fullDescription}\n\nWe take pride in serving the ${city || '[city]'}${state ? `, ${state}` : ''} community with dedication and professionalism. Whether you're a new customer or a returning one, we look forward to exceeding your expectations.\n\nGive us a call at ${phone || '[phone]'} or visit ${website || '[website]'} to learn more about our services.`;

    case 'facebook':
      // Ultra-concise for 255 chars
      return truncateToLimit(`${businessName || '[Business Name]'} — ${sentences[1] || ''} ${sentences[4] || ''}`, 255);

    case 'instagram':
      // 150 chars, emoji-friendly
      const instaServices = sentences[1]?.replace('We specialize in ', '').replace('.', '') || '[services]';
      const instaLine = `${businessName || '[Business]'} | ${instaServices}`;
      const instaLink = website ? `\n${website}` : '';
      return truncateToLimit(`${instaLine}${instaLink}`, 150);

    case 'linkedin':
      return `${fullDescription}\n\nBased in ${city || '[city]'}${state ? `, ${state}` : ''}, ${businessName || '[Business Name]'} has built a reputation for excellence in the industry. We work with both residential and commercial clients to deliver results that matter.\n\nLearn more at ${website || '[website]'}.`;

    case 'apple-maps':
      // Clean and factual
      return truncateToLimit(`${sentences[0] || ''} ${sentences[1] || ''} ${sentences[2] || ''}`, 500);

    case 'nextdoor':
      // Community/neighborhood angle
      return truncateToLimit(`${businessName || '[Business Name]'} is your trusted neighborhood ${businessInfo.businessType?.label?.toLowerCase() || 'business'}. ${sentences[1] || ''} ${sentences[3] || ''} ${sentences[4] || ''}`, 300);

    case 'website':
      return `${fullDescription}\n\nAt ${businessName || '[Business Name]'}, we understand that choosing the right ${businessInfo.businessType?.label?.toLowerCase() || 'provider'} is an important decision. That's why we go above and beyond to ensure every customer receives the personalized attention they deserve.\n\nServing ${city || '[city]'} and the surrounding areas, we combine local expertise with proven results. From your first consultation to project completion, our team is committed to delivering an outstanding experience.\n\nReady to get started? ${sentences[4] || 'Contact us today.'}\n\n${phone ? `Phone: ${phone}` : ''}${website ? `\nWebsite: ${website}` : ''}`;

    default:
      return fullDescription;
  }
}

function truncateToLimit(text, limit) {
  if (text.length <= limit) return text;
  return text.substring(0, limit - 3) + '...';
}

// Platform metadata for tabs
export const PLATFORMS = [
  {
    id: 'google-business-profile',
    name: 'Google Business',
    shortName: 'GBP',
    charLimit: 750,
    tip: 'Include your city name and primary service for local SEO. Avoid promotional language like "best" or "cheapest" — Google may reject it.',
  },
  {
    id: 'yelp',
    name: 'Yelp',
    shortName: 'Yelp',
    charLimit: 5000,
    tip: 'Yelp rewards detailed, personality-forward descriptions. Tell your story — how you got started, what makes you different. Avoid asking for reviews.',
  },
  {
    id: 'facebook',
    name: 'Facebook About',
    shortName: 'Facebook',
    charLimit: 255,
    tip: 'Keep it concise and action-oriented. This appears in your About section — lead with what you do and how to contact you.',
  },
  {
    id: 'instagram',
    name: 'Instagram Bio',
    shortName: 'Instagram',
    charLimit: 150,
    tip: 'Use line breaks and emojis strategically. Include your location and a clear CTA. Your website link goes in the dedicated URL field, not here.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Company',
    shortName: 'LinkedIn',
    charLimit: 2000,
    tip: 'Strike a professional tone. Mention industry credentials, years of experience, and the types of clients you serve. Good for B2B visibility.',
  },
  {
    id: 'apple-maps',
    name: 'Apple Maps',
    shortName: 'Apple',
    charLimit: 500,
    tip: 'Apple Maps descriptions should be clean and factual. Focus on services and location — skip the marketing language.',
  },
  {
    id: 'bing-places',
    name: 'Bing Places',
    shortName: 'Bing',
    charLimit: 750,
    tip: 'Similar format to Google Business Profile. Include your primary service and location. Bing is the default search engine on Microsoft devices.',
  },
  {
    id: 'nextdoor',
    name: 'Nextdoor',
    shortName: 'Nextdoor',
    charLimit: 300,
    tip: 'Emphasize your local connection — mention the neighborhood or community you serve. Nextdoor users value "one of us" businesses.',
  },
  {
    id: 'website',
    name: 'Website About Page',
    shortName: 'Website',
    charLimit: null,
    tip: 'Your website About page can be as long as needed. Include your story, services, credentials, and multiple calls to action.',
  },
];
