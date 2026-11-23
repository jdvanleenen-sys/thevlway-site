// Draws 1 frame of the Teams film on a 240 x 135 pixel grid, using the cast movement sheet.
import { drawChatBase, drawChatOverlays, drawChatShell } from './teamsFilmChat';
import { BURGUNDY, INK, MID, PAPER, drawBubble, drawIcon, ease, fillBox, mix, outlineBox } from './teamsFilmPixels';
import {
  CHAT_START,
  FILM_ACTORS,
  FUSE_START,
  MERGE_START,
  ZAP_LENGTH,
  ZOOM_START,
  poseAt,
  type ActorPose,
  type Direction,
} from './teamsStory';

export const GRID_WIDTH = 240;
export const GRID_HEIGHT = 135;
export const PIXEL_SCALE = 4;

const CELL_WIDTH = 24;
const CELL_HEIGHT = 28;
const ROWS_PER_CHARACTER = 5;
const OFFICES = 5;
const OFFICE_WIDTH = 48;
const DIRECTION_ROW: Record<Direction, number> = { down: 0, left: 1, up: 2, right: 3 };
const WALK_COLUMN = 2;
const TALK_COLUMN = 6;
const SHARED_WINDOW = { x: 20, y: 6, width: 200, height: 40 };

export interface FilmImages {
  cast: HTMLImageElement;
  offices: HTMLImageElement;
}

function spriteColumn(pose: ActorPose, time: number): number {
  if (pose.walking) return WALK_COLUMN + (Math.floor(time * 8) % 4);
  if (pose.talking && pose.dir !== 'up') return TALK_COLUMN + (Math.floor(time * 5) % 2);
  return Math.floor(time * 1.4) % 2;
}

function drawActor(ctx: CanvasRenderingContext2D, cast: HTMLImageElement, sprite: number, pose: ActorPose, time: number) {
  if (!pose.visible) return;
  const column = spriteColumn(pose, time);
  const row = sprite * ROWS_PER_CHARACTER + DIRECTION_ROW[pose.dir];
  const drawX = Math.round(pose.x - CELL_WIDTH / 2);
  const drawY = Math.round(pose.y - CELL_HEIGHT);
  ctx.save();
  if (pose.dissolve > 0) {
    ctx.beginPath();
    ctx.rect(drawX, drawY, CELL_WIDTH, Math.round(CELL_HEIGHT * (1 - pose.dissolve)));
    ctx.clip();
  }
  ctx.drawImage(cast, column * CELL_WIDTH, row * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT, drawX, drawY, CELL_WIDTH, CELL_HEIGHT);
  ctx.restore();
}

function drawPrivateChats(ctx: CanvasRenderingContext2D, time: number) {
  if (time >= MERGE_START) return;
  for (let office = 0; office < OFFICES; office += 1) {
    const left = office * OFFICE_WIDTH + 19;
    const tick = Math.floor(time * 2 + office * 1.7);
    ctx.fillStyle = MID;
    for (let line = 0; line < 3; line += 1) {
      const width = 3 + ((tick + line * 3 + office) % 7);
      ctx.fillRect(left, 31 + line * 3, width, 1);
    }
  }
}

function drawLostEmail(ctx: CanvasRenderingContext2D, time: number) {
  if (time >= 6.6 && time < 8) {
    const progress = (time - 6.6) / 1.4;
    drawIcon(ctx, 'mail', 28 + progress * 16, 58 - Math.sin(progress * Math.PI) * 16);
  } else if (time >= 8 && time < 9) {
    drawIcon(ctx, 'mail', 38, 58 + (time - 8) * 34);
  } else if (time >= 9 && time < ZOOM_START) {
    drawIcon(ctx, 'mail', 38, 92);
  }
}

function drawOfficeQuestions(ctx: CanvasRenderingContext2D, time: number) {
  if (time >= 8.8 && time < MERGE_START) {
    drawBubble(ctx, '?', 72, 84);
    if (time >= 9.5) drawBubble(ctx, '?', 120, 84);
  }
}

