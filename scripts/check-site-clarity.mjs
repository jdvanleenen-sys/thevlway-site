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
check(3, 'First button on home is the free lessons', ['home'].filter(() => {
  const first = pages.home.main.match(/<a\b[^>]*class="[^"]*button[^"]*"[^>]*>/)?.[0] ?? '';
  return !first.includes('subject=FREE');
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
check(13, 'Main pages say "weekly job", not "task"', failing(['home', 'edubaware', 'about'], (p) => /weekly job/.test(p.text) && !/\btasks?\b/i.test(p.text)));
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

let failed = 0;
for (const { id, label, failures } of results) {
  if (failures.length) failed += 1;
  console.log(`${failures.length ? 'FAIL' : 'PASS'} ${String(id).padStart(2)} ${label}`);
  [...new Set(failures)].slice(0, 6).forEach((failure) => console.log(`       ${failure}`));
}
console.log(`\n${results.length - failed} of ${results.length} checks pass`);
process.exit(failed ? 1 : 0);
