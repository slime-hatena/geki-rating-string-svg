import { parseRatingString } from '../src/core/parser';

describe('parseRatingString', () => {
  it('有効なレーティング文字列(例: 17.000)が与えられた場合_上段(17)と下段(.000)に分割して返すこと', () => {
    // Arrange
    const ratingString = '17.000';
    const expected = { upper: '17', lower: '.000' };

    // Act
    const result = parseRatingString(ratingString);

    // Assert
    expect(result).toEqual(expected);
  });

  it('ドットを含まない文字列(例: 17)が与えられた場合_上段(17)と下段空文字を返すこと', () => {
    // Arrange
    const ratingString = '17';
    const expected = { upper: '17', lower: '' };

    // Act
    const result = parseRatingString(ratingString);

    // Assert
    expect(result).toEqual(expected);
  });

  it('ドットから始まる文字列(例: .000)が与えられた場合_上段空文字を返し_下段(.000)を返すこと', () => {
    // Arrange
    const ratingString = '.000';
    const expected = { upper: '', lower: '.000' };

    // Act
    const result = parseRatingString(ratingString);

    // Assert
    expect(result).toEqual(expected);
  });

   it('空文字列が与えられた場合_上段下段ともに空文字列を返すこと', () => {
    // Arrange
    const ratingString = '';
    const expected = { upper: '', lower: '' };

    // Act
    const result = parseRatingString(ratingString);

    // Assert
    expect(result).toEqual(expected);
  });

  // Add a case for just a dot
  it('ドットのみ(.)が与えられた場合_上段は空文字列を返し下段(.)のみを返すこと', () => {
    // Arrange
    const ratingString = '.';
    const expected = { upper: '', lower: '.' };

    // Act
    const result = parseRatingString(ratingString);

    // Assert
    expect(result).toEqual(expected);
  });
}); 
