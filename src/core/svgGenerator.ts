import type { ParsedRating } from './parser';
import { gradientDefinitions, selectGradientType } from './gradients';

// SVGの寸法とスタイルに関する新しい定数
export const SVG_VIEWBOX_WIDTH = 160;
export const SVG_VIEWBOX_HEIGHT = 160;
export const FONT_FAMILY = "'M PLUS 1p', sans-serif";
export const FONT_WEIGHT = "900"; // Blackウェイト
export const DOMINANT_BASELINE = "middle";
export const STROKE_COLOR = "black";

// 上段テキスト固有設定
export const UPPER_TEXT_ANCHOR = 'start';
export const UPPER_TEXT_X_PERCENT = '3.5%';
export const UPPER_TEXT_Y = 58;
export const UPPER_FONT_SIZE = 110;
export const UPPER_STROKE_WIDTH = 12;
export const UPPER_LETTER_SPACING = 4; // 文字間隔

// 下段テキスト固有設定
export const LOWER_TEXT_ANCHOR = 'end';
export const LOWER_TEXT_X_PERCENT = '102%';
export const LOWER_TEXT_Y = 134;
export const LOWER_FONT_SIZE = 70;
export const LOWER_STROKE_WIDTH = 8;

// ドット固有設定
export const DOT_FONT_SIZE_SCALE = 0.4; // ドットのフォントサイズの縮小率
export const DOT_DX = -5; // ドットを左にずらす量 (調整可能)

/**
 * 指定された部分のSVGテキスト要素のペア（アウトライン + 塗りつぶし）を生成します。
 * @param text テキスト内容
 * @param y Y座標
 * @param fontSize フォントサイズ
 * @param fontWeight フォントウェイト
 * @param textAnchor テキストアンカー ('start', 'middle', 'end')
 * @param x X座標 (%)
 * @param strokeWidth アウトラインのストローク幅
 * @param fillGradientId 塗りつぶしに使用するグラデーションのID
 * @param letterSpacing (オプション) 文字間隔の値
 * @returns SVGテキスト要素の文字列、テキストが空の場合は空文字列
 */
function createTextElements(text: string, y: number, fontSize: number, fontWeight: string, textAnchor: 'start' | 'middle' | 'end', x: string, strokeWidth: number, fillGradientId: string, letterSpacing?: number | string): string {
  if (!text) {
    return '';
  }

  // テキスト内容を生成（先頭がドットならtspanで左にずらす＆小さくする）
  let textContent: string;

  if (text.startsWith('.')) {
    const afterDot = text.substring(1);
    const dotFontSize = Math.round(fontSize * DOT_FONT_SIZE_SCALE);
    const dotTspan = `<tspan dx="${DOT_DX}" font-size="${dotFontSize}px">.</tspan>`;
    const afterTspan = `<tspan dx="${-DOT_DX}">${afterDot}</tspan>`;
    textContent = `${dotTspan}${afterTspan}`;
  } else {
    textContent = text; // 先頭がドットでなければそのまま表示
  }

  const letterSpacingAttr = letterSpacing !== undefined ? ` letter-spacing="${letterSpacing}"` : '';

  // アウトラインテキスト
  const outline = `<text x="${x}" y="${y}" font-family="${FONT_FAMILY}" font-size="${fontSize}px" font-weight="${fontWeight}" text-anchor="${textAnchor}" dominant-baseline="${DOMINANT_BASELINE}" stroke="${STROKE_COLOR}" stroke-width="${strokeWidth}" fill="none"${letterSpacingAttr}>${textContent}</text>`;

  // 塗りつぶしテキスト - 動的なグラデーションIDを使用
  const fill = `<text x="${x}" y="${y}" font-family="${FONT_FAMILY}" font-size="${fontSize}px" font-weight="${fontWeight}" text-anchor="${textAnchor}" dominant-baseline="${DOMINANT_BASELINE}" fill="url(#${fillGradientId})"${letterSpacingAttr}>${textContent}</text>`;

  return outline + fill;
}

/**
 * 解析されたレーティングと値に基づいてSVG文字列を生成します。
 * @param rating 上段と下段の部分を含む解析済みレーティング
 * @param ratingValue 元の数値レーティング値 (またはnull)
 * @returns 完全なSVG文字列
 */
export function generateSvg(rating: ParsedRating, ratingValue: number | null): string {
  const { upper, lower } = rating;

  // 値に基づいてグラデーションを選択
  const gradientType = selectGradientType(ratingValue);
  let selectedGradient = gradientDefinitions.get(gradientType);

  if (!selectedGradient) {
    // グラデーションタイプ が見つかりません。RAINBOW にフォールバックします。
    console.warn(`グラデーションタイプ ${gradientType} DEFAULT にフォールバックします。`);
    const fallbackGradient = gradientDefinitions.get('DEFAULT');
    if (!fallbackGradient) throw new Error('デフォルトのDEFAULTグラデーションが見つかりません！'); // これは起こらないはず
    selectedGradient = fallbackGradient;
  }

  const gradientId = selectedGradient.id;
  const gradientDefinition = selectedGradient.definition;

  // 上段テキスト - 処理済みのテキストを使用
  const upperTextElements = createTextElements(upper, UPPER_TEXT_Y, UPPER_FONT_SIZE, FONT_WEIGHT, UPPER_TEXT_ANCHOR, UPPER_TEXT_X_PERCENT, UPPER_STROKE_WIDTH, gradientId, UPPER_LETTER_SPACING);
  // 下段テキスト: 中央揃え (text-anchor='middle', x='50%')
  const lowerTextElements = createTextElements(lower, LOWER_TEXT_Y, LOWER_FONT_SIZE, FONT_WEIGHT, LOWER_TEXT_ANCHOR, LOWER_TEXT_X_PERCENT, LOWER_STROKE_WIDTH, gradientId);

  // 最終的なSVG文字列を構築 (背景のrectを削除)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SVG_VIEWBOX_WIDTH} ${SVG_VIEWBOX_HEIGHT}"><defs>${gradientDefinition}</defs>${upperTextElements}${lowerTextElements}</svg>`;
} 
