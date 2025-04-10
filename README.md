# Geki Rating String SVG Generator

[pngのダウンロードはこちら](https://github.com/slime-hatena/geki-rating-string-svg/releases/latest)

このプロジェクトは、レーティング数値（例: "17.000"）を含む正方形のSVG画像を生成します。Discordの絵文字や類似のアプリケーションでの使用に適した形式です。

数値を上段（整数部 "17"）と下段（小数部 ".000"）の2行に分割し、グラデーションを適用し、SVGをPNGに変換し、ZIPアーカイブにパッケージ化します。

## 主な機能

- レーティング文字列からSVG画像を生成します。
- 数値を上段（整数部）と下段（小数部）に分割します。
- 設定可能なグラデーションを数値に適用します。
- 生成されたSVGをPNG形式に変換します。
- PNG画像をZIPアーカイブに圧縮します。

## 要件

- Node.js (v18 以降推奨)
- pnpm (パッケージマネージャー)

## インストール

1: リポジトリをクローンします

```bash
git clone <リポジトリURL>
cd geki-rating-string-svg
```

2: pnpmを使用して依存関係をインストールします

```bash
pnpm install
```

## 使い方

### SVGの生成

特定のレーティング数値に対応するSVGファイルを生成するには、`generate` スクリプトを使用します:

```bash
pnpm run generate <レーティング1> <レーティング2> ...
# 例:
pnpm run generate 17.000 16.500 15.987
```

または`./ratings.txt`にレーティングを記載して、`generate` スクリプトを実行します:

```bash
pnpm run generate
```

これにより、`output/svg` ディレクトリに `.svg` ファイルが作成されます。

### SVGからPNGへの変換

`output/svg` に現在存在するすべてのSVGファイルをPNG形式に変換するには、`convert` スクリプトを使用します:

```bash
pnpm run convert
```

これにより、`output/png` ディレクトリに `.png` ファイルが作成されます。

### ZIPアーカイブの作成

`output/png` に現在存在するすべてのPNGファイルを単一のZIPファイルに圧縮するには、`zip` スクリプトを使用します:

```bash
pnpm run zip
```

これにより、`output/zip` ディレクトリに `rating-emojis.zip` が作成されます。

### すべての成果物のビルド

生成と変換、zip化のステップをまとめて実行するには:

```bash
pnpm run all
```

## 開発

### テストの実行

ユニットテストを実行するには:

```bash
pnpm test
```
