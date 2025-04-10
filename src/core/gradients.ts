/** グラデーションの種類を表す識別子 */
export type GradientType
  = 'KIWAMI'
  | 'AURA_URA'
  | 'AURA'
  | 'RAINBOW'
  | 'PLATINUM'
  | 'GOLD'
  | 'SILVER'
  | 'BRONZE'
  | 'PURPLE'
  | 'RED'
  | 'ORANGE'
  | 'GREEN'
  | 'BLUE'
  | 'DEFAULT';

/** グラデーション定義の型 */
export type GradientDefinition = {
  id: string;
  definition: string;
};

const DEFAULT_ID = 'defaultGradient';
const DEFAULT_DEFINITION = `
<linearGradient id="${DEFAULT_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stop-color="#ffffff" />
</linearGradient>
`.trim();

const KIWAMI_ID = 'kiwami';
const KIWAMI_DEFINITION = `
<linearGradient id="${KIWAMI_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="20%" stop-color="#fffc00" />
  <stop offset="40%" stop-color="#ff00d8" />
  <stop offset="75%" stop-color="#4cf593" />
</linearGradient>
`.trim();

const AURA_URA_ID = 'auraUra';
const AURA_URA_DEFINITION = `
<linearGradient id="${AURA_URA_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="20%" stop-color="#61b2ff" />
  <stop offset="40%" stop-color="#1cfb4a" />
  <stop offset="75%" stop-color="#ffdc34" />
</linearGradient>
`.trim();

const AURA_ID = 'aura';
const AURA_DEFINITION = `
<linearGradient id="${AURA_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="20%" stop-color="#f7fe12" />
  <stop offset="40%" stop-color="#00ffff" />
  <stop offset="75%" stop-color="#fe70d3" />
</linearGradient>
`.trim();

const RAINBOW_ID = 'rainbow';
const RAINBOW_DEFINITION = `
<linearGradient id="${RAINBOW_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="20%" stop-color="#f7fe12" />
  <stop offset="40%" stop-color="#00ffff" />
  <stop offset="75%" stop-color="#fe70d3" />
</linearGradient>
`.trim();

const PLATINUM_ID = 'platinum';
const PLATINUM_DEFINITION = `
<linearGradient id="${PLATINUM_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="28%" stop-color="#ffe387" />
  <stop offset="50%" stop-color="#fff8c9" />
  <stop offset="51%" stop-color="#ffce68" />
  <stop offset="80%" stop-color="#fff8c9" />
</linearGradient>
`.trim();

const GOLD_ID = 'gold';
const GOLD_DEFINITION = `
<linearGradient id="${GOLD_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="28%" stop-color="#efba00" />
  <stop offset="50%" stop-color="#fff8c9" />
  <stop offset="51%" stop-color="#cd7200" />
  <stop offset="75%" stop-color="#fff8c9" />
</linearGradient>
`.trim();

const SILVER_ID = 'silver';
const SILVER_DEFINITION = `
<linearGradient id="${SILVER_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="30%" stop-color="#828181" />
  <stop offset="50%" stop-color="#cbc9c9" />
  <stop offset="51%" stop-color="#cbc9c9" />
  <stop offset="60%" stop-color="#828181" />
</linearGradient>
`.trim();

const BRONZE_ID = 'bronze';
const BRONZE_DEFINITION = `
<linearGradient id="${BRONZE_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="25%" stop-color="#ffa200" />
  <stop offset="50%" stop-color="#c64000" />
  <stop offset="51%" stop-color="#ffa200" />
  <stop offset="75%" stop-color="#c64000" />
</linearGradient>
`.trim();

const PURPLE_ID = 'purple';
const PURPLE_DEFINITION = `
<linearGradient id="${PURPLE_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stop-color="#ba00ef" />
</linearGradient>
`.trim();

const RED_ID = 'red';
const RED_DEFINITION = `
<linearGradient id="${RED_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stop-color="#ef2d00" />
</linearGradient>
`.trim();

const ORANGE_ID = 'orange';
const ORANGE_DEFINITION = `
<linearGradient id="${ORANGE_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stop-color="#ef9d00" />
</linearGradient>
`.trim();

const GREEN_ID = 'green';
const GREEN_DEFINITION = `
<linearGradient id="${GREEN_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stop-color="#00d747" />
</linearGradient>
`.trim();

const BLUE_ID = 'blue';
const BLUE_DEFINITION = `
<linearGradient id="${BLUE_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stop-color="#00b6bd" />
</linearGradient>
`.trim();

export const gradientDefinitions: ReadonlyMap<GradientType, GradientDefinition> = new Map([
  ['DEFAULT', { id: DEFAULT_ID, definition: DEFAULT_DEFINITION }],
  ['KIWAMI', { id: KIWAMI_ID, definition: KIWAMI_DEFINITION }],
  ['AURA_URA', { id: AURA_URA_ID, definition: AURA_URA_DEFINITION }],
  ['AURA', { id: AURA_ID, definition: AURA_DEFINITION }],
  ['RAINBOW', { id: RAINBOW_ID, definition: RAINBOW_DEFINITION }],
  ['PLATINUM', { id: PLATINUM_ID, definition: PLATINUM_DEFINITION }],
  ['GOLD', { id: GOLD_ID, definition: GOLD_DEFINITION }],
  ['SILVER', { id: SILVER_ID, definition: SILVER_DEFINITION }],
  ['BRONZE', { id: BRONZE_ID, definition: BRONZE_DEFINITION }],
  ['PURPLE', { id: PURPLE_ID, definition: PURPLE_DEFINITION }],
  ['RED', { id: RED_ID, definition: RED_DEFINITION }],
  ['ORANGE', { id: ORANGE_ID, definition: ORANGE_DEFINITION }],
  ['GREEN', { id: GREEN_ID, definition: GREEN_DEFINITION }],
  ['BLUE', { id: BLUE_ID, definition: BLUE_DEFINITION }],
]);

/**
 * レーティング値に基づいて使用するグラデーションタイプを選択します。
 * @param value レーティング数値 (nullの場合はデフォルト)
 * @returns グラデーションタイプ
 */
export function selectGradientType(value: number | null): GradientType {
  if (value === null) {
    return 'DEFAULT';
  }
  if (value >= 22) {
    return 'KIWAMI';
  }
  if (value >= 21) {
    return 'AURA_URA';
  }
  if (value >= 20) {
    return 'AURA';
  }
  if (value >= 19) {
    return 'RAINBOW';
  }
  if (value >= 18) {
    return 'PLATINUM';
  }
  if (value >= 17) {
    return 'GOLD';
  }
  if (value >= 15) {
    return 'SILVER';
  }
  if (value >= 13) {
    return 'BRONZE';
  }
  if (value >= 11) {
    return 'PURPLE';
  }
  if (value >= 9) {
    return 'RED';
  }
  if (value >= 7) {
    return 'ORANGE';
  }
  if (value >= 4) {
    return 'GREEN';
  }
  return 'BLUE';
}
