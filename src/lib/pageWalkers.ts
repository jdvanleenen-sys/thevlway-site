// Timing for the people who cross the blank strips of the Teams page. It runs on its own clock, not on scroll.
export const WALKER_CELL_WIDTH = 24;
export const WALKER_CELL_HEIGHT = 28;
export const WALKER_RUN_COLUMN = 2;

// Sprite rows in the cast sheet: Lea, Marcus, Hank, Lance, Paige, Jeff, Bip and Bit.
export const WALKER_CAST = [3, 2, 4, 5, 1, 0, 6, 7] as const;

// Pixels a second, from each character's personality: Hank rushes, Jeff is deliberate, Bit scurries.
export const WALKER_SPEEDS: Record<number, number> = {
  0: 30, // Jeff
  1: 50, // Paige
  2: 35, // Marcus
  3: 43, // Lea
  4: 64, // Hank
  5: 39, // Lance
  6: 27, // Bip
  7: 78, // Bit
};

const ROWS_PER_CHARACTER = 5;
const LEFT_ROW = 1;
const RIGHT_ROW = 3;
const PIXELS_PER_STRIDE = 6;
const BASE_REST = 3;
const REST_STEP = 1.3;
const LANE_OFFSET = 4.3;

export interface WalkerFrame {
  isCrossing: boolean;
  sprite: number;
  x: number;
  column: number;
  row: number;
}

export function walkerAt(laneIndex: number, laneWidth: number, drawnWidth: number, time: number): WalkerFrame {
  const distance = laneWidth + drawnWidth;
  const rest = BASE_REST + (laneIndex % 3) * REST_STEP;
  const lineup = WALKER_CAST.map((_, trip) => WALKER_CAST[(trip + laneIndex * 3) % WALKER_CAST.length]);
  const fullCycle = lineup.reduce<number>((total, sprite) => total + distance / WALKER_SPEEDS[sprite] + rest, 0);
  let elapsed = (time + laneIndex * LANE_OFFSET) % fullCycle;
  let trip = 0;
  while (elapsed >= distance / WALKER_SPEEDS[lineup[trip]] + rest) {
    elapsed -= distance / WALKER_SPEEDS[lineup[trip]] + rest;
    trip += 1;
  }
  const sprite = lineup[trip];
  const speed = WALKER_SPEEDS[sprite];
  const goesRight = (trip + laneIndex) % 2 === 0;
  const travelled = elapsed * speed;
  return {
    isCrossing: travelled < distance,
    sprite,
    x: goesRight ? travelled - drawnWidth : laneWidth - travelled,
    column: WALKER_RUN_COLUMN + (Math.floor(travelled / PIXELS_PER_STRIDE) % 4),
    row: sprite * ROWS_PER_CHARACTER + (goesRight ? RIGHT_ROW : LEFT_ROW),
  };
}
