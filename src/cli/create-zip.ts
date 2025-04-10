import * as fs from 'fs'; // ストリーム作成には同期fsを使用
import * as fsp from 'fs/promises';
import * as path from 'path';
import archiver from 'archiver';
import { mkdirp } from 'mkdirp';

const PNG_DIR = path.resolve(__dirname, '../../output/png');
const ZIP_DIR = path.resolve(__dirname, '../../output/zip');
const ZIP_FILENAME = 'rating-emojis.zip';
const ZIP_FILE_PATH = path.join(ZIP_DIR, ZIP_FILENAME);

async function main() {
  try {
    // 出力ZIPディレクトリが存在することを確認
    await mkdirp(ZIP_DIR);
    console.log(`出力ディレクトリが存在することを確認しました: ${ZIP_DIR}`);

    // PNGディレクトリが存在するか確認
    try {
      await fsp.access(PNG_DIR, fs.constants.F_OK);
    } catch (err) {
      console.error(`エラー: PNGディレクトリが見つかりません (${PNG_DIR})。先に変換スクリプトを実行してください。`);
      process.exit(1);
    }

    // アーカイブデータをストリームするファイルを作成
    const output = fs.createWriteStream(ZIP_FILE_PATH);
    const archive = archiver('zip', {
      zlib: { level: 9 } // 圧縮レベルを設定
    });

    // 全てのアーカイブデータが書き込まれるのをリッスン
    // 'close' イベントはファイルディスクリプタが関与する場合にのみ発生
    output.on('close', function() {
      console.log(`正常にZIPアーカイブを作成しました: ${ZIP_FILE_PATH}`);
      console.log(archive.pointer() + ' total bytes');
    });

    // このイベントはデータソースが何であれ、データソースが枯渇したときに発生
    // このライブラリの一部ではなく、NodeJS Stream APIの一部
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function() {
      console.log('データが枯渇しました');
    });

    // 警告をキャッチする (例: statの失敗やその他の非ブロッキングエラー)
    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        // 警告をログに出力
        console.warn('警告:', err);
      } else {
        // エラーをスロー
        throw err;
      }
    });

    // このエラーを明示的にキャッチする
    archive.on('error', function(err) {
      throw err;
    });

    // アーカイブデータをファイルにパイプ
    archive.pipe(output);

    // PNGディレクトリからファイルを追加
    // 第2引数 'false' は、内部パスにディレクトリ名を付加しないことを意味する
    archive.directory(PNG_DIR, false);

    // アーカイブをファイナライズ (ファイル追加は完了したが、ストリームはまだ終了する必要がある)
    // 'close', 'end', 'finish' はこのメソッド呼び出し直後に発生する可能性があるため、事前に登録しておく
    await archive.finalize();

  } catch (error) {
    console.error('ZIP作成中に予期せぬエラーが発生しました:', error);
    process.exit(1);
  }
}

main(); 
