// Draws the inside of the shared EdubaWare chat: the messages people stand on and the report they build.
import { BURGUNDY, CREAM, DARK_BURGUNDY, INK, MID, PAPER, WHITE, drawBubble, drawIcon, drawText, ease, fillBox, mix, outlineBox } from './teamsFilmPixels';
import { CHAT_COLUMNS, CHAT_ROWS, FILE_AT, FILM_ACTORS, FLAG_AT, HOLE_FILLED_AT, SIGNED_AT } from './teamsStory';

const WIDTH = 240;
const HEIGHT = 135;
const BAR_HEIGHT = 11;
const DIVIDER_X = 150;
const MESSAGE_WIDTH = 44;
const MESSAGE_HEIGHT = 11;
const BIP_MESSAGE_WIDTH = 96;
const PAGE = { x: 156, y: 15, width: 77, height: 88 };
const FLY_TIME = 0.8;
const SLOT_HEIGHT = 12;

const SLOTS = [
  { label: 'SALES', fillAt: 21.9, fromX: CHAT_COLUMNS[0] + 18, fromY: CHAT_ROWS[0] - 12 },
  { label: 'COSTS', fillAt: 22.9, fromX: CHAT_COLUMNS[1] + 18, fromY: CHAT_ROWS[0] - 12 },
  { label: 'MKTG', fillAt: 23.9, fromX: CHAT_COLUMNS[2] + 18, fromY: CHAT_ROWS[0] - 12 },
  { label: 'K-109', fillAt: HOLE_FILLED_AT, fromX: CHAT_COLUMNS[0] + 18, fromY: CHAT_ROWS[1] - 12 },
];

const slotY = (index: number) => PAGE.y + 13 + index * 15;

export function drawChatShell(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
  outlineBox(ctx, x, y, width, height, PAPER);
  fillBox(ctx, x, y, width, Math.min(BAR_HEIGHT, height), BURGUNDY);
  if (width > 60) drawText(ctx, 'EDUBAWARE', x + 4, y + 3, PAPER);
  if (width > 150) drawText(ctx, 'KESTREL REPORT', x + width - 60, y + 3, PAPER);
}

function drawMessage(ctx: CanvasRenderingContext2D, label: string, x: number, y: number, width: number, note: string, time: number, appearsAt: number) {
  const reveal = ease((time - appearsAt) / 0.25);
  if (reveal <= 0) return;
  const drawnWidth = Math.max(4, Math.round(width * reveal));
  outlineBox(ctx, x, y, drawnWidth, MESSAGE_HEIGHT, WHITE);
  if (reveal < 1) return;
  drawText(ctx, label, x + 3, y + 3, BURGUNDY);
  if (note) drawText(ctx, note, x + 3 + (label.length + 1) * 4, y + 3, INK);
  else fillBox(ctx, x + 3 + (label.length + 1) * 4, y + 5, Math.max(2, width - 7 - (label.length + 1) * 4), 1, MID);
}

function bipNote(time: number) {
  if (time >= HOLE_FILLED_AT) return 'K-109 FIXED';
  return time >= FLAG_AT ? 'K-109 COST MISSING' : 'CHECKING';
}

function drawMessages(ctx: CanvasRenderingContext2D, time: number) {
  FILM_ACTORS.filter((actor) => actor.id !== 'bit').forEach((actor) => {
    const home = actor.chatKeys[0];
    if (actor.id === 'bip') {
      drawMessage(ctx, actor.label, 6, CHAT_ROWS[2], BIP_MESSAGE_WIDTH, bipNote(time), time, actor.landAt);
      return;
    }
    drawMessage(ctx, actor.label, home.x - 22, home.y, MESSAGE_WIDTH, '', time, actor.landAt);
  });
  fillBox(ctx, 104, CHAT_ROWS[2], WIDTH - 108, 2, INK);
  if (time >= HOLE_FILLED_AT) drawIcon(ctx, 'check', CHAT_COLUMNS[0] + 13, CHAT_ROWS[1] + 3);
}

