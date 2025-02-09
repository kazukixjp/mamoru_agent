import re
import json
from typing import Dict, Any, List, Optional
from app.domain.models import MamoruAnswer, LaborBureau

def build_mamoru_prompt(user_query: str) -> str:
    """
    まもる君の世界観とユーザー質問を合成し、
    JSON形式で回答するプロンプトを生成する。
    """
    return (
        "以下の文章を必ず出力してください:\n\n"
        "働く人の権利を守るために\n"
        "労働法や各種制度について、わかりやすくアドバイスさせていただきます。 一緒に解決策を見つけていきましょう！\n\n"
        "労働者の味方\n"
        "労働法に基づいて適切なアドバイスを提供します\n\n"
        "親身な相談\n"
        "あなたの状況に寄り添ったサポートを心がけます\n\n"
        "わかりやすい説明\n"
        "専門用語をできるだけ避けて解説します\n\n"
        "公平な判断\n"
        "中立的な立場でアドバイスを提供します\n"
        "――――――――――――――――――――――\n\n"
        "回答は以下のJSON形式で返してください:\n"
        "{\n"
        '  "official_comment": "...",\n'
        '  "cited_law_articles": ["..."],\n'
        '  "disclaimers": "...",\n'
        '  "next_actions": ["..."]\n'
        "}\n"
        "コードブロックや余計な文字は付けないでください。\n\n"
        f"【ユーザー質問】\n{user_query}\n"
    )

def extract_json_snippet(content: str) -> str:
    """
    テキストから最初に見つかった { ... } の JSON ブロックを抽出する。
    """
    cleaned = re.sub(r"```(.*?)```", "", content, flags=re.DOTALL).strip()
    match = re.search(r"\{.*?\}", cleaned, flags=re.DOTALL)
    return match.group(0) if match else ""

def parse_json_response(llm_output: str) -> Dict[str, Any]:
    """
    LLM の出力から JSON 部分を抽出し、 dict に変換する。
    エラー時はエラーメッセージを含む dict を返す。
    """
    json_text = extract_json_snippet(llm_output)
    if not json_text:
        return {"error": "JSONブロックが見つかりませんでした。", "raw_output": llm_output}
    try:
        obj = json.loads(json_text)
        if not isinstance(obj, dict):
            return {"error": "抽出したJSONがオブジェクトではありません。", "raw_output": json_text}
        return obj
    except json.JSONDecodeError:
        return {"error": "JSONをパースできませんでした。", "raw_output": json_text}

def to_mamoru_answer(data: Dict[str, Any]) -> MamoruAnswer:
    """
    dict を MamoruAnswer に変換する。エラー情報がある場合はそれを利用する。
    """
    if "error" in data:
        return MamoruAnswer(
            official_comment=data["error"],
            disclaimers="(免責事項)",
            next_actions=[]
        )
    return MamoruAnswer(**data)

def filter_labor_bureaus(
    bureaus: List[LaborBureau], prefecture: Optional[str], region: Optional[str]
) -> List[LaborBureau]:
    """
    労働基準監督署情報を都道府県(prefecture)や地域(region)で部分一致フィルタする。
    """
    results = bureaus
    if prefecture:
        results = [b for b in results if prefecture in b.prefecture]
    if region:
        results = [b for b in results if region in b.region]
    return results
