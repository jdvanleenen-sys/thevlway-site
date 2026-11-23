// Small pixel-art helpers shared by the Teams film: colours, a 3 x 5 font, icons and speech bubbles.
export const INK = '#14314f';
export const PAPER = '#f7f3ee';
export const CREAM = '#ede7df';
export const BURGUNDY = '#5d3136';
export const DARK_BURGUNDY = '#4a2c2a';
export const MID = '#4a6785';
export const WHITE = '#ffffff';

const GLYPHS: Record<string, string> = {
  A: '111101111101101', B: '110101110101110', C: '111100100100111', D: '110101101101110', E: '111100110100111',
  F: '111100110100100', G: '111100101101111', H: '101101111101101', I: '111010010010111', J: '001001001101111',
  K: '101110100110101', L: '100100100100111', M: '101111111101101', N: '110101101101101', O: '111101101101111',
  P: '111101111100100', Q: '111101101111001', R: '110101110101101', S: '111100111001111', T: '111010010010010',
  U: '101101101101111', W: '101101111111101', X: '101101010101101', '0': '111101101101111', '1': '010110010010111',
  '3': '111001011001111', '9': '111101111001111', '-': '000000111000000', '?': '111001011000010', '!': '010010010000010',
};

const ICONS: Record<string, string[]> = {
  page: ['NNNNNNN', 'NWWWWWN', 'NWMMMWN', 'NWWWWWN', 'NWMMMWN', 'NWWWWWN', 'NNNNNNN'],
  mail: ['NNNNNNNNN', 'NWNWWWNWN', 'NWWNWNWWN', 'NWWWNWWWN', 'NWWWWWWWN', 'NNNNNNNNN'],
  check: ['......B', '.....BB', 'B...BB.', 'BB.BB..', '.BBB...', '..B....'],
};
const ICON_COLORS: Record<string, string> = { N: INK, W: PAPER, M: MID, B: BURGUNDY };

export function fillBox(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(width), Math.round(height));
}

export function outlineBox(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fill: string, edge = INK) {
  fillBox(ctx, x, y, width, height, edge);
  fillBox(ctx, x + 1, y + 1, width - 2, height - 2, fill);
}

export function drawIcon(ctx: CanvasRenderingContext2D, name: keyof typeof ICONS, x: number, y: number) {
  ICONS[name].forEach((row, rowIndex) => {
    [...row].forEach((cell, columnIndex) => {
      if (cell === '.') return;
      ctx.fillStyle = ICON_COLORS[cell];
      ctx.fillRect(Math.round(x) + columnIndex, Math.round(y) + rowIndex, 1, 1);
    });
  });
}

export function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  ctx.fillStyle = color;
  [...text].forEach((character, index) => {
    [...(GLYPHS[character] ?? '')].forEach((bit, bitIndex) => {
      if (bit === '1') ctx.fillRect(Math.round(x) + index * 4 + (bitIndex % 3), Math.round(y) + Math.floor(bitIndex / 3), 1, 1);
    });
  });
}

export function drawBubble(ctx: CanvasRenderingContext2D, character: string, centerX: number, feetY: number) {
  const left = Math.round(centerX) - 4;
  const top = Math.round(feetY) - 36;
  fillBox(ctx, left - 1, top - 1, 11, 11, INK);
  fillBox(ctx, left + 3, top + 10, 3, 1, INK);
  fillBox(ctx, left, top, 9, 9, PAPER);
  drawText(ctx, character, left + 3, top + 2, BURGUNDY);
}

export const ease = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};

export const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;
