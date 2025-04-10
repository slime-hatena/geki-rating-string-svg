import * as fs from 'fs/promises';
import * as path from 'path';
import { mkdirp } from 'mkdirp';
import { parseRatingString } from '../core/parser';
import { generateSvg } from '../core/svgGenerator';

const OUTPUT_DIR = path.resolve(__dirname, '../../output/svg');
const DEFAULT_RATINGS_FILE = path.resolve(__dirname, '../../ratings.txt');

async function getRatingStrings(): Promise<string[]> {
  // コマンドライン引数を取得 (node実行ファイル、スクリプトパスはスキップ)
  const args = process.argv.slice(2);

  if (args.length > 0) {
    // 引数があれば、それをレーティング文字列として使用
    console.log('コマンドライン引数からレーティング文字列を取得します:', args);
    return args;
  } else {
    // 引数がなければ、デフォルトのファイルを読み込む試み
    console.log(`コマンドライン引数がないため、デフォルトファイル "${path.basename(DEFAULT_RATINGS_FILE)}" を読み込みます。`);
    try {
      const fileContent = await fs.readFile(DEFAULT_RATINGS_FILE, 'utf-8');
      const lines = fileContent.split(/\r?\n/); // WindowsとUnixの改行に対応
      const ratings = lines
        .map(line => line.trim()) // 前後の空白を除去
        .filter(line => line.length > 0 && !line.startsWith('#')); // 空行とコメント行を除外

      if (ratings.length === 0) {
        console.warn(`警告: "${path.basename(DEFAULT_RATINGS_FILE)}" は空か、有効なレーティング文字列を含んでいません。SVGは生成されません。`);
        return [];
      }
      console.log(`"${path.basename(DEFAULT_RATINGS_FILE)}" から ${ratings.length} 件のレーティングを読み込みました。`);
      return ratings;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.warn(`警告: デフォルトファイル "${path.basename(DEFAULT_RATINGS_FILE)}" が見つかりません。SVGは生成されません。`);
      } else {
        console.error(`"${path.basename(DEFAULT_RATINGS_FILE)}" の読み込み中にエラーが発生しました:`, error);
      }
      return []; // エラーの場合も空配列を返す
    }
  }
}

async function main() {
  const ratingStrings = await getRatingStrings();

  if (ratingStrings.length === 0) {
    // 警告は getRatingStrings 内で表示されるため、ここでは正常終了
    console.log('処理するレーティング文字列がありません。');
    process.exit(0); // エラーではなく正常終了
  }

  try {
    // 出力ディレクトリが存在することを確認
    await mkdirp(OUTPUT_DIR);
    console.log(`出力ディレクトリが存在することを確認しました: ${OUTPUT_DIR}`);

    // 各レーティング文字列に対してSVGを生成
    const generationPromises = ratingStrings.map(async (ratingStr) => {
      let ratingValue: number | null = null;
      try {
        // グラデーション選択のために文字列を数値として解析を試みる
        ratingValue = parseFloat(ratingStr);
        if (isNaN(ratingValue)) {
          console.warn(`警告: "${ratingStr}" を数値として解析できませんでした。デフォルトのグラデーションを使用します。`);
          ratingValue = null; // デフォルトグラデーションを示すためにnullを使用
        }

        const parsedRating = parseRatingString(ratingStr);
        // 解析済み文字列と数値 (またはnull) の両方を generateSvg に渡す
        const svgContent = generateSvg(parsedRating, ratingValue);
        const filename = `${ratingStr}.svg`;
        const outputPath = path.join(OUTPUT_DIR, filename);
        await fs.writeFile(outputPath, svgContent);
        console.log(`正常に生成されました: ${outputPath}`);
      } catch (error) {
        console.error(`"${ratingStr}" のSVG生成中にエラーが発生しました:`, error);
      }
    });

    await Promise.all(generationPromises);
    console.log('SVG生成プロセスが完了しました。');

  } catch (error) {
    console.error('予期せぬエラーが発生しました:', error);
    process.exit(1);
  }
}

main();
