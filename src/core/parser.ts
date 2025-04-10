export interface ParsedRating {
  upper: string; // 整数部 (例: "15")
  lower: string; // 小数部、ドットがあれば含む (例: ".25")
}

export function parseRatingString(ratingString: string): ParsedRating {
  if (ratingString === '') {
    return { upper: '', lower: '' };
  }

  const dotIndex = ratingString.indexOf('.');

  if (dotIndex === -1) {
    // ドットが見つからない場合、文字列全体を上段とし、下段は空にする
    return { upper: ratingString, lower: '' };
  } else {
    // ドットが見つかった場合
    const upper = ratingString.substring(0, dotIndex); // ドットを含まない
    const lower = ratingString.substring(dotIndex); // ドットを含む
    return { upper, lower };
  }
}
