import { generateSvg, SVG_VIEWBOX_WIDTH, SVG_VIEWBOX_HEIGHT, FONT_FAMILY, FONT_WEIGHT, DOMINANT_BASELINE, STROKE_COLOR, UPPER_TEXT_ANCHOR, UPPER_TEXT_X_PERCENT, UPPER_TEXT_Y, UPPER_FONT_SIZE, UPPER_STROKE_WIDTH, UPPER_LETTER_SPACING, LOWER_TEXT_ANCHOR, LOWER_TEXT_X_PERCENT, LOWER_TEXT_Y, LOWER_FONT_SIZE, LOWER_STROKE_WIDTH, DOT_FONT_SIZE_SCALE, DOT_DX } from '../src/core/svgGenerator';
import type { ParsedRating } from '../src/core/parser';
import { gradientDefinitions } from '../src/core/gradients'; // グラデーション定義をインポート

describe('generateSvg', () => {
  const rating19: ParsedRating = { upper: '19', lower: '.000' };
  const ratingValue19 = 19.000;
  const ratingGold: ParsedRating = { upper: '17', lower: '.555' };
  const ratingValueGold = 17.555;
  const ratingDotOnly: ParsedRating = { upper: '16', lower: '.' };
  const ratingValueDotOnly = 16.0;
  const emptyRating: ParsedRating = { upper: '', lower: '' };

  const defaultGradientId = gradientDefinitions.get('DEFAULT')?.id ?? 'defaultGradient';
  const rainbowGradientId = gradientDefinitions.get('RAINBOW')?.id ?? 'rainbow';
  const goldGradientId = gradientDefinitions.get('GOLD')?.id ?? 'gold';

  // --- 基本構造テスト ---
  describe('基本構造', () => {
    const svg = generateSvg(rating19, ratingValue19);

    it('SVGタグと正しいviewBoxを持つこと', () => {
      expect(svg).toContain('<svg');
      expect(svg).toContain(`viewBox="0 0 ${SVG_VIEWBOX_WIDTH} ${SVG_VIEWBOX_HEIGHT}"`);
      expect(svg).toContain('</svg>');
    });

    it('defsタグを含むこと', () => {
      expect(svg).toContain('<defs>');
      expect(svg).toContain('</defs>');
    });
  });

  // --- グラデーションテスト ---
  describe('グラデーション', () => {
    it('ratingValue >= 19 の場合、RAINBOWグラデーションを使用すること', () => {
      const svg = generateSvg(rating19, ratingValue19);
      expect(svg).toContain(`id="${rainbowGradientId}"`);
      expect(svg).toContain(`fill="url(#${rainbowGradientId})"`);
      expect(svg).toContain(gradientDefinitions.get('RAINBOW')?.definition);
    });

    it('ratingValue >= 17 の場合、GOLDグラデーションを使用すること', () => {
      const svg = generateSvg(ratingGold, ratingValueGold);
      expect(svg).toContain(`id="${goldGradientId}"`);
      expect(svg).toContain(`fill="url(#${goldGradientId})"`);
      expect(svg).toContain(gradientDefinitions.get('GOLD')?.definition);
    });

    it('ratingValue が null の場合、DEFAULTグラデーションを使用すること', () => {
      const svg = generateSvg(rating19, null);
      expect(svg).toContain(`id="${defaultGradientId}"`);
      expect(svg).toContain(`fill="url(#${defaultGradientId})"`);
      expect(svg).toContain(gradientDefinitions.get('DEFAULT')?.definition);
    });
  });

  // --- 上段テキストテスト ---
  describe('上段テキスト', () => {
    const svg = generateSvg(rating19, ratingValue19);

    it('正しい内容、属性、文字間隔でテキスト要素が生成されること', () => {
      // アウトライン
      expect(svg).toContain(
        `<text x="${UPPER_TEXT_X_PERCENT}" y="${UPPER_TEXT_Y}" font-family="${FONT_FAMILY}" font-size="${UPPER_FONT_SIZE}px" font-weight="${FONT_WEIGHT}" text-anchor="${UPPER_TEXT_ANCHOR}" dominant-baseline="${DOMINANT_BASELINE}" stroke="${STROKE_COLOR}" stroke-width="${UPPER_STROKE_WIDTH}" fill="none" letter-spacing="${UPPER_LETTER_SPACING}">${rating19.upper}</text>`
      );
      // 塗りつぶし
      expect(svg).toContain(
        `<text x="${UPPER_TEXT_X_PERCENT}" y="${UPPER_TEXT_Y}" font-family="${FONT_FAMILY}" font-size="${UPPER_FONT_SIZE}px" font-weight="${FONT_WEIGHT}" text-anchor="${UPPER_TEXT_ANCHOR}" dominant-baseline="${DOMINANT_BASELINE}" fill="url(#${rainbowGradientId})" letter-spacing="${UPPER_LETTER_SPACING}">${rating19.upper}</text>`
      );
    });

    it('tspan処理が適用されないこと', () => {
      expect(svg).not.toMatch(/<text [^>]*>\s*<tspan[^>]*>${rating19.upper}<\/tspan>\s*<\/text>/);
    });
  });

  // --- 下段テキストテスト ---
  describe('下段テキスト', () => {
    const svg = generateSvg(ratingGold, ratingValueGold);
    const dotFontSize = Math.round(LOWER_FONT_SIZE * DOT_FONT_SIZE_SCALE);
    const afterDot = ratingGold.lower.substring(1);

    it('正しい内容、属性でテキスト要素が生成されること', () => {
      // アウトライン
      expect(svg).toContain(
        `<text x="${LOWER_TEXT_X_PERCENT}" y="${LOWER_TEXT_Y}" font-family="${FONT_FAMILY}" font-size="${LOWER_FONT_SIZE}px" font-weight="${FONT_WEIGHT}" text-anchor="${LOWER_TEXT_ANCHOR}" dominant-baseline="${DOMINANT_BASELINE}" stroke="${STROKE_COLOR}" stroke-width="${LOWER_STROKE_WIDTH}" fill="none">` +
        `<tspan dx="${DOT_DX}" font-size="${dotFontSize}px">.</tspan><tspan dx="${-DOT_DX}">${afterDot}</tspan>` +
        `</text>`
      );
      // 塗りつぶし
      expect(svg).toContain(
        `<text x="${LOWER_TEXT_X_PERCENT}" y="${LOWER_TEXT_Y}" font-family="${FONT_FAMILY}" font-size="${LOWER_FONT_SIZE}px" font-weight="${FONT_WEIGHT}" text-anchor="${LOWER_TEXT_ANCHOR}" dominant-baseline="${DOMINANT_BASELINE}" fill="url(#${goldGradientId})">` +
        `<tspan dx="${DOT_DX}" font-size="${dotFontSize}px">.</tspan><tspan dx="${-DOT_DX}">${afterDot}</tspan>` +
        `</text>`
      );
    });

    it('文字間隔が適用されないこと', () => {
      const lowerTextRegex = new RegExp(
        `<text [^>]*?x="${LOWER_TEXT_X_PERCENT}"[^>]*?y="${LOWER_TEXT_Y}"[^>]*?>`
      );
      const match = svg.match(lowerTextRegex);
      expect(match).toBeTruthy();
      expect(match![0]).not.toContain(`letter-spacing="${UPPER_LETTER_SPACING}"`);
    });

    it('ドットのみの場合も正しくtspan処理されること', () => {
      const svgDotOnly = generateSvg(ratingDotOnly, ratingValueDotOnly);
      const dotOnlyFontSize = Math.round(LOWER_FONT_SIZE * DOT_FONT_SIZE_SCALE);
      expect(svgDotOnly).toContain(`<tspan dx="${DOT_DX}" font-size="${dotOnlyFontSize}px">.</tspan><tspan dx="${-DOT_DX}"></tspan>`);
    });
  });

  // --- エッジケーステスト ---
  describe('エッジケース', () => {
    it('空のParsedRatingの場合、テキスト要素が生成されないこと', () => {
      const svg = generateSvg(emptyRating, null);
      expect(svg).not.toContain('<text');
    });
  });
}); 
