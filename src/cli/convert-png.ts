import * as fs from 'fs/promises';
import * as path from 'path';
import sharp from 'sharp';
import { mkdirp } from 'mkdirp';

const SVG_DIR = path.resolve(__dirname, '../../output/svg');
const PNG_DIR = path.resolve(__dirname, '../../output/png');

async function main() {
  try {
    // 出力PNGディレクトリが存在することを確認
    await mkdirp(PNG_DIR);
    console.log(`出力ディレクトリが存在することを確認しました: ${PNG_DIR}`);

    // SVGディレクトリからすべてのファイルを読み込む
    const svgFiles = await fs.readdir(SVG_DIR);
    const svgPaths = svgFiles
      .filter((file) => path.extname(file).toLowerCase() === '.svg')
      .map((file) => path.join(SVG_DIR, file));

    if (svgPaths.length === 0) {
      console.log(`${SVG_DIR} にSVGファイルが見つかりませんでした。`);
      return;
    }

    console.log(`${svgPaths.length} 個のSVGファイルを変換します。`);

    // 各SVGをPNGに変換
    const conversionPromises = svgPaths.map(async (svgPath) => {
      const filenameBase = path.basename(svgPath, '.svg');
      const outputPath = path.join(PNG_DIR, `${filenameBase}.png`);
      try {
        await sharp(svgPath)
          .png() // PNG出力形式を指定
          // 必要に応じて密度やサイズの制約を追加
          // .resize(128, 128) // 例: 128x128にリサイズ
          .toFile(outputPath);
        console.log(`正常に変換されました: ${svgPath} -> ${outputPath}`);
      } catch (error) {
        console.error(`${svgPath} の変換中にエラーが発生しました:`, error);
      }
    });

    await Promise.all(conversionPromises);
    console.log('PNG変換プロセスが完了しました。');

  } catch (error) {
    console.error('PNG変換中に予期せぬエラーが発生しました:', error);
    process.exit(1);
  }
}

main(); 