function drawSlot(ctx: CanvasRenderingContext2D, index: number, time: number) {
  const slot = SLOTS[index];
  const y = slotY(index);
  const x = PAGE.x + 4;
  const width = PAGE.width - 8;
  if (time >= slot.fillAt) {
    outlineBox(ctx, x, y, width, SLOT_HEIGHT, CREAM);
    fillBox(ctx, x, y, 3, SLOT_HEIGHT, BURGUNDY);
    drawText(ctx, slot.label, x + 6, y + 4, BURGUNDY);
    fillBox(ctx, x + 32, y + 4, width - 37, 1, MID);
    fillBox(ctx, x + 32, y + 7, width - 45, 1, MID);
    return;
  }
  const isFlagged = index === 3 && time >= FLAG_AT;
  const blinkOn = isFlagged && Math.floor(time * 3) % 2 === 0;
  const edge = isFlagged ? BURGUNDY : MID;
  for (let dash = 0; dash < width; dash += 4) {
    fillBox(ctx, x + dash, y, 2, 1, edge);
    fillBox(ctx, x + dash, y + SLOT_HEIGHT - 1, 2, 1, edge);
  }
  for (let dash = 0; dash < SLOT_HEIGHT; dash += 3) {
    fillBox(ctx, x, y + dash, 1, 2, edge);
    fillBox(ctx, x + width - 1, y + dash, 1, 2, edge);
  }
  if (blinkOn) fillBox(ctx, x + 2, y + 2, width - 4, SLOT_HEIGHT - 4, PAPER);
  if (isFlagged) drawText(ctx, 'K-109 ?', x + 6, y + 4, BURGUNDY);
}

function drawReport(ctx: CanvasRenderingContext2D, time: number) {
  const shake = time >= SIGNED_AT && time < SIGNED_AT + 0.25 ? (Math.floor(time * 24) % 2) * 2 - 1 : 0;
  ctx.save();
  ctx.translate(shake, 0);
  outlineBox(ctx, PAGE.x, PAGE.y, PAGE.width, PAGE.height, WHITE);
  drawText(ctx, 'Q3 REPORT', PAGE.x + 4, PAGE.y + 4, INK);
  fillBox(ctx, PAGE.x + 4, PAGE.y + 11, PAGE.width - 8, 1, INK);
  SLOTS.forEach((_, index) => drawSlot(ctx, index, time));
  if (time >= SIGNED_AT) {
    const landing = ease((time - SIGNED_AT) / 0.18);
    const y = mix(PAGE.y + 62, PAGE.y + 73, landing);
    outlineBox(ctx, PAGE.x + 21, y, 35, 12, BURGUNDY, DARK_BURGUNDY);
    drawText(ctx, 'SIGNED', PAGE.x + 27, y + 4, PAPER);
  }
  ctx.restore();
}

export function drawChatBase(ctx: CanvasRenderingContext2D, time: number) {
  drawChatShell(ctx, 0, 0, WIDTH, HEIGHT);
  fillBox(ctx, DIVIDER_X, BAR_HEIGHT, 1, HEIGHT - BAR_HEIGHT - 1, CREAM);
  drawMessages(ctx, time);
  drawReport(ctx, time);
}

export function drawChatOverlays(ctx: CanvasRenderingContext2D, time: number) {
  SLOTS.forEach((slot, index) => {
    if (time < slot.fillAt - FLY_TIME || time >= slot.fillAt) return;
    const progress = ease((time - (slot.fillAt - FLY_TIME)) / FLY_TIME);
    const x = mix(slot.fromX, PAGE.x + 8, progress);
    const y = mix(slot.fromY, slotY(index) + 2, progress) - Math.sin(progress * Math.PI) * 12;
    outlineBox(ctx, x, y, 16, 8, CREAM);
    fillBox(ctx, x + 1, y + 1, 2, 6, BURGUNDY);
  });
  if (time >= FLAG_AT + 0.9 && time < HOLE_FILLED_AT) drawBubble(ctx, '!', 106, CHAT_ROWS[2] + 12);
  if (time >= FILE_AT) {
    const pop = ease((time - FILE_AT) / 0.25);
    drawIcon(ctx, 'page', 190, CHAT_ROWS[2] - 8 * pop);
    if (pop === 1) drawText(ctx, 'DOCX', 200, CHAT_ROWS[2] - 7, BURGUNDY);
  }
}
