// Pass/fail checks for docs/specs/2026-11-23-site-clarity.md. Run after `npm run build`.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const CORE_PAGES = { home: 'index.html', edubaware: 'edubaware/index.html', about: 'about/index.html', teams: 'teams/index.html' };
const RETIRED = ['Build One Thing', 'Run Your Whole', 'Need It Built', 'week 1 of 6', 'Week 1 of 6', 'Coming in Week 2', 'Next up is week 2', 'getcybersafe', 'one of four folders', 'Understand it with me', 'Build one task that runs', 'AI agent'];
const FORBIDDEN_CLAIMS = [/replaces? (your )?(Claude|ChatGPT|Gemini)/i, /\bROI\b/, /honestly/i, /—/];
const CREDIT = "one of Jake Van Clief's 7 Masters of ICM";
const ICM_PLAIN = 'show AI where to look';
const results = [];

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

function mainHtml(html) {
  return html.match(/<main[\s\S]*<\/main>/)?.[0] ?? '';
}

function visibleText(html) {
  return html
    .replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/­/g, '')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&#x26;|&amp;/g, '&')
    .replace(/\s+/g, ' ');
}

function check(id, label, failures) {
  results.push({ id, label, failures });
}

const pages = Object.fromEntries(
  Object.entries(CORE_PAGES).map(([name, file]) => {
    const html = readFileSync(join(DIST, file), 'utf8');
    return [name, { html, main: mainHtml(html), text: visibleText(mainHtml(html)) }];
  }),
);
const allFiles = htmlFiles(DIST);
const postFiles = allFiles.filter((file) => /blog[\\/].+[\\/]index\.html$/.test(file));
const coreNames = Object.keys(pages);
const failing = (names, test) => names.filter((name) => !test(pages[name]));
const heroOf = (page) => visibleText(page.main.split(/<h2/)[0]);

check(1, 'Main pages say "same chat"', failing(coreNames, (p) => /same (live )?chat/i.test(p.text)));
check(2, 'Home hero names the teacher, the AI coach and the same chat', ['home'].filter(() => {
  const hero = heroOf(pages.home);
  return !(/teacher/i.test(hero) && /AI coach/.test(hero) && /same chat/i.test(hero));
}));
check(3, 'First button on home is the Clief Notes free door', ['home'].filter(() => {
  const first = pages.home.main.match(/<a\s[^>]*class="[^"]*button[^"]*"[^>]*>/)?.[0] ?? '';
  return !(first.includes('skool.com/cliefnotes') && first.includes('sponsored'));
}));
check(4, 'Free offer says Jeff joins with a paid seat', ['edubaware'].filter(() => !/Free lessons are with the AI coach/.test(pages.edubaware.text)));
check(5, 'Home says the last three lessons are being finished', ['home'].filter(() => !/last three lessons/i.test(pages.home.text)));
check(6, 'Paid offer states five founding seats', failing(['home', 'edubaware', 'about'], (p) => /five founding seats/i.test(p.text)).concat(
  postFiles.filter((file) => !/five founding seats/i.test(visibleText(mainHtml(readFileSync(file, 'utf8')))))));
check(7, 'Cancellation terms cover downloading files', ['edubaware'].filter(() => !/download your files/i.test(pages.edubaware.text)));
check(8, 'No retired names, dead promises or old terms', allFiles.flatMap((file) => {
  const text = readFileSync(file, 'utf8');
  return RETIRED.filter((term) => text.includes(term)).map((term) => `${file}: ${term}`);
}));
check(9, 'Bottleneck post links four stages to six folders', ['business-bottleneck'].filter(() => {
  const text = visibleText(mainHtml(readFileSync(join(DIST, 'blog/business-bottleneck/index.html'), 'utf8')));
  return !/six folders/.test(text);
}));
check(10, 'ICM is explained on every main page', failing(coreNames, (p) => p.text.includes(ICM_PLAIN)));
check(11, 'Exact Masters credit is intact', failing(['edubaware', 'about', 'teams'], (p) => p.text.includes(CREDIT)));
check(12, 'Teacher credential on home and About', failing(['home', 'about'], (p) => /over 24 years/.test(p.text)));
check(13, 'School pages say "weekly task", never "weekly job"', failing(['home', 'edubaware', 'about'], (p) => /weekly task/.test(p.text) && !/weekly job/i.test(p.text)));
check(14, 'No digit mid-sentence on main pages', coreNames.flatMap((name) => {
  const hits = pages[name].text.match(/\b[a-z]+ [1-9] [a-z]+/g) ?? [];
  return hits.filter((hit) => !/7 Masters/.test(hit)).map((hit) => `${name}: ${hit}`);
}));
check(15, 'No forbidden claims or voice breaks', coreNames.flatMap((name) =>
  FORBIDDEN_CLAIMS.filter((rule) => rule.test(pages[name].text)).map((rule) => `${name}: ${rule}`)));
