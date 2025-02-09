from typing import Tuple, Optional
from app.infrastructure.mocks import mock_stt, mock_tts, mock_doc_ai, mock_mamoru_llm


def process_voice_consultation(audio_data: bytes) -> bytes:
    """
    音声相談: STT → LLM → TTS の流れで音声回答を生成する。
    """
    recognized_text = mock_stt(audio_data)
    ans = mock_mamoru_llm(recognized_text)
    summary = (
        f"{ans.official_comment}\n"
        f"法令: {', '.join(ans.cited_law_articles)}\n"
        f"免責: {ans.disclaimers}\n"
        f"次のアクション: {', '.join(ans.next_actions)}"
    )
    return mock_tts(summary)


def process_document_advice(pdf_data: bytes):
    """
    ドキュメント解析によるアドバイス: Document AI → LLM の流れ。
    """
    extracted_text = mock_doc_ai(pdf_data)
    return mock_mamoru_llm(extracted_text)

def process_telephone_consultation(audio_data: bytes) -> Tuple[Optional[bytes], bool]:
    """
    電話相談的フロー: STT → LLM → 特定キーワードで転送判断 → TTS の流れ。
    """
    recognized_text = mock_stt(audio_data)
    if "解雇" in recognized_text:
        return (None, True)  # 転送フラグ
    ans = mock_mamoru_llm(recognized_text)
    summary = (
        f"{ans.official_comment}\n"
        f"法令: {', '.join(ans.cited_law_articles)}\n"
        f"免責: {ans.disclaimers}\n"
        f"次のアクション: {', '.join(ans.next_actions)}"
    )
    audio_out = mock_tts(summary)
    return (audio_out, False)
