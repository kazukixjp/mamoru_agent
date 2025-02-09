from app.domain.models import MamoruAnswer

def mock_stt(audio_data: bytes) -> str:
    """(モック) Speech-to-Text の処理"""
    return "（モック）残業代が支払われていません、どうしたらいいでしょうか？"

def mock_tts(text: str) -> bytes:
    """(モック) Text-to-Speech の処理"""
    return b"FAKE_AUDIO_DATA"

def mock_doc_ai(pdf_bytes: bytes) -> str:
    """(モック) Document AI の処理"""
    return "（モック）給与明細: 基本給20万, 残業30h..."

def mock_mamoru_llm(query: str) -> MamoruAnswer:
    """(モック) まもる君(LLM)への問い合わせ処理"""
    return MamoruAnswer(
        official_comment="まもる君からの回答: 残業代請求は労基法XX条に基づき...",
        cited_law_articles=["労働基準法第24条"],
        disclaimers="一般的情報です。必ず専門家に確認を。",
        next_actions=["労基署に行く", "専門家へ相談"],
    )
