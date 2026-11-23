// Justified text needs break points in long words, and browser hyphenation is not always available.
// These add invisible break points after the page loads, so the saved page text stays clean.
const BREAKS = [
  'an-y-one', 'be-tween', 'build-ing', 'com-pa-ny', 'com-pe-ti-tions', 'con-fi-den-tial', 'con-firms', 'con-nec-tions',
  'co-work-er', 'cus-tom', 'de-ci-sions', 'de-part-ment', 'de-part-ments', 'dif-fer-ent', 'doc-u-ment', 'down-load',
  'ev-ery-one', 'ex-am-ples', 'ex-ec-u-tive', 'fea-tures', 'fin-ished', 'hand-offs', 'in-for-ma-tion', 'in-ves-tors',
  'man-ag-ers', 'mar-ket-ing', 'meas-ured', 'mem-o-ran-dum', 'miss-ing', 'noth-ing', 'num-ber', 'op-er-at-ing',
  'op-er-a-tions', 'or-ga-ni-za-tion', 'or-ga-niz-ing', 'over-write', 'part-ner', 'peo-ple', 'per-son', 'plat-form',
  'pri-vate', 'pro-ce-dures', 'pro-cess', 'prod-ucts', 'quar-ter-ly', 're-view', 'sched-uled', 'sep-a-rate', 'some-one',
  'stan-dard', 'struc-ture', 'teach-er', 'teach-ing', 'tem-plate', 'tem-plates', 'to-geth-er', 'train-ing', 'work-space',
];
const SOFT_HYPHEN = '­';
const BREAKS_BY_WORD = new Map(BREAKS.map((word) => [word.replaceAll('-', ''), word.split('-').map((part) => part.length)]));

function addBreaks(word: string): string {
  const parts = BREAKS_BY_WORD.get(word.toLowerCase());
  if (!parts) return word;
  let start = 0;
  return parts
    .map((length) => {
      const piece = word.slice(start, start + length);
      start += length;
      return piece;
    })
    .join(SOFT_HYPHEN);
}

export function addSoftHyphens(root: ParentNode, selector: string) {
  root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    nodes.forEach((node) => {
      if (node.data.includes('@')) return;
      node.data = node.data.replace(/[A-Za-z]{6,}/g, addBreaks);
    });
  });
}
