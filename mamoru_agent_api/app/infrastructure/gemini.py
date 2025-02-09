import os
import asyncio
from dotenv import load_dotenv
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai import Agent

# .env の読み込み
load_dotenv()

async def _run_gemini_async(prompt: str) -> str:
    """
    非同期で Gemini LLM に問い合わせる。
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY が未設定です。.env 等を確認してください。")
    gemini_model = GeminiModel(model_name="gemini-1.5-flash", api_key=api_key)
    agent = Agent(model=gemini_model)
    result = await agent.run(prompt)
    return str(result.data)

def run_gemini_sync(prompt: str) -> str:
    """
    同期で Gemini LLM を呼び出すラッパー関数。
    """
    loop = asyncio.new_event_loop()
    try:
        asyncio.set_event_loop(loop)
        result = loop.run_until_complete(_run_gemini_async(prompt))
    finally:
        loop.run_until_complete(loop.shutdown_asyncgens())
        loop.close()
        asyncio.set_event_loop(None)
    return result
