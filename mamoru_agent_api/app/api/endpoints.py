from fastapi import APIRouter, UploadFile, File, Query
from typing import List, Optional
import base64
import anyio

from app.domain.models import UserQuery, MamoruAnswer, LaborBureau
from app.domain.services import build_mamoru_prompt, parse_json_response, to_mamoru_answer, filter_labor_bureaus
from app.usecases.consultations import (
    process_voice_consultation,
    process_document_advice,
    process_telephone_consultation,
)
from app.infrastructure.gemini import run_gemini_sync
from app.data.labor_bureaus import LABOR_BUREAUS

router = APIRouter()


@router.post("/ask", response_model=MamoruAnswer)
async def ask_mamoru(payload: UserQuery):
    """
    ユーザーからの質問に対し、まもる君が回答(JSON)を返すエンドポイント。
    """
    prompt = build_mamoru_prompt(payload.query)
    llm_text = await anyio.to_thread.run_sync(run_gemini_sync, prompt)
    parsed_dict = parse_json_response(llm_text)
    mamoru_result = to_mamoru_answer(parsed_dict)
    return mamoru_result


@router.get("/labor-offices", response_model=List[LaborBureau])
async def list_labor_bureaus_api(
    prefecture: Optional[str] = Query(None), region: Optional[str] = Query(None)
):
    """
    労働基準監督署一覧を都道府県または地域で部分一致フィルタして返すエンドポイント。
    """
    filtered = filter_labor_bureaus(LABOR_BUREAUS, prefecture, region)
    return filtered


@router.post("/voice-consultation")
async def voice_consultation_endpoint(file: UploadFile = File(...)):
    """
    機能A: 音声での労働相談エンドポイント
    音声ファイルを受け取り、STT → LLM → TTS の流れで音声回答を返す。
    """
    audio_bin = await file.read()
    answer_audio_bin = process_voice_consultation(audio_bin)
    encoded = base64.b64encode(answer_audio_bin).decode("utf-8")
    return {"audio_base64": encoded}


@router.post("/document-advice", response_model=MamoruAnswer)
async def document_advice_endpoint(file: UploadFile = File(...)):
    """
    機能C: ドキュメント解析によるアドバイスエンドポイント
    PDF/画像を受け取り、ドキュメント解析＋LLM による回答を返す。
    """
    file_data = await file.read()
    response = process_document_advice(file_data)
    return response


@router.post("/telephone-consultation")
async def telephone_consultation_endpoint(file: UploadFile = File(...)):
    """
    機能D: 電話相談的フローエンドポイント
    音声ファイルを受け取り、特定キーワードにより転送判断を行うか、音声回答を返す。
    """
    call_bin = await file.read()
    answer_audio, need_transfer = process_telephone_consultation(call_bin)
    if need_transfer or (answer_audio is None):
        return {"transfer": True}
    encoded = base64.b64encode(answer_audio).decode("utf-8")
    return {"audio_base64": encoded, "transfer": False}
