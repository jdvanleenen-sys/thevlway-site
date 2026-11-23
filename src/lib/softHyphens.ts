// Justified text needs break points in long words, and browser hyphenation is not always available.
// These add invisible break points after the page loads, so the saved page text stays clean.
import { HYPHEN_WORDS } from './softHyphenWords';

const SOFT_HYPHEN = '\u00AD';
const SKIP = 'pre, code, textarea, .button, .small, [id="promptBox"]';
const BREAKS = new Map(HYPHEN_WORDS.split(' ').map((word) => [word.replaceAll('-', ''), word.split('-').map((part) => part.length)]));

function addBreaks(word: string): string {
  const parts = BREAKS.get(word.toLowerCase());
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

// Long emails and web addresses get invisible break points, which copying and clicking ignore.
function addAddressBreaks(element: HTMLElement) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    if (node.parentElement?.closest(SKIP) || !/\S+[@/.]\S{6,}/.test(node.data)) return;
    const pieces = node.data.split(/(?<=[@/])|(?<=\.)(?=[a-z])/);
    if (pieces.length < 2) return;
    const parts = pieces.flatMap((piece, index) => (index ? [document.createElement('wbr'), piece] : [piece]));
    node.replaceWith(...parts);
  });
}

export function addSoftHyphens(root: ParentNode, selector: string) {
  root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    if (element.closest(SKIP)) return;
    addAddressBreaks(element);
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    nodes.forEach((node) => {
      if (node.data.includes('@') || node.parentElement?.closest(SKIP)) return;
      node.data = node.data.replace(/[A-Za-z]{7,}/g, addBreaks);
    });
  });
}