check(16, 'Every internal link resolves', allFiles.flatMap((file) => {
  const html = readFileSync(file, 'utf8');
  return [...html.matchAll(/href="(\/[^"#?]*)/g)]
    .map((match) => match[1])
    .filter((href) => !existsSync(join(DIST, href)) && !existsSync(join(DIST, href, 'index.html')))
    .map((href) => `${file}: ${href}`);
}));

check(17, 'No words joined by a missing space', coreNames.flatMap((name) => (pages[name].text.match(/[a-z]founding|[a-z]{2}[.,][A-Z][a-z]+/g) ?? []).map((hit) => `${name}: ${hit}`)));

check(18, 'School pages do not sell crew or team work', failing(['home', 'edubaware', 'about'], (p) => !/your crew/i.test(p.text)));

check(19, 'Founding price lock and second refund window are stated', ['edubaware'].filter(() => !(/locked for as long as you stay subscribed/.test(pages.edubaware.text) && /another seven days/.test(pages.edubaware.text))));

check(20, 'No Bip on the blog index or in any post title', allFiles.filter((file) => /blog[\\/]index\.html$/.test(file) && /\bBip\b/.test(mainHtml(readFileSync(file, 'utf8')))).concat(
  postFiles.filter((file) => /\bBip\b/.test(readFileSync(file, 'utf8').match(/<h1[\s\S]*?<\/h1>/)?.[0] ?? ''))));
check(21, 'Home has no free throws', ['home'].filter(() => /free throws/i.test(pages.home.text)));
check(22, 'Home says what you get from all three doors', ['home'].filter(() => (heroOf(pages.home).match(/What you get/g) ?? []).length !== 3));
check(23, 'Approved audience line is on home and the school page', failing(['home', 'edubaware'], (p) => /office work piling up behind the job/.test(p.text)));
check(24, 'Approved outcome is on home, school and About', failing(['home', 'edubaware', 'about'], (p) => /runs in steps, checks itself and hands it to (you|them) to sign off/.test(p.text)));
check(25, 'Home hero shows Clief, then the school, then Teams', ['home'].filter(() => {
  const hero = pages.home.main.split(/<h2/)[0];
  const order = ['skool.com/cliefnotes', '/edubaware/', '/teams/'].map((link) => hero.indexOf(link));
  return order.some((at) => at < 0) || !(order[0] < order[1] && order[1] < order[2]);
}));
check(26, 'Every selling page links both doors in its main content', ['index.html', 'about/index.html', 'edubaware/index.html', ...postFiles.map((file) => file.slice(DIST.length + 1))].filter((file) => {
  const main = mainHtml(readFileSync(join(DIST, file), 'utf8'));
  const reachesSchool = file === 'edubaware/index.html' || main.includes('/edubaware/');
  return !(main.includes('skool.com/cliefnotes') && reachesSchool);
}));
check(27, 'No line sells the school against Clief Notes', allFiles.flatMap((file) => {
  const text = visibleText(mainHtml(readFileSync(file, 'utf8')));
  return ['Why pay when Clief', 'not in Clief Notes', 'What if I am not in Clief', 'New to Clief'].filter((term) => text.includes(term)).map((term) => `${file}: ${term}`);
}));
check(28, 'Teams carries the locked story, the Creator line and the three built templates', ['teams'].filter(() => {
  const t = pages.teams.text;
  return !(/what's in, what's missing and who does what next/.test(t) && /same steps and the same checks/.test(t) && /Earnings report/.test(t) && /Mini CIM/.test(t) && /Marketing video plan/.test(t)) || /I can build your templates/.test(t);
}));
check(29, 'Home and school say the founding price will rise', failing(['home', 'edubaware'], (p) => /price will rise/.test(p.text)));
check(30, 'One word for the team place: shared room', coreNames.filter((name) => /shared workspace/i.test(pages[name].text)).concat(/shared workspace/i.test(visibleText(mainHtml(readFileSync(join(DIST, 'privacy/index.html'), 'utf8')))) ? ['privacy'] : []));
check(31, 'Built templates are labelled as made-up data so far', ['teams'].filter(() => !/Shown so far on made-up data/.test(pages.teams.text)));

check(32, 'No overpromise of constant presence or real-business-only builds', allFiles.flatMap((file) => {
  const text = visibleText(mainHtml(readFileSync(file, 'utf8')));
  return ['I stay in the chat', 'only show you builds', 'Money, because change orders'].filter((term) => text.includes(term)).map((term) => `${file}: ${term}`);
}));

check(33, 'No Bip in the written text of any blog post', postFiles.filter((file) => /\bBip\b|Robo-Intern/.test(visibleText(mainHtml(readFileSync(file, 'utf8'))))));
check(34, 'About states the varsity coaching record, with no free throws', ['about'].filter(() => !/coached varsity basketball and volleyball/.test(pages.about.text) || /free throws/i.test(pages.about.text)));
check(35, 'Teams says the three templates are included and seats are separate from the founding seats', ['teams'].filter(() => !/three built templates are included/i.test(pages.teams.text) || !/not part of the school's five founding seats/.test(pages.teams.text)));
check(36, 'Home says the three built templates are included with Teams', ['home'].filter(() => !/Three built templates included/.test(pages.home.text)));

check(37, 'No digit mid-sentence in blog posts, apart from step, week and session labels', postFiles.flatMap((file) => {
  const text = visibleText(mainHtml(readFileSync(file, 'utf8')).replace(/<(h1|pre|code)[\s\S]*?<\/\1>/g, ' '));
  return (text.match(/\b[a-z]+ [1-9] [a-z]+/g) ?? []).filter((hit) => !/^(step|steps|week|session) /.test(hit)).map((hit) => `${file}: ${hit}`);
}));

let failed = 0;
for (const { id, label, failures } of results) {
  if (failures.length) failed += 1;
  console.log(`${failures.length ? 'FAIL' : 'PASS'} ${String(id).padStart(2)} ${label}`);
  [...new Set(failures)].slice(0, 6).forEach((failure) => console.log(`       ${failure}`));
}
console.log(`\n${results.length - failed} of ${results.length} checks pass`);
process.exit(failed ? 1 : 0);
