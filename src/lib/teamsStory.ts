// The made-up job shown in the Teams film: who is where, and when. Times are in seconds.
export type Direction = 'down' | 'left' | 'up' | 'right';

export interface PathKey {
  at: number;
  x: number;
  y: number;
}

export interface FilmActor {
  id: string;
  label: string;
  sprite: number;
  zapAt: number;
  landAt: number;
  officeKeys: PathKey[];
  chatKeys: PathKey[];
  faces: { at: number; dir: Direction }[];
  talks: [number, number][];
}

export const FILM_LENGTH = 43;
export const POSTER_TIME = 41;
export const MERGE_START = 11;
export const FUSE_START = 13.4;
export const ZAP_START = 14.2;
export const ZAP_LENGTH = 0.6;
export const ZOOM_START = 16.2;
export const CHAT_START = 17.6;
export const FLAG_AT = 25.8;
export const HOLE_FILLED_AT = 32;
export const SIGNED_AT = 35.5;
export const FILE_AT = 36.4;

const LAND_TIME = 0.3;
const DROP_HEIGHT = 22;
const DESK_LINE = 84;
const SCREEN_LINE = 74;
const SEND_REACH = 9;
export const CHAT_COLUMNS = [28, 76, 124] as const;
export const CHAT_ROWS = [48, 86, 123] as const;

export const FILM_STEPS = [
  { at: 0, title: 'Everyone works alone.', text: 'Lea in Sales, Marcus in Finance, Hank in Operations and Lance in Marketing each have a private AI chat. Each holds part of the quarterly report.' },
  { at: 6, title: 'A cost gets lost.', text: 'Lea emails a change to Finance. It never reaches the numbers, and nobody knows.' },
  { at: MERGE_START, title: 'Their chats become one chat.', text: 'The private chats slide together, and everyone lands in the same EdubaWare chat, on a template built for this report.' },
  { at: 20.5, title: 'The parts come together.', text: 'Sales, Finance and Marketing add their parts to the report. Jeff is in the chat to help.' },
  { at: 25.5, title: 'The AI spots the gap.', text: "Bip, the AI, runs the template's check and flags one missing cost on job K-109. The template tells it not to guess a number." },
  { at: 30, title: 'A person fixes it.', text: 'Hank confirms the real cost. The fix goes in the shared file.' },
  { at: 34, title: 'The owner signs.', text: 'Paige reads the report and signs off. The finished Word file is ready to download.' },
] as const;

const officePath = (deskX: number): PathKey[] => [
  { at: 0, x: deskX, y: DESK_LINE },
  { at: FUSE_START - 0.4, x: deskX, y: DESK_LINE },
  { at: ZAP_START - 0.2, x: deskX, y: SCREEN_LINE },
];

const deskFaces = (turnsAt: number): FilmActor['faces'] => [
  { at: 0, dir: 'up' },
  { at: turnsAt, dir: 'down' },
  { at: MERGE_START, dir: 'up' },
  { at: CHAT_START, dir: 'down' },
];

// Steps toward the report, hands the part over, and steps back.
const sendPath = (x: number, y: number, landAt: number, sendAt: number): PathKey[] => [
  { at: landAt, x, y },
  { at: sendAt - 0.4, x, y },
  { at: sendAt, x: x + SEND_REACH, y },
  { at: sendAt + 0.5, x: x + SEND_REACH, y },
  { at: sendAt + 0.9, x, y },
];

const sendFaces = (faces: FilmActor['faces'], sendAt: number): FilmActor['faces'] => [
  ...faces,
  { at: sendAt, dir: 'right' },
  { at: sendAt + 0.6, dir: 'down' },
];

function staff(id: string, sprite: number, deskX: number, order: number, seat: [number, number], turnsAt: number, sendAt: number): FilmActor {
  const landAt = CHAT_START + 0.2 + order * 0.25;
  return {
    id,
    label: id.toUpperCase(),
    sprite,
    zapAt: ZAP_START + 0.2 + order * 0.25,
    landAt,
    officeKeys: officePath(deskX),
    chatKeys: sendPath(seat[0], seat[1], landAt, sendAt),
    faces: sendFaces(deskFaces(turnsAt), sendAt),
    talks: [[sendAt + 0.1, sendAt + 1.3]],
  };
}

