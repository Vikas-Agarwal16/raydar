// Static config — tweak sites/categories here without touching onboarding, dashboard, or cron logic.

export const CATEGORIES = {
  exams: { label: 'Exams', cronOffset: 0 },
  internships: { label: 'Internships', cronOffset: 3 },
  hackathons: { label: 'Hackathons', cronOffset: 6 },
  counselling: { label: 'Counselling', cronOffset: 9 },
};

export const SITES = [
  // EXAMS — :00 cron
  { slug: 'nta', name: 'NTA', url: 'https://nta.ac.in', category: 'exams' },
  { slug: 'jee-main', name: 'JEE Main', url: 'https://jeemain.nta.nic.in', category: 'exams' },
  { slug: 'neet', name: 'NEET', url: 'https://neet.nta.nic.in', category: 'exams' },
  { slug: 'gate', name: 'GATE', url: 'https://gate2026.iitg.ac.in', category: 'exams' },

  // INTERNSHIPS — :03 cron
{ slug: 'amazon-sde-intern', name: 'Amazon — SDE Intern (India)', url: 'https://www.amazon.jobs/en/search?base_query=software+development+engineer+intern&country=IND', category: 'internships' },
  { slug: 'amazon-data-scientist-intern', name: 'Amazon — Data Scientist Intern (India)', url: 'https://www.amazon.jobs/en/search?base_query=data+scientist+intern&country=IND', category: 'internships' },
  { slug: 'amazon-ml-intern', name: 'Amazon — ML Intern (India)', url: 'https://www.amazon.jobs/en/search?base_query=machine+learning+intern&country=IND', category: 'internships' },  { slug: 'internshala', name: 'Internshala', url: 'https://internshala.com', category: 'internships' },
{ slug: 'unstop-internships', name: 'Unstop', url: 'https://api.unstop.com/internship', category: 'internships' },
{ slug: 'internshala-computer-science', name: 'Internshala — Computer Science', url: 'https://internshala.com/internships/computer-science-internship/', category: 'internships' },
{ slug: 'internshala-web-development', name: 'Internshala — Web Development', url: 'https://internshala.com/internships/web-development-internship/', category: 'internships' },
// HACKATHONS — :06 cron
  { slug: 'devfolio', name: 'Devfolio', url: 'https://devfolio.co/hackathons', category: 'hackathons' },
  { slug: 'unstop-hackathons', name: 'Unstop', url: 'https://api.unstop.com/hackathons', category: 'hackathons' },
  { slug: 'aicte', name: 'AICTE', url: 'https://www.aicte-india.org', category: 'hackathons' },
  { slug: 'nsp', name: 'National Scholarship Portal', url: 'https://scholarships.gov.in', category: 'hackathons' },

  // COUNSELLING — :09 cron
  { slug: 'josaa', name: 'JoSAA', url: 'https://josaa.nic.in', category: 'counselling' },
  { slug: 'csab', name: 'CSAB', url: 'https://csab.nic.in', category: 'counselling' },
  { slug: 'mcc', name: 'MCC', url: 'https://mcc.nic.in', category: 'counselling' },
 { slug: 'uptac', name: 'UPTAC', url: 'https://uptac.samarth.edu.in', category: 'counselling' },
];

export const getSitesByCategory = (category) =>
  SITES.filter((s) => s.category === category);

export const getSiteBySlug = (slug) =>
  SITES.find((s) => s.slug === slug);