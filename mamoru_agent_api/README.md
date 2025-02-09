# まもる君 API

このプロジェクトは「まもる君」を提供する API サービスです。
クリーンアーキテクチャに基づき、ドメイン層、ユースケース層、インフラ層、Web/API層に分離しています。

## セットアップ

1. Python 仮想環境を作成し、依存パッケージをインストールします。

   ```
   # requirements.txtに記載してるライブラリをインストール
   uv add -r requirements.txt

   # uvicornでfastapiを実行
   uv run uvicorn main:app --reload --port 8000

   ```