export const FILM_ACTORS: FilmActor[] = [
  staff('lea', 3, 24, 0, [CHAT_COLUMNS[0], CHAT_ROWS[0]], 8.8, 21),
  staff('marcus', 2, 72, 1, [CHAT_COLUMNS[1], CHAT_ROWS[0]], 8.2, 22),
  staff('lance', 5, 168, 2, [CHAT_COLUMNS[2], CHAT_ROWS[0]], 10, 23),
  staff('hank', 4, 120, 3, [CHAT_COLUMNS[0], CHAT_ROWS[1]], 9.4, 31),
  staff('paige', 1, 216, 4, [CHAT_COLUMNS[1], CHAT_ROWS[1]], 10.2, 35),
  {
    id: 'jeff',
    label: 'JEFF',
    sprite: 0,
    zapAt: 0,
    landAt: CHAT_START + 1.5,
    officeKeys: [],
    chatKeys: sendPath(CHAT_COLUMNS[2], CHAT_ROWS[1], CHAT_START + 1.5, 24.2),
    faces: [{ at: 0, dir: 'down' }, { at: 24.2, dir: 'right' }, { at: 24.8, dir: 'down' }],
    talks: [[24.3, 25.3]],
  },
  {
    id: 'bip',
    label: 'BIP',
    sprite: 6,
    zapAt: 0,
    landAt: CHAT_START + 1.8,
    officeKeys: [],
    chatKeys: [
      { at: CHAT_START + 1.8, x: 20, y: CHAT_ROWS[2] },
      { at: FLAG_AT - 0.2, x: 20, y: CHAT_ROWS[2] },
      { at: FLAG_AT + 0.8, x: 84, y: CHAT_ROWS[2] },
    ],
    faces: [{ at: 0, dir: 'right' }],
    talks: [[FLAG_AT + 0.9, 29]],
  },
  {
    id: 'bit',
    label: 'BIT',
    sprite: 7,
    zapAt: 0,
    landAt: CHAT_START + 2.1,
    officeKeys: [],
    chatKeys: [
      { at: CHAT_START + 2.1, x: 122, y: CHAT_ROWS[2] },
      { at: FILE_AT + 0.2, x: 122, y: CHAT_ROWS[2] },
      { at: FILE_AT + 1.8, x: 172, y: CHAT_ROWS[2] },
    ],
    faces: [{ at: 0, dir: 'right' }],
    talks: [],
  },
];

export interface ActorPose {
  x: number;
  y: number;
  dir: Direction;
  walking: boolean;
  talking: boolean;
  visible: boolean;
  dissolve: number;
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));

function directionOf(dx: number, dy: number): Direction {
  if (Math.abs(dx) > Math.abs(dy)) return dx < 0 ? 'left' : 'right';
  return dy < 0 ? 'up' : 'down';
}

function pathAt(keys: PathKey[], time: number): { x: number; y: number; walkDir: Direction | null } {
  const nextIndex = keys.findIndex((key) => key.at > time);
  if (nextIndex <= 0) {
    const key = nextIndex === 0 ? keys[0] : keys[keys.length - 1];
    return { x: key.x, y: key.y, walkDir: null };
  }
  const from = keys[nextIndex - 1];
  const to = keys[nextIndex];
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (dx === 0 && dy === 0) return { x: from.x, y: from.y, walkDir: null };
  const progress = (time - from.at) / (to.at - from.at);
  return { x: from.x + dx * progress, y: from.y + dy * progress, walkDir: directionOf(dx, dy) };
}

export function poseAt(actor: FilmActor, time: number): ActorPose {
  const inChat = time >= actor.landAt;
  const hasLeftOffice = !actor.officeKeys.length || time >= actor.zapAt + ZAP_LENGTH;
  if (!inChat && hasLeftOffice) {
    return { x: 0, y: 0, dir: 'down', walking: false, talking: false, visible: false, dissolve: 0 };
  }
  const place = pathAt(inChat ? actor.chatKeys : actor.officeKeys, time);
  const facing = actor.faces.filter((face) => face.at <= time).at(-1)?.dir ?? 'down';
  const talking = !place.walkDir && actor.talks.some(([start, end]) => time >= start && time < end);
  const fall = inChat ? (1 - clamp((time - actor.landAt) / LAND_TIME)) ** 2 * DROP_HEIGHT : 0;
  return {
    x: place.x,
    y: place.y - fall,
    dir: place.walkDir ?? facing,
    walking: Boolean(place.walkDir),
    talking,
    visible: true,
    dissolve: inChat ? 0 : clamp((time - actor.zapAt) / ZAP_LENGTH),
  };
}

export function stepAt(time: number): number {
  let current = 0;
  FILM_STEPS.forEach((step, index) => {
    if (step.at <= time) current = index;
  });
  return current;
}