function drawSlidingChats(ctx: CanvasRenderingContext2D, time: number) {
  const progress = ease((time - MERGE_START) / (FUSE_START - MERGE_START));
  for (let office = 0; office < OFFICES; office += 1) {
    const x = mix(office * OFFICE_WIDTH + 16, SHARED_WINDOW.x + office * 40, progress);
    const y = mix(28, SHARED_WINDOW.y, progress);
    const width = mix(16, 40, progress);
    const height = mix(13, SHARED_WINDOW.height, progress);
    outlineBox(ctx, x, y, width, height, PAPER);
    fillBox(ctx, x, y, width, 3, BURGUNDY);
    fillBox(ctx, x + 3, y + height * 0.5, width * 0.6, 1, MID);
  }
}

function drawSharedWindow(ctx: CanvasRenderingContext2D, time: number) {
  const zoom = ease((time - ZOOM_START) / (CHAT_START - ZOOM_START));
  const x = mix(SHARED_WINDOW.x, 0, zoom);
  const y = mix(SHARED_WINDOW.y, 0, zoom);
  const width = mix(SHARED_WINDOW.width, GRID_WIDTH, zoom);
  const height = mix(SHARED_WINDOW.height, GRID_HEIGHT, zoom);
  drawChatShell(ctx, x, y, width, height);
  if (zoom > 0) return;
  for (let line = 0; line < 4; line += 1) {
    const lineWidth = 60 + ((line * 37 + Math.floor(time * 3) * 11) % 90);
    fillBox(ctx, x + 6, y + 16 + line * 6, lineWidth, 2, line % 2 ? BURGUNDY : MID);
  }
}

function drawZapBeams(ctx: CanvasRenderingContext2D, time: number) {
  FILM_ACTORS.filter((actor) => actor.officeKeys.length > 0).forEach((actor) => {
    if (time < actor.zapAt || time >= actor.zapAt + ZAP_LENGTH) return;
    const pose = poseAt(actor, time);
    const top = SHARED_WINDOW.y + SHARED_WINDOW.height;
    const flicker = Math.floor(time * 20) % 2 === 0;
    fillBox(ctx, pose.x - 5, top, 10, pose.y - top, flicker ? BURGUNDY : PAPER);
    fillBox(ctx, pose.x - 2, top, 4, pose.y - top, flicker ? PAPER : INK);
  });
}

function drawOfficeScene(ctx: CanvasRenderingContext2D, images: FilmImages, time: number) {
  ctx.drawImage(images.offices, 0, 0, GRID_WIDTH, GRID_HEIGHT);
  drawPrivateChats(ctx, time);
  drawLostEmail(ctx, time);
  FILM_ACTORS.forEach((actor) => drawActor(ctx, images.cast, actor.sprite, poseAt(actor, time), time));
  drawZapBeams(ctx, time);
  drawOfficeQuestions(ctx, time);
  if (time >= MERGE_START && time < FUSE_START) drawSlidingChats(ctx, time);
  if (time >= FUSE_START) drawSharedWindow(ctx, time);
}

function drawChatScene(ctx: CanvasRenderingContext2D, images: FilmImages, time: number) {
  drawChatBase(ctx, time);
  FILM_ACTORS.forEach((actor) => drawActor(ctx, images.cast, actor.sprite, poseAt(actor, time), time));
  drawChatOverlays(ctx, time);
}

export function drawFilmFrame(ctx: CanvasRenderingContext2D, images: FilmImages, time: number) {
  ctx.setTransform(PIXEL_SCALE, 0, 0, PIXEL_SCALE, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, GRID_WIDTH, GRID_HEIGHT);
  if (time < CHAT_START) drawOfficeScene(ctx, images, time);
  else drawChatScene(ctx, images, time);
}
