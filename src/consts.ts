export const SITE_NAME = 'AI the vL Way';
export const SITE_DESCRIPTION =
  'Simple AI systems for trades and local service businesses, built around the way you already work.';
export const OWNER_NAME = 'Jeff van Leenen';
export const OWNER_LOCATION = 'Calgary, Alberta';

export const YOUTUBE_URL = 'https://www.youtube.com/@thevLway';
// Robo-Intern, the game Bip and Bit come from. thevlway.com/play forwards here (the short "Bip's First Day" names it).
export const ROBO_INTERN_URL = 'https://claude.ai/code/artifact/52eee8c6-a5c2-401c-a2a0-8630848288ef';

export const CONTACT_EMAIL = 'contact@thevlway.com';
export const EDUBAWARE_INVITE_URL = `mailto:${CONTACT_EMAIL}?subject=INVITE`;
export const EDUBAWARE_FREE_URL = `mailto:${CONTACT_EMAIL}?subject=FREE`;
export const EDUBAWARE_FOUNDING_SEATS = 5;
export const EDUBAWARE_PAGE_URL = 'https://thevlway.com/edubaware/';
// Paid affiliate link. Render it through AffiliateLink.astro or DOOR_LINKS so rel="sponsored" and the disclosure stay with it.
export const CLIEF_NOTES_AFFILIATE_URL =
  'https://www.skool.com/cliefnotes/about?ref=9b87167cad844357b07892d1da8b1c51';
export const CLIEF_NOTES_DISCLOSURE = "I'm a Clief Notes affiliate and earn a commission if you upgrade.";
export const EDUBAWARE_PRICE = '$30 USD';
export const EDUBAWARE_REFUND_DAYS = 7;
export const ICM_PAPER_URL = 'https://arxiv.org/abs/2603.16021';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog/', label: 'Blog' },
  { href: '/about/', label: 'About' },
] as const;

interface DoorLink {
  href: string;
  label: string;
  rel?: 'sponsored';
}

// The 2 doors in the shared menu and footer.
export const DOOR_LINKS: readonly DoorLink[] = [
  { href: CLIEF_NOTES_AFFILIATE_URL, label: 'Clief Notes (affiliate link)', rel: 'sponsored' },
  { href: '/edubaware/', label: 'EdubaWare school' },
];
