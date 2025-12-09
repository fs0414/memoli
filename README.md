# memoli

CLIでMarkdownメモを管理するツール。日報やメモを `~/.memoli` 配下で一元管理します。

## 機能とコマンド

### 初期化

```bash
memoli init
```

`~/.memoli` 配下に必要なディレクトリを作成します:
- `reports/` - 日報
- `temp/` - テンプレート
- `memo/` - 通常メモ

### 日報

```bash
memoli daily              # 今日の日報ファイルを作成
memoli daily -t work      # テンプレートを使用して作成
memoli today              # 今日の日報をエディタで開く
```

- 日報は `~/.memoli/reports/YYYY-MM/YYYY-MM-DD.md` に保存されます
- `-t` オプションで `~/.memoli/temp/<name>.md` をテンプレートとして使用できます
- `today` は `$EDITOR` 環境変数で指定されたエディタを使用します（デフォルト: vi）

### メモ

```bash
memoli memo <name>        # メモを作成/編集
```

- メモは `~/.memoli/memo/<name>.md` に保存されます
- 既存のメモがある場合はエディタで開きます

### ヘルプ

```bash
memoli --help
memoli --version
```

## 技術構成

- **Runtime**: [Bun](https://bun.sh)
- **Language**: TypeScript
- **Type Checker**: [@typescript/native-preview](https://github.com/nicolo-ribaudo/native-typescript) (tsgo)
- **Linter**: oxlint
- **Formatter**: oxfmt

## その他情報

### インストール

```bash
bun install
bun link  # グローバルにインストール
```

### 開発

```bash
bun run typecheck   # 型チェック
bun test            # テスト実行
bun run lint        # リント
bun run fmt         # フォーマット
```

### ディレクトリ構成

```
~/.memoli/
├── reports/          # 日報
│   └── YYYY-MM/
│       └── YYYY-MM-DD.md
├── temp/             # テンプレート
│   └── <name>.md
└── memo/             # 通常メモ
    └── <name>.md
```

### ライセンス

MIT
